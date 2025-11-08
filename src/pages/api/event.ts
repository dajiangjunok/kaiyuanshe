import { apiRequest } from './api';

// 创建事件请求参数接口
export interface CreateEventParams {
  title: string;
  description: string;
  event_mode: '线上活动' | '线下活动';
  event_type: 'meetup' | 'ama' | 'hackathon' | 'workshop';
  location: string;
  link: string;
  start_time: string;
  end_time: string;
  cover_img: string;
  tags: string[];
  twitter: string;
  registration_deadline?: string;
  registration_link?: string;
}

export interface UpdateEventParams {
  title: string;
  description: string;
  event_mode: '线上活动' | '线下活动';
  event_type: 'meetup' | 'ama' | 'hackathon' | 'workshop';
  location: string;
  link: string;
  start_time: string;
  end_time: string;
  cover_img: string;
  tags: string[];
  twitter: string;
  registration_deadline?: string;
  registration_link?: string;
}

export interface GetEventsParams {
  keyword?: string;
  tag?: string;
  order?: 'asc' | 'desc';
  page?: number;
  page_size?: number;
  status?: string | number;
  location?: string;
  event_mode?: string;
  event_type?: string;
  publish_status?: number;
  start_date?: string;
  end_date?: string;
}

export interface Event {
  ID: number;
  title: string;
  CreatedAt: string;
  UpdatedAt: string;
  description: string;
  event_mode: string;
  event_type: string;
  location: string;
  link: string;
  start_time: string;
  end_time: string;
  cover_img: string;
  tags: string[];
  twitter: string;
  participants: number;
  registration_link: string;
  registration_deadline: string;
}

// 分页返回数据结构
export interface PaginatedEventData {
  events: Event[];
  page: number;
  page_size: number;
  total: number;
}

// 统一结果结构
export interface EventListResult {
  success: boolean;
  message: string;
  data?: PaginatedEventData;
}

export interface EventResult {
  success: boolean;
  message: string;
  data?: Event;
}

