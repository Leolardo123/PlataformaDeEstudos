'use client'
import { useEffect, useState } from 'react';

export function useTheme(defaultTheme: string = 'light') {
  const themes = [
    'dark',
    'light'
  ];

  // Initialize state as null or default to prevent SSR hydration mismatches
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('app-theme') || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);

    // Defer the client preference update until after hydration.
    const themeSync = window.setTimeout(() => setThemeState(initialTheme), 0);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('app-theme')) {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        setThemeState(newSystemTheme);
        document.documentElement.setAttribute('data-theme', newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => {
      window.clearTimeout(themeSync);
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  const toggleTheme = () => {
    let themeIndex = themes.findIndex(t => t === theme);

    if (themeIndex<0) return;

    themeIndex+=1;

    if (themes[themeIndex]) {
      setTheme(themes[themeIndex]);
    } else {
      setTheme(themes[0]);
    }
    
  }

  return { theme, setTheme, toggleTheme };
}
