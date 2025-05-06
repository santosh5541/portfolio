import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import fetchLatestNews, { NewsItem } from '@/lib/fetchNews';

type Props = { news: NewsItem[] };
const PAGE_SIZE = 6;

export default function NewsPage({ news }: Props) {
  const [page, setPage] = useState(1);

  if (news.length === 0) {
    return (
      <main className='prose mx-auto max-w-3xl py-12 dark:prose-invert'>
        <h1>Technology News</h1>
        <p>
          Sorry, we’re unable to load news right now. Please try again in a few
          minutes.
        </p>
      </main>
    );
  }

  const totalPages = Math.ceil(news.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const current = news.slice(start, start + PAGE_SIZE);

  return (
    <main className='mx-auto max-w-6xl py-12 px-4'>
      <h1 className='mb-8 text-3xl font-bold text-gray-900 dark:text-gray-100'>
        Technology News
      </h1>

      <ul className='grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3'>
        {current.map(item => (
          <li
            key={item.id}
            className='fade-in overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800'
          >
            <Link href={`/news/${item.id}`}>
              <a className='block h-full'>
                {item.image && (
                  <div className='relative h-44 w-full'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout='fill'
                      objectFit='cover'
                      unoptimized
                    />
                  </div>
                )}
                <div className='p-4'>
                  <h2 className='mb-2 text-lg font-semibold text-blue-600 line-clamp-2 dark:text-blue-400'>
                    {item.title}
                  </h2>
                  <time className='mb-3 block text-xs text-gray-500 dark:text-gray-400'>
                    {new Date(item.published_at).toLocaleDateString()}
                  </time>
                  <p className='text-sm text-gray-700 line-clamp-3 dark:text-gray-300'>
                    {item.description}
                  </p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <div className='mt-12 flex items-center justify-center space-x-4'>
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className='rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        >
          Previous
        </button>
        <span className='text-sm text-gray-600 dark:text-gray-300'>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className='rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        >
          Next
        </button>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const news = await fetchLatestNews();
  return {
    props: { news },
    revalidate: 300,
  };
};
