import React, { createContext, useState, useCallback } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isShowMenuOpen, setIsShowMenuOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const closeAllMenus = useCallback(() => {
    setIsAddMenuOpen(false);
    setIsShowMenuOpen(false);
    setIsShareMenuOpen(false);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isAddMenuOpen,
        setIsAddMenuOpen,
        isShowMenuOpen,
        setIsShowMenuOpen,
        isShareMenuOpen,
        setIsShareMenuOpen,
        closeAllMenus,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
