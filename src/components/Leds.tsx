import React, { useState } from 'react';
import styled from 'styled-components/macro';
// import theme from 'styled-theming';

import useLeds from 'brains/devices/useLeds';

import DeviceCard from 'components/bits/DeviceCard';
import Modal from 'components/bits/Modal';
import Switch from 'components/bits/Switch';

// import { card } from 'styles/theme';

import ColorWheel from 'components/bits/ColorWheel';

import colorWheelIcon from 'res/icons/color-wheel-2.svg';

// const ColoredDiv = styled.span`
//   ${theme('theme', card)};
//   display: inline-block;
//   width: 2em;
//   height: 1.4em;
//   border-radius: 100px;
//   background-color: ${({ color }) => `${color}`};
// `;

const StyledModal = styled(Modal)`
  border-radius: 100%;
  background: transparent;
`;

export const LedsCard = () => {
  const { state, setLeds, toggleLeds } = useLeds();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const LedsSwitch = <Switch state={state.state} onSwitch={toggleLeds} color={state.color} />;

  return (
    <>
      <StyledModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <ColorWheel color={state.color} handler={setLeds} />
      </StyledModal>
      <DeviceCard name="Leds" path="leds" iconSrc={colorWheelIcon} value={LedsSwitch} />
    </>
  );
};

const Leds = () => {
  const { state, setLeds } = useLeds();

  return (
    <ColorWheel color={state.color} handler={setLeds} />
  );
};

export default Leds;
