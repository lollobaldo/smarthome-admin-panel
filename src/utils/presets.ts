import iconHeart from 'res/icons/heart.svg';
import iconMovie from 'res/icons/movie.svg';
import iconNight from 'res/icons/moon.svg';

import { pastelColors, gradients } from 'styles/theme';

export type Preset = {
  name: string,
  color: string,
  background: string,
  icon: string,
};

export type PresetsState = {
  activePreset: string | undefined,
  presets: Preset[]
};

const presets: Preset[] = [
  {
    name: 'romantic',
    color: pastelColors.red,
    background: gradients.red,
    icon: iconHeart,
  }, {
    name: 'movie',
    color: pastelColors.purple,
    background: gradients.purple,
    icon: iconMovie,
  }, {
    name: 'night',
    color: pastelColors.yellow,
    background: gradients.black,
    icon: iconNight,
  },
];

// eslint ignore
const presetsState = {
  activePreset: undefined,
  presets, // eslint-disable-line @typescript-eslint/no-use-before-define
};

export default presetsState;
