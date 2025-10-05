import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, Tag, Avatar, App as AntdApp, Image } from 'antd'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Globe,
  ExternalLink,
  Edit,
  User,
  Mail,
  Copy,
  CheckCircle
} from 'lucide-react'
import type { RadioChangeEvent } from 'antd';
import { Radio, Space, Tabs } from 'antd';
import type { TabsProps } from 'antd';

import Link from 'next/link'
import styles from './index.module.css'
import { useAuth } from '@/contexts/AuthContext'
import { getEventById, updateEventPublishStatus } from '@/pages/api/event'
import { SiX } from 'react-icons/si'
import { getRecapByEventId } from '@/pages/api/recap'
import { sanitizeMarkdown } from '@/lib/markdown'

type ContentTab = 'detail' | 'volunteer' | 'giftGallery' | 'openFinance' | 'dataStatistic' | 'otherEvents';


export default function EventDetailPage() {
  const { message } = AntdApp.useApp()
  const router = useRouter()
  const { id } = router.query // 路由参数应该叫 id，不是 ids
  const rId = Array.isArray(id) ? id[0] : id

  const [activeContentTab, setActiveContentTab] = useState<ContentTab>('detail');

  const changeContentTab = (e: RadioChangeEvent) => {
    setActiveContentTab(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [event, setEvent] = useState<any>(null)
  const [recap, setRecap] = useState<{ content: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'intro' | 'recap'>('intro')

  // 使用统一的认证上下文，避免重复调用 useSession
  const { session, status } = useAuth()

  const permissions = session?.user?.permissions || []

  // parseMarkdown将返回的markdown转为html展示
  const [eventContent, setEventContent] = useState<string>('')
  const [recapContent, setRecapContent] = useState<string>('')

  useEffect(() => {
    if (event?.description) {
      sanitizeMarkdown(event.description).then(htmlContent => {
        setEventContent(htmlContent)
      })
    }
  }, [event?.description])

  useEffect(() => {
    if (recap?.content) {
      sanitizeMarkdown(recap.content).then(htmlContent => {
        setRecapContent(htmlContent)
      })
    }
  }, [recap?.content])

  const handleUpdatePublishStatus = async () => {
    try {
      const result = await updateEventPublishStatus(event.ID, 2)
      if (result.success) {
        router.reload()
        message.success(result.message)
      } else {
        message.error(result.message || '审核出错')
      }
    } catch {
      message.error('审核出错，请重试')
    }
  }

  useEffect(() => {
    if (!router.isReady || !rId) return

    const fetchData = async () => {
      setLoading(true)
      try {
        // 获取活动详情
        const eventRes = await getEventById(rId)
        console.log('获取活动详情:', eventRes)
        setEvent(eventRes?.data ?? null)

        // 获取活动回顾
        const recapRes = await getRecapByEventId(rId)
        console.log('获取活动回顾:', recapRes)

        if (recapRes.success && recapRes.data) {
          setRecap(recapRes.data)
        } else {
          setRecap(null) // 没有数据也清空
        }
      } catch {
        message.error('加载失败')
        setEvent(null)
        setRecap(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router.isReady, rId, message])

  const handleShare = (platform?: string) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href)
      message.success('链接已复制到剪贴板')
    } else if (platform === 'twitter') {
      const text = `${event.title} - ${window.location.href}`
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
      )
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>加载中...</p>
      </div>
    )
  }

  if (
    !event ||
    (event.publish_status === 1 && !permissions.includes('event:write'))
  ) {
    return (
      <div className={styles.error}>
        <h2>活动不存在</h2>
        <p>抱歉，找不到您要查看的活动</p>
        <Link href="/events" className={styles.backButton}>
          返回活动列表
        </Link>
      </div>
    )
  }

  const getEventStatus = () => {
    if (event.status === 0) {
      return { text: '即将开始', type: 'upcoming', color: '#10b981' }
    } else if (event.status === 1) {
      return { text: '进行中', type: 'ongoing', color: '#3b82f6' }
    } else {
      return { text: '已结束', type: 'ended', color: '#6b7280' }
    }
  }

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }),
      time: date.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  const formatDateTimeRange = (startTime: string, endTime: string) => {
    const startDate = new Date(startTime)
    const endDate = new Date(endTime)

    // 检查是否跨天
    const startDay = startDate.toDateString()
    const endDay = endDate.toDateString()
    const isSameDay = startDay === endDay

    if (isSameDay) {
      // 同一天：显示日期和时间范围
      return {
        date: startDate.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
        }),
        timeRange: `${startDate.toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit'
        })} - ${endDate.toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit'
        })}`,
        isSameDay: true
      }
    } else {
      // 跨天：只显示日期范围
      return {
        date: `${startDate.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} - ${endDate.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}`,
        timeRange: '',
        isSameDay: false
      }
    }
  }

  const eventStatus = getEventStatus()
  const dateTimeRange = formatDateTimeRange(event.start_time, event.end_time)

  // 渲染当前激活的组件
  const renderActiveSection = () => {
    const sectionProps = { event, eventContent, recapContent };

    switch (activeContentTab) {
      case 'detail':
        return <DetailSection {...sectionProps} />;
      case 'volunteer':
        return <VolunteerSection {...sectionProps} />;
      case 'giftGallery':
        return <GiftGallerySection {...sectionProps} />;
      case 'openFinance':
        return <OpenFinanceSection {...sectionProps} />;
      case 'dataStatistic':
        return <DataStatisticSection {...sectionProps} />;
      case 'otherEvents':
        return <OtherEventsSection {...sectionProps} />;
      default:
        return <DetailSection {...sectionProps} />;
    }
  };



  return (
    <div className={`${styles.container} nav-t-top`}>
      <div className={styles.main}>
        {/* Hero Section - 只展示封面图片 */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.coverContainer}>
              <Image
                src={event.cover_img || '/placeholder.svg'}
                alt={event.title}
                className={styles.coverImage}
                preview={false}
              />
            </div>
          </div>
        </div>
        <div className={styles.navigation}>
          <Space className={styles.tabSpace}>
            <Radio.Group
              value={activeContentTab}
              onChange={changeContentTab}
              className={styles.contentSpace}
            >
              <Radio.Button className={styles.spaceBtn} value="detail">活动详情</Radio.Button>
              <Radio.Button className={styles.spaceBtn} value="volunteer">志愿者</Radio.Button>
              <Radio.Button className={styles.spaceBtn} value="giftGallery">礼品墙</Radio.Button>
              <Radio.Button className={styles.spaceBtn} value="openFinance">财务公开</Radio.Button>
              <Radio.Button className={styles.spaceBtn} value="dataStatistic">活动数据统计</Radio.Button>
              <Radio.Button className={styles.spaceBtn} value="otherEvents">往届活动</Radio.Button>
            </Radio.Group>
          </Space>
        </div>
        <div className={styles.content}>
          {renderActiveSection()}
        </div>
      </div>
    </div>
  )
}


