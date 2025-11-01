import React from 'react'
import { Card } from 'antd'
import { FaTwitter, FaGithub } from 'react-icons/fa'
import { SiWechat } from 'react-icons/si'
import Image from 'next/image'
import styles from './PersonCard.module.css'

export interface PersonCardProps {
  name: string
  pronouns?: string
  title: string
  organization: string
  avatar: string
  wechat?: string
  twitter?: string
  github?: string
  email?:string
  bio?: string
  details?: string[]
  onDetailClick?: () => void
  role?: 'leader' | 'member' | 'secretary' | 'treasurer'
  tags?: string[]
  group?: string
}

export default function PersonCard({
  name,
  pronouns,
  title,
  organization,
  avatar,
  wechat,
  twitter,
  github,
  onDetailClick,
  role,
  tags
}: PersonCardProps) {
  return (
    <Card
      className={styles.personCard}
      bodyStyle={{ padding: 0 }}
      hoverable
      onClick={onDetailClick}
      style={{ cursor: onDetailClick ? 'pointer' : 'default' }}
    >
      <div className={styles.cardContent}>
        {/* Avatar */}
        <div className={styles.avatarContainer}>
          <Image
            src={avatar}
            alt={`${name} avatar`}
            fill
            className={styles.avatar}
            priority
          />
        </div>

        {/* Person Info */}
        <div className={styles.personInfo}>
          <h3 className={styles.name}>{name}</h3>
          <span className={`${styles.pronouns} ${!pronouns ? styles.empty : ''}`}>
            {pronouns ? `(${pronouns})` : ''}
          </span>

          <p className={styles.title}>{title}</p>

          {tags && tags.length > 0 && (
            <div className={styles.tagsContainer}>
              {tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className={styles.socialLinks}>
          {role && (
            <div className={styles.roleContainer}>
              <span className={`${styles.roleBadge} ${styles[role]}`}>
                {role === 'leader' && '组长'}
                {role === 'member' && '组员'}
                {role === 'secretary' && '秘书'}
                {role === 'treasurer' && '财务'}
              </span>
            </div>
          )}
          {wechat && (
            <a
              href={wechat}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="WeChat"
            >
              <SiWechat size={20} />
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="Twitter"
            >
              <FaTwitter size={20} />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="GitHub"
            >
              <FaGithub size={20} />
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}
