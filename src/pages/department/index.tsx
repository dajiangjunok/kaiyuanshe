import { useEffect, useRef, useState, useCallback, useMemo } from "react"
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

    const orgData: TreeNode = useMemo(() => ({
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
    }), []);

    const simpleOrgData: TreeNode = useMemo(() => ({
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
    }), [])


    const updateChart = useCallback(() => {
        if (!chartInstance.current) return

        const currentData = showActiveDepts ? orgData : simpleOrgData
        
        // 检测是否为移动设备
        const isMobile = window.innerWidth <= 768
        const isSmallMobile = window.innerWidth <= 480

        const option = {
            tooltip: {
                trigger: "item",
                triggerOn: "mousemove",
                textStyle: {
                    fontSize: isMobile ? 11 : 12,
                },
                backgroundColor: "rgba(0,0,0,0.8)",
                borderColor: "transparent",
                borderRadius: 6,
                padding: [8, 12],
            },
            series: [
                {
                    type: "tree",
                    data: [currentData],
                    top: isMobile ? "3%" : "5%",
                    left: isMobile ? "5%" : "10%",
                    bottom: isMobile ? "3%" : "5%",
                    right: isMobile ? "8%" : "15%",
                    layout: "orthogonal",
                    orient: isMobile ? "TB" : "LR",
                    roam: true,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    symbolSize: (value: any, params: any) => {
                        const originalSize = params.data.symbolSize || 20
                        if (isSmallMobile) return Math.max(originalSize * 0.6, 12)
                        if (isMobile) return Math.max(originalSize * 0.75, 14)
                        return originalSize
                    },
                    label: {
                        show: true,
                        position: isMobile ? "bottom" : "left",
                        verticalAlign: isMobile ? "top" : "middle",
                        align: isMobile ? "center" : "right",
                        fontSize: isSmallMobile ? 10 : isMobile ? 11 : 14,
                        color: "#1a1a1a",
                        distance: isMobile ? 6 : 4,
                        fontWeight: "500",
                        overflow: "truncate",
                        width: isMobile ? 80 : 120,
                        lineHeight: isSmallMobile ? 12 : isMobile ? 14 : 16,
                    },
                    leaves: {
                        label: {
                            position: isMobile ? "bottom" : "right",
                            verticalAlign: isMobile ? "top" : "middle",
                            align: isMobile ? "center" : "left",
                            distance: isMobile ? 6 : 5,
                            fontSize: isSmallMobile ? 9 : isMobile ? 10 : 14,
                            color: "#1a1a1a",
                            fontWeight: "500",
                            overflow: "truncate",
                            width: isMobile ? 70 : 100,
                            lineHeight: isSmallMobile ? 11 : isMobile ? 12 : 16,
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
                        width: isMobile ? 1 : 1.5,
                        curveness: 0.2,
                    },
                    initialTreeDepth: showActiveDepts ? -1 : (isMobile ? 2 : 3),
                },
            ],
        }

        chartInstance.current.clear()
        chartInstance.current.setOption(option, true)
    }, [showActiveDepts, orgData, simpleOrgData])


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
    }, [updateChart])

    useEffect(() => {
        updateChart()
    }, [showActiveDepts, updateChart])
    

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
