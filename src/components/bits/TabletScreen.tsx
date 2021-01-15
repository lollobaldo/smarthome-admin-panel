import App from 'App';
import React from 'react';
import styled from 'styled-components/macro';

import { GlobalStyle, mediaQuery } from 'styles/theme';

const StyledAppScreen = styled.div`
  width: 100%;

  & #content {
    height: 100%;
  }

  ${mediaQuery('desktop')} {
    box-sizing: content-box;
    position: relative;
    width: 1024px;
    height: 600px;
    margin: auto;
    border: 16px white solid;
    padding: 1px;
    background: #f5f5f5;
    border-top-width: 60px;
    border-bottom-width: 60px;
    border-radius: 36px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);

    /* The horizontal line on the top of the device */
    & :before {
      content: '';
      display: block;
      width: 60px;
      height: 5px;
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ccc;
      border-radius: 10px;
    }

    /* The circle on the bottom of the device */
    & :after {
      content: '';
      display: block;
      width: 35px;
      height: 35px;
      position: absolute;
      left: 50%;
      bottom: -65px;
      transform: translate(-50%, -50%);
      background: #ccc;
      border-radius: 50%;
    }

    /* The screen (or content) of the device */
    & #content {
      overflow: hidden;
      overflow-y: auto;
      width: 1024px;
      height: 600px;
      background: #F5F5F5;
    }
  }
`;

const TabletScreen = ({ children }: { children: React.ReactNode }) => (
  <StyledAppScreen>
    <div id="content">
      {children}
    </div>
  </StyledAppScreen>
);

export default TabletScreen;
