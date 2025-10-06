'use client'

import { useEffect, useRef } from 'react'
import { Spin } from 'antd'
import styles from './GoogleMap.module.css'

interface GoogleMapProps {
  latitude?: number
  longitude?: number
  city?: string
  description?: string
  zoom?: number
  height?: string
  mapType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain'
  markers?: Array<{
    lat: number
    lng: number
    title?: string
    description?: string
  }>
  onMapReady?: (map: google.maps.Map) => void
}

export default function GoogleMap({
  latitude = 39.9042,
  longitude = 116.4074,
  city = '北京',
  description = '',
  zoom = 10,
  height = '400px',
  mapType = 'roadmap',
  markers = [],
  onMapReady
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return

      const getMapTypeId = (type: string) => {
        switch (type) {
          case 'satellite':
            return google.maps.MapTypeId.SATELLITE
          case 'hybrid':
            return google.maps.MapTypeId.HYBRID
          case 'terrain':
            return google.maps.MapTypeId.TERRAIN
          default:
            return google.maps.MapTypeId.ROADMAP
        }
      }

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom,
        mapTypeId: getMapTypeId(mapType),
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        // 添加中文地图样式配置
        language: 'zh-CN',
        region: 'CN',
        styles: [
          // 高德地图蓝色风格配置
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              { color: '#1890ff' }, // 水体使用蓝色
              { lightness: -10 }
            ]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
              { color: '#f5f7fa' }, // 陆地背景色
              { lightness: 20 }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              { color: '#40a9ff' }, // 高速公路蓝色
              { lightness: 10 }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              { color: '#69c0ff' }, // 主干道浅蓝色
              { lightness: 20 }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [
              { color: '#91d5ff' }, // 次要道路更浅的蓝色
              { lightness: 30 }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { color: '#bae7ff' }, // 兴趣点淡蓝色
              { lightness: 40 }
            ]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [
              { color: '#1890ff' }, // 交通设施蓝色
              { lightness: -5 }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#40a9ff' }, // 行政区划边界蓝色
              { weight: 1 }
            ]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#262626' } // 文字颜色
            ]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff' }, // 文字描边
              { weight: 2 }
            ]
          }
        ]
      })

      mapInstanceRef.current = map

      // 添加主要位置标记
      const mainMarker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: city,
        animation: google.maps.Animation.DROP,
      })

      // 如果有描述，添加信息窗口
      if (description) {
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
              <h3>${city}</h3>
              <p>${description}</p>
            </div>
          `,
        })

        mainMarker.addListener('click', () => {
          infoWindow.open(map, mainMarker)
        })
      }

      // 添加额外的标记点
      markers.forEach((marker, index) => {
        const mapMarker = new google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map,
          title: marker.title || `标记 ${index + 1}`,
          animation: google.maps.Animation.DROP,
        })

        if (marker.description) {
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div>
                <h3>${marker.title || '位置信息'}</h3>
                <p>${marker.description}</p>
              </div>
            `,
          })

          mapMarker.addListener('click', () => {
            infoWindow.open(map, mapMarker)
          })
        }
      })

      onMapReady?.(map)
    }

    // 检查 Google Maps API 是否已加载
    if (typeof google !== 'undefined' && google.maps) {
      initMap()
    } else {
      // 如果 Google Maps API 未加载，动态加载
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry,places&language=zh-CN&region=CN`
      script.async = true
      script.defer = true
      script.onload = initMap
      script.onerror = () => {
        console.error('Google Maps API 加载失败')
      }
      
      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        document.head.appendChild(script)
      }
    }
  }, [latitude, longitude, city, description, zoom, mapType, markers, onMapReady])

  return (
    <div className={styles.mapContainer} style={{ height }}>
      <div ref={mapRef} className={styles.map}>
        <div className={styles.loading}>
          <Spin size="large" tip="加载地图中..." />
        </div>
      </div>
    </div>
  )
}