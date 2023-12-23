import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { useThrottle } from 'brains/hooks';

import { slider } from 'styles/theme';

// const Container = styled.div<any>`
//   width: 100%;
//   height: 100%;
// `;

const StyledInput = styled.input<any>`
  & * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); // Avoid blue box on click
  }

  margin: auto;
  appearance: none;
  /* position: relative; */
  /* overflow: hidden; */
  filter: drop-shadow(0 0 5px #555);
  background: none;
  cursor: pointer;
  border-radius: 20px;

  &::-webkit-slider-container {
    ${theme('theme', slider)};
    background: transparent;
    height: 60%;
    /* top: 20%; */
    /* background: #f00; */
    border-radius: 100vh;
  }

  &::-webkit-slider-runnable-track {
    height: 100%;
    margin-top: 2.7%;
    background: linear-gradient(to right, #f00, #0f0);
    border-radius: 100vh;
  }

  &::-webkit-slider-thumb {
    box-sizing: border-box;
    /* position: relative; */
    /* background: #00f; */
    appearance: none;
    border: 3px solid white;
    background: #f0f;
    height: 167%;
    /* height: 100%; */
    aspect-ratio: 1;
    border-radius: 100%;
    margin-top: -2.7%;
    outline: none;
    /* box-shadow: -100vw 0 0 100vw ${({ color = '#fff' }) => (color)}; */
  }
`;

type SliderProps = React.ComponentProps<'input'> & {
  value: number,
  onChange: (value: number) => void,
  orientation?: 'horizontal' | 'vertical',
  color?: string,
};

// const Slider = ({ value, onChange, color, className }: SliderProps) => (
//   <StyledInput
//     type="range"
//     min="0"
//     max="255"
//     color={color}
//     value={value}
//     onChange={(e) => onChange(Number(e.target.value))}
//     className={className} />
// );

const Slider = ({ value, onChange, ...props }: SliderProps) => {
  const [v, setV] = useState(value);
  // const throttledV = useThrottle(v, 2000);
  
  const onChangeCallback = (newValue: number) => {
    setV(newValue);
  };

  // useEffect(() => {
  //   onChange(throttledV);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [throttledV]);

  useEffect(() => {
    setV(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);


  return (
  // <Container className={className}>
    <StyledInput
      value={v}
      type="range"
      min="0"
      max="255"
      // valueColor={value2color(v)}
      onChange={(e: any) => onChangeCallback(Number(e.target.value))}
      // isVertical={props.orientation === 'vertical'}
      // gradient={props.invert ? gradient.slice().reverse() : gradient}
      {...props} />
  // </Container>
  );
};

export default Slider;
