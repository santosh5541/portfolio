export enum ContactType {
  github = 'github',
  linkedin = 'linkedin',
  // twitter = 'twitter',
  // youtube = 'youtube',
  email = 'email',
  // buymeacoffee = 'buymeacoffee',
  // googlescholar = 'googlescholar',
}

export interface Contact {
  // twitter: string;
  site: string;
  calendly?: string;
  links: Record<ContactType, string>;
}

export const contact: Contact = {
  site: 'https://luitelsantosh.com.np',
  calendly: 'https://calendly.com/santoshluitel19',
  links: {
    github: 'https://github.com/santosh5541',
    linkedin: 'https://www.linkedin.com/in/santosh-luitel-b31b62201/',
    // googlescholar:'https://scholar.google.com/citations?user=8wIfeAsAAAAJ&hl=en',
    // twitter: 'https://twitter.com/karan_6864',
    // youtube: 'https://www.youtube.com/c/KaranPratapSingh',
    email: 'santoshluitel19@outlook.com',
    // buymeacoffee: 'https://www.buymeacoffee.com/karanps',
  },
};
