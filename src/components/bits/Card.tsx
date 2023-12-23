import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { card, icon } from 'styles/theme';

const StyledCard = styled.div`
  ${theme('theme', card)};
  margin: auto;
  border-radius: 16px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.15);
  }
`;

interface CardProps {
  onClick?: () => void,
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

interface IconCardProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }>,
  background?: string,
  color?: string,
  onClick?: () => void,
  className?: string,
}

const StyledIconCard = styled(Card)`
  & svg {
    ${theme('theme', icon)};
    margin: auto;
    width: 100%;
    /* heigth: 100%; */
  }
`;

export const IconCard = ({ Icon, ...props }: IconCardProps) => (
  <StyledIconCard {...props}>
    <Icon />
  </StyledIconCard>
);

export const Widget = styled(Card)`
  margin: 16px;
  height: 100px;
  /* border-radius: 10px; */
  display: flex;
  justify-content: space-evenly;
`;

export const SmallWidgetCard = styled(Widget)`
  min-width: 50px;
  width: calc(50% - 8px);
`;

export const MediumWidgetCard = styled(Widget)`
  width: auto;
  padding: 16px;
`;

const StyledDeviceCard = styled(SmallWidgetCard)`
  margin: auto;
  flex-flow: column wrap;
`;

const StyledIcon = styled.img`
  ${theme('theme', icon)};
  width: 80px;
`;

interface DeviceCardProps {
  name: string,
  path?: string,
  iconSrc: string,
  value: React.ReactNode,
  className?: string,
}

export const DeviceCard = ({ name, path, iconSrc, value, className }: DeviceCardProps) => {
  const navigate = useNavigate();
  return (
    <StyledDeviceCard onClick={() => path && navigate(path)} className={className}>
      <StyledIcon src={iconSrc} />
      <h4 style={{ margin: 'auto', marginTop: '1em' }}>{name}:</h4>
      <p style={{ margin: 'auto', marginBottom: '1em' }}>{value}</p>
    </StyledDeviceCard>
  );
};

export default Card;
