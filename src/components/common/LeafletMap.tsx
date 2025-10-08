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
    
    // 设置图标默认配置，优先使用国内CDN
    const L = leafletModule
    delete (L.Icon.Default.prototype as any)._getIconUrl
    
    // 使用多个CDN源，包括国内镜像
    const iconSources = [
      {
        iconRetinaUrl: 'https://cdn.bootcdn.net/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdn.bootcdn.net/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdn.bootcdn.net/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      },
      {
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      }
    ]
    
    // 尝试加载第一个源，失败时使用备用源
    try {
      L.Icon.Default.mergeOptions(iconSources[0])
    } catch (error) {
      console.warn('国内CDN图标加载失败，使用备用CDN')
      L.Icon.Default.mergeOptions(iconSources[1])
    }
    
    return leafletModule
  }, [])

  // 获取最佳的瓦片图层服务
  const getTileLayer = useCallback((L: any) => {
    if (tileLayerCache) return tileLayerCache

    // 多个备用瓦片图层，优先使用国内高德地图服务
    const tileProviders = [
      {
        url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        options: {
          attribution: '© 高德地图',
          maxZoom: 18,
          timeout: 10000
        }
      },
      {
        url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
        options: {
          attribution: '© GeoQ',
          maxZoom: 18,
          timeout: 10000
        }
      },
      {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        options: {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
          subdomains: ['a', 'b', 'c'],
          timeout: 10000
        }
      },
      {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        options: {
          attribution: '© Esri',
          maxZoom: 18,
          timeout: 10000
        }
      }
    ]

    // 尝试依次加载各个图层
    for (let i = 0; i < tileProviders.length; i++) {
      try {
        tileLayerCache = L.tileLayer(tileProviders[i].url, tileProviders[i].options)
        return tileLayerCache
      } catch (error) {
        console.warn(`瓦片图层 ${i + 1} 加载失败，尝试下一个`)
        if (i === tileProviders.length - 1) {
          throw new Error('所有瓦片图层都无法加载')
        }
      }
    }
    
    return tileLayerCache
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
      
      // 设置超时处理
      const timeoutId = setTimeout(() => {
        console.error('地图加载超时')
        setIsLoading(false)
      }, 15000) // 15秒超时

      try {
        const leaflet = await Promise.race([
          loadLeaflet(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Leaflet模块加载超时')), 10000)
          )
        ])
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

        // 添加全球瓦片图层，带重试机制
        let tileLayer
        let retryCount = 0
        const maxRetries = 3
        
        while (retryCount < maxRetries) {
          try {
            tileLayer = getTileLayer(L)
            tileLayer.addTo(map)
            break
          } catch (error) {
            retryCount++
            console.warn(`瓦片图层加载失败，重试 ${retryCount}/${maxRetries}`)
            if (retryCount >= maxRetries) {
              throw new Error('所有瓦片图层重试后仍无法加载')
            }
            await new Promise(resolve => setTimeout(resolve, 1000)) // 等待1秒后重试
          }
        }

        mapInstanceRef.current = map
        
        // 添加标记点
        addMarkers(L, map)

        clearTimeout(timeoutId)
        onMapReady?.(map)
      } catch (error) {
        console.error('地图初始化失败:', error)
        clearTimeout(timeoutId)
        
        // 显示错误信息给用户
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100%;
              background: #f5f5f5;
              color: #666;
              text-align: center;
              padding: 20px;
            ">
              <div style="font-size: 16px; margin-bottom: 8px;">⚠️ 地图加载失败</div>
              <div style="font-size: 14px;">请检查网络连接或稍后重试</div>
            </div>
          `
        }
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