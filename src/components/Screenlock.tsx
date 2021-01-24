import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { Shake } from 'styles/animations';

import { usePin } from 'brains/hooks';
import { useAuth } from 'brains/auth';

import { colors, modal, card } from 'styles/theme';

const StyledScreen = styled.div<{ lock: boolean }>`
  ${theme('theme', modal)};
  position: absolute;
  top: ${({ lock }: { lock: boolean }) => (lock ? '0' : '-100%')};
  transition: top .8s, height .8s;
  z-index: 20;
  width: 100%;
  /* height: ${({ lock }: { lock: boolean }) => (lock ? '100%' : '0')}; */
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const getBorderColor = (isValidPin: boolean | undefined) => {
  if (isValidPin) { return '#0f0'; }
  if (isValidPin === false) { return '#f00'; }
  return colors.secondary;
};

const KeyPad = styled.div<{ isValidPin: boolean | undefined}>`
  ${theme('theme', card)};
  width: 300px;
  height: 400px;
  padding: 30px;

  .dots {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 20%;
    padding: 0 16px;
    outline: 1px solid ${(props) => getBorderColor(props.isValidPin)};
    font-size: xxx-large;
    font-weight: bold;

    & span {
      display: inline-block;
      width: 25%;
      text-align: center;
    }
  }
`;

const PinDigit = styled.input`
  width: 33%;
  height: 20%;
  border: 0;
  background: none;
  font-size: large;
`;

const Screenlock = ({ lock }: { lock: boolean }) => {
  const pinLength = 4;
  const { pin, type, del, reset } = usePin();
  const [isValidPin, setIsValidPin] = useState<boolean | undefined>(undefined);
  const { authenticate } = useAuth();

  useEffect(() => {
    if (pin.length === pinLength) {
      setIsValidPin(authenticate(pin));
    }
  }, [pin, authenticate]);

  const resetAll = () => {
    reset();
    setIsValidPin(undefined);
  };

  // const isValidPin = useAuthenticate(pin);
  // const isInvalid = pin.length === 4 && !isValidPin;
  // if (isValidPin) { console.log(pin); }
  return (
    <StyledScreen lock={lock}>
      <KeyPad isValidPin={isValidPin}>
        <Shake
          className="dots"
          playState={isValidPin !== false ? 'none' : 'running'}
          onAnimationEnd={resetAll}>
          {[0, 1, 2, 3].map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={i}>{ i < pin.length ? '•' : ' '}</span>
          ))}
        </Shake>
        <PinDigit type="button" value="1" onClick={() => type('1')} />
        <PinDigit type="button" value="2" onClick={() => type('2')} />
        <PinDigit type="button" value="3" onClick={() => type('3')} />
        <PinDigit type="button" value="4" onClick={() => type('4')} />
        <PinDigit type="button" value="5" onClick={() => type('5')} />
        <PinDigit type="button" value="6" onClick={() => type('6')} />
        <PinDigit type="button" value="7" onClick={() => type('7')} />
        <PinDigit type="button" value="8" onClick={() => type('8')} />
        <PinDigit type="button" value="9" onClick={() => type('9')} />
        <PinDigit type="button" value="C" onClick={() => reset()} />
        <PinDigit type="button" value="0" onClick={() => type('0')} />
        <PinDigit type="button" value="E" onClick={() => del()} />
      </KeyPad>
    </StyledScreen>
  );
};

export default Screenlock;
