import useDevice from 'brains/devices/useDevice';

export type LightsState = {
  state: boolean,
  brightness: number,
  temperature: number,
};

const defaultState = { state: false, brightness: 255, temperature: 0 };

const message2state = (message: string): LightsState => {
  if (message && (message.charAt(0) === 'N' || message.charAt(0) === 'F')) {
    const [brightness, temperature] = message.substring(1).split(',').map(Number);
    const state = message.charAt(0) === 'N';
    return { state, brightness, temperature };
  }
  return defaultState;
};

const state2message = ({ state, brightness, temperature }: LightsState): string => (
  `${state ? 'N' : 'F'}${brightness},${temperature}`
);

const useLights = (topic: string = 'lights/bulbs'): { state: LightsState, switchLight: () => void } => {
  const [state, setState] = useDevice({ topic, defaultState, message2state, state2message });

  const switchLight = () => {
    setState((lightState) => ({ ...lightState, state: !lightState?.state }));
  };

  return { state, switchLight };
};

export default useLights;
