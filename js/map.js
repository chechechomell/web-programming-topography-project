//25101198 체 아담 하리스 빈 체 모하마드 슈크리

//initialize Leaflet map centered on seoul
//turn "map" html element into interactive map
//37.5665 and 126.9780 is langitude and longitude value of seoul city
//10 is the initial zoom level
const map = L.map('map').setView([37.5665, 126.9780], 10);

//add openstreetmap tile layer so the map actually show up with visuals and roads
//maxZoom 19 means user cannot zoom in too deep past this level
//attribution is just required copyright text
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//made it so when user click anywhere on map it get the latitude and longitude coordinate
//tofixed 4 make it only show 4 decimal numbers so it not too long
//find infopanel element in html sidebar and change its inner html to show clicked coordinates
map.on('click', function(e) {
    const latitudeValue = e.latlng.lat.toFixed(4);
    const longitudeValue = e.latlng.lng.toFixed(4);
    
    const infoPanel = document.getElementById('infoPanel');
    infoPanel.innerHTML = `
        <p><strong>Selected Coordinates / 선택 좌표 :</strong></p>
        <p>Latitude (위도) : ${latitudeValue}</p>
        <p>Longitude (경도) : ${longitudeValue}</p>
    `;
});

//tried adding a marker to mark certain importaint places
L.marker([37.5665, 126.9780]).addTo(map)
  .bindPopup("<b>Seoul City Hall / 서울시청</b><br>trial123")
  .openPopup();


