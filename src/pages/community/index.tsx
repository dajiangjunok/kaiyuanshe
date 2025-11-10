import type React from "react"
import { Button, Spin, message } from "antd"
import { MapPin, Users, Globe, Building2, Sparkles, ArrowRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/router"
import styles from "./index.module.css"
import { getCommunities, Community } from "../api/comunity"

// 基于 Community 接口定义 CityData
interface CityData {
  ID: number;
  city: string;
  intro: string;
  cover: string;
  register_link: string;
  start_date: string;
  created_at: string;
  updated_at: string;
  isInternational?: boolean;
}

const CommunityPage: React.FC = () => {
  const router = useRouter()
  const [cities, setCities] = useState<CityData[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    cityCount: 0,
    developerCount: 0,
    projectCount: 0
  })

  // 加载社区数据
  const loadCommunities = useCallback(async (params?: {
    city?: string;
    page?: number;
    page_size?: number;
    order_by?: 'created_at' | 'start_date';
    order?: 'asc' | 'desc';
  }) => {
    try {
      setLoading(true);

      const queryParams = {
        city: params?.city ?? '',
        page: params?.page ?? 1,
        page_size: params?.page_size ?? 50,
        order_by: params?.order_by ?? 'created_at',
        order: params?.order ?? 'desc',
      };

      const result = await getCommunities(queryParams);

      if (result.success && result.data) {
        // 直接使用接口返回的 Community 数据
        const communitiesData: Community[] =   
        // result.data.communities||
        [
          {
            ID: 1,
            city: "北京",
            intro: "首都开源社区，汇聚全国顶尖技术人才，致力于推动开源技术在政企的应用与发展。",
            cover: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop",
            register_link: "https://kaiyuanshe.feishu.cn/share/base/form/shrcnbeijing",
            start_date: "2024-01-15T10:00:00Z",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-15T00:00:00Z"
          },
          {
            ID: 2,
            city: "上海",
            intro: "国际金融中心的开源力量，连接全球开源生态，推动金融科技与开源技术融合创新。",
            cover: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba5d2?w=400&h=300&fit=crop",
            register_link: "https://kaiyuanshe.feishu.cn/share/base/form/shrcnshanghai",
            start_date: "2024-02-01T10:00:00Z",
            created_at: "2024-01-02T00:00:00Z",
            updated_at: "2024-02-01T00:00:00Z"
          },
          {
            ID: 3,
            city: "深圳",
            intro: "科技创新之都，硬件与软件完美结合的开源实验场，引领物联网与AI开源发展。",
            cover: "https://images.unsplash.com/photo-1551265401-e54b53b6ae36?w=400&h=300&fit=crop",
            register_link: "https://kaiyuanshe.feishu.cn/share/base/form/shrcnshenzhen",
            start_date: "2024-02-15T10:00:00Z",
            created_at: "2024-01-03T00:00:00Z",
            updated_at: "2024-02-15T00:00:00Z"
          },
          {
            ID: 4,
            city: "广州",
            intro: "华南开源技术中心，传统产业与现代科技融合的桥梁，推动制造业数字化转型。",
            cover: "https://images.unsplash.com/photo-1551815751-dd711dee3ae4?w=400&h=300&fit=crop",
            register_link: "https://kaiyuanshe.feishu.cn/share/base/form/shrcnguangzhou",
            start_date: "2024-03-01T10:00:00Z",
            created_at: "2024-01-04T00:00:00Z",
            updated_at: "2024-03-01T00:00:00Z"
          },
          {
            ID: 5,
            city: "杭州",
            intro: "数字经济之城，电商与云计算开源技术的创新高地，助力数字中国建设。",
            cover: "https://images.unsplash.com/photo-1571987460726-5d4acb3fecd1?w=400&h=300&fit=crop",
            register_link: "https://kaiyuanshe.feishu.cn/share/base/form/shrcnhangzhou",
            start_date: "2024-03-15T10:00:00Z",
            created_at: "2024-01-05T00:00:00Z",
            updated_at: "2024-03-15T00:00:00Z"
          },
          {
            ID: 6,
            city: "成都",
            intro: "西南科技重镇，游戏产业与开源技术结合的创新基地，推动西部地区数字化发展。",
            cover: "https://images.unsplash.com/photo-1569949263394-1c0903b2b98d?w=400&h=300&fit=crop",
            register_link: "https://kaiyuanshe.feishu.cn/share/base/form/shrcnchengdu",
            start_date: "2024-04-01T10:00:00Z",
            created_at: "2024-01-06T00:00:00Z",
            updated_at: "2024-04-01T00:00:00Z"
          },
          {
            ID: 7,
            city: "南京",
            intro: "历史文化名城的现代科技力量，高校云集的开源人才培养基地，产学研深度融合。",
            cover: "https://images.unsplash.com/photo-1577552106387-b6b7b3e3b8c4?w=400&h=300&fit=crop",
            register_link: "https://kaiyuanshe.feishu.cn/share/base/form/shrcnnanjing",
            start_date: "2024-04-15T10:00:00Z",
            created_at: "2024-01-07T00:00:00Z",
            updated_at: "2024-04-15T00:00:00Z"
          },
          {
            ID: 8,
            city: "长沙",
            intro: "中部崛起的科技新星，工程机械与智能制造的开源技术应用先锋区域。",
            cover: "https://images.unsplash.com/photo-1578979879663-4ba8d133646b?w=400&h=300&fit=crop",
            register_link: "https://kaiyuanshe.feishu.cn/share/base/form/shrcnchangsha",
            start_date: "2024-05-01T10:00:00Z",
            created_at: "2024-01-08T00:00:00Z",
            updated_at: "2024-05-01T00:00:00Z"
          },
          {
            ID: 9,
            city: "大连",
            intro: "东北亚开源技术门户，软件外包产业与开源技术结合的国际化创新中心。",
            cover: "https://images.unsplash.com/photo-1566041510639-8d95a2490bda?w=400&h=300&fit=crop",
            register_link: "https://kaiyuanshe.feishu.cn/share/base/form/shrcndalian",
            start_date: "2024-05-15T10:00:00Z",
            created_at: "2024-01-09T00:00:00Z",
            updated_at: "2024-05-15T00:00:00Z"
          },
          {
            ID: 10,
            city: "新加坡",
            intro: "东南亚开源技术枢纽，连接亚太地区开源社区，推动跨境技术合作与交流。",
            cover: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop",
            register_link: "https://kaiyuanshe.feishu.cn/share/base/form/shrcnsingapore",
            start_date: "2024-06-01T10:00:00Z",
            created_at: "2024-01-10T00:00:00Z",
            updated_at: "2024-06-01T00:00:00Z"
          }
        ];
        console.log('社区数据:', communitiesData);

        // 为新加坡添加国际标识
        const citiesWithFlags = communitiesData.map(city => ({
          ...city,
          isInternational: city.city === "新加坡"
        }));
        
        setCities(citiesWithFlags);
        
        // 更新统计数据
        setStats({
          cityCount: citiesWithFlags.length,
          developerCount: citiesWithFlags.length * 150, // 每个城市大约150名开发者
          projectCount: citiesWithFlags.length * 25 // 每个城市大约25个项目
        });

      } else {
        console.error('获取社区列表失败:', result.message);
        message.warning(result.message || '获取社区数据失败');
        setCities([]);
      }
    } catch (error: unknown) {
      console.error('加载社区列表异常:', error);
      message.error('获取社区数据失败');
      setCities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 从接口获取社区数据
  useEffect(() => {
    loadCommunities();
  }, [loadCommunities]);

  const handleCreateCommunity = () => {
       router.push(`/community/new`)
  }

  const handleCityClick = (city: CityData) => {
    console.log('点击城市:', city)
    // 跳转到社区详情页
    router.push(`/community/${city.ID}`)
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
        <div className={styles.loadingText}>加载社区数据中...</div>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.floatingElements}>
          <div className={styles.floatingElement}></div>
          <div className={styles.floatingElement}></div>
          <div className={styles.floatingElement}></div>
        </div>
        <div className={styles.titleSection}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>开源社城市社区</h1>
            <div className={styles.titleBadge}>KCC</div>
          </div>
          <div className={styles.subtitle}>
            <Users size={18} />
            <span>连接全球开源开发者，共建技术未来</span>
          </div>
          <div className={styles.statsBar}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{stats.cityCount}+</span>
              <span className={styles.statLabel}>活跃城市</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{stats.developerCount}+</span>
              <span className={styles.statLabel}>开发者</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{stats.projectCount}+</span>
              <span className={styles.statLabel}>项目</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.citiesSection}>
          <h2 className={styles.sectionTitle}>
            <Building2 size={24} />
            <span>社区分布</span>
          </h2>
          <div className={styles.citiesGrid}>
            {cities.map((city, index) => (
              <div
                key={city.ID}
                className={styles.cityCard}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCityClick(city)}
              >
                <div className={styles.cardGlow}></div>
                <div className={styles.cityLogo}>
                  <div className={styles.coverLogo}>
                    <img
                      src={city.cover}
                      alt={city.city}
                      className={styles.coverImage}
                      onError={(e) => {
                        // 图片加载失败时显示默认图标
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* 如果图片加载失败，显示默认图标 */}
                    {!city.cover && (
                      <div className={styles.standardLogo}>
                        <div className={styles.logoPattern}>
                          <div className={styles.logoLines}>
                            <div className={styles.line}></div>
                            <div className={styles.line}></div>
                            <div className={styles.line}></div>
                          </div>
                          <div className={styles.logoCircle}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.cityInfo}>
                  <div className={styles.cityName}>
                    <MapPin size={16} className={styles.locationIcon} />
                    <span>{city.city}</span>
                    {city.isInternational && <Globe size={14} className={styles.internationalIcon} />}
                  </div>
                  <div className={styles.cityStatus}>活跃社区</div>
                </div>
                <div className={styles.cardOverlay}>
                  <ArrowRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actionSection}>
          <div className={styles.actionBackground}></div>
          <div className={styles.actionContent}>
            <div className={styles.actionIcon}>
              <Sparkles size={32} />
            </div>
            <h3 className={styles.actionTitle}>加入我们的开源社区</h3>
            <p className={styles.actionDescription}>与全球顶尖开发者一起构建更好的开源生态系统，分享知识，共同成长</p>
            <div className={styles.actionFeatures}>
              <div className={styles.feature}>
                <Users size={16} />
                <span>技术交流</span>
              </div>
              <div className={styles.feature}>
                <Building2 size={16} />
                <span>项目协作</span>
              </div>
              <div className={styles.feature}>
                <Globe size={16} />
                <span>全球网络</span>
              </div>
            </div>
            <Button type="primary" size="large" className={styles.createButton} onClick={handleCreateCommunity}>
              <Sparkles size={18} />
              KCC 社区创建申请
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage