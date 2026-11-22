# 지형 등고선 기반 대화형 지역 탐색
### Topography & Regional Exploration Platform for Web Programming Project

* **Author / 작성자 :** 25101198 체 아담 하리스 빈 체 모하마드 슈크리 (Che Adam Haris)
* **Project Status :** Week 11 Progress Complete (Core UI & Interactive Map Layers Stabilized)


## Project Overview | 프로젝트 개요
**지형 등고선 기반 대화형 지역 탐색 (Topography & Regional Exploration Platform)** is an interactive, bilingual (Korean/English) web-based GIS (Geographic Information System) application built to visualize topographic elevation contours and explore regional geographic coordinates.

## Current Features (Weeks 9-11) | 현재 구현 기능
* **Interactive Topographic Layer Control (지형 레이어 제어):**
  * Combines a base OpenStreetMap layer with an `OpenTopoMap` elevation and contour overlay using **Leaflet.js**.
  * Real-time layer toggling (`addLayer` / `removeLayer`) controlled via a custom pill-shaped toggle switch in the sidebar.
* **Bilingual Interface (한국어 / English 다국어 지원):**
  * Instant UI switching between Korean and English via `data-i18n` attributes and active button state indicators.
* **Click-to-Inspect Coordinates & Visual Feedback (좌표 조회 및 시각적 피드백):**
  * Clicking anywhere on the map renders an interactive circular marker (`circleMarker`) and displays formatted Latitude and Longitude badges inside the sidebar's regional info panel.
  * Custom `crosshair` map cursor for precise GIS point selection.
* **Modern Responsive Card UI (모던 반응형 카드 레이아웃):**
  * Built with semantic HTML5 (`<header>`, `<aside>`, `<main>`), CSS Variables (`:root`), and CSS Flexbox, adapting cleanly across desktop and mobile viewports.

## Tech Stack | 기술 스택
* **Frontend Structure:** HTML5 (Semantic Markup)
* **Styling & Layout:** CSS3 (CSS Variables, Flexbox, Grid, Custom Toggle Switches, Media Queries)
* **GIS & Mapping Engine:** JavaScript (ES6+), [Leaflet.js v1.9.4](https://leafletjs.com/)
* **Map Tile Providers:** OpenStreetMap & OpenTopoMap

## Project Structure | 프로젝트 구조
```text
├── index.html          #main HTML layout & bilingual data-i18n tags
├── styles/
│   └── style.css       #theme variables, card UI, toggle switches, responsive rules
├── js/
│   ├── map.js          #leaflet map initialization, tile layers, click markers
│   ├── main.js         #UI event listeners & layer toggle state logic
│   └── lang.js         #Korean / English dictionary & language switching logic
└── README.md           #Project documentation & development roadmap
```

## Website Address | 실행 방법
https://chechechomell.github.io/web-programming-topography-project/

## Development Progress & Roadmap | 개발 진행 현황 및 향후 계획
**[DONE on 11.10!] Week 9-10 : Foundation & Core Map Integration**
- Set up project directory structure, Leaflet.js map initialization centered on Seoul, and base Korean/English translation dictionary.

**[DONE on 11.16!] Week 11 : UI/UX Overhaul & Stabilization**
- Redesigned the interface into a modern card-based sidebar layout with semantic HTML and CSS variables.
- Added custom toggle switches for the OpenTopoMap contour layer and formatted coordinate badges.
- Resolved CSS Flexbox #map height collapse issues and fixed Leaflet CDN script loading.

**[] Week 12 : Advanced GIS & Exploration Tools**
- Real-Time Elevation Lookup : Fetch altitude (m) asynchronously via open elevation APIs (Open-Meteo) on map click.
- Curated Topographic Landmarks : Add quick-jump presets (map.flyTo()) for major Seoul peaks and terrain landmarks (Bukhansan, Namsan, Gwanaksan, etc.).
- Interactive Distance & Elevation Measurement Tool : Multi-point path drawing (L.polyline) with total distance (distanceTo()) and elevation gain/loss calculation.
- Coordinate Search & Reset View : Direct coordinate navigation input and a one-click reset button to return to central Seoul.