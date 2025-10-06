import React, { useEffect, useRef } from "react"
import styles from "./index.module.css"

declare global {
    interface Window {
        iFrameResize: any;
    }
}

export default function OrganizationPage() {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.4/js/iframeResizer.min.js'
        script.onload = () => {
            if (window.iFrameResize && iframeRef.current) {
                window.iFrameResize({ 
                    log: false,
                    scrolling: false,
                    autoResize: true,
                    heightCalculationMethod: 'documentElementOffset'
                }, iframeRef.current)
            }
        }
        document.head.appendChild(script)

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script)
            }
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.mapContainer}>
                <iframe
                    ref={iframeRef}
                    src="https://landscape.cncf.io/?iframe-resizer=true"
                    width="100%"
                    title="中国开源地图"
                    className={styles.landscapeFrame}
                    loading="lazy"
                />
            </div>
        </div>
    )
}
