import { Globe } from 'lucide-react'
import { Dropdown } from 'antd'
import { useTranslation } from '../hooks/useTranslation'
import styles from '../styles/LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const { t, locale, changeLanguage } = useTranslation()

  const languageItems = [
    {
      key: 'zh-CN',
      label: (
        <div className={styles.languageItem}>
          <span className={styles.languageText}>
            {t('language.simplified_chinese')}
          </span>
          {locale === 'zh-CN' && (
            <span className={styles.activeIndicator}>✓</span>
          )}
        </div>
      ),
      onClick: () => changeLanguage('zh-CN')
    },
    {
      key: 'zh-TW',
      label: (
        <div className={styles.languageItem}>
          <span className={styles.languageText}>
            {t('language.traditional_chinese')}
          </span>
          {locale === 'zh-TW' && (
            <span className={styles.activeIndicator}>✓</span>
          )}
        </div>
      ),
      onClick: () => changeLanguage('zh-TW')
    },
    {
      key: 'en',
      label: (
        <div className={styles.languageItem}>
          <span className={styles.languageText}>{t('language.english')}</span>
          {locale === 'en' && <span className={styles.activeIndicator}>✓</span>}
        </div>
      ),
      onClick: () => changeLanguage('en')
    }
  ]

  return (
    <Dropdown
      menu={{ items: languageItems }}
      placement="bottomRight"
      trigger={['hover', 'click']}
      arrow
    >
      <div
        className={styles.languageSwitcher}
        title={t('language.switch')}
        onClick={e => e.preventDefault()}
      >
        <Globe className={styles.globeIcon} />
        <span className={styles.currentLanguage}>
          {locale === 'zh-TW' ? '繁' : locale === 'zh-CN' ? '简' : 'EN'}
        </span>
      </div>
    </Dropdown>
  )
}
