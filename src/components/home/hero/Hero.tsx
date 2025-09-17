import Link from 'next/link'
import { Globe, Users } from 'lucide-react'
import LightRays from '@/components/bitsUI/lightRays/LightRays'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#fff"
          raysSpeed={1.5}
          lightSpread={2}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className={styles.heroGradient}
        />

        <div className={styles.heroSubtitle}>
          <div>
            <p className={styles.heroHighlight}>立足中國，貢獻全球，</p>
            <p>推動開源成為新時代生活方式。</p>
          </div>
        </div>

        <div className={styles.heroButtons}>
          <Link href="/monad" className={styles.heroPrimaryButton}>
            <Globe className={styles.buttonIcon} />
            了解 开源社
          </Link>
          <Link href="/events" className={styles.heroSecondaryButton}>
            <Users className={styles.buttonIcon} />
            加入社区
          </Link>
        </div>
      </div>
    </section>
  )
}