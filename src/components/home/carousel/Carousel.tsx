 
'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import styles from './Carousel.module.css'

const images = [
  '/img/rotation/activity1.png',
  '/img/rotation/activity2.png', 
  '/img/rotation/activity3.png',
  '/img/rotation/activity4.png',
  '/img/rotation/activity5.png'
]

export default function Carousel() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollDistance = window.innerWidth >= 1800 ? 425 : 407
      scrollContainerRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollDistance = window.innerWidth >= 1800 ? 425 : 407
      scrollContainerRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' })
    }
  }

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <section className={styles.carousel}>
      <div className={styles.container}>
        <button 
          className={styles.navButton + ' ' + styles.navLeft}
          onClick={scrollLeft}
          aria-label="Previous images"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className={styles.scrollContainer} ref={scrollContainerRef}>
          <div className={styles.imageGrid}>
            {images.map((src, index) => (
              <div 
                key={index} 
                className={styles.imageWrapper}
                onClick={() => openImageModal(src)}
              >
                <Image 
                  src={src} 
                  alt={`Activity ${index + 1}`}
                  width={400}
                  height={300}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          className={styles.navButton + ' ' + styles.navRight}
          onClick={scrollRight}
          aria-label="Next images"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={closeImageModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton}
              onClick={closeImageModal}
              aria-label="Close image"
            >
              <X size={24} />
            </button>
            <Image 
              src={selectedImage} 
              alt="Enlarged view"
              width={800}
              height={600}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </section>
  )
}
