// components/Giscus.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import siteMetadata from '@/data/siteMetadata';

export default function Giscus() {
  const [loaded, setLoaded] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const config = siteMetadata.comment.giscusConfig;
  const commentsTheme =
    config.themeURL ||
    (theme === 'dark' || resolvedTheme === 'dark'
      ? config.darkTheme
      : config.theme);

  const loadComments = useCallback(() => {
    setLoaded(true);
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    // Core attrs
    script.setAttribute('data-repo', config.repo!);
    script.setAttribute('data-repo-id', config.repositoryId!);
    script.setAttribute('data-category', config.category!);
    script.setAttribute('data-category-id', config.categoryId!);

    // Use pathname mapping to avoid title issues
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-input-position', 'bottom');

    // Extras
    script.setAttribute('data-reactions-enabled', config.reactions!);
    script.setAttribute('data-emit-metadata', config.metadata!);
    script.setAttribute('data-theme', commentsTheme);

    const container = document.getElementById('comments-container');
    container?.appendChild(script);

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [commentsTheme]);

  // Reload on theme switch
  useEffect(() => {
    if (loaded) loadComments();
  }, [loadComments, loaded]);

  return (
    <div className='pt-6 pb-6 text-center text-gray-700 dark:text-gray-300'>
      {!loaded && (
        <button onClick={loadComments} className='underline'>
          Load Comments
        </button>
      )}
      <div id='comments-container' className='giscus' />
    </div>
  );
}
