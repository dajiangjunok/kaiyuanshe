import React, { useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'

interface Partner {
  name: string
  logo: string
  url?: string
  level: string
}

interface YearData {
  [level: string]: Partner[]
}

const partnersData: { [year: number]: YearData } = {
  2024: {
    '协办单位': [
      {
        name: '北京中关村创业大街科技服务有限公司',
        logo: '/api/lark/file/CtENbPL80osQwsx8dRxc2DVqnue.webp',
        level: '协办单位'
      }
    ],
    '白金赞助': [
      {
        name: '浪潮 KaiwuDB & KWDB 社区',
        logo: '/api/lark/file/Sg6Ubpp72oVLj3xHuVycwH8anme.webp',
        url: 'https://www.kaiwudb.com/',
        level: '白金赞助'
      }
    ],
    '金牌赞助': [
      {
        name: '华为',
        logo: '/api/lark/file/Yeimb7EoSoatVhx2tWTcOuEdnvf.png',
        level: '金牌赞助'
      }
    ],
    '银牌赞助': [
      {
        name: '蚂蚁开源',
        logo: '/api/lark/file/Pw5pb1bqloC1UkxhffqcchNcnRf.jpg',
        url: 'https://opensource.antgroup.com/',
        level: '银牌赞助'
      },
      {
        name: '亚马逊云科技',
        logo: '/api/lark/file/RXt8bsDM2oAumTxdLtpcqf24nfc.webp',
        level: '银牌赞助'
      },
      {
        name: 'OceanBase',
        logo: '/api/lark/file/DUW8bgxVSowZwfxezLyc3hxKnhM.png',
        level: '银牌赞助'
      },
      {
        name: 'openKylin',
        logo: '/api/lark/file/Ui2qbfaG7oWsc0xaXsgcfG0XnAc.png',
        level: '银牌赞助'
      }
    ],
    '星牌赞助': [
      {
        name: '安势信息',
        logo: '/api/lark/file/IIXwb9K2xorE0kx1wMxconQfnL3.png',
        level: '星牌赞助'
      },
      {
        name: '醋溜科技',
        logo: '/api/lark/file/AtDVbNbIjotWifxRSMDckRiSnIe.jpg',
        url: 'https://www.culiu-tech.com/',
        level: '星牌赞助'
      },
      {
        name: '北京大成（上海）律师事务所',
        logo: '/api/lark/file/S8dNb7s1Co9coOxZHdjchNUKn7U.webp',
        level: '星牌赞助'
      },
      {
        name: '迪码科技',
        logo: '/api/lark/file/SmATb2SQSoFPTExGHzpc8nHVnSh.png',
        url: 'https://www.dimatec.com.cn/portal/aboutus.html',
        level: '星牌赞助'
      },
      {
        name: '立创开源硬件平台',
        logo: '/api/lark/file/Qd1rbWdY0oRNLVxP2oPckFCNnnh.png',
        url: 'https://oshwhub.com/',
        level: '星牌赞助'
      },
      {
        name: 'Seafile',
        logo: '/api/lark/file/DVGobTYa5oY2a7xObeDcGsX6ngd.png',
        level: '星牌赞助'
      }
    ],
    '战略合作社区': [
      {
        name: 'SegmentFault 思否',
        logo: '/api/lark/file/M6DxbRm5coWH0yxMsZscl4ennMb.png',
        url: 'https://segmentfault.com/',
        level: '战略合作社区'
      }
    ]
  },
  2023: {
    '协办单位': [
      {
        name: '电子科技大学',
        logo: '/api/lark/file/QwQ2bKMA6ohCsIx6ta2cy1ntn9f.png',
        level: '协办单位'
      },
      {
        name: '成都傲世信息技术有限公司',
        logo: '/api/lark/file/Y9JfbURWfoT9bMx4NS4cjE7tnCg.jpg',
        level: '协办单位'
      }
    ],
    '指导单位': [
      {
        name: '成都市高新区科技创新局',
        logo: '/api/lark/file/F67tbzUfro3oEtxpszXc9UDqnAg.jpg',
        level: '指导单位'
      }
    ],
    '白金赞助': [
      {
        name: '华为',
        logo: '/api/lark/file/Yeimb7EoSoatVhx2tWTcOuEdnvf.png',
        level: '白金赞助'
      },
      {
        name: '浪潮',
        logo: '/api/lark/file/Xxy5brcmkoMwzUx0ftfcHg3onth.jpg',
        level: '白金赞助'
      }
    ],
    '金牌赞助': [
      {
        name: 'GOSIM',
        logo: '/api/lark/file/SLN1bXIbgo0jIkxe09hckbwunlh.png',
        level: '金牌赞助'
      }
    ],
    '银牌赞助': [
      {
        name: 'NEAR',
        logo: '/api/lark/file/Ro9Ebrq3DoiCShx9HU6cas2inOc.png',
        url: 'https://github.com/near',
        level: '银牌赞助'
      },
      {
        name: 'OceanBase',
        logo: '/api/lark/file/DUW8bgxVSowZwfxezLyc3hxKnhM.png',
        level: '银牌赞助'
      },
      {
        name: '亚马逊云科技',
        logo: '/api/lark/file/RXt8bsDM2oAumTxdLtpcqf24nfc.webp',
        level: '银牌赞助'
      },
      {
        name: '蚂蚁开源',
        logo: '/api/lark/file/Pw5pb1bqloC1UkxhffqcchNcnRf.jpg',
        url: 'https://opensource.antgroup.com/',
        level: '银牌赞助'
      },
      {
        name: '麒麟软件有限公司',
        logo: '/api/lark/file/UCa3b33iFosc3ixklVWcThEjnQf.jpg',
        url: 'https://www.kylinos.cn/',
        level: '银牌赞助'
      }
    ]
  },
  2022: {
    '白金赞助': [
      {
        name: '开务数据库',
        logo: '/api/lark/file/UT1TbHWvBot1VtxwYULcw93ZnDE.png',
        level: '白金赞助'
      },
      {
        name: 'VMWare',
        logo: '/api/lark/file/Nw5jbJ0rnoMrQ6xZCisc8Ymkn4e.jpg',
        level: '白金赞助'
      },
      {
        name: '百度开源',
        logo: '/api/lark/file/DPpWbmiLvoD4eoxjc4yccqrcnlc.png',
        level: '白金赞助'
      },
      {
        name: '华为',
        logo: '/api/lark/file/Yeimb7EoSoatVhx2tWTcOuEdnvf.png',
        level: '白金赞助'
      },
      {
        name: '微众银行',
        logo: '/api/lark/file/N94ObM2XQoxDPTxiVbwceWsCndc.png',
        level: '白金赞助'
      },
      {
        name: '字节跳动',
        logo: '/api/lark/file/J3AfbuFCiorvy5xogovcAcwznYg.jpg',
        level: '白金赞助'
      }
    ],
    '金牌赞助': [
      {
        name: '亚马逊云科技',
        logo: '/api/lark/file/RXt8bsDM2oAumTxdLtpcqf24nfc.webp',
        level: '金牌赞助'
      },
      {
        name: '微软',
        logo: '/api/lark/file/An2EbHu0XoZEvZxbXzgcUerLnLb.jpg',
        level: '金牌赞助'
      }
    ]
  }
}

const levelOrder = [
  '主办单位',
  '承办单位',
  '协办单位',
  '指导单位',
  '战略赞助',
  '白金赞助',
  '金牌赞助',
  '银牌赞助',
  '铜牌赞助',
  '星牌赞助',
  '战略合作社区',
  '战略合作媒体',
  '媒体伙伴'
]

const levelNames: { [key: string]: string } = {
  '主办单位': 'Hosted by',
  '承办单位': 'Organized by',
  '协办单位': 'Co-organized by',
  '指导单位': 'Directed by',
  '战略赞助': 'Strategic Sponsor',
  '白金赞助': 'Platinum Sponsor',
  '金牌赞助': 'Gold Sponsor',
  '银牌赞助': 'Silver Sponsor',
  '铜牌赞助': 'Bronze Sponsor',
  '星牌赞助': 'Startup Sponsor',
  '战略合作社区': 'Strategic Community Partner',
  '战略合作媒体': 'Strategic Media Partner',
  '媒体伙伴': 'Media Partner'
}

const PartnersPage: React.FC = () => {
  const [activeYear, setActiveYear] = useState<number>(2024)
  const years = Object.keys(partnersData).map(Number).sort((a, b) => b - a)

  const renderPartnerCard = (partner: Partner) => (
    <div key={partner.name} className={styles.partnerCard}>
      {partner.url ? (
        <a 
          href={partner.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.partnerLink}
        >
          <Image 
            src={partner.logo} 
            alt={partner.name} 
            title={partner.name}
            className={styles.partnerLogo}
            width={300}
            height={80}
            style={{ objectFit: 'contain' }}
          />
        </a>
      ) : (
        <Image 
          src={partner.logo} 
          alt={partner.name} 
          title={partner.name}
          className={styles.partnerLogo}
          width={300}
          height={80}
          style={{ objectFit: 'contain' }}
        />
      )}
    </div>
  )

  const renderPartnerSection = (level: string, partners: Partner[]) => {
    if (!partners || partners.length === 0) return null

    const isPlatinum = level === '白金赞助'
    
    return (
      <section key={level} className={styles.partnerSection}>
        <h3 className={styles.sectionTitle}>{levelNames[level] || level}</h3>
        <div className={`${styles.partnersGrid} ${isPlatinum ? styles.platinumGrid : ''}`}>
          {partners.map(renderPartnerCard)}
        </div>
      </section>
    )
  }

  const currentYearData = partnersData[activeYear] || {}
  const sortedLevels = levelOrder.filter(level => currentYearData[level])

  return (
    <div className={`${styles.container} nav-t-top`}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Our Partners</h1>
            <p className={styles.subtitle}>携手共进，共建开源生态</p>
          </div>
          
          <nav className={styles.yearNavigation}>
            {years.map(year => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`${styles.yearButton} ${
                  activeYear === year ? styles.yearButtonActive : ''
                }`}
              >
                {year}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.yearSection}>
          <h2 className={styles.yearTitle}>{activeYear}</h2>
          
          <div className={styles.partnersContainer}>
            {sortedLevels.map(level => 
              renderPartnerSection(level, currentYearData[level])
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnersPage