import React from 'react';
import { News } from '../types';
import { StyleSheet, Text, View } from 'react-native';

export const NewsItem = React.memo(({ news }: { news: News }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.publisher}>{news.publisher}</Text>
      <Text style={styles.title}>{news.title}</Text>
      <Text style={styles.description}>{news.description}</Text>
      <Text style={styles.time}>{news.time}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  publisher: {
    fontSize: 12,
    paddingBottom: 5,
    color: 'gray',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: 'white',
  },
  description: {
    fontSize: 14,
    paddingBottom: 5,
    color: 'gray',
  },
  time: {
    fontSize: 10,
    color: 'gray',
    fontWeight: 'bold',
  },
});
