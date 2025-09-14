import { Image } from 'antd'
import styles from "../styles/Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <Image preview={false} width={24} src="/logo.png" className={styles.logo} />
              <span className={styles.footerLogoTitle}>開源社</span>
            </div>
            <p className={styles.footerDescription}>
              開源社 是一个聚合 Web3 活动、社区、文章和开发者数据的一站式广场。
            </p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            &copy; 2025 開源社. 保留所有权利
          </p>
        </div>
      </div>
    </footer>
  )
}
