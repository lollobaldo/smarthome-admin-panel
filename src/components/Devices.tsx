import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import Card from './bits/Card';

const StyledDiv = styled.div`
`;

interface DeviceProps {
  name: string,
  icon: string,
  value?: React.ReactNode,
}

const Device = () => {
  console.log();
  return (
    <StyledDiv />
  );
};

const Devices = () => (
  <div>
    {/* <Device
      name="Light"
      icon={iconLight}
      value={getLightSwitch(state.lights.floorlamp, onLightSwitch)}
      onClick={() => {}} /> */}
  </div>
);

export default Devices;
