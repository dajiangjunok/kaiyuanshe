import React from 'react';
import { Modal } from 'antd';
import { X, Mail } from 'lucide-react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiWechat } from 'react-icons/si';
import Image from 'next/image';
import { PersonCardProps } from './PersonCard';
import styles from './BoardMemberDetail.module.css';

export interface BoardMemberDetailProps {
  member: PersonCardProps | null;
  visible: boolean;
  onClose: () => void;
}

export default function BoardMemberDetail({
  member,
  visible,
  onClose,
}: BoardMemberDetailProps) {
  if (!member) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className={styles.modal}
      closeIcon={<X size={24} />}
      centered
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.avatarSection}>
            <Image
              src={member.avatar}
              alt={`${member.name} avatar`}
              width={200}
              height={200}
              className={styles.avatar}
            />
          </div>
          
          <div className={styles.basicInfo}>
            <div className={styles.nameSection}>
              <h2 className={styles.name}>{member.name}</h2>
              {member.pronouns && (
                <span className={styles.pronouns}>({member.pronouns})</span>
              )}
            </div>
            
            <div className={styles.organization}>{member.organization}</div>
            
            {/* Social Links */}
            <div className={styles.socialLinks}>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className={styles.socialLink}
                  title="Email"
                >
                  <Mail size={24} />
                </a>
              )}
              {member.wechat && (
                <a
                  href={member.wechat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title="WeChat"
                >
                  <SiWechat size={24} />
                </a>
              )}
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title="Twitter"
                >
                  <FaTwitter size={24} />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title="GitHub"
                >
                  <FaGithub size={24} />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {member.bio && (
            <div className={styles.bioSection}>
              <p className={styles.bio}>{member.bio}</p>
            </div>
          )}
          
          {member.details && member.details.length > 0 && (
            <div className={styles.detailsSection}>
              {member.details.map((detail, index) => (
                <p key={index} className={styles.detail}>
                  {detail}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}