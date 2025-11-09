import type React from "react"
import { Button, Spin, message } from "antd"
import { MapPin, Users, Globe, Building2, Sparkles, ArrowRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
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
        const communitiesData: Community[] = result.data.communities || [];
        console.log('社区数据:', communitiesData);

        setCities(communitiesData);

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
    window.open("https://kaiyuanshe.feishu.cn/share/base/form/shrcnogj5LPzlaiUkFaKpVbxNXe", "_blank")
  }

  const handleCityClick = (city: CityData) => {
    console.log('点击城市:', city)
    // 可以根据 city.id 跳转到详情页
    // router.push(`/communities/${city.id}`)
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