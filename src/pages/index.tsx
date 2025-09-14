import {
  Users,
  Zap,
  Code,
  Shield,
  Cpu,
  Database,
  BookOpen,
  Globe,
  Rocket,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './index.module.css'
import { SiTelegram, SiX } from 'react-icons/si'
import { Image } from 'antd'
import EventSection from './events/section'
import { getDapps } from './api/dapp'

export default function Home() {
  const router = useRouter()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [dapps, setDapps] = useState<any[]>([])
  const pageSize = 20
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollGallery = (direction: 'left' | 'right') => {
    const container = document.querySelector(
      `.${styles.galleryContainer}`
    ) as HTMLElement
    if (container) {
      const scrollAmount = 312 // Width of one image (280px) plus gap (32px)
      const currentScroll = container.scrollLeft

      let targetScroll
      if (direction === 'left') {
        if (currentScroll <= scrollAmount) {
          targetScroll = 0
        } else {
          targetScroll = currentScroll - scrollAmount
        }
      } else {
        const maxScroll = container.scrollWidth - container.clientWidth
        targetScroll = Math.min(maxScroll, currentScroll + scrollAmount)
      }

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const fetchDapps = async () => {
      try {
        const params = {
          is_feature: 1,
          page: 1,
          page_size: pageSize
        }
        const result = await getDapps(params)
        if (result.success && result.data && Array.isArray(result.data.dapps)) {
          setDapps(result.data.dapps)
        }
      } catch (error) {
        console.error('获取 DApps 列表失败:', error)
      }
    }
    fetchDapps()
  }, [])

  useEffect(() => {
    let animationFrame: number
    const scrollContainer = scrollRef.current

    const scroll = () => {
      if (scrollContainer  ) {
        scrollContainer.scrollLeft += 0.5
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollContainer.scrollLeft = 0
        }
      }
      animationFrame = requestAnimationFrame(scroll)
    }

    animationFrame = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    const styles = [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`
    }))

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const features = [
    {
      icon: <Zap className={styles.featureIcon} />,
      title: '多链聚合',
      description: '统一整合以太坊等多条 Web3 链上的活动、文章、博客和社区动态'
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: '开发者分析',
      description: '实时采集并统计开发者数据，帮助发现生态趋势与活跃度'
    },
    {
      icon: <Cpu className={styles.featureIcon} />,
      title: '内容聚合',
      description: '跨平台整合 Web3 最新资讯与优质文章，减少信息碎片化'
    },
    {
      icon: <Database className={styles.featureIcon} />,
      title: '生态导航',
      description: '全景化展示生态 DApps 与项目，便于开发者快速了解与参与'
    }
  ]

  return (
    <div className={styles.homepage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient}></div>
          <div
            className={styles.mouseGradient}
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`
            }}
          ></div>
        </div>

        <div className={styles.container}>
          <div
            className={`${styles.heroContent} ${isVisible ? styles.heroVisible : ''}`}
          >
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleSecondary}>開源社</span>
            </h1>

            <div className={styles.titleDecoration}>
              <div className={styles.decorationGradient}></div>
              <div className={styles.decorationLine}></div>
            </div>
            <p className={styles.heroSubtitle}>
              <span className={styles.heroHighlight}>
                聚合 Web3 活动 · 社区 · 文章 · 数据 —— 开发者的一站式广场
              </span>
            </p>

            <div className={styles.heroGallery}>
              <button
                className={`${styles.galleryNavigation} ${styles.galleryNavPrev}`}
                onClick={() => scrollGallery('left')}
                aria-label="Previous images"
              >
                <ChevronLeft className={styles.galleryNavIcon} />
              </button>

              <div className={styles.galleryContainer}>
                {/* 示例图片，可替换为 DevPlaza 相关活动图 */}
                <div className={styles.galleryImage}>
                  <Image
                    src="/img/rotation/activity1.png"
                    alt="Dev"
                    width={300}
                    height={195}
                    style={{ borderRadius: '14px' }}
                    preview={{ mask: false }}
                  />
                </div>
                <div className={styles.galleryImage}>
                  <Image
                    src="/img/rotation/activity2.png"
                    alt="中国开源年会2024"
                    width={300}
                    height={195}
                    style={{ borderRadius: '14px' }}
                    preview={{ mask: false }}
                  />
                </div>
                <div className={styles.galleryImage}>
                  <Image
                    src="/img/rotation/activity3.png"
                    alt="2024第八届中国开源年会"
                    width={300}
                    height={195}
                    style={{ borderRadius: '14px' }}
                    preview={{ mask: false }}
                  />
                </div>
                <div className={styles.galleryImage}>
                  <Image
                    src="/img/rotation/activity4.png"
                    alt="中国开运啊"
                    width={300}
                    height={195}
                    style={{ borderRadius: '14px' }}
                    preview={{ mask: false }}
                  />
                </div>
                <div className={styles.galleryImage}>
                  <Image
                    src="/img/rotation/activity5.png"
                    alt="coscup2024大陆讲师团"
                    width={300}
                    height={195}
                    style={{ borderRadius: '14px' }}
                    preview={{ mask: false }}
                  />
                </div>
              </div>

              <button
                className={`${styles.galleryNavigation} ${styles.galleryNavNext}`}
                onClick={() => scrollGallery('right')}
                aria-label="Next images"
              >
                <ChevronRight className={styles.galleryNavIcon} />
              </button>
            </div>

            <div className={styles.heroButtons}>
              <Link href="/about" className={styles.heroPrimaryButton}>
                <Globe className={styles.buttonIcon} />
                了解 DevPlaza
              </Link>
              <Link href="/events" className={styles.heroSecondaryButton}>
                <Users className={styles.buttonIcon} />
                加入社区
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <EventSection />

      {/* Milestones Section */}
      <section className={styles.milestones}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>DevPlaza 里程碑</h2>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>核心功能</h2>
            <p className={styles.sectionDescription}>
              DevPlaza 通过整合 Web3
              多链数据、活动与社区内容，为开发者提供高效的一站式体验
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={`feature-${index}`} className={styles.featureCard}>
                <div className={styles.featureCardGlow}></div>
                <div className={styles.featureCardContent}>
                  <div className={styles.featureIconWrapper}>
                    {feature.icon}
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className={styles.resources}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>学习资源</h2>
            <p className={styles.sectionDescription}>
              通过教程、文章和文档，帮助开发者从 Web2 快速转型 Web3
            </p>
          </div>
          <div className={styles.resourcesGrid}>
            <div className={styles.resourceCard}>
              <BookOpen className={styles.resourceIcon} />
              <h3 className={styles.resourceTitle}>教程</h3>
              <p className={styles.resourceDesc}>
                系统学习如何从零开始构建 Web3 应用
              </p>
            </div>
            <div className={styles.resourceCard}>
              <Code className={styles.resourceIcon} />
              <h3 className={styles.resourceTitle}>代码示例</h3>
              <p className={styles.resourceDesc}>
                参考开源项目，快速掌握最佳实践
              </p>
            </div>
            <div className={styles.resourceCard}>
              <Globe className={styles.resourceIcon} />
              <h3 className={styles.resourceTitle}>生态导航</h3>
              <p className={styles.resourceDesc}>
                全景化了解最新的 Web3 发展与项目
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Members Section */}

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              加入 DevPlaza · 见证你的 Web3 成长之路
            </h2>
            <p className={styles.ctaDesc}>
              无论你是 Web2 开发者，还是已经投身 Web3， DevPlaza
              都为你提供最全面的资源与舞台。
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/signup" className={styles.ctaPrimaryButton}>
                <Rocket className={styles.buttonIcon} />
                立即开始
              </Link>
              <Link href="/community" className={styles.ctaSecondaryButton}>
                <SiTelegram className={styles.buttonIcon} />
                加入 Telegram
              </Link>
              <Link
                href="https://x.com/devplaza"
                className={styles.ctaSecondaryButton}
              >
                <SiX className={styles.buttonIcon} />
                关注 X
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
