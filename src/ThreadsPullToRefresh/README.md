# Threads Pull to Refresh

This example demonstrates the pull-to-refresh animation from the Threads app.

## Features

- **Pull gesture detection** - Activates only when scrolled to the top of the list
- **Animated Threads logo** - The @ symbol rotates and scales during pull
- **Progressive animations**:
  - Rotation: 0-360° based on pull distance
  - Scale: 0.5x to 1.2x during pull
  - Opacity fade-in as you pull
- **Spring animations** - Natural bounce-back effect
- **Refresh threshold** - Triggers at 80px pull distance
- **Maximum pull distance** - Capped at 120px

## Implementation Details

The animation uses:
- `react-native-reanimated` for smooth animations
- `react-native-gesture-handler` for gesture detection
- `@shopify/react-native-skia` for custom logo rendering

### Key Components

1. **ThreadsLogo.tsx** - Animated @ symbol using Skia paths
2. **Post.tsx** - Individual post component
3. **ThreadsPullToRefresh.tsx** - Main component with pull-to-refresh logic
4. **ThreadsPullToRefreshScreen.tsx** - Screen wrapper with header

### How It Works

1. The gesture handler detects vertical pan gestures
2. When the user pulls down while at the top of the list, `translateY` updates
3. The logo's rotation and scale are interpolated based on pull distance
4. When released above the threshold (80px), the refresh animation triggers
5. After refresh completes, everything smoothly resets to initial state

## Usage

Navigate to the Threads: Pull to Refresh screen from the home screen to see the animation in action.
