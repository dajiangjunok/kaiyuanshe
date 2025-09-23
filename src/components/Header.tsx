import { ChevronDown, Menu as MenuIcon } from 'lucide-react'
import { Image, Drawer } from 'antd'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { Dropdown } from 'antd'
import Auth from './Auth'
import LanguageSwitcher from './LanguageSwitcher'
import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { usePathname } from 'next/navigation'

interface MenuItem {
  key: string
  label: string
  href?: string
  target?: string
  icon?: string
  children?: MenuItem[]
}

interface MenuSection {
  key: string
  title: string
  items: MenuItem[]
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t } = useTranslation()
  const pathname = usePathname()
  // 判断是否为根路由
  const isHomePage = pathname === '/'
  // 使用 useMemo 确保 Auth 组件只创建一次，避免重复渲染
  const authComponent = useMemo(() => <Auth />, [])

  // 菜单数据配置
  const menuSections: MenuSection[] = useMemo(
    () => [
      {
        key: 'governance',
        title: t('navigation.governance.title'),
        items: [
          {
            key: 'governance-overview',
            label: t('navigation.governance.governance_overview'),
            href: '/department',
            icon: '🏛️'
          },
          {
            key: 'board',
            label: t('navigation.governance.board'),
            href: '/department/board',
            icon: '👥'
          },
          {
            key: 'advisory',
            label: t('navigation.governance.advisory'),
            href: '/department/committee/advisory',
            icon: '💡'
          },
          {
            key: 'legal',
            label: t('navigation.governance.legal'),
            href: '/department/committee/legal',
            icon: '⚖️'
          },
          {
            key: 'kcc',
            label: t('navigation.governance.kcc'),
            href: '/community',
            icon: '🏙️'
          },
          {
            key: 'formal-members',
            label: t('navigation.governance.formal_members'),
            href: '/member'
          },
          {
            key: 'election',
            label: t('navigation.governance.election'),
            href: '/community/star'
          },
          {
            key: 'calendar',
            label: t('navigation.governance.calendar'),
            href: '/governance/meeting'
          },
          {
            key: 'suggestion-box',
            label: t('navigation.governance.suggestion_box'),
            href: '/governance/issue'
          },
          {
            key: 'proposal-library',
            label: t('navigation.governance.proposal_library'),
            href: '/governance/proposal'
          }
        ]
      },
      {
        key: 'honors',
        title: t('navigation.honors.title'),
        items: [
          {
            key: 'open-source-star',
            label: t('navigation.honors.open_source_star'),
            href: '/community/award/Open-Source-star',
            icon: '⭐'
          },
          {
            key: 'annual-volunteer',
            label: t('navigation.honors.annual_volunteer'),
            href: '/community/award/excellent-volunteer',
            icon: '🏆'
          },
          {
            key: 'coscon-star',
            label: t('navigation.honors.coscon_star'),
            href: '/community/award/COSCon-star',
            icon: '🌟'
          },
          {
            key: 'community-cooperation-star',
            label: t('navigation.honors.community_cooperation_star'),
            href: '/community/award/community-cooperation-star',
            icon: '🤝'
          },
          {
            key: 'china-open-source-pioneer',
            label: t('navigation.honors.china_open_source_pioneer'),
            href: '/community/award/China-Open-Source-pioneer'
          },
          {
            key: 'china-open-source-power-list',
            label: t('navigation.honors.china_open_source_power_list'),
            href: 'https://opensource.win/',
            target:'_blank'
          }
        ]
      },
      {
        key: 'knowledge',
        title: t('navigation.knowledge.title'),
        items: [
          {
            key: 'open-source-library',
            label: t('navigation.knowledge.open_source_library'),
            icon: '📚',
            children: [
              { key: 'cosc', label: t('navigation.knowledge.cosc'), href: '/articles?keyword=cosc' },
              {
                key: 'kcc-library',
                label: t('navigation.knowledge.kcc_library'),
                href: '/articles?keyword=kcc-library'
              },
              {
                key: 'reading-club',
                label: t('navigation.knowledge.reading_club'),
                href: '/articles?keyword=reading-club'
              },
              {
                key: 'original-articles',
                label: t('navigation.knowledge.original_articles'),
                href: '/articles?keyword=original-articles'
              },
              {
                key: 'translation-articles',
                label: t('navigation.knowledge.translation_articles'),
                href: '/articles?keyword=translation-articles'
              },
              {
                key: 'all-articles',
                label: t('navigation.knowledge.all_articles'),
                href: '/articles?keyword=all-articles'
              },
              {
                key: 'archived-articles',
                label: t('navigation.knowledge.archived_articles'),
                href: '/articles?keyword=archived-articles'
              }
            ]
          },
          {
            key: 'china-open-source-annual-report',
            label: t('navigation.knowledge.china_open_source_annual_report'),
            href: 'https://kaiyuanshe.feishu.cn/wiki/wikcnUDeVll6PNzw900yPV71Sxd',
            icon: '📊',
            target:'_blank'
          },
          {
            key: 'china-open-source-map',
            label: t('navigation.knowledge.china_open_source_map'),
            href: '/',
            icon: '🗺️'
          },
          {
            key: 'china-public-welfare-map',
            label: t('navigation.knowledge.china_public_welfare_map'),
            href: '/',
            icon: '❤️'
          }
        ]
      },
      {
        key: 'activities',
        title: t('navigation.activities.title'),
        items: [
          {
            key: 'wonderful-activities',
            label: t('navigation.activities.wonderful_activities'),
            icon: '🎉',
            children: [
              {
                key: 'hosted-activities',
                label: t('navigation.activities.hosted_activities'),
                href: '/events'
              },
              {
                key: 'activity-calendar',
                label: t('navigation.activities.activity_calendar'),
                href: '/events/calendar'
              }
            ]
          },
          {
            key: 'open-source-projects',
            label: t('navigation.activities.open_source_projects'),
            icon: '🚀',
            children: [
              {
                key: 'open-source-toolbox',
                label: t('navigation.activities.open_source_toolbox'),
                href: 'https://oss-toolbox.kaiyuanshe.cn/',
                target: '_blank'
              },
              {
                key: 'open-hackathon-platform',
                label: t('navigation.activities.open_hackathon_platform'),
                href: 'https://hackathon.kaiyuanshe.cn/',
                target: '_blank'
              },
              {
                key: 'xiaoyuan-qa-bot',
                label: t('navigation.activities.xiaoyuan_qa_bot'),
                href: 'https://aitable.ai/share/shrLPzmeV2iapzGSowywU',
                target: '_blank'
              }
            ]
          }
        ]
      },
      {
        key: 'about',
        title: t('navigation.about_us'),
        items: [
          {
            key: 'about',
            label: t('navigation.about'),
            href: 'https://kaiyuanshe.feishu.cn/wiki/wikcn749HAOCD2dwaNq4dOC67db',
            target: '_blank',
            icon: '🏢'
          },
          {
            key: 'annual-report',
            label: t('navigation.annual_report'),
            href: 'https://kaiyuanshe.feishu.cn/wiki/U2S7wudEUisLdnkqUadczo1SnSc',
            target: '_blank',
            icon: '📊'
          },
          {
            key: 'merchandise',
            label: t('navigation.merchandise'),
            href: 'https://www.xiaohongshu.com/user/profile/6528f512000000002a018253',
            target: '_blank',
            icon: '🛍️'
          },
          {
            key: 'partners',
            label: t('navigation.partners'),
            href: '/partners',
            icon: '🤝'
          },
          {
            key: 'forum',
            label: t('navigation.forum'),
            href: 'https://github.com/orgs/kaiyuanshe/discussions',
            target: '_blank',
            icon: '💬'
          }
        ]
      }
    ],
    [t]
  )

  // 渲染菜单项的辅助函数
  const renderMenuItem = (item: MenuItem): React.ReactNode => {
    return (
      <Link key={item.key} href={item.href || '/'} target={item.target}>
        {item.label}
      </Link>
    )
  }

  // 转换为 Ant Design Dropdown 格式
  const getDropdownItems = (
    items: MenuItem[]
  ): Array<{
    key: string
    label: React.ReactNode
    children?: Array<{ key: string; label: React.ReactNode }>
  }> => {
    return items.map(item => ({
      key: item.key,
      label: renderMenuItem(item),
      children: item.children ? getDropdownItems(item.children) : undefined
    }))
  }

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
                alt="logo"
                className={styles.logo}
              />
              <span className={styles.logoTitle} style={{ color: '#333333' }}>開源社</span>
            </div>
          </Link>
          <nav className={styles.nav}>
            {menuSections.map(section => (
              <Dropdown
                key={section.key}
                menu={{
                  items: getDropdownItems(section.items)
                }}
                placement="bottom"
                trigger={['hover']}
              >
                <div className={styles.navItem} style={{ color: '#333333' }}>
                  <span>{section.title}</span>
                  <ChevronDown className={styles.navIcon} style={{ color: '#333333' }} />
                </div>
              </Dropdown>
            ))}
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
              <MenuIcon className={styles.mobileMenuIcon} style={{ color: '#333333' }} />
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单抽屉 */}
      <Drawer
        title={
          <div
            style={{
              background: 'linear-gradient(135deg, #1f2937, var(--primary))',
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
          {menuSections.map(section => {
            const displayItems = section.items.slice(
              0,
              section.key === 'governance'
                ? 5
                : section.key === 'honors'
                  ? 4
                  : undefined
            )

            return (
              <div key={section.key} className={styles.mobileMenuSection}>
                <h3 className={styles.mobileMenuSectionTitle}>
                  {section.title}
                </h3>
                <div className={styles.mobileMenuLinks}>
                  {displayItems.map(item => (
                    <div key={item.key}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          target={item.target}
                          className={styles.mobileMenuLink}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.icon && <span>{item.icon}</span>}
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <div className={styles.mobileMenuSubheader}>
                          {item.icon && <span>{item.icon}</span>}
                          <span>{item.label}</span>
                        </div>
                      )}
                      {item.children && (
                        <div className={styles.mobileMenuSublinks}>
                          {item.children.map(child => (
                            <Link
                              key={child.key}
                              href={child.href || '/'}
                              target={child.target}
                              className={styles.mobileMenuSublink}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span>{child.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Drawer>
    </header>
  )
}
