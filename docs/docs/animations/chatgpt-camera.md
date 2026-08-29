---
sidebar_position: 1
---

# ChatGPT - Camera

This example recreates the **ChatGPT** camera, where the `+` button grows into an attachment menu that straddles the keyboard, and that same menu transitions into a full live camera view.

## Source Code

[View source on GitHub](https://github.com/adithyavis/awesome-mobile-app-animations/tree/main/src/ChatGPTCamera)

## Demo

<iframe width="100%" height="400" src="https://www.youtube.com/embed/SljlQiKVvnw" title="ChatGPT Camera" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Implementation Details

The animation uses:

- **`react-native-reanimated`** to drive the menu transition on the native thread
- **`react-native-keyboard-controller`** for `OverKeyboardView` and the live keyboard height/progress values
- **`@callstack/liquid-glass`** for the iOS 26 glass material
- **`expo-camera`** for the live capture preview
