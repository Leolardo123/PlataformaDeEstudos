'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { authLogin, authMe, type AuthUser } from '@/lib/api';

type AuthSession = {
  accessToken: string;
  user: AuthUser;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  isReady: boolean;
  accessToken: string | null;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  logout: () => void;
};

const SESSION_KEY = 'pde-admin-session';
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedSession = localStorage.getItem(SESSION_KEY);
    const session = storedSession ? (JSON.parse(storedSession) as AuthSession) : null;

    if (!session?.accessToken) {
      setIsReady(true);
      return;
    }

    const syncSession = window.setTimeout(async () => {
      try {
        const currentUser = await authMe(session.accessToken);
        setAccessToken(session.accessToken);
        setUser(currentUser);
      } catch {
        localStorage.removeItem(SESSION_KEY);
        setAccessToken(null);
        setUser(null);
      }
      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(syncSession);
  }, []);

  const login = async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      return { ok: false as const, message: 'Informe e-mail e senha para entrar.' };
    }

    try {
      const session = await authLogin(email.trim(), password);
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setAccessToken(session.accessToken);
      setUser(session.user);
      return { ok: true as const };
    } catch (error) {
      return {
        ok: false as const,
        message: error instanceof Error ? error.message : 'Falha ao autenticar.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setAccessToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ isAuthenticated: Boolean(user), isReady, accessToken, user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return context;
}
