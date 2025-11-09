import React from 'react'
import {
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Package
} from 'lucide-react'
import styles from './index.module.css'

const BrandPage = () => {
  return (
    <div className={styles.brandPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>开源社品牌资源</h1>
          <p className={styles.heroSubtitle}>
            为保证标识的清晰与统一，请从官方渠道下载标准的品牌标识素材
          </p>
        </div>
        <div className={styles.heroBackground}>
          <div className={styles.brandElements}>
            <div className={styles.logoElement}></div>
            <div className={styles.logoElement}></div>
            <div className={styles.logoElement}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentContainer}>
          {/* Download Section */}
          <section className={styles.downloadSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>品牌资源下载</h2>
              <p className={styles.sectionDescription}>
                包括Logo、标准字、应用规范等完整品牌资源包
              </p>
            </div>

            <div className={styles.downloadCard}>
              <div className={styles.downloadContent}>
                <div className={styles.downloadIcon}>
                  <Package size={48} />
                </div>
                <div className={styles.downloadInfo}>
                  <h3 className={styles.downloadTitle}>开源社品牌标识素材包</h3>
                  <p className={styles.downloadDesc}>
                    包含完整的Logo文件、标准字体、配色方案、使用规范等素材，
                    支持多种格式（SVG、PNG、PDF、AI等）
                  </p>
                  <div className={styles.downloadMeta}>
                    <span className={styles.metaItem}>
                      <FileText size={16} />
                      完整资源包
                    </span>
                    <span className={styles.metaItem}>
                      <ImageIcon size={16} />
                      多种格式
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.downloadActions}>
                <a
                  href="/品牌资源.zip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadButton}
                >
                  <Download size={20} />
                  立即下载
                </a>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className={styles.contactSection}>
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>需要帮助？</h2>
              <p className={styles.contactDesc}>
                如果您在使用品牌资源时遇到任何问题，或需要特殊格式的素材，
                请随时联系我们的品牌团队。
              </p>
              <div className={styles.contactActions}>
                <a href="/about" className={styles.contactButton}>
                  联系我们
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default BrandPage
