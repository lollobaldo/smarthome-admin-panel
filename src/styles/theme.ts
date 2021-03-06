// import React from 'react';
import { createGlobalStyle, css } from 'styled-components/macro';
import theme from 'styled-theming';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
type MediaQuerySize = Record<DeviceType, string>;

export type Theme = 'light' | 'dark';

const sizes: MediaQuerySize = {
  mobile: '425px',
  tablet: '768px',
  desktop: '1050px',
};

export const colors = {
  primary: '#f36b15',
  secondary: '#2979FF',
};

export const palettes = {
  red: {
    primary: '#bf2600',
    light: '#ffebe6',
  },
  yellow: {
    primary: '#ff8b00',
    light: '#fffae6',
    dark: '#dd8800',
  },
  blue: {
    primary: '#2979ff',
    light: '#ffffff',
  },
  green: {
    primary: '#008800',
    light: '#77DD77',
  },
};

export const pastelColors = {
  transparent: 'rgba(0, 0, 0, 0)',
  red: '#FF6961',
  yellow: '#FFFD96',
  orange: '#FFB447',
  lightGreen: '#CEFC86',
  green: '#77DD77',
  lightBlue: '#A1C9F1',
  blue: '#2979FF',
  purple: '#c471ed',
};

export const gradients = {
  red: 'linear-gradient(45deg, #ff416c, #f45c43)',
  purple: 'linear-gradient(45deg, #12c2e9, #c471ed, #f64f59)',
  black: 'linear-gradient(45deg, #232526, #414345)',
};

export const mediaQuery = (key: DeviceType) => (
  `@media (min-width: ${sizes[key]})`
);

export const body = {
  light: css`
    transition: background 0.14s ease-in, color 0.14s ease-in;
    background: #f5f5f5;
    color: #000000;
  `,
  dark: css`
    transition: background 0.14s ease-in, color 0.14s ease-in;
    background: #222222;
    color: #dddddd;
  `,
};

export const card = {
  light: css`
    transition: background 0.14s ease-in, color 0.14s ease-in, box-shadow 0.14s ease-in;
    background: #ffffff;
    color: #000000;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  `,
  dark: css`
    transition: background 0.14s ease-in, color 0.14s ease-in, box-shadow 0.14s ease-in;
    background: #333;
    color: #dddddd;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3), 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  `,
};

export const foreground = {
  light: css`
    transition: background 0.14s ease-in, color 0.14s ease-in, box-shadow 0.14s ease-in;
    background: #cccccc;
    color: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  `,
  dark: css`
    transition: background 0.14s ease-in, color 0.14s ease-in, box-shadow 0.14s ease-in;
    background: #444;
    color: #cccccc;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3), 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  `,
};

export const modal = {
  light: css`
    transition: background 0.14s ease-in;
    background: ${colors.primary};
  `,
  dark: css`
    transition: background 0.14s ease-in;
    background: #222222;
  `,
};

export const slider = {
  light: css`
    transition: background 0.14s ease-in;
    background: #ffffff;
  `,
  dark: css`
    transition: background 0.14s ease-in;
    background: #5f5f5f;
  `,
};

export const icon = {
  light: css`
    transition: filter 0.14s ease-in;
    filter: none;
  `,
  dark: css`
    transition: filter 0.14s ease-in;
    filter: brightness(.8);
  `,
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
  }

  body {
    margin: 0;
    ${theme('theme', body)}
  }

  #root {
    height: 100vh;
    display: flex;
  }

  button, button:focus {
    outline: none;
    background: none;
    border: 0;
    box-shadow: none;
    font: inherit;
  }
`;

// and this theme is fully typed as well
export const cssHelper = css`
  border: 1px solid ${(props) => props.theme.borderRadius};
`;

// export default { myTheme };
