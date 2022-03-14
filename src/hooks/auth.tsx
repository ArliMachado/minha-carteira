import { createContext, useEffect, useState } from 'react';
import Router from 'next/router';

import { api } from 'services/apiClient';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

type UserProps = {
  name: string;
  email: string;
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
    // const cookie = String(COOKIE_TOKEN);
    const cookies = parseCookies();
    const token = cookies[COOKIE_TOKEN];

    if (token) {
      api
        .get('/users/me')
        .then(response => {
          const { name, email } = response.data;
          setUser({
            name,
            email,
          });
        })
        .catch(err => {
          console.log(err);

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

      // const { name, email, permissions, roles } = await api.get('/me');

      const { user, token, refresh_token } = response.data;

      setCookie(undefined, COOKIE_TOKEN, token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/',
      });
      setCookie(undefined, COOKIE_REFRESH_TOKEN, refresh_token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/',
      });

      setUser({
        name: user.name,
        email,
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
