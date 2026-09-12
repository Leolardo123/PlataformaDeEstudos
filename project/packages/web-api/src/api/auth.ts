import { apiRequest } from './core';

export type AuthRole = 'ADMIN' | 'STUDENT';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
};

export const authApi = {
  login(email: string, password: string) {
    return apiRequest<{ accessToken: string; user: AuthUser }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
    );
  },
  me(accessToken: string) {
    return apiRequest<AuthUser>('/auth/me', { method: 'GET' }, accessToken);
  },
};
