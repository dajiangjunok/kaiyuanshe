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

interface Meeting {
  id: string
  title: string
  description: string
  start_time: string
  end_time?: string
  location?: string
  meeting_type: string
  participants?: number
  status: 'upcoming' | 'ongoing' | 'ended'
  organizer?: string
  meeting_link?: string
}

interface MeetingsByDate {
  [key: string]: Meeting[]
}

// 模拟会议数据
const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: '理事会月度例会',
    description: '讨论社区发展规划和重要决策事项',
    start_time: dayjs().add(1, 'day').format('YYYY-MM-DD 14:00:00'),
    end_time: dayjs().add(1, 'day').format('YYYY-MM-DD 16:00:00'),
    location: '线上会议',
    meeting_type: '理事会',
    participants: 15,
    status: 'upcoming',
    organizer: '秘书处',
    meeting_link: 'https://meet.example.com/board-meeting'
  },
  {
    id: '2',
    title: '顾问委员会季度会议',
    description: '技术发展趋势讨论和战略建议',
    start_time: dayjs().add(3, 'days').format('YYYY-MM-DD 10:00:00'),
    end_time: dayjs().add(3, 'days').format('YYYY-MM-DD 12:00:00'),
    location: '北京办公室',
    meeting_type: '顾问委员会',
    participants: 8,
    status: 'upcoming',
    organizer: '技术委员会'
  },
  {
    id: '3',
    title: 'KCC城市社区联席会议',
    description: '各城市社区工作汇报和协调',
    start_time: dayjs().add(7, 'days').format('YYYY-MM-DD 19:30:00'),
    end_time: dayjs().add(7, 'days').format('YYYY-MM-DD 21:00:00'),
    location: '线上会议',
    meeting_type: 'KCC',
    participants: 25,
    status: 'upcoming',
    organizer: 'KCC协调组',
    meeting_link: 'https://meet.example.com/kcc-meeting'
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
        (meeting.meeting_link ? `\n\n会议链接：${meeting.meeting_link}` : ''),
      location: meeting.location || '',
      sprop: 'name:开源社会议日历'
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
            key={meeting.id}
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
        <h1 className={styles.title}>
          <CalendarIcon className={styles.titleIcon} />
          会议日历
        </h1>

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
                  key={meeting.id}
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
                        window.open(meeting.meeting_link, '_blank')
                      }}
                    >
                      加入会议
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
                        <Tag color={getMeetingTypeColor(meeting.meeting_type)}>
                          {meeting.meeting_type}
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
            selectedMeeting?.meeting_link && (
              <Button
                key="join"
                type="primary"
                onClick={() =>
                  window.open(selectedMeeting.meeting_link, '_blank')
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
                  <Text className={styles.modalInfoLabel}>会议地点：</Text>
                  <Text className={styles.modalInfoValue}>
                    {selectedMeeting.location === '线上会议' ? (
                      <Tag color="green">线上会议</Tag>
                    ) : (
                      selectedMeeting.location || '待定'
                    )}
                  </Text>
                </div>

                {selectedMeeting.participants && (
                  <div className={styles.modalInfoItem}>
                    <Text className={styles.modalInfoLabel}>参会人数：</Text>
                    <Text className={styles.modalInfoValue}>
                      {selectedMeeting.participants} 人
                    </Text>
                  </div>
                )}

                <div className={styles.modalInfoItem}>
                  <Text className={styles.modalInfoLabel}>会议类型：</Text>
                  <Tag
                    color={getMeetingTypeColor(selectedMeeting.meeting_type)}
                  >
                    {selectedMeeting.meeting_type}
                  </Tag>
                </div>

                {selectedMeeting.organizer && (
                  <div className={styles.modalInfoItem}>
                    <Text className={styles.modalInfoLabel}>组织方：</Text>
                    <Text className={styles.modalInfoValue}>
                      {selectedMeeting.organizer}
                    </Text>
                  </div>
                )}

                {selectedMeeting.meeting_link && (
                  <div className={styles.modalInfoItem}>
                    <Text className={styles.modalInfoLabel}>会议链接：</Text>
                    <Button
                      type="link"
                      onClick={() =>
                        window.open(selectedMeeting.meeting_link, '_blank')
                      }
                      style={{ padding: 0 }}
                    >
                      点击加入会议
                    </Button>
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
