// src/pages/contact.tsx
import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { contact } from 'config/contact';
import { openPopupWidget } from 'react-calendly';
import { RoughNotation } from 'react-rough-notation';

const Contact = (): JSX.Element => {
  const [randomColor] = useRandomColorPair();

  const onScheduleMeeting = (): void => {
    if (!contact.calendly) {
      console.error('Calendly link not provided');
      return;
    }
    openPopupWidget({ url: contact.calendly });
  };

  return (
    <>
      <PageSEO
        title={`Contact - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />

      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title='Contact' />

        <div className='container space-y-4 py-12'>
          <p>
            Got a project, want to collaborate, or just wanna chat? Feel free to{' '}
            <span
              role='button'
              tabIndex={0}
              onClick={onScheduleMeeting}
              className='ml-2 cursor-pointer !font-normal !text-black no-underline dark:!text-white'
            >
              <RoughNotation
                show
                type='underline'
                strokeWidth={2}
                animationDelay={250}
                animationDuration={2000}
                color={randomColor}
              >
                schedule a meeting
              </RoughNotation>
            </span>
          </p>

          <p>
            Or drop me a message via the chat widget in the bottom‑right corner!
          </p>
        </div>
      </div>
    </>
  );
};
export default Contact;
