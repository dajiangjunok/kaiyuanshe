import {
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
import LightRays from '@/components/bitsUI/lightRays/LightRays'

import styles from './index.module.css'
import { SiTelegram, SiX } from 'react-icons/si'
import { Image } from 'antd'
import EventSection from './events/section'
import MissionSection from './mission'
import { getDapps } from './api/dapp'
import { useTranslation } from '../hooks/useTranslation'

export default function Home() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const pageSize = 20
  const scrollRef = useRef<HTMLDivElement>(null)
  const galleryImages = [
    '/img/rotation/activity1.png',
    '/img/rotation/activity2.png',
    '/img/rotation/activity3.png',
    '/img/rotation/activity4.png',
    '/img/rotation/activity5.png'
  ]

  const scrollGallery = (direction: 'left' | 'right') => {
    const container = document.querySelector(
      `.${styles.galleryContainer}`
    ) as HTMLElement
    if (container) {
      const scrollAmount =
        window.innerWidth >= 1024 ? 512 : window.innerWidth >= 768 ? 358 : 291 // Responsive scroll amount in pixels
      const currentScroll = container.scrollLeft

      let targetScroll
      let newSlideIndex
      if (direction === 'left') {
        if (currentScroll <= scrollAmount) {
          targetScroll = 0
          newSlideIndex = 0
        } else {
          targetScroll = currentScroll - scrollAmount
          newSlideIndex = Math.max(0, currentSlide - 1)
        }
      } else {
        const maxScroll = container.scrollWidth - container.clientWidth
        targetScroll = Math.min(maxScroll, currentScroll + scrollAmount)
        newSlideIndex = Math.min(galleryImages.length - 1, currentSlide + 1)
      }

      setCurrentSlide(newSlideIndex)
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  const goToSlide = (index: number) => {
    const container = document.querySelector(
      `.${styles.galleryContainer}`
    ) as HTMLElement
    if (container) {
      const scrollAmount =
        window.innerWidth >= 1024 ? 512 : window.innerWidth >= 768 ? 358 : 291 // Responsive scroll amount in pixels
      const targetScroll = index * scrollAmount
      setCurrentSlide(index)
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
        }
      } catch (error) {
        console.error(t('errors.fetchDapps'), error)
      }
    }
    fetchDapps()
  }, [t])

  useEffect(() => {
    let animationFrame: number
    const scrollContainer = scrollRef.current

    const scroll = () => {
      if (scrollContainer) {
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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const nextSlide = (prev + 1) % galleryImages.length
        goToSlide(nextSlide)
        return nextSlide
      })
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, galleryImages.length])

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const features = [
    {
      icon: <Zap className={styles.featureIcon} />,
      title: t('homepage.features.multiChain.title'),
      description: t('homepage.features.multiChain.description')
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: t('homepage.features.analytics.title'),
      description: t('homepage.features.analytics.description')
    },
    {
      icon: <Cpu className={styles.featureIcon} />,
      title: t('homepage.features.content.title'),
      description: t('homepage.features.content.description')
    },
    {
      icon: <Database className={styles.featureIcon} />,
      title: t('homepage.features.ecosystem.title'),
      description: t('homepage.features.ecosystem.description')
    }
  ]

  return (
    <div className={styles.homepage}>
      <LightRays
        raysOrigin="top-center"
        raysColor="#000"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />

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
            <div
              className={styles.heroGallery}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`${styles.galleryNavigation} ${styles.galleryNavPrev}`}
                onClick={() => scrollGallery('left')}
                aria-label="Previous images"
              >
                <ChevronLeft className={styles.galleryNavIcon} />
              </button>

              <div className={styles.galleryContainer}>
                <div className={styles.galleryImage}>
                  <Image
                    src="/img/rotation/activity1.png"
                    alt="Dev"
                    style={{ borderRadius: '0.875rem' }}
                    preview={{ mask: false }}
                  />
                </div>
                <div className={styles.galleryImage}>
                  <Image
                    src="/img/rotation/activity2.png"
                    alt="中国开源年会2024"
                    style={{ borderRadius: '0.875rem' }}
                    preview={{ mask: false }}
                  />
                </div>
                <div className={styles.galleryImage}>
                  <Image
                    src="/img/rotation/activity3.png"
                    alt="2024第八届中国开源年会"
                    style={{ borderRadius: '0.875rem' }}
                    preview={{ mask: false }}
                  />
                </div>
                <div className={styles.galleryImage}>
                  <Image
                    src="/img/rotation/activity4.png"
                    alt="中国开运啊"
                    style={{ borderRadius: '0.875rem' }}
                    preview={{ mask: false }}
                  />
                </div>
                <div className={styles.galleryImage}>
                  <Image
                    src="/img/rotation/activity5.png"
                    alt="coscup2024大陆讲师团"
                    style={{ borderRadius: '0.875rem' }}
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

            {/* Gallery Indicators */}
            <div className={styles.galleryIndicators}>
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${
                    index === currentSlide ? styles.indicatorActive : ''
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${((currentSlide + 1) / galleryImages.length) * 100}%`
                }}
              />
            </div>

            <div>
              <p className={styles.heroSubtitle}>
                <span className={styles.heroHighlight}>
                  {t('homepage.hero.subtitle')}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <MissionSection />
      {/* Activities Section */}
      <EventSection />
      {/* Milestones Section */}
      <section className={styles.milestones}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {t('homepage.milestones.title')}
            </h2>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {t('homepage.features.title')}
            </h2>
            <p className={styles.sectionDescription}>
              {t('homepage.features.description')}
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
            <h2 className={styles.sectionTitle}>
              {t('homepage.resources.title')}
            </h2>
            <p className={styles.sectionDescription}>
              {t('homepage.resources.description')}
            </p>
          </div>
          <div className={styles.resourcesGrid}>
            <div className={styles.resourceCard}>
              <BookOpen className={styles.resourceIcon} />
              <h3 className={styles.resourceTitle}>
                {t('homepage.resources.tutorials.title')}
              </h3>
              <p className={styles.resourceDesc}>
                {t('homepage.resources.tutorials.description')}
              </p>
            </div>
            <div className={styles.resourceCard}>
              <Code className={styles.resourceIcon} />
              <h3 className={styles.resourceTitle}>
                {t('homepage.resources.codeExamples.title')}
              </h3>
              <p className={styles.resourceDesc}>
                {t('homepage.resources.codeExamples.description')}
              </p>
            </div>
            <div className={styles.resourceCard}>
              <Globe className={styles.resourceIcon} />
              <h3 className={styles.resourceTitle}>
                {t('homepage.resources.ecosystemGuide.title')}
              </h3>
              <p className={styles.resourceDesc}>
                {t('homepage.resources.ecosystemGuide.description')}
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
            <h2 className={styles.ctaTitle}>{t('homepage.cta.title')}</h2>
            <p className={styles.ctaDesc}>{t('homepage.cta.description')}</p>
            <div className={styles.ctaButtons}>
              <Link href="/signup" className={styles.ctaPrimaryButton}>
                <Rocket className={styles.buttonIcon} />
                {t('homepage.cta.getStarted')}
              </Link>
              <Link href="/community" className={styles.ctaSecondaryButton}>
                <SiTelegram className={styles.buttonIcon} />
                {t('homepage.cta.joinTelegram')}
              </Link>
              <Link
                href="https://x.com/devplaza"
                className={styles.ctaSecondaryButton}
              >
                <SiX className={styles.buttonIcon} />
                {t('homepage.cta.followX')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
