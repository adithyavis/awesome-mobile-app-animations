import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Awesome Mobile App Animations</Text>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => router.push('/chatgpt-voice-profiles')}
        >
          <View style={styles.chatgptIcon}>
            <Image
              source={require('../ChatGPTVoiceProfiles/assets/ChatGPT_logo.png')}
              style={{ width: 28, height: 28 }}
            />
          </View>
          <Text style={styles.buttonText}>ChatGPT: Voice Profiles</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => router.push('/threads-spoiler-masking')}
        >
          <Image
            source={require('../ThreadsSpoilerMasking/assets/Threads.png')}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Threads: Spoiler Masking</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => router.push('/wolt-shop-loading')}
        >
          <Image
            source={require('../WoltShopLoading/assets/wolt-shop-loading.png')}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Wolt: Shop Image Loading</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => router.push('/stocks-chart')}
        >
          <Image
            source={require('../StocksChart/assets/stocks-icon.webp')}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Stocks: Chart</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => router.push('/threads-pull-to-refresh')}
        >
          <Image
            source={require('../ThreadsPullToRefresh/assets/Threads.png')}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Threads: Pull to Refresh</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => router.push('/duolingo-drag-sort-words')}
        >
          <Image
            source={require('../DuoLingoDragSortWords/assets/duolingo-icon.png')}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Duolingo: Drag Sort Words</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => router.push('/youtube-music-swipe-bg-transition')}
        >
          <Image
            source={require('../YoutubeMusicSwipeBgTransition/assets/youtube-music-logo.png')}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>YTMusic: Swipe Bg Transition</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#05937c',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  duolingoIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    backgroundColor: '#58CC02',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  duolingoIconText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  woltIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    backgroundColor: '#009de0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  woltIconText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  chatgptIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  chatgptIconText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
