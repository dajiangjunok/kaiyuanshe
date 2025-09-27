/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  Card,
  Row,
  Col,
  List,
  Tag,
  Divider,
  Typography,
  Space,
  Menu,
  Pagination,
  App as AntdApp
} from 'antd'
import { FileText, Eye, Clock } from 'lucide-react'
import Link from 'next/link'
import dayjs from 'dayjs'
import styles from './index.module.css'
import { useAuth } from '@/contexts/AuthContext'
import AvatarEdit from '@/components/settings/AvatarEdit'
import NicknameEdit from '@/components/settings/NicknameEdit'
import { updateUser } from '../api/user'
import { useSession } from 'next-auth/react'
import { parseMd } from '@/utils/posts'

const { Title, Text } = Typography
type ActiveTab = 'events' | 'articles'

export default function DashboardPage() {
  const { message } = AntdApp.useApp()
  const [activeTab, setActiveTab] = useState<ActiveTab>('events')
  const [evnets, setEvents] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [eventsLoading, setEventsLoading] = useState(false)
  const [articlesLoading, setArticleLoading] = useState(false)
  const [eventsPagination, setEventsPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const [postsPagination, setPostsPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const { session } = useAuth()
  const { update } = useSession()

  const loadEvents = useCallback(async (page = 1, pageSize = 10) => {
    try {
      setEventsLoading(true)
      const result = { data: { evnets: [], page: 1, page_size: 10, total: 0 } }
      setEvents(result.data.evnets || [])
      setEventsPagination({
        current: result.data.page || page,
        pageSize: result.data.page_size || pageSize,
        total: result.data.total || 0
      })
    } catch (error) {
      console.error('加载博客列表失败:', error)
      setEvents([])
    } finally {
      setEventsLoading(false)
    }
  }, [])

  const loadArticles = useCallback(async (page = 1, pageSize = 10) => {
    try {
      setArticleLoading(true)
      const result = {
        data: {
          article: [],
          page: page,
          page_size: 10,
          total: 0
        }
      }
      if (result.data) {
        setArticles(result.data.article || [])
        setPostsPagination({
          current: result.data.page || 1,
          pageSize: result.data.page_size || pageSize,
          total: result.data.total || 0
        })
      }
    } catch (error) {
      console.error('加载帖子列表失败:', error)
      setArticles([])
    } finally {
      setArticleLoading(false)
    }
  }, [])

  useEffect(() => {
    if (session?.user?.uid) {
      loadEvents()
      loadArticles()
    }
  }, [session, loadEvents, loadArticles])

  const profileData = {
    name: session?.user?.username || '',
    email: session?.user?.email || '',
    // subtitle: '前端开发人员其他',
    avatar: session?.user?.avatar || ''
  }

  const menuItems = [
    {
      key: 'events',
      icon: <FileText className={styles.menuIcon} />,
      label: '我的活动'
    },
    {
      key: 'articles',
      icon: <FileText className={styles.menuIcon} />,
      label: '我的文章'
    }
  ]

  const handleMenuClick = (key: string) => {
    setActiveTab(key as ActiveTab)
  }

  const handleAvatarSave = async (avatarUrl: string) => {
    try {
      const result = await updateUser(session?.user?.uid as unknown as number, {
        email: session?.user?.email ?? '',
        avatar: avatarUrl,
        github: session?.user?.github ?? '',
        username: session?.user?.username ?? ''
      })

      if (result.success) {
        message.success('头像更新成功')
        console.log('头像更新成功:', avatarUrl)

        // 刷新session，更新用户信息
        await update({
          ...session,
          user: {
            ...session?.user,
            avatar: avatarUrl
          }
        })
      } else {
        console.error('头像更新失败:', result.message)
        return Promise.reject(result.message)
      }
    } catch (error: any) {
      console.error('头像更新异常:', error)
    }
  }

  const handleNicknameSave = async (nickname: string) => {
    try {
      const result = await updateUser(session?.user?.uid as unknown as number, {
        email: session?.user?.email ?? '',
        avatar: session?.user?.avatar ?? '',
        github: session?.user?.github ?? '',
        username: nickname
      })

      if (result.success) {
        message.success('昵称修改成功')

        // 刷新session，更新用户信息
        await update({
          ...session,
          user: {
            ...session?.user,
            username: nickname,
            name: nickname // 同时更新name字段
          }
        })
      } else {
        message.error('昵称修改失败')
        console.error('昵称修改失败:', result.message)
      }
    } catch (error: any) {
      message.error('昵称修改异常')
      console.error('昵称修改异常:', error)
    }
  }

  const handleArticleClick = () => {
    // setArticleLoading(true);
  }

  if (!session) {
    return (
      <div className={styles.emptyState}>
        <Image src="/meme1.gif" width={300} height={200} className={styles.emptyImage} alt="登录提示图片" />
        <p>请先登录以查看个人中心</p>
      </div>
    )
  }

  const renderContent = () => {
    if (activeTab === 'events') {
      return (
        <Card className={styles.contentCard}>
          <div className={styles.cardHeader}>
            <Title level={3} className={styles.cardTitle}>
              <FileText className={styles.cardIcon} />
              我的活动
            </Title>
          </div>
          <Divider />
          <List
            loading={eventsLoading}
            dataSource={evnets}
            renderItem={evnet => (
              <List.Item>
                <div className={styles.itemContent}>
                  <div className={styles.itemMain}>
                    <div className={styles.titleRow}>
                      <div className={styles.itemTitle}>{evnet.title}</div>
                      {evnet.publish_status === 1 && (
                        <Tag color="orange" style={{ marginLeft: 8 }}>
                          待审核
                        </Tag>
                      )}
                      {evnet.publish_status === 2 && (
                        <Tag color="green" style={{ marginLeft: 8 }}>
                          已发布
                        </Tag>
                      )}
                      {evnet.publish_status === 3 && (
                        <Tag color="red" style={{ marginLeft: 8 }}>
                          未通过
                        </Tag>
                      )}
                    </div>
                    <Text type="secondary" className={styles.itemDesc}>
                      {evnet.description}
                    </Text>

                    <div className={styles.itemFooter}>
                      <Space>
                        <Clock size={14} className={styles.itemClock} />
                        <span>
                          {dayjs(evnet.publish_time || evnet.CreatedAt).format(
                            'YYYY-MM-DD HH:MM'
                          )}
                        </span>
                        <Eye size={14} className={styles.itemClock} />
                        <span>{evnet.view_count || 0}</span>
                      </Space>
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
          <div className={styles.bottomPagination}>
            <Pagination
              current={eventsPagination.current}
              total={eventsPagination.total}
              pageSize={eventsPagination.pageSize}
              onChange={(page, pageSize) => loadEvents(page, pageSize)}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) =>
                `显示 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }
            />
          </div>
        </Card>
      )
    }

    if (activeTab === 'articles') {
      return (
        <Card className={styles.contentCard}>
          <div className={styles.cardHeader}>
            <Title level={3} className={styles.cardTitle}>
              <FileText className={styles.cardIcon} />
              我的文章
            </Title>
          </div>
          <Divider />
          <List
            loading={articlesLoading}
            dataSource={articles}
            renderItem={post => (
              <List.Item
                key={post.ID}
                style={{ cursor: 'pointer' }}
                onClick={handleArticleClick}
              >
                <div className={styles.itemContent}>
                  <div className={styles.itemMain}>
                    <div className={styles.titleRow}>
                      <Link
                        href={`/articles`}
                        className={styles.itemTitle}
                        title="查看帖子详情"
                      >
                        {post.title}
                      </Link>
                    </div>
                    {/* 帖子描述 */}
                    <div className={styles.postDescription}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parseMd(post.description || '')
                        }}
                      />
                    </div>
                    <div className={styles.itemFooter}>
                      <Space>
                        {post.tags?.slice(0, 3).map((tag: string) => (
                          <Tag key={tag} className={styles.itemTag}>
                            {tag}
                          </Tag>
                        ))}
                        <Clock size={14} className={styles.itemClock} />
                        <span>
                          {dayjs(post.CreatedAt).format('YYYY-MM-DD HH:MM')}
                        </span>
                        <Eye size={16} className={styles.itemClock} />
                        <span>{post.view_count || 0}</span>
                      </Space>
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
          <div className={styles.bottomPagination}>
            <Pagination
              current={postsPagination.current}
              total={postsPagination.total}
              pageSize={postsPagination.pageSize}
              onChange={(page, pageSize) => loadArticles(page, pageSize)}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) =>
                `显示 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }
            />
          </div>
        </Card>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.profileSection}>
          <div className={styles.profileInfo}>
            <AvatarEdit
              currentAvatar={session?.user?.avatar}
              userName={session?.user?.name || ''}
              onSave={handleAvatarSave}
            />
            <div className={styles.profileDetails}>
              <NicknameEdit
                currentNickname={profileData.name}
                onSave={handleNicknameSave}
              />
              <Text className={styles.subtitle}>
                Email: {profileData.email}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <Row gutter={[24, 24]} className={styles.content}>
          <Col span={6}>
            <Card className={styles.sidebarCard}>
              <div className={styles.menuSection}>
                <Title level={4} className={styles.sectionTitle}>
                  内容导航
                </Title>
                <Menu
                  mode="vertical"
                  selectedKeys={[activeTab]}
                  items={menuItems}
                  onClick={({ key }) => handleMenuClick(key)}
                  className={styles.navigationMenu}
                />
              </div>
            </Card>
          </Col>

          <Col span={18}>
            <div className={styles.mainContent}>{renderContent()}</div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
