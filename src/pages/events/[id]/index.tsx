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
              <Radio.Button className={styles.spaceBtn} value="giftGacllery">礼品墙</Radio.Button>
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

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

  return (
    <div className={styles.tabContent}>
      <div> detail </div>
     <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabPosition="left"/>
    </div>
  );
};

// 志愿者组件
const VolunteerSection = ({ event }: SectionProps) => {
  return (
    <div className={styles.tabContent}>
      <h2>志愿者信息</h2>
      <div className={styles.sectionContent}>
        <p>这里是志愿者相关的内容...</p>
        {/* 可以添加志愿者列表、报名信息等 */}
      </div>
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
