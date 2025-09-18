import { Calendar, User, Eye, MessageCircle, ArrowRight, BookOpen, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { Tag } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Article.module.css';

export function formatTime(isoTime: string): string {
    return dayjs(isoTime).format('YYYY年M月D日');
}

interface ArticleItem {
    id: number;
    title: string;
    description: string;
    content: string;
    author: string;
    publishTime: string;
    readCount: number;
    likeCount: number;
    commentCount: number;
    tags: string[];
    category: string;
    isFeatured: boolean;
    thumbnail?: string;
    readingTime: number;
}

const mockArticles: ArticleItem[] = [
    {
        id: 1,
        title: "开源技术深度解析：从零开始构建现代化Web应用",
        description: "深入探讨现代Web开发技术栈，分享从项目架构设计到生产环境部署的完整开发经验与最佳实践。",
        content: "详细内容...",
        author: "技术极客",
        publishTime: "2024-01-16T09:00:00Z",
        readCount: 2580,
        likeCount: 156,
        commentCount: 42,
        tags: ["Web开发", "架构设计", "最佳实践"],
        category: "技术教程",
        isFeatured: true,
        readingTime: 12
    },
    {
        id: 2,
        title: "开源项目管理实践：如何高效协调团队开发",
        description: "分享在开源项目中进行团队协作的经验，包括代码审查、版本管理、持续集成等核心环节的优化策略。",
        content: "详细内容...",
        author: "项目管理者",
        publishTime: "2024-01-14T16:20:00Z",
        readCount: 1920,
        likeCount: 128,
        commentCount: 35,
        tags: ["项目管理", "团队协作", "DevOps"],
        category: "管理经验",
        isFeatured: false,
        readingTime: 8
    },
    {
        id: 3,
        title: "开源安全实践指南：保护你的代码和用户数据",
        description: "全面介绍开源项目中的安全考量，从代码安全到数据保护，帮助开发者建立完整的安全防护体系。",
        content: "详细内容...",
        author: "安全专家",
        publishTime: "2024-01-11T11:45:00Z",
        readCount: 1456,
        likeCount: 89,
        commentCount: 28,
        tags: ["网络安全", "数据保护", "安全防护"],
        category: "安全指南",
        isFeatured: false,
        readingTime: 15
    }
];

export default function ArticleSection() {
    const { status } = useAuth();
    const [articles, setArticles] = useState<ArticleItem[]>([]);

    const loadArticles = useCallback(async () => {
        try {
            setArticles(mockArticles);
        } catch (error) {
            console.error("加载文章列表异常:", error);
            setArticles([]);
        }
    }, []);

    useEffect(() => {
        if (!status || status !== 'loading') {
            loadArticles();
        }
    }, [status, loadArticles]);

    return (
        <section className={styles.articles}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>精彩文章</h2>
                    <p className={styles.sectionDescription}>
                        深度好文，启发思考，助力成长
                    </p>
                </div>
                <div className={styles.articlesGrid}>
                    {articles.map((article, index) => (
                        <div key={index} className={styles.articleCard}>
                            <div className={styles.articleCardGlow}></div>
                            <div className={styles.articleCardHeader}>
                                <div className={styles.articleMeta}>
                                    <span className={`${styles.categoryBadge} ${article.isFeatured ? styles.featuredBadge : ''}`}>
                                        {article.isFeatured ? '精选' : article.category}
                                    </span>
                                    <div className={styles.articleStats}>
                                        <div className={styles.statItem}>
                                            <Eye className={styles.articleIcon} />
                                            {article.readCount}
                                        </div>
                                        <div className={styles.statItem}>
                                            <Star className={styles.articleIcon} />
                                            {article.likeCount}
                                        </div>
                                        <div className={styles.statItem}>
                                            <MessageCircle className={styles.articleIcon} />
                                            {article.commentCount}
                                        </div>
                                    </div>
                                </div>
                                <h3 className={styles.articleTitle}>{article.title}</h3>
                                <p className={styles.articleDescription}>{article.description}</p>
                            </div>
                            <div className={styles.articleCardContent}>
                                <div className={styles.articleInfo}>
                                    <div className={styles.articleInfoItem}>
                                        <User className={styles.articleIcon} />
                                        {article.author}
                                    </div>
                                    <div className={styles.articleInfoItem}>
                                        <Calendar className={styles.articleIcon} />
                                        {formatTime(article.publishTime)}
                                    </div>
                                    <div className={styles.articleInfoItem}>
                                        <BookOpen className={styles.articleIcon} />
                                        {article.readingTime} 分钟阅读
                                    </div>
                                </div>
                                {article.tags && article.tags.length > 0 && (
                                    <div className={styles.tagsContainer}>
                                        {article.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                                            <Tag key={tagIndex} className={styles.tag}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                )}
                                <Link href={`/articles/${article.id}`} passHref>
                                    <button className={styles.articleButton}>
                                        阅读文章
                                        <ArrowRight className={styles.buttonIcon} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.sectionFooter}>
                    <Link href="/articles">
                        <button className={styles.moreButton}>
                            <BookOpen className={styles.buttonIcon} />
                            查看更多文章
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}