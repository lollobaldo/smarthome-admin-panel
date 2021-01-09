import React, { useState } from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import useLeds from 'brains/devices/useLeds';

import { DeviceCard } from 'components/bits/Card';
import Modal from 'components/bits/Modal';

import { card } from 'styles/theme';

import ColorWheel from 'components/bits/ColorWheel';

import colorWheelIcon from 'res/icons/color-wheel-2.svg';

const ColoredDiv = styled.span`
  ${theme('theme', card)};
  display: inline-block;
  width: 2em;
  height: 1.4em;
  border-radius: 100px;
  background-color: ${({ color }) => `${color}`};
`;

const StyledModal = styled(ColorWheel)`
  ${theme('theme', card)};
  transition: .6s;
  width: ${({ open }: { open: boolean }) => (open ? '80%' : '0')};
  height: auto;
  border-radius: 100%;
`;

export const LedsCard = () => {
  const { state } = useLeds();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const LedsIndicator = (
    <ColoredDiv
      color={state.color} onClick={() => setIsModalOpen(true)} />
  );

  return (
    <>
      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <ColorWheel state={state.color} handler={() => {}} />
      </Modal>
      <DeviceCard name="Leds" iconSrc={colorWheelIcon} value={LedsIndicator} onClick={() => {}} />
    </>
  );
};

const Leds = () => {
  console.log('');
  return (
    <div />
  );
};

export default Leds;
