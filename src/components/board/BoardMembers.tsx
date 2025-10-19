import React from 'react';
import { Row, Col } from 'antd';
import PersonCard, { PersonCardProps } from './PersonCard';
import styles from './BoardMembers.module.css';

export interface BoardMembersProps {
  members: PersonCardProps[];
  title?: string;
}

export default function BoardMembers({ members, title = "理事会成员" }: BoardMembersProps) {
  return (
    <div className={styles.boardMembers}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <Row gutter={[24, 32]} style={{ justifyContent: 'flex-start' }}>
          {members.map((member, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={8}
              lg={6}
              xl={6}
            >
              <PersonCard {...member} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}