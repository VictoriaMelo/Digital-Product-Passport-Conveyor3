// Adicione aqui os scripts necessários

var mqttClient = null;

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
    const mqttBroker = 'wss://test.mosquitto.org:8081/mqtt'; // WebSocket URL for the broker
    const topic = 'conveyor/operational_data/#'; // Use o seu tópico
    if (!mqttClient) {
        
        mqttClient = mqtt.connect('mqttBroker');

        mqttClient.on('connect', () => {
            console.log('Connected to broker: ${mqttBroker}');
            mqttClient.subscribe(topic, (err) => {
                if (err) {
                    console.error('Failed to subscribe to topic: ${topic}', err);
                } else {
                    console.log('Subscribed to topic: ${topic}');
                }
            });
        });

        mqttClient.on('error', (err) => {
            console.error('Failed to connect with the MQTT broker: ${mqttBroker}', err);
        });

        mqttClient.on('offline', () => {
            console.log('MQTT Client offline');
        });

        mqttClient.on('reconnect', () => {
            console.log('Reconnecting to the broker MQTT...');
        });

        mqttClient.on('message', (topic, message) => {
            const msg = message.toString();
            console.log('MSG received at topic: ${topic} -> ${msg}');
            updateOperationalData(topic, msg);
        });
    }
}

function updateOperationalData(topic, message) {
    console.log(`Atualizando dados para o tópico: ${topic} com a mensagem: ${message}`);
    switch (topic) {
        case 'conveyor/operational_data/conveyors_in_sequence':
            document.getElementById('conveyors_in_sequence').innerText = message;
            break;
        case 'conveyor/operational_data/position_in_sequence':
            document.getElementById('position_in_sequence').innerText = message;
            break;
        case 'conveyor/operational_data/motor_status':
            document.getElementById('motor_status').innerText = message;
            break;
        case 'conveyor/operational_data/input_sensor_status':
            document.getElementById('input_sensor_status').innerText = message;
            break;
        case 'conveyor/operational_data/output_sensor_status':
            document.getElementById('output_sensor_status').innerText = message;
            break;
        case 'conveyor/operational_data/number_of_pieces':
            document.getElementById('number_of_pieces').innerText = message;
            break;
        case 'conveyor/operational_data/last_piece_time':
            document.getElementById('last_piece_time').innerText = message;
            break;
        case 'conveyor/operational_data/motor_operating_time':
            document.getElementById('motor_operating_time').innerText = message;
            break;
        case 'conveyor/operational_data/vibration':
            document.getElementById('vibration').innerText = message;
            break;
        case 'conveyor/operational_data/current':
            document.getElementById('current').innerText = message;
            break;
        case 'conveyor/operational_data/battery_level':
            document.getElementById('battery_level').innerText = message;
            break;
        default:
            console.log(`Tópico desconhecido: ${topic}`);
    }
}
