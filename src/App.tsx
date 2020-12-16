import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Header from './components/Header';
// import Sidebar from './components/Sidebar';
import Content from './components/Content';

import { GlobalStyle } from './styles/theme';
import { state as defaultState } from './utils/state';
import './App.css';

const App = () => {
  const [state, setState] = useState(defaultState);

  const { mode } = state;

  const toggleTheme = () => {
    setState({
      mode: mode === 'light' ? 'dark' : 'light',
    });
  };

  return (
    <ThemeProvider theme={{ mode }}>
      <GlobalStyle />
      <Router>
        {/* <Sidebar /> */}
        <Header activeTheme={mode} toggleTheme={toggleTheme} />
        <Content />
      </Router>
    </ThemeProvider>
  );
};

export default App;
