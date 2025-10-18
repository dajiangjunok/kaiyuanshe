import React, { useState } from "react"
import BoardMembers from "@/components/board/BoardMembers"
import BoardMemberDetail from "@/components/board/BoardMemberDetail"
import { PersonCardProps } from "@/components/board/PersonCard"
import styles from "./index.module.css"

const legalMembers: PersonCardProps[] = [
    {
        name: "刘律师",
        pronouns: "He/Him",
        title: "法律咨询委员会主席",
        organization: "金杜律师事务所",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/liulawyer",
        github: "https://github.com/liulawyer",
        bio: "刘律师是知识产权和开源法律领域的专家，拥有超过20年的法律实践经验。",
        details: [
            "专精开源软件许可证、知识产权保护和合规性审查，为多家科技企业提供开源法律咨询服务。",
            "深度参与开源许可证的制定和完善工作，对GPL、Apache、MIT等主流开源许可证有深入研究。",
            "在开源软件商业化、专利风险评估、开源合规体系建设等方面具有丰富实战经验。",
            "积极参与开源法律政策的制定，推动开源生态的健康发展。"
        ]
    },
    {
        name: "陈律师",
        pronouns: "She/Her",
        title: "知识产权专家",
        organization: "君合律师事务所",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/chenlawyer",
        github: "https://github.com/chenlawyer"
    },
    {
        name: "杨律师",
        pronouns: "He/Him",
        title: "合规专家",
        organization: "中伦律师事务所",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/yanglawyer",
        github: "https://github.com/yanglawyer"
    },
    {
        name: "周律师",
        pronouns: "She/Her",
        title: "商业法律顾问",
        organization: "海问律师事务所",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/zhoulawyer",
        github: "https://github.com/zhoulawyer"
    },
    {
        name: "吴律师",
        pronouns: "He/Him",
        title: "国际法律顾问",
        organization: "通力律师事务所",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/wulawyer",
        github: "https://github.com/wulawyer"
    }
];

export default function LegalPage() {
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

    // Add click handlers to legal members
    const membersWithClickHandlers = legalMembers.map(member => ({
        ...member,
        onDetailClick: () => handleMemberClick(member)
    }));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.mainTitle}>法律咨询委员会</h1>
                <h2 className={styles.englishTitle}>LEGAL ADVISORY COMMITTEE</h2>
                
                <div className={styles.description}>
                    <p className={styles.intro}>
                        开源社法律咨询委员会由开源法律领域的专业律师组成，为开源社及其成员提供法律咨询和合规指导。
                    </p>
                    
                    <p className={styles.details}>
                        委员会专注于开源软件许可证、知识产权保护、合规性审查等法律事务，帮助开源项目和企业规避法律风险，促进开源生态的健康发展。委员会定期发布开源法律指南和最佳实践。
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