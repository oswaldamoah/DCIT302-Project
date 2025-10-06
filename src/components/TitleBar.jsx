import React from 'react';
import styles from './TitleBar.module.css';

export default function TitleBar() {
  return (
    <div className={styles.titleBar}>
      <div className={styles.windowRegion}>Google Earth Pro <span className={styles.prototype}>(Prototype)</span></div>
    </div>
  );
}
