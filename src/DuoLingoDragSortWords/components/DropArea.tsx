import { StyleSheet, View } from 'react-native';
import { useLayoutEffect, useRef } from 'react';

import { DUOLINGO_BORDER, SENTENCE_ROW_HEIGHT } from '../constants';
import { Layout } from '../types';

interface DropAreaProps {
  onDropAreaLayout: (layout: Partial<Layout>) => void;
}

export const DropArea: React.FC<DropAreaProps> = ({ onDropAreaLayout }) => {
  const ref = useRef<View>(null);
  useLayoutEffect(() => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      onDropAreaLayout({
        x,
        y,
        width,
        height,
        pageX,
        pageY,
      });
    });
  }, [onDropAreaLayout]);
  return (
    <View ref={ref} style={styles.sentenceRowContainer}>
      <View style={styles.sentenceRow} />
      <View style={styles.sentenceRow} />
      <View style={styles.sentenceRow} />
    </View>
  );
};

const styles = StyleSheet.create({
  sentenceRowContainer: {
    marginBottom: 40,
  },
  sentenceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: DUOLINGO_BORDER,
    height: SENTENCE_ROW_HEIGHT,
    gap: 8,
    marginBottom: -2,
  },
});
