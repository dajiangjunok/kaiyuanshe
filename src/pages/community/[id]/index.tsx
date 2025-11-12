import type React from "react"
import { Button, Card, Avatar, Tag, Spin, message } from "antd"
import { 
  MapPin, Users, Globe, Building2, Mail, Calendar, 
  Github, Twitter, ArrowLeft, UserPlus, Star, GitBranch
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styles from "./index.module.css"

// 社区成员接口定义
interface CommunityMember {
  id: number;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  email?: string;
  github?: string;
  twitter?: string;
  joinDate: string;
  contributions: number;
  projects: string[];
}

// 社区详情接口定义
interface CommunityDetail {
  ID: number;
  city: string;
  intro: string;
  cover: string;
  register_link: string;
  start_date: string;
  created_at: string;
  updated_at: string;
  isInternational?: boolean;
  memberCount: number;
  projectCount: number;
  eventCount: number;
  members: CommunityMember[];
}

const CommunityDetailPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [community, setCommunity] = useState<CommunityDetail | null>(null)
  const [loading, setLoading] = useState(true)

  // 模拟获取社区详情数据
  useEffect(() => {
    if (!id) return

    const loadCommunityDetail = async () => {
      try {
        setLoading(true)
        
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟社区详情数据
        const mockCommunityData: CommunityDetail = {
          ID: Number(id),
          city: getCityName(Number(id)),
          intro: getCityIntro(Number(id)),
          cover: getCityCover(Number(id)),
          register_link: `https://kaiyuanshe.feishu.cn/share/base/form/shrcn${getCityName(Number(id)).toLowerCase()}`,
          start_date: "2024-01-15T10:00:00Z",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-15T00:00:00Z",
          isInternational: getCityName(Number(id)) === "新加坡",
          memberCount: 156,
          projectCount: 23,
          eventCount: 12,
          members: generateMockMembers()
        }

        setCommunity(mockCommunityData)
      } catch (error) {
        console.error('加载社区详情失败:', error)
        message.error('加载社区详情失败')
      } finally {
        setLoading(false)
      }
    }

    loadCommunityDetail()
  }, [id])

  // 获取城市名称
  const getCityName = (cityId: number): string => {
    const cityMap: Record<number, string> = {
      1: "北京", 2: "上海", 3: "深圳", 4: "广州", 5: "杭州",
      6: "成都", 7: "南京", 8: "长沙", 9: "大连", 10: "新加坡"
    }
    return cityMap[cityId] || "未知城市"
  }

  // 获取城市介绍
  const getCityIntro = (cityId: number): string => {
    const introMap: Record<number, string> = {
      1: "首都开源社区，汇聚全国顶尖技术人才，致力于推动开源技术在政企的应用与发展。",
      2: "国际金融中心的开源力量，连接全球开源生态，推动金融科技与开源技术融合创新。",
      3: "科技创新之都，硬件与软件完美结合的开源实验场，引领物联网与AI开源发展。",
      4: "华南开源技术中心，传统产业与现代科技融合的桥梁，推动制造业数字化转型。",
      5: "数字经济之城，电商与云计算开源技术的创新高地，助力数字中国建设。",
      6: "西南科技重镇，游戏产业与开源技术结合的创新基地，推动西部地区数字化发展。",
      7: "历史文化名城的现代科技力量，高校云集的开源人才培养基地，产学研深度融合。",
      8: "中部崛起的科技新星，工程机械与智能制造的开源技术应用先锋区域。",
      9: "东北亚开源技术门户，软件外包产业与开源技术结合的国际化创新中心。",
      10: "东南亚开源技术枢纽，连接亚太地区开源社区，推动跨境技术合作与交流。"
    }
    return introMap[cityId] || "这是一个充满活力的开源社区。"
  }

  // 获取城市封面
  const getCityCover = (cityId: number): string => {
    const coverMap: Record<number, string> = {
      1: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop",
      2: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba5d2?w=400&h=300&fit=crop",
      3: "https://images.unsplash.com/photo-1551265401-e54b53b6ae36?w=400&h=300&fit=crop",
      4: "https://images.unsplash.com/photo-1551815751-dd711dee3ae4?w=400&h=300&fit=crop",
      5: "https://images.unsplash.com/photo-1571987460726-5d4acb3fecd1?w=400&h=300&fit=crop",
      6: "https://images.unsplash.com/photo-1569949263394-1c0903b2b98d?w=400&h=300&fit=crop",
      7: "https://images.unsplash.com/photo-1577552106387-b6b7b3e3b8c4?w=400&h=300&fit=crop",
      8: "https://images.unsplash.com/photo-1578979879663-4ba8d133646b?w=400&h=300&fit=crop",
      9: "https://images.unsplash.com/photo-1566041510639-8d95a2490bda?w=400&h=300&fit=crop",
      10: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop"
    }
    return coverMap[cityId] || ""
  }

  // 生成模拟成员数据
  const generateMockMembers = (): CommunityMember[] => {
    return [
      {
        id: 1,
        name: "张开源",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        role: "社区管理员",
        bio: "全栈开发者，开源爱好者，致力于推动本地开源生态发展",
        email: "zhangkaiyuan@example.com",
        github: "zhangkaiyuan",
        twitter: "zhangkaiyuan",
        joinDate: "2024-01-15",
        contributions: 127,
        projects: ["Vue.js", "React", "Node.js"]
      },
      {
        id: 2,
        name: "李技术",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
        role: "技术导师",
        bio: "前端架构师，专注于现代前端技术栈和性能优化",
        email: "lijishu@example.com",
        github: "lijishu",
        joinDate: "2024-01-20",
        contributions: 89,
        projects: ["TypeScript", "Webpack", "Vite"]
      },
      {
        id: 3,
        name: "王代码",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        role: "活跃成员",
        bio: "后端工程师，云原生技术专家，Kubernetes贡献者",
        github: "wangdaima",
        joinDate: "2024-02-01",
        contributions: 64,
        projects: ["Kubernetes", "Docker", "Go"]
      },
      {
        id: 4,
        name: "陈算法",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        role: "技术专家",
        bio: "机器学习工程师，专注于AI开源项目和算法优化",
        email: "chensuanfa@example.com",
        twitter: "chensuanfa",
        joinDate: "2024-02-10",
        contributions: 95,
        projects: ["TensorFlow", "PyTorch", "Scikit-learn"]
      },
      {
        id: 5,
        name: "刘创新",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
        role: "新成员",
        bio: "移动端开发者，Flutter和React Native爱好者",
        github: "liuchuangxin",
        joinDate: "2024-03-01",
        contributions: 23,
        projects: ["Flutter", "React Native", "Dart"]
      }
    ]
  }

  const handleBack = () => {
    router.back()
  }

  const handleJoinCommunity = () => {
    if (community?.register_link) {
      window.open(community.register_link, "_blank")
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
        <div className={styles.loadingText}>加载社区详情中...</div>
      </div>
    )
  }

  if (!community) {
    return (
      <div className={styles.errorContainer}>
        <h3>社区信息不存在</h3>
        <Button onClick={handleBack}>返回</Button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* 返回按钮 */}
      <Button 
        icon={<ArrowLeft size={16} />} 
        onClick={handleBack}
        className={styles.backButton}
      >
        返回社区列表
      </Button>

      {/* 社区头部信息 */}
      <div className={styles.header}>
        <div className={styles.headerBackground}>
          <img src={community.cover} alt={community.city} className={styles.coverImage} />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className={styles.headerContent}>
          <div className={styles.communityInfo}>
            <div className={styles.communityTitle}>
              <h1 className={styles.cityName}>
                <MapPin size={24} />
                {community.city}开源社区
                {community.isInternational && <Globe size={20} className={styles.internationalIcon} />}
              </h1>
              <Tag color="green" className={styles.statusTag}>活跃社区</Tag>
            </div>
            <p className={styles.communityIntro}>{community.intro}</p>
            
            {/* 社区统计 */}
            <div className={styles.statsContainer}>
              <div className={styles.stat}>
                
                <span className={styles.statNumber}>{community.memberCount}</span>
                <span className={styles.statLabel}>成员</span>
              </div>
              <div className={styles.stat}>
             
                <span className={styles.statNumber}>{community.projectCount}</span>
                <span className={styles.statLabel}>项目</span>
              </div>
              <div className={styles.stat}>
            
                <span className={styles.statNumber}>{community.eventCount}</span>
                <span className={styles.statLabel}>活动</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 社区成员列表 */}
      <div className={styles.content}>
        <div className={styles.membersSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <Users size={24} />
              社区成员 ({community.members.length})
            </h2>
            <Button 
              type="primary" 
              size="large" 
              icon={<UserPlus size={18} />}
              onClick={handleJoinCommunity}
              className={styles.joinButton}
            >
              加入社区
            </Button>
          </div>
          
          <div className={styles.membersGrid}>
            {community.members.map((member) => (
              <Card key={member.id} className={styles.memberCard}>
                <div className={styles.memberHeader}>
                  <Avatar size={64} src={member.avatar} className={styles.memberAvatar} />
                  <div className={styles.memberInfo}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <Tag color="blue" className={styles.roleTag}>{member.role}</Tag>
                  </div>
                </div>
                
                <p className={styles.memberBio}>{member.bio}</p>
                
                <div className={styles.memberStats}>
                  <div className={styles.memberStat}>
                    <Star size={16} />
                    <span>{member.contributions} 贡献</span>
                  </div>
                  <div className={styles.memberStat}>
                    <Calendar size={16} />
                    <span>加入于 {member.joinDate}</span>
                  </div>
                </div>

                <div className={styles.memberProjects}>
                  <h4>参与项目:</h4>
                  <div className={styles.projectTags}>
                    {member.projects.map((project, index) => (
                      <Tag key={index} className={styles.projectTag}>{project}</Tag>
                    ))}
                  </div>
                </div>

                <div className={styles.memberLinks}>
                  {member.github && (
                    <Button 
                      type="text" 
                      size="small" 
                      icon={<Github size={16} />}
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                    />
                  )}
                  {member.twitter && (
                    <Button 
                      type="text" 
                      size="small" 
                      icon={<Twitter size={16} />}
                      href={`https://twitter.com/${member.twitter}`}
                      target="_blank"
                    />
                  )}
                  {member.email && (
                    <Button 
                      type="text" 
                      size="small" 
                      icon={<Mail size={16} />}
                      href={`mailto:${member.email}`}
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityDetailPage