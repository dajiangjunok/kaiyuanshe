"use client"

import { useState } from "react"
import { Button, Input, TimePicker, message } from "antd"
import { Plus, Trash2 } from "lucide-react"
import styles from "./venue.module.css"
import dayjs from "dayjs"

const { TextArea } = Input

interface Speaker {
  id: string
  name: string
  position: string
  avatarUrl: string
}

interface Agenda {
  id: string
  startTime: string
  endTime: string
  topic: string
  speakers: Speaker[]
}

interface Venue {
  id: string
  name: string
  address: string
  description: string
  producer: string
  volunteers: string
  agendas: Agenda[]
}

export default function VenuePage() {
  const [venues, setVenues] = useState<Venue[]>([
    {
      id: "1",
      name: "",
      address: "",
      description: "",
      producer: "",
      volunteers: "",
      agendas: [
        {
          id: "1",
          startTime: "09:00",
          endTime: "09:30",
          topic: "签到",
          speakers: [
            {
              id: "1",
              name: "",
              position: "",
              avatarUrl: "",
            },
          ],
        },
      ],
    },
  ])

  const [activeVenueId, setActiveVenueId] = useState<string>("1")

  const addVenue = () => {
    const newVenue: Venue = {
      id: Date.now().toString(),
      name: "",
      address: "",
      description: "",
      producer: "",
      volunteers: "",
      agendas: [],
    }
    setVenues([...venues, newVenue])
    setActiveVenueId(newVenue.id)
    message.success("已添加新会场")
  }

  const removeVenue = (venueId: string) => {
    if (venues.length === 1) {
      message.warning("至少需要保留一个会场")
      return
    }
    if (activeVenueId === venueId) {
      const remainingVenues = venues.filter((v) => v.id !== venueId)
      setActiveVenueId(remainingVenues[0].id)
    }
    setVenues(venues.filter((v) => v.id !== venueId))
    message.success("已删除会场")
  }

  const updateVenue = (venueId: string, field: keyof Venue, value: any) => {
    setVenues(venues.map((v) => (v.id === venueId ? { ...v, [field]: value } : v)))
  }

  const addAgenda = (venueId: string) => {
    setVenues(
      venues.map((v) => {
        if (v.id === venueId) {
          const newAgenda: Agenda = {
            id: Date.now().toString(),
            startTime: "09:00",
            endTime: "09:30",
            topic: "议程标题",
            speakers: [],
          }
          return { ...v, agendas: [...v.agendas, newAgenda] }
        }
        return v
      }),
    )
  }

  const removeAgenda = (venueId: string, agendaId: string) => {
    setVenues(
      venues.map((v) => {
        if (v.id === venueId) {
          return { ...v, agendas: v.agendas.filter((a) => a.id !== agendaId) }
        }
        return v
      }),
    )
    message.success("已删除议程")
  }

  const updateAgenda = (venueId: string, agendaId: string, field: keyof Agenda, value: any) => {
    setVenues(
      venues.map((v) => {
        if (v.id === venueId) {
          return {
            ...v,
            agendas: v.agendas.map((a) => (a.id === agendaId ? { ...a, [field]: value } : a)),
          }
        }
        return v
      }),
    )
  }

  const addSpeaker = (venueId: string, agendaId: string) => {
    setVenues(
      venues.map((v) => {
        if (v.id === venueId) {
          return {
            ...v,
            agendas: v.agendas.map((a) => {
              if (a.id === agendaId) {
                const newSpeaker: Speaker = {
                  id: Date.now().toString(),
                  name: "嘉宾姓名",
                  position: "嘉宾职位",
                  avatarUrl: "",
                }
                return { ...a, speakers: [...a.speakers, newSpeaker] }
              }
              return a
            }),
          }
        }
        return v
      }),
    )
  }

  const removeSpeaker = (venueId: string, agendaId: string, speakerId: string) => {
    setVenues(
      venues.map((v) => {
        if (v.id === venueId) {
          return {
            ...v,
            agendas: v.agendas.map((a) => {
              if (a.id === agendaId) {
                return { ...a, speakers: a.speakers.filter((s) => s.id !== speakerId) }
              }
              return a
            }),
          }
        }
        return v
      }),
    )
  }

  const updateSpeaker = (venueId: string, agendaId: string, speakerId: string, field: keyof Speaker, value: string) => {
    setVenues(
      venues.map((v) => {
        if (v.id === venueId) {
          return {
            ...v,
            agendas: v.agendas.map((a) => {
              if (a.id === agendaId) {
                return {
                  ...a,
                  speakers: a.speakers.map((s) => (s.id === speakerId ? { ...s, [field]: value } : s)),
                }
              }
              return a
            }),
          }
        }
        return v
      }),
    )
  }

  const handleSubmit = () => {
    console.log("提交的会场数据:", venues)
    message.success("已提交所有会场数据")
  }

  const activeVenue = venues.find((v) => v.id === activeVenueId) || venues[0]

  return (
    <div className={`${styles.container} nav-t-top`}>
      <div className={styles.contentWrapper}>
        <div className={styles.tabsBar}>
          <div className={styles.tabsList}>
            {venues.map((venue, index) => (
              <div
                key={venue.id}
                className={`${styles.tab} ${activeVenueId === venue.id ? styles.tabActive : ""}`}
                onClick={() => setActiveVenueId(venue.id)}
              >
                {venue.name || `会场${index + 1}`}
                {venues.length > 1 && (
                  <Trash2
                    size={14}
                    className={styles.tabClose}
                    onClick={(e) => {
                      e.stopPropagation()
                      removeVenue(venue.id)
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <Button type="primary" icon={<Plus size={16} />} onClick={addVenue} className={styles.addVenueBtn}>
            添加会场
          </Button>
        </div>

        {/* Venue Information Card */}
        <div className={styles.formCard}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>会场信息</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span className={styles.required}>*</span> 会场名称
              </label>
              <Input
                placeholder="主会场"
                value={activeVenue.name}
                onChange={(e) => updateVenue(activeVenue.id, "name", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span className={styles.required}>*</span> 地址
              </label>
              <Input
                placeholder="河南郑州正弘科技园"
                value={activeVenue.address}
                onChange={(e) => updateVenue(activeVenue.id, "address", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>描述</label>
              <TextArea
                rows={4}
                placeholder="前往这场峰会汇聚了来自世界各地的顶尖专家和业界领袖，以及众多对该领域充满热情的参与者..."
                value={activeVenue.description}
                onChange={(e) => updateVenue(activeVenue.id, "description", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span className={styles.required}>*</span> 出品人
              </label>
              <Input
                placeholder="张三"
                value={activeVenue.producer}
                onChange={(e) => updateVenue(activeVenue.id, "producer", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>志愿者（用逗号分隔）</label>
              <Input
                placeholder="李四, 王五, 赵六"
                value={activeVenue.volunteers}
                onChange={(e) => updateVenue(activeVenue.id, "volunteers", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Agenda Card - separate card */}
        <div className={styles.formCard}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>议程</h3>
              <Button
                type="dashed"
                icon={<Plus size={16} />}
                onClick={() => addAgenda(activeVenue.id)}
                className={styles.addAgendaBtn}
              >
                添加议程
              </Button>
            </div>

            {activeVenue.agendas.map((agenda, agendaIndex) => (
              <div key={agenda.id} className={styles.agendaCard}>
                <div className={styles.agendaHeader}>
                  <span className={styles.agendaTitle}>议程 {agendaIndex + 1}</span>
                  <Button
                    type="link"
                    danger
                    size="small"
                    icon={<Trash2 size={14} />}
                    onClick={() => removeAgenda(activeVenue.id, agenda.id)}
                    className={styles.deleteBtn}
                  >
                    删除
                  </Button>
                </div>

                <div className={styles.timeRow}>
                  <div className={styles.timeGroup}>
                    <label className={styles.timeLabel}>
                      <span className={styles.required}>*</span> 开始时间
                    </label>
                    <TimePicker
                      format="HH:mm"
                      placeholder="Invalid Date"
                      value={agenda.startTime ? dayjs(agenda.startTime, "HH:mm") : null}
                      onChange={(time) =>
                        updateAgenda(activeVenue.id, agenda.id, "startTime", time ? time.format("HH:mm") : "")
                      }
                      className={styles.timePicker}
                    />
                  </div>
                  <div className={styles.timeGroup}>
                    <label className={styles.timeLabel}>
                      <span className={styles.required}>*</span> 结束时间
                    </label>
                    <TimePicker
                      format="HH:mm"
                      placeholder="Invalid Date"
                      value={agenda.endTime ? dayjs(agenda.endTime, "HH:mm") : null}
                      onChange={(time) =>
                        updateAgenda(activeVenue.id, agenda.id, "endTime", time ? time.format("HH:mm") : "")
                      }
                      className={styles.timePicker}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <span className={styles.required}>*</span> 主题
                  </label>
                  <Input
                    placeholder="主题"
                    value={agenda.topic}
                    onChange={(e) => updateAgenda(activeVenue.id, agenda.id, "topic", e.target.value)}
                  />
                </div>

                <div className={styles.speakersSection}>
                  <div className={styles.speakersHeader}>
                    <label className={styles.label}>演讲者</label>
                    <Button
                      type="dashed"
                      size="small"
                      icon={<Plus size={14} />}
                      onClick={() => addSpeaker(activeVenue.id, agenda.id)}
                      className={styles.addSpeakerBtn}
                    >
                      添加演讲者
                    </Button>
                  </div>

                  {agenda.speakers.map((speaker) => (
                    <div key={speaker.id} className={styles.speakerItem}>
                      <div className={styles.speakerRow}>
                        <div className={styles.speakerField}>
                          <label className={styles.smallLabel}>
                            <span className={styles.required}>*</span> 姓名
                          </label>
                          <Input
                            placeholder="请输入姓名"
                            value={speaker.name}
                            onChange={(e) =>
                              updateSpeaker(activeVenue.id, agenda.id, speaker.id, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className={styles.speakerField}>
                          <label className={styles.smallLabel}>
                            <span className={styles.required}>*</span> 职位
                          </label>
                          <Input
                            placeholder="请输入职位"
                            value={speaker.position}
                            onChange={(e) =>
                              updateSpeaker(activeVenue.id, agenda.id, speaker.id, "position", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.smallLabel}>头像 URL</label>
                        <Input
                          placeholder="请输入头像 URL"
                          value={speaker.avatarUrl}
                          onChange={(e) =>
                            updateSpeaker(activeVenue.id, agenda.id, speaker.id, "avatarUrl", e.target.value)
                          }
                        />
                      </div>
                      <Button
                        type="link"
                        danger
                        size="small"
                        icon={<Trash2 size={14} />}
                        onClick={() => removeSpeaker(activeVenue.id, agenda.id, speaker.id)}
                        className={styles.deleteSpeakerBtn}
                      >
                        删除演讲者
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.submitSection}>
            <Button type="primary" size="large" block onClick={handleSubmit} className={styles.submitBtn}>
              提交所有会场数据
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
