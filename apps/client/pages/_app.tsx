import { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Head from 'next/head';
import './styles.css';
import type { ReactElement, ReactNode } from 'react';
import { NhostClient, NhostNextProvider } from '@nhost/nextjs';
import { NhostApolloProvider } from '@nhost/react-apollo';

const nhost = new NhostClient({ backendUrl: 'http://localhost:1337' });

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <>
          <Head>
            <title>Welcome to client!</title>
          </Head>
          {getLayout(<Component {...pageProps} />)}
        </>
      </NhostApolloProvider>
    </NhostNextProvider>
  );
}

export default CustomApp;
