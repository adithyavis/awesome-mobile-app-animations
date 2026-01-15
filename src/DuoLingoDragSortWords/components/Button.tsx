import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { DUOLINGO_GRAY, DUOLINGO_GREEN } from '../constants';
import { useCallback } from 'react';

interface ButtonProps {
  onPress: () => void;
  disabled: boolean;
  children: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress: onPressProp,
  disabled,
  children,
}) => {
  const buttonScale = useSharedValue(1);
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });
  const onPress = useCallback(() => {
    buttonScale.value = withSpring(0.95, { damping: 10, stiffness: 400 });
    setTimeout(() => {
      buttonScale.value = withSpring(1, { damping: 10, stiffness: 400 });
    }, 100);
    onPressProp();
  }, [onPressProp]);
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Animated.View
        style={[
          styles.checkButton,
          disabled && styles.checkButtonDisabled,
          animatedButtonStyle,
        ]}
      >
        <Text style={styles.checkButtonText}>{children}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkButton: {
    backgroundColor: DUOLINGO_GREEN,
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 16,
    minWidth: 200,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#45A302',
  },
  checkButtonDisabled: {
    backgroundColor: DUOLINGO_GRAY,
    borderBottomColor: '#6E6E6E',
    opacity: 0.5,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
