import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { primaryText, secondaryText } from 'styles/theme';

export const Label = styled.h5`
  ${theme('theme', secondaryText)};
  margin: 0;
  font-weight: normal;
`;

export const Value = styled.p`
  ${theme('theme', primaryText)};
  margin: 0;
  font-weight: bold;
`;

