import React, { useState, useMemo } from 'react'
import VolunteerProfile from '../../../components/volunteer/VolunteerProfile'
import styles from './index.module.css'

const cooperationStars2023 = [
  {
    name: 'Hong Phuc Dang',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: 'Anni Lai',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '游崇佑',
    nickname: 'Mac',
    avatar: '/img/cblecker.png',
    recommendation: ''
  }
]

const cooperationStars2022 = [
  {
    name: '李楠',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '高须正和',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  }
]

const cooperationStars2021 = [
  {
    name: '何莹',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '范晶晶',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '李明康',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '李楠',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '高须正和 Takasu Masakazu',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '康悦',
    nickname: 'Rita',
    avatar: '/img/cblecker.png',
    recommendation: ''
  }
]

const yearlyStars = [
  { year: '2023', stars: cooperationStars2023 },
  { year: '2022', stars: cooperationStars2022 },
  { year: '2021', stars: cooperationStars2021 }
]

export default function CooperationPage() {
  const [selectedYear, setSelectedYear] = useState('2023')
  
  const uniqueYears = useMemo(() => {
    return yearlyStars.map(item => item.year).sort((a, b) => parseInt(b) - parseInt(a))
  }, [])
  
  const selectedStars = useMemo(() => {
    return yearlyStars.find(item => item.year === selectedYear)?.stars || cooperationStars2023
  }, [selectedYear])

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>社区合作之星</h1>
          <p className={styles.subtitle}>
            "社区合作之星"是从2021年开始，开源社社区合作组为鼓励对中国开源社区之间的合作有杰出贡献的志愿者而设立的奖项，希望通过此奖项感谢所有为社区合作做出贡献的朋友们。评选对象不限于开源社成员或志愿者。
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
            {selectedStars.map((star, index) => (
              <VolunteerProfile
                key={`${selectedYear}-${index}`}
                name={star.name}
                nickname={star.nickname}
                avatar={star.avatar}
                recommendation={star.recommendation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
