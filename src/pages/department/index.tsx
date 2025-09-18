import { useEffect, useRef, useState } from "react"
import * as echarts from "echarts"
import styles from "./index.module.css"

interface TreeNode {
    name: string
    children?: TreeNode[]
    symbolSize?: number
    itemStyle?: {
        color?: string
    }
    label?: {
        show?: boolean
    }
}

export default function DepartmentPage() {
    const chartRef = useRef<HTMLDivElement>(null)
    const chartInstance = useRef<echarts.ECharts | null>(null)
    const [showActiveDepts, setShowActiveDepts] = useState(false) // Default to false to match the second image

    const orgData: TreeNode = {
        name: "社员大会",
        symbolSize: 40,
        itemStyle: {
            color: "#4A90E2",
        },
        children: [
            {
                name: "理事会",
                symbolSize: 30,
                itemStyle: {
                    color: "#F5A623",
                },
                children: [
                    {
                        name: "COSCon组委会",
                        symbolSize: 30,
                        itemStyle: {
                            color: "#028bd0ff",
                        },
                    },
                    {
                        name: "执行委员会",
                        symbolSize: 30,
                        itemStyle: {
                            color: "#7ED321",
                        },
                        children: [
                            { name: "社区合作组", symbolSize: 18 },
                            { name: "开源社城市社区（KCC）工作组", symbolSize: 18 },
                            { name: "ONES 开源研究院院组", symbolSize: 18 },
                            { name: "法务组", symbolSize: 18 },
                            { name: "开源公益组", symbolSize: 18 },
                            { name: "活动组", symbolSize: 18 },
                            { name: "高校合作/开源教育组", symbolSize: 18 },
                            { name: "开源硬件组", symbolSize: 18 },
                            { name: "媒体组", symbolSize: 18 },
                            { name: "财务组", symbolSize: 18 },
                            { name: "成员发展组", symbolSize: 18 },
                            { name: "顾问委员会服务组", symbolSize: 18 },
                            { name: "国际接轨组", symbolSize: 18 },
                        ],
                    },
                    {
                        name: "项目委员会",
                        symbolSize: 30,
                        itemStyle: {
                            color: "#50E3C2",
                        },
                        children: [
                            { name: "新冠援助平台项目组", symbolSize: 18 },
                            { name: "开源社官网项目组", symbolSize: 18 },
                            { name: "OSS.Chat 项目组", symbolSize: 18 },
                            { name: "中国开源地图项目组", symbolSize: 18 },
                            { name: "KToken 项目组", symbolSize: 18 },
                            { name: "小溪机器人项目组", symbolSize: 18 },
                            { name: "中国开源年度报告项目组", symbolSize: 18 },
                            { name: "开放黑客松项目组", symbolSize: 18 },
                        ],
                    },
                ]
            },
            {
                name: "顾问委员会",
                symbolSize: 30,
                itemStyle: {
                    color: "#B8E986",
                },
            },
            {
                name: "法律咨询委员会",
                symbolSize: 30,
                itemStyle: {
                    color: "#D0021B",
                },
            },
        ],
    };

    const simpleOrgData: TreeNode = {
        name: "社员大会",
        symbolSize: 30,
        itemStyle: {
            color: "#4A90E2",
        },
        children: [
            {
                name: "理事会",
                symbolSize: 25,
                itemStyle: {
                    color: "#7ED321",
                },
                children: [
                    {
                        name: "COSCon组委会",
                        symbolSize: 25,
                        itemStyle: {
                            color: "#7ED321",
                        },
                    },
                    {
                        name: "执行委员会",
                        symbolSize: 25,
                        itemStyle: {
                            color: "#B8E986",
                        },
                        children: [
                            {
                                name: "基础设施组",
                                symbolSize: 25,
                                itemStyle: {
                                    color: "#7ED321",
                                },
                            },]
                    },
                    {
                        name: "项目委员会",
                        symbolSize: 25,
                        itemStyle: {
                            color: "#D0021B",
                        },
                    },
                ],
            },
            {
                name: "顾问委员会",
                symbolSize: 25,
                itemStyle: {
                    color: "#B8E986",
                },
            },
            {
                name: "法律咨询委员会",
                symbolSize: 25,
                itemStyle: {
                    color: "#D0021B",
                },
            },
        ],
    }

    useEffect(() => {
        if (chartRef.current) {
            // 初始化图表
            chartInstance.current = echarts.init(chartRef.current)

            // 更新图表
            updateChart()
        }

        // 清理函数
        return () => {
            if (chartInstance.current) {
                chartInstance.current.dispose()
            }
        }
    }, [])

    useEffect(() => {
        updateChart()
    }, [showActiveDepts])

    const updateChart = () => {
        if (!chartInstance.current) return

        const currentData = showActiveDepts ? orgData : simpleOrgData

        const option = {
            tooltip: {
                trigger: "item",
                triggerOn: "mousemove",
            },
            series: [
                {
                    type: "tree",
                    data: [currentData],
                    top: "5%",
                    left: "10%",
                    bottom: "5%",
                    right: "15%",
                    layout: "orthogonal",
                    orient: "LR",
                    roam: true,
                    symbolSize: (value: any, params: any) => {
                        return params.data.symbolSize || 20
                    },
                    label: {
                        show: true,
                        position: "left",
                        verticalAlign: "middle",
                        align: "right",
                        fontSize: 11,
                        color: "#333",
                        distance: 4,
                    },
                    leaves: {
                        label: {
                            position: "right",
                            verticalAlign: "middle",
                            align: "left",
                            distance: 5,
                        },
                    },
                    emphasis: {
                        focus: "descendant",
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750,
                    lineStyle: {
                        color: "#ccc",
                        width: 1.5,
                        curveness: 0.2,
                    },
                    initialTreeDepth: showActiveDepts ? -1 : 3,
                },
            ],
        }

        chartInstance.current.clear()
        chartInstance.current.setOption(option, true)
    }

    // 处理窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            if (chartInstance.current) {
                chartInstance.current.resize()
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>组织架构全景图</h1>
                <div className={styles.toggleContainer}>
                    <span className={styles.toggleLabel}>显示活跃部门</span>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={showActiveDepts} onChange={(e) => setShowActiveDepts(e.target.checked)} />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>
            <div className={styles.chartContainer}>
                <div ref={chartRef} className={styles.chart}></div>
            </div>
        </div>
    )
}
