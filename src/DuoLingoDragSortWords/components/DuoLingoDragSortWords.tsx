import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { DraggableWord } from './DraggableWord';
import {
  CORRECT_SENTENCE,
  DUOLINGO_TEXT,
  DUOLINGO_GRAY,
  DUOLINGO_GREEN,
  WORD_HEIGHT,
  WORD_BANK_WORDS,
  SENTENCE_ROW_HEIGHT,
  WORD_HORIZONTAL_MARGIN,
} from '../constants';
import { DropArea } from './DropArea';
import { Button } from './Button';
import { Layout } from '../types';

const CONTAINER_PADDING = 20;

export const DuoLingoDragSortWords: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(true);
  const draggableWordLayoutMapRef = useRef<Map<string, Layout>>(new Map());
  const dropAreaLayoutRef = useRef<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });

  const draggableWordTranslateMapSV = useSharedValue<
    Record<string, { x: number; y: number }>
  >({
    ...WORD_BANK_WORDS.reduce((acc, word) => {
      acc[word.id] = { x: 0, y: 0 };
      return acc;
    }, {} as Record<string, { x: number; y: number }>),
  });
  const dropAreaWordsSV = useSharedValue<string[]>([]);
  useAnimatedReaction(
    () => dropAreaWordsSV.value,
    (words) => {
      runOnJS(setIsCheckButtonDisabled)(words.length === 0);
    },
  );

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleCheckPress = () => {
    if (dropAreaWordsSV.value.length > 0) {
      setIsCorrect(
        dropAreaWordsSV.value
          .map((id) => WORD_BANK_WORDS.find((w) => w.id === id)?.text)
          .join(' ') === CORRECT_SENTENCE,
      );
    }
  };

  const handleWordLayout = useCallback(
    (wordId: string, layout: Partial<Layout>) => {
      draggableWordLayoutMapRef.current.set(wordId, {
        x: layout.x ?? draggableWordLayoutMapRef.current.get(wordId)?.x ?? 0,
        y: layout.y ?? draggableWordLayoutMapRef.current.get(wordId)?.y ?? 0,
        width:
          layout.width ??
          draggableWordLayoutMapRef.current.get(wordId)?.width ??
          0,
        height:
          layout.height ??
          draggableWordLayoutMapRef.current.get(wordId)?.height ??
          0,
        pageX:
          layout.pageX ??
          draggableWordLayoutMapRef.current.get(wordId)?.pageX ??
          0,
        pageY:
          layout.pageY ??
          draggableWordLayoutMapRef.current.get(wordId)?.pageY ??
          0,
      });
    },
    [],
  );

  const handleDropAreaLayout = useCallback((layout: Partial<Layout>) => {
    dropAreaLayoutRef.current = {
      x: layout.x ?? dropAreaLayoutRef.current.x ?? 0,
      y: layout.y ?? dropAreaLayoutRef.current.y ?? 0,
      width: layout.width ?? dropAreaLayoutRef.current.width ?? 0,
      height: layout.height ?? dropAreaLayoutRef.current.height ?? 0,
      pageX: layout.pageX ?? dropAreaLayoutRef.current.pageX ?? 0,
      pageY: layout.pageY ?? dropAreaLayoutRef.current.pageY ?? 0,
    };
  }, []);
  //   if (!wordOriginalLayout) {
  //     return { x: 0, y: 0 };
  //   }

  //   const dropAreaLayout = dropAreaLayoutRef.current;
  //   const dropAreaWords = dropAreaWordsSV.value;

  //   let currentX = WORD_HORIZONTAL_MARGIN;
  //   let currentRow = 0;
  //   const dropAreaWidth = dropAreaLayout.width;

  //   for (let i = 0; i < dropAreaWords.length; i++) {
  //     const precedingWordId = dropAreaWords[i];
  //     const precedingWordLayout =
  //       draggableWordLayoutMapRef.current.get(precedingWordId);
  //     const precedingWordWidth = precedingWordLayout?.width ?? 0;
  //     if (
  //       currentX + precedingWordWidth + WORD_HORIZONTAL_MARGIN >
  //       dropAreaWidth
  //     ) {
  //       currentRow++;
  //       currentX = WORD_HORIZONTAL_MARGIN;
  //     }
  //     currentX += precedingWordWidth + WORD_HORIZONTAL_MARGIN;
  //   }
  //   if (
  //     currentX + wordOriginalLayout.width + WORD_HORIZONTAL_MARGIN >
  //     dropAreaWidth
  //   ) {
  //     currentRow++;
  //     currentX = WORD_HORIZONTAL_MARGIN;
  //   }

  //   // Clamp to max 3 rows (0, 1, 2)
  //   currentRow = Math.min(currentRow, 2);

  //   // Calculate target position in drop area (page coordinates)
  //   const targetPageX = dropAreaLayout.pageX + currentX;
  //   const targetPageY =
  //     dropAreaLayout.pageY +
  //     currentRow * SENTENCE_ROW_HEIGHT +
  //     (SENTENCE_ROW_HEIGHT - WORD_HEIGHT) / 2;

  //   const translateX = wordOriginalLayout.pageX - targetPageX;
  //   const translateY = wordOriginalLayout.pageY - targetPageY;

  //   return { x: translateX, y: translateY };
  // }, []);

  const computeDraggableWordOrderAndPositions = useCallback(
    ({
      isDragging,
      draggedWordId,
      draggedWordTranslateY,
      draggedWordTranslateX,
    }: {
      isDragging: boolean;
      draggedWordId: string;
      draggedWordTranslateY: number;
      draggedWordTranslateX: number;
    }) => {
      const wordLayout = draggableWordLayoutMapRef.current.get(draggedWordId);
      if (!wordLayout) return;

      const dropAreaLayout = dropAreaLayoutRef.current;
      const dropAreaWidth = dropAreaLayout.width;

      const minTranslateYToDropArea =
        wordLayout.pageY -
        (dropAreaLayout.pageY + dropAreaLayout.height - WORD_HEIGHT / 2);

      const isInDropArea = draggedWordTranslateY > minTranslateYToDropArea;

      // If released outside drop area, remove from drop area and reset position
      if (!isDragging && !isInDropArea) {
        dropAreaWordsSV.value = dropAreaWordsSV.value.filter(
          (wordId) => wordId !== draggedWordId,
        );
        draggableWordTranslateMapSV.value = {
          ...draggableWordTranslateMapSV.value,
          [draggedWordId]: { x: 0, y: 0 },
        };
      }

      if (isInDropArea) {
        // Calculate dragged word's current position in page coordinates
        const draggedWordPageX =
          wordLayout.pageX - draggedWordTranslateX + wordLayout.width / 2;
        const draggedWordPageY =
          wordLayout.pageY - draggedWordTranslateY + WORD_HEIGHT / 2;

        // Calculate which row the dragged word is in
        const draggedRow = Math.floor(
          (draggedWordPageY - dropAreaLayout.pageY) / SENTENCE_ROW_HEIGHT,
        );
        const clampedDraggedRow = Math.max(0, Math.min(2, draggedRow));

        const otherDropAreaWords = dropAreaWordsSV.value.filter(
          (id) => id !== draggedWordId,
        );

        // Calculate positions for all other words and find insertion index
        let insertIndex = 0;
        let currentX = WORD_HORIZONTAL_MARGIN;
        let currentRow = 0;

        for (let i = 0; i < otherDropAreaWords.length; i++) {
          const otherWordId = otherDropAreaWords[i];
          const otherWordLayout =
            draggableWordLayoutMapRef.current.get(otherWordId);
          const otherWordWidth = otherWordLayout?.width ?? 0;

          // Check if need to wrap to next row
          if (
            currentX + otherWordWidth + WORD_HORIZONTAL_MARGIN >
            dropAreaWidth
          ) {
            currentRow++;
            currentX = WORD_HORIZONTAL_MARGIN;
          }

          // Calculate center X of this word's position
          const wordCenterX =
            dropAreaLayout.pageX + currentX + otherWordWidth / 2;

          // Determine if dragged word should be inserted before this word
          if (
            clampedDraggedRow < currentRow ||
            (clampedDraggedRow === currentRow && draggedWordPageX < wordCenterX)
          ) {
            // Insert before this word
            break;
          }

          insertIndex = i + 1;
          currentX += otherWordWidth + WORD_HORIZONTAL_MARGIN;
        }

        const newOrder = [...otherDropAreaWords];
        newOrder.splice(insertIndex, 0, draggedWordId);
        dropAreaWordsSV.value = newOrder;

        let posX = WORD_HORIZONTAL_MARGIN;
        let posRow = 0;
        const newTranslateMap = { ...draggableWordTranslateMapSV.value };

        for (let i = 0; i < newOrder.length; i++) {
          const wordId = newOrder[i];
          const layout = draggableWordLayoutMapRef.current.get(wordId);
          const width = layout?.width ?? 0;

          // Check if need to wrap to next row
          if (posX + width + WORD_HORIZONTAL_MARGIN > dropAreaWidth) {
            posRow++;
            posX = WORD_HORIZONTAL_MARGIN;
          }

          // Skip updating dragged word position while dragging
          if (isDragging && wordId === draggedWordId) {
            posX += width + WORD_HORIZONTAL_MARGIN;
            continue;
          }

          // Clamp to max 3 rows
          const clampedRow = Math.min(posRow, 2);

          // Calculate target position
          const targetPageX = dropAreaLayout.pageX + posX;
          const targetPageY =
            dropAreaLayout.pageY +
            clampedRow * SENTENCE_ROW_HEIGHT +
            (SENTENCE_ROW_HEIGHT - WORD_HEIGHT) / 2;

          // Calculate translation from original position
          const translateX = (layout?.pageX ?? 0) - targetPageX;
          const translateY = (layout?.pageY ?? 0) - targetPageY;

          newTranslateMap[wordId] = { x: translateX, y: translateY };

          posX += width + WORD_HORIZONTAL_MARGIN;
        }

        draggableWordTranslateMapSV.value = newTranslateMap;
      }
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.instruction}>
          Tap the words to form the sentence:
        </Text>
        <Text style={styles.prompt}>"{CORRECT_SENTENCE}"</Text>
      </View>

      <DropArea onDropAreaLayout={handleDropAreaLayout} />

      <Text style={styles.wordBankLabel}>Available words:</Text>

      <View style={styles.wordsContainer}>
        {WORD_BANK_WORDS.map((word) => {
          return (
            <DraggableWord
              key={word.id}
              id={word.id}
              text={word.text}
              draggableWordTranslateMapSV={draggableWordTranslateMapSV}
              computeDraggableWordOrderAndPositions={
                computeDraggableWordOrderAndPositions
              }
              onWordLayout={handleWordLayout}
            />
          );
        })}
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={handleCheckPress} disabled={isCheckButtonDisabled}>
          CHECK
        </Button>
      </View>

      {isCorrect !== null && (
        <View style={styles.resultContainer}>
          <Text style={[styles.resultText, isCorrect && styles.correctText]}>
            {isCorrect ? '✓ Correct!' : '✗ Try again'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: CONTAINER_PADDING,
    width: '100%',
  },
  header: {
    marginTop: 80,
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: DUOLINGO_GRAY,
    marginBottom: 8,
  },
  prompt: {
    fontSize: 20,
    fontWeight: '700',
    color: DUOLINGO_TEXT,
    marginBottom: 100,
  },
  wordBankLabel: {
    fontSize: 14,
    color: DUOLINGO_GRAY,
    marginBottom: 10,
  },
  wordsContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF4B4B',
  },
  correctText: {
    color: '#58CC02',
  },
});
