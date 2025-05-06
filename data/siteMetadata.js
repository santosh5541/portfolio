// data/siteMetadata.js

const siteMetadata = {
  title: 'Santosh Luitel',
  author: 'Santosh Luitel',
  headerTitle: 'Santosh Luitel',
  description:
    'A software engineer who aims to evolve, innovate, and inspire through technology.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://santoshluitel.com',
  siteRepo: 'https://github.com/santosh5541/portfolio',
  siteLogo: '/static/images/logo.png',
  image: '/static/avatar.jpg',
  socialBanner: '/static/banner.png',
  email: 'santoshlutiel19@outlook.com',
  github: 'https://github.com/santosh5541',
  linkedin: 'https://www.linkedin.com/in/santosh-luitel-b31b62201/',
  locale: 'en-US',
  analytics: {
    plausibleDataDomain: '',
    simpleAnalytics: false,
    umamiWebsiteId: '',
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },
  newsletter: {
    provider: 'buttondown',
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
    },
    utterancesConfig: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
      issueTerm: '',
      label: '',
      theme: '',
      darkTheme: '',
    },
    disqusConfig: {
      shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
    },
  },
};

module.exports = siteMetadata;
