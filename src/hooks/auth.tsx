import { createContext, useEffect, useState } from 'react';
import Router from 'next/router';

import { api } from 'services/apiClient';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

type UserProps = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentialsProps = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentialsProps): Promise<void>;
  user: UserProps | undefined;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const COOKIE_TOKEN = process.env.NEXT_PUBLIC_COOKIE_TOKEN || '';
const COOKIE_REFRESH_TOKEN = process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN || '';

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, COOKIE_TOKEN);
  destroyCookie(undefined, COOKIE_REFRESH_TOKEN);

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { COOKIE_TOKEN: token } = parseCookies();

    if (token) {
      api
        .get('/me')
        .then(response => {
          const { email, permissions, roles } = response.data;

          setUser({
            email,
            permissions,
            roles,
          });
        })
        .catch(() => {
          // Aqui cairá os erros diferentes de token expirado, que esta sendo tratado no arquivo api.ts
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentialsProps) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, COOKIE_TOKEN, token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/',
      });
      setCookie(undefined, COOKIE_REFRESH_TOKEN, refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/',
      });

      setUser({
        email,
        permissions,
        roles,
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
