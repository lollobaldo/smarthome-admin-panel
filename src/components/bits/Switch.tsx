import React from 'react';
import styled from 'styled-components';
// import './Switch.scss';

const StyledLabel = styled.label`
  & * {
    // Needed to avoid blue box on click
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  position: relative;
  display: inline-block;
  width: 2em;
  height: 1.4em;

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: .4s;
    box-shadow: none;
    background: rgb(204, 204, 204);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.2em;
    width: 1.2em;
    left: 0.1em;
    bottom: 0.1em;
    background-color: white;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #4CAF50;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #4CAF50;
  }

  input:checked + .slider:before {
    transform: translateX(0.55em);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 100px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

type SwitchProps = {
  state: boolean,
  onSwitch: () => void,
};

const Switch = ({ state, onSwitch }: SwitchProps) => (
  <StyledLabel onClick={(e) => e.stopPropagation()}>
    <input
      type="checkbox"
      checked={state}
      onChange={onSwitch} />
    <span className="foreground slider round" />
  </StyledLabel>
);

export default Switch;
