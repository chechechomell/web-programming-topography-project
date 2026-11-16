//25101198 체 아담 하리스 빈 체 모하마드 슈크리

function setLanguage(lang) {
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
}