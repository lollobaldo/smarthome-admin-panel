import React from 'react';
import styled, { createGlobalStyle } from 'styled-components/macro';
import theme from 'styled-theming';

import { ToastContainer as NativeToastContainer, toast as nativeToast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.min.css';

import { useTheme } from 'brains/theme';
import { palettes, foreground } from 'styles/theme';

type ToastType = 'error' | 'warn' | 'info';

const typeIcons = {
  error: { icon: '✖', colors: palettes.red },
  warn: { icon: '!', colors: palettes.yellow },
  info: { icon: 'i', colors: palettes.blue },
};

// const StyledToastsContainer = styled.div<{ position: Position }>`
//   ${({ position }) => placements[position]}
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   padding: 8px;

//   ${mediaQuery('tablet')} {
//     width: 360px;
//   }
// `;

const StyledToast = styled.div<any>`
  ${theme('theme', foreground)};
  display: flex;
  max-width: 100%;
  border-radius: 10px;
  overflow: hidden;

  & .icon {
    background: ${({ colors }) => colors.primary};
    color: ${({ colors }) => colors.color || colors.secondary};
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: xx-large;
    font-weight: bold;
    flex-basis: 55px;
    flex-shrink: 0;
    flex-grow: 0;
  }

  & .message {
    flex-grow: 1;
    display: flex;
    align-items: center;
    background: ${({ isDark, colors }) => (isDark ? '#444' : colors.light)};
    color: ${({ isDark, colors }) => (isDark ? 'inherit' : colors.primary)};
    padding: 8px;
  }
`;

type ToastProps = {
  type: ToastType,
  message: string,
  // onClose: () => void,
};

const GlobalToastifyStyle = createGlobalStyle`
  /* Double the importance to override native style */
  .Toastify__toast.Toastify__toast {
    margin: 16px;
    margin-bottom: 0;
    padding: 0;
    background: none;
    box-shadow: none;
    overflow: visible;
    font-size: inherit;
    line-height: inherit;
  }
`;

const Toast = ({ type = 'info', message }: ToastProps) => {
  const { activeTheme } = useTheme();
  return (
    <StyledToast colors={typeIcons[type].colors} isDark={activeTheme === 'dark'}>
      <div className="icon">{typeIcons[type].icon}</div>
      <div className="message">{message}</div>
    </StyledToast>
  );
};

export const toast = (message: string, type: ToastType) => (
  nativeToast(<Toast message={message} type={type} />, {
    closeButton: false,
    progressStyle: {
      marginLeft: '55px',
      width: 'calc(100% - 32px)',
      background: typeIcons[type].colors.primary,
    },
  })
);

export const ToastContainer = () => (
  <>
    <GlobalToastifyStyle />
    <NativeToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      draggablePercent={40}
      pauseOnHover />
  </>
);
