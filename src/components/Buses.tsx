import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { useTflData } from 'brains/tfl';

import { MediumWidgetCard } from 'components/bits/Card';

import { mediaQuery, card } from 'styles/theme';

const StyledDiv = styled(MediumWidgetCard)`
  ${theme('theme', card)}
  display: flex;
  justify-content: space-evenly;

  ${mediaQuery('tablet')} {
    display: none;
  };
`;

const Buses = () => {
  const buses = useTflData();
  // console.log(buses);
  return (
    <StyledDiv>
      {`Next bus at ${buses['25']?.[0]} seconds`}
    </StyledDiv>
  );
};

export default Buses;
