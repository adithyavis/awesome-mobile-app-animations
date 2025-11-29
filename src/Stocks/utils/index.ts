export const getRandomStocksGenerator = (
  startDate: Date,
  endDate: Date,
  noOfDataPoints: number,
) => {
  const dataPoints = [];
  const dateDiff =
    (endDate.getTime() - startDate.getTime()) / (noOfDataPoints - 1);
  let previousValue = 100000;

  const random = Math.random();
  const diffRandomizer = random > 0.5 ? 0.45 : 0.55;
  const spikeDiffRandomizer = random > 0.5 ? 0.7 : 0.3;

  for (let i = 0; i < noOfDataPoints; i++) {
    const date = new Date(startDate.getTime() + i * dateDiff);
    const shouldSpikeOrDrop = Math.random() > 0.95; // every once in a while, add a
    let value;
    if (shouldSpikeOrDrop) {
      value =
        previousValue +
        Math.random() * 2000 * (Math.random() > spikeDiffRandomizer ? 1 : -1);
    } else {
      value =
        previousValue +
        Math.random() * 1000 * (Math.random() > diffRandomizer ? 1 : -1);
    }
    dataPoints.push({ date, value });
    previousValue = value;
  }
  return {
    dataPoints,
    minValue: Math.min(...dataPoints.map((point) => point.value)),
    maxValue: Math.max(...dataPoints.map((point) => point.value)),
    latestValue: dataPoints[dataPoints.length - 1].value,
    initialValue: dataPoints[0].value,
  };
};

export const getDateString = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const abbreviateNumber = (number: number) => {
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number;
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;
  return scaled.toFixed(1) + suffix;
};
