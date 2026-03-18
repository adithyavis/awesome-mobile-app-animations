---
sidebar_position: 1
---

# Threads - Spoiler Masking

This example recreates the **Threads** app spoiler text masking effect — sensitive content is hidden behind an animated particle mask that users can tap to reveal.

## Source Code

[View source on GitHub](https://github.com/adithyavis/awesome-mobile-app-animations/tree/main/src/ThreadsSpoilerMasking)

## Demo

<iframe width="100%" height="400" src="https://www.youtube.com/embed/30qn0e2zHNo" title="Threads Spoiler Masking Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Implementation Details

The animation uses:

- **`@shopify/react-native-skia`** RuntimeEffect shader for GPU-accelerated particle rendering
- **`react-native-reanimated`** shared values to drive the shader's time uniform
- A custom GLSL fragment shader that generates particles with deterministic pseudo-random properties
- Per-visual-line masking using `onTextLayout` to measure wrapped text lines
- Tap-to-reveal with a smooth opacity fade transition
