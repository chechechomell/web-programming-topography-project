//map.js 25101198 체 아담 하리스 빈 체 모하마드 슈크리

//initialize Leaflet map centered on seoul
//turn "map" html element into interactive map
//37.5665 and 126.9780 is langitude and longitude value of seoul city
//10 is the initial zoom level
const map = L.map('map').setView([37.5665, 126.9780], 10);

//add openstreetmap tile layer so the map actually show up with visuals and roads
//maxZoom 19 means user cannot zoom in too deep past this level
//attribution is just required copyright text
const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//added OpenTopoMap layer on top of openstreetmap layer
//opentopomap is a specialized tile provider tht render topographic data, contour lines, n hillshading
//initialized to appear when the page loads
const contourLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);

//made it so when user click anywhere on map it get the latitude and longitude coordinate
//tofixed 4 make it only show 4 decimal numbers so it not too long
//find infopanel element in html sidebar and change its inner html to show clicked coordinates
let clickMarker = null;
let lastClickedData = null;

function formatElevationText(elevation, isLoading) {
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'ko';
    if (isLoading) {
        return translations[lang].loadingElevation;
    }
    if (typeof elevation === 'number' && !Number.isNaN(elevation)) {
        return `${elevation} m`;
    }
    return lang === 'ko' ? '조회 불가' : 'N/A';
}

function renderLocationInfo(lat, lng, elevation = null, isLoading = false) {
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'ko';
    const dict = translations[lang];
    const infoPanel = document.getElementById('infoPanel');

    infoPanel.innerHTML = `
        <div class="coord-grid">
            <div class="coord-box">
                <span class="coord-label">${dict.latLabel}</span>
                <span class="coord-val">${lat.toFixed(4)}°</span>
            </div>
            <div class="coord-box">
                <span class="coord-label">${dict.lngLabel}</span>
                <span class="coord-val">${lng.toFixed(4)}°</span>
            </div>
            <div class="coord-box elevation-box">
                <span class="coord-label">${dict.elevationLabel}</span>
                <span class="coord-val">${formatElevationText(elevation, isLoading)}</span>
            </div>
        </div>
    `;
}

