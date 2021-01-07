import useDevice from 'brains/devices/useDevice';

export type LightsState = {
  brightness: number,
  temperature: number,
};

const defaultState = { brightness: 0, temperature: 0 };

const message2state = (message: string, lastState: LightsState = defaultState): LightsState => {
  if (message === '/') {
    return { ...lastState, brightness: 0 };
  }
  if (message === 'W') {
    return { ...lastState, temperature: 0 };
  }
  if (message === 'N') {
    return { ...lastState, temperature: 128 };
  }
  if (message === 'C') {
    return { ...lastState, temperature: 255 };
  }
  if (message && message.charAt(0) === 'M') {
    const [brightness, temperature] = message.substring(1).split(',').map(Number);
    return { brightness, temperature };
  }
  return defaultState;
};

const state2message = ({ brightness, temperature }: LightsState): string => (
  `M${brightness},${temperature}`
);

const useLights = (topic: string = 'lights/bulbs'): { state: LightsState, switchLight: () => void } => {
  const [state, setState] = useDevice({ topic, defaultState, message2state, state2message });

  const switchLight = () => {
    setState(({ brightness, temperature }) => ({ brightness: brightness ? 0 : 255, temperature }));
  };

  return { state, switchLight };
};

export default useLights;
