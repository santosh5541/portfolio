// lib/fetchNews.ts
// AI news ONLY, from two public sources that need no API key:
//  - DEV.to public API, filtered to the "ai" tag
//  - Hacker News Algolia API, searched for "artificial intelligence"
// This replaces the old Mediastack integration, which required
// MEDIASTACK_API_URL / MEDIASTACK_API_KEY env vars that were never set
// (not even listed in .env.example), so every fetch failed and the
// News page always rendered its empty state.
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

const DEVTO_URL = 'https://dev.to/api/articles?tag=ai&per_page=12';
const HN_URL =
  'https://hn.algolia.com/api/v1/search_by_date?query=artificial%20intelligence&tags=story&hitsPerPage=12';

// In-memory cache
let cache: { data: NewsItem[]; ts: number } | null = null;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function fetchDevTo(): Promise<NewsItem[]> {
  const res = await fetch(DEVTO_URL, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) return [];
  const json = await res.json();
  const articles = Array.isArray(json) ? json : [];
  return articles
    .map(article => ({
      id: slugify(article.title ?? '', { lower: true, strict: true }),
      author: article.user?.name ?? '',
      title: article.title ?? '',
      description: article.description ?? '',
      url: article.url ?? '',
      source: 'DEV Community',
      image: article.cover_image ?? article.social_image ?? null,
      category: ['artificial intelligence'],
      published_at: article.published_at ?? article.created_at ?? '',
    }))
    .filter(item => item.title && item.url);
}

async function fetchHackerNews(): Promise<NewsItem[]> {
  const res = await fetch(HN_URL);
  if (!res.ok) return [];
  const json = await res.json();
  const hits = Array.isArray(json.hits) ? json.hits : [];
  return hits
    .map(hit => {
      const url =
        hit.url ?? `https://news.ycombinator.com/item?id=${hit.objectID}`;
      let source = 'Hacker News';
      try {
        source = new URL(url).hostname.replace(/^www\./, '');
      } catch {
        // keep the default source
      }
      return {
        id: slugify(hit.title ?? '', { lower: true, strict: true }),
        author: hit.author ?? '',
        title: hit.title ?? '',
        description: hit.story_text
          ? stripHtml(hit.story_text).slice(0, 240)
          : '',
        url,
        source,
        image: null,
        category: ['artificial intelligence'],
        published_at: hit.created_at ?? '',
      };
    })
    .filter(item => item.title && item.url);
}

async function realFetchLatestNews(): Promise<NewsItem[]> {
  const [devto, hn] = await Promise.all([
    fetchDevTo().catch(() => [] as NewsItem[]),
    fetchHackerNews().catch(() => [] as NewsItem[]),
  ]);
  const seen = new Set<string>();
  const merged = [...devto, ...hn].filter(item => {
    if (!item.id || seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
  merged.sort(
    (a, b) => +new Date(b.published_at) - +new Date(a.published_at),
  );
  return merged.slice(0, 20);
}

export default async function fetchLatestNews(): Promise<NewsItem[]> {
  const now = Date.now();
  // if cached and under 5 minutes old, return cache
  if (cache && now - cache.ts < 5 * 60 * 1000) {
    return cache.data;
  }
  // otherwise fetch fresh, update cache — never throw, so the
  // News page (and the build) still renders when a source is down
  let data: NewsItem[] = [];
  try {
    data = await realFetchLatestNews();
  } catch {
    data = [];
  }
  cache = { data, ts: now };
  return data;
}

export async function fetchNewsById(id: string): Promise<NewsItem> {
  const all = await fetchLatestNews();
  const found = all.find(item => item.id === id);
  if (!found) throw new Error('Not found');
  return found;
}
