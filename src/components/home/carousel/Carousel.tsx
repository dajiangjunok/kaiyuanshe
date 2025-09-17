 
import styles from './Carousel.module.css'
 import CircularGallery from '@/components/bitsUI/circularGallery/CircularGallery'

export default function Carousel() {
 

 

  return (
    <section className={styles.carousel}>
      <div className={styles.container}>
         <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
      </div>
    </section>
  )
}
