import React, { useMemo, useCallback } from 'react';
import { Group, Path, Skia } from '@shopify/react-native-skia';
import {
  chartConstants,
  GRAY_GRID_LINES,
  GRAY_GRID_LINES_BOLD,
} from '../constants';
import { Dimensions } from '../types';

export const StocksChartGridLines = React.memo(
  ({ dimensions }: { dimensions: Dimensions }) => {
    const gridWidths = useMemo(
      () =>
        Array.from(
          { length: chartConstants.VERTICAL_GRID_LINES },
          (_, index) => ({
            width:
              ((dimensions.width - chartConstants.RIGHT_PADDING) * index) /
              (chartConstants.VERTICAL_GRID_LINES - 1),
            strokeWidth: 0.5,
            strokeColor: GRAY_GRID_LINES,
          }),
        ),
      [dimensions.height],
    );

    const gridHeights = useMemo(
      () =>
        Array.from(
          { length: chartConstants.HORIZONTAL_GRID_LINES },
          (_, index) => ({
            height:
              chartConstants.TOP_PADDING +
              ((dimensions.height -
                chartConstants.TOP_PADDING -
                chartConstants.BOTTOM_PADDING) *
                index) /
                (chartConstants.HORIZONTAL_GRID_LINES - 1),
            strokeWidth:
              index === chartConstants.HORIZONTAL_GRID_LINES - 1 ? 2 : 0.5,
            strokeColor:
              index === chartConstants.HORIZONTAL_GRID_LINES - 1
                ? GRAY_GRID_LINES_BOLD
                : GRAY_GRID_LINES,
          }),
        ),
      [dimensions.height],
    );

    const renderVerticalPath = useCallback(
      (item: { width: number; strokeWidth: number; strokeColor: string }) => {
        const path = Skia.Path.Make();
        path.moveTo(item.width, chartConstants.TOP_PADDING);
        path.lineTo(item.width, dimensions.height);
        return (
          <Path
            path={path}
            style="stroke"
            strokeJoin="round"
            strokeWidth={item.strokeWidth}
            color={item.strokeColor}
          />
        );
      },
      [dimensions.width],
    );

    const renderHorizontalPath = useCallback(
      (item: { height: number; strokeWidth: number; strokeColor: string }) => {
        const path = Skia.Path.Make();
        path.moveTo(0, item.height);
        path.lineTo(dimensions.width, item.height);
        return (
          <Path
            path={path}
            style="stroke"
            strokeJoin="round"
            strokeWidth={item.strokeWidth}
            color={item.strokeColor}
          />
        );
      },
      [dimensions.width],
    );

    return (
      <Group>
        {gridWidths.map((item, index) => (
          <Group key={index}>{renderVerticalPath(item)}</Group>
        ))}
        {gridHeights.map((item, index) => (
          <Group key={index}>{renderHorizontalPath(item)}</Group>
        ))}
      </Group>
    );
  },
);
