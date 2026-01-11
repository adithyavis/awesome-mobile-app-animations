import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedScrollHandler,
  runOnJS,
  useAnimatedStyle,
  withSequence,
  withRepeat,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { ThreadsLogo } from './ThreadsLogo';
import { Post } from './Post';
import { MOCK_POSTS, generateNewPost } from '../constants';

interface PostData {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<PostData>);

const REFRESH_THRESHOLD = 150;

export const ThreadsPullToRefresh: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>(MOCK_POSTS);
  const isRefreshingSV = useSharedValue(false);

  const scrollY = useSharedValue(0);
  const logoAnimationProgress = useSharedValue(0);
  const logoTranslationY = useSharedValue(0);

  const triggerRefresh = useCallback(() => {
    if (!isRefreshingSV.value) {
      isRefreshingSV.value = true;
      // Simulate API call
      setTimeout(() => {
        setPosts((prevPosts) => [generateNewPost(), ...prevPosts]);
        isRefreshingSV.value = false;
      }, 1500);
    }
  }, []);

  useAnimatedReaction(
    () => isRefreshingSV.value,
    (isRefreshing: boolean, previousIsRefreshing: boolean | null) => {
      if (isRefreshing === true) {
        logoAnimationProgress.value = withRepeat(
          withSequence(
            withTiming(0.1, { duration: 1000 }),
            withTiming(0.5, { duration: 1000 }),
          ),
          -1,
        );
      } else if (isRefreshing === false && previousIsRefreshing === true) {
        logoAnimationProgress.value = withSequence(
          withTiming(0.9, { duration: 500 }),
          withTiming(0, { duration: 0 }),
        );
      }
    },
  );

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        const offsetY = event.contentOffset.y;
        scrollY.value = offsetY;
        logoTranslationY.value = offsetY / 1.5;
        if (!isRefreshingSV.value) {
          logoAnimationProgress.value = Math.min(
            0.5,
            Math.abs(offsetY) / (REFRESH_THRESHOLD * 2),
          );
        }
        if (offsetY < -REFRESH_THRESHOLD) {
          runOnJS(triggerRefresh)();
        }
      },
    },
    [],
  );

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: logoTranslationY.value }],
    };
  });

  const renderItem: ListRenderItem<PostData> = ({ item }) => (
    <Post
      username={item.username}
      avatar={item.avatar}
      content={item.content}
      timestamp={item.timestamp}
    />
  );

  const refreshControl = React.useMemo(
    () => (
      <Animated.View style={[animatedLogoStyle, styles.refreshControl]}>
        <ThreadsLogo progress={logoAnimationProgress} />
      </Animated.View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={refreshControl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refreshControl: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