// 定义各个组件的 Props 接口
interface SectionProps {
  event: any;
  eventContent?: string;
  recapContent?: string;
}

// 活动详情组件
const DetailSection = ({ event, eventContent }: SectionProps) => {
  const onChange = (key: string) => {
    console.log(key);
  };


  interface Speaker {
    name: string;
    title: string;
    avatarUrl?: string;
  }

  interface AgendaItem {
    startTime: string;
    endTime: string;
    topic: string;
    speakers: Speaker[];
  }

  interface SessionContentProps {
    name: string;
    address: string;
    description: string;
    producer: string;
    volunteer: string[];
    agenda?: AgendaItem[]; // 替换原来的 schedule
  }

  // 会场
  const SessionContent: React.FC<SessionContentProps> = ({ name, address, description, producer, volunteer, agenda }) => {
    return (
      <div className={styles.sessionContent}>
        <h1 className={styles.sessionTitle}>{name}</h1>
        <p className={styles.sessionAddress}>{address}</p>
        <p className={styles.sessionDescription}>{description}</p>
        <div className={styles.sessionAudit}>
          <p className={styles.sessionProducer}>
            <strong>出品人：</strong>
            {producer}
          </p>
          <p className={styles.sessionVolunteer}>
            <strong>志愿者：</strong>
            {volunteer.join("、 ")}
          </p>
        </div>
        {/* 议程 */}
        {agenda && agenda.length > 0 && (
          <div className={styles.agendaSection}>
            <h2 className={styles.agendaTitle}>议程</h2>
            <div className={styles.agendaList}>
              {agenda.map((item, index) => {
                // Check if this is a check-in or special event (no speakers)
                const isSpecialEvent = item.speakers.length === 0

                return (
                  <div key={index} className={isSpecialEvent ? styles.agendaItemSpecial : styles.agendaItem}>
                    <div className={styles.agendaTime}>
                      {item.startTime} - {item.endTime}
                    </div>
                    <div className={styles.agendaTopic}>{item.topic}</div>
                    {!isSpecialEvent && (
                      <div className={styles.agendaSpeakers}>
                        {item.speakers.map((speaker, speakerIndex) => (
                          <div key={speakerIndex} className={styles.speakerCard}>
                            {speaker.avatarUrl && (
                              <img
                                src={speaker.avatarUrl || "/placeholder.svg"}
                                alt={speaker.name}
                                className={styles.speakerAvatar}
                              />
                            )}
                            <div className={styles.speakerInfo}>
                              <div className={styles.speakerName}>{speaker.name}</div>
                              <div className={styles.speakerTitle}>{speaker.title}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  const sampleAgenda = [
    {
      startTime: "09:00",
      endTime: "09:20",
      topic: "开幕致辞",
      speakers: [
        {
          name: "陈阳",
          title: "开源社联合创始人",
          avatarUrl: "/example.jpg",
        },
      ],
    },
    {
      startTime: "09:20",
      endTime: "09:40",
      topic: "openEuler：源于中国，融入全球，打造面向数智时代的开源数字基础设施根社区",
      speakers: [
        {
          name: "郑振宇",
          title: "openEuler 华为社区运营总监",
          avatarUrl: "/example.jpg",

        },
      ],
    },
    {
      startTime: "09:40",
      endTime: "10:00",
      topic: "万物互联时代，探索新一代数据底座",
      speakers: [
        {
          name: "魏可伟",
          title: "浪潮CTO",
          avatarUrl: "/example.jpg",
        },
      ],
    },
    {
      startTime: "11:00",
      endTime: "12:00",
      topic: "国际社区和开发者聚会怎么玩",
      speakers: [
        {
          name: "辛庆",
          title: "开源社",
          avatarUrl: "/example.jpg",
        },
        {
          name: "庄表伟",
          title: "COSUP",
          avatarUrl: "/example.jpg",
        },
        {
          name: "陈阳",
          title: "开源社、思否",
          avatarUrl: "/example.jpg",
        },
        {
          name: "江波",
          title: "",
          avatarUrl: "/example.jpg",
        },
      ],
    },
  ]


  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '主论坛',
      children: (<SessionContent
        name="主论坛(Plenary)"
        address="7栋菁蓉汇永久会场主会场"
        description='三年新冠疫情没有将我们击垮，开源同仁们在疫情后首聚四川成都，这“百川东到海”的壮丽景象正如开源汇聚众志、生生不息的生态图景，是谓”川流不息"。COSCon2021 携手成都本地开源社区，把露天草坪集市作为线下主会场，开华夏先河、引九州效仿。2023年成都成为完全的主会场，草坪集市依然会秉持”每个人是海里的一朵浪花"的宗旨，将这种“海会"形式与经典的演讲“峰会"有机结合，是谓“山海相映"。希望今年这一场中国开源界的饕餮盛宴，可以让社区、企业、基金会、政府等开源重要的参与方一道深入交流，为中国开源发展的下一个十年打开思路。大会要点。'
        producer='庄表伟 - 开源社理事、执行长'
        volunteer={['崔晨洋', '李欣欣', '刘炜']}
        agenda={sampleAgenda}
      />
      )
    },
    {
      key: '2',
      label: '开源商业',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Web 应用开发',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: '开源操作系统',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '5',
      label: '人工智能',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '6',
      label: '女性论坛',
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <div className={styles.tabContent}>
      {/* <div> detail </div>  活动详情， 地图等 */}
      <Tabs defaultActiveKey="1" size="large" items={items} onChange={onChange} tabPosition="left" />
    </div>
  );
};

// 志愿者组件
const VolunteerSection = ({ event }: SectionProps) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  // 定义嘉宾接口
  interface Speaker {
    name: string;
    title: string;
    avatarUrl: string;
  }

  // 定义论坛内容组件
  interface VolunteerContentProps {
    name: string;
    amount: number;
    speakers: Speaker[];
  }

  const VolunteerContent: React.FC<VolunteerContentProps> = ({ name, amount, speakers }) => {
    return (
      <div className={styles.volunteerContent}>
        <h3 className={styles.volunteerTitle}>{`${name}(${amount})`}</h3>
        <div className={styles.volunteerSpeakersList}>
          {speakers.map((speaker, index) => (
            <div key={index} className={styles.volunteerSpeakerCard}>
              <img
                src={speaker.avatarUrl}
                alt={speaker.name}
                className={styles.volunteerSpeakerAvatar}
              />
              <div className={styles.volunteerSpeakerInfo}>
                <div className={styles.volunteerSpeakerName}>{speaker.name}</div>
                <div className={styles.volunteerSpeakerTitle}>{speaker.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '开源集市现场协作',
      children: (
        <VolunteerContent
          name="开源集市现场协作"
          amount={14}
          speakers={[
            {
              name: "辛庆",
              title: "开源社",
              avatarUrl: "/example.jpg",
            },
            {
              name: "庄表伟",
              title: "COSUP",
              avatarUrl: "/example.jpg",
            },
            {
              name: "陈阳",
              title: "开源社、思否",
              avatarUrl: "/example.jpg",
            },
            {
              name: "江波",
              title: "",
              avatarUrl: "/example.jpg",
            },
          ]}
        />
      ),
    },
    {
      key: '2',
      label: '英文翻译志愿者',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: '官网开发志愿者',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: '分论坛现场协作',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '5',
      label: '主论坛现场协作',
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <div className={styles.tabContent}>
      <Tabs defaultActiveKey="1" size="large" items={items} onChange={onChange} tabPosition="left" />
    </div>
  );
};

// 礼品墙组件
const GiftGallerySection = ({ event }: SectionProps) => {
  return (
    <div className={styles.tabContent}>
      <h2>礼品墙</h2>
      <div className={styles.sectionContent}>
        <p>展示活动礼品和奖励...</p>
        {/* 可以添加礼品展示、兑换信息等 */}
      </div>
    </div>
  );
};

// 财务公开组件
const OpenFinanceSection = ({ event }: SectionProps) => {
  return (
    <div className={styles.tabContent}>
      <h2>财务公开</h2>
      <div className={styles.sectionContent}>
        <p>活动经费使用情况...</p>
        {/* 可以添加财务报表、收支明细等 */}
      </div>
    </div>
  );
};

// 数据统计组件
const DataStatisticSection = ({ event }: SectionProps) => {
  return (
    <div className={styles.tabContent}>
      <h2>活动数据统计</h2>
      <div className={styles.sectionContent}>
        <p>活动参与数据统计分析...</p>
        {/* 可以添加数据图表、统计信息等 */}
      </div>
    </div>
  );
};

// 往届活动组件
const OtherEventsSection = ({ event }: SectionProps) => {
  return (
    <div className={styles.tabContent}>
      <h2>往届活动</h2>
      <div className={styles.sectionContent}>
        <p>历史活动回顾...</p>
        {/* 可以添加往届活动列表、回顾内容等 */}
      </div>
    </div>
  );
};
