import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider, useAuth } from 'brains/auth';
import { MqttProvider } from 'brains/mqtt';
import { ThemeProvider } from 'brains/theme';

import Screenlock from 'components/Screenlock';
import Header from 'components/Header';
import Content from 'components/Content';

import { GlobalStyle } from 'styles/theme';

import TabletScreen from 'components/bits/TabletScreen';

const AppContent = () => {
  const { permissions } = useAuth().user;
  console.log(permissions);
  return (
    <>
      <Screenlock lock={permissions === 'none'} />
      <>
        <Header />
        <Content />
      </>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <MqttProvider>
      <Router>
        <ThemeProvider>
          <GlobalStyle />
          <TabletScreen>
            <AppContent />
          </TabletScreen>
        </ThemeProvider>
      </Router>
    </MqttProvider>
  </AuthProvider>
);

export default App;
