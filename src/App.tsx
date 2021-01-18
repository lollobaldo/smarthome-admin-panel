import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { ToastContainer, toast } from 'material-react-toastify';
// import 'material-react-toastify/dist/ReactToastify.min.css';

import { AuthProvider, useAuth } from 'brains/auth';
import { MqttProvider } from 'brains/mqtt';
import { ThemeProvider } from 'brains/theme';
import { ToastProvider, ToastContainer, useToasts } from 'components/bits/Toast';

import Screenlock from 'components/Screenlock';
import Header from 'components/Header';
import Content from 'components/Content';

import { GlobalStyle } from 'styles/theme';

import TabletScreen from 'components/bits/TabletScreen';

const AppContent = () => {
  const { permissions } = useAuth().user;
  const { addToast } = useToasts();
  useEffect(() => {
    if (permissions === 'guest') {
      console.log('gg');
      // toast.warn('You\'re logged in as a guest. Some features might not be available!', {
      //   position: 'top-right',
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
      addToast('You\'re logged in as a guest. Some features might not be available!', 'warn');
    }
  }, [permissions]);
  return (
    <>
      <Screenlock lock={permissions === 'none'} />
      <>
        <Header />
        <Content />
      </>
      <ToastContainer />
    </>
  );
};

const App = () => (
  <ToastProvider>
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
  </ToastProvider>
);

export default App;
