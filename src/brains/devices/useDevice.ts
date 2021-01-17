import { useState, useEffect } from 'react';

import { useMqttFull } from 'brains/mqtt';

type UseDeviceProps<T> = {
  topic: string,
  defaultState: T,
  message2state: (message: string, lastState?: T) => T,
  state2message: (state: T) => string,
};

const useDevice = <T>({ topic, defaultState, message2state, state2message }: UseDeviceProps<T>):
[state: T, setState: React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultState);
  const [mqttState, setMqttState] = useState<T>(defaultState);
  const { mqtt, state: m } = useMqttFull(topic);

  // Update Mqtt on state change
  useEffect(() => {
    if (mqtt && state !== mqttState) {
      mqtt?.publish(topic, state2message(state), { retain: true });
    }
  }, [mqtt, state]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update state on Mqtt change
  useEffect(() => {
    const mState = message2state(m, state);
    setMqttState(mState);
    if (state !== mState) {
      setState(mState);
    }
  }, [m]); // eslint-disable-line react-hooks/exhaustive-deps

  return [state, setState];
};

export default useDevice;
