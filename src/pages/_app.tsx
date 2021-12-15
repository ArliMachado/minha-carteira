import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from 'styles/GlobalStyles';
import dark from 'styles/themes/dark';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>React Avançado - Boilerplate</title>
        <link rel="shotcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="manifest.json" />

        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        ></link>
        <meta name="theme-color" content="#06092B" />
        <meta
          name="description"
          content="A simple project starter to work with Typescript, React,
            NextJS and styled components"
        />
      </Head>
      <ThemeProvider theme={dark}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
