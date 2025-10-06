import React, { useState, useRef, useCallback } from 'react';
import styles from './SidePanel.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';

function CollapsibleSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.section}>
      <button className={styles.sectionHeader} onClick={() => setOpen(o => !o)} type="button">
        <span className={styles.sectionChevron}>
          {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </span>
        <span className={styles.sectionTitle}>{title}</span>
      </button>
      {open && <div className={styles.sectionBody}>{children}</div>}
    </div>
  );
}

export default function SidePanel({ width, setWidth }) {
  const dragRef = useRef(null);
  const panelRef = useRef(null);

  const startDrag = useCallback((e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    function onMove(ev) {
      const delta = ev.clientX - startX;
      const next = Math.min(520, Math.max(200, startWidth + delta));
      setWidth(next);
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [width, setWidth]);

  return (
    <aside ref={panelRef} className={styles.sidePanel} style={{ width }}>
      <div className={styles.dragBar} ref={dragRef} onMouseDown={startDrag} />
      <div className={styles.scrollArea}>
        <CollapsibleSection title="Search" defaultOpen={true}>
          <div className={styles.searchBoxWrapper}>
            <div className={styles.searchInputWrapper}>
              <SearchIcon fontSize="small" className={styles.searchIcon} />
              <input className={styles.searchInput} placeholder="Search places" />
            </div>
            <div className={styles.searchHelp}>Examples: Accra, Mount Everest, 14.6N 2.1E</div>
          </div>
        </CollapsibleSection>
        <CollapsibleSection title="Places" defaultOpen={true}>
          <ul className={styles.tree}>
            <li>
              <span className={styles.folder}>My Places</span>
              <ul>
                <li><span className={styles.placemark}>Home Location</span></li>
                <li><span className={styles.placemark}>Interesting Spot</span></li>
              </ul>
            </li>
            <li><span className={styles.folder}>Temporary Places</span></li>
          </ul>
        </CollapsibleSection>
        <CollapsibleSection title="Layers" defaultOpen={true}>
          <ul className={styles.layers}>
            <li><label><input type="checkbox" defaultChecked /> Borders and Labels</label></li>
            <li><label><input type="checkbox" /> 3D Buildings</label></li>
            <li><label><input type="checkbox" defaultChecked /> Terrain</label></li>
            <li><label><input type="checkbox" /> Photos</label></li>
            <li><label><input type="checkbox" /> Roads</label></li>
          </ul>
        </CollapsibleSection>
      </div>
    </aside>
  );
}
