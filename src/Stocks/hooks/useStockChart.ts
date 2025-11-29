import { useMemo, useCallback } from 'react';
import { Dimensions, Stocks } from '../types';
import { chartConstants } from '../constants';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';

export const useStockChartValueBounds = ({ stocks }: { stocks: Stocks }) => {
  const maxChartValueBound = useMemo(
    () =>
      stocks.maxValue +
      (stocks.maxValue - stocks.minValue) /
        chartConstants.HORIZONTAL_GRID_LINES /
        2,
    [stocks],
  );
  const minChartValueBound = useMemo(
    () =>
      stocks.minValue -
      (stocks.maxValue - stocks.minValue) /
        chartConstants.HORIZONTAL_GRID_LINES /
        2,
    [stocks],
  );
  return { maxChartValueBound, minChartValueBound };
};

export const useStockChartDateTimeBounds = ({ stocks }: { stocks: Stocks }) => {
  const minChartDateTimeBound = useMemo(() => {
    return stocks.dataPoints[0].date.getTime();
  }, [stocks]);
  const maxChartDateTimeBound = useMemo(() => {
    return stocks.dataPoints[stocks.dataPoints.length - 1].date.getTime();
  }, [stocks]);
  return { minChartDateTimeBound, maxChartDateTimeBound };
};

export const useStockChartPath = ({
  stocks,
  dimensions,
  panX,
}: {
  stocks: Stocks;
  dimensions: Dimensions;
  panX: SharedValue<number>;
}) => {
  const { maxChartValueBound, minChartValueBound } = useStockChartValueBounds({
    stocks,
  });
  const { minChartDateTimeBound, maxChartDateTimeBound } =
    useStockChartDateTimeBounds({ stocks });

  const getXY = useCallback(
    (dataPoint: { date: Date; value: number }) => {
      const { dataPoints } = stocks;
      if (dataPoints.length === 0) {
        return { x: 0, y: 0 };
      }
      const x =
        ((dimensions.width - chartConstants.RIGHT_PADDING) *
          (dataPoint.date.getTime() - minChartDateTimeBound)) /
        (maxChartDateTimeBound - minChartDateTimeBound);
      const y =
        chartConstants.TOP_PADDING +
        (dimensions.height -
          chartConstants.TOP_PADDING -
          chartConstants.BOTTOM_PADDING) *
          (1 -
            (dataPoint.value - minChartValueBound) /
              (maxChartValueBound - minChartValueBound));
      return { x, y };
    },
    [
      dimensions,
      minChartDateTimeBound,
      maxChartDateTimeBound,
      minChartValueBound,
      maxChartValueBound,
    ],
  );

  const modifiedDataPoints = useMemo(() => {
    return stocks.dataPoints.map((dataPoint) => {
      return { ...dataPoint, dateTime: dataPoint.date.getTime() };
    });
  }, [stocks]);

  const closestDataPointAndXY = useDerivedValue(() => {
    const getClosestDataPoint = (x: number) => {
      ('worklet');
      if (modifiedDataPoints.length === 0) {
        return { dateTime: new Date().getTime(), value: 0 };
      }

      const dateTime = new Date(
        minChartDateTimeBound +
          ((maxChartDateTimeBound - minChartDateTimeBound) * x) /
            (dimensions.width - chartConstants.RIGHT_PADDING),
      ).getTime();

      let closestDataPoint = modifiedDataPoints[0];
      for (let i = 0; i < modifiedDataPoints.length; i++) {
        const point = modifiedDataPoints[i];
        if (
          point.dateTime <= dateTime &&
          point.dateTime >= closestDataPoint.dateTime
        ) {
          closestDataPoint = point;
        } else {
          break;
        }
      }
      return closestDataPoint;
    };

    /** Unfortunate that we can't get returned values from JS thread method */
    const _getXY = (modifiedDataPoint: { dateTime: number; value: number }) => {
      'worklet';
      if (modifiedDataPoints.length === 0) {
        return { x: 0, y: 0 };
      }
      const x =
        ((dimensions.width - chartConstants.RIGHT_PADDING) *
          (modifiedDataPoint.dateTime - minChartDateTimeBound)) /
        (maxChartDateTimeBound - minChartDateTimeBound);
      const y =
        chartConstants.TOP_PADDING +
        (dimensions.height -
          chartConstants.TOP_PADDING -
          chartConstants.BOTTOM_PADDING) *
          (1 -
            (modifiedDataPoint.value - minChartValueBound) /
              (maxChartValueBound - minChartValueBound));
      return { x, y };
    };

    const closestDataPoint = getClosestDataPoint(panX.value);
    const { x, y } = _getXY(closestDataPoint);
    return { x, y, ...closestDataPoint };
  }, [
    modifiedDataPoints,
    dimensions,
    minChartDateTimeBound,
    maxChartDateTimeBound,
    minChartValueBound,
    maxChartValueBound,
    panX,
  ]);

  const isRed = useMemo(() => {
    return stocks.maxValue < stocks.minValue ? true : false;
  }, [stocks]);

  return { getXY, isRed, closestDataPointAndXY };
};
