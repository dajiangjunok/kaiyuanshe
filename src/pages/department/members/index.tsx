import React from 'react'
import { members } from '@/data/members'
import { Member } from '@/types/member'
import styles from './index.module.css'

export default function MembersPage() {
  const renderMember = (member: Member, index: number) => {
    return (
      <div key={index} className={styles.memberCard}>
        <div className={styles.avatar}>
          <img src="/img/cblecker.png" alt={member.name} />
        </div>
        <div className={styles.name}>
          {member.name}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>正式成员</h1>
        <h2 className={styles.englishTitle}>FORMAL MEMBERS</h2>
        <p className={styles.description}>
          开源社正式成员是认同开源社理念，积极参与开源社活动的个人。
        </p>
      </div>

      <div className={styles.membersGrid}>
        {members.map((member, index) => renderMember(member, index))}
      </div>
    </div>
  )
}