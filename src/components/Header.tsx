import {
  ChevronDown,
  Menu as MenuIcon,
  Search,
  X,
  User,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { signOut } from 'next-auth/react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import styles from './Header.module.css'

interface MenuItem {
  key: string
  label: string
  href?: string
  description?: string
  children?: MenuItem[]
  group?: string
  target?: string
}

interface SearchResult {
  item: MenuItem
  parentLabel?: string
  matchType: 'label' | 'description'
  score: number
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // 获取用户认证状态
  const { session, isAuthenticated, isLoading } = useAuth()

  // 主导航菜单配置 - 按照开源社新结构
  const mainNavItems = useMemo(
    () => [
      {
        key: 'governance',
        label: '社区治理',
        children: [
          // {
          //   key: 'vision',
          //   label: '愿景使命',
          //   href: '/about',
          //   description: '开源社的愿景、使命和核心价值观',
          //   group: 'basic'
          // },
          // {
          //   key: 'organization',
          //   label: '组织架构',
          //   href: '/about',
          //   description: '了解开源社的组织结构和治理体系',
          //   group: 'basic'
          // },
          {
            key: 'charter',
            label: '开源社章程',
            href: '/charter',
            description: '开源社的章程和管理制度',
            group: 'basic',
            
          },

          {
            key: 'board',
            label: '理事会',
            href: '/department/board',
            description: '开源社理事会成员介绍',
            group: 'basic'
          },
          {
            key: 'advisory',
            label: '顾问委员会',
            href: '/department/advisory',
            description: '顾问委员会成员介绍',
            group: 'departments'
          },
          {
            key: 'legal',
            label: '法律咨询委员会',
            href: '/department/legal',
            description: '法律咨询委员会介绍',
            group: 'departments'
          },
          {
            key: 'executive',
            label: '执行委员会',
            href: '/department/executive',
            description: '执行委员会介绍',
            group: 'departments'
          },
          {
            key: 'project-committee',
            label: '项目委员会',
            href: '/department/project',
            description: '项目委员会介绍',
            group: 'departments'
          },
          {
            key: 'member-rights',
            label: '正式成员权利与义务',
            href: '/governance/member-rights',
            description: '正式成员的权利与义务说明',
            group: 'policies'
          },
          {
            key: 'code-of-conduct',
            label: '开源社行为守则',
            href: '/governance/code-of-conduct',
            description: '社区行为准则和规范',
            group: 'policies'
          },
          {
            key: 'open-source-manifesto',
            label: '开源人宣言',
            href: '/governance/open-source-manifesto',
            description: '开源人宣言',
            group: 'policies'
          },
          {
            key: 'annual-report',
            label: '开源社年度报告',
            href: 'https://kaiyuanshe.feishu.cn/wiki/U2S7wudEUisLdnkqUadczo1SnSc',
            description: '查看开源社的年度工作报告和成果',
            group: 'policies',
            target: '_blank'
          }
        ]
      },
      {
        key: 'community-development',
        label: '社区发展',
        children: [
          {
            key: 'members',
            label: '正式成员',
            href: '/department/members',
            description: '查看开源社正式成员列表',
            group: 'recognition'
          },
          {
            key: 'star',
            label: '开源之星',
            href: '/community/star',
            description: '开源之星获奖者',
            group: 'recognition'
          },
          {
            key: 'volunteers',
            label: '年度优秀志愿者',
            href: '/community/volunteer',
            description: '年度优秀志愿者表彰',
            group: 'recognition'
          },
          {
            key: 'coscon-star',
            label: 'COSCon之星',
            href: '/community/coscon',
            description: 'COSCon会议之星',
            group: 'recognition'
          },
          {
            key: 'cooperation-star',
            label: '社区合作之星',
            href: '/community/cooperation',
            description: '社区合作之星获奖者',
            group: 'cooperation'
          },
          {
            key: 'partners',
            label: '赞助伙伴、合作社区、合作媒体',
            href: '/',
            description: '赞助伙伴、合作社区、合作媒体',
            group: 'cooperation'
          },
          {
            key: 'individual-sponsors',
            label: '个人赞助',
            href: 'https://kaiyuanshe.feishu.cn/wiki/V8QfwIblXibIjoksERYcL6R6nDh?from=space_search',
            description: '个人赞助者列表',
            group: 'cooperation',
            target: '_blank'
          },
          {
            key: 'kcc',
            label: '开源社城市社区（KCC）',
            href: '/community',
            description: '各地开源社城市社区',
            group: 'cooperation'
          },
          {
            key: 'china-oss-report',
            label: '中国开源年度报告',
            href: 'https://kaiyuanshe.feishu.cn/wiki/wikcnUDeVll6PNzw900yPV71Sxd',
            description: '中国开源年度报告',
            group: 'reports',
            target: '_blank'
          },
          {
            key: 'china-oss-pioneer',
            label: '中国开源先锋榜',
            href: '/community/pioneer',
            description: '中国开源先锋榜',
            group: 'reports'
          },
          {
            key: 'china-oss-power',
            label: '中国开源码力榜',
            href: 'https://opensource.win/',
            description: '中国开源码力榜',
            group: 'reports',
            target: '_blank'
          },
          {
            key: 'forum',
            label: '开源社论坛',
            href: 'https://github.com/orgs/kaiyuanshe/discussions',
            description: '开源社社区论坛',
            group: 'reports',
            target: '_blank'
          }
        ]
      },
      {
        key: 'events',
        label: '开源活动',
        children: [
          {
            key: 'coscon',
            label: '中国开源年会',
            href: '/events',
            description: '中国最大的开源技术年度盛会',
            group: 'annual'
          },
          {
            key: 'cooperation-activities',
            label: '社区合作活动',
            href: '/events',
            description: '与其他开源社区的合作项目和活动',
            group: 'annual'
          },
          {
            key: 'calendar',
            label: '活动日历',
            href: '/events/calendar',
            description: '查看即将举行的开源活动和会议',
            group: 'calendar'
          }
          // {
          //   key: 'meetings',
          //   label: '社区会议',
          //   href: '/',
          //   description: '社区定期会议',
          //   group: 'calendar'
          // }
        ]
      },
      {
        key: 'projects',
        label: '开源项目',
        children: [
          {
            key: 'china-oss-map',
            label: '中国开源地区',
            href: '/organization',
            description: '展示中国开源项目和组织的分布情况',
            group: 'main'
          },
          {
            key: 'toolbox',
            label: '开源百宝箱',
            href: 'https://oss-toolbox.kaiyuanshe.cn/',
            description: '收集和整理各种开源工具和资源',
            group: 'main',
            target: '_blank'
          },
          {
            key: 'hackathon',
            label: '开放黑客松平台',
            href: 'https://hackathon.kaiyuanshe.cn/',
            description: '组织和参与开源黑客松活动',
            group: 'main',
            target: '_blank'
          },
          {
            key: 'ktoken',
            label: 'KToken',
            href: 'https://kaiyuanshe.feishu.cn/wiki/wikcnnpaFGG3anuwxIfsp4M9c0c',
            description: '基于区块链的开源贡献激励机制',
            group: 'tech',
            target: '_blank'
          }
        ]
      },
      {
        key: 'articles-media',
        label: '文章&媒体',
        children: [
          {
            key: 'articles',
            label: '文章',
            href: '/articles',
            description: '阅读最新的技术文章和社区动态',
            group: 'content'
          },
          // {
          //   key: 'announcements',
          //   label: '公告',
          //   href: '/',
          //   description: '获取开源社的重要公告和通知',
          //   group: 'content'
          // },
          // {
          //   key: 'news',
          //   label: '新闻动态',
          //   href: '/',
          //   description: '了解开源社区的最新发展和动态',
          //   group: 'content'
          // },
          // {
          //   key: 'meeting-minutes',
          //   label: '会议纪要',
          //   href: '/',
          //   description: '社区会议记录和纪要',
          //   group: 'content'
          // },
          // {
          //   key: 'brand-guide',
          //   label: '品牌使用指南',
          //   href: '/',
          //   description: '开源社品牌使用指南',
          //   group: 'brand'
          // },

          {
            key: 'videos',
            label: '视频',
            href: 'https://space.bilibili.com/525037536?spm_id_from=333.337.search-card.all.click',
            description: '观看开源社相关视频内容',
            group: 'brand',
            target: '_blank'
          }
          // {
          //   key: 'photos',
          //   label: '照片',
          //   href: '/photos',
          //   description: '历届活动照片展示',
          //   group: 'brand'
          // }
        ]
      },
      {
        key: 'about',
        label: '关于我们',
        children: [
          {
            key: 'intro',
            label: '开源社简介',
            href: '/about',
            description: '了解开源社的历史、使命和发展历程',
            group: 'basic'
          },
          {
            key: 'brand-download',
            label: '品牌标识下载',
            href: '/logo.zip',
            target: '_blank',
            description: '下载开源社品牌标识',
            group: 'basic'
          },
          {
            key: 'contact',
            label: '联系我们',
            href: '/about',
            description: '获取开源社的联系方式和地址信息',
            group: 'brand'
          },
          {
            key: 'join-us',
            label: '如何加入我们',
            href: '/join-us',
            description: '了解如何加入开源社',
            group: 'brand'
          }
        ]
      }
    ],
    []
  )

  // 模糊搜索算法
  const fuzzySearch = (query: string, text: string): number => {
    if (!query || !text) return 0

    const queryLower = query.toLowerCase()
    const textLower = text.toLowerCase()

    // 完全匹配得分最高
    if (textLower.includes(queryLower)) {
      const exactMatch = textLower === queryLower
      const startsWith = textLower.startsWith(queryLower)
      return exactMatch ? 100 : startsWith ? 90 : 80
    }

    // 模糊匹配算法
    let score = 0
    let queryIndex = 0

    for (
      let i = 0;
      i < textLower.length && queryIndex < queryLower.length;
      i++
    ) {
      if (textLower[i] === queryLower[queryIndex]) {
        score += 1
        queryIndex++
      }
    }

    // 如果所有查询字符都匹配，计算匹配度
    if (queryIndex === queryLower.length) {
      return Math.round((score / textLower.length) * 60) // 最高60分
    }

    return 0
  }

  // 扁平化菜单项并搜索
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []

    const results: SearchResult[] = []

    const searchInItems = (items: MenuItem[], parentLabel?: string) => {
      items.forEach(item => {
        // 搜索标签
        const labelScore = fuzzySearch(searchQuery, item.label)
        if (labelScore > 0) {
          results.push({
            item,
            parentLabel,
            matchType: 'label',
            score: labelScore
          })
        }

        // 搜索描述
        if (item.description) {
          const descScore = fuzzySearch(searchQuery, item.description)
          if (descScore > 0) {
            results.push({
              item,
              parentLabel,
              matchType: 'description',
              score: descScore * 0.8 // 描述匹配权重略低
            })
          }
        }

        // 递归搜索子菜单
        if (item.children) {
          searchInItems(item.children, item.label)
        }
      })
    }

    searchInItems(mainNavItems)

    // 按分数排序，去重
    const uniqueResults = results.reduce((acc, current) => {
      const existing = acc.find(r => r.item.key === current.item.key)
      if (!existing || existing.score < current.score) {
        return [...acc.filter(r => r.item.key !== current.item.key), current]
      }
      return acc
    }, [] as SearchResult[])

    return uniqueResults.sort((a, b) => b.score - a.score).slice(0, 8) // 最多显示8个结果
  }, [searchQuery, mainNavItems])

  // 处理下拉菜单鼠标事件
  const handleMouseEnter = useCallback((key: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setActiveDropdown(key)
  }, [])

  const handleMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150) // 150ms 延迟
  }, [])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  // 处理搜索框聚焦
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // 点击外部关闭搜索
  useEffect(() => {
    const handleClickOutside = () => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.closest(`.${styles.searchContainer}`)
      ) {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchOpen])

  // 点击外部关闭用户菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  // 处理退出登录
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('退出登录失败:', error)
    }
  }

  // 处理联系我们点击 - 跳转到about页面并滚动到底部
  const handleContactClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (router.pathname === '/about') {
      // 如果已经在about页面，直接滚动到底部
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      })
    } else {
      // 如果不在about页面，先跳转
      await router.push('/about')
      // 延迟滚动，确保页面已加载
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        })
      }, 100)
    }
  }

  // CNCF风格下拉菜单组件
  const NavDropdown = ({ item }: { item: MenuItem }) => {
    const isActive = activeDropdown === item.key

    return (
      <div
        className={styles.navDropdownContainer}
        onMouseEnter={() => handleMouseEnter(item.key)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
        >
          <span>{item.label}</span>
          <ChevronDown
            className={`${styles.navIcon} ${isActive ? styles.navIconActive : ''}`}
          />
        </div>

        {isActive && item.children && (
          <div
            className={styles.navDropdownMenu}
            onMouseEnter={() => handleMouseEnter(item.key)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.dropdownLayout}>
              {/* 左侧菜单列表 */}
              <div
                className={
                  item.key === 'about' ||
                  item.key === 'governance' ||
                  item.key === 'community-development' ||
                  item.key === 'events' ||
                  item.key === 'projects' ||
                  item.key === 'articles-media'
                    ? styles.dropdownLeftTwoColumn
                    : styles.dropdownLeft
                }
              >
                {item.key === 'about' ? (
                  // 关于我们的特殊两列布局
                  <>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'basic')
                        .map(child =>
                          child.key === 'contact' ? (
                            <a
                              key={child.key}
                              href={child.href || '/about'}
                              className={styles.navDropdownItem}
                              onClick={e => {
                                setActiveDropdown(null)
                                handleContactClick(e)
                              }}
                            >
                              <div className={styles.dropdownItemContent}>
                                <span className={styles.dropdownItemTitle}>
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className={styles.dropdownItemDesc}>
                                    {child.description}
                                  </span>
                                )}
                              </div>
                            </a>
                          ) : (
                            <Link
                              key={child.key}
                              href={child.href || '/'}
                              className={styles.navDropdownItem}
                              onClick={() => setActiveDropdown(null)}
                              target={child.target}
                            >
                              <div className={styles.dropdownItemContent}>
                                <span className={styles.dropdownItemTitle}>
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className={styles.dropdownItemDesc}>
                                    {child.description}
                                  </span>
                                )}
                              </div>
                            </Link>
                          )
                        )}
                    </div>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'brand')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </>
                ) : item.key === 'governance' ? (
                  // 社区治理的特殊三列布局
                  <>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'basic')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'departments')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'policies')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </>
                ) : item.key === 'community-development' ? (
                  // 社区发展的特殊三列布局
                  <>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'recognition')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'cooperation')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'reports')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </>
                ) : item.key === 'events' ? (
                  // 开源活动的特殊两列布局
                  <>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'annual')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'calendar')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </>
                ) : item.key === 'projects' ? (
                  // 开源项目的特殊两列布局
                  <>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'main')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'tech')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </>
                ) : item.key === 'articles-media' ? (
                  // 文章&媒体的特殊两列布局
                  <>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'content')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                    <div className={styles.aboutColumn}>
                      {item.children
                        ?.filter(child => child.group === 'brand')
                        .map(child => (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.navDropdownItem}
                            onClick={() => setActiveDropdown(null)}
                            target={child.target}
                          >
                            <div className={styles.dropdownItemContent}>
                              <span className={styles.dropdownItemTitle}>
                                {child.label}
                              </span>
                              {child.description && (
                                <span className={styles.dropdownItemDesc}>
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </>
                ) : (
                  // 其他菜单的正常布局
                  item.children?.map(child => (
                    <Link
                      key={child.key}
                      href={child.href || '/'}
                      className={styles.navDropdownItem}
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className={styles.dropdownItemContent}>
                        <span className={styles.dropdownItemTitle}>
                          {child.label}
                        </span>
                        {child.description && (
                          <span className={styles.dropdownItemDesc}>
                            {child.description}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* 主导航栏 */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Logo 区域 */}
          <Link href="/" className={styles.logoContainer}>
            <Image
              src="/logo_2.svg"
              alt="开源社 Logo"
              width={100}
              height={100}
              className={styles.logoImage}
            />
          </Link>

          {/* 桌面导航菜单 */}
          <nav className={styles.nav}>
            {mainNavItems.map(item => (
              <NavDropdown key={item.key} item={item} />
            ))}
          </nav>

          {/* 右侧操作区 */}
          <div className={styles.headerActions}>
            {/* 用户认证区域 */}
            {isLoading ? (
              <div className={styles.loginButton}>加载中...</div>
            ) : isAuthenticated && session?.user ? (
              <div className={styles.userMenu} ref={userMenuRef}>
                <div
                  className={styles.userContainer}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-label="用户菜单"
                >
                  {session.user.avatar || session.user.image ? (
                    <Image
                      src={session.user.avatar || session.user.image!}
                      alt={
                        session.user.name || session.user.username || '用户头像'
                      }
                      width={38}
                      height={38}
                      className={styles.userAvatar}
                    />
                  ) : (
                    <User className={styles.userIcon} />
                  )}
                </div>

                {userMenuOpen && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userDropdownHeader}>
                      <div className={styles.userInfo}>
                        <div className={styles.userInfoName}>
                          {session.user.name || session.user.username}
                        </div>
                        <div className={styles.userInfoEmail}>
                          {session.user.email}
                        </div>
                      </div>
                    </div>
                    <div className={styles.userDropdownDivider} />
                    <div className={styles.userDropdownActions}>
                      <Link
                        href="/dashboard"
                        className={styles.userDropdownItem}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className={styles.userDropdownIcon} />
                        个人中心
                      </Link>
                      <button
                        className={styles.userDropdownItem}
                        onClick={handleSignOut}
                      >
                        <LogOut className={styles.userDropdownIcon} />
                        退出登录
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={styles.loginButton}>
                登录
              </Link>
            )}

            <div className={styles.searchContainer}>
              <button
                className={styles.searchButton}
                onClick={() => setSearchOpen(true)}
                aria-label="搜索菜单"
              >
                <Search className={styles.searchIcon} />
              </button>

              {searchOpen && (
                <div className={styles.searchBox}>
                  <div className={styles.searchInputContainer}>
                    <Search className={styles.searchInputIcon} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="搜索菜单..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                    <button
                      className={styles.searchCloseButton}
                      onClick={() => {
                        setSearchOpen(false)
                        setSearchQuery('')
                      }}
                      aria-label="关闭搜索"
                    >
                      <X className={styles.searchCloseIcon} />
                    </button>
                  </div>

                  {/* 搜索结果 */}
                  {searchQuery.trim() && (
                    <div className={styles.searchResults}>
                      {searchResults.length > 0 ? (
                        <>
                          <div className={styles.searchResultsHeader}>
                            找到 {searchResults.length} 个结果
                          </div>
                          {searchResults.map((result, index) =>
                            result.item.key === 'contact' ? (
                              <a
                                key={`${result.item.key}-${index}`}
                                href={result.item.href || '/about'}
                                className={styles.searchResultItem}
                                onClick={e => {
                                  setSearchOpen(false)
                                  setSearchQuery('')
                                  handleContactClick(e)
                                }}
                              >
                                <div className={styles.searchResultContent}>
                                  <div className={styles.searchResultTitle}>
                                    {result.item.label}
                                    {result.parentLabel && (
                                      <span
                                        className={styles.searchResultParent}
                                      >
                                        在 {result.parentLabel}
                                      </span>
                                    )}
                                  </div>
                                  {result.item.description && (
                                    <div className={styles.searchResultDesc}>
                                      {result.item.description}
                                    </div>
                                  )}
                                </div>
                                <div className={styles.searchResultScore}>
                                  {result.matchType === 'label'
                                    ? '标题匹配'
                                    : '描述匹配'}
                                </div>
                              </a>
                            ) : (
                              <Link
                                key={`${result.item.key}-${index}`}
                                href={result.item.href || '/'}
                                className={styles.searchResultItem}
                                onClick={() => {
                                  setSearchOpen(false)
                                  setSearchQuery('')
                                }}
                                target={result.item.target}
                              >
                                <div className={styles.searchResultContent}>
                                  <div className={styles.searchResultTitle}>
                                    {result.item.label}
                                    {result.parentLabel && (
                                      <span
                                        className={styles.searchResultParent}
                                      >
                                        在 {result.parentLabel}
                                      </span>
                                    )}
                                  </div>
                                  {result.item.description && (
                                    <div className={styles.searchResultDesc}>
                                      {result.item.description}
                                    </div>
                                  )}
                                </div>
                                <div className={styles.searchResultScore}>
                                  {result.matchType === 'label'
                                    ? '标题匹配'
                                    : '描述匹配'}
                                </div>
                              </Link>
                            )
                          )}
                        </>
                      ) : (
                        <div className={styles.searchNoResults}>
                          未找到相关菜单项
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className={styles.mobileNav}>
            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon className={styles.mobileMenuIcon} />
            </button>
          </div>
        </div>
      </header>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div
            className={styles.mobileMenuOverlay}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className={styles.mobileMenuContent}>
            <div className={styles.mobileMenuHeader}>
              <div className={styles.mobileMenuTitle}>菜单</div>
              <button
                className={styles.mobileMenuClose}
                onClick={() => setMobileMenuOpen(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.mobileMenuBody}>
              {/* 移动端用户认证区域 */}
              <div className={styles.mobileMenuSection}>
                {isLoading ? (
                  <div className={styles.mobileLoginButton}>加载中...</div>
                ) : isAuthenticated && session?.user ? (
                  <div className={styles.mobileUserSection}>
                    <div className={styles.mobileUserInfo}>
                      {session.user.avatar ? (
                        <Image
                          src={session.user.avatar}
                          alt={
                            session.user.name ||
                            session.user.username ||
                            '用户头像'
                          }
                          width={40}
                          height={40}
                          className={styles.mobileUserAvatar}
                        />
                      ) : (
                        <User className={styles.mobileUserIcon} />
                      )}
                      <div className={styles.mobileUserDetails}>
                        <div className={styles.mobileUserName}>
                          {session.user.name || session.user.username}
                        </div>
                        <div className={styles.mobileUserEmail}>
                          {session.user.email}
                        </div>
                      </div>
                    </div>
                    <div className={styles.mobileUserActions}>
                      <Link
                        href="/dashboard"
                        className={styles.mobileUserAction}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        个人中心
                      </Link>
                      <button
                        className={styles.mobileUserAction}
                        onClick={() => {
                          setMobileMenuOpen(false)
                          handleSignOut()
                        }}
                      >
                        退出登录
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className={styles.mobileLoginButton}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    登录
                  </Link>
                )}
              </div>

              {mainNavItems.map(item => (
                <div key={item.key} className={styles.mobileMenuSection}>
                  <div className={styles.mobileMenuSectionTitle}>
                    {item.label}
                  </div>
                  {item.children && (
                    <div className={styles.mobileMenuItems}>
                      {item.children.map(child =>
                        child.key === 'contact' ? (
                          <a
                            key={child.key}
                            href={child.href || '/about'}
                            className={styles.mobileMenuItem}
                            onClick={e => {
                              setMobileMenuOpen(false)
                              handleContactClick(e)
                            }}
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            key={child.key}
                            href={child.href || '/'}
                            className={styles.mobileMenuItem}
                            onClick={() => setMobileMenuOpen(false)}
                            target={child.target}
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
