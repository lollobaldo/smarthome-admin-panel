import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { MqttProvider } from 'brains/mqtt';
import { useTheme } from 'brains/hooks';

import Header from 'components/Header';
// import Sidebar from './components/Sidebar';
import Content from 'components/Content';

import { GlobalStyle } from 'styles/theme';

const App = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((theme === 'light') ? 'dark' : 'light');
  };

  return (
    <MqttProvider>
      <ThemeProvider theme={{ theme }}>
        <GlobalStyle />
        <Router>
          {/* <Sidebar /> */}
          <Header activeTheme={theme} toggleTheme={toggleTheme} />
          <Content />
        </Router>
      </ThemeProvider>
    </MqttProvider>
  );
};

export default App;
