import React from 'react'
import styles from './index.module.css'

const CodeOfConductPage = () => {
  return (
    <div className={styles.codeOfConductPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>开源社行为守则</h1>
          <p className={styles.heroSubtitle}>
            基于开源人宣言精神的社区行为准则
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <main className={styles.contentArea}>
          {/* Manifesto Spirit Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>开源人宣言的精神</h2>
            <div className={styles.sectionContent}>
              <div className={styles.manifestoBox}>
                <p className={styles.manifestoText}>
                  本行为准则根据开源社的 <span className={styles.highlight}>"开源人宣言"</span> 精神，适用于开源社管理的所有场合，包括微信、公共和私人邮件列表、维基、博客等我们社区使用的任何其他交流渠道，以及现场活动（即会议）之中的人际直接或间接互动。
                </p>
                <div className={styles.imageContainer}>
                  <img 
                    src="/img/conduct/conduct.png" 
                    alt="开源人宣言" 
                    className={styles.conductImage}
                  />
                </div>
                <p className={styles.manifestoText}>
                  我们希望每个正式或非正式地参与开源社社区的人，或声称与开源社有任何关系的人，在任何与开源社有关的活动中，特别是以任何角色代表开源社时，都能遵守这一行为准则。
                </p>
                <p className={styles.manifestoText}>
                  这个守则并不详尽或完整。它提炼了我们对合作、共享环境和目标的共同理解。我们希望开源社社区的所有成员在精神上和文字上都能遵守它，以便它能丰富我们所有人和我们所参与的社区。
                </p>
              </div>
            </div>
          </section>

          {/* Negative List Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>负面表列</h2>
            <div className={styles.sectionContent}>
              <div className={styles.introText}>
                <p>
                  我们相信所有开源爱好者都能很好地理解并践行开源社的开源人宣言，不需要以过多的行为守则或条条框框来限制一个自由、开放与互信的开源共同体；然而我们仍需指出有一些行为是在开源社或其它开源社区都不受欢迎的，例如：
                </p>
              </div>
              <ul className={styles.negativeList}>
                <li className={styles.negativeItem}>
                  不符合本国法律或社会规范的言行
                </li>
                <li className={styles.negativeItem}>
                  针对他人的暴力威胁或语言
                </li>
                <li className={styles.negativeItem}>
                  性别歧视、种族主义或其他歧视性笑话和语言
                </li>
                <li className={styles.negativeItem}>
                  发布色情或暴力的材料或内容
                </li>
                <li className={styles.negativeItem}>
                  发布（或威胁发布）他人的个人身份信息（肉搜）
                </li>
                <li className={styles.negativeItem}>
                  分享私人内容，如私下或不公开发送的电子邮件、论坛对话，或社交频道历史记录
                </li>
                <li className={styles.negativeItem}>
                  人身攻击，特别是那些使用种族主义或性别歧视术语的侮辱
                </li>
                <li className={styles.negativeItem}>
                  不友好或是带着恶意的关注（如性暗示等）和脏话
                </li>
                <li className={styles.negativeItem}>
                  反复骚扰他人。一般来说如果有人要求你停止某种行为或语言，请即刻停止
                </li>
                <li className={styles.negativeItem}>
                  提倡或鼓励上述任何行为
                </li>
              </ul>
            </div>
          </section>

          {/* Community References Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>社区借镜</h2>
            <div className={styles.sectionContent}>
              <p className={styles.referenceIntro}>
                本守则借鉴以下内容和灵感:
              </p>
              <ul className={styles.referenceList}>
                <li className={styles.referenceItem}>
                  <a href="https://www.apache.org/foundation/policies/conduct.html" target="_blank" rel="noopener noreferrer">
                    Apache Software Foundation Code of Conduct
                  </a>
                </li>
                <li className={styles.referenceItem}>
                  <a href="http://couchdb.apache.org/conduct.html" target="_blank" rel="noopener noreferrer">
                    CouchDB Project Code of Conduct
                  </a>
                </li>
                <li className={styles.referenceItem}>
                  <a href="http://fedoraproject.org/code-of-conduct" target="_blank" rel="noopener noreferrer">
                    Fedora Project Code of Conduct
                  </a>
                </li>
                <li className={styles.referenceItem}>
                  <a href="http://speakup.io/coc.html" target="_blank" rel="noopener noreferrer">
                    Speak Up! Code of Conduct
                  </a>
                </li>
                <li className={styles.referenceItem}>
                  <a href="https://www.djangoproject.com/conduct/" target="_blank" rel="noopener noreferrer">
                    Django Code of Conduct
                  </a>
                </li>
                <li className={styles.referenceItem}>
                  <a href="http://www.debian.org/vote/2014/vote_002" target="_blank" rel="noopener noreferrer">
                    Debian Code of Conduct
                  </a>
                </li>
                <li className={styles.referenceItem}>
                  <a href="https://github.com/twitter/code-of-conduct/blob/master/code-of-conduct.md" target="_blank" rel="noopener noreferrer">
                    Twitter Open Source Code of Conduct
                  </a>
                </li>
                <li className={styles.referenceItem}>
                  <a href="https://wiki.mozilla.org/Code_of_Conduct/Draft#Conflicts_of_Interest" target="_blank" rel="noopener noreferrer">
                    Mozilla Code of Conduct/Draft
                  </a>
                </li>
                <li className={styles.referenceItem}>
                  <a href="https://www.python.org/community/diversity/" target="_blank" rel="noopener noreferrer">
                    Python Diversity Appendix
                  </a>
                </li>
                <li className={styles.referenceItem}>
                  <a href="http://pythonmentors.com/" target="_blank" rel="noopener noreferrer">
                    Python Mentors Home Page
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Additional Information */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>相关信息</h2>
            <div className={styles.sectionContent}>
              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>开源人宣言</h3>
                <p className={styles.infoText}>
                  了解开源社的核心价值观和开源人宣言，理解我们的社区精神和理念。
                </p>
              </div>
              
              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>举报违规行为</h3>
                <p className={styles.infoText}>
                  如果您遇到或发现违反本行为守则的行为，请通过开源社官方渠道进行举报。我们将认真对待每一起举报并采取适当措施。
                </p>
              </div>

              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>联系我们</h3>
                <p className={styles.infoText}>
                  如有任何关于行为守则的疑问或建议，欢迎通过开源社官方渠道联系我们。
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default CodeOfConductPage