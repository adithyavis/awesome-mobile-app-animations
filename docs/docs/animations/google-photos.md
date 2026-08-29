---
sidebar_position: 2
---

# Google Photos - Pinch-to-zoom Grid

This example recreates the **Google Photos** gallery, where you can pinch to zoom the photo grid between multiple densities, fling through it with a date scrubber, and tap a thumbnail to open it full screen.

## Source Code

[View source on GitHub](https://github.com/adithyavis/awesome-mobile-app-animations/tree/main/src/GooglePhotos)

## Demo

<iframe width="100%" height="400" src="https://www.youtube.com/embed/I4eRKuMuG4o" title="Google Photos Pinch-to-zoom Grid Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Implementation Details

The animation uses:

- **`react-native-reanimated`** to drive the pinch, zoom, and full-screen transitions on the native thread at 60fps
- **`react-native-gesture-handler`** for the simultaneous pinch and scroll gestures
- **`@legendapp/list`** to virtualize each grid list
- **`react-native-nitro-image`** for fast, cached thumbnail loading
- **`react-native-svg`** for the date scrubber thumb

The grid supports three zoom levels (5, 3, and 1 columns). Photos are arranged with a Flickr-style **justified layout** so each row fills the width while preserving aspect ratios. During a pinch, the current level and the target level are cross-faded and scaled together, and the gesture commits to the new level once it passes a threshold.

Tapping a thumbnail runs a shared-element-style transition: the tapped tile's rect grows to fill the screen while the rest of the grid fades away, and swiping down reverses it back to the exact grid position. A draggable date scrubber lets you fling through the whole collection, with scroll throttling tuned per zoom level to keep everything smooth.
