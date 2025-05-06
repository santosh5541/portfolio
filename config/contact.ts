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
    email: 'mailto:santoshluitel19@outlook.com',
  },
};
