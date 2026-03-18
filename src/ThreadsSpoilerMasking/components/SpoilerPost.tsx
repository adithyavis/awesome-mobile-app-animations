import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { THREADS_FOREGROUND, THREADS_GRAY } from '../constants';
import { MaskedText } from './MaskedText';

interface SpoilerPostProps {
  username: string;
  avatar: string;
  content: string;
  spoilerContent?: string;
  timestamp: string;
}

export const SpoilerPost: React.FC<SpoilerPostProps> = ({
  username,
  avatar,
  content,
  spoilerContent,
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
        {spoilerContent && (
          <View style={styles.spoilerContainer}>
            {spoilerContent.split('\n').map((line, index) => (
              <MaskedText key={index} style={styles.spoilerText}>
                {line}
              </MaskedText>
            ))}
          </View>
        )}
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
  spoilerContainer: {
    marginTop: 8,
  },
  spoilerLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: THREADS_FOREGROUND,
    marginBottom: 4,
  },
  spoilerText: {
    fontSize: 15,
    color: THREADS_FOREGROUND,
    lineHeight: 20,
  },
});
