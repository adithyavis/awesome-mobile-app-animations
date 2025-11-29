export const GREEN = '#00aa76';
export const RED = '#ff4143';
export const BLUE = '#0070f3';
export const PAN_INDICATOR_COLOR = 'rgba(40, 40, 40, 0.8 )';
export const PAN_INDICATOR_DATE_COLOR = 'rgba(240, 240, 240, 1)';
export const GRAY_LABELS = 'rgba(160, 160, 160, 0.9)';
export const GRAY_GRID_LINES = 'rgba(80, 80, 80, 0.9)';
export const GRAY_GRID_LINES_BOLD = 'rgba(80, 80, 80, 1)';

export const PADDING_HORIZONTAL = 20;

export const FILTER_OPTIONS = [
  {
    label: '1D',
    days: 1,
    noOfDataPoints: 400,
    show: 'hrs',
  },
  {
    label: '3D',
    days: 3,
    noOfDataPoints: 400,
    show: 'hrs',
  },
  {
    label: '1W',
    days: 7,
    noOfDataPoints: 400,
    show: 'days',
  },
  {
    label: '1M',
    days: 30,
    noOfDataPoints: 800,
    show: 'days',
  },
  {
    label: '3M',
    days: 30,
    noOfDataPoints: 800,
    show: 'days',
  },
  {
    label: 'YTD',
    days: 120,
    noOfDataPoints: 800,
    show: 'days',
  },
  {
    label: '1Y',
    days: 365,
    noOfDataPoints: 800,
    show: 'months',
  },
  {
    label: '2Y',
    days: 730,
    noOfDataPoints: 800,
    show: 'months',
  },
  {
    label: '5Y',
    days: 1825,
    noOfDataPoints: 1600,
    show: 'years',
  },
];

export const chartConstants = {
  TOP_PADDING: 50,
  BOTTOM_PADDING: 40,
  RIGHT_PADDING: 60,
  VERTICAL_GRID_LINES: 3,
  HORIZONTAL_GRID_LINES: 6,
};

export const NEWS = [
  {
    publisher: 'Yahoo Finance UK',
    title: 'Pound Sterling to US Dollar Exchange values rises',
    description:
      'The Pound Sterling to US Dollar exchange rate has risen to 1.30, representing a 2.5% increase in value. This has been attributed to the recent economic data and the ongoing Brexit negotiations.',
    time: '2h ago',
  },
  {
    publisher: 'Bloomberg',
    title: 'Stock market volatility continues',
    description:
      'The stock market has continued to experience high levels of volatility, with the S&P 500 index experiencing a 2.5% increase in value over the past week.',
    time: '1h ago',
  },
  {
    publisher: 'Bloomberg',
    title: 'Stock market today: Dow Jones, Nasdaq, S&P 500',
    description:
      'With the increase in stock market volatility, the Dow Jones, Nasdaq, and S&P 500 have all experienced a 2.5% increase in value over the past week.',
    time: '1h ago',
  },
];
