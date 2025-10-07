import React from 'react';
import styles from './ToolbarButton.module.css';

function ToolbarButton({ icon, text, displayFormat, onClick, ariaExpanded, isActive, variant }) {
  const showIcon = (displayFormat === 'iconsOnly' || displayFormat === 'iconsAndText' || variant === 'dropdown');
  const showText = (displayFormat === 'textOnly' || displayFormat === 'iconsAndText' || (variant === 'dropdown' && text));
  const classes = [styles.button, isActive ? styles.active : '', variant === 'dropdown' ? styles.dropdownVariant : ''].filter(Boolean).join(' ');
  return (
    <button
      className={classes}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      tabIndex={0}
      type="button"
    >
      {showIcon && icon && (
        <span className={styles.icon}>{icon}</span>
      )}
      {showText && text && (
        <span className={styles.text}>{text}</span>
      )}
    </button>
  );
}

export default ToolbarButton;
