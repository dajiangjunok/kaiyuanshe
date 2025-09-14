import { Image } from 'antd'
import styles from "../styles/Footer.module.css"
import { useTranslation } from '../hooks/useTranslation'

export default function Footer() {
  const { t } = useTranslation()
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <Image preview={false} width={24} src="/logo.png" className={styles.logo} />
              <span className={styles.footerLogoTitle}>{t('footer.title')}</span>
            </div>
            <p className={styles.footerDescription}>
              {t('footer.description')}
            </p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright} dangerouslySetInnerHTML={{__html: t('footer.copyright')}}>
          </p>
        </div>
      </div>
    </footer>
  )
}
