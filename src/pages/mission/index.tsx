import { GitBranch, Globe, Users, GitMerge, PenTool, Heart, Network } from 'lucide-react'
import GlassIcons from '@/components/bitsUI/glassIcons/GlassIcon'
import styles from './index.module.css'

export default function MissionSection() {
  const missions = [
    {
      icon: <GitBranch className={styles.missionIcon} />,
      label: '开源治理',
       color: 'indigo'
    },
    {
      icon: <Globe className={styles.missionIcon} />,
      label: '国际桥梁', 
    color: 'indigo'
    },
    {
      icon: <Users className={styles.missionIcon} />,
      label: '社区发展',
  color: 'indigo'
    },
    {
      icon: <GitMerge className={styles.missionIcon} />,
      label: '项目孵化',
  color: 'indigo'
    }
  ]

  const principles = [
    {
      icon: <PenTool className={styles.principleIcon} />,
      label: '贡献',
  color: 'indigo'
    },
    {
      icon: <Heart className={styles.principleIcon} />,
      label: '共识',
  color: 'indigo'
    },
    {
      icon: <Network className={styles.principleIcon} />,
      label: '共治',
  color: 'indigo'
    }
  ]

  return (
    <section className={styles.missionSection}>
      <div className={styles.container}>
        {/* Our Mission */}
        <div className={styles.missionBlock}>
          <h2 className={styles.sectionTitle}>我们的使命</h2>
           <GlassIcons  items={missions} className="custom-class"/>
        </div>

        {/* Our Principles */}
        <div className={styles.principlesBlock}>
          <h2 className={styles.sectionTitle}>我们的原则</h2>
             <GlassIcons  items={principles} className="custom-class"/>
        </div>
      </div>
    </section>
  )
}