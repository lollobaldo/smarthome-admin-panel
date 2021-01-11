import React from 'react';
import styled from 'styled-components/macro';

import useLights from 'brains/devices/useLights';

import { DeviceCard } from 'components/bits/Card';
import Switch from 'components/bits/Switch';
import Bulb from 'components/bits/Bulb';

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

const AnimatedBulb = styled(Bulb)`
  margin: auto;
  width: 80%;
`;

const Lights = () => {
  const { state, toggleLight } = useLights();
  const color = state.state ? '#ffdd44' : undefined;
  return (
    <AnimatedBulb onClick={toggleLight} color={color} />
  );
};

export default Lights;
