import React, { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import { Stocks, Dimensions } from '../types';
import { chartConstants, GRAY_LABELS } from '../constants';
import { Group, matchFont, Text } from '@shopify/react-native-skia';
import { abbreviateNumber, getDateString } from '../utils';
import {
  useStockChartDateTimeBounds,
  useStockChartValueBounds,
} from '../hooks/useStockChart';

export const StocksAxisLabels = React.memo(
  ({ stocks, dimensions }: { stocks: Stocks; dimensions: Dimensions }) => {
    const { dataPoints } = stocks;
    const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' });
    const fontStyle = {
      fontFamily,
      fontSize: 14,
    };
    const font = matchFont(fontStyle);

    const { minChartValueBound, maxChartValueBound } = useStockChartValueBounds(
      { stocks },
    );

    const { minChartDateTimeBound, maxChartDateTimeBound } =
      useStockChartDateTimeBounds({ stocks });

    const yAxisLabels = useMemo(() => {
      return Array.from(
        { length: chartConstants.HORIZONTAL_GRID_LINES },
        (_, index) => ({
          y:
            chartConstants.TOP_PADDING +
            ((dimensions.height -
              chartConstants.BOTTOM_PADDING -
              chartConstants.TOP_PADDING) *
              index) /
              (chartConstants.HORIZONTAL_GRID_LINES - 1),
          text: `${abbreviateNumber(
            maxChartValueBound -
              ((maxChartValueBound - minChartValueBound) * index) /
                (chartConstants.HORIZONTAL_GRID_LINES - 1),
          )}`,
          shouldShow: index !== chartConstants.HORIZONTAL_GRID_LINES - 1,
        }),
      );
    }, [dataPoints, minChartValueBound, maxChartValueBound, dimensions]);

    const xAxisLabels = useMemo(() => {
      return Array.from(
        { length: chartConstants.VERTICAL_GRID_LINES },
        (_, index) => ({
          x:
            ((dimensions.width - chartConstants.RIGHT_PADDING) * index) /
            (chartConstants.VERTICAL_GRID_LINES - 1),
          text:
            index === chartConstants.VERTICAL_GRID_LINES - 1
              ? 'NOW'
              : getDateString(
                  new Date(
                    minChartDateTimeBound +
                      ((maxChartDateTimeBound - minChartDateTimeBound) *
                        index) /
                        (chartConstants.VERTICAL_GRID_LINES - 1),
                  ),
                ),
          shouldShow: true,
        }),
      );
    }, [dataPoints, minChartValueBound, maxChartValueBound, dimensions]);

    const renderYAxisLabels = useCallback(
      ({
        y,
        text,
        shouldShow,
      }: {
        y: number;
        text: string;
        shouldShow: boolean;
      }) => {
        if (!shouldShow) return null;
        return (
          <Text
            x={dimensions.width - chartConstants.RIGHT_PADDING + 10}
            y={y + 15}
            text={text}
            font={font}
            color={GRAY_LABELS}
          />
        );
      },
      [dataPoints, dimensions, font],
    );

    const renderXAxisLabels = useCallback(
      ({
        x,
        text,
        shouldShow,
      }: {
        x: number;
        text: string;
        shouldShow: boolean;
      }) => {
        if (!shouldShow) return null;
        return (
          <Text
            x={x + 5}
            y={dimensions.height - chartConstants.BOTTOM_PADDING + 20}
            text={text}
            font={font}
            color={GRAY_LABELS}
          />
        );
      },
      [dataPoints, dimensions, font],
    );

    return (
      <Group>
        <Group>
          {xAxisLabels.map((label, index) => (
            <Group key={index}>{renderXAxisLabels(label)}</Group>
          ))}
        </Group>
        <Group>
          {yAxisLabels.map((label, index) => (
            <Group key={index}>{renderYAxisLabels(label)}</Group>
          ))}
        </Group>
      </Group>
    );
  },
);
