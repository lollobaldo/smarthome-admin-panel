import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { card, colors, icon } from 'styles/theme';

const StyledCard = styled.div`
  ${theme('theme', card)};
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;

  &:hover {
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.15);
  }
`;

export const Card = StyledCard;

export const Badge = styled(Card)`
  padding: 4px 8px;
  border: 1px solid black;

  &.active {
    font-weight: bold;
    border: 1px solid ${colors.secondary};
    color: ${colors.secondary};
  }
`;

const StyledIconCard = styled(Card)`
  & svg {
    ${theme('theme', icon)};
    margin: auto;
    width: 100%;
  }
`;

interface IconCardProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
}

export const IconCard = ({ Icon, ...props }: IconCardProps) => (
  <StyledIconCard {...props}>
    <Icon />
  </StyledIconCard>
);

export const Widget = styled(Card)`
  height: 100px;
  margin: auto;
  justify-content: space-evenly;
`;

export const SmallWidgetCard = styled(Widget)`
  min-width: 50px;
  width: calc(50% - 8px);
`;

export const MediumWidgetCard = styled(Widget)`
  width: 100%;
  padding: 16px;
`;

export const BigWidgetCard = styled(Widget)`
  width: 100%;
  padding: 16px;
`;

export default Card;
