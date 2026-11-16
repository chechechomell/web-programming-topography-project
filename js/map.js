//25101198 체 아담 하리스 빈 체 모하마드 슈크리

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

map.on('click', function(e) {
    const latitudeValue = e.latlng.lat.toFixed(4);
    const longitudeValue = e.latlng.lng.toFixed(4);

    //create marker at clicked spot
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
    
    const infoPanel = document.getElementById('infoPanel');
    infoPanel.innerHTML = `
        <div class="coord-grid">
            <div class="coord-box">
                <span class="coord-label">Latitude / 위도</span>
                <span class="coord-val">${latitudeValue}°</span>
            </div>
            <div class="coord-box">
                <span class="coord-label">Longitude / 경도</span>
                <span class="coord-val">${longitudeValue}°</span>
            </div>
        </div>
    `;
});

//tried adding a marker to mark certain important places
L.marker([37.5665, 126.9780]).addTo(map)
.bindPopup("<b>Seoul City Hall / 서울시청</b><br>trial123")
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