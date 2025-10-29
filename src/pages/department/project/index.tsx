import React, { useState } from "react"
import BoardMembers from "@/components/board/BoardMembers"
import BoardMemberDetail from "@/components/board/BoardMemberDetail"
import { PersonCardProps } from "@/components/board/PersonCard"
import styles from "./index.module.css"

const projectMembers: PersonCardProps[] = [
    {
        name: "孙志岗",
        pronouns: "He/Him",
        title: "项目委员会主席",
        organization: "开源项目基金会",
        avatar: "/img/cblecker.png",
        twitter: "https://twitter.com/sunzhigang",
        github: "https://github.com/sunzhigang",
        bio: "孙志岗是开源项目管理和技术架构方面的专家，具有丰富的大型开源项目经验。",
        details: [
            "拥有超过15年的开源项目开发和管理经验，主导过多个重要开源项目的设计和实施。",
            "在项目治理、技术路线规划、社区协作等方面具有深刻理解和丰富实践。",
            "积极推动开源项目的标准化和规范化，促进项目的可持续发展。",
            "致力于培养开源项目维护者和贡献者，建设健康的开源项目生态。"
        ]
    },
    {
        name: "徐雷",
        pronouns: "He/Him",
        title: "技术项目负责人",
        organization: "云原生基金会",
        avatar: "/img/cblecker.png",
        twitter: "https://twitter.com/xulei",
        github: "https://github.com/xulei"
    },
    {
        name: "马晓",
        pronouns: "She/Her",
        title: "社区项目负责人",
        organization: "Apache基金会",
        avatar: "/img/cblecker.png",
        twitter: "https://twitter.com/maxiao",
        github: "https://github.com/maxiao"
    },
    {
        name: "林强",
        pronouns: "He/Him",
        title: "基础设施项目负责人",
        organization: "Linux基金会",
        avatar: "/img/cblecker.png",
        twitter: "https://twitter.com/linqiang",
        github: "https://github.com/linqiang"
    },
    {
        name: "胡敏",
        pronouns: "She/Her",
        title: "教育项目负责人",
        organization: "开源教育联盟",
        avatar: "/img/cblecker.png",
        twitter: "https://twitter.com/humin",
        github: "https://github.com/humin"
    },
    {
        name: "黄涛",
        pronouns: "He/Him",
        title: "研究项目负责人",
        organization: "开源研究中心",
        avatar: "/img/cblecker.png",
        twitter: "https://twitter.com/huangtao",
        github: "https://github.com/huangtao"
    }
];

export default function ProjectPage() {
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

    // Add click handlers to project members
    const membersWithClickHandlers = projectMembers.map(member => ({
        ...member,
        onDetailClick: () => handleMemberClick(member)
    }));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.mainTitle}>项目委员会</h1>
                <h2 className={styles.englishTitle}>PROJECT COMMITTEE</h2>
                
                <div className={styles.description}>
                    <p className={styles.intro}>
                        开源社项目委员会负责监督和管理开源社支持的各类开源项目，推动项目的健康发展。
                    </p>
                    
                    <p className={styles.details}>
                        项目委员会致力于为开源项目提供技术指导、资源支持和社区建设帮助。委员会成员都是在开源项目管理和技术发展方面具有丰富经验的专家，帮助项目制定技术路线图，建立健全的治理结构，培养活跃的开发者社区。
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