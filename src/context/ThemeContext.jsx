import React, { createContext, useState, useCallback } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isShowMenuOpen, setIsShowMenuOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isPlanetMenuOpen, setIsPlanetMenuOpen] = useState(false);

  const openMenu = useCallback((menuType) => {
    // Toggle behavior: if the same menu is open, close it; otherwise open only the requested one
    const states = {
      add: isAddMenuOpen,
      show: isShowMenuOpen,
      share: isShareMenuOpen,
      planet: isPlanetMenuOpen,
    };

    const isSameMenuAlreadyOpen = states[menuType];

    // First close everything
    setIsAddMenuOpen(false);
    setIsShowMenuOpen(false);
    setIsShareMenuOpen(false);
    setIsPlanetMenuOpen(false);

    if (isSameMenuAlreadyOpen) {
      // Just closed it (toggled off)
      return;
    }

    // Open the requested one (no animation frame needed now)
    switch (menuType) {
      case 'add': setIsAddMenuOpen(true); break;
      case 'show': setIsShowMenuOpen(true); break;
      case 'share': setIsShareMenuOpen(true); break;
      case 'planet': setIsPlanetMenuOpen(true); break;
    }
  }, [isAddMenuOpen, isShowMenuOpen, isShareMenuOpen, isPlanetMenuOpen]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const closeAllMenus = useCallback(() => {
    setIsAddMenuOpen(false);
    setIsShowMenuOpen(false);
    setIsShareMenuOpen(false);
    setIsPlanetMenuOpen(false);
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
        isPlanetMenuOpen,
        setIsPlanetMenuOpen,
        closeAllMenus,
        openMenu,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
