import React from 'react';
import styled from 'styled-components/macro';

import { units } from 'brains/influxdb/influxdb';
import Presets from 'components/Presets';
import Devices from 'components/Devices';
import thermometerIcon from 'res/icons/thermometer.svg';
import humidityIcon from 'res/icons/humidity.svg';
import healthIcon from 'res/icons/health.svg';
import StatsCard from './bits/StatsCard';

const Stats = () => {
  const stats = [
    { title: 'Temp', unit: units.temperature, value: 21, icon: thermometerIcon },
    { title: 'RH', unit: units.humidity, value: 67, icon: humidityIcon },
    { title: 'AQI', unit: '', value: 4, icon: healthIcon },
  ];

  return (
    <StatsCard stats={stats} />
  );
};

const Content = styled.div`
  padding: 16px;
  padding-top: 26px;
`;

const Home = () => {
  return (
    <Content>
      <Stats />
      <Presets />
      <Devices />
    </Content>
  );
};

export default Home;
