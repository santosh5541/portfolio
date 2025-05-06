const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts', 'config'],
  },

  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'images.unsplash.com',
      'miro.medium.com',
      'jalammar.github.io',
      'raw.githubusercontent.com',
    ],
  },

  async headers() {
    const csp = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval'
        https://giscus.app
        https://www.googletagmanager.com
        https://www.google-analytics.com
        https://client.crisp.chat;
      style-src 'self' 'unsafe-inline' https://client.crisp.chat https://giscus.app;
      img-src * blob: data:;
      media-src 'none';
      connect-src *;
      font-src 'self';
      frame-src
        https://giscus.app
        https://www.youtube.com
        https://calendly.com
        https://drawsql.app;
    `
      .replace(/\s{2,}/g, ' ')
      .trim();

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  webpack: (config, { dev: _dev, isServer: _isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
