import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { useAuth } from 'brains/auth';

import Presets from 'components/Presets';
import Devices from 'components/Devices';

const StyledHelloMsg = styled.div`
  padding-left: 16px;
  flex-basis: 100%;
`;

const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  & h6, & p {
    margin: 0;
  }
`;

const StyledStats = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const HelloMsg = ({ username }: { username?: string }) => (
  <StyledHelloMsg>
    <h1>{`Hello, ${username || 'user'}!`}</h1>
    <p>Welcome home.</p>
  </StyledHelloMsg>
);

type StatProps = { title: string, value: string };

const Stat = ({ title, value }: StatProps) => (
  <StyledStat>
    <h6>{title}</h6>
    <p>{value}</p>
  </StyledStat>
);

const Stats = () => (
  <StyledStats>
    <Stat title="Temp" value="24C" />
    <Stat title="RH" value="43%" />
    <Stat title="AQI" value="4" />
  </StyledStats>
);

const Home = () => {
  const { username } = useAuth().user;
  return (
    <>
      {/* <HelloMsg username={username} /> */}
      {/* <Stats /> */}
      <Presets />
      <Devices />
    </>
  );
};

export default Home;
