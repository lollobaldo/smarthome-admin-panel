import { useState, useCallback, useEffect, useRef } from 'react';
 
export const useOneOf = <T>(selected: T | null = null): [T | null, (key: T) => void] => {
  const [state, setState] = useState(selected);
  const change = (key: T) => {
    setState((s) => (key === s ? null : key));
  };
  const callback = useCallback(change, []);
  return [state, callback];
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

    onChange();
    mql.addEventListener('change', onChange);

    return () => {
      mounted = false;
      mql.removeEventListener('change', onChange);
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

// Hook
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const useThrottle = <T>(value: T, ms: number = 200) => {
  const [state, setState] = useState<T>(value);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextValue = useRef(null) as any;
  const hasNextValue = useRef(0) as any;

  useEffect(() => {
    if (!timeout.current) {
      setState(value);
      const timeoutCallback = () => {
        if (hasNextValue.current) {
          hasNextValue.current = false;
          setState(nextValue.current);
          timeout.current = setTimeout(timeoutCallback, ms);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutCallback, ms);
    } else {
      nextValue.current = value;
      hasNextValue.current = true;
    }
  }, [value, ms]);

  return state;
};

export const useThrottledSetter = <T>(initialValue: T, setter: (value: T) => void, ms: number = 200): [T, (v: T) => void] => {
  const [value, setValueUnder] = useState<T>(initialValue);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextValue = useRef(null) as any;
  const hasNextValue = useRef(0) as any;

  const setValue = (v: T) => {
    setValueUnder(v);
    if (!timeout.current) {
      setter(v);
      const timeoutCallback = () => {
        if (hasNextValue.current) {
          hasNextValue.current = false;
          setter(nextValue.current);
          timeout.current = setTimeout(timeoutCallback, ms);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutCallback, ms);
    } else {
      nextValue.current = v;
      hasNextValue.current = true;
    }
  };

  return [value, setValue];
};
