import React, { useState } from "react"
import BoardMembers from "@/components/board/BoardMembers"
import BoardMemberDetail from "@/components/board/BoardMemberDetail"
import { PersonCardProps } from "@/components/board/PersonCard"
import styles from "./index.module.css"

const advisoryMembers: PersonCardProps[] = [
    {
        name: "赖安妮 Anni",
        pronouns: "Santa Clara",
        title: "顾问",
        organization: "开源基金会",
        avatar: "https://res.cloudinary.com/dqaizhakm/image/upload/v1761753233/anni_cbz1r3.png",
        twitter: "",
        github: "https://github.com/kaiyuanshe",
        email:'anni.lai@futurewei.com',
        bio: "过去 15 年，在多个开源基金会和组织参与贡献，包括 CNCF、OCI、LF Edge 和 OpenStack 基金会等。目前参与贡献重点为开源人工智能战略、许可和流程。",
        details: [
          "现任开源社顾问委员会顾问委员，Linux 基金会 (LF) AI & Data 基金会董事，LF 欧洲顾问委员会、LF Open Metaverse 基金会委员会。 工作上，现任 Futurewei 开源运营和营销主管，负责开源项目管理、流程、合规性、培训、项目协调和生态系统建设。"
        ]
    }, {
        name: "Hong Phuc Dang",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "安旭",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "白宦成",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "常雷",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "晁倩",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "陈昱",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "陈泽辉",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "段少婷",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "段夕华",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "堵俊平",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "范斌",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "龚宇华",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "郭雪",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "郭悦",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "惠世冀",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "霍泰稳",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "靳宏梅",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "蒋涛",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "姜宁",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "康悦",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "康馨月",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "刘冬",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "刘敏",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "李晨",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "刘昭",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "李娜",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "李震宁",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "马乐",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "马红伟",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "慕睿涛",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "潘娟",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "任旭东",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "沈朝华",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "宋春雪",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "宋青见",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "李震宁",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "谭中意",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "孙乐",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "王晶煜",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "王蓉",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "王晓璇",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "王小虎",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "王蕴博",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "向阳",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "吴晟",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "谢超",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "薛植元",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "杨丽蕴",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "杨娜",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "严澎屹",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "余杰",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "张鑫",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "张志文",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "钟燕清",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "杨丽蕴",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "慕睿涛",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "李明康",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "王皓月",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "朱庆裕",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "单致豪",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "庄表伟",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "林旅强",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    },{
        name: "刘天栋",
        pronouns: "",
        title: "顾问",
        organization: "",
        avatar: "/img/cblecker.png",
        twitter: "",
        github: "",
        email:'',
        bio: "",
        details: [
          ""
        ]
    }, 
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