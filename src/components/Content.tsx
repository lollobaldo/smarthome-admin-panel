import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components/macro';

import Presets from 'components/Presets';
import Devices from 'components/Devices';
import Lights from 'components/Lights';
import Leds from 'components/Leds';

const Home = () => (
  <>
    <Presets />
    <Devices />
  </>
);

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  flex-grow: 1;
`;

const Content = () => (
  <Switch>
    <ContentContainer>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/lights"><Lights /></Route>
      <Route exact path="/leds"><Leds /></Route>
    </ContentContainer>
  </Switch>
);

export default Content;
