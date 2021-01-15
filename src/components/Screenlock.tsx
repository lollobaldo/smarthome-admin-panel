import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components/macro';

import { Shake } from 'styles/animations';

import { usePin } from 'brains/hooks';
import { useAuth } from 'brains/auth';

const StyledScreen = styled.div<{ lock: boolean }>`
  position: absolute;
  top: ${({ lock }: { lock: boolean }) => (lock ? '0' : '-100%')};
  transition: all 1s;
  z-index: 20;
  width: 100%;
  height: 100%;
  background: #5533ff;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const KeyPad = styled.div<{ invalid: boolean}>`
  background: #f5f5f5;
  width: 300px;
  height: 400px;
  padding: 30px;

  .dots {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 20%;
    padding: 0 16px;
    outline: 1px solid ${({ invalid }) => (invalid ? '#f00' : '#ccc')};
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
  const { auth, useAuthenticate } = useAuth();
  const { pin, type, del, reset } = usePin();
  const isValidPin = useAuthenticate(pin);
  const isInvalid = pin.length === 4 && !isValidPin;
  if (isInvalid) { console.log(pin); }
  return (
    <StyledScreen lock={lock}>
      <KeyPad invalid={isInvalid}>
        <Shake
          className="dots"
          playState={isInvalid ? 'running' : 'paused'}
          onAnimationEnd={() => reset()}>
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
