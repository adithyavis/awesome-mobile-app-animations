import React, { useMemo } from 'react';
import {
  Group,
  Path,
  Skia,
  LinearGradient,
  Circle,
  matchFont,
  Text,
  FontWeight,
} from '@shopify/react-native-skia';
import { Stocks, Dimensions } from '../types';
import { useStockChartPath } from '../hooks/useStockChart';
import {
  RED,
  GREEN,
  chartConstants,
  BLUE,
  PAN_INDICATOR_COLOR,
  PAN_INDICATOR_DATE_COLOR,
} from '../constants';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import { Platform } from 'react-native';

const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' });
const fontStyle: any = {
  fontFamily,
  fontSize: 16,
  fontWeight: FontWeight.Bold,
};
const font = matchFont(fontStyle);

export const StocksTrajectory = React.memo(
  ({
    stocks,
    dimensions,
    isPanningSV,
    panX,
  }: {
    stocks: Stocks;
    dimensions: Dimensions;
    isPanningSV: SharedValue<boolean>;
    panX: SharedValue<number>;
  }) => {
    const { isRed, getXY, closestDataPointAndXY } = useStockChartPath({
      stocks,
      dimensions,
      panX,
    });

    const path = useMemo(() => {
      const { dataPoints } = stocks;
      const path = Skia.Path.Make();
      const { x, y } = getXY(dataPoints[0]);
      path.moveTo(x, y);
      for (let i = 1; i < dataPoints.length; i++) {
        const { x, y } = getXY(dataPoints[i]);
        path.lineTo(x, y);
      }
      return path;
    }, [stocks, getXY]);

    const areaPath = useMemo(() => {
      const { dataPoints } = stocks;
      const path = Skia.Path.Make();
      path.moveTo(0, dimensions.height - chartConstants.BOTTOM_PADDING);
      for (let i = 0; i < dataPoints.length; i++) {
        const { x, y } = getXY(dataPoints[i]);
        path.lineTo(x, y);
      }
      path.lineTo(
        dimensions.width - chartConstants.RIGHT_PADDING,
        dimensions.height - chartConstants.BOTTOM_PADDING,
      );
      path.close();
      return path;
    }, [stocks, getXY, dimensions]);

    const linearGradientStart = useDerivedValue(() => {
      return { x: 0, y: chartConstants.TOP_PADDING };
    }, []);

    const linearGradientEnd = useDerivedValue(() => {
      return {
        x: 0,
        y:
          dimensions.height -
          chartConstants.TOP_PADDING -
          chartConstants.BOTTOM_PADDING,
      };
    }, [dimensions]);

    const color = useDerivedValue(() => {
      return isPanningSV.value ? BLUE : isRed ? RED : GREEN;
    }, [isPanningSV, isRed]);

    const gradientColors = useDerivedValue(() => {
      const getHexadecimal = (color: string) => {
        return (percentage: number): string => {
          const decimal = `0${Math.round(255 * (percentage / 100)).toString(
            16,
          )}`
            .slice(-2)
            .toUpperCase();
          return color + decimal;
        };
      };
      return [
        getHexadecimal(color.value)(70),
        getHexadecimal(color.value)(60),
        getHexadecimal(color.value)(50),
        getHexadecimal(color.value)(30),
        getHexadecimal(color.value)(10),
      ];
    }, [color]);

    const panIndicatorOpacity = useDerivedValue(() => {
      return isPanningSV.value ? 1 : 0;
    }, [isPanningSV]);

    const panIndicatorDotX = useDerivedValue(() => {
      return closestDataPointAndXY.value.x;
    }, [closestDataPointAndXY]);

    const panIndicatorDotY = useDerivedValue(() => {
      return closestDataPointAndXY.value.y;
    }, [closestDataPointAndXY]);

    const panIndicatorLinePath = useDerivedValue(() => {
      const path = Skia.Path.Make();
      path.moveTo(closestDataPointAndXY.value.x, chartConstants.TOP_PADDING);
      path.lineTo(
        closestDataPointAndXY.value.x,
        dimensions.height - chartConstants.BOTTOM_PADDING,
      );
      return path;
    }, [closestDataPointAndXY, dimensions]);

    const panIndicatorValueText = useDerivedValue(() => {
      return closestDataPointAndXY.value.value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }, [closestDataPointAndXY]);

    const panIndicatorValueX = useDerivedValue(() => {
      return Math.max(0, closestDataPointAndXY.value.x - 30);
    }, [closestDataPointAndXY]);

    const panIndicatorValueY = useDerivedValue(() => {
      return chartConstants.TOP_PADDING - 5;
    }, [closestDataPointAndXY]);

    const panIndicatorDateText = useDerivedValue(() => {
      return new Date(closestDataPointAndXY.value.dateTime).toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        },
      );
    }, [closestDataPointAndXY]);

    const panIndicatorDateX = useDerivedValue(() => {
      return dimensions.width / 2 - 50;
    }, [dimensions]);

    const panIndicatorDateY = useDerivedValue(() => {
      return chartConstants.TOP_PADDING - 20;
    }, []);

    return (
      <Group>
        <Path
          path={path}
          style="stroke"
          strokeJoin="round"
          strokeWidth={2}
          color={color}
        />
        <Path path={areaPath} style="fill">
          <LinearGradient
            start={linearGradientStart}
            end={linearGradientEnd}
            colors={gradientColors}
          />
        </Path>
        <Group opacity={panIndicatorOpacity}>
          <Path
            path={panIndicatorLinePath}
            style="stroke"
            strokeJoin="round"
            strokeWidth={2}
            color={color}
          />
          <Circle
            cx={panIndicatorDotX}
            cy={panIndicatorDotY}
            r={10}
            strokeWidth={1}
            style="fill"
            color={color}
          />
          <Circle
            cx={panIndicatorDotX}
            cy={panIndicatorDotY}
            r={10}
            strokeWidth={3}
            style="stroke"
            color={PAN_INDICATOR_COLOR}
          />
          <Text
            x={panIndicatorValueX}
            y={panIndicatorValueY}
            text={panIndicatorValueText}
            font={font}
            color={color}
          />
          <Text
            x={panIndicatorDateX}
            y={panIndicatorDateY}
            text={panIndicatorDateText}
            font={font}
            color={PAN_INDICATOR_DATE_COLOR}
          />
        </Group>
      </Group>
    );
  },
);
