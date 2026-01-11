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
});
