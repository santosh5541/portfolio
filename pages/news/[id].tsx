import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import { fetchNewsById, NewsItem } from '@/lib/fetchNews';
import Link from 'next/link';

type Props = {
  post?: NewsItem;
  contentHtml?: string;
  error?: string;
};

export default function NewsPost({ post, contentHtml, error }: Props) {
  if (error) {
    return (
      <main className='prose mx-auto max-w-4xl py-12 px-4 text-red-600 dark:prose-invert'>
        <h1>Oops!</h1>
        <p>{error}</p>
        <Link href='/news'>
          <a className='text-blue-600 underline'>Back to news list</a>
        </Link>
      </main>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <main className='mx-auto max-w-4xl py-12 px-4'>
      <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-white'>
        {post.title}
      </h1>
      <p className='mb-8 text-sm text-gray-600 dark:text-gray-400'>
        {new Date(post.published_at).toLocaleString()} — {post.source}
      </p>

      {post.image && (
        <div className='relative mb-8 h-80 w-full overflow-hidden rounded-lg shadow-lg'>
          <Image
            src={post.image}
            alt={post.title}
            layout='fill'
            objectFit='cover'
            unoptimized
          />
        </div>
      )}

      <div className='prose prose-lg mb-12 dark:prose-invert'>
        <p>{post.description}</p>
      </div>

      {contentHtml ? (
        <article
          className='prose prose-lg mb-12 dark:prose-invert'
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      ) : (
        <p className='text-gray-700 dark:text-gray-300'>
          Couldn’t parse the full article.{' '}
          <a
            href={post.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 underline'
          >
            Read on the source site »
          </a>
        </p>
      )}

      <p className='mt-12 text-sm'>
        <Link href='/news'>
          <a className='text-gray-800 underline dark:text-gray-200'>
            ← Back to news
          </a>
        </Link>
      </p>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  if (!id || typeof id !== 'string') {
    return { props: { error: 'Invalid article ID.' } };
  }

  try {
    const post = await fetchNewsById(id);
    const res = await fetch(post.url);
    if (!res.ok) {
      throw new Error('Fetch article failed');
    }
    const html = await res.text();
    const dom = new JSDOM(html, { url: post.url });
    const article = new Readability(dom.window.document).parse();

    return {
      props: {
        post,
        contentHtml: article?.content ?? null,
      },
    };
  } catch (err) {
    console.error(err);
    return { props: { error: 'Sorry, could not load the full article.' } };
  }
};
