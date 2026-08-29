import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  COLORS,
  COMPOSER_HEIGHT,
  GAP_ABOVE_COMPOSER,
  H_MARGIN,
  MENU_HEIGHT,
  MENU_ICON_COLUMN,
  MENU_ICON_SIZE,
  MENU_ITEMS,
  MENU_LABEL_SIZE,
  MENU_PAD_V,
  MENU_ROW_HEIGHT,
  MENU_ROW_PAD_H,
  MENU_WIDTH,
  PANEL_RADIUS_CAMERA,
  PANEL_RADIUS_MENU,
  PLUS_SIZE,
} from '../constants';

const AnimatedGlass = Animated.createAnimatedComponent(LiquidGlassView);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type PanelGeometry = {
  composerTop: number;
  r1Top: number;
  r2Width: number;
  r2Height: number;
};

function panelGeometry(
  screenW: number,
  screenH: number,
  insetLeft: number,
  insetRight: number,
  insetBottom: number,
  kb: number,
  kbProgress: number,
): PanelGeometry {
  'worklet';
  const lift = Math.max(0, kb - insetBottom);
  const composerTop = screenH - insetBottom - COMPOSER_HEIGHT - lift;

  const restingTop = composerTop - GAP_ABOVE_COMPOSER - MENU_HEIGHT;
  const straddleTop = screenH - kb - MENU_HEIGHT / 2;
  const r1Top = interpolate(kbProgress, [0, 1], [restingTop, straddleTop]);

  return {
    composerTop,
    r1Top,
    r2Width: screenW - insetLeft - insetRight - H_MARGIN * 2,
    r2Height: screenH - insetBottom - r1Top,
  };
}

type Props = {
  width: number;
  height: number;
  menu: SharedValue<number>;
  cam: SharedValue<number>;
  rowsHidden: SharedValue<number>;
  keyboardHeight: SharedValue<number>;
  keyboardProgress: SharedValue<number>;
  onExpandCamera: () => void;
  onCollapse: () => void;
};

export default function Menu({
  width,
  height,
  menu,
  cam,
  rowsHidden,
  keyboardHeight,
  keyboardProgress,
  onExpandCamera,
  onCollapse,
}: Props) {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    return () => setCameraActive(false);
  }, []);

  const onPressCamera = () => {
    setCameraActive(true);
    onExpandCamera();
  };

  const screenW = width;
  const screenH = height;
  const insetLeft = insets.left;
  const insetRight = insets.right;
  const insetBottom = insets.bottom;

  const panelStyle = useAnimatedStyle(() => {
    'worklet';
    const g = panelGeometry(
      screenW,
      screenH,
      insetLeft,
      insetRight,
      insetBottom,
      Math.abs(keyboardHeight.value),
      keyboardProgress.value,
    );

    const r0Left = insetLeft + H_MARGIN + 6;
    const r0Top = g.composerTop + (COMPOSER_HEIGHT - PLUS_SIZE) / 2;

    const r1Left = insetLeft + H_MARGIN;

    const m = menu.value;
    const c = cam.value;

    const baseW = interpolate(m, [0, 1], [PLUS_SIZE, MENU_WIDTH]);
    const baseH = interpolate(m, [0, 1], [PLUS_SIZE, MENU_HEIGHT]);

    return {
      left: interpolate(m, [0, 1], [r0Left, r1Left]),
      top: interpolate(m, [0, 1], [r0Top, g.r1Top]),
      width: interpolate(c, [0, 1], [baseW, g.r2Width]),
      height: interpolate(c, [0, 1], [baseH, g.r2Height]),
      borderRadius: interpolate(
        c,
        [0, 1],
        [PANEL_RADIUS_MENU, PANEL_RADIUS_CAMERA],
      ),
      opacity: interpolate(m, [0, 0.12, 1], [0, 1, 1]),
    };
  });

  const backdropStyle = useAnimatedStyle(() => {
    'worklet';
    return { opacity: Math.min(1, menu.value * 2) };
  });

  const rowsStyle = useAnimatedStyle(() => {
    'worklet';
    return { opacity: menu.value * (1 - cam.value) * (1 - rowsHidden.value) };
  });

  const cameraStyle = useAnimatedStyle(() => {
    'worklet';
    const g = panelGeometry(
      screenW,
      screenH,
      insetLeft,
      insetRight,
      insetBottom,
      Math.abs(keyboardHeight.value),
      keyboardProgress.value,
    );
    return { width: g.r2Width, height: g.r2Height, opacity: cam.value };
  });

  const cameraMounted = !!permission?.granted;

  return (
    <View style={StyleSheet.absoluteFill}>
      <AnimatedPressable
        style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}
        onPress={onCollapse}
      />

      <AnimatedGlass
        effect="regular"
        colorScheme="dark"
        tintColor={COLORS.glassTint}
        style={[styles.panel, panelStyle]}
      >
        <Animated.View
          style={[styles.camera, cameraStyle]}
          pointerEvents={cameraActive ? 'auto' : 'none'}
        >
          {cameraReady ? null : (
            <View style={styles.cameraPlaceholder}>
              <Ionicons name="camera" size={44} color={COLORS.subtext} />
              <Text style={styles.cameraPlaceholderText}>Camera preview</Text>
            </View>
          )}
          {cameraMounted ? (
            <CameraView
              style={StyleSheet.absoluteFill}
              facing={facing}
              active
              onCameraReady={() => setCameraReady(true)}
            />
          ) : null}

          <Pressable
            style={[styles.camButton, styles.camButtonLeft]}
            onPress={onCollapse}
            hitSlop={10}
          >
            <Ionicons name="close" size={22} color="#fff" />
          </Pressable>
          <Pressable
            style={[styles.camButton, styles.camButtonRight]}
            onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
            hitSlop={10}
          >
            <Ionicons name="camera-reverse-outline" size={22} color="#fff" />
          </Pressable>
        </Animated.View>

        <Animated.View
          style={[styles.rows, rowsStyle]}
          pointerEvents={cameraActive ? 'none' : 'auto'}
        >
          {MENU_ITEMS.map((item, index) => (
            <Pressable
              key={item.key}
              style={styles.row}
              onPress={item.key === 'camera' ? onPressCamera : undefined}
            >
              <Ionicons
                name={item.icon}
                size={MENU_ICON_SIZE}
                color={COLORS.text}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{item.label}</Text>
              {index < MENU_ITEMS.length - 1 ? (
                <View style={styles.separator} />
              ) : null}
            </Pressable>
          ))}
        </Animated.View>
      </AnimatedGlass>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: COLORS.backdrop,
  },
  panel: {
    position: 'absolute',
    overflow: 'hidden',
  },
  rows: {
    position: 'absolute',
    top: MENU_PAD_V,
    left: 0,
    width: MENU_WIDTH,
  },
  row: {
    height: MENU_ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: MENU_ROW_PAD_H,
  },
  rowIcon: {
    width: MENU_ICON_COLUMN,
  },
  rowLabel: {
    color: COLORS.text,
    fontSize: MENU_LABEL_SIZE,
    fontWeight: '400',
  },
  separator: {
    position: 'absolute',
    left: MENU_ROW_PAD_H,
    right: 0,
    bottom: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.separator,
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: COLORS.cameraPlaceholder,
  },
  cameraPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  cameraPlaceholderText: {
    color: COLORS.subtext,
    fontSize: 15,
  },
  camButton: {
    position: 'absolute',
    top: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  camButtonLeft: {
    left: 14,
  },
  camButtonRight: {
    right: 14,
  },
});
