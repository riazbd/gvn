
import React, { useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme/theme';
import { ThemeContext } from './ThemeContext.js';

export const CustomThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => (currentTheme === 'light' ? lightTheme : darkTheme), [currentTheme]);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
