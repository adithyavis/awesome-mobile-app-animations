import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { AntiFrostCreepReveal } from './AntiFrostCreepReveal';
import { ShopIcon } from './ShopIcon';
import { COLORS, TIMING } from '../constants';

export default function WoltShopLoadingScreen() {
  const iconReveal = useSharedValue(0);
  const revealProgress = useSharedValue(0);
  const infoAppear = useSharedValue(0);

  const startRevealSequence = useCallback(() => {
    iconReveal.value = withDelay(
      TIMING.ICON_LOAD_DELAY,
      withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) }),
    );

    revealProgress.value = withDelay(
      TIMING.BANNER_LOAD_DELAY,
      withTiming(1.35, {
        duration: TIMING.METABALL_DURATION,
        easing: Easing.out(Easing.quad),
      }),
    );

    infoAppear.value = withDelay(
      TIMING.BANNER_LOAD_DELAY + TIMING.INFO_APPEAR_DELAY,
      withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      }),
    );
  }, [iconReveal, revealProgress, infoAppear]);

  useEffect(() => {
    startRevealSequence();
  }, [startRevealSequence]);

  // Animated styles for info rows
  const nameStyle = useAnimatedStyle(() => {
    const delay = 0;
    const progress = interpolate(
      infoAppear.value,
      [delay, delay + 0.3],
      [0, 1],
      'clamp',
    );
    return {
      opacity: progress,
      transform: [{ translateY: interpolate(progress, [0, 1], [20, 0]) }],
    };
  });

  const ratingStyle = useAnimatedStyle(() => {
    const delay = 0.12;
    const progress = interpolate(
      infoAppear.value,
      [delay, delay + 0.3],
      [0, 1],
      'clamp',
    );
    return {
      opacity: progress,
      transform: [{ translateY: interpolate(progress, [0, 1], [20, 0]) }],
    };
  });

  const scheduleStyle = useAnimatedStyle(() => {
    const delay = 0.24;
    const progress = interpolate(
      infoAppear.value,
      [delay, delay + 0.3],
      [0, 1],
      'clamp',
    );
    return {
      opacity: progress,
      transform: [{ translateY: interpolate(progress, [0, 1], [20, 0]) }],
    };
  });

  const deliveryStyle = useAnimatedStyle(() => {
    const delay = 0.36;
    const progress = interpolate(
      infoAppear.value,
      [delay, delay + 0.3],
      [0, 1],
      'clamp',
    );
    return {
      opacity: progress,
      transform: [{ translateY: interpolate(progress, [0, 1], [20, 0]) }],
    };
  });

  const mostOrderedStyle = useAnimatedStyle(() => {
    const delay = 0.5;
    const progress = interpolate(
      infoAppear.value,
      [delay, delay + 0.35],
      [0, 1],
      'clamp',
    );
    return {
      opacity: progress,
      transform: [{ translateY: interpolate(progress, [0, 1], [20, 0]) }],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        <AntiFrostCreepReveal revealProgress={revealProgress} />
        <ShopIcon iconReveal={iconReveal} />
        <View style={styles.infoContainer}>
          <Animated.View style={nameStyle}>
            <Text style={styles.shopName}>McDonald's</Text>
          </Animated.View>

          <Animated.View style={[styles.ratingRow, ratingStyle]}>
            <Text style={styles.ratingEmoji}>☺</Text>
            <Text style={styles.ratingText}> 9.4</Text>
            <Text style={styles.dotSeparator}> · </Text>
            <Text style={styles.closedText}>Closed</Text>
            <Text style={styles.dotSeparator}> · </Text>
            <Text style={styles.infoText}>Opens on Monday at 11:30</Text>
          </Animated.View>

          <Animated.View style={[styles.orderInfoRow, ratingStyle]}>
            <Text style={styles.infoText}>Min. order €10.00</Text>
            <Text style={styles.dotSeparator}> · </Text>
            <Text style={styles.infoText}>🚲 €0.00</Text>
            <Text style={styles.dotSeparator}> · </Text>
            <Text style={styles.moreLink}>More</Text>
          </Animated.View>

          <Animated.View style={[styles.scheduleRow, scheduleStyle]}>
            <View style={styles.scheduleButton}>
              <Text style={styles.scheduleIcon}>📅</Text>
              <Text style={styles.scheduleText}>Schedule order</Text>
            </View>
            <View style={styles.shareButton}>
              <Text style={styles.shareIcon}>↗</Text>
            </View>
          </Animated.View>

          <Animated.View style={[styles.deliveryBanner, deliveryStyle]}>
            <View style={styles.deliveryIconCircle}>
              <Text style={styles.deliveryPercent}>%</Text>
            </View>
            <View>
              <Text style={styles.deliveryTitle}>0€ delivery fee</Text>
              <Text style={styles.deliveryLink}>Show details →</Text>
            </View>
          </Animated.View>

          <Animated.View style={mostOrderedStyle}>
            <View style={styles.mostOrderedHeader}>
              <Text style={styles.mostOrderedTitle}>Most ordered</Text>
              <Text style={styles.seeAllLink}>See all</Text>
            </View>
            <View style={styles.foodCardsRow}>
              <View style={styles.foodCard}>
                <View style={styles.foodCardImage} />
              </View>
              <View style={styles.foodCard}>
                <View style={styles.foodCardImage} />
              </View>
              <View style={styles.foodCard}>
                <View style={styles.foodCardImage} />
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 14,
  },
  shopName: {
    color: COLORS.textPrimary,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  ratingEmoji: {
    fontSize: 14,
    color: '#4cd964',
  },
  ratingText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  dotSeparator: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  closedText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: '500',
  },
  infoText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  moreLink: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '500',
  },
  orderInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  // Schedule button
  scheduleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  scheduleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.accent,
    gap: 8,
  },
  scheduleIcon: {
    fontSize: 16,
  },
  scheduleText: {
    color: COLORS.accent,
    fontSize: 15,
    fontWeight: '600',
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  // Delivery banner
  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    gap: 12,
    marginBottom: 24,
  },
  deliveryIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a3a4a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryPercent: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: '800',
  },
  deliveryTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  deliveryLink: {
    color: COLORS.accent,
    fontSize: 13,
    marginTop: 2,
  },
  // Most ordered
  mostOrderedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  mostOrderedTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  seeAllLink: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '500',
  },
  foodCardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  foodCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  foodCardImage: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
  },
});
