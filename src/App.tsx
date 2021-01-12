import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components/macro';

import { MqttProvider } from 'brains/mqtt';
import { useTheme } from 'brains/hooks';

import Header from 'components/Header';
import Content from 'components/Content';

import { GlobalStyle, mediaQuery } from 'styles/theme';

const StyledAppScreen = styled.div`
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
      overflow-y: scroll;
      width: 1024px;
      height: 600px;
      background: #F5F5F5;
    }
  }
}
`;

const AppScreen = ({ children }: { children: React.ReactNode }) => (
  <StyledAppScreen>
    <div id="content">
      {children}
    </div>
  </StyledAppScreen>
);

const App = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((theme === 'light') ? 'dark' : 'light');
  };

  return (
    <MqttProvider>
      <Router>
        <ThemeProvider theme={{ theme }}>
          <AppScreen>
            <GlobalStyle />
            <Header activeTheme={theme} toggleTheme={toggleTheme} />
            <Content />
          </AppScreen>
        </ThemeProvider>
      </Router>
    </MqttProvider>
  );
};

export default App;
