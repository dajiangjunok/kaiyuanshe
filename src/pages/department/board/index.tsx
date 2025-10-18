import React, { useState } from "react"
import BoardMembers from "@/components/board/BoardMembers"
import BoardMemberDetail from "@/components/board/BoardMemberDetail"
import { PersonCardProps } from "@/components/board/PersonCard"
import styles from "./index.module.css"

const boardMembers: PersonCardProps[] = [
    {
        name: "Alan Flower",
        pronouns: "He/Him",
        title: "GB Chair, Cloud Native & AI Labs",
        organization: "HCLTech",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/tophee",
        github: "https://github.com/christophblecker",
        bio: "Alan heads the HCL Cloud Native & AI Labs business and is also the HCL CTO for Cloud Native. A successful entrepreneur and technologist, Alan is deeply passionate about using technology to support the digital transformation of business and driving the creation of innovative products and services.",
        details: [
            "Alan has an extensive track record as both a visionary and thought leader. He combines in-depth engineering credibility with real hands-on experience leading global technology organizations. With a track record of bringing over 250 software products to market, Alan has a unique perspective on the application of modern Cloud-enabled services to accelerate market success.",
            "HCL Cloud Native & AI Labs are the HCL Centre of Excellence, helping clients leverage modern technologies and practices to accelerate transformation.",
            "Working closely with HCL ecosystem partners, the Labs showcase the Art-of-the-Possible, and with a track record of over 1,000 engagements, the Labs are uniquely positioned to guide our clients' complete journey.",
            "The Labs provide engineering assistance to modernize existing applications, or to create innovative new solutions. Deeply collaborative, our Labs also provide education and skills modernization to support the cultural transformation necessary to make the vision of a Cloud Native Enterprise become a reality.",
            "Alan leads HCL corporate participation in leading open-source communities such as the Linux Foundation and the Cloud Native Computing Foundation (CNCF).",
            "He is a Fellow of both the British Computer Society and a Fellow of the Institute of Enterprise and Entrepreneurs."
        ]
    },
    {
        name: "Christoph Blecker",
        pronouns: "He/Him",
        title: "GB Chair, Kubernetes Rep",
        organization: "Red Hat",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/tophee",
        github: "https://github.com/christophblecker"
    },
    {
        name: "Christoph Blecker",
        pronouns: "He/Him",
        title: "GB Chair, Kubernetes Rep",
        organization: "Red Hat",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/tophee",
        github: "https://github.com/christophblecker"
    },
    {
        name: "Christoph Blecker",
        pronouns: "He/Him",
        title: "GB Chair, Kubernetes Rep",
        organization: "Red Hat",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/tophee",
        github: "https://github.com/christophblecker"
    },
    {
        name: "Christoph Blecker",
        pronouns: "He/Him",
        title: "GB Chair, Kubernetes Rep",
        organization: "Red Hat",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/tophee",
        github: "https://github.com/christophblecker"
    },
    {
        name: "Christoph Blecker",
        pronouns: "He/Him",
        title: "GB Chair, Kubernetes Rep",
        organization: "Red Hat",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/tophee",
        github: "https://github.com/christophblecker"
    },
    {
        name: "Christoph Blecker",
        pronouns: "He/Him",
        title: "GB Chair, Kubernetes Rep",
        organization: "Red Hat",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/tophee",
        github: "https://github.com/christophblecker"
    },
    {
        name: "Christoph Blecker",
        pronouns: "He/Him",
        title: "GB Chair, Kubernetes Rep",
        organization: "Red Hat",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/tophee",
        github: "https://github.com/christophblecker"
    },
    {
        name: "Christoph Blecker",
        pronouns: "He/Him",
        title: "GB Chair, Kubernetes Rep",
        organization: "Red Hat",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/tophee",
        github: "https://github.com/christophblecker"
    },
    {
        name: "Christoph Blecker",
        pronouns: "He/Him",
        title: "GB Chair, Kubernetes Rep",
        organization: "Red Hat",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/tophee",
        github: "https://github.com/christophblecker"
    },
    {
        name: "Christoph Blecker",
        pronouns: "He/Him",
        title: "GB Chair, Kubernetes Rep",
        organization: "Red Hat",
        avatar: "/img/cblecker.jpeg",
        twitter: "https://twitter.com/tophee",
        github: "https://github.com/christophblecker"
    },
    // 可以添加更多理事会成员
];

export default function BoardPage() {
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

    // Add click handlers to board members
    const membersWithClickHandlers = boardMembers.map(member => ({
        ...member,
        onDetailClick: () => handleMemberClick(member)
    }));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.mainTitle}>理事会</h1>
                <h2 className={styles.englishTitle}>GOVERNING BOARD</h2>
                
                <div className={styles.description}>
                    <p className={styles.intro}>
                        开源社理事会（GB）负责开源社的市场营销和其他业务监督以及预算决策。
                    </p>
                    
                    <p className={styles.details}>
                        理事会不对开源社做出技术决策，除了与 <a href="/department/toc" className={styles.link}>TOC</a> 合作设定开源社的整体范围外。理事会每年举行3到5次会议。<a href="#meetings" className={styles.link}>查看过往会议记录</a>。理事会目前由以下代表组成：
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
