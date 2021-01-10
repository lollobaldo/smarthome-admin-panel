import useDevice from 'brains/devices/useDevice';

type LedsState = {
  state: boolean,
  color: string,
};

type LedsApi = {
  state: LedsState,
  setLeds: (color: string) => void,
  toggleLeds: () => void,
};

const defaultState = { state: false, color: '#ff6400' };

const message2state = (message: string, oldState: LedsState = defaultState): LedsState => {
  if (message && (message.charAt(0) === 'N' || message.charAt(0) === 'F')) {
    const state = message.charAt(0) === 'N';
    const color = message.substring(1);
    return { state, color };
  }
  return oldState;
};

const state2message = ({ state, color }: LedsState): string => (`${state ? 'N' : 'F'}${color}`);

const useLeds = (topic: string = 'lights/leds'): LedsApi => {
  const [state, setState] = useDevice({ topic, defaultState, message2state, state2message });

  const setLeds = (color: string) => {
    if (color === '#000000') {
      return setState((s: LedsState) => ({ ...s, state: false }));
    }
    return setState({ state: true, color });
  };

  const toggleLeds = () => {
    setState((ledsState) => ({ ...ledsState, state: !ledsState.state }));
  };

  return { state, setLeds, toggleLeds };
};

export default useLeds;
