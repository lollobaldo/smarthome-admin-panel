import { useState, useEffect } from 'react';

import { useMqttFull } from 'brains/mqtt';

type UseDeviceProps<T> = {
  topic: string,
  defaultState: T,
  message2state: (lastState: T, message: string) => T,
  state2message: (T) => string,
};

const useDevice = <T>({ topic, defaultState }: UseDeviceProps<T>):
[state: T, setState: React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultState);
  const { mqtt, state: m } = useMqttFull(topic);

  // Update Mqtt on state change
  useEffect(() => {
    if (mqtt) {
      mqtt.publish(topic, state2message(state), { retain: true });
    }
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update state on Mqtt change
  useEffect(() => {
    if (message2state(state, m) !== state) {
      setState(message2state(state, m));
    }
  }, [m]); // eslint-disable-line react-hooks/exhaustive-deps

  return [state, setState];
};

export default useDevice;
