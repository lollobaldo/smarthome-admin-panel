import { useState } from 'react';

import { useMqttCallback } from 'brains/mqtt';

type UseMultiDeviceROProps<T> = {
  topic: string,
  defaultState: T,
  message2state: (topic: string, message: string, lastState?: T) => T,
};

const useMultiDeviceRO = <T>({ topic, defaultState, message2state }: UseMultiDeviceROProps<T>): T => {
  console.log(`Setting up multi device for topic: ${topic}.`);
  const [state, setState] = useState<T>(defaultState);
  useMqttCallback(topic, (t: string, m: string) => {
    const newState = message2state(t, m, state);
    if (newState !== state) setState(newState);
  });
  return state;
};

export default useMultiDeviceRO;
