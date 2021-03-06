import React from 'react';

// import useLevel from 'brains/devices/useLevel';

import { DeviceCard } from 'components/bits/Card';

import plantIcon from 'res/icons/plant-potted.svg';

export const PlantsCard = () => {
  // const { state } = useLevel('sensors/temperature');
  const plantSwitch = <span>22%</span>;

  return (
    <DeviceCard name="Plants" iconSrc={plantIcon} value={plantSwitch} />
  );
};

const Plants = () => {
  console.log('');
  return (
    <div />
  );
};

export default Plants;
