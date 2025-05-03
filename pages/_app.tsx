import React, { ReactNode } from 'react';
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
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import Analytics from '@/components/analytics';
import { ClientReload } from '@/components/ClientReload';
import LayoutWrapper from '@/components/LayoutWrapper';
import siteMetadata from '@/data/siteMetadata';

import { GeistProvider } from '@geist-ui/core';

const isDevelopment = process.env.NODE_ENV === 'development';
const isSocket = process.env.SOCKET;

// 1️⃣ Extend Window so TS knows about Crisp globals
declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      {/* 2️⃣ Initialize Crisp before loading the script */}
      <Script id='crisp-init' strategy='afterInteractive'>
        {`
          window.$crisp = window.$crisp || [];
          window.CRISP_WEBSITE_ID = "bcd14b7b-cde8-4406-b273-1e10b627221d";
        `}
      </Script>

      {/* 3️⃣ Load Crisp client code */}
      <Script
        src='https://client.crisp.chat/l.js'
        strategy='afterInteractive'
      />

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

// Explicitly type the props to avoid `any`
function GeistProviderWithTheme({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const { resolvedTheme } = useTheme();
  return <GeistProvider themeType={resolvedTheme}>{children}</GeistProvider>;
}
