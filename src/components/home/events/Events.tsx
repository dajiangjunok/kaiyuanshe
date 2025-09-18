import { Calendar, MapPin, Users, Video } from 'lucide-react'
import Link from 'next/link'
import styles from './Events.module.css'
import { useEffect, useState, useCallback } from 'react'
// import { getEvents } from '@/pages/api/event'
import dayjs from 'dayjs'
import { Tag } from 'antd'
import { useAuth } from '@/contexts/AuthContext'

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
  const [events, setEvents] = useState<Event[]>([])

  const loadEvents = useCallback(async () => {
    try {
      const queryParams = {
        keyword: '',
        tag: '',
        order: 'desc' as const,
        page: 1,
        page_size: 3,
        status: 3,
        location: '',
        event_mode: '',
        evnet_type: '',
        publish_status: 2
      }

      // const result = await getEvents(queryParams)
      const result = {
        code: 200,
        data: {
          events: [
            {
              ID: 26,
              CreatedAt: '2025-09-13T18:54:32.196927+08:00',
              UpdatedAt: '2025-09-16T12:30:18.945167+08:00',
              DeletedAt: null,
              title: '中国开源年会 2024',
              description:
                '中关村国家自主创新示范区-会议中心，北京市海淀区新建宫门路2号',
              event_mode: '线下活动',
              event_type: 'meetup',
              location: '北京（中关村国家自主创新示范区）',
              link: '',
              registration_deadline: null,
              registration_link: 'https://luma.com/uvcej0qt',
              start_time: '2025-08-23T14:30:00+08:00',
              end_time: '2025-08-23T16:00:00+08:00',
              cover_img:
                'https://res.cloudinary.com/gmonad/image/upload/v1757760841/monad_img/tddwoyfu6a4klunrvpn4.jpg',
              tags: ['社区聚会', '北京'],
              participants: 21,
              status: 2,
              publish_status: 2,
              publish_time: '2025-09-13T18:55:47.215554+08:00',
              twitter: 'https://x.com/_Seven7777777/status/1958074798833377594',
              user_id: 3,
              User: null
            }
          ],
          page: 1,
          page_size: 1,
          total: 1
        },
        message: 'query success'
      }

      if (result.data) {
        // 处理后端返回的数据结构
        if (result.data.events && Array.isArray(result.data.events)) {
          setEvents(result.data.events)
        } else if (Array.isArray(result.data)) {
          setEvents(result.data)
        } else {
          console.warn('API 返回的数据格式不符合预期:', result.data)
          setEvents([])
        }
      } else {
        setEvents([])
      }
    } catch (error) {
      console.error('加载活动列表异常:', error)
      setEvents([])
    }
  }, [])

  // 组件挂载时加载数据，但避免在认证过程中重复请求
  useEffect(() => {
    if (!status || status !== 'loading') {
      loadEvents()
    }
  }, [status, loadEvents])

  return (
    <section className={styles.activities}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>社区活动</h2>
          <p className={styles.sectionDescription}>
            发现精彩活动，链接更多 开源
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
                      ? '未开始'
                      : event.status === 1
                        ? '进行中'
                        : '已结束'}
                  </span>
                  {event.participants !== 0 && (
                    <div className={styles.activityParticipants}>
                      <Users className={styles.activityIcon} />
                      {event.participants}
                    </div>
                  )}
                </div>
                <h3 className={styles.activityTitle}>{event.title}</h3>
                {/* <p className={styles.activityDescription}>{event.description}</p> */}
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
                      ? '线上活动'
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
                  <button className={styles.activityButton}>了解详情</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sectionFooter}>
          <Link href="/events">
            <button className={styles.moreButton}>
              <Calendar className={styles.buttonIcon} />
              查看更多活动
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
