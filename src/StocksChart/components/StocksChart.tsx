import { Canvas } from '@shopify/react-native-skia';
import React, { useMemo, useState } from 'react';
import { Stocks } from '../types';
import { StocksChartGridLines } from './StocksChartGridLines';
import { StocksTrajectory } from './StocksTrajectory';
import { StocksAxisLabels } from './StocksAxisLabels';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import { chartConstants, PADDING_HORIZONTAL } from '../constants';
import { StyleSheet, View } from 'react-native';

export const StocksChart = React.memo(
  ({
    stocks,
    setShouldShowFilter,
  }: {
    stocks: Stocks;
    setShouldShowFilter: (shouldShowFilter: boolean) => void;
  }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const panX = useSharedValue(0);
    const isPanningSV = useSharedValue(false);

    useAnimatedReaction(
      () => isPanningSV.value,
      (isPanning) => {
        runOnJS(setShouldShowFilter)(!isPanning);
      },
    );

    const gesture = useMemo(
      () =>
        Gesture.Pan()
          .activateAfterLongPress(100)
          .onStart((e) => {
            isPanningSV.value = true;
            panX.value = Math.max(
              -PADDING_HORIZONTAL,
              Math.min(
                e.x - 20,
                dimensions.width - chartConstants.RIGHT_PADDING,
              ),
            );
          })
          .onChange((e) => {
            panX.value = Math.max(
              -20,
              Math.min(
                e.x - 20,
                dimensions.width - chartConstants.RIGHT_PADDING,
              ),
            );
          })
          .onEnd(() => {
            isPanningSV.value = false;
          }),
      [dimensions],
    );
    return (
      <GestureDetector gesture={gesture}>
        <View style={styles.chartContainer}>
          <Canvas
            style={styles.canvas}
            onLayout={({ nativeEvent }) =>
              setDimensions({
                width: nativeEvent.layout.width,
                height: nativeEvent.layout.height,
              })
            }
          >
            <StocksChartGridLines dimensions={dimensions} />
            <StocksAxisLabels stocks={stocks} dimensions={dimensions} />
            <StocksTrajectory
              stocks={stocks}
              dimensions={dimensions}
              isPanningSV={isPanningSV}
              panX={panX}
            />
          </Canvas>
        </View>
      </GestureDetector>
    );
  },
);

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
});
