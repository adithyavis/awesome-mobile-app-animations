---
sidebar_position: 0
---

# ChatGPT - Voice Profiles Fluid Orb

This example recreates the fluid orb animation from **ChatGPT's** voice selection screen, where users swipe through voice profiles each displaying an animated blue-white fluid orb.

## Source Code

[View source on GitHub](https://github.com/adithyavis/awesome-mobile-app-animations/tree/main/src/ChatGPTVoiceProfiles)

## Demo

<iframe width="100%" height="400" src="https://www.youtube.com/embed/wbfCDYvMx4U" title="ChatGPT Voice Profiles Fluid Orb Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Implementation Details

The animation uses:

- **`@shopify/react-native-skia`** RuntimeEffect shader for GPU-accelerated fluid rendering
- **`react-native-reanimated`** shared values to drive shader uniforms (time, boost)
- A custom SKSL fragment shader with:
  - 3-octave FBM (`fbm3`) for large soft fluid shapes and advection fields
  - 5-octave FBM for finer boundary detail in the transition zone
  - Two decorrelated shape layers blended to prevent uniform saturation
  - A sparse overlay layer (fast speed, high warp, low density) for floating wisps
  - 3-color gradient mapping: deep blue -> cyan -> white
- `requestAnimationFrame` loop accumulating time with boost-driven speed multiplier
- Swipe boost animation using `withSequence` / `withDelay` for ramp-up and decay
- Floating bob and breathing scale on the orb container
