import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { OverKeyboardView } from 'react-native-keyboard-controller';
import { COLORS } from '../constants';
import { useComposerMenu } from '../hooks/useComposerMenu';
import Composer from './Composer';
import Menu from './Menu';

export default function ChatGPTCameraScreen() {
  const { width, height } = useWindowDimensions();
  const {
    menu,
    cam,
    rowsHidden,
    keyboardHeight,
    keyboardProgress,
    mounted,
    toggleMenu,
    openCamera,
    collapse,
  } = useComposerMenu();

  return (
    <View style={styles.root}>
      <Composer
        menu={menu}
        keyboardHeight={keyboardHeight}
        onPlusPress={toggleMenu}
      />

      <OverKeyboardView visible={mounted}>
        {/* Since a bg overlay will be live when Menu is mounted, we conditionally unmount it */}
        {mounted ? (
          <Menu
            width={width}
            height={height}
            menu={menu}
            cam={cam}
            rowsHidden={rowsHidden}
            keyboardHeight={keyboardHeight}
            keyboardProgress={keyboardProgress}
            onExpandCamera={openCamera}
            onCollapse={collapse}
          />
        ) : null}
      </OverKeyboardView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.screen,
  },
});
