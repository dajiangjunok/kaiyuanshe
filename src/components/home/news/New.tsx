import { Calendar, User, Eye, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { Tag } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import styles from './New.module.css';

export function formatTime(isoTime: string): string {
    return dayjs(isoTime).format('YYYY年M月D日');
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

const mockNews: NewsItem[] = [
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
        isTop: true
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
        isTop: false
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
        isTop: false
    }
];

export default function NewsSection() {
    const { status } = useAuth();
    const [news, setNews] = useState<NewsItem[]>([]);

    const loadNews = useCallback(async () => {
        try {
            setNews(mockNews);
        } catch (error) {
            console.error("加载新闻列表异常:", error);
            setNews([]);
        }
    }, []);

    useEffect(() => {
        if (!status || status !== 'loading') {
            loadNews();
        }
    }, [status, loadNews]);

    return (
        <section className={styles.news}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>最新动态</h2>
                    <p className={styles.sectionDescription}>
                        关注开源前沿，掌握技术脉搏
                    </p>
                </div>
                <div className={styles.newsGrid}>
                    {news.map((item, index) => (
                        <div key={index} className={styles.newsCard}>
                            <div className={styles.newsCardGlow}></div>
                            <div className={styles.newsCardHeader}>
                                <div className={styles.newsMeta}>
                                    <span className={`${styles.categoryBadge} ${item.isTop ? styles.topBadge : ''}`}>
                                        {item.isTop ? '置顶' : item.category}
                                    </span>
                                    <div className={styles.newsStats}>
                                        <div className={styles.statItem}>
                                            <Eye className={styles.newsIcon} />
                                            {item.readCount}
                                        </div>
                                        <div className={styles.statItem}>
                                            <MessageCircle className={styles.newsIcon} />
                                            {item.commentCount}
                                        </div>
                                    </div>
                                </div>
                                <h3 className={styles.newsTitle}>{item.title}</h3>
                                <p className={styles.newsDescription}>{item.description}</p>
                            </div>
                            <div className={styles.newsCardContent}>
                                <div className={styles.newsInfo}>
                                    <div className={styles.newsInfoItem}>
                                        <User className={styles.newsIcon} />
                                        {item.author}
                                    </div>
                                    <div className={styles.newsInfoItem}>
                                        <Calendar className={styles.newsIcon} />
                                        {formatTime(item.publishTime)}
                                    </div>
                                </div>
                                {item.tags && item.tags.length > 0 && (
                                    <div className={styles.tagsContainer}>
                                        {item.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                                            <Tag key={tagIndex} className={styles.tag}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                )}
                                <Link href={`/news/${item.id}`} passHref>
                                    <button className={styles.newsButton}>
                                        阅读全文
                                        <ArrowRight className={styles.buttonIcon} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.sectionFooter}>
                    <Link href="/news">
                        <button className={styles.moreButton}>
                            <Calendar className={styles.buttonIcon} />
                            查看更多动态
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}