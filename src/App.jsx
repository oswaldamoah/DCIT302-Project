import React, { useState, useContext, useEffect } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Toolbar from './components/Toolbar';
import MenuBar from './components/MenuBar';
import TitleBar from './components/TitleBar';
import SidePanel from './components/SidePanel';
import SettingsPanel from './components/SettingsPanel';
import styles from './App.module.css';
import './index.css';

function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [displayFormat, setDisplayFormat] = useState('iconsAndText');
  const [sideWidth, setSideWidth] = useState(300);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.app}>
  <TitleBar />
  <MenuBar />
      <Toolbar
        displayFormat={displayFormat}
        setDisplayFormat={setDisplayFormat}
        theme={theme}
        toggleTheme={toggleTheme}
        sideWidth={sideWidth}
      />
      <SidePanel width={sideWidth} setWidth={setSideWidth} />
      {/* SettingsPanel can be triggered by settings button if needed */}
      {/* <SettingsPanel displayFormat={displayFormat} setDisplayFormat={setDisplayFormat} /> */}
      <div className={styles.content} style={{ marginLeft: sideWidth }}>
        <iframe
          src="/earth.html"
          title="Dummy Google Earth"
          scrolling="no"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '0',
            background: '#000',
            boxShadow: 'none',
            display: 'block'
          }}
          allowFullScreen
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
