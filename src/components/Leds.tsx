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

const StyledModal = styled(Modal)`
  border-radius: 100%;
  background: transparent;
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
      <StyledModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <ColorWheel state={state.color} handler={() => {}} />
      </StyledModal>
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
