import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Tag, Button, Divider, App as AntdApp } from 'antd';
import {
  Calendar,
  User,
  Eye,
  MessageCircle,
  Share2,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import dayjs from 'dayjs';
import styles from './index.module.css';
import { useAuth } from '@/contexts/AuthContext';

export function formatTime(isoTime: string): string {
  return dayjs(isoTime).format('YYYY年M月D日 HH:mm');
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
const mockNewsData: { [key: string]: NewsItem } = {
  '1': {
    id: 1,
    title: "开源社区发布重大更新：全新功能助力开发者协作",
    description: "本次更新包含多项创新功能，旨在提升开发者在开源项目中的协作效率和体验。",
    content: `
# 开源社区重大更新详解

本次更新是我们开源社区历史上最大的功能性更新之一，包含了多项创新功能和重要改进。

## 主要更新内容

### 1. 全新的协作工具
- **实时代码协作**：支持多人同时编辑代码，实时同步修改
- **智能冲突解决**：自动检测并提供冲突解决建议
- **版本控制增强**：更直观的分支管理和合并流程

### 2. 改进的用户体验
- **响应式设计**：完全重新设计的移动端体验
- **深色模式**：支持系统级深色模式切换
- **个性化仪表板**：可自定义的项目和活动面板

### 3. 性能优化
- **页面加载速度提升50%**
- **搜索功能优化**：支持更精确的搜索结果
- **缓存机制改进**：减少不必要的网络请求

## 如何使用新功能

新功能将在接下来的几周内逐步向所有用户开放。您可以通过以下方式体验：

1. 登录您的账户
2. 进入项目设置页面
3. 启用新功能开关
4. 开始使用全新的协作工具

## 技术细节

本次更新采用了最新的技术栈：
- React 18+ with Concurrent Features
- TypeScript 5.0
- Next.js 13 App Router
- Ant Design 5.0

## 后续计划

我们将继续关注用户反馈，并在未来几个月内推出更多激动人心的功能。

感谢所有社区成员的支持和建议！
    `,
    author: "开源社区",
    publishTime: "2024-01-15T10:00:00Z",
    readCount: 1280,
    commentCount: 24,
    tags: ["技术更新", "社区动态", "协作工具"],
    category: "技术动态",
    isTop: true,
    thumbnail: "https://res.cloudinary.com/gmonad/image/upload/v1757760841/monad_img/tddwoyfu6a4klunrvpn4.jpg"
  },
  '2': {
    id: 2,
    title: "2024年开源技术趋势报告：AI驱动开发成为主流",
    description: "分析2024年开源技术发展趋势，探讨人工智能如何改变开源开发生态。",
    content: `
# 2024年开源技术趋势报告

随着人工智能技术的快速发展，开源社区正在经历前所未有的变革。本报告深入分析了当前的技术趋势。

## 关键趋势

### 1. AI驱动的开发工具
- **代码生成助手**：如GitHub Copilot、ChatGPT等
- **自动化测试**：AI驱动的测试用例生成
- **智能代码审查**：自动检测潜在问题和改进建议

### 2. 云原生技术普及
- **容器化部署**：Docker和Kubernetes的广泛应用
- **微服务架构**：服务拆分和独立部署
- **Serverless计算**：按需执行的计算模式

### 3. 开发者体验优化
- **低代码/无代码平台**：降低开发门槛
- **可视化开发工具**：拖拽式界面构建
- **自动化DevOps流程**：CI/CD管道优化

## 影响分析

这些趋势对开源社区产生了深远影响：
- 提高了开发效率
- 降低了技术门槛
- 促进了创新速度
- 改变了协作方式

## 未来展望

预计未来一年内，我们将看到更多AI技术在开源项目中的应用。
    `,
    author: "技术研究院",
    publishTime: "2024-01-12T14:30:00Z",
    readCount: 890,
    commentCount: 18,
    tags: ["技术趋势", "人工智能", "开源生态"],
    category: "行业报告",
    isTop: false
  },
  '3': {
    id: 3,
    title: "开源项目贡献者激励计划正式启动",
    description: "为了表彰优秀的开源贡献者，我们推出全新的激励计划，提供多种奖励机制。",
    content: `
# 开源项目贡献者激励计划

我们很高兴地宣布，开源项目贡献者激励计划正式启动！

## 计划概述

本计划旨在表彰和奖励在开源项目中做出突出贡献的开发者，提供多种形式的激励和支持。

## 奖励类型

### 1. 月度优秀贡献者
- 现金奖励：$500-2000
- 专属徽章和证书
- 社区首页展示

### 2. 年度杰出贡献者
- 现金奖励：$5000-10000
- 开源大会演讲机会
- 专访报道

### 3. 特殊贡献奖
- 针对重大技术突破
- 金额：$1000-5000
- 特别表彰

## 评选标准

- **代码质量**：提交代码的质量和创新性
- **贡献数量**：PR、Issue、文档等贡献数量
- **社区参与度**：在社区中的活跃程度和影响力
- **技术影响**：贡献对项目的技术影响

## 如何参与

1. 在任何支持的开源项目中贡献代码
2. 确保贡献符合项目规范
3. 积极参与社区讨论
4. 系统将自动跟踪您的贡献

## 申请流程

每月自动评选，无需手动申请。我们的系统会自动分析贡献数据并选出优秀贡献者。

欢迎所有开发者参与！让我们一起推动开源生态的发展。
    `,
    author: "社区运营",
    publishTime: "2024-01-10T09:15:00Z",
    readCount: 654,
    commentCount: 32,
    tags: ["社区计划", "贡献者", "激励机制"],
    category: "社区公告",
    isTop: false
  }
};

export default function NewsDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { message } = AntdApp.useApp();
  const { user } = useAuth();
  
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && typeof id === 'string') {
      // 在实际应用中，这里应该调用API获取新闻详情
      const newsData = mockNewsData[id];
      if (newsData) {
        setNews(newsData);
      } else {
        message.error('新闻不存在');
        router.push('/news');
      }
      setLoading(false);
    }
  }, [id, message, router]);

  const handleShare = () => {
    const url = `${window.location.origin}/news/${id}`;
    navigator.clipboard?.writeText(url);
    message.success('链接已复制到剪贴板');
  };

  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }

  if (!news) {
    return <div className={styles.notFound}>新闻不存在</div>;
  }

  return (
    <div className={styles.newsDetailPage}>
      <div className={styles.container}>
        {/* 返回按钮 */}
        <div className={styles.backButton}>
          <Link href="/news">
            <Button icon={<ArrowLeft size={16} />} type="text">
              返回新闻列表
            </Button>
          </Link>
        </div>

        {/* 新闻详情 */}
        <Card className={styles.newsCard}>
          {/* 新闻头部 */}
          <div className={styles.newsHeader}>
            <div className={styles.categoryInfo}>
              <Tag color={news.isTop ? 'red' : 'blue'}>
                {news.isTop ? '置顶' : news.category}
              </Tag>
            </div>
            
            <h1 className={styles.newsTitle}>{news.title}</h1>
            <p className={styles.newsDescription}>{news.description}</p>
            
            {/* 新闻元信息 */}
            <div className={styles.newsMeta}>
              <div className={styles.metaLeft}>
                <span className={styles.metaItem}>
                  <User size={16} />
                  {news.author}
                </span>
                <span className={styles.metaItem}>
                  <Calendar size={16} />
                  {formatTime(news.publishTime)}
                </span>
              </div>
              
              <div className={styles.metaRight}>
                <span className={styles.metaItem}>
                  <Eye size={16} />
                  {news.readCount} 阅读
                </span>
                <span className={styles.metaItem}>
                  <MessageCircle size={16} />
                  {news.commentCount} 评论
                </span>
                <Button
                  type="text"
                  size="small"
                  icon={<Share2 size={16} />}
                  onClick={handleShare}
                >
                  分享
                </Button>
              </div>
            </div>

            {/* 标签 */}
            {news.tags && news.tags.length > 0 && (
              <div className={styles.tagsContainer}>
                {news.tags.map((tag) => (
                  <Tag key={tag} className={styles.tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          <Divider />

          {/* 新闻内容 */}
          <div className={styles.newsContent}>
            <div 
              className={styles.markdownContent}
              dangerouslySetInnerHTML={{ 
                __html: news.content.replace(/\n/g, '<br/>').replace(/#{1,6}\s/g, (match) => {
                  const level = match.trim().length;
                  return `<h${level}>`;
                }).replace(/(?=<h[1-6]>)(.+?)(?=<br\/>|$)/g, (match) => {
                  return match + `</h${match.match(/<h([1-6])>/)?.[1] || '1'}>`;
                })
              }}
            />
          </div>

          {/* 新闻底部 */}
          <Divider />
          <div className={styles.newsFooter}>
            <div className={styles.footerActions}>
              <Button type="primary" onClick={handleShare}>
                <Share2 size={16} />
                分享这篇新闻
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}