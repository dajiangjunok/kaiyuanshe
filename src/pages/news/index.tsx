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
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import styles from './index.module.css';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

const { Search: AntSearch } = Input;

export function formatTime(isoTime: string): string {
  return dayjs(isoTime).format('YYYY-MM-DD');
}

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  publishTime: string;
  readCount: number;
  commentCount: number;
  tags: string[];
  category: string;
  isTop: boolean;
  thumbnail?: string;
}

// 示例数据
const sampleNews: NewsItem[] = [
  {
    id: 1,
    title: "开源社区发布重大更新：全新功能助力开发者协作",
    description: "本次更新包含多项创新功能，旨在提升开发者在开源项目中的协作效率和体验。",
    content: "详细内容...",
    author: "开源社区",
    publishTime: "2024-01-15T10:00:00Z",
    readCount: 1280,
    commentCount: 24,
    tags: ["技术更新", "社区动态", "协作工具"],
    category: "技术动态",
    isTop: true,
    thumbnail: "https://res.cloudinary.com/gmonad/image/upload/v1757760841/monad_img/tddwoyfu6a4klunrvpn4.jpg"
  },
  {
    id: 2,
    title: "2024年开源技术趋势报告：AI驱动开发成为主流",
    description: "分析2024年开源技术发展趋势，探讨人工智能如何改变开源开发生态。",
    content: "详细内容...",
    author: "技术研究院",
    publishTime: "2024-01-12T14:30:00Z",
    readCount: 890,
    commentCount: 18,
    tags: ["技术趋势", "人工智能", "开源生态"],
    category: "行业报告",
    isTop: false,
    thumbnail: "https://res.cloudinary.com/gmonad/image/upload/v1757760841/monad_img/tddwoyfu6a4klunrvpn4.jpg"
  },
  {
    id: 3,
    title: "开源项目贡献者激励计划正式启动",
    description: "为了表彰优秀的开源贡献者，我们推出全新的激励计划，提供多种奖励机制。",
    content: "详细内容...",
    author: "社区运营",
    publishTime: "2024-01-10T09:15:00Z",
    readCount: 654,
    commentCount: 32,
    tags: ["社区计划", "贡献者", "激励机制"],
    category: "社区公告",
    isTop: false,
    thumbnail: "https://res.cloudinary.com/gmonad/image/upload/v1757760841/monad_img/tddwoyfu6a4klunrvpn4.jpg"
  }
];

export default function NewsPage() {
  const { message } = AntdApp.useApp();
  const router = useRouter();
  const { user, status } = useAuth();
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const pageSize = 12;

  const loadNews = useCallback(async (page: number = 1, keyword: string = '') => {
    setLoading(true);
    try {
      // 这里应该调用真实的API，现在使用示例数据
      const filteredNews = keyword 
        ? sampleNews.filter(item => 
            item.title.includes(keyword) || 
            item.description.includes(keyword) ||
            item.tags.some(tag => tag.includes(keyword))
          )
        : sampleNews;
      
      setNews(filteredNews);
      setTotal(filteredNews.length);
      setCurrentPage(page);
    } catch (error) {
      console.error('加载新闻失败:', error);
      message.error('加载新闻失败');
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    loadNews(1, searchKeyword);
  }, [loadNews, searchKeyword]);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadNews(page, searchKeyword);
  };

  return (
    <div className={styles.newsPage}>
      <div className={styles.container}>
        {/* 页面头部 */}
        <div className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>最新动态</h1>
            <p className={styles.pageDescription}>
              关注开源前沿，掌握技术脉搏
            </p>
          </div>
          
          {/* 搜索和筛选 */}
          <div className={styles.searchSection}>
            <AntSearch
              placeholder="搜索新闻..."
              allowClear
              size="large"
              onSearch={handleSearch}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* 新闻列表 */}
        <div className={styles.newsGrid}>
          {news.map((item) => (
            <Card
              key={item.id}
              className={styles.newsCard}
              cover={
                item.thumbnail && (
                  <div className={styles.imageContainer}>
                    <Image
                      alt={item.title}
                      src={item.thumbnail}
                      preview={false}
                      className={styles.newsImage}
                    />
                    {item.isTop && (
                      <div className={styles.topBadge}>置顶</div>
                    )}
                  </div>
                )
              }
              actions={[
                <Link key="read" href={`/news/${item.id}`}>
                  <Button type="primary" ghost size="small">
                    阅读全文
                  </Button>
                </Link>,
                <Button
                  key="share"
                  type="text"
                  size="small"
                  icon={<Share2 size={14} />}
                  onClick={() => {
                    navigator.clipboard?.writeText(`${window.location.origin}/news/${item.id}`);
                    message.success('链接已复制');
                  }}
                >
                  分享
                </Button>
              ]}
            >
              <Card.Meta
                title={
                  <Link href={`/news/${item.id}`} className={styles.newsTitle}>
                    {item.title}
                  </Link>
                }
                description={
                  <div className={styles.newsContent}>
                    <p className={styles.newsDescription}>{item.description}</p>
                    
                    <div className={styles.newsMeta}>
                      <div className={styles.metaInfo}>
                        <span className={styles.metaItem}>
                          <User size={14} />
                          {item.author}
                        </span>
                        <span className={styles.metaItem}>
                          <Calendar size={14} />
                          {formatTime(item.publishTime)}
                        </span>
                      </div>
                      
                      <div className={styles.newsStats}>
                        <span className={styles.statItem}>
                          <Eye size={14} />
                          {item.readCount}
                        </span>
                        <span className={styles.statItem}>
                          <MessageCircle size={14} />
                          {item.commentCount}
                        </span>
                      </div>
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className={styles.tagsContainer}>
                        {item.tags.slice(0, 3).map((tag) => (
                          <Tag key={tag} className={styles.tag}>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    )}
                  </div>
                }
              />
            </Card>
          ))}
        </div>

        {/* 分页 */}
        {total > pageSize && (
          <div className={styles.paginationContainer}>
            <Pagination
              current={currentPage}
              total={total}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) =>
                `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}