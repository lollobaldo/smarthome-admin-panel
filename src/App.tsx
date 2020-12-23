import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Header from 'components/Header';
// import Sidebar from './components/Sidebar';
import Content from 'components/Content';

import { Theme, GlobalStyle } from 'styles/theme';

const App = () => {
  const [theme, setTheme] = useState<Theme>('light');

  // const { mode, activePreset } = state;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={{ theme }}>
      <GlobalStyle />
      <Router>
        {/* <Sidebar /> */}
        <Header activeTheme={theme} toggleTheme={toggleTheme} />
        <Content />
      </Router>
    </ThemeProvider>
  );
};

export default App;
