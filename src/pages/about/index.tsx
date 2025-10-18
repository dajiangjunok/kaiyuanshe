import React from 'react'
import styles from './index.module.css'

const AboutPage = () => {

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <img
          src="/img/about/banner.jpeg"
          alt="开源社"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>开源社</h1>
          <p className={styles.heroSubtitle}>
            KAIYUANSHE - 致力于推动开源发展的社区
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Content Area */}
        <main className={styles.contentArea}>
          {/* Introduction Section */}
          <section id="introduction" className={styles.section}>
            <h2 className={styles.sectionTitleCentered}>简介</h2>
            <div className={styles.sectionContent}>
              <p className={styles.description}>
                开源社（KAIYUANSHE）是中国最具影响力的开源社区之一，致力于推动开源软件在中国的发展与普及。作为一个非营利性组织，开源社汇聚了众多开源爱好者、开发者、企业和学术机构，共同构建健康可持续的开源生态系统。
              </p>
              <p className={styles.description}>
                我们秉承"开放、协作、共享"的开源精神，通过举办技术交流活动、推广开源文化、孵化优秀项目、制定行业标准等方式，为中国开源事业的发展贡献力量。开源社不仅是技术交流的平台，更是推动开源理念在各行各业落地实践的重要力量。
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <section id="vision" className={styles.section}>
            <h2 className={styles.sectionTitleCentered}>愿景和目标</h2>
            <div className={styles.sectionContent}>
              <p className={styles.description}>
               开源社（英文名称为“KAIYUANSHE”）成立于 2014 年，是由志愿贡献于开源事业的个人志愿者，依 “贡献、共识、共治” 原则所组成的开源社区。开源社始终维持 “厂商中立、公益、非营利” 的理念，以 “立足中国、贡献全球，推动开源成为新时代的生活方式” 为愿景，以 “开源治理、国际接轨、社区发展、项目孵化” 为使命，旨在共创健康可持续发展的开源生态体系。
              </p>
              <p className={styles.description}>
               开源社积极与支持开源的社区、高校、企业以及政府相关单位紧密合作，同时也是全球开源协议认证组织 - OSI 在中国的首个成员。
              </p>
              <p className={styles.description}>自2016年起连续举办中国开源年会（COSCon），持续发布《中国开源年度报告》，联合发起了“中国开源先锋榜”、“中国开源码力榜”等，在海内外产生了广泛的影响力。</p>
              <img
                src="/img/about/yuanjin.jpeg"
                alt="愿景"
                className={styles.heroImage}
              />
            </div>
          </section>

          {/* Organization Section */}
          <section id="organization" className={styles.section}>
            <h2 className={styles.sectionTitleCentered}>组织结构</h2>
            <div className={styles.sectionContent}>
              <img
                src="/img/about/zuzhijg.png"
                alt="组织"
                className={styles.heroImage}
              />
              <p className={styles.description}>
                开源社由个人正式成员选举组成理事会，由理事会任命组成执行委员会以及项目委员会。执行委员会负责各个工作组的日常运作，项目委员会负责各个项目的孵化推进，并设立由企业、社区与个人开源专家组成的顾问委员会，以及法律咨询委员会。
              </p>
            </div>
          </section>

          {/* Documents Section */}
          <section id="documents" className={styles.section}>
            <h2 className={styles.sectionTitleCentered}>常用文档和链接</h2>
            <div className={styles.sectionContent}>
              <div className={styles.documentsGrid}>
                <a
                  href="https://kaiyuanshe.feishu.cn/wiki/wikcn749HAOCD2dwaNq4dOC67db"
                  className={styles.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.linkIcon}>🔗</span>
                  开源社
                  <span className={styles.externalIcon}>↗</span>
                </a>
              </div>
            </div>
          </section>

          {/* Help Section */}
          <section id="help" className={styles.section}>
            <h2 className={styles.sectionTitleCentered}>知识空间帮助</h2>
            <div className={styles.sectionContent}>
               <p className={styles.description}>
              这里你可以添加知识库使用规范、操作流程、管理员联系方式等。
              </p>
              <img
                src="/img/about/help.gif"
                alt="帮助"
                className={styles.heroImage}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default AboutPage
