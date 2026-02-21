import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import { SONGS_DATA } from '../constants';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBackward,
  faChevronDown,
  faEllipsisVertical,
  faForward,
  faPause,
  faPlay,
  faRepeat,
  faShuffle,
} from '@fortawesome/free-solid-svg-icons';
import { YoutubeMusicBackground } from './YoutubeMusicBackground';
import { useRef, useState } from 'react';

const width = Dimensions.get('window').width;

export default function YoutubeMusicSwipeBgTransitionScreen() {
  const carouselRef = useRef<ICarouselInstance>(null);

  const currentSongIndexSV = useSharedValue<number>(0);

  const [currentSong, setCurrentSong] = useState(SONGS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  useAnimatedReaction(
    () => currentSongIndexSV.value,
    (value) => {
      const index =
        Math.round(value) === SONGS_DATA.length ? 0 : Math.round(value);
      runOnJS(setCurrentSong)(SONGS_DATA[index]);
    },
  );

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <YoutubeMusicBackground currentSongIndexSV={currentSongIndexSV} />
      </View>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <FontAwesomeIcon icon={faChevronDown} color="white" />
          <FontAwesomeIcon icon={faEllipsisVertical} color="white" />
        </View>
        <Carousel
          ref={carouselRef}
          width={width}
          height={width}
          data={SONGS_DATA}
          onProgressChange={currentSongIndexSV}
          renderItem={({ item }) => {
            return (
              <View style={styles.carouselItem}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.image,
                  }}
                />
              </View>
            );
          }}
        />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{currentSong.title}</Text>
          <Text style={styles.songArtist}>{currentSong.artist}</Text>
        </View>
        <View style={styles.seeker}>
          <View style={styles.seekerBar} />
          <View style={styles.seekerProgress} />
        </View>
        <View style={styles.controls}>
          <Pressable>
            <FontAwesomeIcon icon={faShuffle} color="white" />
          </Pressable>
          <Pressable onPress={() => carouselRef.current?.prev()}>
            <FontAwesomeIcon icon={faBackward} color="white" />
          </Pressable>
          <Pressable
            onPress={() => setIsPlaying(!isPlaying)}
            style={styles.playButton}
          >
            <FontAwesomeIcon
              icon={isPlaying ? faPause : faPlay}
              color="black"
              size={32}
            />
          </Pressable>
          <Pressable onPress={() => carouselRef.current?.next()}>
            <FontAwesomeIcon icon={faForward} color="white" />
          </Pressable>
          <Pressable>
            <FontAwesomeIcon icon={faRepeat} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  safeAreaView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  songInfo: {
    paddingHorizontal: 20,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 10,
  },
  songArtist: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)',
    paddingBottom: 20,
  },
  seeker: {
    margin: 20,
  },
  seekerBar: {
    width: '100%',
    height: 2,
    backgroundColor: 'white',
  },
  seekerProgress: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    top: -4,
    left: 10,
  },
  controls: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'white',
    borderRadius: 60,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
