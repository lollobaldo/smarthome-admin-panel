import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components/macro';

import Home from 'components/Home';
import Monitoring from 'components/Monitoring';
import Lights from 'components/Lights';
import Leds from 'components/Leds';
import Plants from 'components/plants/Plants';

const StyledContent = styled.div`
  grid-area: content;
  max-height: 100%;
  overflow: hidden;
`;

const Content = () => (
  <StyledContent>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/monitoring/*" element={<Monitoring />} />
      <Route path="/lights/*" element={<Lights />} />
      <Route path="/leds/*" element={<Leds />} />
      <Route path="/plants/*" element={<Plants />} />
    </Routes>
  </StyledContent>
);

export default Content;
