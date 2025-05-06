import slugify from 'slugify';

export type NewsItem = {
  id: string;
  author: string;
  title: string;
  description: string;
  url: string;
  source: string;
  image: string | null;
  category: string[];
  published_at: string;
};

const BASE = process.env.MEDIASTACK_API_URL ?? '';
const KEY = process.env.MEDIASTACK_API_KEY ?? '';

export default async function fetchLatestNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(
      `${BASE}?access_key=${KEY}` +
        `&categories=technology&languages=en&limit=20`,
    );

    if (res.status === 429) {
      console.warn('Mediastack rate limit reached.');
      return [];
    }
    if (!res.ok) {
      throw new Error(`Mediastack error: ${res.status}`);
    }

    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];
    return data.map(item => ({
      id: slugify(item.title ?? '', { lower: true, strict: true }),
      author: item.author ?? '',
      title: item.title ?? '',
      description: item.description ?? '',
      url: item.url ?? '',
      source: item.source ?? '',
      image: item.image ?? null,
      category: item.category ?? [],
      published_at: item.published_at ?? '',
    }));
  } catch (err) {
    console.error('Fetch news failed:', err);
    return [];
  }
}

export async function fetchNewsById(id: string): Promise<NewsItem> {
  const all = await fetchLatestNews();
  const found = all.find(item => item.id === id);
  if (!found) {
    throw new Error('Not found');
  }
  return found;
}
