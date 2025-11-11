import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export interface GoogleCalendarEventParams {
  title: string;
  description?: string;
  location?: string;
  startTime: string;
  endTime?: string;
}

export function generateGoogleCalendarUrl(params: GoogleCalendarEventParams): string {
  const { title, description, location, startTime, endTime } = params;
  
  // 格式化日期时间为谷歌日历所需的格式 (YYYYMMDDTHHMMSSZ)
  const formatDateTime = (dateTime: string): string => {
    return dayjs(dateTime).utc().format('YYYYMMDD[T]HHmmss[Z]');
  };

  // 计算结束时间，如果没有提供则默认为开始时间+2小时
  const endDateTime = endTime ? formatDateTime(endTime) : formatDateTime(dayjs(startTime).add(2, 'hour').toISOString());
  
  const params_obj = {
    action: 'TEMPLATE',
    text: title,
    dates: `${formatDateTime(startTime)}/${endDateTime}`,
    details: description || '',
    location: location || '',
  };

  // 构建 URL 查询参数
  const searchParams = new URLSearchParams();
  Object.entries(params_obj).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });

  return `https://calendar.google.com/calendar/render?${searchParams.toString()}`;
}

export function addToGoogleCalendar(params: GoogleCalendarEventParams): void {
  const url = generateGoogleCalendarUrl(params);
  window.open(url, '_blank');
}