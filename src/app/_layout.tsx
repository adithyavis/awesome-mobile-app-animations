import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

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
          options={{ title: 'Home', headerShown: false }}
        />
        <Stack.Screen name="stocks-chart" options={{ title: 'Stocks' }} />
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
});
