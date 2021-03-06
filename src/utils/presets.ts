import { ReactComponent as iconHeart } from 'res/icons/heart.svg';
import { ReactComponent as iconMovie } from 'res/icons/movie.svg';
import { ReactComponent as iconNight } from 'res/icons/moon.svg';

import { pastelColors, gradients } from 'styles/theme';

export type Preset = {
  name: string,
  color: string,
  background: string,
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }>,
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
    Icon: iconHeart,
  }, {
    name: 'movie',
    color: pastelColors.purple,
    background: gradients.purple,
    Icon: iconMovie,
  }, {
    name: 'night',
    color: pastelColors.yellow,
    background: gradients.black,
    Icon: iconNight,
  },
];

// // eslint ignore
// const presetsState = {
//   activePreset: undefined,
//   presets, // eslint-disable-line @typescript-eslint/no-use-before-define
// };

export default presets;
