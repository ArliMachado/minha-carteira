import type { AppProps } from 'next/app';
import Head from 'next/head';

import { CustomThemeProvider } from 'hooks/theme';

import GlobalStyles from 'styles/GlobalStyles';
import { AuthProvider } from 'hooks/auth';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>React Avançado - Boilerplate</title>

        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        ></link>
        <meta
          name="description"
          content="A simple project starter to work with Typescript, React,
            NextJS and styled components"
        />
      </Head>
      <CustomThemeProvider>
        <GlobalStyles />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </CustomThemeProvider>
    </>
  );
}

export default App;
