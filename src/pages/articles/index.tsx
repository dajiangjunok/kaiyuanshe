/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { useState, useEffect, useCallback } from 'react';
import {
  Pagination,
  Input,
  Tag,
  Card,
  Image,
  Button,
  App as AntdApp,
} from 'antd';
import dayjs from 'dayjs';
import {
  Calendar,
  User,
  Eye,
  Plus,
  Share2,
} from 'lucide-react';
import Link from 'next/link';
import styles from './index.module.css';
import { Blog } from '../api/blog';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

const { Search: AntSearch } = Input;

export function formatTime(isoTime: string): string {
  return dayjs(isoTime).format('YYYY-MM-DD');
}


// 示例数据 - 移到组件外部避免重复创建
const sampleArticles: Blog[] = [
  {
    ID: 1,
    title: '前端开发最佳实践指南',
    description: '探索现代前端开发的最佳实践，包括React、TypeScript、性能优化等核心技术要点。',
    content: '详细内容...',
    category: 'tutorial',
    author: '张三',
    translator: '',
    tags: ['React', 'TypeScript', '性能优化'],
    CreatedAt: '2024-01-15T10:00:00Z',
    UpdatedAt: '2024-01-15T10:00:00Z',
    source_link: '',
    cover_img: 'https://res.cloudinary.com/gmonad/image/upload/v1757760841/monad_img/tddwoyfu6a4klunrvpn4.jpg',
    publish_status: 2,
    view_count: 1250
  },
  {
    ID: 2,
    title: 'Node.js 微服务架构设计',
    description: '深入了解如何使用Node.js构建可扩展的微服务架构，包括服务拆分、通信机制和部署策略。',
    content: '详细内容...',
    category: 'blog',
    author: '李四',
    translator: '',
    tags: ['Node.js', '微服务', '架构设计'],
    CreatedAt: '2024-01-10T14:30:00Z',
    UpdatedAt: '2024-01-10T14:30:00Z',
    source_link: '',
    cover_img: 'https://res.cloudinary.com/gmonad/image/upload/v1757760841/monad_img/tddwoyfu6a4klunrvpn4.jpg',
    publish_status: 2,
    view_count: 890
  },
  {
    ID: 3,
    title: 'Docker 容器化部署实战',
    description: '从零开始学习Docker容器化技术，包括镜像构建、容器编排和生产环境部署。',
    content: '详细内容...',
    category: 'guide',
    author: '王五',
    translator: '',
    tags: ['Docker', '容器化', 'DevOps'],
    CreatedAt: '2024-01-05T09:15:00Z',
    UpdatedAt: '2024-01-05T09:15:00Z',
    source_link: '',
    cover_img: 'https://res.cloudinary.com/gmonad/image/upload/v1757760841/monad_img/tddwoyfu6a4klunrvpn4.jpg',
    publish_status: 2,
    view_count: 1650
  }
];

