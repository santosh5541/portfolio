import React, { ReactNode, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import '@/css/global.css';
import '@/css/prism.css';
import '@/css/tailwind.css';
import 'katex/dist/katex.css';
import '@fontsource/fira-code';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';

import { ThemeProvider, useTheme } from 'next-themes';
import { GeistProvider } from '@geist-ui/core';

import Analytics from '@/components/analytics';
import { ClientReload } from '@/components/ClientReload';
import LayoutWrapper from '@/components/LayoutWrapper';
import siteMetadata from '@/data/siteMetadata';

const isDevelopment = process.env.NODE_ENV === 'development';
const isSocket = process.env.SOCKET;

export default function App({ Component, pageProps }: AppProps) {
  // optional: hook for your live‑reload in dev
  useEffect(() => {
    if (isDevelopment && isSocket && (window as any).__NEXT_RELOAD_ENABLED__) {
      // ClientReload handles itself
    }
  }, []);

  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />

      <GeistProviderWithTheme>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </GeistProviderWithTheme>
    </ThemeProvider>
  );
}

function GeistProviderWithTheme({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const { resolvedTheme } = useTheme();
  return <GeistProvider themeType={resolvedTheme}>{children}</GeistProvider>;
}
