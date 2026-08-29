import { useCallback, useState } from 'react';
import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import {
  CAMERA_OPEN_DURATION,
  DIRECT_CLOSE_DURATION,
  MENU_CLOSE_DURATION,
  MENU_OPEN_DURATION,
} from '../constants';

export function useComposerMenu() {
  const menu = useSharedValue(0);
  const cam = useSharedValue(0);
  const rowsHidden = useSharedValue(0);
  const { height: keyboardHeight, progress: keyboardProgress } =
    useReanimatedKeyboardAnimation();

  const [mounted, setMounted] = useState(false);

  const toggleMenu = useCallback(() => {
    const willOpen = menu.value < 0.5;
    if (willOpen) {
      rowsHidden.value = 0;
      setMounted(true);
    }
    menu.value = withTiming(
      willOpen ? 1 : 0,
      { duration: willOpen ? MENU_OPEN_DURATION : MENU_CLOSE_DURATION },
      (finished) => {
        if (finished && !willOpen) {
          runOnJS(setMounted)(false);
        }
      },
    );
  }, [menu, rowsHidden]);

  const openCamera = useCallback(() => {
    cam.value = withTiming(1, { duration: CAMERA_OPEN_DURATION });
  }, [cam]);

  const collapse = useCallback(() => {
    const fromCamera = cam.value > 0;

    if (!fromCamera) {
      menu.value = withTiming(
        0,
        { duration: MENU_CLOSE_DURATION },
        (finished) => {
          if (finished) {
            runOnJS(setMounted)(false);
          }
        },
      );
      return;
    }

    rowsHidden.value = 1;
    cam.value = withTiming(0, { duration: DIRECT_CLOSE_DURATION });
    menu.value = withTiming(
      0,
      { duration: DIRECT_CLOSE_DURATION },
      (finished) => {
        if (finished) {
          rowsHidden.value = 0;
          runOnJS(setMounted)(false);
        }
      },
    );
  }, [cam, menu, rowsHidden]);

  return {
    menu,
    cam,
    rowsHidden,
    keyboardHeight,
    keyboardProgress,
    mounted,
    toggleMenu,
    openCamera,
    collapse,
  };
}
