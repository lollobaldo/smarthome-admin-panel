import React from 'react';
import styled from 'styled-components/macro';

import useLights from 'brains/devices/useLights';

import { Card, DeviceCard } from 'components/bits/Card';
import { Label, Value } from 'components/bits/Text';
import Switch from 'components/bits/Switch';
import Bulb from 'components/bits/Bulb';
import Slider from 'components/bits/Slider';

import bulbIcon from 'res/icons/bulb.svg';

export type DeviceCardProps = {
  name: string,
  onSelect?: () => {},
};

export const LightsCard = () => {
  const { state, toggleLight } = useLights();
  const LightSwitch = <Switch state={state?.state} onSwitch={toggleLight} />;

  return (
    <DeviceCard name="Lights" path="lights" iconSrc={bulbIcon} value={LightSwitch} />
  );
};

const LightBulb = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  overflow: hidden;
  padding: 64px 0 32px 0;
`;

const AnimatedBulb = styled(Bulb)`
  transition: all 1s;
  /* position: absolute; */
  left: ${({ color }) => (color ? '0' : '50%')};
  transform: translateX(-60%);
  margin: auto;
  width: 80%;
`;

const AnimatedSlider = styled(Slider)`
  transition: all 1s;
  position: absolute;
  /* Vertically center */
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  right: ${({ color }) => (color ? 'calc(16px - 100px + 40px);' : '-50%')};
  width: 200px;
  height: 80px;
`;

const StyledHeader = styled.h1`
  display: flex;
`;

const Status = styled.section`
  /* margin: 16px; */
  display: flex;
  justify-content: space-between;

  div:last-child{
    text-align: right;
  }
`;

const TemperatureControls = styled.section`
  /* margin: 16px; */
  width: 100%;
  display: flex;
  justify-content: space-between;

  & div { height: 50px; margin: 0; }
`;

const StyledFooter = styled.section`
  margin: 32px;
  gap: 24px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const Header = () => {
  const { state, setBrightness, toggleLight } = useLights();
  const color = state.state ? '#ffdd44' : undefined;
  return (
    <StyledHeader>
      Lights
    </StyledHeader>
  );
};

const Footer = () => {
  const { state } = useLights();
  console.log(state);
  const brightness = Math.round(state.brightness / 255 * 1400); // 0-1400lm
  const temperature = Math.round(state.temperature / 255 * 3000) + 3000; // 3000-6000K
  return (
    <StyledFooter>
      <Status>
        <div>
          <Label>Brightness</Label>
          <Value>{`${brightness}lm`}</Value>
        </div>
        <div>
          <Label>Temperature</Label>
          <Value>{`${temperature}K`}</Value>
        </div>
      </Status>
      <TemperatureControls>
        <Card>Cool</Card>
        <Card>Neutral</Card>
        <Card>Warm</Card>
      </TemperatureControls>
    </StyledFooter>
  );
};


const Lights = () => {
  const { state, setBrightness, toggleLight } = useLights();
  const color = state.state ? '#ffdd44' : undefined;
  return (
    <>
      <Header />
      <LightBulb>
        <AnimatedBulb onClick={toggleLight} color={color} brightness={state.brightness} />
        <AnimatedSlider color={color} value={state.brightness} onChange={setBrightness} />
      </LightBulb>
      <Footer />
    </>
  );
};

export default Lights;
