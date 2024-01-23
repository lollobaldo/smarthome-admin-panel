import React from 'react';
import styled from 'styled-components/macro';

import { Badge } from 'components/bits/Card';

const Container = styled.div`
  width: 100%;
  padding: 0 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-evenly;
`;

type ModalProps = {
  selected: number,
  options: number[],
  changeLookbackDays: (lookbackDays: number) => void,
};

const formatDay = (days: number) => {
  if (days === 1) return '1 day';
  return `${days} ${days > 1 ? 'days' : 'day'}`;
};

const LookbackDays = ({ selected, options, changeLookbackDays }: ModalProps) => (
  <Container>
    {options.map(option => (
      <Badge
        key={option}
        className={option === selected ? 'active' : undefined}
        onClick={() => changeLookbackDays(option)}>
          {formatDay(option)}
      </Badge>
    ))}
  </Container>
);

export default LookbackDays;
