'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type AuthUser = { email: string; name: string };

type AuthContextValue = {
  isAuthenticated: boolean;
  isReady: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const SESSION_KEY = 'pde-admin-mock-session';
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedSession = localStorage.getItem(SESSION_KEY);
    const session = storedSession ? JSON.parse(storedSession) as AuthUser : null;
    const syncSession = window.setTimeout(() => {
      setUser(session);
      setIsReady(true);
    }, 0);
    return () => window.clearTimeout(syncSession);
  }, []);

  const login = (email: string, password: string) => {
    if (!email.trim() || !password.trim()) return false;

    // TODO: Implementar a chamada de login da API aqui.
    
    const nextUser = { email: email.trim(), name: 'Administrador' };
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ isAuthenticated: Boolean(user), isReady, user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return context;
}
