import axios, { AxiosError } from 'axios';
import { signOut } from 'hooks/auth';
import { parseCookies, setCookie } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue = [];

const COOKIE_TOKEN = process.env.NEXT_PUBLIC_COOKIE_TOKEN || '';
const COOKIE_REFRESH_TOKEN = process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN || '';

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies[COOKIE_TOKEN]}`,
    },
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx);

          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post('/refresh', {
                refreshToken: cookies[COOKIE_REFRESH_TOKEN],
              })
              .then(response => {
                const { token } = response.data;

                setCookie(ctx, COOKIE_TOKEN, token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                });

                setCookie(
                  ctx,
                  COOKIE_REFRESH_TOKEN,
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/',
                  },
                );

                api.defaults.headers['Authorization'] = `Bearer ${token}`;

                failedRequestsQueue.forEach(request =>
                  request.onSuccess(token),
                );
                failedRequestsQueue = [];
              })
              .catch(err => {
                failedRequestsQueue.forEach(request => request.onFailure(err));
                failedRequestsQueue = [];

                if (process.browser) {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
