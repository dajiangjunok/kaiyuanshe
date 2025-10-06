import { ChevronDown } from 'lucide-react' 
import styles from './Hero.module.css'
import { useTranslation } from '../../../hooks/useTranslation'

export default function Hero() {
  const { t } = useTranslation()
  
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.heroSubtitle}>
          <div>
            <p className={styles.heroHighlight}>{t('homepage.hero.heroHighlight')}</p>
            <p>{t('homepage.hero.heroSubtext')}</p>
          </div>
        </div>

        <div className={styles.heroDown}>
           <ChevronDown className={styles.heroArrow} size={100}/>
        </div>
        {/* <div className={styles.heroButtons}>
          <Link href="https://kaiyuanshe.feishu.cn/wiki/wikcn749HAOCD2dwaNq4dOC67db" target='_blank' className={styles.heroPrimaryButton}>
            <Globe className={styles.buttonIcon} />
            了解 开源社
          </Link>
          <Link href="/events" className={styles.heroSecondaryButton}>
            <Users className={styles.buttonIcon} />
            加入社区
          </Link>
        </div> */}
      </div>
    </section>
  )
}