// next.config.js
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
    domains: ['firebasestorage.googleapis.com'],
  },

  async headers() {
    const ContentSecurityPolicy = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval'
        https://giscus.app
        www.googletagmanager.com
        www.google-analytics.com
        https://client.crisp.chat;
      script-src-elem 'self' 'unsafe-inline'
        https://giscus.app
        www.googletagmanager.com
        www.google-analytics.com
        https://client.crisp.chat;
      style-src 'self' 'unsafe-inline'
        https://client.crisp.chat
        https://giscus.app;
      style-src-elem 'self' 'unsafe-inline'
        https://client.crisp.chat
        https://giscus.app;
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
          { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
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

  webpack: (config, { dev, isServer }) => {
    // File-loader for images/video
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

    // SVGR for inline SVGs
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Swap React → Preact in client production builds
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        react: 'preact/compat',
        'react-dom': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react/jsx-runtime': 'preact/jsx-runtime',
        'react/jsx-dev-runtime': 'preact/jsx-dev-runtime',
        'preact/compat/jsx-runtime.js': 'preact/jsx-runtime',
        'preact/compat/jsx-dev-runtime.js': 'preact/jsx-dev-runtime',
      };
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
