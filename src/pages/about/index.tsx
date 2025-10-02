import { useState, useEffect } from 'react'
import { Target, Users, FileText, HelpCircle } from 'lucide-react'
import styles from './index.module.css'

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('vision')

  const menuItems = [
    {
      id: 'vision',
      title: '愿景和目标',
      icon: <Target className={styles.menuIcon} />
    },
    {
      id: 'organization',
      title: '组织结构',
      icon: <Users className={styles.menuIcon} />
    },
    {
      id: 'documents',
      title: '常用文档和链接',
      icon: <FileText className={styles.menuIcon} />
    },
    {
      id: 'help',
      title: '知识空间帮助',
      icon: <HelpCircle className={styles.menuIcon} />
    }
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['vision', 'organization', 'documents', 'help']
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const offsetTop = element.offsetTop - 200
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <img
          src="/img/about/banner.jpeg"
          alt="开源社"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>开源社</h1>
          <p className={styles.heroSubtitle}>
            KAIYUANSHE - 致力于推动开源发展的社区
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <nav className={styles.navigation}>
            <h2 className={styles.navTitle}>开源社</h2>
            <ul className={styles.navList}>
              {menuItems.map(item => (
                <li key={item.id} className={styles.navItem}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`${styles.navButton} ${
                      activeSection === item.id ? styles.active : ''
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className={styles.contentArea}>
          {/* Vision Section */}
          <section id="vision" className={styles.section}>
            <h2 className={styles.sectionTitle}>愿景和目标</h2>
            <div className={styles.sectionContent}>
              <p className={styles.description}>
                开源社（英文名称为"KAIYUANSHE"）成立于2014年，是由志愿贡献于开源事业的个人志愿者，依"贡献、共识、共治"原则所组成的开源社区。
              </p>
              <p className={styles.description}>
                开源社始终坚持"厂商中立、公益、非营利"的理念，以"立足中国、贡献全球，推动开源成为新时代的生活方式"为愿景，以"开源治理、国际接轨、社区发展、项目孵化"为使命，旨在共创健康可持续发展的开源生态体系。
              </p>
              <img
                src="/img/about/yuanjin.jpeg"
                alt="愿景"
                className={styles.heroImage}
              />
            </div>
          </section>

          {/* Organization Section */}
          <section id="organization" className={styles.section}>
            <h2 className={styles.sectionTitle}>组织结构</h2>
            <div className={styles.sectionContent}>
              <img
                src="/img/about/zuzhijg.png"
                alt="组织"
                className={styles.heroImage}
              />
              <p className={styles.description}>
                开源社由个人正式成员选举组成理事会，由理事会任命组成执行委员会以及项目委员会。执行委员会负责各个工作组的日常运作，项目委员会负责各个项目的孵化推进，并设立由企业、社区与个人开源专家组成的顾问委员会，以及法律咨询委员会。
              </p>
            </div>
          </section>

          {/* Documents Section */}
          <section id="documents" className={styles.section}>
            <h2 className={styles.sectionTitle}>常用文档和链接</h2>
            <div className={styles.sectionContent}>
              <div className={styles.documentsGrid}>
                <a
                  href="https://www.kaiyuanshe.top/"
                  className={styles.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.linkIcon}>🔗</span>
                  开源社官网
                  <span className={styles.externalIcon}>↗</span>
                </a>
              </div>
            </div>
          </section>

          {/* Help Section */}
          <section id="help" className={styles.section}>
            <h2 className={styles.sectionTitle}>知识空间帮助</h2>
            <div className={styles.sectionContent}>
               <p className={styles.description}>
              这里你可以添加知识库使用规范、操作流程、管理员联系方式等。
              </p>
              <img
                src="/img/about/help.gif"
                alt="帮助"
                className={styles.heroImage}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default AboutPage
