import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
  ViewToken,
} from 'react-native';
import FluidOrb from './FluidOrb';
import { VOICE_PROFILES, ORB_SIZE } from '../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ChatGPTVoiceProfilesScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const activeProfile = VOICE_PROFILES[activeIndex];

  const renderItem = useCallback(
    () => (
      <View style={styles.orbPage}>
        <FluidOrb />
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((item: any) => item.name, []);

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.orbContainer}>
          <FlatList
            ref={flatListRef}
            data={VOICE_PROFILES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>
        <Text style={styles.voiceName}>{activeProfile.name}</Text>
        <Text style={styles.voiceDescription}>{activeProfile.description}</Text>

        <View style={styles.dotsContainer}>
          {VOICE_PROFILES.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 100,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 60,
    marginBottom: 20,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  orbContainer: { height: ORB_SIZE + 100 },
  orbPage: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  voiceDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 40,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  doneButton: {
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ChatGPTVoiceProfilesScreen;
