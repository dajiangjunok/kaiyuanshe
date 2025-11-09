import React, { useState } from 'react'
import BoardMembers from '@/components/board/BoardMembers'
import BoardMemberDetail from '@/components/board/BoardMemberDetail'
import { PersonCardProps } from '@/components/board/PersonCard'
import styles from './index.module.css'

const boardMembers: PersonCardProps[] = [
  {
    name: '陈阳',
    pronouns: 'Emily',
    title: '开源社 2025 届理事。',
    organization: '开源社 2025 届理事。',
    avatar: '/img/board/5.webp',
    twitter: '',
    github: '',
    linkedin: '',
    email: 'emily@kaiyuanshe.org',
    bio: '',
    details: [
      `个人简介： 2014 年发起成立开源社，也是中国开源年度报告，中国开源先锋 33 人，COSCon 中国开源年会的发起者。2004 年参与开源，曾任 GNOME 基金会 2010 董事总监，GNOME.Asia 社区创始人，Mozilla/Firfox 核心贡献者，GSoC 导师，2016 年任中国开源软件推进联盟副秘书长，开放原子开源基金会 TOC 导师。20 多年云计算和开源领域行业经验，目前在微软担任 Fabric 数据工厂首席产品经理，技术领域包括开源技术和社区治理、公有云、行业 AI 解决方案、知识图谱、Copilot、数据集成。2019 年获得美国人工智能专利一项， O'REILLY 《Beautiful Testing》联合作者。
      2025 年是开源社走过的第十一年，我也在这个社区的滋养下不断成长。开源社区的思维模式和工作方式早已融入我的日常，成为我工作与生活的重要组成部分，更是一份终身的事业。2025 年我希望能够尽自己所能回馈社区，并期待与更多开源的小伙伴携手，共同开拓有意义的事业。`
    ]
  },
  {
    name: '江波',
    pronouns: 'Nadia Jiang',
    title: '开源社 2025 届理事长',
    organization: '开源社 2025 届理事长',
    avatar: '/img/board/1.webp',
    twitter: '',
    github: '',
    linkedin: '',
    email: 'jiangbo@kaiyuanshe.org',
    bio: '',
    details: [
      '个人简介：蚂蚁集团开源技术增长 & 国际化负责人，Apache 软件基金会正式成员，历任开源社理事长、副理事长、执行长、副执行长，关注开源社社区发展和国际接轨的使命，曾代表开源社参与 Open Source Congress、DevRelCon London、OpenUK State of Open Con、FOSSAsia 等国际社区活动并发表演讲。江波是多届 COSCon 中国开源年会的核心组织者、Keynote 出品人，COSCon 24 的总召集人，联合发起了 SegmentFault 思否 x 开源社 “中国开源先锋 33 人” 年度评选；连续多年参与《中国开源年度报告》开源大事记撰写、问卷推广、图文设计等工作。除在开源社贡献外，江波还在 ALC Beijing、中国计算机学会、中国通信学会等组织贡献，是 ApacheCon Asia、OpenInfra Days China、OSCAR 开源产业大会的核心组织者，OSPO Summit、Dev.Together 开发者生态峰会的联合发起人。加入蚂蚁集团前，江波曾任 SegmentFault 思否 COO。'
    ]
  },
  {
    name: '李明康',
    pronouns: '李小明',
    title: '开源社 2025 届理事',
    organization: '开源社 2025 届理事',
    avatar: '/img/board/6.webp',
    twitter: '',
    github: '',
    linkedin: '',
    email: 'slibre@kaiyuanshe.org',
    bio: '',
    details: [
      '个人简介：历任开源社社区合作组组长、顾问委员会秘书、项目委员会成员、理事等职，主要负责开源社社区发展与合作、中国开源地图项目、顾问委员会和开源战略研究，是多届中国开源年会 COSCon 组委会核心成员，参与中国开源年度报告、中国开源发展蓝皮书、开源战略动态月报等开源报告编写工作。目前关注开源教育、开发者关系、开源运营和 OSPO，担任开放原子开源基金会教培顾问，李明康同时也在多个开源社区活跃贡献，是软件工程师、“明说开源”主理人、Linux 基金会亚太区开源布道者、Apache 软件基金会 Local Community Shanghai Member、中国计算机学会开源发展委员会执行委员、AWS User Group Leader、OSPO Summit 筹备组成员。曾在多个知名开源峰会上担任分论坛出品人、主持人和发表演讲，获中国开源先锋 33 人、LF 开源软件学园开源明星奖、社区合作之星等荣誉。'
    ]
  },

  {
    name: '梁尧',
    pronouns: 'Leon',
    title: '开源社 2025 届理事、执行委员会执行长。',
    organization: '开源社 2025 届理事、执行委员会执行长。',
    avatar: '/img/board/4.webp',
    twitter: '',
    github: '',
    linkedin: '',
    email: 'ly@kaiyuanshe.org',
    bio: '',
    details: [
      '个人简介：2016 年加入开源社，2018 年起参与中国开源年会（COSCon）组委会，2020 年起担任开源社理事，2024 年度开源社副理事长，在开源社主要负责开源治理、开源创新、开源硬件等工作，发起“OpenGood 开源公益” 计划并获选“中国开放科学优秀行动”。在多个开源社区/组织中持续进行贡献，同时也是 OpenSDV 生态运营副总监，中国计算机学会开源发展委员会执委，中国电子标准院木兰开源社区知识产权委员会委员，获选“中国开源先锋 33 人”。曾参与中国开源年度报告、中国开源发展蓝皮书、木兰系列开源许可证、开放原子开放硬件许可证、中国信通院开源相关报告标准等的编写，担任中国“开源创新榜”评委。获聘上海技术交易所、深圳知识产权局以及广东、广州、珠海、海南、黑龙江等多个地区/组织机构专家，是多件中、美授权发明专利第一发明人。致力于推动科技 & 社会开放式创新生态的发展，目前主要关注具身智能（汽车&机器人）领域。'
    ]
  },
  {
    name: '林旅强',
    pronouns: 'Richard',
    title: '开源社 2025 届副理事长',
    organization: '开源社 2025 届副理事长',
    avatar: '/img/board/2.webp',
    twitter: '',
    github: '',
    linkedin: '',
    email: 'richard@kaiyuanshe.org',
    bio: '',
    details: [
      '个人简介：林旅强，开源社联合创始人 （2014-），RTE （实时互动） 开发者社区联合主理人 （2024-），拥有 15 年以上行业经验，专注 AI、Web3、toD 产品增长及开发者生态建设，擅长连接技术与商业，推动技术社区与开发者生态发展。曾领导华为、01.AI 等企业的 AI 产品开发者生态体系建设，现为独立顾问，为上市公司、投资机构、基金会及技术社区提供战略咨询，助力生态建设、产品增长与技术推广。作为全球技术大会的活跃讲者，林旅强曾在 O’Reilly OSCON、LinuxCon、FOSDEM、OpenUK SOOCon、FOSSAsia、DevRelCon、COSCon、COSCUP 等发表演讲，并担任 Datawhale、OpenBuild.xyz、天工开物开源基金会及 OSCAR 等组织的专家顾问。译有《开发者关系：方法与实践》（2023） 及《开源项目成功之道》（2025）。'
    ]
  },
  {
    name: '许银',
    pronouns: 'Ian',
    title: '开源社 2025 届理事',
    organization: '开源社 2025 届理事',
    avatar: '/img/board/7.webp',
    twitter: '',
    github: '',
    linkedin: '',
    email: 'xuyin@kaiyuanshe.org',
    bio: '',
    details: [
      '个人简介：OpenBuild 开发者社区发起人，17 年加入开源社，担任过活动组组长，开源社副执行长等职，成功负责多届开源年会的落地执行。长期活跃于开源社区，参与社区贡献，曾获 开源先锋 33 人，开源之星 等殊荣。目前是 PyChina， RustCC 社区组委会成员，ALC Beijing Member。'
    ]
  },
  {
    name: '庄表伟',
    pronouns: '',
    title: '开源社 2025 届理事、项目委员会主席',
    organization: '开源社 2025 届理事、项目委员会主席',
    avatar: '/img/board/3.webp',
    twitter: '',
    github: '',
    linkedin: '',
    email: 'zbw@kaiyuanshe.org',
    bio: '',
    details: [
      '个人简介：1997 年毕业于华东师范大学，曾任盛大创新院的高级研究员，华为内源平台架构师，开源治理专家。目前就职于重庆天工开物开源基金会，担任执行副秘书长。2015 年起加入开源社，担任过理事、执行长、理事长等职务。长期活跃于开源社区，积极参与社区的各项活动，曾在多种技术、开源大会上发表演讲，曾著有《开源思索集》一书。'
    ]
  }
]

export default function BoardPage() {
  const [selectedMember, setSelectedMember] = useState<PersonCardProps | null>(
    null
  )
  const [modalVisible, setModalVisible] = useState(false)

  const handleMemberClick = (member: PersonCardProps) => {
    setSelectedMember(member)
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setSelectedMember(null)
  }

  // Add click handlers to board members
  const membersWithClickHandlers = boardMembers.map(member => ({
    ...member,
    onDetailClick: () => handleMemberClick(member)
  }))

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>理事会</h1>
        <h2 className={styles.englishTitle}>GOVERNING BOARD</h2>

        <div className={styles.description}>
          <p className={styles.intro}>开源社理事会（GB）（按姓氏排序）</p>

          <p className={styles.details}>
            展望未来，我们相信在新一届理事会的领导下，开源社将继续围绕“开源治理、社区发展、国际接轨、项目孵化”四大使命，立足中国、贡献全球，为推动开源成为新时代的生活方式而不懈努力。
          </p>
        </div>
      </div>

      <BoardMembers members={membersWithClickHandlers} title="" />

      <BoardMemberDetail
        member={selectedMember}
        visible={modalVisible}
        onClose={handleModalClose}
      />
    </div>
  )
}
