import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components/macro';
// import { ToastContainer, toast } from 'material-react-toastify';
// import 'material-react-toastify/dist/ReactToastify.min.css';

import { AuthProvider, useAuth } from 'brains/auth';
import { MqttProvider } from 'brains/mqtt';
import { ThemeProvider } from 'brains/theme';
import { ToastContainer, toast } from 'components/bits/Toast';

import Screenlock from 'components/Screenlock';
import Header from 'components/Header';
import Content from 'components/Content';

import { GlobalStyle } from 'styles/theme';

import TabletScreen from 'components/bits/TabletScreen';

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  height: 100%;
`;

const AppContent = () => {
  const { permissions } = useAuth().user;
  // const { addToast } = useToasts();
  useEffect(() => {
    if (permissions === 'guest') {
      toast('Logged in as a guest. Some features might not be available!', 'warn');
    }
  }, [permissions]);
  return (
    <ContentContainer>
      <Screenlock lock={permissions === 'none'} />
      <>
        <Header />
        <Content />
      </>
      <ToastContainer />
    </ContentContainer>
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
          </TabletScreen>
        </ThemeProvider>
      </Router>
    </MqttProvider>
  </AuthProvider>
  // </ToastProvider>
);

export default App;
