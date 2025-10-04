import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Badge,
  Card,
  Typography,
  Tag,
  Button,
  Modal,
  Drawer,
  Space,
  Empty
} from 'antd'
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Globe,
  Share2,
  Clock
} from 'lucide-react'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import styles from './index.module.css'

const { Title, Text, Paragraph } = Typography

// 启用 dayjs UTC 插件
dayjs.extend(utc)

interface User {
  id: number
  name: string
  email?: string
}

interface Meeting {
  CreatedAt: string
  DeletedAt: string | null
  ID: number
  UpdatedAt: string
  User: User | null
  cover_img: string
  description: string
  end_time: string
  event_mode: string
  event_type: string
  link: string
  location: string
  participants: number
  publish_status: number
  publish_time: string
  registration_deadline: string | null
  registration_link: string
  start_time: string
  status: number
  tags: string[]
  title: string
  twitter: string
  user_id: number
}

interface MeetingsByDate {
  [key: string]: Meeting[]
}

// 模拟会议数据
const mockMeetings: Meeting[] = [
  {
    CreatedAt: dayjs().subtract(7, 'days').toISOString(),
    DeletedAt: null,
    ID: 1,
    UpdatedAt: dayjs().subtract(5, 'days').toISOString(),
    User: null,
    cover_img: "https://res.cloudinary.com/gmonad/image/upload/v1758962717/monad_img/tihm9lbtayzfqcvizvun.png",
    description: "开源年会成都场活动，包含技术分享、闪电演讲、展位交流等多种形式。聚集开源社区的开发者们，一起交流技术、分享经验、探讨开源发展趋势。",
    end_time: dayjs().add(1, 'day').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    event_mode: "线下活动",
    event_type: "meetup",
    link: "",
    location: "成都",
    participants: 189,
    publish_status: 2,
    publish_time: dayjs().subtract(5, 'days').toISOString(),
    registration_deadline: null,
    registration_link: "",
    start_time: dayjs().add(1, 'day').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    status: 2,
    tags: ["开源", "技术", "社区"],
    title: "开源年会成都场丨码农在 1024 技术趴上可以做什么？",
    twitter: "https://fcc-cd.dev/activity/conference/coscon-2020-chengdu/",
    user_id: 1
  },
  {
    CreatedAt: dayjs().subtract(10, 'days').toISOString(),
    DeletedAt: null,
    ID: 2,
    UpdatedAt: dayjs().subtract(3, 'days').toISOString(),
    User: {
      id: 1,
      name: "开源社管理员",
      email: "admin@kaiyuanshe.cn"
    },
    cover_img: "https://res.cloudinary.com/gmonad/image/upload/v1758962718/monad_img/javascript_meetup.png",
    description: "JavaScript 前端技术分享会，邀请业界专家分享最新的前端技术趋势、框架使用经验和最佳实践。适合前端开发者、全栈工程师参与。",
    end_time: dayjs().add(5, 'days').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    event_mode: "线上活动",
    event_type: "tech-talk",
    link: "https://meet.example.com/js-meetup",
    location: "线上",
    participants: 85,
    publish_status: 1,
    publish_time: dayjs().subtract(3, 'days').toISOString(),
    registration_deadline: dayjs().add(3, 'days').toISOString(),
    registration_link: "https://event.kaiyuanshe.cn/js-meetup/register",
    start_time: dayjs().add(5, 'days').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    status: 1,
    tags: ["JavaScript", "前端", "技术分享"],
    title: "JavaScript 前端技术分享会",
    twitter: "https://twitter.com/kaiyuanshe/status/123456",
    user_id: 1
  },
  {
    CreatedAt: dayjs().subtract(5, 'days').toISOString(),
    DeletedAt: null,
    ID: 3,
    UpdatedAt: dayjs().subtract(1, 'day').toISOString(),
    User: {
      id: 2,
      name: "技术委员会",
      email: "tech@kaiyuanshe.cn"
    },
    cover_img: "https://res.cloudinary.com/gmonad/image/upload/v1758962719/monad_img/ai_workshop.png",
    description: "人工智能与开源技术工作坊，探讨 AI 技术在开源项目中的应用，包括机器学习框架、自然语言处理工具等。**适合有一定编程基础的参与者**。",
    end_time: dayjs().add(10, 'days').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    event_mode: "混合活动",
    event_type: "workshop",
    link: "https://workshop.kaiyuanshe.cn/ai-tech",
    location: "北京中关村软件园",
    participants: 42,
    publish_status: 2,
    publish_time: dayjs().subtract(1, 'day').toISOString(),
    registration_deadline: dayjs().add(8, 'days').toISOString(),
    registration_link: "https://event.kaiyuanshe.cn/ai-workshop/register",
    start_time: dayjs().add(10, 'days').format('YYYY-MM-DDTHH:mm:ss+08:00'),
    status: 1,
    tags: ["人工智能", "机器学习", "工作坊", "开源"],
    title: "人工智能与开源技术工作坊",
    twitter: "https://twitter.com/kaiyuanshe/status/789012",
    user_id: 2
  }
]

