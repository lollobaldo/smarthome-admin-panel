import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { card } from 'styles/theme';

const StyledModalBackdrop = styled.div`
  transition: background .6s;
  background: rgba(100,100,100, ${({ isOpen }: { isOpen: boolean }) => (isOpen ? 0.8 : 0)});
  /* opacity: 0.5; */
  width: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? '100%' : '0')};
  height: 100%;
  z-index: 5;
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

type ModalProps = {
  isOpen: boolean,
  handleClose: () => void,
  className?: string,
  children: React.ReactNode,
};

const Modal = ({ isOpen, handleClose, className, children }: ModalProps) => (
  <StyledModalBackdrop isOpen={isOpen} onClick={handleClose}>
    <StyledModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()} className={className}>
      {children}
    </StyledModalContent>
  </StyledModalBackdrop>
);

export default Modal;
