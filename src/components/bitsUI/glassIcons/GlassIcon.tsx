import React from 'react';

import styles from "./GlassIcon.module.css"

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const gradientMapping: Record<string, string> = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))'
};

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  return (
    <div className={`${styles.iconBtns} ${className || ''}`}>
      {items.map((item, index) => (
        <button key={index} type="button" className={`${styles.iconBtn} ${item.customClass || ''}`} aria-label={item.label}>
          <span className={styles.iconBtnBack} style={getBackgroundStyle(item.color)}></span>
          <span className={styles.iconBtnFront}>
            <span className={styles.iconBtnIcon} aria-hidden="true">
              {item.icon}
            </span>
          </span>
          <span className={styles.iconBtnLabel}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;
