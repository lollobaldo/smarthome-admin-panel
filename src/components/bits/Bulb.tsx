import React, { CSSProperties } from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import bulb from 'res/icons/bulb.png';
import bulbCap from 'res/icons/bulb-top.png';
import { ReactComponent as BulbCap } from 'res/icons/bulb-top.svg';

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   background-image: url(${bulb}), url(${bulbCap});
//   background-size: contain;
//   background-repeat: no-repeat;

//   & img {
//     position: absolute;
//     width: 100%;
//   }
// `;

// interface BulbProps {
//   onClick?: () => void,
//   color?: string,
//   className?: string,
// }

// const Bulb = ({ onClick, color, className }: BulbProps) => (
//   <Container onClick={onClick} className={className} />
// );

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  & img, & svg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const LitBulb = styled(BulbCap)`
  color: ${(props) => props.color};
  filter: ${({ color }) => `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 16px ${color})`};
`;

interface BulbProps {
  onClick?: () => void,
  color?: string,
  className?: string,
  style?: CSSProperties,
}

// eslint-disable-next-line max-len
// eeffff > brightness(0) saturate(100%) invert(84%) sepia(34%) saturate(164%) hue-rotate(176deg) brightness(111%) contrast(105%);
// eslint-disable-next-line max-len
// ffdd44 > brightness(0) saturate(100%) invert(95%) sepia(56%) saturate(1109%) hue-rotate(314deg) brightness(108%) contrast(106%);
const Bulb = ({ onClick, color, className, style }: BulbProps) => (
  <Container onClick={onClick} className={className} style={style}>
    <img src={bulb} alt="" />
    {color ? <LitBulb color={color} title="" /> : <img src={bulbCap} alt="" />}
  </Container>
);

export default Bulb;
