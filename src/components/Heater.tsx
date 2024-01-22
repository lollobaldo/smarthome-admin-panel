import React from 'react';

import useLevel from 'brains/devices/useLevel';

import DeviceCard from 'components/bits/DeviceCard';

import heatingIcon from 'res/icons/heating.svg';

export const HeaterCard = () => {
  const { state } = useLevel('sensors/temperature');
  const FansSwitch = <span>{state}</span>;

  return (
    <DeviceCard name="Heater" iconSrc={heatingIcon} value={FansSwitch} />
  );
};

const Heater = () => {
  return (
    <div />
  );
};

export default Heater;
