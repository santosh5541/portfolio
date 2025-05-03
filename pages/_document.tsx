// src/pages/_document.tsx
import React from 'react';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { CssBaseline } from '@geist-ui/core';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = CssBaseline.flush();

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang='en' className='scroll-smooth'>
        <Head>
          {/* ───────── Favicons & Metadata ───────────────────────────────────── */}
          <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='/static/favicons/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/static/favicons/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/static/favicons/favicon-16x16.png'
          />
          <link rel='manifest' href='/static/favicons/site.webmanifest' />
          <meta name='msapplication-TileColor' content='#000000' />
          <meta name='theme-color' content='#000000' />
          <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
          {/* ────────── CRISP CHAT SNIPPET ────────────────────────────────────── */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.$crisp = [];
                window.CRISP_WEBSITE_ID = "bcd14b7b-cde8-4406-b273-1e10b627221d";
                (function(){
                  var d = document;
                  var s = d.createElement("script");
                  s.src = "https://client.crisp.chat/l.js";
                  s.async = 1;
                  d.getElementsByTagName("head")[0].appendChild(s);
                })();
              `,
            }}
          />
        </Head>
        <body className='bg-white text-black antialiased dark:bg-gray-900 dark:text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
