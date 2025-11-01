import React, { useState } from 'react'
import BoardMembers from '@/components/board/BoardMembers'
import BoardMemberDetail from '@/components/board/BoardMemberDetail'
import { PersonCardProps } from '@/components/board/PersonCard'
import styles from './index.module.css'

const projectMembers: PersonCardProps[] = [
  {
    name: '庄表伟',
    pronouns: '',
    title: '项目委员会主席',
    organization: '开源社 2025 届理事、项目委员会主席',
    avatar: '/img/board/3.webp',
    twitter: '',
    github: '',
    email: 'zbw@kaiyuanshe.org',
    bio: '',
    details: [
      '个人简介：1997 年毕业于华东师范大学，曾任盛大创新院的高级研究员，华为内源平台架构师，开源治理专家。目前就职于重庆天工开物开源基金会，担任执行副秘书长。2015 年起加入开源社，担任过理事、执行长、理事长等职务。长期活跃于开源社区，积极参与社区的各项活动，曾在多种技术、开源大会上发表演讲，曾著有《开源思索集》一书。'
    ]
  },
  {
    name: '刘天栋',
    pronouns: '',
    title: '委员',
    organization: '',
    avatar: '/img/cblecker.png',
    twitter: '',
    github: ''
  },
  {
    name: '李明康',
    pronouns: '李小明',
    title: '委员',
    organization: '开源社 2025 届理事',
    avatar: '/img/board/6.webp',
    twitter: '',
    github: '',
    email: 'slibre@kaiyuanshe.org',
    bio: '',
    details: [
      '个人简介：历任开源社社区合作组组长、顾问委员会秘书、项目委员会成员、理事等职，主要负责开源社社区发展与合作、中国开源地图项目、顾问委员会和开源战略研究，是多届中国开源年会 COSCon 组委会核心成员，参与中国开源年度报告、中国开源发展蓝皮书、开源战略动态月报等开源报告编写工作。目前关注开源教育、开发者关系、开源运营和 OSPO，担任开放原子开源基金会教培顾问，李明康同时也在多个开源社区活跃贡献，是软件工程师、“明说开源”主理人、Linux 基金会亚太区开源布道者、Apache 软件基金会 Local Community Shanghai Member、中国计算机学会开源发展委员会执行委员、AWS User Group Leader、OSPO Summit 筹备组成员。曾在多个知名开源峰会上担任分论坛出品人、主持人和发表演讲，获中国开源先锋 33 人、LF 开源软件学园开源明星奖、社区合作之星等荣誉。'
    ]
  },
  {
    name: '许银',
    pronouns: 'Ian',
    title: '委员',
    organization: '开源社 2025 届理事',
    avatar: '/img/board/7.webp',
    twitter: '',
    github: '',
    email: 'xuyin@kaiyuanshe.org',
    bio: '',
    details: [
      '个人简介：OpenBuild 开发者社区发起人，17 年加入开源社，担任过活动组组长，开源社副执行长等职，成功负责多届开源年会的落地执行。长期活跃于开源社区，参与社区贡献，曾获 开源先锋 33 人，开源之星 等殊荣。目前是 PyChina， RustCC 社区组委会成员，ALC Beijing Member。'
    ]
  },
  {
    name: '郭浩赟',
    pronouns: '',
    title: '委员',
    organization: '',
    avatar: '/img/cblecker.png',
    twitter: '',
    github: ''
  },
  {
    name: '吴京京',
    pronouns: '',
    title: '委员',
    organization: '',
    avatar: '/img/cblecker.png',
    twitter: '',
    github: ''
  },
  {
    name: '王伟',
    pronouns: '',
    title: '委员',
    organization: '',
    avatar: '/img/cblecker.png',
    twitter: '',
    github: ''
  }
]

export default function ProjectPage() {
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

  // Add click handlers to project members
  const membersWithClickHandlers = projectMembers.map(member => ({
    ...member,
    onDetailClick: () => handleMemberClick(member)
  }))

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>项目委员会</h1>
        <h2 className={styles.englishTitle}>PROJECT COMMITTEE</h2>

        <div className={styles.description}>
          <p className={styles.intro}>
            开源社项目委员会负责监督和管理开源社支持的各类开源项目，推动项目的健康发展。
          </p>

          <p className={styles.details}>
            项目委员会致力于为开源项目提供技术指导、资源支持和社区建设帮助。委员会成员都是在开源项目管理和技术发展方面具有丰富经验的专家，帮助项目制定技术路线图，建立健全的治理结构，培养活跃的开发者社区。
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
