import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from 'services/errors/AuthTokenError';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  const COOKIE_TOKEN = process.env.NEXT_PUBLIC_COOKIE_TOKEN || '';
  const COOKIE_REFRESH_TOKEN =
    process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN || '';

  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (!cookies[COOKIE_TOKEN]) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, COOKIE_TOKEN);
        destroyCookie(ctx, COOKIE_REFRESH_TOKEN);

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }
  };
}
