import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { card } from 'styles/theme';

const StyledDiv = styled.div`
  ${theme('theme', card)};
  margin: auto;
  width: 100px;
  height: 100px;
  border-radius: 20%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

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
  <StyledDiv onClick={onClick} className={className} style={{ background, color }}>
    {children}
  </StyledDiv>
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

const StyledCard = styled(Card)`
   & svg {
     margin: auto;
     width: 100%;
     heigth: 100%;
   }
`;

export const IconCard = ({ Icon, ...props }: IconCardProps) => (
  <StyledCard {...props}>
    <Icon />
  </StyledCard>
);

const StyledDeviceCard = styled(Card)`
  margin: auto;
  min-width: 150px;
  width: calc(50% - 8px);
  border-radius: 20px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
`;

const StyledIcon = styled.img`
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
  const history = useHistory();
  return (
    <StyledDeviceCard onClick={() => path && history.push(path)} className={className}>
      <StyledIcon src={iconSrc} />
      <h4 style={{ margin: 'auto', marginTop: '1em' }}>{name}:</h4>
      <p style={{ margin: 'auto', marginBottom: '1em' }}>{value}</p>
    </StyledDeviceCard>
  );
};

export default Card;
