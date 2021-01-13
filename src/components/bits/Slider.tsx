import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { slider } from 'styles/theme';

const StyledInput = styled.input`
  & * {
    // Needed to avoid blue box on click
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  margin: auto;
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  height: 80px;
  width: 200px;
  cursor: pointer;
  border-radius: 20px;
  transform: rotate(-90deg);

  &::-webkit-slider-container {
    ${theme('theme', slider)};
  }

  &::-webkit-slider-runnable-track {
    /* background: #ddd; */
  }

  &::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0px;
  height: 40px;
  background: #fff;
  box-shadow: -100vw 0 0 100vw ${({ color = 'dodgerblue' }) => (color)};;
}
`;

type SliderProps = {
  value: number,
  onChange: (value: number) => void,
  color?: string,
  className?: string,
};

const Slider = ({ value, onChange, color, className }: SliderProps) => (
  <StyledInput
    type="range"
    min="0"
    max="255"
    color={color}
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    className={className} />
);

export default Slider;
