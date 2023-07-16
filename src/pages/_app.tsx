import '#/styles/globals.css'
import React, { ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import LoadingProvider from '#/context/useLoading';
import { AuthProvider } from '#/context/useAuth';
import SnackbarProvider from '#/context/useSnackbar';

type NextPageWithLayout = NextPage & {
  layout?: React.FC;
};

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const Layout = (Component as NextPageWithLayout).layout || AppLayout;
  return (
    <SnackbarProvider>
      <AuthProvider>
        <LoadingProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LoadingProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
};

export default App;
