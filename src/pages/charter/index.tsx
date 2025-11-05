import React from 'react'
import styles from './index.module.css'

const CharterPage = () => {
  return (
    <div className={styles.charterPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>开源社章程</h1>
          <p className={styles.heroSubtitle}>
            2025年修订版 - 开源社治理文件
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <main className={styles.contentArea}>
          {/* Chapter 1 - General Provisions */}
          <section className={styles.section}>
            <h2 className={styles.chapterTitle}>第一章 总则</h2>
            <div className={styles.sectionContent}>
              <div className={styles.article}>
                <span className={styles.articleNumber}>第一条</span>
                <span className={styles.articleContent}>
                  开源社是由志愿贡献于开源事业的个人志愿者，依 <span className={styles.highlight}>"贡献、共识、共治"</span> 原则所组成的开源社区。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第二条</span>
                <span className={styles.articleContent}>
                  开源社的英文名称为<span className={styles.emphasis}>"KAIYUANSHE"</span>，官方网站地址为： https://kaiyuanshe.cn 。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第三条</span>
                <span className={styles.articleContent}>
                  开源社的愿景为：<span className={styles.highlight}>立足中国、贡献全球，推动开源成为新时代的生活方式</span>。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第四条</span>
                <span className={styles.articleContent}>
                  开源社的使命为：<span className={styles.highlight}>开源治理、国际接轨、社区发展、项目孵化</span>，携手国内外社区、基金会、高校、企业和政府等，共创健康可持续发展的开源生态体系。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第五条</span>
                <span className={styles.articleContent}>
                  开源社的宗旨为：推广开源精神，凝聚众人向善之力，汇聚众人向善之智，开放协作、互惠共赢，为这个世界变得更好做出贡献。（引自开源社《开源人宣言》）
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第六条</span>
                <span className={styles.articleContent}>
                  开源社的理念为：作为 <span className={styles.emphasis}>Open Source Initiative（OSI）</span>在中国的首个成员，认同 OSI 对于开源的定义，并鼓励更多的中国开发者与中国企业，了解、认同并选用符合 OSI 定义的开源许可协议。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第七条</span>
                <span className={styles.articleContent}>
                  开源社遵守国家法律法规和社会公序良俗，遵循国家有关方针政策。
                </span>
              </div>
            </div>
          </section>

          {/* Chapter 2 - Business Scope */}
          <section className={styles.section}>
            <h2 className={styles.chapterTitle}>第二章 业务范围</h2>
            <div className={styles.sectionContent}>
              <div className={styles.article}>
                <span className={styles.articleNumber}>第八条</span>
                <span className={styles.articleContent}>
                  开源社开展的业务，包括但不限于：
                </span>
              </div>
              
              <ul className={styles.businessList}>
                <li className={styles.businessItem}>组织开源相关会议、沙龙、工作坊等各类活动</li>
                <li className={styles.businessItem}>运营线上媒体平台，传播开源相关文化知识资讯</li>
                <li className={styles.businessItem}>开展开源相关内容翻译、报告编写等研究工作</li>
                <li className={styles.businessItem}>开发运维开源相关工具平台等线上基础设施</li>
                <li className={styles.businessItem}>联络合作不同类型、领域的各类开源社区/组织</li>
                <li className={styles.businessItem}>对接海内外开源社区/组织，开展国际交流合作</li>
                <li className={styles.businessItem}>面向高校、企业、社区等进行开源分享、培训</li>
                <li className={styles.businessItem}>为项目、社区提供开发、咨询、运营等支持</li>
                <li className={styles.businessItem}>设计开源相关的纪念品、文化艺术创意作品等</li>
                <li className={styles.businessItem}>探索推动开源理念和模式在更广泛领域的运用</li>
                <li className={styles.businessItem}>其他开源相关的工作</li>
              </ul>
            </div>
          </section>

          {/* Chapter 3 - Members */}
          <section className={styles.section}>
            <h2 className={styles.chapterTitle}>第三章 成员</h2>
            <div className={styles.sectionContent}>
              <div className={styles.article}>
                <span className={styles.articleNumber}>第九条</span>
                <span className={styles.articleContent}>
                  开源社成员包括<span className={styles.emphasis}>社区成员、正式成员</span>等各类个人志愿者。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第十条</span>
                <span className={styles.articleContent}>
                  所有对开源感兴趣，并已经加入开源社工作组或项目组，做出具体贡献的个人志愿者，经过至少两名开源社正式成员的推荐（两位正式成员的推荐语，皆需明确地说明被推荐人对开源以及开源社的具体贡献事迹，作为正式成员投票的参考依据），可以申请成为开源社的正式成员。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第十一条</span>
                <span className={styles.articleContent}>
                  社区成员可以以个人身份申请成为开源社正式成员，经 <span className={styles.highlight}>60% 以上的正式成员投票</span>，且候选人获得的赞成票超过反对票，即通过选举成为开源社正式成员。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第十二条</span>
                <span className={styles.articleContent}>
                  正式成员的权利如下：
                </span>
              </div>
              
              <ul className={styles.rightsList}>
                <li className={styles.rightsItem}>享有"开源社正式成员"的称号</li>
                <li className={styles.rightsItem}>享有在开源社官网正式成员名单中进行展示的权利</li>
                <li className={styles.rightsItem}>可申请获得开源社的官方邮箱账号</li>
                <li className={styles.rightsItem}>可申请获得开源社名片，并印制在开源社所担任的志愿者职衔（如组长、副组长、秘书、正式成员等）</li>
                <li className={styles.rightsItem}>享有开源社正式成员提名/推荐权以及选举权</li>
                <li className={styles.rightsItem}>享有开源社理事等志愿者职衔的提名/推荐权、选举权以及被选举权</li>
                <li className={styles.rightsItem}>享有对开源社事务的建议权</li>
                <li className={styles.rightsItem}>可申请免费或优惠参加开源社各种线上线下活动，将视预算及申请人状况等条件进行审核</li>
                <li className={styles.rightsItem}>可申请获得参加开源社线下活动、代表开源社参加国际开源大会的相关必要差旅补助，将视预算及申请人状况等条件进行审核</li>
                <li className={styles.rightsItem}>可申请协助推广正式成员所在社区或组织与开源相关的文章以及活动等</li>
                <li className={styles.rightsItem}>可自愿放弃作为开源社正式成员的身份及权利</li>
              </ul>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第十三条</span>
                <span className={styles.articleContent}>
                  正式成员的义务如下：
                </span>
              </div>
              
              <ul className={styles.dutiesList}>
                <li className={styles.dutiesItem}>理解并认同开源社愿景</li>
                <li className={styles.dutiesItem}>支持并践行开源社"开源治理、国际接轨、社区发展、项目孵化"的核心使命</li>
                <li className={styles.dutiesItem}>理解并认同开源社"贡献、共识、共治"的原则及《开源人宣言》</li>
                <li className={styles.dutiesItem}>理解并拥护开源社的章程</li>
                <li className={styles.dutiesItem}>选择至少一个工作组或项目组加入，并做出相应贡献</li>
                <li className={styles.dutiesItem}>积极参与正式成员纳新投票及理事选举投票等开源社重要活动</li>
                <li className={styles.dutiesItem}>积极参与开源社线上线下活动、推广宣传及相关的开源项目</li>
              </ul>
            </div>
          </section>

          {/* Chapter 4 - Governance Structure */}
          <section className={styles.section}>
            <h2 className={styles.chapterTitle}>第四章 治理机构</h2>
            <div className={styles.sectionContent}>
              <div className={styles.article}>
                <span className={styles.articleNumber}>第十四条</span>
                <span className={styles.articleContent}>
                  开源社的治理机构包括<span className={styles.emphasis}>正式成员大会、理事会、顾问委员会、法律咨询委员会</span>，理事会下设执行委员会和项目委员会。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第十五条</span>
                <span className={styles.articleContent}>
                  开源社的最高权力机构是<span className={styles.highlight}>正式成员大会</span>，正式成员大会的职权是：
                </span>
              </div>
              
              <ul className={styles.authorityList}>
                <li className={styles.authorityItem}>制定和修改章程，并授权理事会起草章程草案</li>
                <li className={styles.authorityItem}>选举和罢免理事</li>
                <li className={styles.authorityItem}>由理事会决定在正式成员大会进行表决的其他重大事项</li>
              </ul>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第十六条</span>
                <span className={styles.articleContent}>
                  正式成员大会每届一年。正式成员大会须有 <span className={styles.highlight}>2/3 以上的正式成员出席</span>方能召开。理事选举须经到会正式成员所投有效赞成票数量大于零方能生效，理事候选人按有效赞成票数由高至低排序，位列应选人数范围内者当选。制定和修改章程以及罢免理事须经全体正式成员 <span className={styles.highlight}>2/3 以上表决通过</span>方能生效。其他决议须经到会正式成员半数以上表决通过方能生效。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第十七条</span>
                <span className={styles.articleContent}>
                  开源社设立理事会，代表所有正式成员利益作出决策，对正式成员大会负责。执行委员会以及项目委员会在理事会的领导下，开展日常工作。开源社执行委员会下辖数目不定的工作组，分别在某一特定领域开展工作；项目委员会下辖数目不定的项目组，分别在某一特定项目开展工作。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第十八条</span>
                <span className={styles.articleContent}>
                  根据开源社的规模，理事会成员的数量为至多七位，如有缺额不予增补，在开源社之外的同一组织（志愿者除外）任职的理事比例不能超过 30％。理事会内设理事长一名、副理事长和理事若干。理事会成员每届任期一年，理事长连任不得超过两届。所有正式成员都可提名或自荐理事候选人，均享有理事的选举权和被选举权。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第十九条</span>
                <span className={styles.articleContent}>
                  理事会可行使如下职权：
                </span>
              </div>
              
              <ul className={styles.authorityList}>
                <li className={styles.authorityItem}>执行正式成员大会的决议</li>
                <li className={styles.authorityItem}>筹备召开正式成员大会</li>
                <li className={styles.authorityItem}>选举和罢免理事长、副理事长</li>
                <li className={styles.authorityItem}>提议罢免理事，并向正式成员大会提请表决</li>
                <li className={styles.authorityItem}>选举和罢免执行委员会执行长，以及项目委员会主席</li>
                <li className={styles.authorityItem}>决定和解除执行委员会副执行长、工作组组长及副组长的任命</li>
                <li className={styles.authorityItem}>决定和解除项目委员会副主席、项目组组长及副组长的任命</li>
                <li className={styles.authorityItem}>决定正式成员退出的相关规范及事宜</li>
                <li className={styles.authorityItem}>起草章程草案</li>
                <li className={styles.authorityItem}>决定其他重要的内部管理制度</li>
                <li className={styles.authorityItem}>决定工作组和项目组等机构的设立和终止</li>
                <li className={styles.authorityItem}>领导开源社各机构开展工作</li>
                <li className={styles.authorityItem}>批准开源社年度财务预（决）算，协调资金筹措、使用等</li>
                <li className={styles.authorityItem}>决定其他重大事项</li>
              </ul>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第二十条</span>
                <span className={styles.articleContent}>
                  理事会会议每月至少举行一次，召开的时间和地点由理事长决定，理事会会议也可通过音频或视频电话会议等方式在线举行。理事会会议须有 <span className={styles.highlight}>2/3 以上理事会成员出席</span>方能召开，理事会决议须经到会理事半数以上表决通过方能生效。当理事会投票出现平票情况时，由理事长行使最终决定权，其意见为最终决议。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleContent}>
                  下列特别重大事项的决议，须经全体理事的 <span className={styles.highlight}>2/3 以上表决通过</span>方能生效：
                </span>
              </div>
              
              <ul className={styles.authorityList}>
                <li className={styles.authorityItem}>提议罢免理事</li>
                <li className={styles.authorityItem}>起草章程草案</li>
                <li className={styles.authorityItem}>已通过的理事会决议的取消或修改</li>
                <li className={styles.authorityItem}>经全体理事的 2/3 以上表决通过所确认的其他特别重大事项</li>
              </ul>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第二十一条</span>
                <span className={styles.articleContent}>
                  执行委员会是开源社日常执行与办事机构，实行执行长负责制。内设执行长一名，副执行长、工作组组长和副组长若干，每届任期一年。执行长对理事会负责。副执行长、工作组组长和副组长由执行长提名。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第二十二条</span>
                <span className={styles.articleContent}>
                  执行委员会可行使如下职权：
                </span>
              </div>
              
              <ul className={styles.authorityList}>
                <li className={styles.authorityItem}>执行理事会决议，全权负责开源社日常事务</li>
                <li className={styles.authorityItem}>负责向理事会作年度工作总结报告，编制年度工作计划、财务预算和决算方案</li>
                <li className={styles.authorityItem}>负责受理加入开源社的申请，对其资格进行审查</li>
                <li className={styles.authorityItem}>负责开源社正式成员的协调工作</li>
              </ul>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第二十三条</span>
                <span className={styles.articleContent}>
                  项目委员会是开源社项目的日常管理机构，实行项目委员会主席负责制。内设项目委员会主席一名，副主席、项目组组长和副组长若干，每届任期一年。项目委员会主席对理事会负责。副主席、项目组组长和副组长由项目委员会主席提名。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第二十四条</span>
                <span className={styles.articleContent}>
                  项目委员会可行使如下职权：
                </span>
              </div>
              
              <ul className={styles.authorityList}>
                <li className={styles.authorityItem}>执行理事会针对项目的各项决议</li>
                <li className={styles.authorityItem}>负责受理开源社项目的申请，由项目委员会成员投票表决，批准项目的设立、加入或拒绝</li>
                <li className={styles.authorityItem}>负责协调开源社资源，促进各个项目的健康发展</li>
              </ul>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第二十五条</span>
                <span className={styles.articleContent}>
                  工作组负责特定领域的日常工作；项目组围绕重大项目、专题、课题成立。每个工作组或项目组设组长一人，副组长、组员若干，其中组长应是开源社正式成员。工作组或项目组的数量不限。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第二十六条</span>
                <span className={styles.articleContent}>
                  工作组或项目组的发起由正式成员提议，并说明该工作组或项目组的目标、职责范围以及工作计划，经理事会批准，正式设立。工作组以及项目组应定期提交工作报告。理事会负责评审各个工作组以及项目组的工作，并决定其工作是否继续开展。
                </span>
              </div>
            </div>
          </section>

          {/* Chapter 5 - Asset Management */}
          <section className={styles.section}>
            <h2 className={styles.chapterTitle}>第五章 资产管理和使用</h2>
            <div className={styles.sectionContent}>
              <div className={styles.article}>
                <span className={styles.articleNumber}>第二十七条</span>
                <span className={styles.articleContent}>
                  开源社的主要经费来源：
                </span>
              </div>
              
              <ul className={styles.fundingList}>
                <li className={styles.fundingItem}>在业务范围内开展活动和服务的收入</li>
                <li className={styles.fundingItem}>捐赠</li>
                <li className={styles.fundingItem}>资助</li>
                <li className={styles.fundingItem}>利息</li>
                <li className={styles.fundingItem}>其他合法收入</li>
              </ul>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第二十八条</span>
                <span className={styles.articleContent}>
                  开源社的经费用于本章程规定的业务范围和事业的发展，以及日常运转的维持，<span className={styles.highlight}>不得在成员中分配</span>，任何单位、个人不得侵占、私分和挪用。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第二十九条</span>
                <span className={styles.articleContent}>
                  开源社委托<span className={styles.emphasis}>醒源(上海)信息科技有限公司</span>负责相关财务管理，定期公布财务报告，接受成员监督。
                </span>
              </div>
            </div>
          </section>

          {/* Chapter 6 - Supplementary Provisions */}
          <section className={styles.section}>
            <h2 className={styles.chapterTitle}>第六章 附则</h2>
            <div className={styles.sectionContent}>
              <div className={styles.article}>
                <span className={styles.articleNumber}>第三十条</span>
                <span className={styles.articleContent}>
                  对本章程的修改，须经理事会表决通过后，报请正式成员大会审议，经正式成员大会表决通过后生效。
                </span>
              </div>
              
              <div className={styles.article}>
                <span className={styles.articleNumber}>第三十一条</span>
                <span className={styles.articleContent}>
                  本章程的解释权属理事会。
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default CharterPage