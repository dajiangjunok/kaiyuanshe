import React, { useState } from 'react'
import { Card, Modal } from 'antd'
import Image from 'next/image'
import styles from './VolunteerProfile.module.css'

export interface VolunteerProfileProps {
  name: string
  nickname?: string
  avatar: string
  recommendation: string
}

export default function VolunteerProfile({
  name,
  nickname,
  avatar,
  recommendation
}: VolunteerProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const displayText = recommendation.length > 120 
    ? recommendation.slice(0, 120) + '...' 
    : recommendation

  return (
    <>
      <Card 
        className={styles.volunteerCard} 
        styles={{ body: { padding: 0 } }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className={styles.cardContent}>
          {/* Avatar */}
          <div className={styles.avatarContainer}>
            <Image
              src={avatar}
              alt={`${name} avatar`}
              width={120}
              height={120}
              className={styles.avatar}
            />
          </div>

          {/* Volunteer Info */}
          <div className={styles.volunteerInfo}>
            <h3 className={styles.name}>{name}</h3>
            {nickname && <span className={styles.nickname}>（{nickname}）</span>}
            
            <div className={styles.recommendation}>
              <div className={styles.recommendationContent}>
                <p>{displayText}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* 详情弹窗 */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
        centered
        className={styles.detailModal}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.modalAvatarContainer}>
              <Image
                src={avatar}
                alt={`${name} avatar`}
                width={120}
                height={120}
                className={styles.modalAvatar}
              />
            </div>
            <div className={styles.modalUserInfo}>
              <h3 className={styles.modalName}>{name}</h3>
              {nickname && <span className={styles.modalNickname}>（{nickname}）</span>}
            </div>
          </div>
          
          <div className={styles.modalRecommendation}>
            <div className={styles.modalRecommendationHeader}>
              <span className={styles.modalRecommendationTitle}>推荐语</span>
            </div>
            <div className={styles.modalRecommendationContent}>
              <p>{recommendation}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}