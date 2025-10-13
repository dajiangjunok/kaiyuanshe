import React from 'react';
import { Card } from 'antd';
import { Twitter, Github } from 'lucide-react';
import { SiWechat } from 'react-icons/si';
import Image from 'next/image';
import styles from './PersonCard.module.css';

export interface PersonCardProps {
  name: string;
  pronouns?: string;
  title: string;
  organization: string;
  avatar: string;
  wechat?: string;
  twitter?: string;
  github?: string;
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
}: PersonCardProps) {
  return (
    <Card className={styles.personCard}  bodyStyle={{ padding: 0 }} hoverable>
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

        {/* Person Info */}
        <div className={styles.personInfo}>
          <h3 className={styles.name}>{name}</h3>
          {pronouns && <span className={styles.pronouns}>({pronouns})</span>}
          <p className={styles.title}>{title}</p>
        </div>

        {/* Social Links */}
        <div className={styles.socialLinks}>
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
              <Twitter size={20} />
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
              <Github size={20} />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}