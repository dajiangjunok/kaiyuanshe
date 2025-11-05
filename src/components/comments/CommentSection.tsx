'use client';

import React, { useState } from 'react';
import Giscus from '@giscus/react';
import { Loader2 } from 'lucide-react';
import styles from './CommentSection.module.css';

interface CommentSectionProps {
  repo: `${string}/${string}`;
  repoId: string;
  category?: string;
  categoryId?: string;
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'number' | 'specific';
  term?: string;
  reactionsEnabled?: '0' | '1';
  emitMetadata?: '0' | '1';
  inputPosition?: 'top' | 'bottom';
  theme?: 'light' | 'dark' | 'preferred_color_scheme' | 'transparent_dark' | 'cobalt' | 'noborder_light' | 'noborder_dark';
  lang?: string;
  loading?: 'lazy' | 'eager';
}

const CommentSection: React.FC<CommentSectionProps> = ({
  repo = 'kaiyuanshe/website',
  repoId = 'R_kgDOQHmDoA',
  category = 'General',
  categoryId = 'DIC_kwDOQHmDoM4CxYEV',
  mapping = 'pathname',
  term,
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'bottom',
  theme = 'preferred_color_scheme',
  lang = 'zh-CN',
  loading = 'lazy'
}) => {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return;
      if (event.data.giscus?.discussion) {
        setIsLoading(false);
        clearTimeout(timer);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className={styles.commentSection}>
      {isLoading && (
        <div className={styles.loading}>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>正在加载评论...</span>
        </div>
      )}
      <div style={{ display: isLoading ? 'none' : 'block' }}>
        <Giscus
          repo={repo}
          repoId={repoId}
          category={category}
          categoryId={categoryId}
          mapping={mapping}
          term={term}
          reactionsEnabled={reactionsEnabled}
          emitMetadata={emitMetadata}
          inputPosition={inputPosition}
          theme={theme}
          lang={lang}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CommentSection;