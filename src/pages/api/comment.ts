import { apiRequest } from './api';

// 评论相关类型定义
export interface Comment {
  ID: number;
  content: string;
  user_id: number;
  user: {
    ID: number;
    username: string;
    avatar: string;
  };
  target_type: 'article' | 'event';
  target_id: number;
  parent_id?: number;
  replies?: Comment[];
  reply_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCommentParams {
  content: string;
  target_type: 'article' | 'event';
  target_id: number;
  parent_id?: number;
}

export interface GetCommentsParams {
  target_type: 'article' | 'event';
  target_id: number;
  page?: number;
  page_size?: number;
  order?: 'asc' | 'desc';
}

export interface UpdateCommentParams {
  content: string;
}

// 构建查询参数字符串
const buildQueryString = (params: Record<string, unknown>): string => {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  return query ? `?${query}` : '';
};

// 获取评论列表
export const getComments = async (params: GetCommentsParams) => {
  const queryString = buildQueryString(params as unknown as Record<string, unknown>);
  return apiRequest<Comment[]>(`/comments${queryString}`, 'GET');
};

// 创建评论
export const createComment = async (params: CreateCommentParams) => {
  return apiRequest<Comment>('/comments', 'POST', params as unknown as Record<string, unknown>);
};

// 更新评论
export const updateComment = async (id: number, params: UpdateCommentParams) => {
  return apiRequest<Comment>(`/comments/${id}`, 'PUT', params as unknown as Record<string, unknown>);
};

// 删除评论
export const deleteComment = async (id: number) => {
  return apiRequest<void>(`/comments/${id}`, 'DELETE');
};

// 获取评论回复
export const getCommentReplies = async (commentId: number, params?: { page?: number; page_size?: number }) => {
  const queryString = params ? buildQueryString(params) : '';
  return apiRequest<Comment[]>(`/comments/${commentId}/replies${queryString}`, 'GET');
};