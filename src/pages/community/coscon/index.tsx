import React, { useState, useMemo } from 'react'
import VolunteerProfile from '../../../components/volunteer/VolunteerProfile'
import styles from './index.module.css'

const cosconStars2023 = [
  {
    name: '刘于瑜',
    nickname: 'Miya',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '王玥敏',
    nickname: '月饼',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '朱亿钦',
    nickname: '居居',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '罗蕊艳',
    nickname: '小汭',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '赵玭月',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '王萱',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '赵文涵',
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
    name: '薛云鹤',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '宋妮龙吟',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '邝曾珍',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '陈玄',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '易慧媛',
    nickname: '果汁',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '石垚',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '刘绪光',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '黄绍雅',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '桑毅炜',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '罗基印',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '谢祥佳',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '王润林',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  }
]

const cosconStars2022 = [
  {
    name: '王玥敏',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '袁睿斌',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '朱亿钦',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '程诗杰',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '马红伟',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '郭琦',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '崔晨洋',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '丁文昊',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '李宇飞',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '沈于蓝',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '陈玄',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '李明康',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  }
]

const cosconStars2021 = [
  {
    name: '代立冬',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '朱庆裕',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '舒敏',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '晁倩',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '王玥敏',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '惠世冀',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '袁睿斌',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '朱亿钦',
    nickname: '居居',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '赵苓俐',
    nickname: '灵儿',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '刘于瑜',
    nickname: 'Miya',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '程诗杰',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '陈智浩.Jacky',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  }
]

const cosconStars2020 = [
  {
    name: '何莹',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '苏帅',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '郭浩赟',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '袁艺',
    nickname: '袁滚滚',
    avatar: '/img/cblecker.png',
    recommendation: ''
  }
]

const cosconStars2019 = [
  {
    name: '许银',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '晁倩',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  },
  {
    name: '王晓珂',
    nickname: '',
    avatar: '/img/cblecker.png',
    recommendation: ''
  }
]

const yearlyStars = [
  { year: '2023', stars: cosconStars2023 },
  { year: '2022', stars: cosconStars2022 },
  { year: '2021', stars: cosconStars2021 },
  { year: '2020', stars: cosconStars2020 },
  { year: '2019', stars: cosconStars2019 }
]

const totalStars = cosconStars2023.length + cosconStars2022.length + cosconStars2021.length + cosconStars2020.length + cosconStars2019.length

export default function COSConStarPage() {
  const [selectedYear, setSelectedYear] = useState('2023')
  
  const uniqueYears = useMemo(() => {
    return yearlyStars.map(item => item.year).sort((a, b) => parseInt(b) - parseInt(a))
  }, [])
  
  const selectedStars = useMemo(() => {
    return yearlyStars.find(item => item.year === selectedYear)?.stars || cosconStars2023
  }, [selectedYear])

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>COSCon之星</h1>
          <p className={styles.subtitle}>
            "COSCon之星"是从2019年开始，中国开源年会组委会（COSCon 组委会）为鼓励对中国开源年会有卓越贡献的志愿者而设立的奖项，希望通过此奖项感谢各位积极参与并贡献COSCon的小伙伴。评选范围为COSCon志愿者。
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