import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  StyleProp,
  Pressable,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native';
import { Canvas, Fill, Shader, Skia } from '@shopify/react-native-skia';
import Animated, {
  useDerivedValue,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { MASK_CORNER_RADIUS } from '../constants';

const FADE_DURATION = 400;

const particleMaskSource = Skia.RuntimeEffect.Make(`
  uniform float time;
  uniform float2 resolution;
  uniform float cornerRadius;
  uniform float seed;
  uniform float particleCount;

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  float roundedRectSDF(float2 p, float2 halfSize, float r) {
    float2 d = abs(p) - halfSize + r;
    return length(max(d, 0.0)) - r;
  }

  half4 main(float2 coord) {
    float2 center = resolution * 0.5;
    float sdf = roundedRectSDF(coord - center, center, cornerRadius);

    if (sdf > 0.0) {
      return half4(0.0, 0.0, 0.0, 0.0);
    }

    half4 bgColor = half4(0.109, 0.109, 0.109, 1.0);

    float dotAccum = 0.0;

    for (int i = 0; i < 400; i++) {
      if (float(i) >= particleCount) break;
      float fi = float(i);

      float seed1 = hash(fi * 1.234 + 0.537 + seed);
      float seed2 = hash(fi * 5.678 + 0.214 + seed);
      float seed3 = hash(fi * 3.456 + 0.129 + seed);
      float seed4 = hash(fi * 7.891 + 0.643 + seed);
      float seed5 = hash(fi * 2.345 + 0.876 + seed);
      float seed6 = hash(fi * 4.567 + 0.321 + seed);
      float seed7 = hash(fi * 6.789 + 0.456 + seed);

      float radius = 0.4 + seed3 * 0.8;

      float2 startPos = float2(seed1 * resolution.x, seed2 * resolution.y);

      float freqX = 0.3 + seed4 * 0.8;
      float freqY = 0.3 + seed5 * 0.8;
      float phaseX = seed6 * 6.283185;
      float phaseY = seed7 * 6.283185;
      float ampX = 8.0 + seed4 * 16.0;
      float ampY = 6.0 + seed5 * 12.0;

      float2 offset = float2(
        sin(time * freqX + phaseX) * ampX + cos(time * freqY * 0.7 + phaseY) * ampX * 0.5,
        cos(time * freqY + phaseY) * ampY + sin(time * freqX * 0.6 + phaseX) * ampY * 0.5
      );

      float2 pos = startPos + offset;
      pos = mod(pos, resolution);
      pos = pos + resolution;
      pos = mod(pos, resolution);

      float dist = length(coord - pos);

      dotAccum += smoothstep(radius, radius * 0.6, dist);
    }

    dotAccum = clamp(dotAccum, 0.0, 1.0);

    half4 result = mix(bgColor, half4(0.85, 0.85, 0.85, 1.0), dotAccum * 0.9);
    return result;
  }
`)!;

interface LineInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

const LINE_HEIGHT_INSET = 6;
const PARTICLES_PER_PIXEL = 1.2;

const LineMask: React.FC<{
  line: LineInfo;
  index: number;
  revealed: boolean;
  onFadeComplete: () => void;
}> = ({ line, index, revealed, onFadeComplete }) => {
  const time = useSharedValue(0);
  const opacity = useSharedValue(1);

  const maskLeft = line.x;
  const maskWidth = line.width;
  const maskHeight = Math.max(line.height - LINE_HEIGHT_INSET, 4);
  const maskTop = line.y + (line.height - maskHeight) / 2;

  useEffect(() => {
    time.value = withRepeat(
      withTiming(10000, { duration: 10000 * 1000, easing: Easing.linear }),
      -1,
      false,
    );
    return () => {
      time.value = 0;
    };
  }, []);

  useEffect(() => {
    if (revealed) {
      opacity.value = withTiming(0, { duration: FADE_DURATION }, (finished) => {
        if (finished) {
          runOnJS(onFadeComplete)();
        }
      });
    } else {
      opacity.value = withTiming(1, { duration: FADE_DURATION });
    }
  }, [revealed]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const pCount = Math.min(Math.round(maskWidth * PARTICLES_PER_PIXEL), 400);

  const uniforms = useDerivedValue(() => ({
    time: time.value,
    resolution: [maskWidth, maskHeight],
    cornerRadius: MASK_CORNER_RADIUS,
    seed: (index + 1) * 100.0,
    particleCount: pCount,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: maskLeft,
          top: maskTop,
        },
        animatedStyle,
      ]}
    >
      <Canvas style={{ width: maskWidth, height: maskHeight }}>
        <Fill>
          <Shader source={particleMaskSource} uniforms={uniforms} />
        </Fill>
      </Canvas>
    </Animated.View>
  );
};

interface MaskedTextProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

export const MaskedText: React.FC<MaskedTextProps> = ({ children, style }) => {
  const [lines, setLines] = useState<LineInfo[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [masksVisible, setMasksVisible] = useState(true);

  const handleTextLayout = (
    event: NativeSyntheticEvent<TextLayoutEventData>,
  ) => {
    const measured = event.nativeEvent.lines.map((line) => ({
      x: line.x,
      y: line.y,
      width: line.width,
      height: line.height,
    }));
    setLines(measured);
  };

  const handlePress = () => {
    if (revealed) {
      return;
    }
    setRevealed(true);
  };

  const handleFadeComplete = () => {
    setMasksVisible(false);
  };

  return (
    <Pressable
      style={[styles.container, { borderRadius: MASK_CORNER_RADIUS }]}
      onPress={handlePress}
    >
      <Text
        style={[styles.text, style, !revealed && styles.hiddenText]}
        onTextLayout={handleTextLayout}
      >
        {children}
      </Text>
      {masksVisible &&
        lines.map((line, index) => (
          <LineMask
            key={index}
            line={line}
            index={index}
            revealed={revealed}
            onFadeComplete={handleFadeComplete}
          />
        ))}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  text: {},
  hiddenText: {
    opacity: 0,
    color: 'transparent',
  },
});
