import React from 'react';
import styled from 'styled-components/macro';

import useLights from 'brains/devices/useLights';

import DeviceCard from 'components/bits/DeviceCard';
import Switch from 'components/bits/Switch';
import Bulb from 'components/bits/Bulb';
import Slider from 'components/bits/Slider';
import ColorSlider from 'components/bits/ColorSlider';

import { useThrottledSetter } from 'brains/hooks';
import { interpolateColor } from 'brains/utils';

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

const Container = styled.div`
  display: grid;
  justify-items: stretch;
  grid-template-columns: auto 80px;
  grid-template-rows: 0px auto 15%;
  grid-template-areas: 
    "header header"
    "bulb slider"
    "footer footer";
  height: 100%;
  overflow: hidden;
`;

// const LightBulb = styled.div`
//   /* grid-area: content; */
//   position: relative;
//   height: 100%;
//   display: flex;
//   overflow: hidden;
//   padding: 64px 0 32px 0;
// `;

const AnimatedBulb = styled(Bulb)`
  grid-area: bulb;
  transition: all 1s;
  /* position: absolute; */
  left: ${({ color }) => (color ? '0' : '50%')};
  transform: translateX(-60%);
  margin: auto;
  width: 80%;
`;

// const AnimatedSlider = styled(Slider)`
//   grid-area: slider;
//   transition: all 1s;
//   position: absolute;
//   /* Vertically center */
//   top: 50%;
//   transform: translateY(-50%) rotate(-90deg);
//   right: ${({ color }) => (color ? 'calc(16px - 100px + 40px);' : '-50%')};
//   width: 200px;
//   height: 80px;
// `;

// const AnimatedBrightnessSlider = styled(AnimatedSlider)`
//   grid-area: slider;
//   top: 50%;
//   transform: translateY(-50%) rotate(-90deg);
//   right: ${({ color }) => (color ? 'calc(16px - 100px + 40px);' : '-50%')};
// `;

const BrightnessSlider = styled<any>(Slider)`
  touch-action: none; // Disable scroll-down to refresh as it causes lag
  grid-area: slider;
  transition: all 1s;
  margin: auto;
  /* width: 64px;
  height: 300px; */
  width: 300px;
  height: 50px;
  /* top: 50%; */
  transform: translateY(-50%) rotate(-90deg);
  /* transform: translate(-50%, -50%) rotate(-90deg); */
  position: relative;
  right: ${({ state }) => state ? '120px' : '-100%'};
`;

const TemperatureSlider = styled(ColorSlider)`
  grid-area: footer;
  width: 100%;
  height: 50px;
  margin-top: 0;
`;

// const StyledHeader = styled.h1`
//   grid-area: slider;
//   display: flex;
// `;

// const Status = styled.section`
//   /* margin: 16px; */
//   display: flex;
//   justify-content: space-between;

//   div:last-child{
//     text-align: right;
//   }
// `;

// const TemperatureControls = styled.section`
//   /* margin: 16px; */
//   width: 100%;
//   display: flex;
//   justify-content: space-between;

//   & div { height: 50px; margin: 0; }
// `;

// const StyledFooter = styled.section`
//   grid-area: footer;
//   margin: 32px;
//   gap: 24px;
//   display: flex;
//   justify-content: space-around;
//   flex-direction: column;
// `;

// const Header = () => {
//   // const { state, setBrightness, toggleLight } = useLights();
//   // const color = state.state ? '#ffdd44' : undefined;
//   return (
//     <StyledHeader>
//       Lights
//     </StyledHeader>
//   );
// };

// const Footer = () => {
//   const { state } = useLights();
//   console.log(state);
//   const brightness = Math.round(state.brightness / 255 * 1400); // 0-1400lm
//   const temperature = Math.round(state.temperature / 255 * 3000) + 3000; // 3000-6000K
//   return (
//     <StyledFooter>
//       <Status>
//         <div>
//           <Label>Brightness</Label>
//           <Value>{`${brightness}lm`}</Value>
//         </div>
//         <div>
//           <Label>Temperature</Label>
//           <Value>{`${temperature}K`}</Value>
//         </div>
//       </Status>
//       <TemperatureControls>
//         <Card>Cool</Card>
//         <Card>Neutral</Card>
//         <Card>Warm</Card>
//       </TemperatureControls>
//     </StyledFooter>
//   );
// };

const brightnessGradient = ['#ffffff', '#FF9F3E'];
const temperatureGradient = ['#B4D0FF', '#FFFFFF', '#FF9F3E'];

const value2color = (gradient: string[], value: number, min = 0, max = 255) => {
  value = Math.round(value);
  if (value <= min) return gradient[0];
  if (value >= max) return gradient[gradient.length - 1];
  const i = (value - min) * (gradient.length - 1) / (max - min);
  const c1 = Math.floor(i);
  const c2 = Math.ceil(i);
  return interpolateColor(gradient[c1], gradient[c2], i - c1);
};

const Lights = () => {
  const { state, setBrightness: sB, setTemperature: sT, toggleLight } = useLights();
  
  const [brightness, setBrightness] = useThrottledSetter(state.brightness, sB, 500);
  const [temperature, setTemperature] = useThrottledSetter(state.temperature, sT, 500);
  
  const color = value2color(temperatureGradient, state.temperature);
  return (
    <Container>
      {/* <Header /> */}
      <AnimatedBulb onClick={toggleLight} color={color} brightness={brightness} />
      <BrightnessSlider state={state.state} value={brightness} onChange={setBrightness}
        gradient={brightnessGradient} value2color={value2color.bind(null, brightnessGradient)}
        min={0} max={255} thumbColor="transparent" progressColor="white" trackColor="#777" />
      <TemperatureSlider value={temperature} onChange={setTemperature}
        gradient={temperatureGradient} value2color={value2color.bind(null, temperatureGradient)}
        min={0} max={255} />
      {/* <Footer /> */}
    </Container>
  );
};

export default Lights;
