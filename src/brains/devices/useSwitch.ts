import useDevice from 'brains/devices/useDevice';

type SwitchState = boolean;

type SwitchApi = {
  state: SwitchState,
  setState: (state: SwitchState) => void,
  toggleState: () => void,
};

const defaultState = false;

const message2state = (message: string): SwitchState => (message === 'on');

const state2message = (value: SwitchState): string => (value ? 'on' : 'off');

const useSwitch = (topic: string): SwitchApi => {
  const [state, setRawState] = useDevice({ topic, defaultState, message2state, state2message });

  const setState = (s: SwitchState) => setRawState(s);

  const toggleState = () => setRawState((s: boolean) => !s);

  return { state, setState, toggleState };
};

export default useSwitch;
