import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './DropdownMenu.module.css';
import ToolbarButton from './ToolbarButton';

function DropdownMenu({ items, onItemClick, displayFormat, forceShowText, anchorRef }) {
  // Start off-screen & hidden to avoid top-left flash before measurement
  const [pos, setPos] = useState({ top: -9999, left: -9999, visible: false });

  // useLayoutEffect so position calculation happens before paint
  useLayoutEffect(() => {
    function update() {
      if (anchorRef && anchorRef.current) {
        const r = anchorRef.current.getBoundingClientRect();
        // align left to anchor left, and show below anchor
        setPos({ top: r.bottom + 8, left: Math.max(8, r.left), visible: true });
      } else {
        // Fallback position (should rarely happen)
        setPos({ top: 80, left: 80, visible: true });
      }
    }
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [anchorRef, items]);

  const menuClass = displayFormat === 'iconsOnly' ? `${styles.menu} ${styles.compact}` : styles.menu;

  // Don't render until we have a measured position
  if (!pos.visible) return null;

  const menu = (
    <div
      className={menuClass}
      style={{ position: 'fixed', top: pos.top + 'px', left: pos.left + 'px', zIndex: 3000, visibility: pos.visible ? 'visible' : 'hidden' }}
    >
      {items.map((item) => (
        <ToolbarButton
          key={item.label}
            variant="dropdown"
          icon={item.icon}
          text={displayFormat === 'iconsOnly' && !forceShowText ? '' : item.label}
          displayFormat={displayFormat}
          onClick={() => onItemClick(item.label)}
        />
      ))}
    </div>
  );

  return ReactDOM.createPortal(menu, document.body);
}

export default DropdownMenu;
