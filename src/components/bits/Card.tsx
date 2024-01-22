import React, { MouseEventHandler } from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { elevation1 } from 'styles/elevation';
import { colors, icon } from 'styles/theme';

const StyledCard = styled.div`
  ${elevation1};
  background: var(--md-sys-color-surface-container-low);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
`;

interface CardProps {
  onClick?: MouseEventHandler<HTMLDivElement>,
  background?: string,
  color?: string,
  className?: string,
  children: React.ReactNode,
}

export const Card = ({ onClick, className, background, color, children }: CardProps) => (
  <StyledCard onClick={onClick} className={className} style={{ background, color }}>
    {children}
  </StyledCard>
);

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
