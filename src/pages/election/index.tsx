import type React from "react"

import { useState, useRef } from "react"
import { Select, Button, Card, Collapse, Avatar, Space, Typography, Row, Col } from "antd"
import { Check, X, Calendar, User, Award, FileText, MessageSquare } from "lucide-react"
import styles from "./index.module.css"

const { Title, Text } = Typography

interface Candidate {
  id: string
  name: string
  date: string
  avatar: string
  position: string
  nominationReason: string
  previousContributions: string
  currentPlatform: string
  recommendations: string
  voted: boolean | null
}

const mockBoardCandidates: Candidate[] = [
  {
    id: "1",
    name: "朱庆裕",
    date: "2025-01-11",
    avatar: "/professional-woman-developer.png",
    position: "担任 理事会 理事",
    nominationReason: "在开源社区有丰富的管理经验，积极推动社区发展",
    previousContributions: "组织了多次技术分享会，维护了核心开源项目",
    currentPlatform: "致力于提升社区技术水平，加强国际合作",
    recommendations: "技术能力强，沟通协调能力出色",
    voted: null,
  },
  {
    id: "2",
    name: "藏鹏",
    date: "2025-01-14",
    avatar: "/professional-man-developer.png",
    position: "担任 理事会 理事",
    nominationReason: "具有丰富的开源项目经验和社区建设能力",
    previousContributions: "贡献了多个重要开源项目，帮助新人融入社区",
    currentPlatform: "推动开源文化传播，建设更包容的技术社区",
    recommendations: "热心公益，具有很强的责任心",
    voted: null,
  },
  {
    id: "3",
    name: "陈玄",
    date: "2025-01-15",
    avatar: "/professional-developer-outdoor.jpg",
    position: "担任 理事会 理事",
    nominationReason: "在技术创新和团队协作方面表现突出",
    previousContributions: "主导了多个创新项目，培养了大批技术人才",
    currentPlatform: "注重技术创新，推动产学研结合",
    recommendations: "视野开阔，具有前瞻性思维",
    voted: null,
  },
]

const mockOfficialCandidates: Candidate[] = [
  {
    id: "4",
    name: "王小明",
    date: "2025-01-16",
    avatar: "/professional-woman-developer.png",
    position: "申请 正式成员",
    nominationReason: "积极参与社区活动，贡献了多个有价值的项目",
    previousContributions: "维护了社区文档，组织了新人培训活动",
    currentPlatform: "希望能够更深入参与社区建设，推动技术交流",
    recommendations: "工作认真负责，具有团队合作精神",
    voted: null,
  },
  {
    id: "5",
    name: "李华",
    date: "2025-01-17",
    avatar: "/professional-man-developer.png",
    position: "申请 正式成员",
    nominationReason: "在开源项目开发方面有突出表现",
    previousContributions: "提交了多个重要的代码贡献，修复了关键bug",
    currentPlatform: "致力于提升代码质量，推广最佳实践",
    recommendations: "技术扎实，乐于分享知识",
    voted: null,
  },
]

const mockGeneralCandidates: Candidate[] = [
  {
    id: "6",
    name: "张三",
    date: "2025-01-18",
    avatar: "/professional-developer-outdoor.jpg",
    position: "社区候选人",
    nominationReason: "新加入社区，表现出强烈的参与意愿",
    previousContributions: "参与了社区讨论，提出了建设性建议",
    currentPlatform: "希望能够学习更多技术，为社区做出贡献",
    recommendations: "学习能力强，态度积极",
    voted: null,
  },
  {
    id: "7",
    name: "赵六",
    date: "2025-01-19",
    avatar: "/professional-woman-developer.png",
    position: "社区候选人",
    nominationReason: "在技术推广方面有独特见解",
    previousContributions: "撰写了多篇技术博客，分享了实践经验",
    currentPlatform: "推动技术知识的普及和传播",
    recommendations: "表达能力强，善于总结经验",
    voted: null,
  },
]

