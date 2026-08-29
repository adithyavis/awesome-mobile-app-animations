import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

export type MenuItem = {
  key: string;
  label: string;
  icon: IoniconName;
};

export const MENU_ITEMS: MenuItem[] = [
  { key: 'camera', label: 'Camera', icon: 'camera-outline' },
  { key: 'photos', label: 'Photos', icon: 'image-outline' },
  { key: 'files', label: 'Files', icon: 'document-outline' },
  { key: 'plugins', label: 'Plugins', icon: 'apps-outline' },
  { key: 'think', label: 'Think harder', icon: 'bulb-outline' },
  { key: 'temporary', label: 'Temporary chat', icon: 'flash-off-outline' },
];

// Layout ---------------------------------------------------------------------
export const H_MARGIN = 12;
export const PILL_HEIGHT = 48;
export const COMPOSER_PAD_V = 8;
export const COMPOSER_HEIGHT = PILL_HEIGHT + COMPOSER_PAD_V * 2; // excludes safe-area bottom

export const PLUS_SIZE = 40;

export const MENU_WIDTH = 320;
export const MENU_ROW_HEIGHT = 66;
export const MENU_PAD_V = 12;
export const MENU_HEIGHT = MENU_ITEMS.length * MENU_ROW_HEIGHT + MENU_PAD_V * 2;
export const MENU_ROW_PAD_H = 22;
export const MENU_ICON_SIZE = 28;
export const MENU_ICON_COLUMN = 40;
export const MENU_LABEL_SIZE = 20;
export const GAP_ABOVE_COMPOSER = 10;

export const PANEL_RADIUS_MENU = 26;
export const PANEL_RADIUS_CAMERA = 28;

// Motion ---------------------------------------------------------------------
export const MENU_OPEN_DURATION = 240;
export const MENU_CLOSE_DURATION = 240;
export const CAMERA_OPEN_DURATION = 300;
export const CAMERA_CLOSE_DURATION = 220;
export const DIRECT_CLOSE_DURATION = 280;

// Colors ---------------------------------------------------------------------
export const COLORS = {
  screen: '#000000',
  glassTint: 'rgba(40,40,42,0.55)',
  backdrop: 'rgba(0,0,0,0.4)',
  text: '#FFFFFF',
  subtext: '#8E8E93',
  placeholder: '#8E8E93',
  cameraPlaceholder: '#0E0E10',
  voiceButton: '#2E6BE6',
  separator: 'rgba(255,255,255,0.08)',
};
