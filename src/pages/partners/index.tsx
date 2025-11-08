import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Dropdown, type MenuProps } from 'antd'
import { ChevronDown } from 'lucide-react'
import styles from './index.module.css'
import { Partner, partnersData, levelOrder } from '@/data/partners'


const PartnersPage: React.FC = () => {
  const availableLevels = useMemo(() => {
    return levelOrder.filter(level => partnersData[level] && partnersData[level].length > 0)
  }, [])

  const [selectedLevel, setSelectedLevel] = useState<string>('全部')

  const levelMenuItems: MenuProps['items'] = [
    {
      key: '全部',
      label: '全部',
      onClick: () => setSelectedLevel('全部')
    },
    ...availableLevels.map(level => ({
      key: level,
      label: level,
      onClick: () => setSelectedLevel(level)
    }))
  ]

  const filteredPartners = useMemo(() => {
    if (selectedLevel === '全部') {
      const allPartners: Partner[] = []
      levelOrder.forEach(level => {
        if (partnersData[level]) {
          allPartners.push(...partnersData[level])
        }
      })
      return allPartners
    } else {
      return partnersData[selectedLevel] || []
    }
  }, [selectedLevel])

  const renderPartnerCard = (partner: Partner) => (
    <div key={partner.title} className={`${styles.partnerCard} ${!partner.tag ? styles.partnerCardNoTag : ''}`}>
      <div className={styles.partnerLogoContainer}>
        {partner.link ? (
          <a 
            href={partner.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.partnerLink}
          >
            <Image 
              src={partner.logo} 
              alt={partner.organization} 
              title={partner.title}
              className={styles.partnerLogo}
              width={100}
              height={80}
              style={{ objectFit: 'contain' }}
            />
          </a>
        ) : (
          <Image 
            src={partner.logo} 
            alt={partner.organization} 
            title={partner.title}
            className={styles.partnerLogo}
            width={100}
            height={80}
            style={{ objectFit: 'contain' }}
          />
        )}
      </div>
      {partner.tag && (
        <div className={styles.partnerTag}>
          {partner.tag}
        </div>
      )}
      <div className={styles.partnerTitle}>
        {partner.title}
      </div>
    </div>
  )

  const renderPartnerSection = (level: string, partners: Partner[]) => {
    if (!partners || partners.length === 0) return null
    
    const isHighTierSponsor = level === '战略赞助' || level === '白金赞助'
    const gridClassName = isHighTierSponsor ? styles.singleRowGrid : styles.partnersGrid
    
    return (
      <section key={level} className={styles.partnerSection}>
        <h3 className={styles.sectionTitle}>{level}</h3>
        <div className={gridClassName}>
          {partners.map(renderPartnerCard)}
        </div>
      </section>
    )
  }

  return (
    <div className={`${styles.container} nav-t-top`}>
      <div className={styles.content}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>合作伙伴</h1>
          <p className={styles.subtitle}>
            感谢所有合作伙伴对开源社的大力支持，共同推动开源生态的发展与繁荣
          </p>
        </div>

        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{filteredPartners.length}</div>
            <div className={styles.statLabel}>合作伙伴</div>
          </div>
          <div className={styles.statItem}>
            <Dropdown 
              menu={{ items: levelMenuItems }}
              trigger={['click','hover']}
            >
              <div className={styles.levelSelect}>
                <span>{selectedLevel}</span>
                <ChevronDown size={28} />
              </div>
            </Dropdown>
            <div className={styles.statLabel}>合作级别</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{availableLevels.length}</div>
            <div className={styles.statLabel}>合作类型</div>
          </div>
        </div>

        <div className={styles.partnersSection}>
          {selectedLevel === '全部' ? (
            <div className={styles.partnersContainer}>
              {levelOrder.map(level => {
                if (!partnersData[level] || partnersData[level].length === 0) return null
                return renderPartnerSection(level, partnersData[level])
              })}
            </div>
          ) : (
            <div className={styles.partnersContainer}>
              {renderPartnerSection(selectedLevel, filteredPartners)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PartnersPage