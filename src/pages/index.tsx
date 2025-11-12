import { useEffect, useRef, useState } from 'react'

import styles from './index.module.css'
 
import Hero from '@/components/home/hero/Hero'
import MissionSection from '@/components/home/mission/Mission'
import EventSection from '@/components/home/events/Events'
import ArticleSection from '@/components/home/article/Article'
import CarouselSession from '@/components/home/carousel/Carousel'

export default function Home() {
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
    </div>
  )
}
