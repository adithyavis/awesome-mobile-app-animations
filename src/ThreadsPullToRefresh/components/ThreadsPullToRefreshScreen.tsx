import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThreadsPullToRefresh } from './ThreadsPullToRefresh';

export default function ThreadsPullToRefreshScreen() {
  return (
    <View style={styles.container}>
      <ThreadsPullToRefresh />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 80,
  },
});
