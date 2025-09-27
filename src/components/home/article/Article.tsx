import { Calendar, User, Eye, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Tag } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Article.module.css';
import { getArticles } from '@/pages/api/article';

export function formatTime(isoTime: string): string {
    return dayjs(isoTime).format('YYYY年M月D日');
}

// 分类映射配置
const categoryConfig = {
    original: {
        label: '原创',
        className: styles.original
    },
    translation: {
        label: '翻译', 
        className: styles.translation
    },
    archive: {
        label: '归档',
        className: styles.archive
    }
};

// 获取分类信息的辅助函数
const getCategoryInfo = (category: string) => {
    return categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.original;
};

export default function ArticleSection() {
    const { status } = useAuth();
    const [articles, setArticles] = useState<Array<{
        ID: number;
        title: string;
        description: string;
        cover_img: string;
        category: string;
        tags: string[];
        CreatedAt: string;
        author: string;
        view_count?: number;
    }>>([]);

    // 加载文章列表
    const loadArticles = async () => {
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
                    {articles.map((article, index) => {
                        // 获取分类信息
                        const categoryInfo = getCategoryInfo(article.category);
                        
                        return (
                            <div key={article.ID || index} className={styles.articleCard}>
                                <div className={styles.articleCardGlow}></div>
                                <div className={styles.articleCardHeader}>
                                    <div className={styles.articleMeta}>
                                        {/* 修改分类标签部分 */}
                                        <span className={`${styles.categoryBadge} ${categoryInfo.className}`}>
                                            {categoryInfo.label}
                                        </span>
                                        <div className={styles.articleStats}>
                                            <div className={styles.statItem}>
                                                <Eye className={styles.articleIcon} />
                                                {article.view_count || 0}
                                            </div>
                                            {/* 注释掉暂时不需要的统计信息 */}
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
                                            {article.author || '未知作者'}
                                        </div>
                                        <div className={styles.articleInfoItem}>
                                            <Calendar className={styles.articleIcon} />
                                            {article.publish_time ? formatTime(article.publish_time) : '未发布'}
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
                                    <Link href={`/articles/${article.ID}`} passHref>
                                        <button className={styles.articleButton}>
                                            阅读文章
                                            <ArrowRight className={styles.buttonIcon} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
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