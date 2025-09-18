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
import { getBlogById, updateBlogPublishStatus } from '@/pages/api/blog';
import { Blog } from '@/pages/api/blog';
import dayjs from 'dayjs';
import { sanitizeMarkdown } from '@/lib/markdown';

export function formatTime(isoTime: string): string {
  return dayjs(isoTime).format('YYYY-MM-DD HH:MM');
}

// 示例数据 - 与文章列表页面保持一致
const sampleArticles: Blog[] = [
  {
    ID: 1,
    title: '前端开发最佳实践指南',
    description: '探索现代前端开发的最佳实践，包括React、TypeScript、性能优化等核心技术要点。',
    content: `# 前端开发最佳实践指南

## 前言

在现代前端开发中，技术栈的选择和开发实践对项目的成功至关重要。本文将分享一些在实际项目中总结的最佳实践。

## React 开发实践

### 组件设计原则

1. **单一职责原则**：每个组件只负责一个功能
2. **可复用性**：设计组件时考虑复用场景
3. **Props 接口设计**：清晰的 Props 定义

\`\`\`tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

### 状态管理

使用适合的状态管理方案：
- **本地状态**：使用 useState
- **全局状态**：考虑 Context API 或状态管理库
- **服务端状态**：使用 SWR 或 React Query

## TypeScript 最佳实践

### 类型定义

\`\`\`typescript
// 接口定义
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// 联合类型
type Theme = 'light' | 'dark';

// 泛型使用
function apiRequest<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json());
}
\`\`\`

## 性能优化

### 代码分割

使用动态导入实现代码分割：

\`\`\`tsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### 内存泄漏预防

1. 清理定时器
2. 取消网络请求
3. 移除事件监听器

## 总结

前端开发是一个持续学习的过程，保持对新技术的敏感度，同时注重代码质量和性能优化，是成为优秀前端工程师的关键。`,
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
    content: `# Node.js 微服务架构设计

## 什么是微服务架构

微服务架构是一种架构模式，它将单个应用程序开发为一组小型服务，每个服务都在自己的进程中运行，并与轻量级机制（通常是 HTTP 资源 API）进行通信。

## 微服务架构的优势

1. **独立部署**：每个服务可以独立部署和扩展
2. **技术多样性**：不同服务可以使用不同的技术栈
3. **故障隔离**：一个服务的故障不会影响整个系统
4. **团队独立**：不同团队可以独立开发不同的服务

## Node.js 在微服务中的优势

- **轻量级**：Node.js 启动快，内存占用小
- **高并发**：事件驱动的非阻塞 I/O 模型
- **生态丰富**：npm 生态系统提供了大量的工具和库

## 服务拆分策略

### 按业务功能拆分

\`\`\`
用户服务 (User Service)
- 用户注册/登录
- 用户信息管理

订单服务 (Order Service) 
- 订单创建/查询
- 订单状态管理

支付服务 (Payment Service)
- 支付处理
- 支付记录
\`\`\`

## 服务通信

### HTTP REST API

\`\`\`javascript
// 用户服务
app.get('/api/users/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  res.json(user);
});

// 订单服务调用用户服务
async function createOrder(userId, orderData) {
  const user = await fetch(\`\${USER_SERVICE_URL}/api/users/\${userId}\`)
    .then(res => res.json());
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // 创建订单逻辑
  return await Order.create({
    userId,
    ...orderData
  });
}
\`\`\`

### 消息队列

使用 Redis 或 RabbitMQ 实现异步通信：

\`\`\`javascript
// 发布订单创建事件
const orderCreated = {
  orderId: order.id,
  userId: order.userId,
  amount: order.amount
};

await publisher.publish('order.created', JSON.stringify(orderCreated));
\`\`\`

## 部署策略

### Docker 容器化

\`\`\`dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
\`\`\`

### Kubernetes 编排

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 3000
\`\`\`

## 监控和日志

- **健康检查**：实现 /health 端点
- **日志聚合**：使用 ELK 或 Grafana
- **性能监控**：APM 工具如 New Relic

## 总结

微服务架构不是银弹，需要根据团队规模、业务复杂度和技术水平来决定是否采用。在实施时要注意服务边界的划分、数据一致性、分布式事务等挑战。`,
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
    content: `# Docker 容器化部署实战

## Docker 简介

Docker 是一个开源的容器化平台，它可以让开发者将应用程序及其依赖项打包到轻量级、可移植的容器中，然后发布到任何流行的Linux或Windows机器上。

## Docker 的优势

1. **环境一致性**：开发、测试、生产环境完全一致
2. **快速部署**：秒级启动应用
3. **资源隔离**：容器间相互隔离，不会互相影响
4. **便于扩展**：水平扩展变得简单

## 基础概念

### 镜像 (Image)

镜像是一个只读模板，用来创建容器。

### 容器 (Container)

容器是镜像的运行实例。

### Dockerfile

用于构建镜像的文本文件。

## 实战案例：Node.js 应用容器化

### 1. 创建 Dockerfile

\`\`\`dockerfile
# 使用官方 Node.js 镜像作为基础镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 3000

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# 切换到非 root 用户
USER nextjs

# 启动应用
CMD ["node", "server.js"]
\`\`\`

### 2. 构建镜像

\`\`\`bash
docker build -t my-app:latest .
\`\`\`

### 3. 运行容器

\`\`\`bash
docker run -p 3000:3000 my-app:latest
\`\`\`

## Docker Compose

对于多服务应用，使用 Docker Compose 来管理：

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    depends_on:
      - db
      - redis

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - db_data:/var/lib/postgresql/data

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data

volumes:
  db_data:
  redis_data:
\`\`\`

启动整个应用栈：

\`\`\`bash
docker-compose up -d
\`\`\`

## 生产环境部署

### 多阶段构建

\`\`\`dockerfile
# 构建阶段
FROM node:16-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 生产阶段
FROM node:16-alpine AS production

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist

USER node

CMD ["node", "dist/server.js"]
\`\`\`

### 健康检查

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

## 安全最佳实践

1. **使用非 root 用户**
2. **最小化镜像体积**
3. **定期更新基础镜像**
4. **扫描漏洞**

\`\`\`bash
# 使用 dive 分析镜像层
dive my-app:latest

# 使用 trivy 扫描漏洞
trivy image my-app:latest
\`\`\`

## 监控和日志

### 日志收集

\`\`\`yaml
services:
  app:
    # ...
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
\`\`\`

### 性能监控

使用 Prometheus 和 Grafana 监控容器性能。

## 总结

Docker 容器化技术大大简化了应用的部署和运维工作。通过合理的镜像构建策略、容器编排和监控方案，可以构建出稳定、可扩展的生产环境。

掌握 Docker 不仅能提高开发效率，还能让你更好地理解现代云原生架构。`,
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

export default function ArticleDetailPage() {
  const { message } = AntdApp.useApp();
  const router = useRouter();
  const { id } = router.query;
  const rId = Array.isArray(id) ? id[0] : id;

  const [article, setArticle] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
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
      const result = await updateBlogPublishStatus(article!.ID, 2);
      if (result.success) {
        router.reload();
        message.success(result.message);
      } else {
        message.error(result.message || '审核出错');
      }
    } catch (error) {
      message.error('审核出错，请重试');
    }
  };

  useEffect(() => {
    if (!router.isReady || !rId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // 在实际项目中，这里应该调用真实的API
        // const response = await getBlogById(rId);
        // setArticle(response?.data);
        
        // 使用示例数据进行模拟
        const foundArticle = sampleArticles.find(article => article.ID.toString() === rId);
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setArticle(null);
        }
      } catch (error) {
        message.error('加载失败');
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, id, rId, message]);

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
  const canReview = permissions.includes('blog:review');

  if (!article || (isUnderReview && !isPublisher && !canReview)) {
    return (
      <div className={styles.error}>
        <h2>文章不存在</h2>
        <p>抱歉，找不到您要查看的文章</p>
        <Link href="/articles" className={styles.backButton}>
          返回文章列表
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.container} nav-t-top`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/articles" className={styles.backLink}>
            <ArrowLeft className={styles.backIcon} />
            返回文章列表
          </Link>
          <div className={styles.headerActions}>
            {status === 'authenticated' &&
            article.publisher_id?.toString() === session?.user?.uid ? (
              <Button
                icon={<Edit size={16} className={styles.actionIcon} />}
                className={styles.actionButton}
                onClick={() => router.push(`/articles/${article.ID}/edit`)}
              >
                编辑
              </Button>
            ) : null}
            {article.publish_status === 1 &&
            status === 'authenticated' &&
            permissions.includes('blog:review') ? (
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
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />
        </div>
      </div>
    </div>
  );
}