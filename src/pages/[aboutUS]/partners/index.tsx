import styles from './index.module.css';

export default function PartnersPage() {
  return (
    <div className={`${styles.container} nav-t-top`}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>合作伙伴</h1>
            <p className={styles.subtitle}>携手共进，共建开源生态</p>
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        {/* 页面内容待添加 */}
      </div>
    </div>
  );
}