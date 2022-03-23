import { createContext, useState, useContext, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';

import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

interface IThemeContext {
  toggleTheme(): void;
  theme: ITheme;
}

interface ITheme {
  title: string;

  colors: {
    primary: string;
    secondary: string;
    tertiary: string;

    white: string;
    black: string;
    gray: string;

    success: string;
    info: string;
    warning: string;
  };
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const CustomThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>(dark);

  const toggleTheme = useCallback(() => {
    if (theme.title === 'dark') {
      setTheme(light);
    } else {
      setTheme(dark);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);
  return context;
}

export { CustomThemeProvider, useTheme };