async function fetchElevation(lat, lng) {
    const url = `https://api.open-meteo.com/v1/elevation?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lng)}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data.elevation) && typeof data.elevation[0] === 'number') {
        return data.elevation[0];
    }
    throw new Error('Invalid elevation payload');
}

map.on('click', async function(e) {
    const { lat, lng } = e.latlng;

    if (clickMarker) {
        clickMarker.setLatLng(e.latlng);
    } else {
        clickMarker = L.circleMarker(e.latlng, {
            radius: 7,
            fillColor: "#2563eb",
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
        }).addTo(map);
    }

    lastClickedData = { lat, lng, elevation: null, isLoading: true };
    renderLocationInfo(lat, lng, null, true);

    try {
        const elevation = await fetchElevation(lat, lng);
        //only update if the user hasn't clicked a newer spot in the meantime
        if (lastClickedData && lastClickedData.lat === lat && lastClickedData.lng === lng) {
            lastClickedData = { lat, lng, elevation, isLoading: false };
            renderLocationInfo(lat, lng, elevation, false);
        }
    } catch (error) {
        console.error('Elevation lookup failed:', error);
        if (lastClickedData && lastClickedData.lat === lat && lastClickedData.lng === lng) {
            lastClickedData = { lat, lng, elevation: null, isLoading: false };
            renderLocationInfo(lat, lng, null, false);
        }
    }
});

//tried adding a marker to mark certain important places
L.marker([37.5665, 126.9780]).addTo(map)
.bindPopup("<b>Seoul City Hall / 서울시청</b><br>a governmental building for the Seoul Metropolitan Government in South Korea, in charge of the administrative affairs of Seoul")
.openPopup();

//basic addeventlistener for 'toggle contour' checkbox
//add the contour layer map if checked and remove if unchecked
const toggleContourCheckbox = document.getElementById('toggleContour');

toggleContourCheckbox.addEventListener('change', function() {
    if (this.checked) {
        map.addLayer(contourLayer);
    } else {
        map.removeLayer(contourLayer);
    }
});

//list of seoul landmarks w names coor, zoom lvl n note
const topographicLandmarks = [
    {
        id: "bukhansan",
        name: { ko: "북한산", en: "Bukhansan" },
        coords: [37.6584, 126.9780],
        zoom: 13,
        note: {
            ko: "서울 경계 내에서 가장 높은 산으로, 백운대 봉우리의 높이는 836.5미터(2,744피트)에 달한다.",
            en: "the highest mountain within Seoul's boundaries, rising to 836.5 meters (2,744 ft) at Baegundae Peak"
        }
    },
    {
        id: "namsan",
        name: { ko: "남산 (N서울타워)", en: "Namsan (N Seoul Tower)" },
        coords: [37.5512, 126.9882],
        zoom: 14,
        note: {
            ko: "남산공원의 중심을 이루는 산으로, 정상에는 상징적인 N서울타워가 자리하고 있습니다.",
            en: "a central peak in Seoul that anchors Namsan Park and features the iconic N Seoul Tower at its summit."
        }
    },
    {
        id: "gwanaksan",
        name: { ko: "관악산", en: "Gwanaksan" },
        coords: [37.4455, 126.9636],
        zoom: 13,
        note: {
            ko: "대한민국 서울 남부에 위치한, 632미터 높이의 두드러진 산",
            en: "a prominent 632-meter mountain in southern Seoul, South Korea"
        }
    },
    {
        id: "achasan",
        name: { ko: "아차산", en: "Achasan" },
        coords: [37.5663, 127.1024],
        zoom: 14,
        note: {
            ko: "서울 동부의 광진구와 경기도 구리시에 걸쳐 있는, 초보자가 오르기 좋은 산(높이 약 287~296m)",
            en: "a beginner-friendly mountain (around 287–296 meters high) straddling Gwangjin-gu in eastern Seoul and Guri in Gyeonggi-do"
        }
    },
    {
        id: "hangang",
        name: { ko: "한강공원 (여의도)", en: "Hangang Park (Yeouido)" },
        coords: [37.5285, 126.9345],
        zoom: 14,
        note: {
            ko: "여의도 한강공원은 서울 영등포구 여의도에 위치한 강변 공원으로, 넓은 강변 잔디밭과 산책로 및 자전거 도로, 그리고 한강의 아름다운 경치를 즐길 수 있는 곳입니다.",
            en: "Yeouido Hangang Park is a riverside public park on Yeouido island in Yeongdeungpo District, Seoul, offering broad riverfront lawns, walking and cycling paths, and scenic Han River views."
        }
    }
];

let selectedLandmarkId = null;

//render the jumpto landmark buttons
//n the selected landmark's description in current language
function renderLandmarkUI() {
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'ko';
    const container = document.getElementById('landmarkButtons');
    const summaryEl = document.getElementById('landmarkSummary');
    if (!container || !summaryEl)
        return;

    container.innerHTML = "";
    topographicLandmarks.forEach(item => { //create button for each landmark
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `landmark-btn${selectedLandmarkId === item.id ? ' active' : ''}`;
        btn.innerText = item.name[lang];
        btn.addEventListener('click', () => jumpToLandmark(item.id));
        container.appendChild(btn);
    });
    
    //disply title n note for current landmark (clear if none)
    const activeLandmark = topographicLandmarks.find(item => item.id === selectedLandmarkId);
    if (activeLandmark) {
        summaryEl.innerHTML = `
            <h3>${activeLandmark.name[lang]}</h3>
            <p>${activeLandmark.note[lang]}</p>
        `;
    } else {
        summaryEl.innerHTML = "";
    }
}

//moves the map to a selected landmark, place marker, and get its elevation
async function jumpToLandmark(id) {
    const landmark = topographicLandmarks.find(item => item.id === id);
    if (!landmark)
        return;

    selectedLandmarkId = landmark.id;
    renderLandmarkUI();

    const [lat, lng] = landmark.coords;
    map.flyTo([lat, lng], landmark.zoom, { duration: 1.0 }); //move map

    //create circular marker
    if (clickMarker) {
        clickMarker.setLatLng([lat, lng]);
    } else {
        clickMarker = L.circleMarker([lat, lng], {
            radius: 7,
            fillColor: "#2563eb",
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
        }).addTo(map);
    }

    lastClickedData = { lat, lng, elevation: null, isLoading: true };
    renderLocationInfo(lat, lng, null, true);

    try {
        //elevation lookup
        const [elevation] = await Promise.all([
            fetchElevation(lat, lng),
            typeof wait === 'function' ? wait(400) : Promise.resolve()
        ]);
        //update ui if the landmark is the latest selected
        if (lastClickedData && lastClickedData.lat === lat && lastClickedData.lng === lng) {
            lastClickedData = { lat, lng, elevation, isLoading: false };
            renderLocationInfo(lat, lng, elevation, false);
        }
    } catch (error) {
        console.error('Landmark elevation lookup failed:', error);
        //clear 'loading' state n show fallback
        if (lastClickedData && lastClickedData.lat === lat && lastClickedData.lng === lng) {
            lastClickedData = { lat, lng, elevation: null, isLoading: false };
            renderLocationInfo(lat, lng, null, false);
        }
    }
}

renderLandmarkUI();