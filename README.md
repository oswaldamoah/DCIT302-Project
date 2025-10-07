<div align="center">
  <h1>Google Earth Pro (Prototype)</h1>
  <p><strong>A modern, theme‑aware, UX‑improved re‑imagining of the classic Google Earth Pro desktop toolbar & UI — built with React + Vite.</strong></p>
  <p><em>Focus: better discoverability, grouping, dark mode, responsive layout, PWA install, and extensibility.</em></p>
</div>

> NOTE: This is an educational prototype, not an official Google product. Trademarks belong to their respective owners.

---

## Why This Prototype?
Classic Google Earth Pro is powerful, but:

| Pain Point (Classic) | Improvement (Prototype) |
|----------------------|--------------------------|
| Small, dense, ungrouped icons | Grouped dropdown clusters (Add, Show, Planet, Share) |
| No dark mode | Full light/dark theming with CSS variables |
| Must memorize icon meanings | Selectable display modes: Icons Only / Text Only / Icons + Text |
| Wasted horizontal space | Responsive auto-compaction to Icons Only when narrow |
| Static sidebar | Resizable side panel (Search / Places / Layers) |
| No quick theme toggle | Instant theme switch (context) |
| Limited install/offline feel | PWA manifest + service worker caching |
| Dropdown flicker issues (legacy UIs) | Measured, flicker-free anchored menus |

This prototype explores an ergonomic, accessible, future‑friendly Earth Pro UI model.

---

## Core Features
### 1. Adaptive Toolbar
Grouped tools with clear state, dropdown arrows only when meaningful, single-open policy for clarity.

### 2. Multi Display Modes
User can choose Icons Only, Text Only, or Icons + Text. Automatic downgrade to Icons Only on tight widths (< responsive threshold).

### 3. Dark / Light Theming
Centralized theme context + CSS custom properties ensure every surface (menu bar, toolbar, side panel, dropdowns) updates instantly.

### 4. Resizable Side Panel
Collapsible sections for Search, Places, Layers. Drag-to-resize with layout-aware toolbar offset.

### 5. Planet Selector
Prototype domain switcher (Earth, Sky, Moon, Mars) to explore multi-context Earth-type UIs.

### 6. Share & Add Menus
Stubbed flows (Email, Print, Save Image, Image Overlay, Polygon, Path, Placemark) ready for real logic injection.

### 7. Flicker-Free Dropdowns
Dropdowns render only after anchor measurement (prevents top-left flash positioning glitch).

### 8. PWA Ready
Manifest + service worker with network-first strategy for HTML/manifest (fresh updates) and cache-first for static assets.

### 9. Three.js Interactive Globe
Lightweight spinning Earth with inertia + zoom; fallback canvas texture guarantees something renders even offline.

### 10. Better UX & Accessibility Foundation
Clear active states, larger click targets, logical grouping reduces cognitive load.

---

## Screenshots
| UI | Preview |
|----|---------|
| Toolbar (Dark Mode) | ![Dark Mode](./public/media/s1.png) |
| Light Mode Layout | ![Light Mode](./public/media/s2.png) |
| Side Panel & Dropdowns | ![Panels](./public/media/s3.png) |
| Planet Selector | ![Planet](./public/media/s4.png) |

## Demo Video
Inline (may not render everywhere):

<video src="./public/media/11046928_OswaldAmoah_GoogleEarthPro.mp4" controls width="640"></video>

Direct file path: `public/media/11046928_OswaldAmoah_GoogleEarthPro.mp4`

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Core Framework | React (with Hooks) |
| Build Tool | Vite |
| Styling | CSS Modules + CSS variables (themes) |
| Icons | Material UI Icons (MUI) |
| 3D Globe | Three.js (minimal setup) |
| PWA | Manifest + custom service worker |

---

## Project Structure (Simplified)
```
public/
  earth.html            # Three.js globe sandbox
  manifest.webmanifest  # PWA metadata
  sw.js                 # Service worker (v2) freshness strategy
  media/                # Screenshots & demo video
src/
  context/ThemeContext  # Theme + dropdown open state
  components/           # Toolbar, Menus, SidePanel, etc.
  App.jsx               # App composition root
  index.css             # Global styles + variables
```

---

## Getting Started
### Prerequisites
- Node.js 18+ recommended

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Built App
```bash
npm run preview
```

### Test PWA Install
1. Run dev or preview.
2. Open DevTools → Application → Manifest (verify name & icons).
3. Install (Chrome: Omnibox install icon / menu).
4. Toggle Offline in DevTools Network and reload (fallback Earth still renders).

---

## Caching & Update Strategy
| Asset | Strategy |
|-------|----------|
| HTML / manifest | Network-first (ensures fresh title & meta) |
| Icons / images | Cache-first |
| Other GET | Cached after first successful fetch |

Force update steps:
1. DevTools → Application → Service Workers → Unregister.
2. Hard reload (Ctrl+Shift+R).

---

## Design Principles
1. Progressive Clarity – degrade gracefully from verbose to compact.
2. Measured Rendering – avoid layout flashes (dropdown anchoring fix).
3. Thematic Consistency – one source of truth for color tokens.
4. Extensibility – data-driven tool groups.
5. Resilience – fallback globe texture prevents blank screens.

---

## Roadmap / Ideas
- Keyboard navigation & full ARIA roles.
- Persist user preferences (theme, panel width, display mode) in localStorage.
- Layer filtering & search integration.
- Plugin/extension API for adding new tool groups.
- Higher fidelity planetary textures + atmosphere shader.
- Export / capture utilities (screenshot pipeline).

---

## Known Limitations
- Globe is a simplified placeholder (not production Earth engine).
- Share / Add actions are stubs (console logging only).
- Accessibility not fully audited (needs tab order & ARIA polish).
- Limited error UI if external texture fails (console warnings only).

---

## Contributing
Feedback & lightweight contributions welcome:
- Open an issue for UX or performance ideas.
- Submit PRs that are scoped & documented.

Please discuss major feature additions first to keep scope focused.

---

## License
Not yet licensed (prototype). Add an OSI-approved license (MIT, Apache 2.0, etc.) before any external redistribution.

---

## Credits
- Three.js – 3D rendering
- Material UI Icons – iconography
- Original Google Earth Pro UI – conceptual inspiration

---

## Quick FAQ
**Why call it “Pro (Prototype)”?** To clearly differentiate from any official product and avoid confusion.

**Why reuse one PNG for multiple icon sizes?** Simplicity. For production, export optimized size-specific & maskable icons.

**Can this wrap the real Google Earth web app?** Potentially through an iframe or API layer—out of scope for this prototype.

---

Enjoy exploring the re-imagined interface. Feedback welcome!
