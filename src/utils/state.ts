import iconHome from 'res/icons/home.svg';
import iconLight from 'res/icons/light-lamp.svg';
import iconColorWheel from 'res/icons/color-wheel-2.svg';
import iconPlant from 'res/icons/plant-potted.svg';
import iconHeating from 'res/icons/heating.svg';

export interface Page {
  path: string,
  title?: string,
  icon?: string,
  show?: boolean,
}

export const pages: Page[] = [
  {
    path: '/',
    title: 'Hello Lorenzo!',
    icon: iconHome,
  }, {
    path: '/lights',
    icon: iconLight,
  }, {
    path: '/leds',
    icon: iconColorWheel,
  }, {
    path: '/plants',
    icon: iconPlant,
  }, {
    path: '/heating',
    icon: iconHeating,
  }, {
    path: '/trial',
    show: false,
  },
];

// Hacky way to toTitleCase (from SO)
export const toTitleCase = (str: string): string => (
  str.replace(
    /\w\S*/g,
    (txt: string) => (
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    ),
  )
);

export const path2page = (path: string): Page => (
  pages.filter((p) => p.path === path)[0] || { path: '/' }
);

export const path2title = (path: string): string => (
  toTitleCase(path.slice(1))
);
