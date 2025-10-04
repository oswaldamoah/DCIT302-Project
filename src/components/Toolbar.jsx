import React, { useContext, useRef } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ToolbarButton from './ToolbarButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DropdownMenu from './DropdownMenu';
import { ThemeContext } from '../context/ThemeContext';
import styles from './Toolbar.module.css';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StraightenIcon from '@mui/icons-material/Straighten';
import PublicIcon from '@mui/icons-material/Public';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Dropdown icons
import PlaceIcon from '@mui/icons-material/Place';
import CategoryIcon from '@mui/icons-material/Category';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ImageIcon from '@mui/icons-material/Image';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import EmailIcon from '@mui/icons-material/Email';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

import SaveAltIcon from '@mui/icons-material/SaveAlt';

import MapIcon from '@mui/icons-material/Map';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import FlightIcon from '@mui/icons-material/Flight';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const planetItems = [
  { label: 'Earth', icon: <PublicIcon fontSize="large" /> },
  { label: 'Sky', icon: <FlightIcon fontSize="large" /> },
  { label: 'Moon', icon: <NightsStayIcon fontSize="large" /> },
  { label: 'Mars', icon: <TravelExploreIcon fontSize="large" style={{color: '#cd5c5c'}} /> },
];

const addItems = [
  { label: 'Add Placemark', icon: <PlaceIcon fontSize="large" /> },
  { label: 'Add Polygon', icon: <CategoryIcon fontSize="large" /> },
  { label: 'Add Path', icon: <ShowChartIcon fontSize="large" /> },
  { label: 'Add Image Overlay', icon: <ImageIcon fontSize="large" /> },
];

const showItems = [
  { label: 'Show Historical Imagery', icon: <ScheduleIcon fontSize="large" /> },
  { label: 'Show Sunlight', icon: <WbSunnyIcon fontSize="large" /> },
];
const shareItems = [
  { label: 'Email', icon: <EmailIcon fontSize="large" /> },
  { label: 'Print', icon: <LocalPrintshopIcon fontSize="large" /> },
  { label: 'Save Image', icon: <SaveAltIcon fontSize="large" /> },
  { label: 'View in Google Maps', icon: <MapIcon fontSize="large" /> },
  { label: 'View in Google Earth Online', icon: <PublicIcon fontSize="large" /> },
];

