import React from 'react';
import styles from './ToolbarButton.module.css';

function ToolbarButton({ icon, text, displayFormat, onClick, ariaExpanded, isActive }) {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      tabIndex={0}
      type="button"
    >
      {(displayFormat === 'iconsOnly' || displayFormat === 'iconsAndText') && (
        <span className={styles.icon}>{icon}</span>
      )}
      {(displayFormat === 'textOnly' || displayFormat === 'iconsAndText') && (
        <span className={styles.text}>{text}</span>
      )}
    </button>
  );
}

export default ToolbarButton;
