import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThreadsSpoilerFeed } from './ThreadsSpoilerFeed';

export default function ThreadsSpoilerMaskingScreen() {
  return (
    <View style={styles.container}>
      <ThreadsSpoilerFeed />
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
