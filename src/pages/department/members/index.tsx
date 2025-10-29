import React, { useState } from "react"
import GroupedMembers from "@/components/board/GroupedMembers"
import BoardMemberDetail from "@/components/board/BoardMemberDetail"
import { PersonCardProps } from "@/components/board/PersonCard"
import styles from "./index.module.css"

const formalMembers: PersonCardProps[] = [
    {
        name: "张三",
        pronouns: "He/Him",
        title: "技术委员会主席",
        organization: "开源社",
        avatar: "/img/cblecker.png",
        twitter: "https://twitter.com/example",
        github: "https://github.com/example",
        bio: "张三是开源社技术委员会主席，负责开源社的技术发展方向和决策。",
        details: [
            "拥有10年以上的开源项目经验，主导了多个知名开源项目的开发。",
            "在云原生技术、容器化、微服务架构等领域有深入研究。",
            "积极推动开源文化在中国的发展和普及。"
        ],
        role: "leader",
        tags: ["技术专家", "云原生", "容器化"],
        group: "技术委员会"
    },
    {
        name: "李四",
        pronouns: "She/Her",
        title: "技术委员会秘书",
        organization: "开源社",
        avatar: "/img/cblecker.png",
        github: "https://github.com/example2",
        bio: "李四负责技术委员会的日常管理和协调工作。",
        role: "secretary",
        tags: ["项目管理", "协调"],
        group: "技术委员会"
    },
    {
        name: "王五",
        pronouns: "He/Him",
        title: "技术委员会成员",
        organization: "某科技公司",
        avatar: "/img/cblecker.png",
        bio: "王五是技术委员会的核心成员，专注于开源项目的技术评估。",
        role: "member",
        tags: ["技术评估", "代码审查"],
        group: "技术委员会"
    },
    {
        name: "赵六",
        pronouns: "She/Her",
        title: "市场推广部组长",
        organization: "开源社",
        avatar: "/img/cblecker.png",
        bio: "赵六负责开源社的市场推广和品牌建设。",
        role: "leader",
        tags: ["市场营销", "品牌建设", "活动策划"],
        group: "市场推广部"
    },
    {
        name: "孙七",
        pronouns: "He/Him",
        title: "市场推广部成员",
        organization: "某媒体公司",
        avatar: "/img/cblecker.png",
        bio: "孙七专注于开源社的内容营销和社区运营。",
        role: "member",
        tags: ["内容营销", "社区运营"],
        group: "市场推广部"
    },
    {
        name: "周八",
        pronouns: "They/Them",
        title: "教育培训部组长",
        organization: "开源社",
        avatar: "/img/cblecker.png",
        bio: "周八负责开源社的教育培训项目。",
        role: "leader",
        tags: ["教育培训", "课程开发"],
        group: "教育培训部"
    },
    {
        name: "吴九",
        pronouns: "She/Her",
        title: "教育培训部财务",
        organization: "开源社",
        avatar: "/img/cblecker.png",
        bio: "吴九负责教育培训部的财务管理。",
        role: "treasurer",
        tags: ["财务管理", "预算规划"],
        group: "教育培训部"
    },
    {
        name: "郑十",
        pronouns: "He/Him",
        title: "教育培训部成员",
        organization: "某大学",
        avatar: "/img/cblecker.png",
        bio: "郑十专注于开源教育课程的设计和实施。",
        role: "member",
        tags: ["课程设计", "教学"],
        group: "教育培训部"
    }
];

export default function MembersPage() {
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

    // Add click handlers to members
    const membersWithClickHandlers = formalMembers.map(member => ({
        ...member,
        onDetailClick: () => handleMemberClick(member)
    }));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.mainTitle}>正式成员</h1>
                <h2 className={styles.englishTitle}>FORMAL MEMBERS</h2>
                
                <div className={styles.description}>
                    <p className={styles.intro}>
                        开源社正式成员是推动开源社发展的核心力量，分为不同的工作组，各司其职。
                    </p>
                    
                    <p className={styles.details}>
                        每个工作组都有明确的职责分工，包括组长、秘书、财务和普通成员等角色，
                        通过协作推进开源社的各项工作。成员们都拥有专业的技能和丰富的开源经验。
                    </p>
                </div>
            </div>
            
            <GroupedMembers members={membersWithClickHandlers} title="" />
            
            <BoardMemberDetail
                member={selectedMember}
                visible={modalVisible}
                onClose={handleModalClose}
            />
        </div>
    )
}