const MeetingCalendar: React.FC = () => {
  const [meetings] = useState<Meeting[]>(mockMeetings)
  const [meetingsByDate, setMeetingsByDate] = useState<MeetingsByDate>({})
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const [selectedMeetings, setSelectedMeetings] = useState<Meeting[]>([])
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)

  useEffect(() => {
    // 按日期组织会议
    const meetingsByDateMap: MeetingsByDate = {}
    meetings.forEach((meeting: Meeting) => {
      const dateKey = dayjs(meeting.start_time).format('YYYY-MM-DD')
      if (!meetingsByDateMap[dateKey]) {
        meetingsByDateMap[dateKey] = []
      }
      meetingsByDateMap[dateKey].push(meeting)
    })
    setMeetingsByDate(meetingsByDateMap)
  }, [meetings])

  // 获取会议状态颜色类名
  const getMeetingStatusClass = (meeting: Meeting) => {
    const now = dayjs()
    const startTime = dayjs(meeting.start_time)
    const endTime = meeting.end_time
      ? dayjs(meeting.end_time)
      : startTime.add(2, 'hour')

    if (now.isBefore(startTime)) {
      return styles.meetingUpcoming
    } else if (now.isAfter(endTime)) {
      return styles.meetingEnded
    } else {
      return styles.meetingOngoing
    }
  }

  // 获取会议类型颜色
  const getMeetingTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      理事会: '#722ed1',
      顾问委员会: '#13c2c2',
      KCC: '#eb2f96',
      工作组: '#52c41a',
      委员会: '#1890ff'
    }
    return colors[type] || '#1890ff'
  }

  // 生成Google Calendar链接
  const generateGoogleCalendarLink = (meeting: Meeting) => {
    const startTime = dayjs(meeting.start_time)
    const endTime = meeting.end_time
      ? dayjs(meeting.end_time)
      : startTime.add(2, 'hour')

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: meeting.title,
      dates: `${startTime.utc().format('YYYYMMDDTHHmmss')}Z/${endTime.utc().format('YYYYMMDDTHHmmss')}Z`,
      details:
        meeting.description +
        (meeting.link ? `\n\n活动链接：${meeting.link}` : '') +
        (meeting.registration_link ? `\n\n报名链接：${meeting.registration_link}` : ''),
      location: meeting.location,
      sprop: 'name:开源社活动日历'
    })

    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  // 导出到Google Calendar
  const exportToGoogleCalendar = (meeting: Meeting) => {
    const googleCalendarUrl = generateGoogleCalendarLink(meeting)
    window.open(googleCalendarUrl, '_blank')
  }

  // 日历单元格渲染
  const dateCellRender = (value: Dayjs) => {
    const dateKey = value.format('YYYY-MM-DD')
    const dayMeetings = meetingsByDate[dateKey] || []

    if (dayMeetings.length === 0) return null

    return (
      <div className={styles.calendarMeetings}>
        {dayMeetings.slice(0, 3).map(meeting => (
          <div
            key={meeting.ID}
            className={`${styles.meetingItem} ${getMeetingStatusClass(meeting)}`}
            onClick={e => {
              e.stopPropagation()
              setSelectedMeeting(meeting)
              setModalVisible(true)
            }}
          >
            {meeting.title.length > 12
              ? meeting.title.substring(0, 12) + '...'
              : meeting.title}
          </div>
        ))}
        {dayMeetings.length > 3 && (
          <div
            className={styles.moreMeetings}
            onClick={e => {
              e.stopPropagation()
              setSelectedDate(value)
              setSelectedMeetings(dayMeetings)
              setDrawerVisible(true)
            }}
          >
            +{dayMeetings.length - 3} 更多
          </div>
        )}
      </div>
    )
  }

  // 月份单元格渲染
  const monthCellRender = (value: Dayjs) => {
    const monthMeetings = meetings.filter(meeting =>
      dayjs(meeting.start_time).isSame(value, 'month')
    )
    return monthMeetings.length ? (
      <div className="notes-month">
        <Badge
          count={monthMeetings.length}
          style={{ backgroundColor: '#1890ff' }}
        />
      </div>
    ) : null
  }

  return (
    <div className={styles.container}>
      <div className={styles.calendarWrapper}>
        {/* 标题 */}
        <h2 className={styles.title}>
          <CalendarIcon className={styles.titleIcon} />
          会议日历
        </h2>

        {/* 日历主体 */}
        <div className={styles.calendar}>
          <Calendar
            cellRender={(current, info) => {
              if (info.type === 'date') {
                return dateCellRender(current)
              }
              if (info.type === 'month') {
                return monthCellRender(current)
              }
              return info.originNode
            }}
            onSelect={date => {
              const dateKey = date.format('YYYY-MM-DD')
              const dayMeetings = meetingsByDate[dateKey] || []
              if (dayMeetings.length > 0) {
                setSelectedDate(date)
                setSelectedMeetings(dayMeetings)
                setDrawerVisible(true)
              }
            }}
          />
        </div>

        {/* 某日会议列表抽屉 */}
        <Drawer
          title={
            <div className={styles.drawerTitle}>
              <CalendarIcon className={styles.drawerIcon} />
              {selectedDate.format('YYYY年MM月DD日')} 的会议 (
              {selectedMeetings.length}场)
            </div>
          }
          width={700}
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
        >
          {selectedMeetings.length === 0 ? (
            <Empty description="当日暂无会议" />
          ) : (
            <div style={{ marginTop: '16px' }}>
              {selectedMeetings.map(meeting => (
                <Card
                  key={meeting.ID}
                  className={styles.meetingCard}
                  hoverable
                  onClick={() => {
                    setSelectedMeeting(meeting)
                    setModalVisible(true)
                  }}
                  actions={[
                    <Button
                      key="view"
                      type="text"
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        e.stopPropagation()
                        window.open(meeting.link, '_blank')
                      }}
                    >
                      加入活动
                    </Button>,
                    <Button
                      key="google-calendar"
                      type="text"
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        e.stopPropagation()
                        exportToGoogleCalendar(meeting)
                      }}
                    >
                      添加到Google日历
                    </Button>,
                    <Button
                      key="share"
                      type="text"
                      icon={<Share2 size={16} />}
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(
                          `会议：${meeting.title}\n时间：${dayjs(meeting.start_time).format('YYYY-MM-DD HH:mm')}`
                        )
                      }}
                    >
                      分享
                    </Button>
                  ].filter(Boolean)}
                >
                  <Card.Meta
                    title={
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span className={styles.meetingTitle}>
                          {meeting.title}
                        </span>
                        <Tag color={getMeetingTypeColor(meeting.event_type)}>
                          {meeting.event_type}
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <Paragraph
                          ellipsis={{ rows: 2 }}
                          className={styles.meetingDescription}
                        >
                          {meeting.description}
                        </Paragraph>
                        <div className={styles.meetingInfo}>
                          <div className={styles.meetingInfoItem}>
                            <Clock
                              size={14}
                              className={styles.meetingInfoIcon}
                            />
                            {dayjs(meeting.start_time).format('HH:mm')} -{' '}
                            {meeting.end_time
                              ? dayjs(meeting.end_time).format('HH:mm')
                              : '待定'}
                          </div>
                          <div className={styles.meetingInfoItem}>
                            {meeting.location === '线上会议' ? (
                              <>
                                <Globe
                                  size={14}
                                  className={styles.meetingInfoIcon}
                                />
                                线上会议
                              </>
                            ) : (
                              <>
                                <MapPin
                                  size={14}
                                  className={styles.meetingInfoIcon}
                                />
                                {meeting.location || '待定'}
                              </>
                            )}
                          </div>
                          {meeting.participants && (
                            <div className={styles.meetingInfoItem}>
                              <Users
                                size={14}
                                className={styles.meetingInfoIcon}
                              />
                              {meeting.participants}人
                            </div>
                          )}
                        </div>
                      </div>
                    }
                  />
                </Card>
              ))}
            </div>
          )}
        </Drawer>

        {/* 会议详情弹窗 */}
        <Modal
          title="会议详情"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setModalVisible(false)}>
              关闭
            </Button>,
            selectedMeeting && (
              <Button
                key="google-calendar"
                onClick={() => exportToGoogleCalendar(selectedMeeting)}
              >
                添加到Google日历
              </Button>
            ),
            selectedMeeting?.link && (
              <Button
                key="join"
                type="primary"
                onClick={() =>
                  window.open(selectedMeeting.link, '_blank')
                }
              >
                加入会议
              </Button>
            )
          ].filter(Boolean)}
          width={700}
        >
          {selectedMeeting && (
            <div>
              <Title level={4} className={styles.modalMeetingTitle}>
                {selectedMeeting.title}
              </Title>
              <Paragraph className={styles.modalDescription}>
                {selectedMeeting.description}
              </Paragraph>

              <Space
                direction="vertical"
                size="middle"
                className={styles.modalInfo}
              >
                <div className={styles.modalInfoItem}>
                  <Text className={styles.modalInfoLabel}>开始时间：</Text>
                  <Text className={styles.modalInfoValue}>
                    {dayjs(selectedMeeting.start_time).format(
                      'YYYY-MM-DD HH:mm'
                    )}
                  </Text>
                </div>

                {selectedMeeting.end_time && (
                  <div className={styles.modalInfoItem}>
                    <Text className={styles.modalInfoLabel}>结束时间：</Text>
                    <Text className={styles.modalInfoValue}>
                      {dayjs(selectedMeeting.end_time).format(
                        'YYYY-MM-DD HH:mm'
                      )}
                    </Text>
                  </div>
                )}

                <div className={styles.modalInfoItem}>
                  <Text className={styles.modalInfoLabel}>活动地点：</Text>
                  <Text className={styles.modalInfoValue}>
                    {selectedMeeting.event_mode === '线上活动' ? (
                      <Tag color="green">线上活动</Tag>
                    ) : (
                      selectedMeeting.location
                    )}
                  </Text>
                </div>

                {selectedMeeting.participants && (
                  <div className={styles.modalInfoItem}>
                    <Text className={styles.modalInfoLabel}>参与人数：</Text>
                    <Text className={styles.modalInfoValue}>
                      {selectedMeeting.participants} 人
                    </Text>
                  </div>
                )}

                <div className={styles.modalInfoItem}>
                  <Text className={styles.modalInfoLabel}>活动类型：</Text>
                  <Tag
                    color={getMeetingTypeColor(selectedMeeting.event_type)}
                  >
                    {selectedMeeting.event_type}
                  </Tag>
                </div>

                {selectedMeeting.User && (
                  <div className={styles.modalInfoItem}>
                    <Text className={styles.modalInfoLabel}>组织方：</Text>
                    <Text className={styles.modalInfoValue}>
                      {selectedMeeting.User.name}
                    </Text>
                  </div>
                )}

                {selectedMeeting.link && (
                  <div className={styles.modalInfoItem}>
                    <Text className={styles.modalInfoLabel}>活动链接：</Text>
                    <Button
                      type="link"
                      onClick={() =>
                        window.open(selectedMeeting.link, '_blank')
                      }
                      style={{ padding: 0 }}
                    >
                      点击参与活动
                    </Button>
                  </div>
                )}

                {selectedMeeting.registration_link && (
                  <div className={styles.modalInfoItem}>
                    <Text className={styles.modalInfoLabel}>报名链接：</Text>
                    <Button
                      type="link"
                      onClick={() =>
                        window.open(selectedMeeting.registration_link, '_blank')
                      }
                      style={{ padding: 0 }}
                    >
                      点击报名
                    </Button>
                  </div>
                )}

                {selectedMeeting.tags.length > 0 && (
                  <div className={styles.modalInfoItem}>
                    <Text className={styles.modalInfoLabel}>标签：</Text>
                    <Space wrap>
                      {selectedMeeting.tags.map((tag, index) => (
                        <Tag key={index} color="blue">
                          {tag}
                        </Tag>
                      ))}
                    </Space>
                  </div>
                )}
              </Space>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}

export default MeetingCalendar
