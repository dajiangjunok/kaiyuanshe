import { Calendar, User, Eye, MessageCircle, ArrowRight, BookOpen, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { Tag } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Article.module.css';
import { getArticles } from '@/pages/api/article';

export function formatTime(isoTime: string): string {
    return dayjs(isoTime).format('YYYY年M月D日');
}


export default function ArticleSection() {
    const { status } = useAuth();
    const [articles, setArticles] = useState<any[]>([]);

    // 加载文章列表
    const loadArticles = async (params?: {
        keyword?: string;
        tag?: string;
        order?: 'asc' | 'desc';
        page?: number;
        page_size?: number;
        publish_status?: number;
    }) => {
        try {
            const queryParams = {
                page: 1,
                page_size: 3,
                publish_status: 2,
            };

            const result = await getArticles(queryParams);
            if (result.success && result.data) {
                // 处理后端返回的数据结构
                if (result.data.articles && Array.isArray(result.data.articles)) {
                    console.log(result.data.articles);
                    setArticles(result.data.articles);
                } else if (Array.isArray(result.data)) {
                    setArticles(result.data);
                } else {
                    console.warn('API 返回的数据格式不符合预期:', result.data);
                    setArticles([]);
                }
            } else {
                console.error('获取文章列表失败:', result.message);
                setArticles([]);
            }
        } catch (error) {
            console.error('加载文章列表异常:', error);
            setArticles([]);
        } 
    };

    useEffect(() => {
        if (!status || status !== 'loading') {
            loadArticles();
        }
    }, [status]);

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
                                            {article.view_count}
                                        </div>
                                        {/* <div className={styles.statItem}>
                                            <Star className={styles.articleIcon} />
                                            {article.likeCount}
                                        </div>
                                        <div className={styles.statItem}>
                                            <MessageCircle className={styles.articleIcon} />
                                            {article.commentCount}
                                        </div> */}
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
                                        {formatTime(article.publish_time)}
                                    </div>
                                    <div className={styles.articleInfoItem}>
                                        <BookOpen className={styles.articleIcon} />
                                        {article.readingTime || 6} 分钟阅读
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