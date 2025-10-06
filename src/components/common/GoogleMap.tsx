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
  markers = [],
  onMapReady
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
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
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry,places`
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
  }, [latitude, longitude, city, description, zoom, markers, onMapReady])

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