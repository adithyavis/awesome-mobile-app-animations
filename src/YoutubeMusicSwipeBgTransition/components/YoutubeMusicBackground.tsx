import {
  Canvas,
  Fill,
  ColorShader,
  Group,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import { SONGS_DATA } from '../constants';

export const YoutubeMusicBackground = ({
  currentSongIndexSV,
}: {
  currentSongIndexSV: SharedValue<number>;
}) => {
  return (
    <Canvas style={{ flex: 1 }}>
      {SONGS_DATA.map((song, index) => (
        <CustomColorShader
          key={song.id}
          songIndex={index}
          currentSongIndexSV={currentSongIndexSV}
          color={song.bgColor}
        />
      ))}
      <Fill>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(0, 500)}
          colors={['rgba(0,0,0, 0.05)', 'rgba(0,0,0, 0.75)']}
        />
      </Fill>
    </Canvas>
  );
};

const CustomColorShader = ({
  color,
  songIndex,
  currentSongIndexSV,
}: {
  color: string;
  songIndex: number;
  currentSongIndexSV: SharedValue<number>;
}) => {
  const opacity = useDerivedValue(() => {
    let diff;
    if (songIndex === 0 && currentSongIndexSV.value > SONGS_DATA.length - 1) {
      diff = Math.pow(SONGS_DATA.length - currentSongIndexSV.value, 4);
    } else {
      diff = Math.pow(Math.abs(songIndex - currentSongIndexSV.value), 4);
    }
    return Math.max(0, Math.min(1, 1 - diff));
  });

  return (
    <Group opacity={opacity}>
      <Fill>
        <ColorShader color={color} />
      </Fill>
    </Group>
  );
};
