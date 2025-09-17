import {
  GitBranch,
  Globe,
  Users,
  GitMerge,
  PenTool,
  Heart,
  Network,
  Shield,
  Bot,
  Map,
  Trophy,
  Rocket,
  FileText,
  Database
} from 'lucide-react'
import styles from './Mission.module.css'

export default function MissionSection() {
  const missions = [
    {
      icon: <GitBranch className={styles.missionIcon} />,
      title: '开源治理',
      desc: '推动开源项目的规范化治理与可持续发展'
    },
    {
      icon: <Globe className={styles.missionIcon} />,
      title: '国际桥梁',
      desc: '搭建中国与全球开源社区的沟通桥梁'
    },
    {
      icon: <Users className={styles.missionIcon} />,
      title: '社区发展',
      desc: '培育健康的开源社区生态与文化'
    },
    {
      icon: <GitMerge className={styles.missionIcon} />,
      title: '项目孵化',
      desc: '孵化优秀的开源项目与创新技术'
    }
  ]

  const principles = [
    {
      icon: <PenTool className={styles.principleIcon} />,
      title: '贡献',
      desc: '通过代码、文档、设计等方式为开源项目做出有价值的贡献'
    },
    {
      icon: <Heart className={styles.principleIcon} />,
      title: '共识',
      desc: '在社区中建立共同的愿景、价值观和发展目标'
    },
    {
      icon: <Network className={styles.principleIcon} />,
      title: '共治',
      desc: '建立透明、民主的社区治理机制与决策流程'
    }
  ]

  const apps = [
    {
      icon: <Shield className={styles.appIcon} />,
      title: '新冠援助平台',
      desc: '疫情期间的开源援助与协调平台'
    },
    {
      icon: <Globe className={styles.appIcon} />,
      title: '开源社官网',
      desc: '开源社区的官方门户与信息中心'
    },
    {
      icon: <Bot className={styles.appIcon} />,
      title: 'OSS.Chat',
      desc: '开源项目智能对话与协作平台'
    },
    {
      icon: <Map className={styles.appIcon} />,
      title: '中国开源地图',
      desc: '全景展示中国开源项目与社区分布'
    },
    {
      icon: <Database className={styles.appIcon} />,
      title: 'KToken',
      desc: '基于区块链的开源贡献激励系统'
    },
    {
      icon: <Rocket className={styles.appIcon} />,
      title: '小源机器人',
      desc: '智能化的社区服务与互动机器人'
    },
    {
      icon: <FileText className={styles.appIcon} />,
      title: '中国开源年度报告',
      desc: '权威的中国开源发展趋势分析报告'
    },
    {
      icon: <Trophy className={styles.appIcon} />,
      title: '开放黑客松',
      desc: '促进创新与合作的开源竞赛平台'
    }
  ]

  return (
    <section className={styles.missionSection}>
      <div className={styles.container}>
       
        {/* Our Mission */}
        <div className={styles.missionBlock}>
          <div className={styles.blockHeader}>
            <div className={styles.blockNumber}>01</div>
            <h2 className={styles.blockTitle}>我们的使命</h2>
            <div className={styles.blockDivider}></div>
          </div>
          <div className={styles.missionGrid}>
            {missions.map((mission, index) => (
              <div key={index} className={styles.missionCard}>
                <div className={styles.missionIconWrapper}>
                  {mission.icon}
                </div>
                <h3 className={styles.missionTitle}>{mission.title}</h3>
                <p className={styles.missionDesc}>{mission.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Principles */}
        <div className={styles.principlesBlock}>
          <div className={styles.blockHeader}>
            <div className={styles.blockNumber}>02</div>
            <h2 className={styles.blockTitle}>我们的原则</h2>
            <div className={styles.blockDivider}></div>
          </div>
          <div className={styles.principlesGrid}>
            {principles.map((principle, index) => (
              <div key={index} className={styles.principleCard}>
                <div className={styles.principleIconWrapper}>
                  {principle.icon}
                </div>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleDesc}>{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Projects */}
        <div className={styles.appsBlock}>
          <div className={styles.blockHeader}>
            <div className={styles.blockNumber}>03</div>
            <h2 className={styles.blockTitle}>我们的项目</h2>
            <div className={styles.blockDivider}></div>
          </div>
          <div className={styles.appsGrid}>
            {apps.map((app, index) => (
              <div key={index} className={styles.appCard}>
                <div className={styles.appIconWrapper}>
                  {app.icon}
                </div>
                <h3 className={styles.appTitle}>{app.title}</h3>
                <p className={styles.appDesc}>{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
