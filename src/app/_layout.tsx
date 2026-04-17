import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <Stack
        screenOptions={{
          contentStyle: styles.content,
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="stocks-chart"
          options={{
            title: 'Stocks',
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Stack.Screen
          name="threads-pull-to-refresh"
          options={{
            title: 'Threads',
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Stack.Screen
          name="threads-spoiler-masking"
          options={{
            title: 'Threads Spoiler',
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Stack.Screen
          name="duolingo-drag-sort-words"
          options={{
            title: 'Duolingo',
            headerTitle() {
              return (
                <View style={[styles.header]}>
                  <Image
                    source={require('../DuoLingoDragSortWords/assets/duolingo-icon.png')}
                    style={styles.headerIcon}
                  />
                  <Text style={styles.headerTitle}>Duolingo</Text>
                </View>
              );
            },
            headerTitleStyle: { color: 'white' },
          }}
        />
        <Stack.Screen
          name="wolt-shop-loading"
          options={{
            title: 'Wolt',
            headerTitle() {
              return (
                <View style={[styles.header]}>
                  <Image
                    source={require('../WoltShopLoading/assets/wolt-shop-loading.png')}
                    style={styles.headerIcon}
                  />
                  <Text style={styles.headerTitle}>Wolt</Text>
                </View>
              );
            },
            contentStyle: { padding: 0 },
          }}
        />
        <Stack.Screen
          name="chatgpt-voice-profiles"
          options={{
            title: 'ChatGPT',
            headerTitle() {
              return (
                <View style={[styles.header]}>
                  <View style={styles.chatgptLogoContainer}>
                    <Image
                      source={require('../ChatGPTVoiceProfiles/assets/ChatGPT_logo.png')}
                      style={{ width: 28, height: 28 }}
                    />
                  </View>
                  <Text style={styles.headerTitle}>ChatGPT</Text>
                </View>
              );
            },
            contentStyle: { padding: 0 },
          }}
        />
        <Stack.Screen
          name="youtube-music-swipe-bg-transition"
          options={{
            title: 'Youtube Music',
            headerTitle() {
              return (
                <View style={[styles.header]}>
                  <Image
                    source={require('../YoutubeMusicSwipeBgTransition/assets/youtube-music-logo.png')}
                    style={styles.headerIcon}
                  />
                  <Text style={styles.headerTitle}>Youtube Music</Text>
                </View>
              );
            },
            contentStyle: { padding: 0 },
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  chatgptLogoContainer: {
    width: 36,
    height: 36,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
