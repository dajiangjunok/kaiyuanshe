'use client'

import { useState } from 'react'
import { Tabs, Card, List, Avatar, Button, Space, Tag } from 'antd'
import { MapPin, Heart, Users, Globe, Mail, Phone } from 'lucide-react'
import LeafletMap from '@/components/common/LeafletMap'
import styles from './index.module.css'

const { TabPane } = Tabs

interface NGOOrganization {
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
  phone?: string
  volunteerCount: number
  focusAreas: string[]
  avatar?: string
  established?: string
}

const mockNGOs: NGOOrganization[] = [
  {
    id: '1',
    name: '爱心助学基金会',
    description: '致力于改善贫困地区儿童教育条件，提供助学金和教育资源',
    location: {
      city: '北京',
      latitude: 39.9042,
      longitude: 116.4074
    },
    website: 'https://loveedu.org.cn',
    email: 'contact@loveedu.org.cn',
    phone: '010-12345678',
    volunteerCount: 320,
    focusAreas: ['教育', '儿童', '扶贫'],
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Love Education',
    established: '2010'
  },
  {
    id: '2',
    name: '绿色地球环保协会',
    description: '推动环境保护和可持续发展，组织环保公益活动',
    location: {
      city: '上海',
      latitude: 31.2304,
      longitude: 121.4737
    },
    website: 'https://greenearth.org.cn',
    email: 'info@greenearth.org.cn',
    phone: '021-87654321',
    volunteerCount: 450,
    focusAreas: ['环保', '可持续发展', '生态保护'],
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Green Earth',
    established: '2008'
  },
  {
    id: '3',
    name: '关爱老人志愿服务中心',
    description: '为独居老人提供生活照料和心理关怀服务',
    location: {
      city: '广州',
      latitude: 23.1291,
      longitude: 113.2644
    },
    website: 'https://eldercare.org.cn',
    email: 'service@eldercare.org.cn',
    phone: '020-55667788',
    volunteerCount: 280,
    focusAreas: ['养老', '社区服务', '志愿服务'],
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Elder Care',
    established: '2015'
  },
  {
    id: '4',
    name: '残障人士支援网络',
    description: '为残障人士提供技能培训和就业支持',
    location: {
      city: '深圳',
      latitude: 22.3193,
      longitude: 114.1694
    },
    website: 'https://disabilitysupport.org.cn',
    email: 'help@disabilitysupport.org.cn',
    phone: '0755-33445566',
    volunteerCount: 180,
    focusAreas: ['残障支援', '就业培训', '社会融入'],
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Disability Support',
    established: '2012'
  },
  {
    id: '5',
    name: '动物保护救助站',
    description: '救助流浪动物，推广文明养宠理念',
    location: {
      city: '成都',
      latitude: 30.5728,
      longitude: 104.0668
    },
    website: 'https://animalrescue.org.cn',
    email: 'rescue@animalrescue.org.cn',
    phone: '028-99887766',
    volunteerCount: 220,
    focusAreas: ['动物保护', '流浪动物', '宠物领养'],
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Animal Rescue',
    established: '2018'
  },
  {
    id: '6',
    name: '医疗援助公益基金',
    description: '为贫困患者提供医疗费用援助和健康咨询',
    location: {
      city: '西安',
      latitude: 34.3416,
      longitude: 108.9398
    },
    website: 'https://medicalaid.org.cn',
    email: 'aid@medicalaid.org.cn',
    phone: '029-11223344',
    volunteerCount: 350,
    focusAreas: ['医疗援助', '健康教育', '公共卫生'],
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Medical Aid',
    established: '2009'
  }
]

export default function NGOPage() {
  const [activeTab, setActiveTab] = useState('map')

  const handleMapReady = (map: any) => {
    console.log('公益地图已加载完成', map)
  }

  const mapMarkers = mockNGOs.map(ngo => ({
    lat: ngo.location.latitude,
    lng: ngo.location.longitude,
    title: ngo.name,
    description: ngo.description
  }))

  const renderMapView = () => (
    <div className={styles.mapView}>
      <LeafletMap
        latitude={35.8617}
        longitude={104.1954}
        city="全国公益组织分布"
        description="查看各地公益组织的分布情况和服务领域"
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
              <span>公益组织位置</span>
            </div>
            <div className={styles.legendText}>
              点击地图标记查看组织详情
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
        dataSource={mockNGOs}
        renderItem={(ngo) => (
          <List.Item>
            <Card
              hoverable
              actions={[
                <Button key="view" type="link" size="small">
                  查看详情
                </Button>,
                <Button key="volunteer" type="link" size="small">
                  志愿报名
                </Button>,
                <Button key="donate" type="link" size="small">
                  爱心捐赠
                </Button>
              ]}
            >
              <Card.Meta
                avatar={<Avatar size={64} src={ngo.avatar} />}
                title={
                  <Space>
                    <span>{ngo.name}</span>
                    <Tag color="red">
                      <Users className={styles.iconSmall} />
                      {ngo.volunteerCount}名志愿者
                    </Tag>
                  </Space>
                }
                description={
                  <Space direction="vertical" size="small" className={styles.fullWidth}>
                    <div className={styles.description}>
                      {ngo.description}
                    </div>
                    <div className={styles.location}>
                      <MapPin className={styles.iconMedium} />
                      {ngo.location.city}
                    </div>
                    {ngo.established && (
                      <div className={styles.established}>
                        <Heart className={styles.iconMedium} />
                        成立于 {ngo.established}年
                      </div>
                    )}
                    {ngo.website && (
                      <div className={styles.website}>
                        <Globe className={styles.iconMedium} />
                        <a href={ngo.website} target="_blank" rel="noopener noreferrer">
                          官网
                        </a>
                      </div>
                    )}
                    {ngo.email && (
                      <div className={styles.email}>
                        <Mail className={styles.iconMedium} />
                        <a href={`mailto:${ngo.email}`}>
                          {ngo.email}
                        </a>
                      </div>
                    )}
                    {ngo.phone && (
                      <div className={styles.phone}>
                        <Phone className={styles.iconMedium} />
                        <a href={`tel:${ngo.phone}`}>
                          {ngo.phone}
                        </a>
                      </div>
                    )}
                    <div className={styles.tags}>
                      {ngo.focusAreas.map(area => (
                        <Tag key={area} color="volcano">
                          {area}
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
    <div className={`${styles.ngoPage} nav-t-top`}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Heart className={styles.iconLarge} />
          公益地图
        </h1>
        <p className={styles.subtitle}>
          发现身边的公益组织，参与社会公益事业，让爱心传递到每一个角落
        </p>
      </div>

      <div className={styles.content}>
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
                <Heart className={styles.iconMediumMr2} />
                列表视图
              </span>
            } 
            key="list"
          >
            {renderListView()}
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}