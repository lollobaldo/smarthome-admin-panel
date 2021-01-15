import { useState, useCallback, useEffect } from 'react';

export const useOneOf = <T>(selected: T | undefined = undefined) => {
  const [state, setState] = useState(selected);
  const change = (key: T) => {
    setState((s) => (key === s ? undefined : key));
  };
  return [state, useCallback(change, [])];
};

export const useMediaQuery = (query: string, defaultState = false) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) return;
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};

export const usePin = () => {
  const [pin, setPin] = useState('');

  const type = (c: string) => setPin(pin + c);
  const del = () => setPin(pin.slice(0, -1));
  const reset = () => setPin('');

  return { pin, type, del, reset };
};
