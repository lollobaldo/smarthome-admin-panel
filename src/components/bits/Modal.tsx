import React, { useState } from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { card } from 'styles/theme';

const StyledModalBackdrop = styled.div`
  transition: background .6s;
  background: rgba(100,100,100, ${({ isOpen }: { isOpen: boolean }) => (isOpen ? 0.7 : 0)});
  /* opacity: 0.5; */
  width: ${({ isOpen }: { open: boolean }) => (isOpen ? '100%' : '0')};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalContent = styled.div`
  ${theme('theme', card)};
  transition: .6s;
  width: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? '80%' : '0')};
  height: auto;
  border-radius: 100%;
`;

export type ModalProps = {
  isOpen: boolean,
  handleClose: () => void,
  className?: string,
  style?: CSSProperties,
  children: React.ReactNode,
};

export const Modal = ({ isOpen, handleClose, style, children }: ModalProps) => (
  <StyledModalBackdrop isOpen={isOpen} onClick={handleClose}>
    <StyledModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()} style={style}>
      {children}
    </StyledModalContent>
  </StyledModalBackdrop>
);

export default Modal;
