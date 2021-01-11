import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { MqttProvider } from 'brains/mqtt';
import { useTheme } from 'brains/hooks';

import Header from 'components/Header';
import Content from 'components/Content';

import { GlobalStyle } from 'styles/theme';

const App = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((theme === 'light') ? 'dark' : 'light');
  };

  return (
    <MqttProvider>
      <Router>
        <ThemeProvider theme={{ theme }}>
          <GlobalStyle />
          <Header activeTheme={theme} toggleTheme={toggleTheme} />
          <Content />
        </ThemeProvider>
      </Router>
    </MqttProvider>
  );
};

export default App;
