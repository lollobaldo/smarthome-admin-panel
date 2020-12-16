// import React from 'react';
import { createGlobalStyle, css } from 'styled-components';
import theme from 'styled-theming';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
type MediaQuerySize = Record<DeviceType, string>;

export type Mode = 'light' | 'dark';

const sizes: MediaQuerySize = {
  mobile: '425px',
  tablet: '768px',
  desktop: '2560px',
};

// console.log(keyof (typeof sizes));
console.log((typeof sizes));

export const mediaQuery = (key: DeviceType) => (
  `@media (min-width: ${sizes[key]})`
);

export const body = {
  light: css`
    background: #f5f5f5;
    color: #000000;
    transition: all 0.14s ease-in;
  `,
  dark: css`
    background: #222;
    color: #dddddd;
    transition: all 0.14s ease-in;
  `,
};

export const card = {
  light: css`
    background: #ffffff;
    color: #000000;
    transition: all 0.14s ease-in;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  `,
  dark: css`
    background: #333;
    color: #dddddd;
    transition: all 0.14s ease-in;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3), 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  `,
};

export const foreground = {
  light: css`
    background: #cccccc;
    color: #ffffff;
    transition: all 0.14s ease-in;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  `,
  dark: css`
    background: #5f5f5f;
    color: #ffffff;
    transition: all 0.14s ease-in;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3), 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  `,
};

export const icon = {
  dark: css`
    filteR: brightness(0) invert(1) opacity(0.86);
  `,
};

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }

  body {
    margin: 0;
    ${theme('mode', body)}
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
