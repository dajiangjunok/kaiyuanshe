'use client'

import { useEffect, useRef, useCallback, useMemo, useState } from 'react'
import { Spin } from 'antd'
import styles from './LeafletMap.module.css'

interface LeafletMapProps {
  latitude?: number
  longitude?: number
  city?: string
  description?: string
  zoom?: number
  height?: string
  markers?: Array<{
    lat: number
    lng: number
    title?: string
    description?: string
  }>
  onMapReady?: (map: any) => void
}

// 缓存 Leaflet 实例
let leafletModule: any = null
let tileLayerCache: any = null

export default function LeafletMap({
  latitude = 39.9042,
  longitude = 116.4074,
  city = '北京',
  description = '',
  zoom = 10,
  height = '400px',
  markers = [],
  onMapReady
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // 使用 useMemo 缓存标记点数据
  const memoizedMarkers = useMemo(() => markers, [JSON.stringify(markers)])

  // Intersection Observer 用于懒加载
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => observer.disconnect()
  }, [])
  
  // 预加载 Leaflet 模块
  const loadLeaflet = useCallback(async () => {
    if (leafletModule) return leafletModule
    
    leafletModule = await import('leaflet')
    
    // 设置图标默认配置
    const L = leafletModule
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })
    
    return leafletModule
  }, [])

  // 获取最佳的瓦片图层服务
  const getTileLayer = useCallback((L: any) => {
    if (tileLayerCache) return tileLayerCache

    // 多个备用瓦片图层，优先使用 OpenStreetMap
    const tileProviders = [
      {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        options: {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
          subdomains: ['a', 'b', 'c']
        }
      },
      {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        options: {
          attribution: '© Esri',
          maxZoom: 18
        }
      }
    ]

    try {
      tileLayerCache = L.tileLayer(tileProviders[0].url, tileProviders[0].options)
      return tileLayerCache
    } catch (error) {
      console.warn('主瓦片图层加载失败，使用备用图层')
      tileLayerCache = L.tileLayer(tileProviders[1].url, tileProviders[1].options)
      return tileLayerCache
    }
  }, [])
  
  // 清理标记点
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(marker)
      }
    })
    markersRef.current = []
  }, [])
  
  // 添加标记点（优化性能）
  const addMarkers = useCallback((L: any, map: any) => {
    clearMarkers()
    
    // 使用 LayerGroup 批量添加标记点，提高性能
    const markerGroup = L.layerGroup()
    
    // 添加主要位置标记
    const mainMarker = L.marker([latitude, longitude])
    markersRef.current.push(mainMarker)
    markerGroup.addLayer(mainMarker)
    
    const mainPopupContent = description 
      ? `<div><h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${city}</h3><p style="margin: 0; font-size: 14px;">${description}</p></div>`
      : `<div><h3 style="margin: 0; font-size: 16px; font-weight: bold;">${city}</h3></div>`
    
    mainMarker.bindPopup(mainPopupContent)
    
    // 批量添加其他标记点
    const additionalMarkers = memoizedMarkers.map((marker, index) => {
      const mapMarker = L.marker([marker.lat, marker.lng])
      markersRef.current.push(mapMarker)
      
      const popupContent = `
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${marker.title || `标记 ${index + 1}`}</h3>
          ${marker.description ? `<p style="margin: 0; font-size: 14px;">${marker.description}</p>` : ''}
        </div>
      `
      mapMarker.bindPopup(popupContent)
      markerGroup.addLayer(mapMarker)
      return mapMarker
    })
    
    // 一次性添加所有标记点到地图
    markerGroup.addTo(map)
    
    // 调整视图以显示所有标记
    if (memoizedMarkers.length > 0) {
      const group = new L.FeatureGroup([mainMarker, ...additionalMarkers])
      map.fitBounds(group.getBounds().pad(0.1))
    }
  }, [latitude, longitude, city, description, memoizedMarkers])

  // 初始化地图（仅在可见时加载）
  useEffect(() => {
    if (!isVisible) return

    const initMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return

      setIsLoading(true)
      try {
        const leaflet = await loadLeaflet()
        const L = leaflet

        // 创建地图实例，优化性能设置
        const map = L.map(mapRef.current, {
          preferCanvas: true, // 使用 Canvas 渲染，提高性能
          zoomControl: true,
          attributionControl: true,
          renderer: L.canvas(), // 强制使用 Canvas 渲染器
          zoomAnimation: true,
          fadeAnimation: true,
          markerZoomAnimation: true,
          // 性能优化选项
          worldCopyJump: true,
          maxBoundsViscosity: 1.0
        }).setView([latitude, longitude], zoom)

        // 添加全球瓦片图层
        const tileLayer = getTileLayer(L)
        tileLayer.addTo(map)

        mapInstanceRef.current = map
        
        // 添加标记点
        addMarkers(L, map)

        onMapReady?.(map)
      } catch (error) {
        console.error('地图初始化失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        clearMarkers()
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isVisible, latitude, longitude, zoom, getTileLayer, addMarkers, onMapReady])

  // 更新标记点
  useEffect(() => {
    if (!mapInstanceRef.current) return
    
    const leaflet = leafletModule
    if (!leaflet) return
    
    addMarkers(leaflet, mapInstanceRef.current)
  }, [addMarkers])

  // 更新地图中心和缩放级别
  useEffect(() => {
    if (!mapInstanceRef.current) return
    
    mapInstanceRef.current.setView([latitude, longitude], zoom, {
      animate: true,
      duration: 0.5
    })
  }, [latitude, longitude, zoom])

  return (
    <div className={styles.mapContainer} style={{ height }}>
      <div ref={mapRef} className={styles.map} />
      {(isLoading || (!mapInstanceRef.current && isVisible)) && (
        <div className={styles.loading}>
          <Spin size="large" tip="加载地图中..." />
        </div>
      )}
      {!isVisible && (
        <div className={styles.placeholder} style={{ height }}>
          <div className={styles.placeholderContent}>
            <Spin size="small" />
            <span style={{ marginLeft: 8 }}>地图即将加载...</span>
          </div>
        </div>
      )}
    </div>
  )
}