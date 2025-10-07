import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './DropdownMenu.module.css';
import ToolbarButton from './ToolbarButton';

function DropdownMenu({ items, onItemClick, displayFormat, forceShowText, anchorRef }) {
  const [pos, setPos] = useState({ top: 0, left: 0, visible: false });

  useEffect(() => {
    function update() {
      if (anchorRef && anchorRef.current) {
        const r = anchorRef.current.getBoundingClientRect();
        // align left to anchor left, and show below anchor
        setPos({ top: r.bottom + 8, left: Math.max(8, r.left), visible: true });
      } else {
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

  const menu = (
    <div
      className={menuClass}
      style={{ position: 'fixed', top: pos.top + 'px', left: pos.left + 'px', zIndex: 3000 }}
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
