# Threads Spoiler Masking

This example demonstrates the spoiler text masking animation from the Threads app, where sensitive content is hidden behind an animated particle mask.

## Features

- Animated white particle dots of varying sizes over hidden text
- Particles continuously drift in random directions
- GPU-rendered using a custom Skia RuntimeEffect shader
- Rounded rectangle mask boundary with soft edges

## Implementation Details

The animation uses:

- `@shopify/react-native-skia` RuntimeEffect shader for GPU-accelerated particle rendering
- `react-native-reanimated` shared values to drive the shader's time uniform
- A custom GLSL fragment shader that generates 70 particles with deterministic pseudo-random properties

## Key Components

- `MaskedText` - Core component: measures text, overlays a Skia Canvas with the particle shader
- `SpoilerPost` - Post component with optional spoiler content
- `ThreadsSpoilerFeed` - FlatList feed rendering posts with spoiler masking
