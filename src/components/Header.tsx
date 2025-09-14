import { ChevronDown, Menu as MenuIcon } from 'lucide-react'
import { Image, Drawer } from 'antd'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { Dropdown } from 'antd'
import Auth from './Auth'
import LanguageSwitcher from './LanguageSwitcher'
import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t } = useTranslation()

  // 使用 useMemo 确保 Auth 组件只创建一次，避免重复渲染
  const authComponent = useMemo(() => <Auth />, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  // 控制页面滚动锁定 - 仅在客户端执行
  useEffect(() => {
    if (!mounted) return

    if (mobileMenuOpen) {
      // 保存当前滚动位置
      const scrollY = window.scrollY

      // 锁定背景滚动
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'

      // 防止触摸滚动穿透，但允许菜单内滚动
      const preventTouchMove = (e: TouchEvent) => {
        const target = e.target as HTMLElement
        // 检查是否在抽屉内部
        const drawerBody = document.querySelector('.ant-drawer-body')
        if (drawerBody && !drawerBody.contains(target)) {
          e.preventDefault()
        }
      }

      document.addEventListener('touchmove', preventTouchMove, {
        passive: false
      })

      return () => {
        document.removeEventListener('touchmove', preventTouchMove)
      }
    } else {
      // 恢复背景滚动
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''

      // 恢复滚动位置
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
  }, [mobileMenuOpen, mounted])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <Link href="/" passHref>
            <div className={styles.logoInfo} style={{ cursor: 'pointer' }}>
              <Image
                preview={false}
                width={30}
                src="/logo.png"
                className={styles.logo}
              />
              <span className={styles.logoTitle}>開源社</span>
            </div>
          </Link>
          <nav className={styles.nav}>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'dapps',
                    label: <Link href="/ecosystem/dapps">{t('navigation.dapps')}</Link>
                  },
                  {
                    key: 'tutorials',
                    label: <Link href="/ecosystem/tutorials">{t('navigation.tutorials')}</Link>
                  }
                ]
              }}
              placement="bottom"
              trigger={['hover']}
            >
              <div className={styles.navItem}>
                <span>{t('navigation.ecosystem')}</span>
                <ChevronDown className={styles.navIcon} />
              </div>
            </Dropdown>
            <Dropdown
              menu={{
                items: [
                  { key: 'docs', label: <Link href="/docs">{t('navigation.docs')}</Link> },
                  {
                    key: 'guides',
                    label: (
                      <Link href="" target="_blank">
                        {t('navigation.guides')}
                      </Link>
                    )
                  },
                  {
                    key: 'codes',
                    label: (
                      <Link href="" target="_blank">
                        {t('navigation.example_code')}
                      </Link>
                    )
                  }
                ]
              }}
              placement="bottom"
              trigger={['hover']}
            >
              <div className={styles.navItem}>
                <span>{t('navigation.developer_support')}</span>
                <ChevronDown className={styles.navIcon} />
              </div>
            </Dropdown>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'hackathon',
                    label: <Link href="/events?type=hackathon">{t('navigation.hackathon')}</Link>
                  },
                  {
                    key: 'workshop',
                    label: <Link href="/events?type=workshop">{t('navigation.workshop')}</Link>
                  },
                  {
                    key: 'ama',
                    label: <Link href="/events?type=ama">{t('navigation.ama')}</Link>
                  },
                  {
                    key: 'meetup',
                    label: <Link href="/events?type=meetup">{t('navigation.meetup')}</Link>
                  },
                  { key: 'posts', label: <Link href="/posts">{t('navigation.posts')}</Link> }
                ]
              }}
              placement="bottom"
              trigger={['hover']}
            >
              <div className={styles.navItem}>
                <span>{t('navigation.community_activities')}</span>
                <ChevronDown className={styles.navIcon} />
              </div>
            </Dropdown>
            <Dropdown
              menu={{
                items: [{ key: 'blog', label: <Link href="/blogs">{t('navigation.blog')}</Link> }]
              }}
              placement="bottom"
              trigger={['hover']}
            >
              <div className={styles.navItem}>
                <span>{t('navigation.official_resources')}</span>
                <ChevronDown className={styles.navIcon} />
              </div>
            </Dropdown>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'about',
                    label: (
                      <Link
                        target="_blank"
                        href="https://kaiyuanshe.feishu.cn/wiki/wikcn749HAOCD2dwaNq4dOC67db"
                      >
                        {t('navigation.about')}
                      </Link>
                    )
                  },
                  {
                    key: 'annual-report',
                    label: (
                      <Link
                        target="_blank"
                        href="https://kaiyuanshe.feishu.cn/wiki/U2S7wudEUisLdnkqUadczo1SnSc"
                      >
                        {t('navigation.annual_report')}
                      </Link>
                    )
                  },
                  {
                    key: 'merchandise',
                    label: (
                      <Link
                        target="_blank"
                        href="https://www.xiaohongshu.com/user/profile/6528f512000000002a018253"
                      >
                        {t('navigation.merchandise')}
                      </Link>
                    )
                  },
                  {
                    key: 'partners',
                    label: <Link href="/partners">{t('navigation.partners')}</Link>
                  },
                  {
                    key: 'forum',
                    label: (
                      <Link
                        target="_blank"
                        href="https://github.com/orgs/kaiyuanshe/discussions"
                      >
                        {t('navigation.forum')}
                      </Link>
                    )
                  }
                ]
              }}
              placement="bottom"
              trigger={['hover']}
            >
              <div className={styles.navItem}>
                <span>{t('navigation.about_us')}</span>
                <ChevronDown className={styles.navIcon} />
              </div>
            </Dropdown>
            <LanguageSwitcher />
            {authComponent}
          </nav>

          {/* 移动端导航 */}
          <div className={styles.mobileNav}>
            <LanguageSwitcher />
            {authComponent}
            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon className={styles.mobileMenuIcon} />
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单抽屉 */}
      <Drawer
        title={
          <div
            style={{
              background: 'linear-gradient(135deg, #1f2937, #6E54FF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            {t('navigation.mobile_menu')}
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        styles={{
          body: { padding: '1.5rem 1rem' },
          header: { borderBottom: '1px solid #f3f4f6', paddingBottom: '1rem' }
        }}
      >
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileMenuSection}>
            <h3 className={styles.mobileMenuSectionTitle}>{t('navigation.ecosystem')}</h3>
            <div className={styles.mobileMenuLinks}>
              <Link
                href="/testnet"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🧪</span>
                <span>{t('mobile.testnet')}</span>
              </Link>
              <Link
                href="/ecosystem/dapps"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🏗️</span>
                <span>{t('navigation.dapps')}</span>
              </Link>
              <Link
                href="/ecosystem/tutorials"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>📚</span>
                <span>{t('navigation.tutorials')}</span>
              </Link>
            </div>
          </div>

          <div className={styles.mobileMenuSection}>
            <h3 className={styles.mobileMenuSectionTitle}>{t('navigation.developer_support')}</h3>
            <div className={styles.mobileMenuLinks}>
              <Link
                href="/docs"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>📖</span>
                <span>{t('navigation.docs')}</span>
              </Link>
              <Link
                href=""
                target="_blank"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>⚙️</span>
                <span>{t('navigation.guides')}</span>
              </Link>
              <Link
                href=""
                target="_blank"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>💻</span>
                <span>{t('navigation.example_code')}</span>
              </Link>
            </div>
          </div>

          <div className={styles.mobileMenuSection}>
            <h3 className={styles.mobileMenuSectionTitle}>{t('navigation.community_activities')}</h3>
            <div className={styles.mobileMenuLinks}>
              <Link
                href="/events?type=hackathon"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🏆</span>
                <span>{t('navigation.hackathon')}</span>
              </Link>
              <Link
                href="/events?type=workshop"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🎯</span>
                <span>{t('navigation.workshop')}</span>
              </Link>
              <Link
                href="/events?type=ama"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>💬</span>
                <span>{t('navigation.ama')}</span>
              </Link>

              <Link
                href="/events?type=meetup"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🤝</span>
                <span>{t('navigation.meetup')}</span>
              </Link>
              <Link
                href="/posts"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{t('navigation.posts')}</span>
              </Link>
            </div>
          </div>

          <div className={styles.mobileMenuSection}>
            <h3 className={styles.mobileMenuSectionTitle}>{t('navigation.official_resources')}</h3>
            <div className={styles.mobileMenuLinks}>
              <Link
                href="/blogs"
                className={styles.mobileMenuLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>📝</span>
                <span>{t('navigation.blog')}</span>
              </Link>
            </div>
          </div>

          <div className={styles.mobileMenuSection}>
            <h3 className={styles.mobileMenuSectionTitle}>{t('navigation.about_us')}</h3>
            <div className={styles.mobileMenuLinks}>
              <Link
                target="_blank"
                href="https://kaiyuanshe.feishu.cn/wiki/wikcn749HAOCD2dwaNq4dOC67db"
                className={styles.mobileMenuLink}
              >
                <span>🏢</span>
                <span>{t('navigation.about')}</span>
              </Link>
              <Link
                className={styles.mobileMenuLink}
                target="_blank"
                href="https://kaiyuanshe.feishu.cn/wiki/U2S7wudEUisLdnkqUadczo1SnSc"
              >
                <span>📊</span>
                <span>{t('navigation.annual_report')}</span>
              </Link>
              <Link
                className={styles.mobileMenuLink}
                target="_blank"
                href="https://www.xiaohongshu.com/user/profile/6528f512000000002a018253"
              >
                <span>🛍️</span>
                <span>{t('navigation.merchandise')}</span>
              </Link>
              <Link href="/partners" className={styles.mobileMenuLink}>
                <span>🤝</span>
                <span>{t('navigation.partners')}</span>
              </Link>
              <Link
                className={styles.mobileMenuLink}
                target="_blank"
                href="https://github.com/orgs/kaiyuanshe/discussions"
              >
                <span>💬</span>
                <span>{t('navigation.forum')}</span>
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  )
}
