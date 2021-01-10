import useDevice from 'brains/devices/useDevice';

type LevelState = {
  state: number
};

const defaultState = { state: 0 };

const message2state = (message: string): LevelState => ({ state: Number(message) });

const state2message = ({ state }: LevelState): string => `${state}`;

const useLevels = (topic: string): LevelState => {
  const [state] = useDevice({ topic, defaultState, message2state, state2message });

  return state;
};

export default useLevels;
