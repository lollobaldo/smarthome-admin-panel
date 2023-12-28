import React from 'react';
import styled from 'styled-components/macro';

import { MediumWidgetCard } from 'components/bits/NewCard';

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
  display: flex;
  justify-content: space-evenly;
  flex: 0 0 auto;
`;

const StyledPlainStats = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex: 0 0 auto;
`;

export const Stat = ({ title, value, unit, icon }: StatProps) => (
  <StyledStat>
    <img src={icon} alt={title} />
    <h6>{title}</h6>
    <p>{value ? +parseFloat(value).toFixed(1) + unit : 'NA'}</p>
  </StyledStat>
);

type StatProps = { title: string, value: any, unit: string, icon?: string };

type StatsCardProps = {
  stats: StatProps[],
};

export const PlainStats = ({ stats }: StatsCardProps) => {
  return (
    <StyledPlainStats>
      {stats.map(stat => <Stat {...stat} />)}
    </StyledPlainStats>
  );
};

const StatsCard = ({ stats }: StatsCardProps) => {
  return (
    <StyledStats>
      {stats.map(stat => <Stat {...stat} />)}
    </StyledStats>
  );
};

export default StatsCard;
