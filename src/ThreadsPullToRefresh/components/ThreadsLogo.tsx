import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export const ThreadsLogo: React.FC<{ progress: SharedValue<number> }> = ({
  progress,
}) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      progress: progress.value,
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        animatedProps={animatedProps}
        source={require('../assets/threads-pull-to-refresh.json')}
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 60,
    height: 60,
  },
});
