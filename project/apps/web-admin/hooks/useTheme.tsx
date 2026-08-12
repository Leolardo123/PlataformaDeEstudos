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
    // 1. Determine initial theme on mount
    const savedTheme = localStorage.getItem('app-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // 2. Set initial theme state and DOM attributes
    setThemeState(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);

    // 3. Listen for system OS theme changes dynamically
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      // Only auto-update if the user hasn't explicitly locked in a preference override
      if (!localStorage.getItem('app-theme')) {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        setThemeState(newSystemTheme);
        document.documentElement.setAttribute('data-theme', newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  // 4. Exposed function to update theme from UI components
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
