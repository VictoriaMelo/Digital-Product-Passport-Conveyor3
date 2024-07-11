// Adicione aqui os scripts necessários
document.addEventListener('DOMContentLoaded', () => {
    showSection('identification');
    var map = L.map('map').setView([41.79662103554626, -6.767477806574788], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([41.79662103554626, -6.767477806574788]).addTo(map)
        .bindPopup('Instituto Politécnico de Bragança')
        .openPopup();
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}
