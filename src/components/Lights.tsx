import React from 'react';
import styled from 'styled-components/macro';

import useLights from 'brains/devices/useLights';

import { DeviceCard } from 'components/bits/Card';
import Switch from 'components/bits/Switch';
import Bulb from 'components/bits/Bulb';
import Slider from 'components/bits/Slider';

import bulbIcon from 'res/icons/bulb.svg';

export type DeviceCardProps = {
  name: string,
  onSelect?: () => {},
};

export const LightsCard = () => {
  const { state, toggleLight } = useLights();
  const LightSwitch = <Switch state={state?.state} onSwitch={toggleLight} />;

  return (
    <DeviceCard name="Lights" path="lights" iconSrc={bulbIcon} value={LightSwitch} />
  );
};

const LightsPage = styled.div`
  position: relative;
  height: 100%;
  display: flex;
`;

const AnimatedBulb = styled(Bulb)`
  transition: all 1s;
  position: absolute;
  left: ${({ color }) => (color ? '0' : '50%')};
  transform: translateX(-50%);
  margin: auto;
  width: 80%;
`;

const AnimatedSlider = styled(Slider)`
  transition: all 1s;
  position: absolute;
  /* Vertically center */
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  right: ${({ color }) => (color ? 'calc(16px - 100px + 40px);' : '-50%')};
  width: 200px;
  height: 80px;
`;

const Lights = () => {
  const { state, setBrightness, toggleLight } = useLights();
  const color = state.state ? '#ffdd44' : undefined;
  return (
    <LightsPage>
      <AnimatedBulb onClick={toggleLight} color={color} brightness={state.brightness} />
      <AnimatedSlider color={color} value={state.brightness} onChange={setBrightness} />
    </LightsPage>
  );
};

export default Lights;
