//main.js 25101198 체 아담 하리스 빈 체 모하마드 슈크리

let currentLang = 'ko';

function setLanguage(lang) {
    currentLang = lang;
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach(eachElement => {
        const elementAttribute = eachElement.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][elementAttribute]) {
            eachElement.innerText = translations[lang][elementAttribute];
        }
    });

    //active button styling
    document.getElementById('btn-ko').classList.toggle('active', lang === 'ko');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');

    //re-render region info panel if a location has already been clicked
    if (typeof renderLocationInfo === 'function' && lastClickedData) {
        renderLocationInfo(
            lastClickedData.lat,
            lastClickedData.lng,
            lastClickedData.elevation,
            lastClickedData.isLoading
        );
    }
}