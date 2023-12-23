import React from 'react';
import styled from 'styled-components/macro';

import Slider from 'components/bits/Slider';

const StyledSlider = styled(Slider)<any>`
  &::-webkit-slider-runnable-track {
    margin-top: 2.7%;
    overflow: visible;
  }

  &::-webkit-slider-thumb {
    box-sizing: border-box;
    border: 3px solid white;
    background: var(--thumb-color);
    box-shadow: none;
    width: auto;
    height: 167%;
    aspect-ratio: 1;
    border-radius: 100%;
    margin-top: -2.7%;
  }
`;


type SliderProps = Omit<React.ComponentProps<'input'>, 'value' | 'onChange' | 'min' | 'max'> & {
  value: number,
  onChange: (value: number) => void,
  gradient: string[],
  value2color: (value: number) => string,
  min?: number,
  max?: number,
};

const ColorSlider = ({ value2color, gradient, style, ...props }: SliderProps) => {
  const thumbColor = value2color(props.value);
  
  return (
    <StyledSlider
      progressColor="transparent"
      trackColor={`linear-gradient(to right, ${gradient.join(', ')})`}
      style={{ '--thumb-color': thumbColor, ...style }}
      {...props} />
  );
};

export default ColorSlider;
