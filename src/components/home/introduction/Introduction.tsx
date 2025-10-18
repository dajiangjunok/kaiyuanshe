import styles from './Introduction.module.css'
import { useTranslation } from '../../../hooks/useTranslation'

export default function Introduction() {
  const { t } = useTranslation()
  
  return (
    <section className={styles.introduction}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t('homepage.introduction.title')}</h2>
          <div className={styles.textContent}>
            <p className={styles.paragraph}>
              {t('homepage.introduction.paragraph1')}
            </p>
            <p className={styles.paragraph}>
              {t('homepage.introduction.paragraph2')}
            </p>
            <p className={styles.paragraph}>
              {t('homepage.introduction.paragraph3')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}