export const createEvent = async (
  params: CreateEventParams
): Promise<EventResult> => {
  try {
    const body = {
      title: params.title.trim(),
      desc: params.description.trim(),
      event_mode: params.event_mode,
      event_type: params.event_type,
      location: params.location ?? '',
      link: params.link ?? '',
      start_time: params.start_time,
      end_time: params.end_time,
      cover_img: params.cover_img,
      tags: params.tags ?? [],
      twitter: params.twitter ?? '',
      registration_link: params.registration_link ?? '',
      registration_deadline: params.registration_deadline ?? '',
    };

    const response = await apiRequest<EventResult>('/events', 'POST', body);

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '活动创建成功',
        data: response.data as unknown as Event,
      };
    }

    return { success: false, message: response.message ?? '活动创建失败' };
  } catch (error: unknown) {
    console.error('创建活动异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

// export const saveEventDraft = async (
//   params: CreateEventParams
// ): Promise<EventResult> => {
//   try {
//     const body = {
//       title: params.title.trim(),
//       desc: params.description.trim(),
//       event_mode: params.event_mode,
//       location: params.event_mode === '线下活动' ? params.location.trim() : '',
//       link: params.event_mode === '线上活动' ? params.link.trim() : '',
//       start_time: params.start_time,
//       end_time: params.end_time,
//       cover_img: params.cover_img,
//       tags: params.tags ?? [],
//       twitter: params.twitter ?? '',
//       ...(params.max_participants != null && {
//         max_participants: params.max_participants,
//       }),
//       ...(params.registration_deadline && {
//         registration_deadline: params.registration_deadline,
//       }),
//       ...(typeof params.require_approval === 'boolean' && {
//         require_approval: params.require_approval,
//       }),
//       ...(typeof params.allow_waitlist === 'boolean' && {
//         allow_waitlist: params.allow_waitlist,
//       }),
//     };

//     const response = await apiRequest<EventResult>(
//       '/events/draft',
//       'POST',
//       body
//     );

//     if (response.code === 200 && response.data) {
//       return {
//         success: true,
//         message: response.message ?? '保存草稿成功',
//         data: response.data as unknown as Event,
//       };
//     }

//     return { success: false, message: response.message ?? '保存草稿失败' };
//   } catch (error: unknown) {
//     console.error('保存草稿异常:', error);
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : '网络错误，请稍后重试',
//     };
//   }
// };

export const updateEventDraft = async (
  eventId: string,
  params: UpdateEventParams
): Promise<EventResult> => {
  try {
    const body = {
      title: params.title.trim(),
      desc: params.description.trim(),
      event_mode: params.event_mode,
      event_type: params.event_type,
      location: params.location,
      link: params.link,
      start_time: params.start_time,
      end_time: params.end_time,
      cover_img: params.cover_img,
      tags: params.tags ?? [],
      twitter: params.twitter ?? '',
      registration_deadline: params.registration_deadline,
      registration_link: params.registration_link,
    };

    const response = await apiRequest<EventResult>(
      `/events/draft/${eventId}`,
      'PUT',
      body
    );

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '活动草稿更新成功',
        data: response.data as unknown as Event,
      };
    }

    return { success: false, message: response.message ?? '活动草稿更新失败' };
  } catch (error: unknown) {
    console.error('活动草稿更新异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

export const updateEvent = async (
  eventId: string,
  params: UpdateEventParams
): Promise<EventResult> => {
  try {
    const body = {
      title: params.title.trim(),
      desc: params.description.trim(),
      event_mode: params.event_mode,
      event_type: params.event_type,
      location: params.location,
      link: params.link,
      start_time: params.start_time,
      end_time: params.end_time,
      cover_img: params.cover_img,
      tags: params.tags ?? [],
      twitter: params.twitter ?? '',
      registration_deadline: params.registration_deadline,
      registration_link: params.registration_link,
    };

    const response = await apiRequest<EventResult>(
      `/events/${eventId}`,
      'PUT',
      body
    );

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '活动创建成功',
        data: response.data as unknown as Event,
      };
    }

    return { success: false, message: response.message ?? '活动创建失败' };
  } catch (error: unknown) {
    console.error('创建活动异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

export const updateEventPublishStatus = async (
  eventId: string,
  publishStatus: number
): Promise<EventResult> => {
  try {
    const body = {
      publish_status: publishStatus,
    };

    const response = await apiRequest<EventResult>(
      `/events/${eventId}/status`,
      'PUT',
      body
    );

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '活动状态更新成功',
        data: response.data as unknown as Event,
      };
    }

    return { success: false, message: response.message ?? '活动状态更新失败' };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

export const getEvents = async (
  params: GetEventsParams = {}
): Promise<EventListResult> => {
  try {
    const query = new URLSearchParams();

    if (params.keyword?.trim()) query.append('keyword', params.keyword.trim());
    if (params.tag?.trim()) query.append('tag', params.tag.trim());
    if (params.location?.trim())
      query.append('location', params.location.trim());
    if (params.event_mode?.trim())
      query.append('event_mode', params.event_mode.trim());
    if (params.event_type?.trim())
      query.append('event_type', params.event_type.trim());

    if (params.status != null) query.append('status', params.status.toString());
    if (params.publish_status != null)
      query.append('publish_status', params.publish_status.toString());

    if (params.start_date?.trim()) query.append('start_date', params.start_date.trim());
    if (params.end_date?.trim()) query.append('end_date', params.end_date.trim());

    query.append('order', params.order ?? 'desc');
    query.append('page', (params.page ?? 1).toString());
    query.append('page_size', (params.page_size ?? 6).toString());

    const response = await apiRequest<EventListResult>(
      `/events?${query.toString()}`,
      'GET'
    );

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '获取活动列表成功',
        data: response.data as unknown as PaginatedEventData,
      };
    }

    return { success: false, message: response.message ?? '获取活动列表失败' };
  } catch (error: unknown) {
    console.error('获取活动列表异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

// export const getEventDrafts = async (
//   params: GetEventsParams = {}
// ): Promise<EventListResult> => {
//   try {
//     const query = new URLSearchParams();

//     query.append('page', (params.page ?? 1).toString());
//     query.append('page_size', (params.page_size ?? 6).toString());

//     const response = await apiRequest<EventListResult>(
//       `/events/draft?${query.toString()}`,
//       'GET'
//     );

//     if (response.code === 200 && response.data) {
//       return {
//         success: true,
//         message: response.message ?? '获取活动草稿列表成功',
//         data: response.data as unknown as PaginatedEventData,
//       };
//     }

//     return {
//       success: false,
//       message: response.message ?? '获取活动草稿列表失败',
//     };
//   } catch (error: unknown) {
//     console.error('获取活动草稿列表异常:', error);
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : '网络错误，请稍后重试',
//     };
//   }
// };

// 获取单个事件详情
export const getEventById = async (eventId: string): Promise<EventResult> => {
  try {
    if (!eventId) {
      return { success: false, message: '活动ID不能为空' };
    }

    const response = await apiRequest<EventResult>(`/events/${eventId}`, 'GET');

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '获取活动成功',
        data: response.data as unknown as Event,
      };
    }

    return { success: false, message: response.message ?? '获取活动失败' };
  } catch (error: unknown) {
    console.error('获取活动异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

// 删除事件
export const deleteEvent = async (eventId: number): Promise<EventResult> => {
  try {
    const response = await apiRequest<EventResult>(
      `/events/${eventId}`,
      'DELETE'
    );

    if (response.code === 200) {
      return { success: true, message: response.message ?? '删除成功' };
    }

    return { success: false, message: response.message ?? '删除失败' };
  } catch (error: unknown) {
    console.error('删除活动异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

// 工具函数：格式化日期时间
export const formatDateTime = (date: unknown, time: unknown): string => {
  try {
    if (!date || !time) return '';

    if (
      typeof date?.format === 'function' &&
      typeof time?.format === 'function'
    ) {
      return `${date.format('YYYY-MM-DD')} ${time.format('HH:mm:ss')}`;
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


// venue
export interface Session {
  ID: number;
  title: string;
  address: string;
  description: string;
  producer: string;
  volunteer: string;
  event_id: number;
  created_at?: string;
  updated_at?: string;
  agendas: Agenda[];
}

export interface Agenda {
  ID: number;
  topic: string;
  start_time: string;
  end_time: string;
  session_id: number;
  created_at?: string;
  updated_at?: string;
  speakers: Speaker[];
}

export interface Speaker {
  ID: number;
  name: string;
  avatar: string;
  title: string;
  description: string;
  company: string;
  agenda_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSessionParams {
  title: string;
  description: string;
  address: string;
  producer: string;
  volunteer: string;
}

export interface AgendaParams {
  topic: string;
  start_time: string;
  end_time: string;
  speakers: SpeakerParams[];
}

export interface SpeakerParams {
  name: string;
  avatar?: string;
  title?: string;
  description?: string;
  company?: string;
}

export interface SessionResult {
  success: boolean;
  message: string;
  data?: Session;
}

export interface SessionsResult {
  success: boolean;
  message: string;
  data?: Session[];
}


export const createSession = async (
  eventId: string,
  params: CreateSessionParams
): Promise<SessionResult> => {
  try {
    const body = {
      title: params.title.trim(),
      address: params.address.trim(),
      description: params.description.trim(),
      producer: params.producer.trim(),
      volunteer: params.volunteer.trim(),
    };

    const response = await apiRequest<SessionResult>(`/events/${eventId}/venues`, 'POST', body);

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '会场创建成功',
        data: response.data as unknown as Session,
      };
    }

    return { success: false, message: response.message ?? '会场创建失败' };
  } catch (error: unknown) {
    console.error('创建会场异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

export const getSessionsByEvent = async (eventId: string): Promise<SessionsResult> => {
  try {
    const response = await apiRequest<SessionsResult>(`/events/${eventId}/venues`, 'GET');

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '获取会场列表成功',
        data: response.data as unknown as Session[],
      };
    }

    return { success: false, message: response.message ?? '获取会场列表失败' };
  } catch (error: unknown) {
    console.error('获取会场列表异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

export const updateSession = async (
  eventId: string,
  venueId: string,
  params: CreateSessionParams
): Promise<SessionResult> => {
  try {
    const body = {
      title: params.title.trim(),
      description: params.description.trim(),
      producer: params.producer.trim(),
      volunteer: params.volunteer.trim(),
    };

    const response = await apiRequest<SessionResult>(`/events/${eventId}/venues/${venueId}`, 'PUT', body);

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '会场更新成功',
        data: response.data as unknown as Session,
      };
    }

    return { success: false, message: response.message ?? '会场更新失败' };
  } catch (error: unknown) {
    console.error('更新会场异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

export const deleteSession = async (eventId: string, venueId: string): Promise<SessionResult> => {
  try {
    const response = await apiRequest<SessionResult>(`/events/${eventId}/venues/${venueId}`, 'DELETE');

    if (response.code === 200) {
      return {
        success: true,
        message: response.message ?? '会场删除成功',
      };
    }

    return { success: false, message: response.message ?? '会场删除失败' };
  } catch (error: unknown) {
    console.error('删除会场异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};


export interface AddAgendaParams {
  topic: string;
  start_time: string;
  end_time: string;
  speakers: SpeakerParams[];
}

export interface AgendaResult {
  success: boolean;
  message: string;
  data?: Agenda;
}

/**
 * 为会场添加议程
 */
export const addAgendaToSession = async (
  sessionId: string,
  params: AddAgendaParams
): Promise<AgendaResult> => {
  try {
    const body = {
      topic: params.topic.trim(),
      start_time: params.start_time,
      end_time: params.end_time,
      speakers: params.speakers.map(speaker => ({
        name: speaker.name.trim(),
        avatar: speaker.avatar ?? '',
        title: speaker.title ?? '',
        description: speaker.description ?? '',
        company: speaker.company ?? '',
      })),
    };

    const response = await apiRequest<AgendaResult>(`/venues/${sessionId}/agendas`, 'POST', body);

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '议程添加成功',
        data: response.data as unknown as Agenda,
      };
    }

    return { success: false, message: response.message ?? '议程添加失败' };
  } catch (error: unknown) {
    console.error('添加议程异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

/**
 * 获取会场的所有议程
 */
export const getAgendasBySession = async (
  sessionId: string
): Promise<SessionsResult> => {
  try {
    const response = await apiRequest<SessionsResult>(`/sessions/${sessionId}/agendas`, 'GET');

    if (response.code === 200 && response.data) {
      return {
        success: true,
        message: response.message ?? '获取议程成功',
        data: response.data as unknown as Session[],
      };
    }

    return { success: false, message: response.message ?? '获取议程失败' };
  } catch (error: unknown) {
    console.error('获取议程异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};

/**
 * 删除议程
 */
export const deleteAgenda = async (
  agendaId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiRequest<{ success: boolean; message: string }>(
      `/venues/agendas/${agendaId}`,
      'DELETE'
    );

    if (response.code === 200) {
      return {
        success: true,
        message: response.message ?? '议程删除成功',
      };
    }

    return { success: false, message: response.message ?? '议程删除失败' };
  } catch (error: unknown) {
    console.error('删除议程异常:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误，请稍后重试',
    };
  }
};