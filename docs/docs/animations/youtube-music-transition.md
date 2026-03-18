---
sidebar_position: 6
---

# YouTube Music - Swipe Bg Transition

This example demonstrates a smooth carousel transition for a **YouTube Music**-like experience using Skia and Reanimated.

## Source Code

[View source on GitHub](https://github.com/adithyavis/awesome-mobile-app-animations/tree/main/src/YoutubeMusicSwipeBgTransition)

## Demo

<iframe width="100%" height="400" src="https://www.youtube.com/embed/u8-dyjjUIio" title="YouTube Music Swipe Bg Transition Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Implementation Details

The animation uses:

- **`@shopify/react-native-skia`** for rendering smooth background color transitions
- **`react-native-reanimated`** for driving 60fps transitions on the native thread

When swiping from one song to another, the background color transitions smoothly. The 60fps transition is achieved by driving all transitions on the native thread using react-native-reanimated, avoiding any JS thread bottlenecks.
