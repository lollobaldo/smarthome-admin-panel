import { useState, useCallback, useEffect } from 'react';

import { Theme } from 'styles/theme';

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

export const useTheme = (defaultTheme: Theme = 'light'):
[Theme, React.Dispatch<React.SetStateAction<Theme>>] => {
  const [theme, setTheme] = useState(defaultTheme);
  const userAgentTheme = useMediaQuery('(prefers-color-scheme: light)', defaultTheme === 'light');

  useEffect(() => {
    setTheme(userAgentTheme ? 'light' : 'dark');
  }, [userAgentTheme]);

  return [theme, setTheme];
};
