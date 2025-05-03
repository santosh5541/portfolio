import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { FaGithub } from 'react-icons/fa';
import Conditional from '@/components/Conditional';
import { H1, H2 } from '@/components/Form';
import StackList from '@/components/list/StackList';
import { PageSEO } from '@/components/SEO';
import config from 'config';
import type { Project } from 'config/projects';

const { projects } = config;

export async function getStaticPaths() {
  return {
    paths: projects.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<{ project: Project }> = async ({
  params,
}) => {
  const project = projects.find(p => p.slug === params?.slug);
  if (!project) {
    return { notFound: true };
  }
  return {
    props: { project },
  };
};

export default function ProjectPage({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, description, shortDescription, banner, stack, repository } =
    project;

  return (
    <>
      <PageSEO
        title={title}
        description={shortDescription || description}
        imageUrl={banner}
      />

      <H1 className='lg:text-5x mb-4 text-3xl font-bold dark:text-white'>
        {title}
      </H1>

      <p className='mb-6 font-light'>{description}</p>

      <H2>Stack</H2>
      <StackList stack={stack} />

      <Conditional condition={!!repository}>
        <a
          href={repository}
          target='_blank'
          rel='noopener noreferrer'
          className='
            mt-4
            inline-flex cursor-pointer
            items-center text-gray-800
            transition-colors duration-200
            hover:text-indigo-600 dark:text-gray-200
            dark:hover:text-indigo-400
          '
        >
          <FaGithub className='mr-2' size={20} />
          View Source on GitHub
        </a>
      </Conditional>

      {shortDescription && (
        <p className='mt-6 italic text-gray-600'>{shortDescription}</p>
      )}
    </>
  );
}