export default function ElectionPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2025)
  const [boardCandidates, setBoardCandidates] = useState<Candidate[]>(mockBoardCandidates)
  const [officialCandidates, setOfficialCandidates] = useState<Candidate[]>(mockOfficialCandidates)
  const [generalCandidates, setGeneralCandidates] = useState<Candidate[]>(mockGeneralCandidates)
  const [activePhase, setActivePhase] = useState<string>("nomination")

  const boardSectionRef = useRef<HTMLDivElement>(null)
  const officialSectionRef = useRef<HTMLDivElement>(null)
  const generalSectionRef = useRef<HTMLDivElement>(null)

  const handleVote = (candidateId: string, vote: boolean, section: "board" | "official" | "general") => {
    if (section === "board") {
      setBoardCandidates((prev) =>
        prev.map((candidate) => (candidate.id === candidateId ? { ...candidate, voted: vote } : candidate)),
      )
    } else if (section === "official") {
      setOfficialCandidates((prev) =>
        prev.map((candidate) => (candidate.id === candidateId ? { ...candidate, voted: vote } : candidate)),
      )
    } else {
      setGeneralCandidates((prev) =>
        prev.map((candidate) => (candidate.id === candidateId ? { ...candidate, voted: vote } : candidate)),
      )
    }
  }

  const scrollToSection = (phase: string) => {
    setActivePhase(phase)
    let targetRef: React.RefObject<HTMLDivElement> | null = null

    switch (phase) {
      case "nomination":
        targetRef = boardSectionRef
        break
      case "member":
        targetRef = officialSectionRef
        break
      case "voting":
        targetRef = generalSectionRef
        break
    }

    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const years = [2023, 2024, 2025, 2026]
  const phases = [
    { key: "nomination", label: "理事提名", color: "#faad14" },
    { key: "member", label: "正式成员提名", color: "#1890ff" },
    { key: "voting", label: "选举投票", color: "#f5222d" },
  ]

  const renderCandidateCards = (candidates: Candidate[], section: "board" | "official" | "general") => (
    <Row gutter={[24, 24]}>
      {candidates.map((candidate) => (
        <Col xs={24} lg={8} key={candidate.id}>
          <Card className={styles.candidateCard}>
            <div className={styles.cardHeader}>
              <div className={styles.dateTag}>
                <Calendar size={14} />
                {candidate.date}
              </div>
            </div>

            <div className={styles.candidateInfo}>
              <Avatar size={120} src={candidate.avatar} className={styles.avatar} />
              <Title level={3} className={styles.candidateName}>
                {candidate.name}
              </Title>
              <Text className={styles.position}>{candidate.position}</Text>
            </div>

            <Collapse
              ghost
              className={styles.detailsCollapse}
              items={[
                {
                  key: "nomination",
                  label: (
                    <Space>
                      <FileText size={16} />
                      提名理由
                    </Space>
                  ),
                  children: <Text>{candidate.nominationReason}</Text>,
                },
                {
                  key: "contributions",
                  label: (
                    <Space>
                      <Award size={16} />
                      上届贡献
                    </Space>
                  ),
                  children: <Text>{candidate.previousContributions}</Text>,
                },
                {
                  key: "platform",
                  label: (
                    <Space>
                      <User size={16} />
                      本届主张
                    </Space>
                  ),
                  children: <Text>{candidate.currentPlatform}</Text>,
                },
                {
                  key: "recommendations",
                  label: (
                    <Space>
                      <MessageSquare size={16} />
                      推荐语
                    </Space>
                  ),
                  children: <Text>{candidate.recommendations}</Text>,
                },
              ]}
            />

            <div className={styles.voteButtons}>
              <Button
                type={candidate.voted === true ? "primary" : "default"}
                icon={<Check size={16} />}
                onClick={() => handleVote(candidate.id, true, section)}
                className={`${styles.voteButton} ${styles.approveButton}`}
              >
                支持
              </Button>
              <Button
                type={candidate.voted === false ? "primary" : "default"}
                danger={candidate.voted === false}
                icon={<X size={16} />}
                onClick={() => handleVote(candidate.id, false, section)}
                className={`${styles.voteButton} ${styles.rejectButton}`}
              >
                反对
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.yearSelector}>
          <Select
            value={selectedYear}
            onChange={setSelectedYear}
            size="large"
            style={{ width: 120 }}
            options={years.map((year) => ({ label: `${year}年`, value: year }))}
          />
        </div>

        <Title level={1} className={styles.title}>
          {selectedYear} 选举
        </Title>

        <Space size="middle" className={styles.phaseButtons}>
          {phases.map((phase) => (
            <Button
              key={phase.key}
              type={activePhase === phase.key ? "primary" : "default"}
              style={{
                backgroundColor: activePhase === phase.key ? phase.color : undefined,
                borderColor: phase.color,
                color: activePhase === phase.key ? "#fff" : phase.color,
              }}
              onClick={() => scrollToSection(phase.key)}
            >
              {phase.label}
            </Button>
          ))}
        </Space>
      </div>

      <div className={styles.candidatesSection} ref={boardSectionRef}>
        <Title level={2} className={styles.sectionTitle}>
          理事候选人
        </Title>
        {renderCandidateCards(boardCandidates, "board")}
      </div>

      <div className={styles.candidatesSection} ref={officialSectionRef}>
        <Title level={2} className={styles.sectionTitle}>
          正式候选人
        </Title>
        {renderCandidateCards(officialCandidates, "official")}
      </div>

      <div className={styles.candidatesSection} ref={generalSectionRef}>
        <Title level={2} className={styles.sectionTitle}>
          候选人
        </Title>
        {renderCandidateCards(generalCandidates, "general")}
      </div>
    </div>
  )
}
