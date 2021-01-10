import React from 'react';
import styled from 'styled-components/macro';

import { LightsCard } from 'components/Lights';
import { LedsCard } from 'components/Leds';
import { FansCard } from 'components/Fans';
import { PlantsCard } from 'components/Plants';
import { HeaterCard } from 'components/Heater';

const StyledContainer = styled.div`
  padding: 16px;
`;

const StyledFlexbox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
        <FansCard />
        <PlantsCard />
        <HeaterCard />
        <HeaterCard />
      </StyledFlexbox>
    </StyledContainer>
  );
};

export default Devices;
