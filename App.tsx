import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StocksChartScreen from './src/Stocks/components/StocksChartScreen';

export default function App() {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <StocksChartScreen />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
