// Adicione aqui os scripts necessários
document.addEventListener('DOMContentLoaded', () => {
    showSection('identification');
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';

        // Initialize the map if the production data section is selected
        if (sectionId === 'productiondata') {
            initMap();
        }
    }
}

// Function to initialize the map
function initMap() {
    // Check if the map is already initialized
    if (typeof L === 'undefined' || !document.getElementById('map')) {
        return;
    }

    // Create the map
    var map = L.map('map').setView([41.79639893424446, -6.767871439606526], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([41.79639893424446, -6.767871439606526]).addTo(map)
        .bindPopup('Instituto Politécnico de Bragança')
        .openPopup();
}

function toggleList(listId, element, isSublist = false) {
    const activeList = document.getElementById(listId);
    const isHidden = activeList.classList.contains('hidden');

    if (!isSublist) {
        document.querySelectorAll('#productdescription > ul').forEach(list => {
            list.classList.add('hidden');
        });
        document.querySelectorAll('#productdescription .toggle').forEach(toggle => {
            toggle.classList.remove('active');
        });
    }

    if (isHidden) {
        activeList.classList.remove('hidden');
        element.classList.add('active');
    } else {
        activeList.classList.add('hidden');
        element.classList.remove('active');
    }
}
