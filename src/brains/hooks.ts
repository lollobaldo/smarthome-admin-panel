import { useState, useCallback } from 'react';

export const useOneOf = <T>(selected: T | undefined = undefined) => {
  const [state, setState] = useState(selected);
  const change = (key: T) => {
    setState((s) => (key === s ? undefined : key));
  };
  return [state, useCallback(change, [])];
};

export const emptyHook = () => {};
