import React, { useState, useEffect, useContext, createContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro';

import { useMediaQuery } from 'brains/hooks';

export type Theme = 'light' | 'dark';

type ThemeContextType = {
  activeTheme: Theme,
  setTheme: (theme: Theme) => void,
  toggleTheme: () => void,
};

const ThemeContext = createContext<ThemeContextType>({
  activeTheme: 'light', setTheme: () => {}, toggleTheme: () => {},
});

type ThemeProviderProps = { defaultTheme?: Theme, children: React.ReactNode };

export const ThemeProvider = ({ defaultTheme, children }: ThemeProviderProps) => {
  const [activeTheme, setThemeNative] = useState(defaultTheme || 'light');
  const userAgentTheme = useMediaQuery('(prefers-color-scheme: light)', defaultTheme === 'light');

  useEffect(() => {
    setThemeNative(userAgentTheme ? 'light' : 'dark');
  }, [userAgentTheme]);

  const setTheme = (theme: Theme) => setThemeNative(theme);

  const toggleTheme = () => {
    setThemeNative((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, setTheme, toggleTheme }}>
      <StyledThemeProvider theme={{ theme: activeTheme }}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
