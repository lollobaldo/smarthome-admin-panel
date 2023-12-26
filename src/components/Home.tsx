import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import Presets from 'components/Presets';
import Devices from 'components/Devices';
import { MediumWidgetCard } from 'components/bits/Card';
import { card } from 'styles/theme';

import thermometerIcon from 'res/icons/thermometer.svg';
import humidityIcon from 'res/icons/humidity.svg';
import healthIcon from 'res/icons/health.svg';

const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 48px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: auto;
  flex-grow: 1;

  & h6, & p {
    margin: 0;
  }

  & img {
    height: 100%;
  }

  & h6 {
    font-weight: normal;
  }

  & p {
    font-weight: bold;
  }
`;

const StyledStats = styled(MediumWidgetCard)`
  ${theme('theme', card)}
  display: flex;
  justify-content: space-evenly;
`;

type StatProps = { title: string, value: string, icon?: string };

const Stat = ({ title, value, icon }: StatProps) => (
  <StyledStat>
    <img src={icon} alt={title} />
    <h6>{title}</h6>
    <p>{value}</p>
  </StyledStat>
);

const Stats = () => {
  return (
    <StyledStats>
      <Stat title="Temp" value="24C" icon={thermometerIcon} />
      <Stat title="RH" value="43%" icon={humidityIcon} />
      <Stat title="AQI" value="4" icon={healthIcon} />
    </StyledStats>
  );
};

const Content = styled.div`
  padding: 16px;
  padding-top: 26px;
`;

const Home = () => {
  return (
    <Content>
      {/* <HelloMsg username={username} /> */}
      <Stats />
      <Presets />
      <Devices />
    </Content>
  );
};

export default Home;
