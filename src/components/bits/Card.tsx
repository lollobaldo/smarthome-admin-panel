import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

// import { Theme, mediaQuery, icon, card } from 'styles/theme';
import { card } from 'styles/theme';

const StyledDiv = styled.div`
  ${theme('theme', card)};
  margin: 16px 8px;
  width: 100px;
  height: 100px;
  border-radius: 20%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledIcon = styled.img`
  margin: auto;
  width: 75%;
  height: 75%;
`;

interface CardProps {
  children: React.ReactNode,
}

const Card = ({ children }: CardProps) => (
  <StyledDiv>
    {children}
  </StyledDiv>
);

interface IconCardProps {
  iconSrc: string,
  iconAlt: string,
}

export const IconCard = ({ iconSrc, iconAlt }: IconCardProps) => (
  <Card>
    <StyledIcon src={iconSrc} alt={iconAlt} />
  </Card>
);

export default Card;
