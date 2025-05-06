// pages/news/[id].tsx
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
      <main className='mx-auto max-w-4xl py-12 px-4 text-red-400'>
        <h1 className='text-3xl font-bold text-red-300'>Oops!</h1>
        <p className='text-red-200'>{error}</p>
        <Link href='/news'>
          <a className='mt-4 inline-block text-blue-400 underline'>
            Back to news list
          </a>
        </Link>
      </main>
    );
  }

  if (!post) return null;

  return (
    <main className='mx-auto max-w-4xl py-12 px-4'>
      {/* Title */}
      <h1 className='mb-4 text-4xl font-bold text-white'>{post.title}</h1>

      {/* Meta */}
      <p className='mb-8 text-sm text-gray-400'>
        {new Date(post.published_at).toLocaleString()} — {post.source}
      </p>

      {/* Hero Image */}
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

      {/* Summary */}
      <div className='mb-12'>
        <p className='text-lg leading-relaxed text-gray-200'>
          {post.description}
        </p>
      </div>

      {/* Full article */}
      {contentHtml ? (
        <article
          className='prose prose-lg max-w-none text-gray-200 dark:text-gray-200'
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      ) : (
        <p className='text-gray-200'>
          Couldn’t parse the full article.{' '}
          <a
            href={post.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-400 underline'
          >
            Read on the source site »
          </a>
        </p>
      )}

      {/* Back link */}
      <p className='mt-12'>
        <Link href='/news'>
          <a className='text-blue-400 underline'>← Back to news</a>
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
    if (!res.ok) throw new Error('Fetch article failed');
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
