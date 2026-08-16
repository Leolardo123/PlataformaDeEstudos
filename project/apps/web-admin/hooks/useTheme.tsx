'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The default matches the theme rendered by the server to avoid hydration errors.
  const [theme, setThemeState] = useState<Theme>('dark');

  const applyTheme = (nextTheme: Theme, persist = true) => {
    document.documentElement.setAttribute('data-theme', nextTheme);
    setThemeState(nextTheme);
    if (persist) localStorage.setItem('app-theme', nextTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: Theme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : systemPrefersDark ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', initialTheme);
    const themeSync = window.setTimeout(() => setThemeState(initialTheme), 0);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem('app-theme')) applyTheme(event.matches ? 'dark' : 'light', false);
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => {
      window.clearTimeout(themeSync);
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, []);

  const toggleTheme = () => applyTheme(theme === 'dark' ? 'light' : 'dark');

  return <ThemeContext.Provider value={{ theme, setTheme: applyTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve ser usado dentro de ThemeProvider.');
  return context;
}
