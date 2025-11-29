export type DataPoint = {
  date: Date;
  value: number;
};

export type Stocks = {
  dataPoints: DataPoint[];
  minValue: number;
  maxValue: number;
  latestValue: number;
  initialValue: number;
};

export type Filter = {
  label: string;
  days: number;
  noOfDataPoints: number;
  show: string;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type News = {
  publisher: string;
  title: string;
  description: string;
  time: string;
};