export default function ArticlePage() {
  const { message } = AntdApp.useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [articles, setArticles] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const router = useRouter();
  const { session } = useAuth();

  // 加载文章列表（使用示例数据）
  const loadArticles = useCallback(async (params?: {
    keyword?: string;
    page?: number;
    page_size?: number;
  }) => {
    try {
      setLoading(true);

      const keyword = params?.keyword || searchKeyword;
      const page = params?.page || currentPage;
      const page_size = params?.page_size || pageSize;

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      // 根据关键词过滤示例数据
      let filteredArticles = sampleArticles;
      if (keyword.trim()) {
        filteredArticles = sampleArticles.filter(article => 
          article.title.toLowerCase().includes(keyword.toLowerCase()) ||
          article.description.toLowerCase().includes(keyword.toLowerCase()) ||
          article.author.toLowerCase().includes(keyword.toLowerCase()) ||
          article.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
        );
      }

      // 分页处理
      const startIndex = (page - 1) * page_size;
      const endIndex = startIndex + page_size;
      const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

      setArticles(paginatedArticles);
      setTotal(filteredArticles.length);
      setCurrentPage(page);
      setPageSize(page_size);
    } catch (error) {
      console.error('加载文章列表异常:', error);
      setArticles([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchKeyword, currentPage, pageSize]);

  // 搜索文章
  const handleSearch = async (keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
    loadArticles({ keyword, page: 1 });
  };

  // 分页处理
  const handlePageChange = async (page: number, size?: number) => {
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
    }
    loadArticles({ page, page_size: size || pageSize });
  };

  // 计算当前显示的文章
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, total);

  useEffect(() => {
    if (!router.isReady) return;
    loadArticles();
  }, [router.isReady, loadArticles]);

  return (
    <div className={`${styles.container} nav-t-top`}>
      {/* Title Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>精选文章</h1>
            <p className={styles.subtitle}>探索技术前沿，分享开发经验</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <AntSearch
            placeholder="搜索文章标题、内容、作者、标签..."
            allowClear
            size="large"
            enterButton="搜索"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onSearch={handleSearch}
            onClear={() => handleSearch('')}
            loading={loading}
          />
        </div>
      </div>

      {/* Results Info */}
      <div className={styles.viewControls}>
        <div className={styles.resultsInfo}>
          <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            onChange={handlePageChange}
            showTotal={(total) =>
              `显示 ${startIndex}-${endIndex} 项，共 ${total} 项`
            }
            className={styles.fullPagination}
          />
        </div>
      </div>

      {/* Articles Display */}
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
        </div>
      ) : articles.length === 0 ? (
        <div className={styles.emptyContainer}>
          <div className={styles.emptyIcon}>📖</div>
          <div className={styles.emptyTitle}>暂无文章</div>
          <div className={styles.emptyDescription}>
            {searchKeyword
              ? '没有找到符合条件的文章'
              : '还没有创建任何文章'}
          </div>
          {!searchKeyword && (
            <Link href="/articles/new" className={styles.createButton}>
              <Plus className={styles.buttonIcon} />
              创建第一篇文章
            </Link>
          )}
        </div>
      ) : (
        <div className={styles.articlesGrid}>
          {articles.map((article) => (
            <Link
              href={`/articles/${article.ID}`}
              key={article.ID}
              className={styles.cardLink}
            >
              <Card
                className={styles.articleCard}
                cover={
                  <div className={styles.cardCover}>
                    <Image
                      alt={article.title}
                      src={
                        article.cover_img ||
                        '/placeholder.svg?height=240&width=400&text=文章封面'
                      }
                      className={styles.coverImage}
                      preview={false}
                    />
                    <div className={styles.coverOverlay}>
                      <Tag className={styles.categoryTag}>
                        {article.category || 'blog'}
                      </Tag>
                      {article.publish_status === 1 && (
                        <Tag className={styles.noPublishStatus}>未发布</Tag>
                      )}
                      <div className={styles.cardActions}>
                        <Button
                          className={styles.actionIconButton}
                          onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(
                              `${window.location.origin}/articles/${article.ID}`
                            );
                            message.success('链接已复制到剪贴板');
                          }}
                          icon={<Share2 className={styles.actionIcon} />}
                          title="分享文章"
                        />
                      </div>
                    </div>
                  </div>
                }
              >
                <div className={styles.cardBody}>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleDescription}>
                    {article.description}
                  </p>

                  <div className={styles.cardMeta}>
                    <div className={styles.metaItem}>
                      <Calendar className={styles.metaIcon} />
                      <span>{formatTime(article.CreatedAt)}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <User className={styles.metaIcon} />
                      <span className={styles.authorText}>
                        {article.author || '匿名'}
                      </span>
                    </div>
                    {article.view_count && (
                      <div className={styles.metaItem}>
                        <Eye className={styles.metaIcon} />
                        <span>{article.view_count}</span>
                      </div>
                    )}
                  </div>
                  {article.tags && article.tags.length > 0 && (
                    <div className={styles.cardTags}>
                      {article.tags
                        .slice(0, 3)
                        .map((tag: string, index: number) => (
                          <Tag key={index} className={styles.articleTag}>
                            {tag}
                          </Tag>
                        ))}
                      {article.tags.length > 3 && (
                        <Tag className={styles.moreTag}>
                          +{article.tags.length - 3}
                        </Tag>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div className={styles.listBottomControls}>
        <div className={styles.bottomPagination}>
          <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            onChange={handlePageChange}
            showTotal={(total) =>
              `显示 ${startIndex}-${endIndex} 项，共 ${total} 项`
            }
            className={styles.fullPagination}
          />
        </div>
      </div>
    </div>
  );
}