import React, { useState, useMemo } from 'react'
import VolunteerProfile from '../../../components/volunteer/VolunteerProfile'
import styles from './index.module.css'

const volunteers = [
  {
    name: '晁倩',
    nickname: '啊Q',
    avatar: '/img/volunteers/1.webp',
    date: 2024,
    recommendation:
      '啊 Q 是开源社长期的贡献者， 以立志打造一场 0 bug 的开源大会为目标，对开源社每年的 COSCon 从志愿者管理，赞助商对接，飞到现场活动紧急支援等，都能看到啊 Q 的身影。在家庭生活需要她投入的时候，也意外看到她百忙之中抽出时间来照顾开源社这个十岁的孩子。'
  },
  {
    name: '李建盛',
    nickname: '适兕',
    avatar: '/img/volunteers/2.webp',
    date: 2024,
    recommendation: '连续两年线下组织、支持 KCC 读书会活动。'
  },
  {
    name: '丁文昊',
    nickname: '止戈',
    avatar: '/img/cblecker.png',
    date: 2023,
    recommendation: ''
  },
  {
    name: '惠世翼',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2022,
    recommendation: ''
  },
  {
    name: '朱庆裕',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2022,
    recommendation: ''
  },
  {
    name: '郭浩赟',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2021,
    recommendation: ''
  },
  {
    name: '许银',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2021,
    recommendation: ''
  },
  {
    name: '赵生宇',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2020,
    recommendation: ''
  },
  {
    name: '朱庆裕',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2020,
    recommendation: ''
  },
  {
    name: '舒敏',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2019,
    recommendation: ''
  },
  {
    name: '梁尧',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2019,
    recommendation: ''
  },
  {
    name: '辛庆',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2018,
    recommendation: ''
  },
  {
    name: '王俊波',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2018,
    recommendation: ''
  },
  {
    name: '王春生',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2017,
    recommendation: ''
  },
  {
    name: '李思颖',
    nickname: '',
    avatar: '/img/cblecker.png',
    date: 2017,
    recommendation: ''
  }
]

export default function StarPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024)

  const uniqueYears = useMemo(() => {
    const years = [...new Set(volunteers.map(v => v.date))].sort((a, b) => b - a)
    return years
  }, [])

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter(volunteer => volunteer.date === selectedYear)
  }, [selectedYear])

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>开源之星</h1>
          <p className={styles.subtitle}>
            荣誉介绍：“开源之星”是从2017年开始，开源社理事会设立的奖项，希望通过此奖项鼓励对开源及开源社有较大年度贡献的志愿者。评选范围为开源社（理事会成员外的）正式成员。
          </p>
        </div>

        

        <div className={styles.filterSection}>
   
          <div className={styles.yearFilter}>
            {uniqueYears.map(year => (
              <button
                key={year}
                className={`${styles.yearButton} ${selectedYear === year ? styles.yearButtonActive : ''}`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.volunteersSection}>
         
          
          <div className={styles.volunteersGrid}>
            {filteredVolunteers.map((volunteer, index) => (
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
