import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '../hooks/useTranslation'
import { FacebookIcon, LinkedinIcon, X } from 'lucide-react'
import { SiBilibili, SiWechat } from 'react-icons/si'
import { useState } from 'react'
import { Modal } from 'antd'
import styles from '../styles/Footer.module.css'

interface MenuItem {
  label: string
  href: string
  target?: string
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

export default function Footer() {
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false)
  const { t } = useTranslation()

  // 基于开源社 Header 组件中的主导航菜单项
  const menuSections: MenuSection[] = [
    {
      title: '关于我们',
      items: [
        { label: '开源社简介', href: '/about' },
        { label: '理事会', href: '/department/board' },
        { label: '顾问委员会', href: '/department/advisory' },
        { label: '法律咨询委员会', href: '/department/legal' },
        { label: '执行委员会', href: '/department/executive' },
        { label: '项目委员会', href: '/department/project' },
        { label: '品牌资源', href: '/brand' }
      ]
    },
    {
      title: '社区治理',
      items: [
        { label: '开源社章程', href: '/charter' },
        { label: '开源人宣言', href: '/governance/open-source-manifesto' },
        { label: '开源社行为守则', href: '/governance/code-of-conduct' },
        { label: '开源社年度报告', href: '/kysreports' }
      ]
    },
    {
      title: '社区发展',
      items: [
        { label: '合作伙伴', href: '/partners' },
        { label: '正式成员', href: '/department/members' },
        { label: '开源之星', href: '/community/star' },
        { label: '年度优秀志愿者', href: '/community/volunteer' },
        { label: 'COSCon之星', href: '/community/coscon' },
        { label: '社区合作之星', href: '/community/cooperation' },
        { label: '开源社城市社区（KCC）', href: '/community' },
        { label: '中国开源年度报告', href: '/osreports' },
        { label: '中国开源先锋榜', href: '/community/pioneer' },
        {
          label: '中国开源码力榜',
          href: 'https://opensource.win/',
          target: '_blank'
        }
      ]
    },
    {
      title: '开源活动',
      items: [
        { label: '中国开源年会', href: '/events' },
        { label: '社区合作活动', href: '/events' },
        { label: '活动日历', href: '/events/calendar' }
      ]
    },
    {
      title: '博客&公告',
      items: [
        { label: '博客', href: '/blogs' },
        { label: '公告', href: '/announcement' }
      ]
    }
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Left section with logo and description */}
          <div className={styles.footerLeft}>
            <div className={styles.logoSection}>
              <Image
                src="/footer-logo.png"
                alt="KAIYUANSHE Logo"
                width={200}
                height={100}
                className={styles.footerLogo}
              />
              <p className={styles.aboutDescription}>
                开源社（"KAIYUANSHE®"）成立于 2014
                年，是由志愿贡献于开源事业的个人成员，依 "贡献、共识、共治"
                原则所组成，始终维持 "厂商中立、公益、非营利" 的理念，以
                "立足中国、贡献全球，推动开源成为新时代的生活方式"
                为愿景，以"开源治理、国际接轨、社区发展、项目孵化"为使命，旨在共创健康可持续发展的开源生态体系。
              </p>
            </div>

            {/* Social media icons */}
            <div className={styles.socialSection}>
              <div className={styles.socialLinks}>
                <Link
                  href="https://x.com/kaiyuanshe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialButton}
                  aria-label="X (Twitter)"
                >
                  <X className={styles.socialIcon} />
                </Link>
                <Link
                  href="https://www.facebook.com/kaiyuanshe.china"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialButton}
                  aria-label="Facebook"
                >
                  <FacebookIcon className={styles.socialIcon} />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/kaiyuanshe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialButton}
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className={styles.socialIcon} />
                </Link>
                <Link
                  href="https://space.bilibili.com/500938314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialButton}
                  aria-label="Bilibili"
                >
                  <SiBilibili className={styles.socialIcon} />
                </Link>
                <button
                  className={styles.socialButton}
                  aria-label="微信公众号"
                  onClick={() => setIsWeChatModalOpen(true)}
                >
                  <SiWechat className={styles.socialIcon} />
                </button>
              </div>
            </div>
          </div>

          {/* Right section with navigation menu */}
          <div className={styles.footerRight}>
            {menuSections.map((section, index) => (
              <div key={index} className={styles.menuSection}>
                <h4 className={styles.menuTitle}>{section.title}</h4>
                <ul className={styles.menuList}>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        href={item.href}
                        className={styles.menuLink}
                        target={item.target}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer bottom with copyright */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            <span>
              <span style={{ marginRight: '2rem' }}>
                © 2025 开源社. 保留所有权利
              </span>
              {/* <span style={{ marginRight: '2rem' }}>沪 ICP 备 19006015 号</span>
              <span>公安备案 31011202006203 号</span> */}
            </span>
          </p>
        </div>
      </div>

      {/* WeChat QR Code Modal */}
      <Modal
        title="关注开源社公众号"
        open={isWeChatModalOpen}
        onCancel={() => setIsWeChatModalOpen(false)}
        footer={null}
        centered
        width={400}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Image
            src="/img/home/QRCode.png"
            alt="开源社公众号二维码"
            width={250}
            height={250}
            style={{ borderRadius: '8px' }}
          />
          <p style={{ marginTop: '16px', color: '#666' }}>
            扫描二维码关注开源社公众号
          </p>
        </div>
      </Modal>
    </footer>
  )
}
