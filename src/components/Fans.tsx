import React from 'react';

import useSwitch from 'brains/devices/useSwitch';

import { DeviceCard } from 'components/bits/Card';
import Switch from 'components/bits/Switch';

import bulbIcon from 'res/icons/fan.svg';

export const FansCard = () => {
  const { state, toggleState } = useSwitch('sensors/humidity');
  const FansSwitch = <Switch state={state} onSwitch={toggleState} />;

  return (
    <DeviceCard name="Fans" iconSrc={bulbIcon} value={FansSwitch} />
  );
};

const Fans = () => {
  console.log('');
  return (
    <div />
  );
};

export default Fans;
