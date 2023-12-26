import React from 'react';
import styled from 'styled-components/macro';

import { LightsCard } from 'components/Lights';
import { LedsCard } from 'components/Leds';
import { FansCard } from 'components/Fans';
import { PlantsCard } from 'components/plants/Plants';

const StyledFlexbox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const Devices = () => {
  return (
    <div>
      <h1>Devices</h1>
      <StyledFlexbox>
        <LightsCard />
        <LedsCard />
        <FansCard />
        <PlantsCard />
        {/* <HeaterCard />
        <HeaterCard /> */}
      </StyledFlexbox>
    </div>
  );
};

export default Devices;
