import React from 'react';
import styles from './MenuBar.module.css';

function MenuBar() {
  return (
    <div className={styles.menuBar}>
      <span className={styles.menuItem}>File</span>
      <span className={styles.menuItem}>Edit</span>
      <span className={styles.menuItem}>View</span>
      <span className={styles.menuItem}>Tools</span>
      <span className={styles.menuItem}>Add</span>
      <span className={styles.menuItem}>Help</span>
    </div>
  );
}

export default MenuBar;
