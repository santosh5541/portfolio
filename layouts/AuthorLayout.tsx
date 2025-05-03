import { Header } from '@/components/Form';
import StackList from '@/components/list/StackList';
import { PageSEO } from '@/components/SEO';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { WorkStack } from 'config/stack';
import Image from 'next/image';
import { ReactNode } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';

interface Props {
  children: ReactNode;
  frontMatter: AuthorFrontMatter;
}

export default function AuthorLayout({ children, frontMatter }: Props) {
  const { name, avatar, occupation, resume } = frontMatter;
  const [resumeColor] = useRandomColorPair();

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title='About' />
        <div className='items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'>
          {/* Avatar & Basic Info */}
          <div className='flex flex-col items-center space-y-2 pt-8'>
            <Image
              src={avatar}
              alt='avatar'
              width={192}
              height={192}
              quality={100}
              priority
              className='rounded-full object-cover'
            />
            <h3 className='pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight'>
              {name}
            </h3>
            <div className='font-medium text-gray-500 dark:text-gray-400'>
              {occupation}
            </div>
          </div>

          {/* Content & Resume & Skills */}
          <div className='prose max-w-none pt-8 pb-8 font-bold dark:prose-dark xl:col-span-2'>
            {children}

            {/* Resume link */}
            <p className='mt-8'>
              <RoughNotation
                show
                type='box'
                animationDelay={250}
                animationDuration={2000}
                strokeWidth={2}
                color={resumeColor}
              >
                <a
                  href={resume}
                  target='_blank'
                  rel='noreferrer'
                  className='
                    inline-block
                    !font-normal
                    !text-black !no-underline
                    transition-transform
                    transition-colors duration-200 hover:scale-125
                    hover:!text-indigo-600
                    dark:!text-white dark:hover:!text-indigo-300
                  '
                >
                  Resume
                </a>
              </RoughNotation>
            </p>

            {/* Skills */}
            <h2 className='mt-8 mb-4 text-2xl font-semibold dark:text-white'>
              Skills
            </h2>
            <StackList stack={WorkStack} />
          </div>
        </div>
      </div>
    </>
  );
}
