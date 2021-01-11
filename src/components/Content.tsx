import React from 'react';
import { Switch, Route } from 'react-router-dom';

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

const Content = () => (
  <Switch>
    <Route exact path="/"><Home /></Route>
    <Route exact path="/lights"><Lights /></Route>
    <Route exact path="/leds"><Leds /></Route>
  </Switch>
);

export default Content;
