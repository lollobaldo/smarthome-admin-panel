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
  const { state, switchLight } = useLights();
  const LightSwitch = <Switch state={state?.state} onSwitch={switchLight} />;

  return (
    <DeviceCard name="Lights" iconSrc={bulbIcon} value={LightSwitch} onClick={() => {}} />
  );
};

const Lights = () => {
  console.log('');
  return (
    <div />
  );
};

export default Lights;
