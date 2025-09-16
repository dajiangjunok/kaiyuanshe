import { GitBranch, Globe, Users, GitMerge, PenTool, Heart, Network } from 'lucide-react'
import styles from './index.module.css'

export default function MissionSection() {
  const missions = [
    {
      icon: <GitBranch className={styles.missionIcon} />,
      title: '开源治理',
      description: 'Open Source Governance'
    },
    {
      icon: <Globe className={styles.missionIcon} />,
      title: '国际桥梁', 
      description: 'International Bridge'
    },
    {
      icon: <Users className={styles.missionIcon} />,
      title: '社区发展',
      description: 'Community Development'
    },
    {
      icon: <GitMerge className={styles.missionIcon} />,
      title: '项目孵化',
      description: 'Project Incubation'
    }
  ]

  const principles = [
    {
      icon: <PenTool className={styles.principleIcon} />,
      title: '贡献',
      description: 'Contribution'
    },
    {
      icon: <Heart className={styles.principleIcon} />,
      title: '共识',
      description: 'Consensus'
    },
    {
      icon: <Network className={styles.principleIcon} />,
      title: '共治',
      description: 'Co-governance'
    }
  ]

  return (
    <section className={styles.missionSection}>
      <div className={styles.container}>
        {/* Our Mission */}
        <div className={styles.missionBlock}>
          <h2 className={styles.sectionTitle}>我们的使命</h2>
          <div className={styles.missionGrid}>
            {missions.map((mission, index) => (
              <div key={`mission-${index}`} className={styles.missionCard}>
                <div className={styles.missionIconWrapper}>
                  {mission.icon}
                </div>
                <h3 className={styles.missionTitle}>{mission.title}</h3>
                <p className={styles.missionDesc}>{mission.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Principles */}
        <div className={styles.principlesBlock}>
          <h2 className={styles.sectionTitle}>我们的原则</h2>
          <div className={styles.principlesGrid}>
            {principles.map((principle, index) => (
              <div key={`principle-${index}`} className={styles.principleCard}>
                <div className={styles.principleIconWrapper}>
                  {principle.icon}
                </div>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleDesc}>{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}