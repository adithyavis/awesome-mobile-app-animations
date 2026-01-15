import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { DUOLINGO_BORDER, WORD_HEIGHT, DUOLINGO_DARK_GRAY } from '../constants';
import { Layout } from '../types';

interface DraggableWordProps {
  id: string;
  text: string;
  draggableWordTranslateMapSV: SharedValue<
    Record<string, { x: number; y: number }>
  >;
  computeDraggableWordOrderAndPositions: (props: {
    isDragging: boolean;
    draggedWordId: string;
    draggedWordTranslateY: number;
    draggedWordTranslateX: number;
  }) => void;
  onWordLayout: (id: string, layout: Partial<Layout>) => void;
  onWordTap: (wordId: string) => void;
}

export const DraggableWord: React.FC<DraggableWordProps> = ({
  id,
  text,
  draggableWordTranslateMapSV,
  computeDraggableWordOrderAndPositions,
  onWordLayout,
  onWordTap,
}) => {
  const ref = useRef<View>(null);

  const translateXSV = useSharedValue(draggableWordTranslateMapSV.value[id].x);
  const translateYSV = useSharedValue(draggableWordTranslateMapSV.value[id].y);

  const isDraggingSV = useSharedValue(false);
  const isTranslatingAfterDragStartSV = useSharedValue(false);
  const preTranslateXSV = useSharedValue(0);
  const preTranslateYSV = useSharedValue(0);
  const isPressedSV = useSharedValue(false);

  useAnimatedReaction(
    () => ({
      translate: draggableWordTranslateMapSV.value[id],
      isDragging: isDraggingSV.value,
    }),
    ({ translate, isDragging }) => {
      if (isDragging) {
        isTranslatingAfterDragStartSV.value = true;
      }
      if (!isDragging) {
        translateXSV.value = withSpring(
          translate.x,
          {
            damping: 10,
          },
          () => {
            isTranslatingAfterDragStartSV.value = false;
          },
        );
        translateYSV.value = withSpring(
          translate.y,
          {
            damping: 10,
          },
          () => {
            isTranslatingAfterDragStartSV.value = false;
          },
        );
      }
    },
  );

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isDraggingSV.value = true;
      preTranslateXSV.value = translateXSV.value;
      preTranslateYSV.value = translateYSV.value;
    })
    .onChange((event) => {
      translateXSV.value = -event.translationX + preTranslateXSV.value;
      translateYSV.value = -event.translationY + preTranslateYSV.value;
      runOnJS(computeDraggableWordOrderAndPositions)({
        isDragging: true,
        draggedWordId: id,
        draggedWordTranslateY: translateYSV.value,
        draggedWordTranslateX: translateXSV.value,
      });
    })
    .onEnd(() => {
      isDraggingSV.value = false;
      runOnJS(computeDraggableWordOrderAndPositions)({
        isDragging: false,
        draggedWordId: id,
        draggedWordTranslateY: translateYSV.value,
        draggedWordTranslateX: translateXSV.value,
      });
    });

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      isPressedSV.value = true;
    })
    .onFinalize(() => {
      isPressedSV.value = false;
    })
    .onEnd(() => {
      runOnJS(onWordTap)(id);
    });

  const composedGesture = Gesture.Race(tapGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = isDraggingSV.value ? 1.1 : isPressedSV.value ? 0.95 : 1;
    return {
      transform: [
        { translateX: -translateXSV.value },
        { translateY: -translateYSV.value },
        { scale: withSpring(scale) },
      ],
      zIndex: isTranslatingAfterDragStartSV.value ? 1000 : 1,
    };
  });

  useLayoutEffect(() => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      onWordLayout(id, {
        x,
        y,
        width,
        height,
        pageX,
        pageY,
      });
    });
  }, [onWordLayout]);

  return (
    <View ref={ref}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.wordContainer, animatedStyle]}>
          <Text style={styles.wordText}>{text}</Text>
        </Animated.View>
      </GestureDetector>
      <View style={styles.underlyingView}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  wordContainer: {
    height: WORD_HEIGHT,
    paddingHorizontal: 16,
    backgroundColor: DUOLINGO_DARK_GRAY,
    borderRadius: 12,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: DUOLINGO_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wordText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  underlyingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: DUOLINGO_BORDER,
    borderRadius: 12,
  },
});
