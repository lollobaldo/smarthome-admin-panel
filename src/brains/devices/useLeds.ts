import useDevice from 'brains/devices/useDevice';

export type LedsState = {
  color: string,
};

const defaultState = { color: '#000000' };

const message2state = (message: string): LedsState => ({ color: message });

const state2message = ({ color }: LedsState): string => (`${color}`);

const useLeds = (topic: string = 'lights/leds'): { state: LedsState, setLeds: (color: string) => void } => {
  const [state, setState] = useDevice({ topic, defaultState, message2state, state2message });

  const setLeds = (color: string) => {
    setState({ color });
  };

  return { state, setLeds };
};

export default useLeds;
