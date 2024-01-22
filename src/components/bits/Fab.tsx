import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

const Container = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  height: 56px;
  width: 56px;
  border-radius: 16px;
  padding: 16px;

  background: #A1C9F1;
  /* box-shadow: 0px 4px 8px 3px #A1C9F1; */
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

  & img {
    width: 24px;
    height: 24px;
  }
`;

interface FabProps {
  title: string,
  iconSrc: string,
}

const Fab = ({ title, iconSrc }: FabProps) => {
  return (
    <Container>
      <img alt={title} src={iconSrc} />
    </Container>
  );
};

export default Fab;
