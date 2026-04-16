import React, { useEffect } from 'react';
import {
  Canvas,
  Circle,
  Group,
  Shader,
  Skia,
} from '@shopify/react-native-skia';
import Animated, {
  useDerivedValue,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ORB_SIZE, ORB_COLORS } from '../constants';

const RADIUS = ORB_SIZE / 2;
const CENTER = ORB_SIZE / 2;

// Floating motion
const FLOAT_DISTANCE = 5;
const FLOAT_DURATION = 3000;
const BREATHE_SCALE = 0.025;
const BREATHE_DURATION = 4000;

const orbShaderSource = Skia.RuntimeEffect.Make(`
  uniform float uTime;
  uniform float2 uResolution;
  uniform float3 uColorA;
  uniform float3 uColorB;
  uniform float3 uColorC;

  float hash(float2 p) {
    p = fract(p * float2(127.1, 311.7));
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }

  float noise(float2 p) {
    float2 i = floor(p);
    float2 f = fract(p);
    float2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),              hash(i + float2(1,0)), u.x),
      mix(hash(i + float2(0,1)), hash(i + float2(1,1)), u.x),
      u.y
    );
  }

  // Low-octave FBM for very large, soft shapes (3 octaves only)
  float fbm3(float2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 3; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  // Full FBM for finer detail
  float fbm(float2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.1;
    }
    return value;
  }

  half4 main(float2 fragCoord) {
    float2 uv = fragCoord / uResolution;
    uv = uv * 2.0 - 1.0;

    float t = uTime * 2;

    // --- Step 1: Large-scale advection field ---
    // Very low frequency — creates the slow, massive drift
    float2 flow = float2(
      fbm3(uv * 0.5 + float2(t * 0.3, t * 0.1)),
      fbm3(uv * 0.5 + float2(-t * 0.15, t * 0.25) + 5.3)
    );

    // Warp UV by the flow field
    float2 wuv = uv + (flow - 0.5) * 0.9;

    // --- Step 2: Main fluid shape ---
    // Very low frequency noise at warped position = big soft blobs
    float shape = fbm3(wuv * 0.6 + float2(t * 0.08, -t * 0.05));

    // Second shape layer, slightly different drift
    float shape2 = fbm3(wuv * 0.7 + float2(-t * 0.06, t * 0.1) + 3.1);

    // Blend: creates the large connected white/blue masses
    float n = shape * 0.6 + shape2 * 0.4;

    // --- Step 3: Soft detail on top ---
    // Higher frequency detail only in the transition zone
    float detail = fbm(wuv * 1.4 + float2(t * 0.12, -t * 0.08) + flow * 0.5);
    // Mix detail only where n is near 0.5 (the boundary)
    float boundary = 1.0 - abs(n - 0.5) * 4.0;
    boundary = clamp(boundary, 0.0, 1.0);
    n = n + (detail - 0.5) * 0.15 * boundary;

    // Gentle vertical bias — white tends toward upper half
    n += (1.0 - uv.y) * 0.06;

    // Remap: wider range prevents full-white or full-blue saturation
    float val = smoothstep(0.25, 0.75, n);

    // --- Color: deep blue -> cyan -> white ---
    float3 deepBlue = uColorA;
    float3 brightWhite = uColorB;
    float3 cyan = uColorC;

    // Two-stage blend with wide cyan transition zone
    float3 color = mix(deepBlue, cyan, smoothstep(0.0, 0.45, val));
    color = mix(color, brightWhite, smoothstep(0.35, 0.9, val));

    // Warm tint at brightest peaks
    float3 warmPeak = float3(1.0, 0.97, 0.92);
    color = mix(color, warmPeak, smoothstep(0.85, 1.0, val) * 0.2);

    // Hard circle clip
    float dist = length(uv);
    float alpha = smoothstep(1.0, 0.985, dist);

    return half4(color * alpha, alpha);
  }
`)!;

const FluidOrb: React.FC = () => {
  const time = useSharedValue(0);
  const floatY = useSharedValue(0);
  const breatheScale = useSharedValue(1);

  // Drive shader time via rAF
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      time.value = (ts - start) / 1000;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Floating bob
  useEffect(() => {
    floatY.value = withRepeat(
      withTiming(-FLOAT_DISTANCE, {
        duration: FLOAT_DURATION,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    );
  }, []);

  // Breathing scale
  useEffect(() => {
    breatheScale.value = withRepeat(
      withTiming(1 + BREATHE_SCALE, {
        duration: BREATHE_DURATION,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    );
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }, { scale: breatheScale.value }],
  }));

  const uniforms = useDerivedValue(() => ({
    uTime: time.value,
    uResolution: [ORB_SIZE, ORB_SIZE],
    uColorA: ORB_COLORS.colorA,
    uColorB: ORB_COLORS.colorB,
    uColorC: ORB_COLORS.colorC,
  }));

  const clip = Skia.Path.Make();
  clip.addCircle(CENTER, CENTER, RADIUS);

  return (
    <Animated.View style={floatingStyle}>
      <Canvas style={{ width: ORB_SIZE, height: ORB_SIZE }}>
        <Group clip={clip}>
          <Circle cx={CENTER} cy={CENTER} r={RADIUS}>
            <Shader source={orbShaderSource} uniforms={uniforms} />
          </Circle>
        </Group>
      </Canvas>
    </Animated.View>
  );
};

export default FluidOrb;
