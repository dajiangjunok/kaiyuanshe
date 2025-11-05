import React from 'react'
import styles from './index.module.css'

const MemberRightsPage = () => {
  return (
    <div className={styles.memberRightsPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>正式成员的权利与义务</h1>
          <p className={styles.heroSubtitle}>
            开源社正式成员的权利与义务说明
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <main className={styles.contentArea}>
          {/* Rights Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>正式成员的权利</h2>
            <div className={styles.sectionContent}>
              <ul className={styles.rightsList}>
                <li className={styles.rightsItem}>
                  享有<span className={styles.highlight}>"开源社正式成员"</span>的称号
                </li>
                <li className={styles.rightsItem}>
                  可在开源社官网展示正式成员名单
                </li>
                <li className={styles.rightsItem}>
                  可申请获得开源社的官方邮箱账号
                </li>
                <li className={styles.rightsItem}>
                  可申请获得开源社名片，并印制开源社正式成员称号以及在开源社工作组或项目组所担任的志愿者职衔（如组长、副组长、秘书、正式成员等）
                </li>
                <li className={styles.rightsItem}>
                  拥有每年正式成员候选人的<span className={styles.emphasis}>推荐权以及投票选举权</span>。拥有开源社理事资格的选举以及被选举权
                </li>
                <li className={styles.rightsItem}>
                  拥有免费或优惠参加开源社各种线上线下活动的福利。享有申请开源社线下活动相关必要差旅补助的申请权
                  <div className={styles.noteText}>
                    （备注：作为资源有限的开源社区，我们将视预算及申请人状况而审核）
                  </div>
                </li>
                <li className={styles.rightsItem}>
                  享有申请国际开源大会（目前暂时限于几个与开源社合作关系密切的国际基金会，如 ApacheCon、LinuxCon-LC3 等）的差旅补助的申请权
                  <div className={styles.noteText}>
                    （备注同上）
                  </div>
                </li>
                <li className={styles.rightsItem}>
                  享有正式成员所在社区或公司与开源相关文章以及活动协助推广优先申请权（需先通过申请流程及审核）
                </li>
              </ul>
            </div>
          </section>

          {/* Obligations Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>正式成员的义务</h2>
            <div className={styles.sectionContent}>
              <ul className={styles.obligationsList}>
                <li className={styles.obligationsItem}>
                  理解并认同开源社<span className={styles.highlight}>"贡献、共识、共治"</span>的原则
                </li>
                <li className={styles.obligationsItem}>
                  支持并参与开源社<span className={styles.emphasis}>"开源治理、国际接轨、社区发展、项目孵化"</span>的核心使命
                </li>
                <li className={styles.obligationsItem}>
                  理解并熟悉开源社的章程：
                  <a 
                    href="https://kaiyuanshe.cn/profile/charter/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.linkText}
                  >
                    https://kaiyuanshe.cn/profile/charter/
                  </a>
                </li>
                <li className={styles.obligationsItem}>
                  选择至少一个工作组或项目组加入，并做出相应贡献
                </li>
                <li className={styles.obligationsItem}>
                  积极参与正式成员纳新投票及理事选举投票等开源社重要活动
                </li>
                <li className={styles.obligationsItem}>
                  积极参与开源社线上线下活动、推广宣传及相关的开源项目
                </li>
              </ul>
            </div>
          </section>

          {/* Additional Information */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>相关信息</h2>
            <div className={styles.sectionContent}>
              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>成为正式成员</h3>
                <p className={styles.infoText}>
                  如果您对加入开源社正式成员感兴趣，请先了解我们的章程和社区文化，积极参与社区活动，并在工作组或项目组中做出贡献。
                </p>
              </div>
              
              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>联系我们</h3>
                <p className={styles.infoText}>
                  如有任何关于正式成员权利义务的疑问，欢迎通过开源社官方渠道联系我们。
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default MemberRightsPage