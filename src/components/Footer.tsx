import styles from '../styles/Footer.module.css'
import { useTranslation } from '../hooks/useTranslation'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
       
        <div className={styles.footerBottom}>
         
          <div>
            <p
            className={styles.footerCopyright}
            dangerouslySetInnerHTML={{ __html: t('footer.copyright') }}
          ></p>
          <div>
            <span style={{marginRight:"2rem"}}>沪 ICP 备 19006015 号</span>
            <span>公安备案 31011202006203 号</span>
          </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
