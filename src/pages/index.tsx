import { Zap, Shield, Cpu, Database, Rocket } from 'lucide-react'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

import styles from './index.module.css'
import { SiTelegram, SiX } from 'react-icons/si'

import { getDapps } from './api/dapp'
import { useTranslation } from '../hooks/useTranslation'
import Hero from '@/components/home/hero/Hero'
import MissionSection from '@/components/home/mission/Mission'
import EventSection from '@/components/home/events/Events'

export default function Home() {
  const { t } = useTranslation()
  const pageSize = 20
  const scrollRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className={styles.homepage}>
      {/* session1 */}
      <Hero />

      {/* Activities Section */}
      <EventSection />

       {/* Mission Section */}
      <MissionSection />

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
