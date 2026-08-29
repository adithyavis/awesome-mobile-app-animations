import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  COLORS,
  COMPOSER_PAD_V,
  H_MARGIN,
  PILL_HEIGHT,
  PLUS_SIZE,
} from '../constants';

const AnimatedGlass = Animated.createAnimatedComponent(LiquidGlassView);

type Props = {
  menu: SharedValue<number>;
  keyboardHeight: SharedValue<number>;
  onPlusPress: () => void;
};

export default function Composer({ menu, keyboardHeight, onPlusPress }: Props) {
  const insets = useSafeAreaInsets();
  const insetBottom = insets.bottom;

  const wrapStyle = useAnimatedStyle(() => {
    'worklet';
    const kb = Math.abs(keyboardHeight.value);
    const lift = Math.max(0, kb - insetBottom);
    return { transform: [{ translateY: -lift }] };
  });

  const plusGlyphStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ rotate: `${interpolate(menu.value, [0, 1], [0, 45])}deg` }],
    };
  });

  const plusTap = Gesture.Tap()
    .maxDistance(12)
    .onEnd(() => {
      runOnJS(onPlusPress)();
    });

  return (
    <Animated.View
      style={[
        styles.wrap,
        { paddingBottom: insetBottom + COMPOSER_PAD_V },
        wrapStyle,
      ]}
    >
      <View style={styles.row}>
        <GestureDetector gesture={plusTap}>
          <AnimatedGlass
            interactive
            effect="regular"
            colorScheme="dark"
            style={styles.plus}
          >
            <Animated.View style={plusGlyphStyle}>
              <Ionicons name="add" size={26} color={COLORS.text} />
            </Animated.View>
          </AnimatedGlass>
        </GestureDetector>

        <LiquidGlassView
          interactive
          effect="regular"
          colorScheme="dark"
          tintColor={COLORS.glassTint}
          style={styles.inputPill}
        >
          <TextInput
            placeholder="Ask ChatGPT"
            placeholderTextColor={COLORS.placeholder}
            style={styles.input}
          />
          <Ionicons
            name="mic-outline"
            size={22}
            color={COLORS.text}
            style={styles.mic}
          />
          <View style={styles.voice}>
            <Ionicons name="pulse" size={18} color="#fff" />
          </View>
        </LiquidGlassView>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: COMPOSER_PAD_V,
    paddingHorizontal: H_MARGIN,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plus: {
    width: PLUS_SIZE,
    height: PLUS_SIZE,
    borderRadius: PLUS_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inputPill: {
    flex: 1,
    height: PILL_HEIGHT,
    marginLeft: 8,
    borderRadius: PILL_HEIGHT / 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 6,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 17,
    padding: 0,
  },
  mic: {
    marginHorizontal: 8,
  },
  voice: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.voiceButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
