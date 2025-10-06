import { Calendar, MapPin, Users, Video } from 'lucide-react'
import Link from 'next/link'
import styles from './Events.module.css'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Tag } from 'antd'
import { useAuth } from '@/contexts/AuthContext'
import { getEvents } from '@/pages/api/event'
import { useTranslation } from '../../../hooks/useTranslation'

export function formatTime(isoTime: string): string {
  return dayjs(isoTime).format('YYYY年M月D日')
}

interface Event {
  ID: number
  title: string
  start_time: string
  event_mode: string
  location?: string
  status: number
  participants: number
  tags?: string[]
}


export default function EventSection() {
  // 使用统一的认证上下文，避免重复调用 useSession
  const { status } = useAuth()
  const { t } = useTranslation()
  const [events, setEvents] = useState<any[]>([])

 // 加载事件列表
   const loadEvents = async () => {
     try {
       const queryParams = {
         page: 1,
         page_size: 3,
         publish_status: 2,
         status: 3,
       };
 
       const result = await getEvents(queryParams);
 
       if (result.success && result.data) {
         // 处理后端返回的数据结构
         if (result.data.events && Array.isArray(result.data.events)) {
           setEvents(result.data.events);
         } else if (Array.isArray(result.data)) {
           setEvents(result.data);
         } else {
           console.warn('API 返回的数据格式不符合预期:', result.data);
           setEvents([]);
         }
       } else {
         console.error('获取事件列表失败:', result.message);
         setEvents([]);
       }
     } catch (error) {
       console.error('加载事件列表异常:', error);
       setEvents([]);
     }
   };

  // 组件挂载时加载数据，但避免在认证过程中重复请求
  useEffect(() => {
    if (!status || status !== 'loading') {
      loadEvents()
    }
  }, [status])

  return (
    <section className={styles.activities}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('homepage.events.title')}</h2>
          <p className={styles.sectionDescription}>
            {t('homepage.events.description')}
          </p>
        </div>
        <div className={styles.activitiesGrid}>
          {events.map((event, index) => (
            <div key={index} className={styles.activityCard}>
              <div className={styles.activityCardGlow}></div>
              <div className={styles.activityCardHeader}>
                <div className={styles.activityMeta}>
                  <span
                    className={`${styles.activityBadge} ${
                      event.status === 0
                        ? styles.activityBadgeInactive
                        : event.status === 1
                          ? styles.activityBadgeActive
                          : styles.activityBadgeEnded
                    }`}
                  >
                    {event.status === 0
                      ? t('homepage.events.status.notStarted')
                      : event.status === 1
                        ? t('homepage.events.status.inProgress')
                        : t('homepage.events.status.ended')}
                  </span>
                  {event.participants !== 0 && (
                    <div className={styles.activityParticipants}>
                      <Users className={styles.activityIcon} />
                      {event.participants}
                    </div>
                  )}
                </div>
                <h3 className={styles.activityTitle}>{event.title}</h3>
                <p className={styles.activityDescription}>{event.description}</p>
              </div>
              <div className={styles.activityCardContent}>
                <div className={styles.activityInfo}>
                  <div className={styles.activityInfoItem}>
                    <Calendar className={styles.activityIcon} />
                    {formatTime(event.start_time)}
                  </div>
                  <div className={styles.activityInfoItem}>
                    {event.event_mode === '线上活动' ? (
                      <Video className={styles.activityIcon} />
                    ) : (
                      <MapPin className={styles.activityIcon} />
                    )}
                    {event.event_mode === '线上活动'
                      ? t('homepage.events.mode.online')
                      : event.location}
                  </div>
                </div>
                {/* 标签展示区 */}
                {event.tags && event.tags.length > 0 && (
                  <div className={styles.tagsContainer}>
                    {event.tags
                      .slice(0, 3)
                      .map((tag: string, index: number) => (
                        <Tag key={index} className={styles.tag}>
                          {tag}
                        </Tag>
                      ))}
                    {/* {event.tags.length > 3 && <Tag className={styles.moreTag}>+{event.tags.length - 3}</Tag>} */}
                  </div>
                )}
                <Link href={`/events/${event.ID}`} passHref>
                  <button className={styles.activityButton}>{t('homepage.events.learnMore')}</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sectionFooter}>
          <Link href="/events">
            <button className={styles.moreButton}>
              <Calendar className={styles.buttonIcon} />
              {t('homepage.events.viewMore')}
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
