import { useDevice } from 'brains/devices/useDevice';

export type LedsState = {
  brightness: number,
  temperature: number,
};

const defaultState = { brightness: 0, temperature: 0 };

const message2state = (message: string): LedsState => ({ color: message });

const state2message = ({ color }: LedsState): string => (`${color}`);

const useLeds = (topic: string = 'lights/bulbs'): { state: LedsState, switchLight: () => void } => {
  const [state, setState] = useDevice({ topic, defaultState, message2state, state2message });

  const setLeds = (color) => {
    setState({ color });
  };

  return { state, setLeds };
};

export default useLeds;
