import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/lights" element={<Lights />} />
    <Route path="/leds" element={<Leds />} />
  </Routes>
);

export default Content;
