import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  BLUE,
  FILTER_OPTIONS,
  GREEN,
  NEWS,
  PADDING_HORIZONTAL,
  RED,
} from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { StocksChart } from './StocksChart';
import { useEffect, useMemo, useState } from 'react';
import { getRandomStocksGenerator } from '../utils';
import { NewsItem } from './NewsItem';

export default function StocksChartScreen() {
  const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS[4]);
  const [shouldShowFilter, setShouldShowFilter] = useState(true);

  const [stocks, setStocks] = useState(
    getRandomStocksGenerator(
      new Date(new Date().setDate(new Date().getDate() - selectedFilter.days)),
      new Date(),
      selectedFilter.noOfDataPoints,
    ),
  );
  const latestValue = useMemo(
    () => Math.round(stocks.latestValue * 100) / 100,
    [stocks.latestValue],
  );
  const initialValue = useMemo(
    () => Math.round(stocks.initialValue * 100) / 100,
    [stocks.initialValue],
  );
  const changePercentage = useMemo(
    () =>
      Math.round(((latestValue - initialValue) / initialValue) * 100 * 100) /
      100,
    [latestValue, initialValue],
  );

  useEffect(() => {
    setStocks(
      getRandomStocksGenerator(
        new Date(
          new Date().setDate(new Date().getDate() - selectedFilter.days),
        ),
        new Date(),
        selectedFilter.noOfDataPoints,
      ),
    );
  }, [selectedFilter]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dow Jones</Text>
          <Text style={styles.headerSubtitle}>
            Dow Jones Industrial Average
          </Text>
          <FontAwesomeIcon icon={faEllipsis} style={styles.headerIcon} />
        </View>
        <View style={styles.divider} />
        <View style={styles.stockInfoContainer}>
          <Text style={styles.stockInfoValue}>{latestValue}</Text>
          <Text
            style={[
              styles.stockInfoChangePercentage,
              { color: changePercentage > 0 ? GREEN : RED },
            ]}
          >
            {Math.abs(changePercentage)}%
          </Text>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.filterContainerWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterContainer}
            >
              {shouldShowFilter &&
                FILTER_OPTIONS.map((filter) => (
                  <Pressable
                    key={filter.label}
                    onPress={() => setSelectedFilter(filter)}
                    style={[
                      styles.filterButton,
                      selectedFilter.label === filter.label &&
                        styles.selectedFilterButton,
                    ]}
                  >
                    <Text style={styles.filterLabel}>{filter.label}</Text>
                  </Pressable>
                ))}
            </ScrollView>
          </View>
          <StocksChart
            stocks={stocks}
            setShouldShowFilter={setShouldShowFilter}
          />
        </View>
        <View style={styles.moreDataContainer}>
          <Text style={styles.moreDataText}>More Data From Yahoo Finance</Text>
          {NEWS.map((news, index) => (
            <NewsItem key={index} news={news} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingRight: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  headerIcon: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 'auto',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: PADDING_HORIZONTAL,
    marginTop: 15,
    marginBottom: 15,
  },
  stockInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  stockInfoValue: {
    fontSize: 20,
    color: 'white',
    paddingRight: 10,
  },
  stockInfoChangePercentage: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  filterContainerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  filterContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 20,
    borderRadius: 5,
  },
  selectedFilterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterLabel: {
    fontSize: 14,
    color: 'white',
  },
  chartContainer: {
    height: 440,
  },
  moreDataContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 10,
  },
  moreDataText: {
    fontSize: 16,
    color: BLUE,
  },
});
