import Link from '@/components/Link';
import Image from 'next/image';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { memo } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';

interface BannerProps {
  frontMatter: AuthorFrontMatter & { avatar: string };
}

const Banner = ({ frontMatter }: BannerProps): React.ReactElement => {
  const [aboutColor, contactColor] = useRandomColorPair();
  const { shortname, occupation, avatar } = frontMatter;

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800'>
      <div className='max-w-xl space-y-6 rounded-xl bg-white p-8 text-center dark:bg-gray-800 md:p-12'>
        {/* Avatar */}
        <div className='mx-auto h-40 w-40 overflow-hidden rounded-full ring-4 ring-indigo-300 dark:ring-indigo-600'>
          <Image
            src={avatar}
            alt={`${shortname} Avatar`}
            width={160}
            height={160}
            className='object-cover'
          />
        </div>

        {/* Heading & Bio */}
        <h1 className='text-4xl font-extrabold text-gray-900 dark:text-gray-100'>
          Hi, I’m {shortname}
        </h1>
        <p className='text-xl font-semibold text-indigo-600 dark:text-indigo-400'>
          {occupation}
        </p>
        <p className='text-base leading-relaxed text-gray-700 dark:text-gray-300'>
          Welcome to my corner of the web! I share projects, blog posts,
          tutorials, and AI experiments. Dive in to explore my journey and see
          how we can build something great together.
        </p>

        {/* Links with Hover Effects */}
        <div className='flex justify-center gap-6'>
          <Link
            href='/about'
            className='transform rounded-lg border-2 border-indigo-600 px-5 py-2 text-indigo-600 transition hover:scale-105 hover:bg-indigo-600 hover:text-white dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-500 dark:hover:text-white'
          >
            <RoughNotation show type='box' color={aboutColor} padding={2}>
              About Me
            </RoughNotation>
          </Link>
          <Link
            href='/contact'
            className='transform rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:scale-105 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400'
          >
            <RoughNotation show type='box' color={contactColor} padding={2}>
              Contact Me
            </RoughNotation>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Banner);
