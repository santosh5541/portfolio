import Link from 'next/link';
import headerNavLinks from '../data/headerNavLinks';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
      }}
    >
      {/* Logo */}
      <div>
        <Link href='/'>
          <a
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'black',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            Santosh Luitel
          </a>
        </Link>
      </div>

      {/* Navigation Links - CORRECTED */}
      <nav>
        {headerNavLinks.map(link => (
          <Link key={link.title} href={link.href} passHref>
            {/* The style prop is now on the <a> tag */}
            <a
              style={{
                marginLeft: '1rem',
                textDecoration: 'none',
                color: 'gray',
              }}
            >
              {link.title}
            </a>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
