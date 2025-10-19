import React from 'react'
import VolunteerProfile from '../../../components/volunteer/VolunteerProfile'
import styles from './index.module.css'

const volunteers = [
  {
    name: '景倩',
    nickname: '阿Q',
    avatar: '/img/volunteers/1.webp',
    recommendation:
      '啊 Q 是开源社长期的贡献者， 以立志打造一场 0 bug 的开源大会为目标，对开源社每年的 COSCon 从志愿者管理，赞助商对接，飞到现场活动紧急支援等，都能看到啊 Q 的身影。在家庭生活需要她投入的时候，也意外看到她百忙之中抽出时间来照顾开源社这个十岁的孩子。'
  },
  {
    name: '李建盛',
    nickname: '适兕',
    avatar: '/img/volunteers/2.webp',
    recommendation: '连续两年线下组织、支持 KCC 读书会活动。'
  }
]

export default function StarPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>开源之星</h1>
          <p className={styles.subtitle}>
            致敬那些为开源社区作出杰出贡献的开源之星们，他们的努力照亮着开源的道路
          </p>
        </div>

        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{volunteers.length}</div>
            <div className={styles.statLabel}>开源之星</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>2024</div>
            <div className={styles.statLabel}>年度表彰</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>⭐</div>
            <div className={styles.statLabel}>闪耀贡献</div>
          </div>
        </div>

        <div className={styles.volunteersSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>明星风采</h2>
            <p className={styles.sectionDescription}>每一份杰出贡献都值得被赞誉</p>
          </div>
          
          <div className={styles.volunteersGrid}>
            {volunteers.map((volunteer, index) => (
              <VolunteerProfile
                key={index}
                name={volunteer.name}
                nickname={volunteer.nickname}
                avatar={volunteer.avatar}
                recommendation={volunteer.recommendation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
