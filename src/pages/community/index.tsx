import type React from "react"
import { Button } from "antd"
import { MapPin, Users, Globe, Building2, Sparkles, ArrowRight } from "lucide-react"
import styles from "./index.module.css"

interface CityData {
  name: string
  id: string
  hasSpecialLogo?: boolean
  isInternational?: boolean
}

const cities: CityData[] = [
  { name: "北京", id: "beijing" },
  { name: "长沙", id: "changsha" },
  { name: "成都", id: "chengdu", hasSpecialLogo: true },
  { name: "大连", id: "dalian" },
  { name: "广州", id: "guangzhou" },
  { name: "杭州", id: "hangzhou" },
  { name: "南京", id: "nanjing" },
  { name: "上海", id: "shanghai" },
  { name: "深圳", id: "shenzhen" },
  { name: "新加坡", id: "singapore", hasSpecialLogo: true, isInternational: true },
]

const CommunityPage: React.FC = () => {
  const handleCreateCommunity = () => {
    // Handle community creation application
    console.log("申请创建社区")
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
          {/* <div className={styles.titleIconWrapper}>
            <Globe className={styles.titleIcon} />
            <Sparkles className={styles.sparkleIcon} />
          </div> */}
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
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>活跃城市</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1000+</span>
              <span className={styles.statLabel}>开发者</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
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
              <div key={city.id} className={styles.cityCard} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={styles.cardGlow}></div>
                <div className={`${styles.cityLogo} ${city.hasSpecialLogo ? styles.specialLogo : ""}`}>
                  {city.hasSpecialLogo ? (
                    <div className={styles.specialLogoContent}>
                      <div className={styles.logoBase}>
                        <Building2 size={28} />
                      </div>
                      <div className={styles.mascot}>{city.id === "chengdu" ? "🐼" : "🦁"}</div>
                    </div>
                  ) : (
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
                <div className={styles.cityInfo}>
                  <div className={styles.cityName}>
                    <MapPin size={16} className={styles.locationIcon} />
                    <span>{city.name}</span>
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
