// components/comments/index.tsx

import React from 'react';
import dynamic from 'next/dynamic';
import siteMetadata from '@/data/siteMetadata';
import { PostFrontMatter } from 'types/PostFrontMatter';

interface Props {
  frontMatter: PostFrontMatter;
}

const UtterancesComponent = dynamic(
  () => import('@/components/comments/Utterances'),
  { ssr: false },
);
const GiscusComponent = dynamic(() => import('@/components/comments/Giscus'), {
  ssr: false,
});
const DisqusComponent = dynamic(() => import('@/components/comments/Disqus'), {
  ssr: false,
});

const Comments = ({ frontMatter }: Props) => {
  // compute term only for those providers that need it
  let issueTerm: string | undefined;
  if (siteMetadata.comment.provider === 'utterances') {
    switch (siteMetadata.comment.utterancesConfig.issueTerm) {
      case 'pathname':
        issueTerm = frontMatter.slug;
        break;
      case 'url':
        issueTerm = typeof window !== 'undefined' ? window.location.href : '';
        break;
      case 'title':
        issueTerm = frontMatter.title;
        break;
    }
  }

  return (
    <div id='comment'>
      {siteMetadata.comment.provider === 'giscus' && <GiscusComponent />}
      {siteMetadata.comment.provider === 'utterances' && issueTerm && (
        <UtterancesComponent issueTerm={issueTerm} />
      )}
      {siteMetadata.comment.provider === 'disqus' && (
        <DisqusComponent frontMatter={frontMatter} />
      )}
    </div>
  );
};

export default Comments;
