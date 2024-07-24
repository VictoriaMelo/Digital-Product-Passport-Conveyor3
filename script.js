// Adicione aqui os scripts necessários
document.addEventListener('DOMContentLoaded', () => {
    showSection('identification');
    setupMQTT();
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

function toggleList(listId, element) {
    const activeList = document.getElementById(listId);
    const arrow = element.querySelector('.arrow');

    if (activeList) {
        const isHidden = activeList.classList.contains('hidden');
        activeList.classList.toggle('hidden', !isHidden);
        arrow.classList.toggle('active', isHidden);
    }
}

function setupMQTT() {
    const mqttBroker = 'wss://broker.hivemq.com:8000/mqtt'; // WebSocket URL for the broker
    const topic = 'processed/operational/data'; // Use o seu tópico

// Connect to the MQTT broker
    const client = mqtt.connect(mqttBroker);

    // Subscribe to the topic once connected
    client.on('connect', function () {
        console.log(`Connected to broker: ${mqttBroker}`);
        client.subscribe(topic, function (err) {
            if (!err) {
                console.log(`Subscribed to topic: ${topic}`);
            } else {
                console.error(`Failed to subscribe to topic: ${topic}`, err);
            }
        });
    });

    client.on('message', function(topic, message) {
        if (topic === 'processed/operational/data') {
            console.log('Message received:', message.toString());
            const data = JSON.parse(message.toString());
            updateOperationalData(data);
        }
    });
}

function updateOperationalData(data) {
    const section = document.getElementById('introduction');
    section.innerHTML = `
        <h2>Operational Data</h2>
        <p>Speed: ${data.speed} m/s</p>
        <p>Temperature: ${data.temperature} °C</p>
        <p>Status: ${data.status}</p>
    `;
}
