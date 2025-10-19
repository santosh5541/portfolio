import headerNavLinks from '@/data/headerNavLinks';
import { ReactNode } from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Link from './Link';
import MobileNav from './MobileNav';
import SectionContainer from './SectionContainer';
import ThemeSwitch from './ThemeSwitch';

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Allura&display=swap'
          rel='stylesheet'
        />
      </Head>
      <SectionContainer>
        <div className='flex h-screen flex-col justify-between'>
          <header className='flex items-center justify-between py-8'>
            <div>
              <Link href='/' aria-label="Santosh Luitel's Blog">
                {/* --- CHANGES START HERE --- */}
                {/* 1. Removed h-6 and text-2xl from this div */}
                <div className='font-semibold'>
                  {/* 2. Made the font size responsive */}
                  <span className='font-cursive text-4xl tracking-wide text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 sm:text-5xl'>
                    Santosh Luitel
                  </span>
                </div>
                {/* --- CHANGES END HERE --- */}
              </Link>
            </div>

            <div className='flex items-center text-base leading-5'>
              <div className='hidden sm:block'>
                {headerNavLinks.map(link => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className='p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4'
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <ThemeSwitch />
              <MobileNav />
            </div>
          </header>
          <main className='mb-auto'>{children}</main>
          <Footer />
        </div>
      </SectionContainer>
    </>
  );
};

export default LayoutWrapper;
