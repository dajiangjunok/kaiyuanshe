import { useState, useEffect, useMemo } from "react"
import { Button, DatePicker, Input, App as AntdApp, Form, Modal } from "antd"
import { Plus, Trash2, Sparkles, X, Trash } from "lucide-react"
import styles from "./venues.module.css"
import dayjs from "dayjs"
import { addAgendaToSession, createSession, deleteAgenda, deleteSession, getSessionsByEvent, updateSession } from "@/pages/api/event"
import { useRouter } from 'next/router';



const { TextArea } = Input

interface Speaker {
  ID: string | null
  tempKey?: string // 用于React key和内部状态管理
  name: string
  title: string
  avatar: string
}

interface Agenda {
  ID: string | null
  tempKey?: string // 用于React key和内部状态管理
  start_time: string
  end_time: string
  topic: string
  speakers: Speaker[]
}

interface Venue {
  ID: string | null
  tempKey?: string // 用于React key和内部状态管理
  name: string
  address: string
  description: string
  producer: string
  volunteers: string
  agendas: Agenda[]
}

export default function VenuesPage() {
  const { message } = AntdApp.useApp();
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  // 将 eventId 转换为字符串
  const eventId = id as string;

  const [venues, setVenues] = useState<Venue[]>([])
  const [activeVenueId, setActiveVenueId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // 获取项目的唯一标识符（用于React key和状态管理）
  const getUniqueId = (item: { ID: string | null; tempKey?: string }): string => {
    return item.ID || item.tempKey!;
  };

  // 创建默认的空会场
  const createEmptyVenue = (): Venue => {
    const tempKey = `temp_${Date.now()}`;
    return {
      ID: null,
      tempKey,
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

          setVenues(fetchedVenues);
          if (fetchedVenues.length > 0) {
            setActiveVenueId(getUniqueId(fetchedVenues[0]));
          }
        } else {
          // 如果没有数据，初始化一个空会场
          const emptyVenue = createEmptyVenue();
          setVenues([emptyVenue]);
          setActiveVenueId(getUniqueId(emptyVenue));
          message.info("暂无会场数据，请添加第一个会场");
        }
      } catch (error) {
        console.error("获取会场数据异常:", error);
        message.error("网络错误，请稍后重试");
        // 出错时也初始化一个空会场
        const emptyVenue = createEmptyVenue();
        setVenues([emptyVenue]);
        setActiveVenueId(getUniqueId(emptyVenue));
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady && eventId) {
      fetchVenues();
    }
  }, [router.isReady, eventId]);

  const activeVenue = useMemo(() => {
    return venues.find((v) => getUniqueId(v) === activeVenueId) || (venues.length > 0 ? venues[0] : createEmptyVenue())
  }, [venues, activeVenueId])

  // 检查当前会场是否已生成（非临时ID）
  const currentVenueGenerated = useMemo(() => {
    if (!activeVenue) return false
    return activeVenue.ID !== null
  }, [activeVenue])

  // 当切换会场时，同步表单值
  useEffect(() => {
    if (activeVenue) {
      form.setFieldsValue({
        name: activeVenue.name,
        address: activeVenue.address,
        description: activeVenue.description,
        producer: activeVenue.producer,
        volunteers: activeVenue.volunteers,
      });
    }
  }, [activeVenue, form]);

  const addVenue = () => {
    // 检查是否存在会场
    if (venues.length === 0) {
      const newVenue = createEmptyVenue();
      setVenues([...venues, newVenue])
      setActiveVenueId(getUniqueId(newVenue))
      message.success("已添加新会场")
      return;
    }

    // 获取最后一个会场
    const lastVenue = venues[venues.length - 1];

    // 检查最后一个会场是否已经保存（具有后端生成的ID）
    // null 表示未保存的新会场
    if (lastVenue.ID === null) {
      message.warning("请先保存当前会场，然后再添加新会场");
      return;
    }

    const newVenue = createEmptyVenue();
    setVenues([...venues, newVenue])
    setActiveVenueId(getUniqueId(newVenue))
    message.success("已添加新会场")
  }

  const removeVenue = async (venueId: string) => {
    try {
      // 调用删除会场接口
      const result = await deleteSession(eventId, venueId);

      if (result.success) {
        // 接口删除成功，更新本地状态
        const updatedVenues = venues.filter((v) => getUniqueId(v) !== venueId);

        // 如果删除了当前激活的会场，切换到第一个会场
        if (activeVenueId === venueId && updatedVenues.length > 0) {
          setActiveVenueId(getUniqueId(updatedVenues[0]));
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
    setVenues(venues.map((v) => (getUniqueId(v) === venueId ? { ...v, [field]: value } : v)))
  }

  const addAgenda = (venueId: string) => {
    setVenues(
      venues.map((v) => {
        if (getUniqueId(v) === venueId) {
          const newAgenda: Agenda = {
            ID: null,
            tempKey: `temp_${Date.now()}`,
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
    // 检查议程是否已保存（具有后端生成的ID）
    const isBackendAgenda = agendaId !== null;

    if (isBackendAgenda) {
      // 后端删除 - 弹窗确认
      Modal.confirm({
        title: '确认删除议程',
        content: '此操作将永久删除该议程，确定要继续吗？',
        okText: '确定删除',
        cancelText: '取消',
        okType: 'danger',
        onOk: async () => {
          try {
            // 调用后端删除议程接口
            const result = await deleteAgenda(agendaId);
            if (result.success) {
              // 删除成功，更新本地状态
              setVenues(
                venues.map((v) => {
                  if (getUniqueId(v) === venueId) {
                    return { ...v, agendas: v.agendas.filter((a) => getUniqueId(a) !== agendaId) }
                  }
                  return v
                }),
              )
              message.success("已删除议程")
            } else {
              message.error(result.message || "删除议程失败");
            }
          } catch (error) {
            console.error("删除议程异常:", error);
            message.error("网络错误，请稍后重试");
          }
        }
      });
    } else {
      // 前端删除 - 直接删除
      setVenues(
        venues.map((v) => {
          if (getUniqueId(v) === venueId) {
            return { ...v, agendas: v.agendas.filter((a) => getUniqueId(a) !== agendaId) }
          }
          return v
        }),
      )
      message.success("已删除议程")
    }
  }

  const updateAgenda = (venueId: string, agendaId: string, field: keyof Agenda, value: any) => {
    setVenues(
      venues.map((v) => {
        if (getUniqueId(v) === venueId) {
          return {
            ...v,
            agendas: v.agendas.map((a) => (getUniqueId(a) === agendaId ? { ...a, [field]: value } : a)),
          }
        }
        return v
      }),
    )
  }

  const addSpeaker = (venueId: string, agendaId: string) => {
    setVenues(
      venues.map((v) => {
        if (getUniqueId(v) === venueId) {
          return {
            ...v,
            agendas: v.agendas.map((a) => {
              if (getUniqueId(a) === agendaId) {
                const newSpeaker: Speaker = {
                  ID: null,
                  tempKey: `temp_${Date.now()}`,
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

  const [modal, contextHolder] = Modal.useModal();


  const removeSpeaker = (venueId: string, agendaId: string, speakerId: string) => {
    // 检查嘉宾是否已保存（具有后端生成的ID）
    const isBackendSpeaker = speakerId !== null;

    if (isBackendSpeaker) {
      // 后端删除 - 弹窗确认
      modal.confirm({
        title: '确认删除嘉宾',
        content: '此操作将永久删除该嘉宾，确定要继续吗？',
        okText: '确定删除',
        cancelText: '取消',
        okType: 'danger',
        onOk: async () => {
          try {
            // TODO: 调用后端删除嘉宾接口
            // const result = await deleteSpeaker(eventId, venueId, agendaId, speakerId);
            // if (result.success) {
            // 删除成功，更新本地状态
            setVenues(
              venues.map((v) => {
                if (getUniqueId(v) === venueId) {
                  return {
                    ...v,
                    agendas: v.agendas.map((a) => {
                      if (getUniqueId(a) === agendaId) {
                        return { ...a, speakers: a.speakers.filter((s) => getUniqueId(s) !== speakerId) }
                      }
                      return a
                    }),
                  }
                }
                return v
              }),
            )
            message.success("已删除嘉宾")
            // } else {
            //   message.error(result.message || "删除嘉宾失败");
            // }
          } catch (error) {
            console.error("删除嘉宾异常:", error);
            message.error("网络错误，请稍后重试");
          }
        }
      });
    } else {
      // 前端删除 - 直接删除
      setVenues(
        venues.map((v) => {
          if (getUniqueId(v) === venueId) {
            return {
              ...v,
              agendas: v.agendas.map((a) => {
                if (getUniqueId(a) === agendaId) {
                  return { ...a, speakers: a.speakers.filter((s) => getUniqueId(s) !== speakerId) }
                }
                return a
              }),
            }
          }
          return v
        }),
      )
      message.success("已删除嘉宾")
    }
  }

  const updateSpeaker = (venueId: string, agendaId: string, speakerId: string, field: keyof Speaker, value: string) => {
    setVenues(
      venues.map((v) => {
        if (getUniqueId(v) === venueId) {
          return {
            ...v,
            agendas: v.agendas.map((a) => {
              if (getUniqueId(a) === agendaId) {
                return {
                  ...a,
                  speakers: a.speakers.map((s) => (getUniqueId(s) === speakerId ? { ...s, [field]: value } : s)),
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

  // const handleSubmitAgendas = async () => {
  //   try {
  //     console.log("提交议程:")

  //     // 检查是否有会场数据
  //     if (venues.length === 0) {
  //       message.warning("请至少添加一个会场");
  //       return;
  //     }

  //     // 遍历所有会场，逐个提交到后端
  //     const submitPromises = venues.map(async (venue) => {
  //       // 如果 venue.ID 是临时ID（纯数字字符串），说明是新建的会场
  //       if (/^\d+$/.test(venue.ID)) {
  //         // 创建新会场
  //         return await createSession(eventId, {
  //           title: venue.name,
  //           description: venue.description,
  //           address: venue.address,
  //           producer: venue.producer,
  //           volunteer: venue.volunteers,
  //           agendas: venue.agendas.map(agenda => ({
  //             topic: agenda.topic,
  //             start_time: agenda.start_time,
  //             end_time: agenda.end_time,
  //             speakers: agenda.speakers.map(speaker => ({
  //               name: speaker.name,
  //               avatar: speaker.avatar,
  //               title: speaker.title,
  //             })),
  //           })),
  //         });
  //       } else {
  //         // 更新已存在的会场
  //         return await updateSession(eventId, venue.ID, {
  //           title: venue.name,
  //           description: venue.description,
  //           address: venue.address,
  //           producer: venue.producer,
  //           volunteer: venue.volunteers,
  //           agendas: venue.agendas.map(agenda => ({
  //             topic: agenda.topic,
  //             start_time: agenda.start_time,
  //             end_time: agenda.end_time,
  //             speakers: agenda.speakers.map(speaker => ({
  //               name: speaker.name,
  //               avatar: speaker.avatar,
  //               title: speaker.title,
  //             })),
  //           })),
  //         });
  //       }
  //     });

  //     // 等待所有请求完成
  //     const results = await Promise.all(submitPromises);

  //     // 检查所有请求是否都成功
  //     const allSuccess = results.every(result => result.success);

  //     if (allSuccess) {
  //       message.success("所有会场数据提交成功");

  //       // 重新获取最新的会场数据来更新本地状态
  //       const latestResult = await getSessionsByEvent(eventId);
  //       if (latestResult.success && latestResult.data) {
  //         const updatedVenues: Venue[] = latestResult.data.map(session => ({
  //           ID: session.ID.toString(),
  //           name: session.title,
  //           address: session.address,
  //           description: session.description,
  //           producer: session.producer,
  //           volunteers: session.volunteer,
  //           agendas: session.agendas.map(agenda => ({
  //             ID: agenda.ID.toString(),
  //             topic: agenda.topic,
  //             start_time: agenda.start_time,
  //             end_time: agenda.end_time,
  //             speakers: agenda.speakers.map(speaker => ({
  //               ID: speaker.ID.toString(),
  //               name: speaker.name,
  //               title: speaker.title,
  //               avatar: speaker.avatar,
  //             })),
  //           })),
  //         }));
  //         setVenues(updatedVenues);
  //         if (updatedVenues.length > 0) {
  //           setActiveVenueId(getUniqueId(updatedVenues[0]));
  //         }
  //       }
  //     } else {
  //       // 找出失败的任务
  //       const failedResults = results.filter(result => !result.success);
  //       console.error("部分会场提交失败:", failedResults);
  //       message.error(`部分会场提交失败: ${failedResults.map(r => r.message).join(', ')}`);
  //     }

  //   } catch (error) {
  //     console.error("提交会场数据异常:", error);
  //     message.error("网络错误，请稍后重试");
  //   }
  // };

  // 提交议程
  // 提交议程 - 为当前会场添加单个议程
  const handleSubmitAgendas = async () => {
    // 检查当前激活的会场
    if (!activeVenue) {
      message.warning("请先选择一个会场");
      return;
    }

    // 检查当前会场是否已保存
    if (activeVenue.ID === null) {
      message.warning("请先保存当前会场后再添加议程");
      return;
    }

    // 获取第一个未保存的议程
    const newAgenda = activeVenue.agendas.find(agenda => agenda.ID === null);

    if (!newAgenda) {
      message.warning("当前会场没有新议程需要添加");
      return;
    }

    try {
      // 调用添加议程接口
      const result = await addAgendaToSession(activeVenue.ID, {
        topic: newAgenda.topic,
        start_time: newAgenda.start_time,
        end_time: newAgenda.end_time,
        speakers: newAgenda.speakers.map(speaker => ({
          name: speaker.name,
          avatar: speaker.avatar || '',
          title: speaker.title || '',
        })),
      });

      if (result.success) {
        message.success(`成功为会场 "${activeVenue.name}" 添加议程: ${newAgenda.topic}`);

        // 重新获取数据更新本地状态
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

          // 保持当前激活的会场
          const currentVenue = updatedVenues.find(v => v.ID === activeVenue.ID);
          if (currentVenue) {
            setActiveVenueId(getUniqueId(currentVenue));
          }
        }
      } else {
        message.error(result.message || "添加议程失败");
      }

    } catch (error) {
      console.error("添加议程异常:", error);
      message.error("添加失败，请稍后重试");
    }
  }

  // 生成/更新单个会场
  const handleSaveVenue = async () => {
    try {
      // 验证表单
      await form.validateFields();


      const venue = activeVenue;

      // 如果 venue.ID 是 null，说明是新建的会场
      if (venue.ID === null) {
        // 创建新会场
        const result = await createSession(eventId, {
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

        if (result.success) {
          message.success("会场生成成功");
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
            // 找到刚创建的会场并设为活动状态
            const newVenue = updatedVenues.find(v => v.name === venue.name);
            if (newVenue) {
              setActiveVenueId(getUniqueId(newVenue));
            }
          }
        } else {
          message.error(result.message || "生成会场失败");
        }
      } else {
        // 更新已存在的会场
        const result = await updateSession(eventId, venue.ID, {
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

        if (result.success) {
          message.success("会场更新成功");
        } else {
          message.error(result.message || "更新会场失败");
        }
      }
    } catch (error) {
      console.error("保存会场数据异常:", error);
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

  return (
    <div className={`${styles.container} nav-t-top`}>
      {contextHolder}
      <div className={styles.contentWrapper}>
        <div className={styles.tabsBar}>
          <div className={styles.tabsList}>
            {venues.map((venue, index) => (
              <div
                key={getUniqueId(venue)}
                className={`${styles.tab} ${activeVenueId === getUniqueId(venue) ? styles.tabActive : ""}`}
                onClick={() => setActiveVenueId(getUniqueId(venue))}
              >
                {venue.name || `会场${index + 1}`}
                <Trash2
                  size={14}
                  className={styles.tabClose}
                  onClick={(e) => {
                    e.stopPropagation()
                    removeVenue(getUniqueId(venue))
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

            <Form
              form={form}
              layout="vertical"
              onValuesChange={(changedValues) => {
                // 当表单值改变时，同步更新会场数据
                Object.keys(changedValues).forEach(key => {
                  updateVenue(getUniqueId(activeVenue), key as keyof Venue, changedValues[key]);
                });
              }}
            >
              <Form.Item
                name="name"
                label="会场名称"
                rules={[{ required: true, message: '请输入会场名称' }]}
                className={styles.formGroup}
              >
                <Input placeholder="请输入会场名称" />
              </Form.Item>

              <Form.Item
                name="address"
                label="地址"
                rules={[{ required: true, message: '请输入会场地址' }]}
                className={styles.formGroup}
              >
                <Input placeholder="请输入会场地址" />
              </Form.Item>

              <Form.Item
                name="description"
                label="描述"
                className={styles.formGroup}
              >
                <TextArea rows={4} placeholder="请输入会场介绍" />
              </Form.Item>

              <Form.Item
                name="producer"
                label="出品人"
                rules={[{ required: true, message: '请输入出品人' }]}
                className={styles.formGroup}
              >
                <Input placeholder="请输入出品人" />
              </Form.Item>

              <Form.Item
                name="volunteers"
                label="志愿者（用逗号分隔）"
                className={styles.formGroup}
              >
                <Input placeholder="请输入志愿者" />
              </Form.Item>

              <Form.Item className={styles.formGroupBtn}>
                <Button
                  className={`${styles.submitBtn} ${activeVenue.ID === null ? styles.generateBtn : styles.updateBtn}`}
                  type="primary"
                  size="large"
                  icon={activeVenue.ID === null ? <Sparkles size={16} /> : undefined}
                  onClick={handleSaveVenue}
                >
                  {activeVenue.ID === null ? "生成会场" : "更新会场"}
                </Button>
              </Form.Item>
            </Form>
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
                onClick={() => addAgenda(getUniqueId(activeVenue))}
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
                <div key={getUniqueId(agenda)} className={styles.agendaCard}>
                  <div className={styles.agendaHeader}>
                    <span className={styles.agendaTitle}>议程 {agendaIndex + 1}</span>
                    <Button
                      type="link"
                      danger
                      size="small"
                      icon={agenda.ID === null ? <X size={14} /> : <Trash size={14} />}
                      onClick={() => removeAgenda(getUniqueId(activeVenue), getUniqueId(agenda))}
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
                          updateAgenda(getUniqueId(activeVenue), getUniqueId(agenda), "start_time", time ? time.format("YYYY-MM-DD HH:mm:ss") : "")
                        }
                        className={styles.timePicker}
                        disabled={agenda.ID !== null}
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
                          updateAgenda(getUniqueId(activeVenue), getUniqueId(agenda), "end_time", time ? time.format("YYYY-MM-DD HH:mm:ss") : "")
                        }
                        className={styles.timePicker}
                        disabled={agenda.ID !== null}
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
                      onChange={(e) => updateAgenda(getUniqueId(activeVenue), getUniqueId(agenda), "topic", e.target.value)}
                      disabled={agenda.ID !== null}
                    />
                  </div>

                  <div className={styles.speakersSection}>
                    <div className={styles.speakersHeader}>
                      <label className={styles.label}>嘉宾</label>
                      <Button
                        type="dashed"
                        size="small"
                        icon={<Plus size={14} />}
                        onClick={() => addSpeaker(getUniqueId(activeVenue), getUniqueId(agenda))}
                        className={styles.addSpeakerBtn}
                        disabled={agenda.ID !== null}
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
                        <div key={getUniqueId(speaker)} className={styles.speakerItem}>
                          <div className={styles.speakerRow}>
                            <div className={styles.speakerField}>
                              <label className={styles.smallLabel}>
                                <span className={styles.required}>*</span> 姓名
                              </label>
                              <Input
                                placeholder="请输入姓名"
                                value={speaker.name || ''}
                                onChange={(e) =>
                                  updateSpeaker(getUniqueId(activeVenue), getUniqueId(agenda), getUniqueId(speaker), "name", e.target.value)
                                }
                                disabled={speaker.ID !== null}
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
                                  updateSpeaker(getUniqueId(activeVenue), getUniqueId(agenda), getUniqueId(speaker), "title", e.target.value)
                                }
                                disabled={speaker.ID !== null}
                              />
                            </div>
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.smallLabel}>头像 URL</label>
                            <Input
                              placeholder="请输入头像 URL"
                              value={speaker.avatar || ''}
                              onChange={(e) =>
                                updateSpeaker(getUniqueId(activeVenue), getUniqueId(agenda), getUniqueId(speaker), "avatar", e.target.value)
                              }
                              disabled={speaker.ID !== null}
                            />
                          </div>
                          <Button
                            type="link"
                            danger
                            size="small"
                            icon={speaker.ID === null ? <X size={14} /> : <Trash size={14} />}
                            onClick={() => removeSpeaker(getUniqueId(activeVenue), getUniqueId(agenda), getUniqueId(speaker))}
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
            <Button
              type="primary"
              size="large"
              block
              disabled={!currentVenueGenerated}
              onClick={handleSubmitAgendas}
              className={styles.submitBtn}
            >
              提交议程
            </Button>
            {!currentVenueGenerated && (
              <div className={styles.submitTip}>
                请先生成当前会场后再提交议程
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}