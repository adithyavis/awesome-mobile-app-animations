---
sidebar_position: 3
---

# Threads - Pull to Refresh

This example demonstrates the pull-to-refresh animation from the **Threads** app.

## Source Code

[View source on GitHub](https://github.com/adithyavis/awesome-mobile-app-animations/tree/main/src/ThreadsPullToRefresh)

## Demo

<iframe width="100%" height="400" src="https://www.youtube.com/embed/9Zi5wbfT-Mk" title="Threads Pull to Refresh Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Implementation Details

The animation uses:

- **`react-native-reanimated`** for smooth animations
- **`lottie-react-native`** for custom Threads logo animation

The pull-to-refresh interaction is driven entirely on the native thread using reanimated, ensuring a smooth 60fps experience. The Threads logo animates using a Lottie JSON file, synchronized with the pull gesture.
