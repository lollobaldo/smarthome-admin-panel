import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { useAuth } from 'brains/auth';
import { useTflData } from 'brains/tfl';

import Presets from 'components/Presets';
import Devices from 'components/Devices';
import { MediumWidgetCard } from 'components/bits/Card';
import { card } from 'styles/theme';

import thermometerIcon from 'res/icons/thermometer.svg';
import humidityIcon from 'res/icons/humidity.svg';
import healthIcon from 'res/icons/health.svg';

const StyledHelloMsg = styled.div`
  /* padding-left: 16px; */
  flex-basis: 100%;
`;

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

const HelloMsg = ({ username }: { username?: string }) => (
  <StyledHelloMsg>
    <h1>{`Hello, ${username || 'user'}!`}</h1>
    <p>Welcome home.</p>
  </StyledHelloMsg>
);

type StatProps = { title: string, value: string, icon?: string };

const Stat = ({ title, value, icon }: StatProps) => (
  <StyledStat>
    <img src={icon} alt={title} />
    <h6>{title}</h6>
    <p>{value}</p>
  </StyledStat>
);

const Stats = () => {
  const buses = useTflData();
  // console.log(buses);
  return (
    <StyledStats>
      <Stat title="Temp" value="24C" icon={thermometerIcon} />
      <Stat title="RH" value="43%" icon={humidityIcon} />
      <Stat title="AQI" value="4" icon={healthIcon} />
    </StyledStats>
  );
};

const Home = () => {
  const { username } = useAuth().auth.user;
  return (
    <div>
      {/* <HelloMsg username={username} /> */}
      <Stats />
      <Presets />
      <Devices />
    </div>
  );
};

export default Home;
