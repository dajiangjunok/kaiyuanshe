import React, { useState } from 'react'
import BoardMembers from '@/components/board/BoardMembers'
import BoardMemberDetail from '@/components/board/BoardMemberDetail'
import { PersonCardProps } from '@/components/board/PersonCard'
import styles from './index.module.css'

const legalMembers: PersonCardProps[] = [
  {
    name: '王东芳',
    pronouns: '',
    title: '顾问',
    organization: '',
    avatar: 'https://res.cloudinary.com/dqaizhakm/image/upload/v1761756615/wangdongfang_wv8jn3.jpg',
    email: 'wangdongfang@kaiyuanshe.org',
    github: 'https://github.com/kaiyuanshe',
    bio: '',
    details: []
  },
  {
    name: '薛亮',
    pronouns: '',
    title: '顾问',
    organization: '',
    avatar: 'https://res.cloudinary.com/dqaizhakm/image/upload/v1761757302/xueliang_btsujt.jpg',
    email: 'liang.xue@kaiyuanshe.org',
    github: 'https://github.com/chenlawyer'
  },
  {
    name: '张楚霞',
    pronouns: '',
    title: '顾问',
    organization: '',
    avatar: 'https://res.cloudinary.com/dqaizhakm/image/upload/v1761757707/zhangjunxia_batqow.png',
    email: '',
    github: 'https://github.com/chenlawyer'
  },
  {
    name: '董振伟',
    pronouns: 'She/Her',
    title: '顾问',
    organization: '',
    avatar: '/img/cblecker.png',
    email: '',
    github: 'https://github.com/chenlawyer'
  },
  {
    name: '郭雪',
    pronouns: '',
    title: '顾问',
    organization: '',
    avatar: 'https://res.cloudinary.com/dqaizhakm/image/upload/v1761756613/guoxue_rjww2k.png',
    email: '',
    github: 'https://github.com/chenlawyer'
  },
  {
    name: '黄鸿文',
    pronouns: '',
    title: '顾问',
    organization: '',
    avatar: 'https://res.cloudinary.com/dqaizhakm/image/upload/v1761756609/huanghongwen_qidhti.jpg',
    github: 'https://github.com/chenlawyer'
  },
  {
    name: '梁尧',
    pronouns: '',
    title: '顾问',
    organization: '',
    avatar: 'https://res.cloudinary.com/dqaizhakm/image/upload/v1761756605/liangyao_umahwn.jpg',
    email: '',
    github: 'https://github.com/chenlawyer'
  },
  {
    name: '林旅强',
    pronouns: '',
    title: '正式成员',
    organization: '',
    avatar: 'https://res.cloudinary.com/dqaizhakm/image/upload/v1761756604/linlvqiang_tmo4bq.jpg',
    email: '',
    github: 'https://github.com/chenlawyer'
  }
]

export default function LegalPage() {
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

  // Add click handlers to legal members
  const membersWithClickHandlers = legalMembers.map(member => ({
    ...member,
    onDetailClick: () => handleMemberClick(member)
  }))

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>法律咨询委员会</h1>
        <h2 className={styles.englishTitle}>LEGAL ADVISORY COMMITTEE</h2>

        <div className={styles.description}>
          <p className={styles.intro}>
            开源社法律咨询委员会
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