function Toolbar({ displayFormat, setDisplayFormat, theme, toggleTheme }) {
  const {
    isAddMenuOpen,
    setIsAddMenuOpen,
    isShowMenuOpen,
    setIsShowMenuOpen,
    isShareMenuOpen,
    setIsShareMenuOpen,
    isPlanetMenuOpen,
    setIsPlanetMenuOpen,
    closeAllMenus,
    openMenu,
  } = useContext(ThemeContext);
  const toolbarRef = useRef();
  const addRef = useRef(null);
  const showRef = useRef(null);
  const planetRef = useRef(null);
  const shareRef = useRef(null);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    function handleClick(e) {
      if (!toolbarRef.current.contains(e.target)) {
        closeAllMenus();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [closeAllMenus]);

  return (
    <div className={styles.toolbar} ref={toolbarRef}>
      {/* Button Groups */}
      <div className={styles.leftGroups}>
  <div className={styles.group} ref={addRef}>
          <ToolbarButton
            icon={<>{<AddIcon fontSize="large" />} {displayFormat === 'iconsOnly' && <ArrowDropDownIcon fontSize="small" style={{ marginLeft: '2px' }} />}</>}
            text={displayFormat === 'iconsOnly' ? '' : <>Add <ArrowDropDownIcon fontSize="small" style={{verticalAlign:'middle'}} /></>}
            displayFormat={displayFormat}
            onClick={() => openMenu('add')}
            isActive={isAddMenuOpen}
            ariaExpanded={isAddMenuOpen}
          />
          {isAddMenuOpen && (
            <DropdownMenu
              items={addItems}
              anchorRef={addRef}
              onItemClick={(label) => {
                console.log(`Action: ${label}`);
                setIsAddMenuOpen(false);
              }}
              displayFormat={displayFormat}
            />
          )}
        </div>
  <div className={styles.group} ref={showRef}>
          <ToolbarButton
            icon={<>{<VisibilityIcon fontSize="large" />} {displayFormat === 'iconsOnly' && <ArrowDropDownIcon fontSize="small" style={{ marginLeft: '2px' }} />}</>}
            text={displayFormat === 'iconsOnly' ? '' : <>Show <ArrowDropDownIcon fontSize="small" style={{verticalAlign:'middle'}} /></>}
            displayFormat={displayFormat}
            onClick={() => openMenu('show')}
            isActive={isShowMenuOpen}
            ariaExpanded={isShowMenuOpen}
          />
          {isShowMenuOpen && (
            <DropdownMenu
              items={showItems}
              anchorRef={showRef}
              onItemClick={(label) => {
                console.log(`Action: ${label}`);
                setIsShowMenuOpen(false);
              }}
              displayFormat={displayFormat}
            />
          )}
        </div>
  <div className={styles.group} ref={planetRef}>
          {/* Planet button with dropdown */}
          <ToolbarButton
            icon={<><PublicIcon fontSize="large" />{displayFormat === 'iconsOnly' && <ArrowDropDownIcon fontSize="small" style={{marginLeft: '2px'}} />}</>}
            text={displayFormat === 'iconsOnly' ? '' : <>Planet <ArrowDropDownIcon fontSize="small" style={{verticalAlign:'middle'}} /></>}
            displayFormat={displayFormat}
            onClick={() => openMenu('planet')}
            isActive={isPlanetMenuOpen}
            ariaExpanded={isPlanetMenuOpen}
          />
          {isPlanetMenuOpen && (
            <DropdownMenu
              items={planetItems}
              anchorRef={planetRef}
              onItemClick={(label) => {
                console.log(`Action: Planet - ${label}`);
                setIsPlanetMenuOpen(false);
              }}
              displayFormat={displayFormat}
              forceShowText={true}
            />
          )}
          <ToolbarButton
            icon={<StraightenIcon fontSize="large" />}
            text="Ruler"
            displayFormat={displayFormat}
            onClick={() => console.log('Action: Ruler')}
          />
          <ToolbarButton
            icon={<PhotoCameraIcon fontSize="large" />}
            text="Camera"
            displayFormat={displayFormat}
            onClick={() => console.log('Action: Camera')}
          />
          <div style={{ position: 'relative' }} ref={shareRef}>
            <ToolbarButton
              icon={<>{<OpenInNewIcon fontSize="large" />} {displayFormat === 'iconsOnly' && <ArrowDropDownIcon fontSize="small" style={{ marginLeft: '2px' }} />}</>}
              text={displayFormat === 'iconsOnly' ? '' : <>Share <ArrowDropDownIcon fontSize="small" style={{verticalAlign:'middle'}} /></>}
              displayFormat={displayFormat}
              onClick={() => openMenu('share')}
              isActive={isShareMenuOpen}
              ariaExpanded={isShareMenuOpen}
            />
            {isShareMenuOpen && (
              <DropdownMenu
                items={shareItems}
                anchorRef={shareRef}
                onItemClick={(label) => {
                  console.log(`Action: ${label}`);
                  setIsShareMenuOpen(false);
                }}
                displayFormat={displayFormat}
              />
            )}
          </div>
  </div>
      </div>
      {/* Toolbar Right: Display Format, Theme Toggle, Settings */}
      <div className={styles.toolbarRight}>
        {/* Display Format Dropdown */}
        <div className={styles.displaySelectWrapper}>
          <select
            className={styles.displaySelect}
            value={displayFormat}
            onChange={e => setDisplayFormat(e.target.value)}
          >
            <option value="iconsOnly">Icons Only</option>
            <option value="textOnly">Text Only</option>
            <option value="iconsAndText">Icons + Text</option>
          </select>
        </div>
        {/* Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.7px' }}>
          <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
            {theme === 'dark' ? <Brightness4Icon fontSize="small" /> : <Brightness7Icon fontSize="small" />}
          </span>
          <label className={styles.themeSwitch}>
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span className={styles.themeSlider}></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
