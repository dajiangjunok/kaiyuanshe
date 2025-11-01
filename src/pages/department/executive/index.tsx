import React, { useState } from 'react'
import BoardMembers from '@/components/board/BoardMembers'
import BoardMemberDetail from '@/components/board/BoardMemberDetail'
import { PersonCardProps } from '@/components/board/PersonCard'
import styles from './index.module.css'

const executiveMembers: PersonCardProps[] = [
  {
    name: '庄表伟',
    pronouns: 'He/Him',
    title: '执行委员会主席',
    organization: '开源社',
    avatar: '/img/cblecker.png',
    twitter: 'https://twitter.com/zhuangbiaowei',
    github: 'https://github.com/zhuangbiaowei',
    bio: '庄表伟是开源社的创始人之一，长期致力于开源技术的推广和社区建设。',
    details: [
      '开源社创始人，在开源社区运营和开源文化传播方面拥有丰富经验。',
      '多年来一直活跃在开源技术领域，参与多个开源项目的发展和推广。',
      '致力于推动中国开源生态的发展，促进开源技术在企业中的应用。',
      '在开源治理、社区建设、开源商业化等方面具有深刻见解。'
    ]
  },
  {
    name: '李明',
    pronouns: 'He/Him',
    title: '执行委员',
    organization: '华为技术',
    avatar: '/img/cblecker.png',
    twitter: 'https://twitter.com/liming',
    github: 'https://github.com/liming'
  },
  {
    name: '王丽',
    pronouns: 'She/Her',
    title: '执行委员',
    organization: '阿里巴巴',
    avatar: '/img/cblecker.png',
    twitter: 'https://twitter.com/wangli',
    github: 'https://github.com/wangli'
  },
  {
    name: '张伟',
    pronouns: 'He/Him',
    title: '执行委员',
    organization: '腾讯科技',
    avatar: '/img/cblecker.png',
    twitter: 'https://twitter.com/zhangwei',
    github: 'https://github.com/zhangwei'
  },
  {
    name: '刘芳',
    pronouns: 'She/Her',
    title: '执行委员',
    organization: '百度公司',
    avatar: '/img/cblecker.png',
    twitter: 'https://twitter.com/liufang',
    github: 'https://github.com/liufang'
  },
  {
    name: '陈军',
    pronouns: 'He/Him',
    title: '执行委员',
    organization: '字节跳动',
    avatar: '/img/cblecker.png',
    twitter: 'https://twitter.com/chenjun',
    github: 'https://github.com/chenjun'
  }
]

export default function ExecutivePage() {
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

  // Add click handlers to executive members
  const membersWithClickHandlers = executiveMembers.map(member => ({
    ...member,
    onDetailClick: () => handleMemberClick(member)
  }))

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>执行委员会</h1>
        <h2 className={styles.englishTitle}>EXECUTIVE COMMITTEE</h2>

        <div className={styles.description}>
          <p className={styles.intro}>
            开源社执行委员会是开源社日常执行与办事机构，实行执行长负责制。内设执行长一名，副执行长、工作组组长和副组长若干，每届任期一年。执行长对理事会负责。副执行长、工作组组长和副组长由执行长提名。。
          </p>

          <p className={styles.details}>
            <p>执行委员会可行使如下职权：</p>
            <p>（一）执行理事会决议，全权负责开源社日常事务；</p>
            <p>（二）负责向理事会作年度工作总结报告，编制年度工作计划、财务预算和决算方案；
            </p>
            <p>（三）负责受理加入开源社的申请，对其资格进行审查；</p>
            <p>（四）负责开源社正式成员的协调工作。</p>
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
