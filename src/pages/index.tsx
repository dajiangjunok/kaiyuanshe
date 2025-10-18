import { Github } from 'lucide-react'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

import styles from './index.module.css'
import { SiWechat, SiX } from 'react-icons/si'

import { useTranslation } from '../hooks/useTranslation'
import Hero from '@/components/home/hero/Hero'
import MissionSection from '@/components/home/mission/Mission'
import EventSection from '@/components/home/events/Events'
import ArticleSection from '@/components/home/article/Article'
import CarouselSession from '@/components/home/carousel/Carousel'
 

export default function Home() {
  const { t } = useTranslation()
  const scrollRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className={styles.homepage}>
      {/* session1 */}
      <div
        style={{
          background: `linear-gradient(
    135deg,
    var(--primary-400) 0%,
    #87ceeb 30%,
    #b3d9ff 50%,
    #87ceeb 70%,
    var(--primary-400) 100%
  )`
        }}
      >
        <Hero />
        <CarouselSession />
      </div>
 
      {/* Activities Section */}
      <EventSection />
      <ArticleSection />
      {/* Mission Section */}
      <MissionSection />

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{t('homepage.cta.title')}</h2>
            <p className={styles.ctaDesc}>{t('homepage.cta.description')}</p>
            <div className={styles.ctaButtons}>
              <Link
                href="https://github.com/kaiyuanshe"
                target="_blank"
                className={styles.ctaPrimaryButton}
              >
                <Github className={styles.buttonIcon} />
                {t('homepage.cta.followGithub')}
              </Link>
              <Link href="/" className={styles.ctaSecondaryButton}>
                <SiWechat className={styles.buttonIcon} />
                {t('homepage.cta.followWeChat')}
              </Link>
              <Link
                href="https://x.com/kaiyuanshe"
                target="_blank"
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
