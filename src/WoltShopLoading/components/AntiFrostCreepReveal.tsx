import React, { useMemo } from 'react';
import {
  Canvas,
  Fill,
  Shader,
  Skia,
  Path as SkiaPath,
  ImageShader,
  useImage,
  rect,
} from '@shopify/react-native-skia';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  SharedValue,
  useDerivedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import { COLORS, DIMENSIONS } from '../constants';

const { BANNER_HEIGHT, CURVE_HEIGHT } = DIMENSIONS;

const frostCreepSource = Skia.RuntimeEffect.Make(`
  uniform shader image;
  uniform float revealProgress;
  uniform float2 resolution;

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  float hash2(float2 p) {
    return fract(sin(dot(p, float2(127.1, 311.7))) * 43758.5453);
  }

  float vnoise(float2 p) {
    float2 i = floor(p);
    float2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash2(i);
    float b = hash2(i + float2(1.0, 0.0));
    float c = hash2(i + float2(0.0, 1.0));
    float d = hash2(i + float2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Fractal Brownian Motion — layered noise for anisotropic drift
  float fbm(float2 p) {
    float v = 0.0;
    float a = 0.5;
    float2 shift = float2(100.0, 100.0);
    for (int i = 0; i < 5; i++) {
      v += a * vnoise(p);
      p = p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  half4 main(float2 coord) {
    float2 uv = coord / resolution;
    float aspect = resolution.x / resolution.y;

    if (revealProgress <= 0.0) {
      return half4(0.0, 0.0, 0.0, 0.0);
    }

    float minEdgeDist = 999.0;

    for (int i = 0; i < 25; i++) {
      float fi = float(i);
      float2 center = float2(
        hash(fi * 1.234 + 0.537),
        hash(fi * 5.678 + 0.214)
      );
      float startTime = hash(fi * 9.012 + 0.831) * 0.2;
      float speed = 0.7 + hash(fi * 3.456 + 0.129) * 0.5;

      float reach = max(0.0, revealProgress - startTime) * speed;

      if (reach <= 0.0) { continue; }

      float2 diff = uv - center;
      diff.x *= aspect;
      float dist = length(diff);

      float reachFactor = clamp(reach * 2.0, 0.0, 1.0);

      float warp = fbm(uv * 5.0 + float2(fi * 3.17, fi * 1.93)) * 0.45 * reachFactor;
      float drift = vnoise(uv * 2.5 + float2(fi * 7.3, fi * 2.1)) * 0.25 * reachFactor;

      float warpedDist = dist - warp - drift;

      float edgeDist = warpedDist - reach;
      minEdgeDist = min(minEdgeDist, edgeDist);
    }

    if (minEdgeDist > 900.0) {
      return half4(0.0, 0.0, 0.0, 0.0);
    }

    float fracture = vnoise(uv * 40.0) * 0.025;
    fracture += vnoise(uv * 80.0) * 0.012;
    fracture += vnoise(uv * 160.0) * 0.006;
    minEdgeDist += fracture;

    float reveal = 1.0 - smoothstep(-0.006, 0.014, minEdgeDist);

    half4 color = image.eval(coord);
    return color * reveal;
  }
`)!;

interface AntiFrostCreepRevealProps {
  revealProgress: SharedValue<number>;
}

export const AntiFrostCreepReveal = React.memo(
  ({ revealProgress }: AntiFrostCreepRevealProps) => {
    const { width } = useWindowDimensions();
    const bannerImage = useImage(require('../assets/wolt-shop-banner.jpg'));
    const canvasRect = rect(0, 0, width, BANNER_HEIGHT);

    const uniforms = useDerivedValue(() => ({
      revealProgress: revealProgress.value,
      resolution: [width, BANNER_HEIGHT],
    }));

    const curvePath = useMemo(() => {
      const path = Skia.Path.Make();
      path.moveTo(0, BANNER_HEIGHT - CURVE_HEIGHT);
      path.quadTo(
        width / 2,
        BANNER_HEIGHT + CURVE_HEIGHT * 0.35,
        width,
        BANNER_HEIGHT - CURVE_HEIGHT,
      );
      path.lineTo(width, BANNER_HEIGHT);
      path.lineTo(0, BANNER_HEIGHT);
      path.close();
      return path;
    }, [width]);

    // Fade out blur background once reveal is fully complete
    const blurStyle = useAnimatedStyle(() => ({
      opacity: interpolate(revealProgress.value, [1.2, 1.35], [1, 0], 'clamp'),
    }));

    return (
      <View style={[styles.container, { height: BANNER_HEIGHT }]}>
        <Animated.Image
          source={require('../assets/wolt-shop-banner-blur.png')}
          style={[
            styles.blurImage,
            { width, height: BANNER_HEIGHT },
            blurStyle,
          ]}
          resizeMode="cover"
        />

        <Canvas style={[styles.canvas, { width, height: BANNER_HEIGHT }]}>
          {bannerImage && (
            <Fill>
              <Shader source={frostCreepSource} uniforms={uniforms}>
                <ImageShader
                  image={bannerImage}
                  fit="cover"
                  rect={canvasRect}
                />
              </Shader>
            </Fill>
          )}
          <SkiaPath path={curvePath} color={COLORS.background} />
        </Canvas>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  blurImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
