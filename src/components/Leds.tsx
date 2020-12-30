import React from 'react';
import useLights from 'brains/useLights';

import { DeviceCard } from 'components/bits/Card';
import Switch from 'components/bits/Switch';

import bulbIcon from 'res/icons/color-wheel-2.svg';

export type DeviceCardProps = {
  name: string,
  onSelect?: () => {},
};

export const LedsCard = () => {
  // const state = useLights();

  const LightSwitch = <Switch state={false} onSwitch={() => {}} />;

  return (
    <DeviceCard name="Leds" iconSrc={bulbIcon} value={LightSwitch} onClick={() => {}} />
  );
};

const Leds = () => {
  console.log('');
  return (
    <div />
  );
};

export default Leds;
