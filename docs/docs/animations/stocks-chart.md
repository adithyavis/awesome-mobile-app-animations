---
sidebar_position: 5
---

# Stocks - Chart Animation

This example demonstrates an animated stock chart inspired by the **Apple Stocks** app.

## Source Code

[View source on GitHub](https://github.com/adithyavis/awesome-mobile-app-animations/tree/main/src/StocksChart)

## Demo

<iframe width="100%" height="400" src="https://www.youtube.com/embed/KC_Z-5sVTAU" title="Stocks Chart Animation Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Implementation Details

The animation uses:

- **`@shopify/react-native-skia`** for drawing the chart, grid lines, and trajectory path
- **`react-native-reanimated`** for smooth animated transitions between data states

The chart is rendered using Skia's path and canvas APIs, providing GPU-accelerated rendering for smooth drawing performance.
