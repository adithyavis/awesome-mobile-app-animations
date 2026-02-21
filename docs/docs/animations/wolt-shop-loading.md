---
sidebar_position: 1
---

# Wolt - Frost Creep Image Loading

This example demonstrates the shop loading experience from the **Wolt** app — a frost creep reveal effect that provides a polished loading experience.

## Source Code

[View source on GitHub](https://github.com/adithyavis/awesome-mobile-app-animations/tree/main/src/WoltShopLoading)

## Demo

<iframe width="100%" height="400" src="https://www.youtube.com/embed/cZBs7ur75Dk" title="Wolt Shop Loading Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Implementation Details

The animation uses:

- **`react-native-reanimated`** for driving smooth transitions
- **`@shopify/react-native-skia`** shader for GPU-accelerated reveal effect

The frost creep effect is achieved using a Skia shader that progressively reveals the image content with a frosted glass appearance, creating a smooth loading transition.
