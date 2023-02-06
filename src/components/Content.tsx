import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from 'components/Home';
import Lights from 'components/Lights';
import Leds from 'components/Leds';

const Content = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/lights" element={<Lights />} />
    <Route path="/leds" element={<Leds />} />
  </Routes>
);

export default Content;
