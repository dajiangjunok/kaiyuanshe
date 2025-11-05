import React from 'react'
import VolunteerProfile from '../../../components/volunteer/VolunteerProfile'
import styles from './index.module.css'

const volunteers = [
  {
    name: '王玥敏',
    nickname: '月饼',
    avatar: '/img/volunteers/3.webp',
    recommendation:
      '王玥敏（月饼）在开源社服务四年有余，始终勤勉尽责，对媒体组的快速成长和壮大起到了关键作用。这位默默付出的开源贡献者，实应得到更多关注。今年，她担任媒体组组长，带领这个相对低调的团队，以一篇篇深入浅出的文章，默默传递开源社的理念。月饼在文章排期、志愿者联络等核心工作中发挥了关键作用。在开源社开放协作精神的指引下，她坚定地培养和带领了一批新生力量，为开源社注入活力。在 COSCon 年会活动中，月饼还兼任礼品组重任，精心挑选、审核样品，通过大量沟通与协调，确保在预算范围内将设计组的作品完美呈现。'
  },
  {
    name: '丁文昊',
    nickname: '止戈',
    avatar: '/img/volunteers/4.webp',
    recommendation:
      '从年初被任命为理事会秘书后，对会议纪要、公开简报等文书工作认真负责，并在外部专家讲座后迅速主导了《罗伯特议事规则》在理事会的应用，并以会议主持人的身份严格维护会议规则，显著促进了理事会向高效、严谨、务实的方向发展。在软件研发方面，自主完成了《中国开源年报》线上基础设施的搭建，促进年报工作流更加符合开源规范。'
  },
  {
    name: '崔晨洋',
    nickname: '',
    avatar: '/img/volunteers/5.png',
    recommendation:
      '20年开始参与 COSCon，工作认真负责，去年付费买票后还自费差旅去成都做志愿者，高低得整一个。'
  },
  {
    name: '桑毅炜',
    nickname: '',
    avatar: '/img/volunteers/6.png',
    recommendation:
      '在技术方面，承担了社内多数旧数据搬运、整理工作，并协助开发志愿者发现了不少 bug。在运营方面，是普通志愿者中主动发起分享活动、日常例会最多的，特别是例会上团队精进环节的多次自学分享，和“深夜自习室”周期日程的组织，推动了基设组和项委会的学习氛围营造。'
  },
  {
    name: '陈玄',
    nickname: '',
    avatar: '/img/volunteers/7.png',
    recommendation:
      '陈玄积极地参与了开源社的各项活动与项目，包含 K-Token 项目、KCC 上海的组织，以及视频翻译（OSI 定义开源人工智能 Webinar 系列）等。工作态度主动负责，善于沟通及解决问题。'
  },
  {
    name: '罗基印',
    nickname: '',
    avatar: '/img/volunteers/8.webp',
    recommendation:
      '主动承担开源社云主机性能、安全性优化工作，自主攻克多个 Docker 容器性能难题，并主导搭建了基于开源软件的服务监控机制，在飞书通知群随时关注服务器宕机并及时排障，为官网日常和年会高并发正常运行做出了重要贡献。侯选人除了上述发挥自身运维专业优势的工作，还主动对我社各开源项目提 issue、写 PR，主动与其他志愿者交流自己不熟悉的技术领域，争取将发现的问题自主解决。'
  },
  {
    name: '丘儒展',
    nickname: '',
    avatar: '/img/volunteers/9.webp',
    recommendation:
      '积极参与项委会下各项目的开发，在主席指导下完成了多项重要功能重构。特别是「新冠抗疫信息平台」的疫情地图页面，其中的图表形状、交互、数据都很复杂，最早由一个小团队独立开发完后并入，数据源和基础库失效后长期难以恢复。而本候选人面对难题保持耐心，面对新技术保持虚心，主动在群里提问、讨论，边学边干，也没花太多时间就完成了任务，是「开放协作」实践的很好表率。'
  },
  {
    name: '王军',
    nickname: '',
    avatar: '/img/volunteers/10.webp',
    recommendation:
      '在媒体组的这段时间里，从小编到负责整个排期，成长了很多。对待工作认真负责，对文章的选择有自己的理解和判断。有良好的沟通和协调能力，和组员和其他人员能主动交流获取反馈。'
  },
  {
    name: '朱亿钦',
    nickname: '居居',
    avatar: '/img/volunteers/11.png',
    recommendation:
      '朱亿钦（居居）在过去四年里，作为开源社的志愿者和设计师，勤勉可靠，专业能力卓越，尽管个人事务繁忙，却始终活跃在媒体组的第一线，不断推出独到的创意和精湛的设计作品。作为设计组组长，居居兼具细心与耐心，持续推动团队创新，确保作品的高品质呈现。她精心策划了开源社节日海报、吉祥物小 O 表情包等设计项目，赢得了广泛好评；对志愿者耐心引导，对新手设计师从基础着手，倾囊相授；在 COSCon 期间，为确保开源社周边产品质量，居居连续三年主动承担定制工作，与供应商紧密沟通协调。即便在 COSCon 期间面临繁重的设计任务，她仍能在规定时间内交出高质量的作品，并持续创新，赢得了团队和社区的认可。'
  },
  {
    name: '董吉甫',
    nickname: '',
    avatar: '/img/volunteers/12.webp',
    recommendation: '运营南京 KCC，链接众多社区资源，努力提升南京开源社区氛围。'
  },
  {
    name: '胡欣元',
    nickname: '',
    avatar: '/img/volunteers/13.png',
    recommendation:
      '长期负责文章排版审核的工作，能够耐心细致地检查文章中出现的问题，给出小编意见加以调整。尽管审核工作繁复但始终认真完成。起到了把控的作用。'
  },
  {
    name: '李楠',
    nickname: '',
    avatar: '/img/volunteers/14.webp',
    recommendation:
      '社区合作组优秀志愿者，在过去的一年里积极与社区合作，协助宣发社区合作活动、直播等活动，她还为开源社做了很多其他出色的工作，比如媒体稿件编辑等，楠楠的活跃度，大家都看得到～'
  },
  {
    name: '王萱',
    nickname: '',
    avatar: '/img/volunteers/15.webp',
    recommendation:
      '起到了一个润滑剂的作用，协助完成了很多工作。能在组员需要帮忙的时候主动提供帮助，并提出自己的观点。认真负责地完成了对新人的带教。在工作中会更加注重细节。'
  },
  {
    name: '李佳欣',
    nickname: '',
    avatar: '/img/volunteers/16.webp',
    recommendation:
      '李佳欣一年里都在做开源社财务工作，每个月对账、记账、整理开源社每个月的、2023年的财务报表等等。日常的报销、年会期间的合同处理她都有参与，今年年会赞助（财务方面）的也是她在着手进行，非常负责认真、勤勤恳恳。'
  },
  {
    name: '臧鹏',
    nickname: '大鹏',
    avatar: '/img/volunteers/17.webp',
    recommendation:
      '在深圳 KCC 的运作方面坚持不懈，持续发力开源硬件，不断发起并筹划各种线下活动。'
  },
  {
    name: '赵文涵',
    nickname: '',
    avatar: '/img/volunteers/18.webp',
    recommendation:
      '加入社区合作组后一直帮忙社区合作投稿合作事宜，帮忙进行接收社区的投稿需求，文涵一直在为社区合作工作默默作出贡献，值得点赞！'
  }
]

export default function VolunteerPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>年度优秀志愿者</h1>
          <p className={styles.subtitle}>
            致敬那些为开源社区无私奉献的优秀志愿者们，他们的付出推动着开源精神的传承与发展
          </p>
        </div>

        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{volunteers.length}</div>
            <div className={styles.statLabel}>优秀志愿者</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>2024</div>
            <div className={styles.statLabel}>年度表彰</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>∞</div>
            <div className={styles.statLabel}>开源精神</div>
          </div>
        </div>

        <div className={styles.volunteersSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>志愿者风采</h2>
            <p className={styles.sectionDescription}>每一份贡献都值得被铭记</p>
          </div>

          <div className={styles.volunteersGrid}>
            {volunteers.map((volunteer, index) => (
              <VolunteerProfile
                key={index}
                name={volunteer.name}
                nickname={volunteer.nickname}
                avatar={volunteer.avatar}
                recommendation={volunteer.recommendation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
