import React, { useState } from "react"
import BoardMembers from "@/components/board/BoardMembers"
import BoardMemberDetail from "@/components/board/BoardMemberDetail"
import { PersonCardProps } from "@/components/board/PersonCard"
import styles from "./index.module.css"

const advisoryMembers: PersonCardProps[] = [
    {
        name: "张三",
        pronouns: "He/Him",
        title: "顾问委员会主席",
        organization: "开源基金会",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/zhangsan",
        github: "https://github.com/zhangsan",
        bio: "张三是开源技术领域的资深专家，在开源软件开发和社区建设方面拥有丰富经验。",
        details: [
            "拥有超过15年的开源软件开发经验，主导过多个重要开源项目的发展。",
            "在开源社区治理和生态建设方面具有深刻洞察，帮助多家企业制定开源战略。",
            "积极推动开源技术在企业中的应用和落地，促进开源文化的传播。"
        ]
    },
    {
        name: "李四",
        pronouns: "She/Her",
        title: "技术顾问",
        organization: "云原生联盟",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/lisi",
        github: "https://github.com/lisi"
    },
    {
        name: "王五",
        pronouns: "He/Him",
        title: "战略顾问",
        organization: "开源研究院",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/wangwu",
        github: "https://github.com/wangwu"
    },
    {
        name: "赵六",
        pronouns: "She/Her",
        title: "产业顾问",
        organization: "科技公司",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/zhaoliu",
        github: "https://github.com/zhaoliu"
    },
    {
        name: "钱七",
        pronouns: "He/Him",
        title: "学术顾问",
        organization: "清华大学",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/qianqi",
        github: "https://github.com/qianqi"
    },
    {
        name: "孙八",
        pronouns: "She/Her",
        title: "国际顾问",
        organization: "Linux基金会",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/sunba",
        github: "https://github.com/sunba"
    }
];

export default function AdvisoryPage() {
    const [selectedMember, setSelectedMember] = useState<PersonCardProps | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleMemberClick = (member: PersonCardProps) => {
        setSelectedMember(member);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedMember(null);
    };

    // Add click handlers to advisory members
    const membersWithClickHandlers = advisoryMembers.map(member => ({
        ...member,
        onDetailClick: () => handleMemberClick(member)
    }));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.mainTitle}>顾问委员会</h1>
                <h2 className={styles.englishTitle}>ADVISORY COMMITTEE</h2>
                
                <div className={styles.description}>
                    <p className={styles.intro}>
                        开源社顾问委员会成立于2018年，汇聚了来自全球顶尖开源基金会、标志性开源项目社区、知名风险投资机构、一流高等院校与科研机构、权威科技媒体，以及头部互联网企业开源战略部门的资深专家与行业领袖。
                    </p>
                    
                    <p className={styles.details}>
                        委员会以推动开源生态高质量发展为使命，致力于构建开放、协同、可持续的全球开源创新网络。
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