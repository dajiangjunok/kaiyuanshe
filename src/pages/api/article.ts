import { apiRequest } from './api';

// 创建事件请求参数接口
export interface CreateArticleParams {
  title: string;
  description: string;
  content: string;
  category: string;
  license: string;
  cover_img: string;
  source_link: string;
  tags: string[];
  author: string;
  translator: string;
  editor: string;
}

export interface UpdateArticleParams {
  title: string;
  description: string;
  content: string;
  category: string | 'article';
  source_link: string;
  cover_img: string;
  tags: string[];
  author: string;
  translator: string;
  editor: string;
  license: string;
}

export interface GetArticlesParams {
  keyword?: string;
  tag?: string;
  order?: 'asc' | 'desc';
  page?: number;
  user_id?: number;
  page_size?: number;
  category?: string;
  author?: string;
  translator?: string;
  publish_status?: number;
  publish_time?: string;
}

export interface User {
  ID: number;
  email: string;
  username: string;
  avatar: string;
  github: string;
}

export interface Article {
  ID: number;
  title: string;
  CreatedAt: string;
  UpdatedAt: string;
  description: string;
  content: string;
  source_link: string;
  cover_img: string;
  category: string;
  license: string
  author: string;
  translator: string;
  editor: string;
  tags: string[];
  publish_status?: number;
  publish_time?: string;
  publisher?: User;
  publisher_id?: number;
  view_count?: number;
}

// 分页返回数据结构
export interface PaginatedArticleData {
  articles: Article[];
  page: number;
  page_size: number;
  total: number;
}

// 统一结果结构
export interface ArticleListResult {
  success: boolean;
  message: string;
  data?: PaginatedArticleData;
}

export interface ArticleResult {
  success: boolean;
  message: string;
  data?: Article;
}

export const createArticle = async (
  params: CreateArticleParams
): Promise<ArticleResult> => {
  try {
    const body = {
      title: params.title.trim(),
      desc: params.description.trim(),
      content: params.content,
      category: params.category,
      license: params.license,
      source_link: params.source_link,
      cover_img: params.cover_img,
      tags: params.tags ?? [],
      author: params.author ?? '',
      translator: params.translator ?? '',
      editor: params.editor ?? '',
    };

    const response = await apiRequest<ArticleResult>('/articles', 'POST', body);

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: '文章创建成功',
        data: response.data as unknown as Article,
      };
    }

    return { success: false, message: '文章创建出错' };
  } catch (error: unknown) {
    console.error('文章活动异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

export const updateArticle = async (
  articleId: string,
  params: UpdateArticleParams
): Promise<ArticleResult> => {
  try {
    const body = {
      title: params.title.trim(),
      desc: params.description.trim(),
      content: params.content,
      category: params.category,
      source_link: params.source_link,
      cover_img: params.cover_img,
      tags: params.tags ?? [],
      author: params.author ?? '',
      translator: params.translator ?? '',
      editor: params.editor ?? '',
      license: params.license ?? '',
    };

    const response = await apiRequest<ArticleResult>(
      `/articles/${articleId}`,
      'PUT',
      body
    );

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '文章更新成功',
        data: response.data as unknown as Article,
      };
    }

    return { success: false, message: response.message ?? '文章更新失败' };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

export const getArticles = async (
  params: GetArticlesParams = {}
): Promise<ArticleListResult> => {
  try {
    const query = new URLSearchParams();

    if (params.keyword?.trim()) query.append('keyword', params.keyword.trim());
    if (params.tag?.trim()) query.append('tag', params.tag.trim());
    if (params.publish_status != null)
      query.append('publish_status', params.publish_status.toString());
    if (params.user_id != null)
      query.append('user_id', params.user_id.toString());

    query.append('category', params.category || '');
    query.append('order', params.order ?? 'desc');
    query.append('page', (params.page ?? 1).toString());
    query.append('page_size', (params.page_size ?? 6).toString());

    const response = await apiRequest<ArticleListResult>(
      `/articles?${query.toString()}`,
      'GET'
    );

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '获取文章列表成功',
        data: response.data as unknown as PaginatedArticleData,
      };
    }

    return { success: false, message: response.message ?? '获取文章列表失败' };
  } catch (error: unknown) {
    console.error('获取文章列表异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

export const getArticleById = async (articleId: string): Promise<ArticleResult> => {
  try {
    if (!articleId) {
      return { success: false, message: '文章ID不能为空' };
    }

    const response = await apiRequest<ArticleResult>(`/articles/${articleId}`, 'GET');

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '获取文章成功',
        data: response.data as unknown as Article,
      };
    }

    return { success: false, message: response.message ?? '获取文章失败' };
  } catch (error: unknown) {
    console.error('获取文章异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

// 删除事件
export const deleteArticle = async (articleId: number): Promise<ArticleResult> => {
  try {
    const response = await apiRequest<ArticleResult>(`/articles/${articleId}`, 'DELETE');

    if (response.code === 200) {
      return { success: true, message: response.message ?? '删除成功' };
    }

    return { success: false, message: response.message ?? '删除失败' };
  } catch (error: unknown) {
    console.error('删除文章异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

// 定义支持format方法的类型
interface Formattable {
  format: (pattern: string) => string;
}

// 工具函数：格式化日期时间
export const formatDateTime = (date: Date | Formattable | string | null | undefined, time: Date | Formattable | string | null | undefined): string => {
  try {
    if (!date || !time) return '';

    if (
      typeof (date as Formattable)?.format === 'function' &&
      typeof (time as Formattable)?.format === 'function'
    ) {
      return `${(date as Formattable).format('YYYY-MM-DD')} ${(time as Formattable).format('HH:mm:ss')}`;
    }

    if (date instanceof Date && time instanceof Date) {
      const dateStr = date.toISOString().split('T')[0];
      const timeStr = time.toTimeString().split(' ')[0];
      return `${dateStr} ${timeStr}`;
    }

    if (typeof date === 'string' && typeof time === 'string') {
      return `${date} ${time}`;
    }

    return '';
  } catch (error) {
    console.error('格式化日期时间失败:', error);
    return '';
  }
};

export const updateArticlePublishStatus = async (
  articleId: string,
  publishStatus: number
): Promise<ArticleResult> => {
  try {
    const body = {
      publish_status: publishStatus,
    };

    const response = await apiRequest<ArticleResult>(
      `/articles/${articleId}/status`,
      'PUT',
      body
    );

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '文章状态更新成功',
        data: response.data as unknown as Article,
      };
    }

    return { success: false, message: response.message ?? '文章状态更新失败' };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};
