---
sidebar_position: 2
---

# Duolingo - Drag Sort Words

This example demonstrates the drag-and-drop word sorting animation from the **Duolingo** app, where users arrange words to form a correct sentence.

## Source Code

[View source on GitHub](https://github.com/adithyavis/awesome-mobile-app-animations/tree/main/src/DuoLingoDragSortWords)

## Demo

<iframe width="100%" height="400" src="https://www.youtube.com/embed/-KX4BDmUdN8" title="Duolingo Drag Sort Words Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Features

- Drag words from the word bank to the drop area
- Tap words to quickly add/remove them from the drop area
- Word displacement when dragging over other words

## Implementation Details

The animation uses:

- **`react-native-reanimated`** for smooth, performant animations
- **`react-native-gesture-handler`** for pan and tap gestures
- Shared values for cross-thread communication between UI and JS threads
