import React, { useContext } from 'react';
import styles from './SettingsPanel.module.css';
import { ThemeContext } from '../context/ThemeContext';

function SettingsPanel({ displayFormat, setDisplayFormat }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={styles.panel}>
      <h3 className={styles.heading}>Settings</h3>
      <div className={styles.row}>
        <span>Theme:</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <span className={styles.slider}></span>
        </label>
        <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
      </div>
      <div className={styles.row}>
        <span>Display Format:</span>
        <select
          value={displayFormat}
          onChange={(e) => setDisplayFormat(e.target.value)}
          className={styles.select}
        >
          <option value="iconsOnly">Icons Only</option>
          <option value="textOnly">Text Only</option>
          <option value="iconsAndText">Icons + Text</option>
        </select>
      </div>
    </div>
  );
}

export default SettingsPanel;
