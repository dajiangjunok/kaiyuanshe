import React from 'react';
import { Row, Col, Divider } from 'antd';
import PersonCard, { PersonCardProps } from './PersonCard';
import styles from './GroupedMembers.module.css';

export interface GroupedMembersProps {
  members: PersonCardProps[];
  title?: string;
}

export default function GroupedMembers({ members, title = "正式成员" }: GroupedMembersProps) {
  // 按组分组成员
  const groupedMembers = members.reduce((groups, member) => {
    const group = member.group || '未分组';
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(member);
    return groups;
  }, {} as Record<string, PersonCardProps[]>);

  // 为每个组内的成员按角色排序
  const sortMembersByRole = (members: PersonCardProps[]) => {
    const roleOrder = { leader: 0, secretary: 1, treasurer: 2, member: 3 };
    return members.sort((a, b) => {
      const roleA = a.role || 'member';
      const roleB = b.role || 'member';
      return (roleOrder[roleA] || 3) - (roleOrder[roleB] || 3);
    });
  };

  return (
    <div className={styles.groupedMembers}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        
        {Object.entries(groupedMembers).map(([groupName, groupMembers]) => (
          <div key={groupName} className={styles.groupSection}>
            <Divider orientation="left" className={styles.groupDivider}>
              <h3 className={styles.groupTitle}>{groupName}</h3>
            </Divider>
            
            <Row gutter={[24, 32]} style={{ justifyContent: 'flex-start' }}>
              {sortMembersByRole(groupMembers).map((member, index) => (
                <Col
                  key={`${groupName}-${index}`}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={6}
                >
                  <PersonCard {...member} />
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
}