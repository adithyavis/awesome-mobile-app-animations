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

const metaballSource = Skia.RuntimeEffect.Make(`
  uniform shader image;
  uniform float revealProgress;
  uniform float2 resolution;

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  half4 main(float2 coord) {
    float2 uv = coord / resolution;

    // Metaball field computation
    float field = 0.0;
    for (int i = 0; i < 12; i++) {
      float fi = float(i);
      float cx = hash(fi * 1.234 + 0.537);
      float cy = hash(fi * 5.678 + 0.214);
      float startTime = hash(fi * 9.012 + 0.831) * 0.25;
      float speed = 0.65 + hash(fi * 3.456 + 0.129) * 0.55;

      float t = max(0.0, revealProgress - startTime);
      float radius = t * speed * 0.48;

      float2 diff = uv - float2(cx, cy);
      float distSq = dot(diff, diff);
      distSq = max(distSq, 0.0001);
      field += (radius * radius) / distSq;
    }

    float reveal = smoothstep(0.8, 1.4, field);

    half4 color = image.eval(coord);
    return color * reveal;
  }
`)!;

interface MetaballBannerRevealProps {
  revealProgress: SharedValue<number>;
}

export const MetaballBannerReveal = React.memo(
  ({ revealProgress }: MetaballBannerRevealProps) => {
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
              <Shader source={metaballSource} uniforms={uniforms}>
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
