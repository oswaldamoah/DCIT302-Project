import React from 'react';
import styles from './MenuBar.module.css';

function MenuBar() {
  return (
    <div className={styles.menuBar}>
      <span className={styles.menuItem}><span className={styles.mnemonic}>F</span>ile</span>
      <span className={styles.menuItem}><span className={styles.mnemonic}>E</span>dit</span>
      <span className={styles.menuItem}><span className={styles.mnemonic}>V</span>iew</span>
      <span className={styles.menuItem}><span className={styles.mnemonic}>T</span>ools</span>
      <span className={styles.menuItem}><span className={styles.mnemonic}>A</span>dd</span>
      <span className={styles.menuItem}><span className={styles.mnemonic}>H</span>elp</span>
    </div>
  );
}

export default MenuBar;
