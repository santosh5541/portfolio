// Define the type for a single navigation link
interface NavLink {
  href: string;
  title: string;
}

// Apply the type to your array
const headerNavLinks: NavLink[] = [
  { href: '/', title: 'Home' },
  { href: '/about', title: 'About' },
  { href: '/blog', title: 'Blog' },
  { href: '/projects', title: 'Projects' },
  { href: '/news', title: 'News' },
  { href: '/contact', title: 'Contact' },
];

export default headerNavLinks;
