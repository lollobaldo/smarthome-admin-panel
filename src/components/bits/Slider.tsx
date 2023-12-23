import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

const StyledInput = styled.input<any>`
  & * {
    -webkit-tap-highlight-color: transparent; // Avoid blue box on click
  }

  margin: auto;
  appearance: none;
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  filter: drop-shadow(0 0 5px #555);

  &::-webkit-slider-container {
    height: 60%;
    border-radius: 100vh;
  }

  &::-webkit-slider-runnable-track {
    height: 100%;
    background: var(--track-color);
    border-radius: 100vh;
    overflow: hidden;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 0px;
    outline: none;
    box-shadow: -100vw 0 0 100vw var(--progress-color);
  }
`;

type SliderProps = Omit<React.ComponentProps<'input'>, 'value' | 'onChange' | 'min' | 'max'> & {
  value: number,
  onChange: (value: number) => void,
  gradient: string[],
  value2color: (value: number) => string,
  min?: number,
  max?: number,
  progressColor?: string,
  trackColor?: string,
};

const Slider = ({ value, onChange, min = 0, max = 100, style, ...props }: SliderProps) => {
  const sign = min <= max ? 1 : -1;
  const scale = (normalised: number) => {
    return sign * normalised * (max - min) + min;
  };
  const scaleInv = (scaled: number) => {
    return sign * scaled / (max - min);
  };
  
  const [v, setV] = useState(scaleInv(value));
  
  const onChangeCallback = (newValue: number): void => {
    setV(newValue);
    onChange(scale(newValue));
  };

  const { progressColor, trackColor } = props;

  return (
    <StyledInput
      type="range"
      value={v}
      min={0}
      max={1}
      step={0.01}
      onChange={(e: any) => onChangeCallback(Number(e.target.value))}
      style={{ '--progress-color': progressColor, '--track-color': trackColor, ...style }}
      {...props} />
  );
};

export default Slider;
