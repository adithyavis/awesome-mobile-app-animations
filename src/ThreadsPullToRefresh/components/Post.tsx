import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { THREADS_FOREGROUND, THREADS_GRAY } from '../constants';

interface PostProps {
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export const Post: React.FC<PostProps> = ({
  username,
  avatar,
  content,
  timestamp,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 15,
    fontWeight: '600',
    color: THREADS_FOREGROUND,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 14,
    color: THREADS_GRAY,
  },
  content: {
    fontSize: 15,
    color: THREADS_FOREGROUND,
    lineHeight: 20,
  },
});
