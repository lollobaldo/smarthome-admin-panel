import React from 'react';

import useLights from 'brains/devices/useLights';

import { DeviceCard } from 'components/bits/Card';
import Switch from 'components/bits/Switch';

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

const Lights = () => {
  console.log('');
  return (
    <div />
  );
};

export default Lights;
