import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Tag, App as AntdApp, Image } from 'antd';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Edit,
  Eye,
  User,
} from 'lucide-react';
import Link from 'next/link';
import styles from './index.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { getArticleById, updateArticlePublishStatus } from '@/pages/api/article';
import dayjs from 'dayjs';
import { sanitizeMarkdown } from '@/lib/markdown';
import CommentSection from '@/components/comments/CommentSection';

export function formatTime(isoTime: string): string {
  return dayjs(isoTime).format('YYYY-MM-DD HH:MM');
}

export default function ArticleDetailPage() {
  const { message } = AntdApp.useApp();
  const router = useRouter();
  const { id } = router.query; // 路由参数应该叫 id，不是 ids
  const rId = Array.isArray(id) ? id[0] : id;

  const [article, setArticle] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  // 使用统一的认证上下文，避免重复调用 useSession
  const { session, status } = useAuth();

  const permissions = session?.user?.permissions || [];

  // parseMarkdown将返回的markdown转为html展示
  const [articleContent, setArticleContent] = useState<string>('');

  useEffect(() => {
    if (article?.content) {
      sanitizeMarkdown(article.content).then((htmlContent) => {
        setArticleContent(htmlContent);
      });
    }
  }, [article?.content]);

  const handleUpdatePublishStatus = async () => {
    try {
      const result = await updateArticlePublishStatus(article.ID, 2);
      if (result.success) {
        router.reload();
        message.success(result.message);
      } else {
        message.error(result.message || '审核出错');
      }
    } catch {
      message.error('审核出错，请重试');
    }
  };

  useEffect(() => {
    if (!router.isReady || !rId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getArticleById(rId);
        setArticle(response?.data);
      } catch {
        message.error('加载失败');
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, id, message, rId]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>加载中...</p>
      </div>
    );
  }

  const isUnderReview = article?.publish_status === 1;
  const isPublisher = article?.publisher_id?.toString() === session?.user?.uid;
  const canReview = permissions.includes('article:review');

  if (!article || (isUnderReview && !isPublisher && !canReview)) {
    return (
      <div className={styles.error}>
        <h2>公告不存在</h2>
        <p>抱歉，找不到您要查看的公告</p>
        <Link href="announcement" className={styles.backButton}>
          返回公告列表
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.container} nav-t-top`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/announcement" className={styles.backLink}>
            <ArrowLeft className={styles.backIcon} />
            返回公告列表
          </Link>
          <div className={styles.headerActions}>
            {status === 'authenticated' &&
              article.publisher_id.toString() === session?.user?.uid ? (
              <Button
                icon={<Edit size={16} className={styles.actionIcon} />}
                className={styles.actionButton}
                onClick={() => router.push(`/announcement/${article.ID}/edit`)}
              >
                编辑
              </Button>
            ) : null}
            {article.publish_status === 1 &&
              status === 'authenticated' &&
              permissions.includes('article:review') ? (
              <Button
                icon={<CheckCircle size={16} className={styles.actionIcon} />}
                className={styles.actionButton}
                onClick={() => handleUpdatePublishStatus()}
              >
                审核通过
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {article.publish_status === 1 && (
                <div
                  className={styles.statusBadge}
                  style={{ backgroundColor: '#af78e7' }}
                >
                  待审核
                </div>
              )}
            </div>
            <h1 className={styles.title}>{article.title}</h1>
            <h3 className={styles.description}>{article.description}</h3>
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar className={styles.metaIcon} />
                <div className={styles.metaText}>
                  发布时间：{formatTime(article.publish_time || article.CreatedAt)}
                </div>
              </div>
               <div className={styles.metaItem}>
                <User className={styles.metaIcon} />
                <div className={styles.metaText}>
                  原文连接：{article.source_link || ''}
                </div>
              </div>
               <div className={styles.metaItem}>
                <User className={styles.metaIcon} />
                <div className={styles.metaText}>
                  版权声明： {article.license || ''}
                </div>
              </div>
              <div className={styles.metaItem}>
                <User className={styles.metaIcon} />
                <div className={styles.metaText}>
                  作者：{article.author || article.publisher?.username || ''}
                </div>
              </div>
              <div className={styles.metaItem}>
                <User className={styles.metaIcon} />
                <div className={styles.metaText}>
                  发布者：{article.publisher?.username || ''}
                </div>
              </div>
              <div className={styles.metaItem}>
                <Eye className={styles.metaIcon} />
                <div className={styles.metaText}>
                  浏览量：{article.view_count || '0'}
                </div>
              </div>
              <div className={styles.tags}>
                {article.tags.map((tag: string, index: number) => (
                  <Tag key={index} className={styles.tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.coverContainer}>
              <Image
                src={article.cover_img || '/placeholder.svg'}
                alt={article.title}
                width={400}
                height={300}
                className={styles.coverImage}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className="marked-paper">
          {/* <h2 className={styles.sectionTitle}>{article.title}</h2> */}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />
        </div>
        
        {/* 评论区域 */}
        <CommentSection 
          repo="dajiangjunok/kaiyuanshe"
          repoId="R_kgDOPveyWQ"
          category="General"
          categoryId="DIC_kwDOPveyWc4CwQj4"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="preferred_color_scheme"
          lang="zh-CN"
        />
      </div>
    </div>
  );
}
