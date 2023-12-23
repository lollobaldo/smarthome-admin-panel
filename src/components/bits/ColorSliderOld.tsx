import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import ReactSlider, { ReactSliderProps } from 'react-slider';

import { useThrottle } from 'brains/hooks';

const StyledSlider = styled(ReactSlider)<any>`
  max-width: 300px;
  margin: auto;
  filter: drop-shadow(0 0 5px #555);

  
  & .track-0 {
    ${({ isVertical }) => isVertical ? `
      left: 20%;
      width: 60%;
      top: 0 !important;
      bottom: 0 !important;
    ` : `
      top: 20%;
      height: 60%;
      left: 0 !important;
      right: 0 !important;
    ` };
    background: linear-gradient(to ${({ isVertical }) => isVertical ? 'bottom' : 'right' }, ${({ gradient }) => gradient.join(', ')});
    border-radius: 100vh;
  }
  
  & .track.track-1 {
    display: none;
  }

  & .thumb {
    cursor: pointer;
    background: ${({ valueColor }) => valueColor};
    border: 3px solid #fff;
    /* shape of the thumb: circle */
    ${({ isVertical }) => isVertical ? 'width' : 'height' }: 100%;
    aspect-ratio: 1;
    border-radius: 100%;
    outline: none;
  }
    
  & .thumb:hover {
    box-shadow: 0 0 0 8px #f0f;
  }
`;

type SliderProps = ReactSliderProps & {
  value: number,
  gradient: string[],
  onChange: (value: number) => void,
  value2color: (value: number) => string,
};

const ColorSlider = ({ value, value2color, onChange, gradient, ...props }: SliderProps) => {
  const [v, setV] = useState(value);
  const throttledV = useThrottle(v, 2000);
  
  const onChangeCallback = (newValue: number) => {
    setV(newValue);
  };

  useEffect(() => {
    onChange(throttledV);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [throttledV]);

  useEffect(() => {
    setV(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);


  return (
    <StyledSlider
      value={v}
      valueColor={value2color(v)}
      onChange={onChangeCallback}
      isVertical={props.orientation === 'vertical'}
      gradient={props.invert ? gradient.slice().reverse() : gradient}
      {...props} />
  );
};

export default ColorSlider;
