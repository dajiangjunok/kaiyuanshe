import React from "react"
import BoardMembers from "@/components/board/BoardMembers"
import { PersonCardProps } from "@/components/board/PersonCard"
import styles from "./index.module.css"

const boardMembers: PersonCardProps[] = [
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
            
            <BoardMembers members={boardMembers} title="" />
        </div>
    )
}
