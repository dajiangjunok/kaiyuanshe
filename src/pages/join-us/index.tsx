import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ExternalLink, Mail, Users, Star, Award } from 'lucide-react'
import styles from './index.module.css'

export default function JoinUsPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['intro', 'structure', 'volunteer', 'member', 'exit'])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const Section = ({ id, title, icon: Icon, children }: {
    id: string
    title: string
    icon: React.ComponentType<any>
    children: React.ReactNode
  }) => {
    const isExpanded = expandedSections.includes(id)

    return (
      <div className={styles.section}>
        <button
          className={styles.sectionHeader}
          onClick={() => toggleSection(id)}
          aria-expanded={isExpanded}
        >
          <div className={styles.sectionTitle}>
            <Icon className={styles.sectionIcon} />
            <h2>{title}</h2>
          </div>
          <ChevronDown
            className={`${styles.sectionToggle} ${isExpanded ? styles.sectionToggleExpanded : ''}`}
          />
        </button>
        {isExpanded && (
          <div className={styles.sectionContent}>
            {children}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>如何加入开源社</h1>
          <p className={styles.subtitle}>
            成为开源社的一员，共同推动中国开源事业发展
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <Section id="intro" title="开源社简介" icon={Users}>
          <div className={styles.introContent}>
            <p>
              开源社成立于 2014 年，是由志愿贡献于开源事业的个人成员，依 "贡献、共识、共治" 原则所组成，始终维持厂商中立、公益、非营利的特点，是最早以 "开源治理、国际接轨、社区发展、项目孵化" 为使命的开源社区联合体。
            </p>
            <p>
              开源社积极与支持开源的社区、企业以及政府相关单位紧密合作，以 "立足中国、贡献全球，推动开源成为新时代的生活方式" 为愿景，旨在共创健康可持续发展的开源生态，推动中国开源社区成为全球开源体系的积极参与及贡献者。
            </p>
          </div>
        </Section>

        <Section id="structure" title="开源社的组织架构" icon={Award}>
          <div className={styles.structureContent}>
            <div className={styles.imageContainer}>
              <Image
                src="/img/about/zuzhijg.png"
                alt="开源社组织架构图"
                width={800}
                height={600}
                className={styles.structureImage}
              />
            </div>
          </div>
        </Section>

        <Section id="volunteer" title="如何成为开源社志愿者" icon={Star}>
          <div className={styles.volunteerContent}>
            <div className={styles.subsection}>
              <h3>目前开放的招募渠道有：</h3>
              <div className={styles.recruitmentChannels}>
                <div className={styles.channel}>
                  <h4>1. 媒体组</h4>
                  <Link
                    href="https://mp.weixin.qq.com/s/5rM03zc4nND5Z7Gga4gEKA"
                    target="_blank"
                    className={styles.channelLink}
                  >
                    了解详情 <ExternalLink className={styles.linkIcon} />
                  </Link>
                </div>
                <div className={styles.channel}>
                  <h4>2. 成员发展组</h4>
                  <Link
                    href="https://mp.weixin.qq.com/s/6nzLN9js6mXgUdgIU98BNA"
                    target="_blank"
                    className={styles.channelLink}
                  >
                    了解详情 <ExternalLink className={styles.linkIcon} />
                  </Link>
                </div>
                <div className={styles.channel}>
                  <h4>3. 翻译组</h4>
                  <Link
                    href="https://mp.weixin.qq.com/s/4Gmll8jS57bu3ruGKjDlwg"
                    target="_blank"
                    className={styles.channelLink}
                  >
                    了解详情 <ExternalLink className={styles.linkIcon} />
                  </Link>
                </div>
                <div className={styles.channel}>
                  <h4>4. 项目委员会</h4>
                  <Link
                    href="https://mp.weixin.qq.com/s/82AhDyWIq8lsz3NMvBt46g"
                    target="_blank"
                    className={styles.channelLink}
                  >
                    了解详情 <ExternalLink className={styles.linkIcon} />
                  </Link>
                </div>
              </div>
              <p className={styles.note}>
                更多工作组敬请期待，也可关注{' '}
                <Link href="/events" className={styles.inlineLink}>
                  中国开源年会（COSCon）
                </Link>{' '}
                相关志愿者招募信息，期待您成为中国开源年会的志愿者。如有意向成为开源社的储备志愿者，请联系：{' '}
                <Link href="mailto:talent@kaiyuanshe.org" className={styles.emailLink}>
                  <Mail className={styles.emailIcon} />
                  talent@kaiyuanshe.org
                </Link>
              </p>
            </div>

            <div className={styles.subsection}>
              <h3>志愿者的义务</h3>
              <ul className={styles.obligationsList}>
                <li>理解并认同开源社 [贡献、共识、共治] 的原则；</li>
                <li>支持并参与开源社 [开源治理、国际接轨、社区发展、项目孵化] 的核心使命；</li>
                <li>
                  理解并熟悉开源社的章程：
                  <Link href="/charter" className={styles.inlineLink}>
                    开源社章程（2023 年版）
                  </Link>
                  。
                </li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3>志愿者的权利</h3>
              <ul className={styles.rightsList}>
                <li>拥有免费或优惠参加开源社各种线上线下活动的福利；</li>
                <li>拥有与开源界大佬们交流对话的机会，更有机会线下见面；</li>
                <li>优秀的年度志愿者可收获年度开源人礼包；</li>
                <li>如果有寻找工作的需要，优秀的年度志愿者可以由开源社出具推荐信；</li>
                <li>
                  如果是学生志愿者，志愿者工作满三个月，可以为大家提供相关专业的实习证明（需进行专业相关的志愿者工作），或是进行校外志愿者工作的认定。
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="member" title="如何成为开源社正式成员" icon={Award}>
          <div className={styles.memberContent}>
            <div className={styles.memberIntro}>
              <p>
                如果您有意向加入开源社并成为正式成员，您需要先选择一个开源社的工作组或项目组，并作为志愿者在其中贡献不少于三个月的时间。
              </p>
              <p>
                每年开源社换届选举的时间段（每年年初），将由成员发展组发起并开放开源社正式成员的申请渠道。作为深入贡献的志愿者，如果您有意向成为开源社的正式成员，可由两位正式成员推荐，填写正式成员的申请。请注意，需要请推荐您的每一位正式成员完成一份入社推荐语，个人也需要详细说明作为志愿者期间的贡献。不用担心，深入贡献的您，一定有很多内容可以写，期待您的材料哦！
              </p>
              <p>
                完成正式成员的申请，接下来就是耐心等待的阶段啦，在这个期间，成员发展组会详细阅读大家的推荐语和入社申请，筛选有优秀贡献的志愿者（请放心，认真填写的朋友，一定不会被筛走的），并在整理后提交当届全体开源社正式成员进行公示与推荐人答疑。公示及答疑通过后，经全体开源社正式成员投票，投票通过即可以个人身份成为开源社正式成员。申请通过的新一届正式成员，将由推荐人提供入社渠道。至此，您就正式通过了入社申请，成为开源社的正式成员了。
              </p>
            </div>

            <div className={styles.subsection}>
              <h3>正式成员的义务</h3>
              <ul className={styles.memberObligationsList}>
                <li>选择至少一个工作组或项目组加入，并做出相应贡献；</li>
                <li>积极参与正式成员纳新投票及理事选举投票等开源社重要活动；</li>
                <li>积极参与开源社线上线下活动、推广宣传及相关的开源项目。</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3>正式成员的权利</h3>
              <p className={styles.memberRightsIntro}>
                作为一位开源社的正式成员，您将享有【开源社正式成员】的称号，并将在开源社官网中展示您的个人贡献。同时您将有机会参与到开源社的各项活动、任务和目标中，并为社区的发展做出贡献。完整权益如下：
              </p>
              <ul className={styles.memberRightsList}>
                <li>拥有免费或优惠参加开源社各种线上线下活动的福利，享有申请开源社线下活动相关必要差旅补助的申请权；</li>
                <li>
                  同时享有申请国际开源大会（目前暂时限于几个与开源社合作关系密切的国际基金会，如 ApacheCon、LinuxCon-LC3 等）的差旅补助的申请权（作为资源有限的开源社区，差旅补助我们将视预算及申请人状况而审核）。
                </li>
                <li>开源社正式成员拥有每年正式成员候选人的推荐权以及投票选举权；</li>
                <li>拥有开源社理事资格的选举以及被选举权。</li>
                <li>申请获得开源社的官方邮箱账号；</li>
                <li>
                  申请开源社名片，并印制开源社正式成员称号以及在开源社工作组或项目组所担任的志愿者职衔（如组长、副组长、秘书、成员等）。
                </li>
                <li>
                  享有正式成员所在社区或公司与开源相关文章以及活动协助推广优先申请权（需先通过申请流程及审核）。
                </li>
              </ul>
              <p className={styles.memberRightsNote}>
                *更多正式成员权利，开源社成员发展组也在积极策划中，欢迎您来开源社添砖加瓦！如果正式成员对以上权利有任何建议，欢迎向我们反馈！
              </p>
            </div>
          </div>
        </Section>

        <Section id="exit" title="退出机制" icon={ExternalLink}>
          <div className={styles.exitContent}>
            <p>
              通过正式成员的申请仅仅只是成为开源社正式成员的第一步，您需要严格遵守开源社的相关章程，如果您的言行违背开源社的章程，或是连续 5 年没有参与年度全体成员大会以及没有参与任何年度投票的正式成员，经过年度大会的全体成员投票后，会变成 (Emeritus) 退休状态。
            </p>
            <p>
              但被退休成员隔年还是能申请重新恢复成员身份，经过全体成员投票通过，即可恢复成员身份。
            </p>
            <p>
              总之，成为开源社正式成员是一件非常有意义的事情。您将能够参与到开源社的各种活动、任务和目标中，结交志同道合的朋友，锻炼个人的能力，增加自己在开源社区中的影响力和话语权等。如果您对开源社的发展和贡献有浓厚的兴趣，那么不妨积极参与到开源社的活动中来，为社区的发展做出自己的贡献。
            </p>
          </div>
        </Section>

        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2>准备好加入我们了吗？</h2>
            <p>开始您的开源之旅，与我们一起推动中国开源事业发展</p>
            <div className={styles.ctaButtons}>
              <Link href="mailto:talent@kaiyuanshe.org" className={styles.ctaButton}>
                <Mail className={styles.ctaButtonIcon} />
                联系我们
              </Link>
              <Link href="/about" className={styles.ctaButtonSecondary}>
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}