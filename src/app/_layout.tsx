import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RootLayout() {
  const insets = useSafeAreaInsets();
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
          options={{ title: 'Home', headerShown: false }}
        />
        <Stack.Screen
          name="stocks-chart"
          options={{ title: 'Stocks', headerTitleStyle: { color: 'white' } }}
        />
        <Stack.Screen
          name="threads-pull-to-refresh"
          options={{ title: 'Threads', headerTitleStyle: { color: 'white' } }}
        />
        <Stack.Screen
          name="duolingo-drag-sort-words"
          options={{
            title: 'Duolingo',
            header(props) {
              return (
                <View style={[styles.header, { paddingTop: insets.top }]}>
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
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
