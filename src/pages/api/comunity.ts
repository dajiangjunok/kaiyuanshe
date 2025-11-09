import { apiRequest } from './api';

// 社区活动相关类型定义
export interface Community {
  ID: number;
  city: string;
  intro: string;
  cover: string;
  register_link: string;
  start_date: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCommunityParams {
  city: string;
  intro: string;
  cover: string;
  register_link: string;
  start_date: string;
}

export interface UpdateCommunityParams {
  city?: string;
  intro?: string;
  cover?: string;
  register_link?: string;
  start_date?: string;
}

export interface GetCommunitiesParams {
  city?: string;
  page?: number;
  page_size?: number;
  order_by?: 'created_at' | 'start_date';
  order?: 'asc' | 'desc';
}

// 分页返回数据结构
export interface PaginatedCommunityData {
  communities: Community[];
  page: number;
  page_size: number;
  total: number;
}

// 统一结果结构
export interface CommunityListResult {
  success: boolean;
  message: string;
  data?: PaginatedCommunityData;
}

export interface CommunityResult {
  success: boolean;
  message: string;
  data?: Community;
}

// 创建社区活动
export const createCommunity = async (
  params: CreateCommunityParams
): Promise<CommunityResult> => {
  try {
    const body = {
      city: params.city.trim(),
      intro: params.intro.trim(),
      cover: params.cover,
      register_link: params.register_link,
      start_date: params.start_date,
    };

    const response = await apiRequest<CommunityResult>('/communities', 'POST', body);

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: '社区创建成功',
        data: response.data as unknown as Community,
      };
    }

    return { 
      success: false, 
      message: response.message || '社区创建失败' 
    };
  } catch (error: unknown) {
    console.error('创建社区异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

// 更新社区活动
export const updateCommunity = async (
  communityId: number,
  params: UpdateCommunityParams
): Promise<CommunityResult> => {
  try {
    const body: Record<string, unknown> = {};
    
    if (params.city !== undefined) body.city = params.city.trim();
    if (params.intro !== undefined) body.intro = params.intro.trim();
    if (params.cover !== undefined) body.cover = params.cover;
    if (params.register_link !== undefined) body.register_link = params.register_link;
    if (params.start_date !== undefined) body.start_date = params.start_date;

    const response = await apiRequest<CommunityResult>(
      `/communities/${communityId}`,
      'PUT',
      body
    );

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '社区更新成功',
        data: response.data as unknown as Community,
      };
    }

    return { 
      success: false, 
      message: response.message ?? '社区更新失败' 
    };
  } catch (error: unknown) {
    console.error('更新社区异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

// 获取社区活动列表
export const getCommunities = async (
  params: GetCommunitiesParams = {}
): Promise<CommunityListResult> => {
  try {
    const query = new URLSearchParams();

    if (params.city?.trim()) query.append('city', params.city.trim());
    if (params.order_by) query.append('order_by', params.order_by);
    
    query.append('order', params.order ?? 'desc');
    query.append('page', (params.page ?? 1).toString());
    query.append('page_size', (params.page_size ?? 10).toString());

    const response = await apiRequest<CommunityListResult>(
      `/communities?${query.toString()}`,
      'GET'
    );

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '获取社区列表成功',
        data: response.data as unknown as PaginatedCommunityData,
      };
    }

    return { 
      success: false, 
      message: response.message ?? '获取社区列表失败' 
    };
  } catch (error: unknown) {
    console.error('获取社区列表异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

// 获取单个社区活动详情
export const getCommunity = async (communityId: number): Promise<CommunityResult> => {
  try {
    if (!communityId) {
      return { success: false, message: '社区ID不能为空' };
    }

    const response = await apiRequest<CommunityResult>(`/communities/${communityId}`, 'GET');

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '获取社区成功',
        data: response.data as unknown as Community,
      };
    }

    return { 
      success: false, 
      message: response.message ?? '获取社区失败' 
    };
  } catch (error: unknown) {
    console.error('获取社区异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

// 删除社区活动
export const deleteCommunity = async (communityId: number): Promise<CommunityResult> => {
  try {
    const response = await apiRequest<CommunityResult>(`/communities/${communityId}`, 'DELETE');

    if (response.code === 200) {
      return { 
        success: true, 
        message: response.message ?? '删除成功' 
      };
    }

    return { 
      success: false, 
      message: response.message ?? '删除失败' 
    };
  } catch (error: unknown) {
    console.error('删除社区异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

// 搜索社区活动
export const searchCommunities = async (
  keyword: string, 
  params?: Omit<GetCommunitiesParams, 'city'>
): Promise<CommunityListResult> => {
  try {
    const query = new URLSearchParams();

    if (keyword?.trim()) query.append('keyword', keyword.trim());
    if (params?.order_by) query.append('order_by', params.order_by);
    
    query.append('order', params?.order ?? 'desc');
    query.append('page', (params?.page ?? 1).toString());
    query.append('page_size', (params?.page_size ?? 10).toString());

    const response = await apiRequest<CommunityListResult>(
      `/communities/search?${query.toString()}`,
      'GET'
    );

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '搜索社区成功',
        data: response.data as unknown as PaginatedCommunityData,
      };
    }

    return { 
      success: false, 
      message: response.message ?? '搜索社区失败' 
    };
  } catch (error: unknown) {
    console.error('搜索社区异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};