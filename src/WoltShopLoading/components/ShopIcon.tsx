import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import { DIMENSIONS } from '../constants';

const { ICON_SIZE, ICON_BORDER_RADIUS, BANNER_HEIGHT, CURVE_HEIGHT } =
  DIMENSIONS;
const ICON_TOP = BANNER_HEIGHT - CURVE_HEIGHT - ICON_SIZE / 2;

interface ShopIconProps {
  iconReveal: SharedValue<number>;
}

export const ShopIcon = React.memo(({ iconReveal }: ShopIconProps) => {
  const placeholderStyle = useAnimatedStyle(() => ({
    opacity: 1 - iconReveal.value,
  }));

  const loadedStyle = useAnimatedStyle(() => ({
    opacity: iconReveal.value,
    transform: [
      { scale: interpolate(iconReveal.value, [0, 0.5, 1], [0.85, 1.05, 1]) },
    ],
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.iconContainer, placeholderStyle]}>
        <Image
          source={require('../assets/wolt-shop-logo-blur.png')}
          style={styles.iconImage}
        />
      </Animated.View>

      <Animated.View style={[styles.iconContainer, loadedStyle]}>
        <Image
          source={require('../assets/wolt-shop-logo.png')}
          style={styles.iconImage}
        />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: ICON_TOP,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    position: 'absolute',
  },
  iconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_BORDER_RADIUS,
  },
});
