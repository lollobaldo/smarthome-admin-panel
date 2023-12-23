import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components/macro';

import { AuthProvider, useAuth } from 'brains/auth';
import { MqttProvider } from 'brains/mqtt';
import { ThemeProvider } from 'brains/theme';
// import { ToastContainer, toast } from 'components/bits/Toast';

import Screenlock from 'components/Screenlock';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import Content from 'components/Content';

import { GlobalStyle, mediaQuery } from 'styles/theme';

import TabletScreen from 'components/bits/TabletScreen';

const AppContainer = styled.div`
  /* display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  justify-content: space-between; */
  height: 100%;
  overflow-y: hidden;

  display: grid;
  justify-items: stretch;
  grid-template-columns: 200px auto;
  grid-template-rows: 108px auto 56px;
  grid-template-areas: 
    "header header"
    "content content"
    "footer footer";

  ${mediaQuery('tablet')} {
    grid-template-areas: 
      "sidebar content"
      "sidebar content"
      "sidebar footer";
  };
`;

const AppContent = () => {
  const { permissions } = useAuth().auth.user;
  // const { addToast } = useToasts();
  useEffect(() => {
    if (permissions === 'guest') {
      // toast('Logged in as a guest. Some features might not be available!', 'warn');
    }
  }, [permissions]);
  return (
    <AppContainer>
      <Screenlock lock={permissions === 'none'} />
      <>
        <Sidebar />
        <Header />
        <Content />
        <Footer />
      </>
    </AppContainer>
  );
};

const App = () => (
  // <ToastProvider>
  <AuthProvider>
    <MqttProvider>
      <Router>
        <ThemeProvider>
          <GlobalStyle />
          <TabletScreen>
            <AppContent />
            {/* <ToastContainer /> */}
          </TabletScreen>
        </ThemeProvider>
      </Router>
    </MqttProvider>
  </AuthProvider>
  // </ToastProvider>
);

export default App;
