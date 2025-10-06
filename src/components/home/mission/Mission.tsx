import {
  GitBranch,
  Globe,
  Users,
  GitMerge,
  PenTool,
  Heart,
  Network
} from 'lucide-react'
import Image from 'next/image'
import styles from './Mission.module.css'
import { useTranslation } from '../../../hooks/useTranslation'

export default function MissionSection() {
  const { t } = useTranslation()
  
  const missions = [
    {
      icon: <GitBranch className={styles.missionIcon} />,
      title: t('homepage.mission.missions.governance.title'),
      desc: t('homepage.mission.missions.governance.description')
    },
    {
      icon: <Globe className={styles.missionIcon} />,
      title: t('homepage.mission.missions.bridge.title'),
      desc: t('homepage.mission.missions.bridge.description')
    },
    {
      icon: <Users className={styles.missionIcon} />,
      title: t('homepage.mission.missions.community.title'),
      desc: t('homepage.mission.missions.community.description')
    },
    {
      icon: <GitMerge className={styles.missionIcon} />,
      title: t('homepage.mission.missions.incubation.title'),
      desc: t('homepage.mission.missions.incubation.description')
    }
  ]

  const principles = [
    {
      icon: <PenTool className={styles.principleIcon} />,
      title: t('homepage.mission.principles.contribution.title'),
      desc: t('homepage.mission.principles.contribution.description')
    },
    {
      icon: <Heart className={styles.principleIcon} />,
      title: t('homepage.mission.principles.consensus.title'),
      desc: t('homepage.mission.principles.consensus.description')
    },
    {
      icon: <Network className={styles.principleIcon} />,
      title: t('homepage.mission.principles.governance.title'),
      desc: t('homepage.mission.principles.governance.description')
    }
  ]

  const apps = [
    {
      img: '/img/home/xgyzpt.png',
      title: t('homepage.mission.projects.covidPlatform.title'),
      desc: t('homepage.mission.projects.covidPlatform.description'),
      href: 'https://wuhan2020.kaiyuanshe.cn/#'
    },
    {
      img: '/img/home/kysgw.png',
      title: t('homepage.mission.projects.officialWebsite.title'),
      desc: t('homepage.mission.projects.officialWebsite.description'),
      href: '/'
    },
    {
      img: '/img/home/ossChat.png',
      title: t('homepage.mission.projects.ossChat.title'),
      desc: t('homepage.mission.projects.ossChat.description'),
      href: 'https://github.com/kaiyuanshe/osschat'
    },
    {
      img: '/img/home/map.png',
      title: t('homepage.mission.projects.chinaMap.title'),
      desc: t('homepage.mission.projects.chinaMap.description'),
      href: '/organization'
    },
    {
      img: '/img/home/kToken.png',
      title: t('homepage.mission.projects.kToken.title'),
      desc: t('homepage.mission.projects.kToken.description'),
      href: 'https://github.com/kaiyuanshe/KToken'
    },
    {
      img: '/img/home/xyjqr.png',
      title: t('homepage.mission.projects.xiaoyuanBot.title'),
      desc: t('homepage.mission.projects.xiaoyuanBot.description'),
      href: 'https://github.com/kaiyuanshe/xiaoyuan'
    },
    {
      img: '/img/home/kybg.png',
      title: t('homepage.mission.projects.annualReport.title'),
      desc: t('homepage.mission.projects.annualReport.description'),
      href: 'https://kaiyuanshe.feishu.cn/wiki/wikcnUDeVll6PNzw900yPV71Sxd'
    },
    {
      img: '/img/home/hackathon.png',
      title: t('homepage.mission.projects.hackathon.title'),
      desc: t('homepage.mission.projects.hackathon.description'),
      href: 'https://hackathon.kaiyuanshe.cn/'
    }
  ]

  return (
    <section className={styles.missionSection}>
      <div className={styles.container}>
        {/* Our Mission */}
        <div className={styles.missionBlock}>
          <div className={styles.blockHeader}>
            <div className={styles.blockNumber}>{t('homepage.mission.blockNumber01')}</div>
            <h2 className={styles.blockTitle}>{t('homepage.mission.ourMission')}</h2>
            <div className={styles.blockDivider}></div>
          </div>
          <div className={styles.missionGrid}>
            {missions.map((mission, index) => (
              <div key={index} className={styles.missionCard}>
                <div className={styles.missionIconWrapper}>{mission.icon}</div>
                <h3 className={styles.missionTitle}>{mission.title}</h3>
                <p className={styles.missionDesc}>{mission.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Principles */}
        <div className={styles.principlesBlock}>
          <div className={styles.blockHeader}>
            <div className={styles.blockNumber}>{t('homepage.mission.blockNumber02')}</div>
            <h2 className={styles.blockTitle}>{t('homepage.mission.ourPrinciples')}</h2>
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
            <div className={styles.blockNumber}>{t('homepage.mission.blockNumber03')}</div>
            <h2 className={styles.blockTitle}>{t('homepage.mission.ourProjects')}</h2>
            <div className={styles.blockDivider}></div>
          </div>
          <div className={styles.appsGrid}>
            {apps.map((app, index) => (
              <a
                key={index}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.appCard}
              >
                <Image 
                  src={app.img} 
                  alt={app.title} 
                  width={80}
                  height={80}
                  className={styles.appIcon} 
                />

                <h3 className={styles.appTitle}>{app.title}</h3>
                <p className={styles.appDesc}>{app.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
