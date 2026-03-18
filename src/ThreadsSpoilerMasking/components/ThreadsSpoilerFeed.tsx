import React from 'react';
import { View, FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { SpoilerPost } from './SpoilerPost';
import { MOCK_SPOILER_POSTS, PostData } from '../constants';

export const ThreadsSpoilerFeed: React.FC = () => {
  const renderItem: ListRenderItem<PostData> = ({ item }) => (
    <SpoilerPost
      username={item.username}
      avatar={item.avatar}
      content={item.content}
      spoilerContent={item.spoilerContent}
      timestamp={item.timestamp}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_SPOILER_POSTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
