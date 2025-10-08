import { useState, useEffect } from "react"
import { Button, DatePicker, Input, TimePicker, message, App as AntdApp } from "antd"
import { Plus, Trash2 } from "lucide-react"
import styles from "./venues.module.css"
import dayjs from "dayjs"
import { createSession, deleteSession, getSessionsByEvent, updateSession } from "@/pages/api/event"
import { useRouter } from 'next/router';

const { TextArea } = Input

interface Speaker {
  ID: string
  name: string
  title: string
  avatar: string
}

interface Agenda {
  ID: string
  start_time: string
  end_time: string
  topic: string
  speakers: Speaker[]
}

interface Venue {
  ID: string
  name: string
  address: string
  description: string
  producer: string
  volunteers: string
  agendas: Agenda[]
}

export default function VenuesPage() {
  const { message } = AntdApp.useApp();
  const router = useRouter();
  const { id } = router.query;

  // 将 eventId 转换为字符串
  const eventId = id as string;

  const [venues, setVenues] = useState<Venue[]>([])
  const [activeVenueId, setActiveVenueId] = useState<string>("")
  const [loading, setLoading] = useState(true)

  // 创建默认的空会场
  const createEmptyVenue = (): Venue => {
    return {
      ID: Date.now().toString(),
      name: "",
      address: "",
      description: "",
      producer: "",
      volunteers: "",
      agendas: [],
    };
  };

  // 页面加载时获取会场数据
  useEffect(() => {
    const fetchVenues = async () => {
      if (!eventId) return;

      try {
        setLoading(true);
        const result = await getSessionsByEvent(eventId);

        if (result.success && result.data && result.data.length > 0) {
          const fetchedVenues: Venue[] = result.data.map(session => ({
            ID: session.ID.toString(),
            name: session.title,
            address: "", // 如果后端没有这个字段，保持为空
            description: session.description,
            producer: session.producer,
            volunteers: session.volunteer,
            agendas: session.agendas.map(agenda => ({
              ID: agenda.ID.toString(),
              topic: agenda.topic,
              start_time: agenda.start_time,
              end_time: agenda.end_time,
              speakers: agenda.speakers.map(speaker => ({
                ID: speaker.ID.toString(),
                name: speaker.name,
                title: speaker.title,
                avatar: speaker.avatar,
              })),
            })),
          }));

          setVenues(fetchedVenues);
          if (fetchedVenues.length > 0) {
            setActiveVenueId(fetchedVenues[0].ID);
          }
        } else {
          // 如果没有数据，初始化一个空会场
          const emptyVenue = createEmptyVenue();
          setVenues([emptyVenue]);
          setActiveVenueId(emptyVenue.ID);
          message.info("暂无会场数据，请添加第一个会场");
        }
      } catch (error) {
        console.error("获取会场数据异常:", error);
        message.error("网络错误，请稍后重试");
        // 出错时也初始化一个空会场
        const emptyVenue = createEmptyVenue();
        setVenues([emptyVenue]);
        setActiveVenueId(emptyVenue.ID);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady && eventId) {
      fetchVenues();
    }
  }, [router.isReady, eventId]);

  const addVenue = () => {
    const newVenue = createEmptyVenue();
    setVenues([...venues, newVenue])
    setActiveVenueId(newVenue.ID)
    message.success("已添加新会场")
  }

  const removeVenue = async (venueId: string) => {
    try {
      // 调用删除会场接口
      const result = await deleteSession(eventId, venueId);

      if (result.success) {
        // 接口删除成功，更新本地状态
        const updatedVenues = venues.filter((v) => v.ID !== venueId);
        
        // 如果删除了当前激活的会场，切换到第一个会场
        if (activeVenueId === venueId && updatedVenues.length > 0) {
          setActiveVenueId(updatedVenues[0].ID);
        }
        
        setVenues(updatedVenues);
        message.success("已删除会场");
      } else {
        message.error(result.message || "删除会场失败");
      }
    } catch (error) {
      console.error("删除会场异常:", error);
      message.error("网络错误，请稍后重试");
    }
  };

  const updateVenue = (venueId: string, field: keyof Venue, value: any) => {
    setVenues(venues.map((v) => (v.ID === venueId ? { ...v, [field]: value } : v)))
  }

  const addAgenda = (venueId: string) => {
    setVenues(
      venues.map((v) => {
        if (v.ID === venueId) {
          const newAgenda: Agenda = {
            ID: Date.now().toString(),
            start_time: "",
            end_time: "",
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
        if (v.ID === venueId) {
          return { ...v, agendas: v.agendas.filter((a) => a.ID !== agendaId) }
        }
        return v
      }),
    )
    message.success("已删除议程")
  }

  const updateAgenda = (venueId: string, agendaId: string, field: keyof Agenda, value: any) => {
    setVenues(
      venues.map((v) => {
        if (v.ID === venueId) {
          return {
            ...v,
            agendas: v.agendas.map((a) => (a.ID === agendaId ? { ...a, [field]: value } : a)),
          }
        }
        return v
      }),
    )
  }

  const addSpeaker = (venueId: string, agendaId: string) => {
    setVenues(
      venues.map((v) => {
        if (v.ID === venueId) {
          return {
            ...v,
            agendas: v.agendas.map((a) => {
              if (a.ID === agendaId) {
                const newSpeaker: Speaker = {
                  ID: Date.now().toString(),
                  name: "嘉宾姓名",
                  title: "嘉宾职位",
                  avatar: "",
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
        if (v.ID === venueId) {
          return {
            ...v,
            agendas: v.agendas.map((a) => {
              if (a.ID === agendaId) {
                return { ...a, speakers: a.speakers.filter((s) => s.ID !== speakerId) }
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
        if (v.ID === venueId) {
          return {
            ...v,
            agendas: v.agendas.map((a) => {
              if (a.ID === agendaId) {
                return {
                  ...a,
                  speakers: a.speakers.map((s) => (s.ID === speakerId ? { ...s, [field]: value } : s)),
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

  const handleSubmit = async () => {
    try {
      console.log("提交的会场数据:", venues);

      // 检查是否有会场数据
      if (venues.length === 0) {
        message.warning("请至少添加一个会场");
        return;
      }

      // 遍历所有会场，逐个提交到后端
      const submitPromises = venues.map(async (venue) => {
        // 如果 venue.ID 是临时ID（纯数字字符串），说明是新建的会场
        if (/^\d+$/.test(venue.ID)) {
          // 创建新会场
          return await createSession(eventId, {
            title: venue.name,
            description: venue.description,
            address: venue.address,
            producer: venue.producer,
            volunteer: venue.volunteers,
            agendas: venue.agendas.map(agenda => ({
              topic: agenda.topic,
              start_time: agenda.start_time,
              end_time: agenda.end_time,
              speakers: agenda.speakers.map(speaker => ({
                name: speaker.name,
                avatar: speaker.avatar,
                title: speaker.title,
              })),
            })),
          });
        } else {
          // 更新已存在的会场
          return await updateSession(eventId, venue.ID, {
            title: venue.name,
            description: venue.description,
            address: venue.address,
            producer: venue.producer,
            volunteer: venue.volunteers,
            agendas: venue.agendas.map(agenda => ({
              topic: agenda.topic,
              start_time: agenda.start_time,
              end_time: agenda.end_time,
              speakers: agenda.speakers.map(speaker => ({
                name: speaker.name,
                avatar: speaker.avatar,
                title: speaker.title,
              })),
            })),
          });
        }
      });

      // 等待所有请求完成
      const results = await Promise.all(submitPromises);

      // 检查所有请求是否都成功
      const allSuccess = results.every(result => result.success);

      if (allSuccess) {
        message.success("所有会场数据提交成功");

        // 重新获取最新的会场数据来更新本地状态
        const latestResult = await getSessionsByEvent(eventId);
        if (latestResult.success && latestResult.data) {
          const updatedVenues: Venue[] = latestResult.data.map(session => ({
            ID: session.ID.toString(),
            name: session.title,
            address: session.address,
            description: session.description,
            producer: session.producer,
            volunteers: session.volunteer,
            agendas: session.agendas.map(agenda => ({
              ID: agenda.ID.toString(),
              topic: agenda.topic,
              start_time: agenda.start_time,
              end_time: agenda.end_time,
              speakers: agenda.speakers.map(speaker => ({
                ID: speaker.ID.toString(),
                name: speaker.name,
                title: speaker.title,
                avatar: speaker.avatar,
              })),
            })),
          }));
          setVenues(updatedVenues);
          if (updatedVenues.length > 0) {
            setActiveVenueId(updatedVenues[0].ID);
          }
        }
      } else {
        // 找出失败的任务
        const failedResults = results.filter(result => !result.success);
        console.error("部分会场提交失败:", failedResults);
        message.error(`部分会场提交失败: ${failedResults.map(r => r.message).join(', ')}`);
      }

    } catch (error) {
      console.error("提交会场数据异常:", error);
      message.error("网络错误，请稍后重试");
    }
  };

  // 等待路由参数加载
  if (!router.isReady || loading) {
    return (
      <div className={`${styles.container} nav-t-top`}>
        <div className={styles.loading}>加载中...</div>
      </div>
    );
  }

  if (!eventId) {
    return (
      <div className={`${styles.container} nav-t-top`}>
        <div className={styles.error}>未找到活动ID</div>
      </div>
    );
  }

  const activeVenue = venues.find((v) => v.ID === activeVenueId) || (venues.length > 0 ? venues[0] : createEmptyVenue())

  return (
    <div className={`${styles.container} nav-t-top`}>
      <div className={styles.contentWrapper}>
        <div className={styles.tabsBar}>
          <div className={styles.tabsList}>
            {venues.map((venue, index) => (
              <div
                key={venue.ID}
                className={`${styles.tab} ${activeVenueId === venue.ID ? styles.tabActive : ""}`}
                onClick={() => setActiveVenueId(venue.ID)}
              >
                {venue.name || `会场${index + 1}`}
                <Trash2
                  size={14}
                  className={styles.tabClose}
                  onClick={(e) => {
                    e.stopPropagation()
                    removeVenue(venue.ID)
                  }}
                />
              </div>
            ))}
          </div>
          <Button type="primary" icon={<Plus size={16} />} onClick={addVenue} className={styles.addVenueBtn}>
            添加会场
          </Button>
        </div>

        {/* 会场信息表单 */}
        <div className={styles.formCard}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>会场信息</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span className={styles.required}>*</span> 会场名称
              </label>
              <Input
                placeholder="请输入会场名称"
                value={activeVenue.name || ''}
                onChange={(e) => updateVenue(activeVenue.ID, "name", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span className={styles.required}>*</span> 地址
              </label>
              <Input
                placeholder="请输入会场地址"
                value={activeVenue.address || ''}
                onChange={(e) => updateVenue(activeVenue.ID, "address", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>描述</label>
              <TextArea
                rows={4}
                placeholder="请输入会场介绍"
                value={activeVenue.description || ''}
                onChange={(e) => updateVenue(activeVenue.ID, "description", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span className={styles.required}>*</span> 出品人
              </label>
              <Input
                placeholder="请输入出品人"
                value={activeVenue.producer || ''}
                onChange={(e) => updateVenue(activeVenue.ID, "producer", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>志愿者（用逗号分隔）</label>
              <Input
                placeholder="请输入志愿者"
                value={activeVenue.volunteers || ''}
                onChange={(e) => updateVenue(activeVenue.ID, "volunteers", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 议程信息表单 */}
        <div className={styles.formCard}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>议程</h3>
              <Button
                type="dashed"
                icon={<Plus size={16} />}
                onClick={() => addAgenda(activeVenue.ID)}
                className={styles.addAgendaBtn}
              >
                添加议程
              </Button>
            </div>

            {activeVenue.agendas.length === 0 ? (
              <div className={styles.emptyAgenda}>
                <p>暂无议程，请添加第一个议程</p>
              </div>
            ) : (
              activeVenue.agendas.map((agenda, agendaIndex) => (
                <div key={agenda.ID} className={styles.agendaCard}>
                  <div className={styles.agendaHeader}>
                    <span className={styles.agendaTitle}>议程 {agendaIndex + 1}</span>
                    <Button
                      type="link"
                      danger
                      size="small"
                      icon={<Trash2 size={14} />}
                      onClick={() => removeAgenda(activeVenue.ID, agenda.ID)}
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
                      <DatePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="选择开始时间"
                        value={agenda.start_time ? dayjs(agenda.start_time, "YYYY-MM-DD HH:mm:ss") : null}
                        onChange={(time) =>
                          updateAgenda(activeVenue.ID, agenda.ID, "start_time", time ? time.format("YYYY-MM-DD HH:mm:ss") : "")
                        }
                        className={styles.timePicker}
                      />
                    </div>
                    <div className={styles.timeGroup}>
                      <label className={styles.timeLabel}>
                        <span className={styles.required}>*</span> 结束时间
                      </label>
                      <DatePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="选择结束时间"
                        value={agenda.end_time ? dayjs(agenda.end_time, "YYYY-MM-DD HH:mm:ss") : null}
                        onChange={(time) =>
                          updateAgenda(activeVenue.ID, agenda.ID, "end_time", time ? time.format("YYYY-MM-DD HH:mm:ss") : "")
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
                      placeholder="请输入议程主题"
                      value={agenda.topic || ''}
                      onChange={(e) => updateAgenda(activeVenue.ID, agenda.ID, "topic", e.target.value)}
                    />
                  </div>

                  <div className={styles.speakersSection}>
                    <div className={styles.speakersHeader}>
                      <label className={styles.label}>嘉宾</label>
                      <Button
                        type="dashed"
                        size="small"
                        icon={<Plus size={14} />}
                        onClick={() => addSpeaker(activeVenue.ID, agenda.ID)}
                        className={styles.addSpeakerBtn}
                      >
                        添加嘉宾
                      </Button>
                    </div>

                    {agenda.speakers.length === 0 ? (
                      <div className={styles.emptySpeaker}>
                        <p>暂无嘉宾，请添加第一个嘉宾</p>
                      </div>
                    ) : (
                      agenda.speakers.map((speaker) => (
                        <div key={speaker.ID} className={styles.speakerItem}>
                          <div className={styles.speakerRow}>
                            <div className={styles.speakerField}>
                              <label className={styles.smallLabel}>
                                <span className={styles.required}>*</span> 姓名
                              </label>
                              <Input
                                placeholder="请输入姓名"
                                value={speaker.name || ''}
                                onChange={(e) =>
                                  updateSpeaker(activeVenue.ID, agenda.ID, speaker.ID, "name", e.target.value)
                                }
                              />
                            </div>
                            <div className={styles.speakerField}>
                              <label className={styles.smallLabel}>
                                <span className={styles.required}>*</span> 职位
                              </label>
                              <Input
                                placeholder="请输入职位"
                                value={speaker.title || ''}
                                onChange={(e) =>
                                  updateSpeaker(activeVenue.ID, agenda.ID, speaker.ID, "title", e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.smallLabel}>头像 URL</label>
                            <Input
                              placeholder="请输入头像 URL"
                              value={speaker.avatar || ''}
                              onChange={(e) =>
                                updateSpeaker(activeVenue.ID, agenda.ID, speaker.ID, "avatar", e.target.value)
                              }
                            />
                          </div>
                          <Button
                            type="link"
                            danger
                            size="small"
                            icon={<Trash2 size={14} />}
                            onClick={() => removeSpeaker(activeVenue.ID, agenda.ID, speaker.ID)}
                            className={styles.deleteSpeakerBtn}
                          >
                            删除嘉宾
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))
            )}
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