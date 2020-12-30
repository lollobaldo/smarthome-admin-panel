import React from 'react';
import styled from 'styled-components/macro';

import { LightsCard } from 'components/Lights';
import { LedsCard } from 'components/Leds';

const StyledContainer = styled.div`
  padding: 16px;
`;

const StyledFlexbox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const Devices = () => {
  console.log('');
  return (
    <StyledContainer>
      <h1>Devices</h1>
      <StyledFlexbox>
        <LightsCard />
        <LedsCard />
      </StyledFlexbox>
    </StyledContainer>
  );
};

export default Devices;
