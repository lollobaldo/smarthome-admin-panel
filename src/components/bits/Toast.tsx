import React, { useState, useEffect, useContext, createContext } from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { v4 as uuidv4 } from 'uuid';

import { mediaQuery, palettes, card } from 'styles/theme';

type ToastType = 'error' | 'warn' | 'info';

type Position =
| 'bottom-left'
| 'bottom-center'
| 'bottom-right'
| 'top-left'
| 'top-center'
| 'top-right';

const typeIcons = {
  error: { icon: '✖', colors: palettes.red },
  warn: { icon: '!', colors: palettes.yellow },
  info: { icon: 'i', colors: palettes.blue },
};

const placements = {
  'top-left': { top: 0, left: 0 },
  'top-center': { top: 0, left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: 0, right: 0 },
  'bottom-left': { bottom: 0, left: 0 },
  'bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: 0, right: 0 },
};

type ToastElement = {
  id: string,
  message: string,
  type: ToastType,
};

type ToastContextType = {
  toasts: ToastElement[],
  position: Position,
  addToast: (message: string, type: ToastType) => void,
  removeToast: (id: string) => void,
};

const ToastContext = createContext<ToastContextType>({
  toasts: [], position: 'top-right', addToast: () => {}, removeToast: () => {},
});

type ToastProviderProps = { position?: Position, children: React.ReactNode };

export const ToastProvider = ({ position = 'top-right', children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastElement[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => (
    setToasts((ts) => [...ts, { id: uuidv4(), message, type }])
  );

  const removeToast = (id: string) => setToasts((ts) => ts.filter((x) => x.id !== id));

  return (
    <ToastContext.Provider value={{ toasts, position, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

const StyledToastsContainer = styled.div<{ position: Position }>`
  ${({ position }) => placements[position]}
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px;

  ${mediaQuery('tablet')} {
    width: 360px;
  }
`;

const StyledToast = styled.div<any>`
  ${theme('theme', card)};
  display: flex;
  max-width: 100%;
  margin-top: 8px;
  border-radius: 10px;
  overflow: hidden;

  & .icon {
    background: ${({ colors }) => colors.primary};
    color: ${({ colors }) => colors.secondary};
    padding: 8px;
    width: 2em;
    text-align: center;
  }

  & .message {
    flex-grow: 1;
  }

  & .message, & .close {
    background: ${({ colors }) => colors.secondary};
    color: ${({ colors }) => colors.primary};
    padding: 8px;
  }
`;

type ToastProps = {
  type: ToastType,
  message: string,
  onClose: () => void,
};

const Toast = ({ type, message, onClose }: ToastProps) => (
  <StyledToast colors={typeIcons[type].colors}>
    <div className="icon">{typeIcons[type].icon}</div>
    <div className="message">{message}</div>
    <button className="close" onClick={onClose} type="button">✖</button>
  </StyledToast>
);

export const ToastContainer = () => {
  const { toasts, position, removeToast } = useContext(ToastContext);
  return (
    <StyledToastsContainer position={position}>
      {toasts.map(({ id, message, type }) => (
        <Toast key={id} message={message} type={type} onClose={() => removeToast(id)} />
      ))}
    </StyledToastsContainer>
  );
};

export const useToasts = () => useContext(ToastContext);
