'use client'

import { useState } from 'react'
import { Tabs, Card, List, Avatar, Button, Space, Tag } from 'antd'
import { MapPin, Building2, Users, Globe, Mail, Map, UserCheck } from 'lucide-react'
import Link from 'next/link'
import LeafletMap from '@/components/common/LeafletMap'
import styles from './index.module.css'

const { TabPane } = Tabs

interface Organization {
  id: string
  name: string
  description: string
  location: {
    city: string
    latitude: number
    longitude: number
  }
  website?: string
  email?: string
  memberCount: number
  tags: string[]
  avatar?: string
}

// 示例数据
const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: '开源社北京分会',
    description: '致力于推动开源技术在北京地区的发展与应用',
    location: {
      city: '北京',
      latitude: 39.9042,
      longitude: 116.4074
    },
    website: 'https://beijing.kaiyuanshe.cn',
    email: 'beijing@kaiyuanshe.cn',
    memberCount: 150,
    tags: ['技术社区', '开源', 'AI'],
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Beijing'
  },
  {
    id: '2',
    name: '开源社上海分会',
    description: '连接上海地区的开源爱好者和开发者',
    location: {
      city: '上海',
      latitude: 31.2304,
      longitude: 121.4737
    },
    website: 'https://shanghai.kaiyuanshe.cn',
    email: 'shanghai@kaiyuanshe.cn',
    memberCount: 200,
    tags: ['开发者', '开源', '创新'],
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Shanghai'
  },
  {
    id: '3',
    name: '开源社深圳分会',
    description: '深圳地区最活跃的开源技术社区',
    location: {
      city: '深圳',
      latitude: 22.3193,
      longitude: 114.1694
    },
    website: 'https://shenzhen.kaiyuanshe.cn',
    email: 'shenzhen@kaiyuanshe.cn',
    memberCount: 180,
    tags: ['科技', '开源', '创业'],
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Shenzhen'
  }
]

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState('map')

  const handleMapReady = (map: any) => {
    console.log('地图已加载完成', map)
  }

  const mapMarkers = mockOrganizations.map(org => ({
    lat: org.location.latitude,
    lng: org.location.longitude,
    title: org.name,
    description: org.description
  }))

  const renderMapView = () => (
    <div className={styles.mapView}>
      <LeafletMap
        latitude={39.9042}
        longitude={116.4074}
        city="全国开源社组织分布"
        description="查看各地开源社组织的分布情况"
        zoom={5}
        height="600px"
        markers={mapMarkers}
        onMapReady={handleMapReady}
      />
      <div className={styles.mapLegend}>
        <Card size="small" title="图例说明">
          <Space direction="vertical" size="small">
            <div className={styles.legendItem}>
              <div className={styles.marker}></div>
              <span>组织位置</span>
            </div>
            <div className={styles.legendText}>
              点击地图标记查看详细信息
            </div>
          </Space>
        </Card>
      </div>
    </div>
  )

  const renderListView = () => (
    <div className={styles.listView}>
      <List
        grid={{ 
          gutter: 16, 
          xs: 1, 
          sm: 1, 
          md: 2, 
          lg: 2, 
          xl: 3 
        }}
        dataSource={mockOrganizations}
        renderItem={(org) => (
          <List.Item>
            <Card
              hoverable
              actions={[
                <Button key="view" type="link" size="small">
                  查看详情
                </Button>,
                <Button key="contact" type="link" size="small">
                  联系我们
                </Button>
              ]}
            >
              <Card.Meta
                avatar={<Avatar size={64} src={org.avatar} />}
                title={
                  <Space>
                    <span>{org.name}</span>
                    <Tag color="blue">
                      <Users className={styles.iconSmall} />
                      {org.memberCount}人
                    </Tag>
                  </Space>
                }
                description={
                  <Space direction="vertical" size="small" className={styles.fullWidth}>
                    <div className={styles.description}>
                      {org.description}
                    </div>
                    <div className={styles.location}>
                      <MapPin className={styles.iconMedium} />
                      {org.location.city}
                    </div>
                    {org.website && (
                      <div className={styles.website}>
                        <Globe className={styles.iconMedium} />
                        <a href={org.website} target="_blank" rel="noopener noreferrer">
                          官网
                        </a>
                      </div>
                    )}
                    {org.email && (
                      <div className={styles.email}>
                        <Mail className={styles.iconMedium} />
                        <a href={`mailto:${org.email}`}>
                          {org.email}
                        </a>
                      </div>
                    )}
                    <div className={styles.tags}>
                      {org.tags.map(tag => (
                        <Tag key={tag} color="geekblue">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </Space>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )

  return (
      <div className={`${styles.organizationPage} nav-t-top`}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <Building2 className={styles.iconLarge} />
            开源社组织
          </h1>
          <p className={styles.subtitle}>
            探索全国各地的开源社区组织，连接志同道合的开源爱好者
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.tabsContainer}>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              size="large"
              className={styles.tabs}
            >
              <TabPane 
                tab={
                  <span>
                    <MapPin className={styles.iconMediumMr2} />
                    地图视图
                  </span>
                } 
                key="map"
              >
                {renderMapView()}
              </TabPane>
              <TabPane 
                tab={
                  <span>
                    <Building2 className={styles.iconMediumMr2} />
                    列表视图
                  </span>
                } 
                key="list"
              >
                {renderListView()}
              </TabPane>
            </Tabs>
            <div className={styles.actionButtons}>
              <Space>
                <Link href="/organization/landscape">
                  <Button type="primary" icon={<Map className={styles.iconMedium} />}>
                    全景图
                  </Button>
                </Link>
                {/* <Button type="default" icon={<UserCheck className={styles.iconMedium} />}>
                  接入开源社
                </Button> */}
              </Space>
            </div>
          </div>
        </div>
      </div>
  )
}