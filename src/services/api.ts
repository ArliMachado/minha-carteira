import axios, { AxiosError } from 'axios';
import { signOut } from 'hooks/auth';
import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';

interface Callback {
  onSuccess(token: string): void;
  onFailure(error: AxiosError): void;
}

let isRefreshing = false;
let failedRequestsQueue: Callback[] = [];

const COOKIE_TOKEN = process.env.NEXT_PUBLIC_COOKIE_TOKEN || '';
const COOKIE_REFRESH_TOKEN = process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN || '';
const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export function setupAPIClient(ctx: GetServerSidePropsContext | undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${cookies[COOKIE_TOKEN]}`,
    },
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        if (error.response.status === 401) {
          if (error.response.data.code === 'token.expired') {
            cookies = parseCookies(ctx);

            const originalConfig = error.config;

            if (!isRefreshing) {
              isRefreshing = true;

              api
                .post('/refresh-token', {
                  token: cookies[COOKIE_REFRESH_TOKEN],
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
                    response.data.refresh_token,
                    {
                      maxAge: 60 * 60 * 24 * 30, // 30 days
                      path: '/',
                    },
                  );

                  api.defaults.headers.common[
                    'Authorization'
                  ] = `Bearer ${token}`;

                  failedRequestsQueue.forEach(request =>
                    request.onSuccess(token),
                  );
                  failedRequestsQueue = [];
                })
                .catch(err => {
                  failedRequestsQueue.forEach(request =>
                    request.onFailure(err),
                  );
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
                  originalConfig.headers = {
                    Authorizarion: `Bearer ${token}`,
                  };

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
      }

      return Promise.reject(error);
    },
  );

  return api;
}
