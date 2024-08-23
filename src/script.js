const services = {
    Apache: { cpu: 1, ram: 1, settings: "MaxRequestWorkers: 150, KeepAlive: On", description: "Popular open-source web server software." },
    Nginx: { cpu: 0.5, ram: 0.5, settings: "worker_processes: auto, worker_connections: 1024", description: "High-performance HTTP and reverse proxy server." },
    PHP: { cpu: 0.5, ram: 0.5, settings: "max_execution_time: 30, memory_limit: 128M", calculator: "https://php-fpm.gkanev.com/", description: "Server-side scripting language for web development." },
    MySQL: { cpu: 1, ram: 1, settings: "innodb_buffer_pool_size: 50% of RAM, max_connections: 100", calculator: "https://database.gkanev.com/", description: "Popular open-source relational database management system." },
    Redis: { cpu: 0.5, ram: 0.5, settings: "maxmemory: 2gb, maxmemory-policy: allkeys-lru", description: "In-memory data structure store used as a database, cache, and message broker." },
    Memcached: { cpu: 0.5, ram: 0.5, settings: "-m 64 -c 1024 -t 4", description: "High-performance, distributed memory object caching system." },
    MariaDB: { cpu: 1, ram: 1, settings: "innodb_buffer_pool_size: 50% of RAM, max_connections: 100", calculator: "https://database.gkanev.com/", description: "Community-developed fork of MySQL relational database." },
    PostgreSQL: { cpu: 1, ram: 1, settings: "shared_buffers: 25% of RAM, max_connections: 100", description: "Advanced open-source relational database system." },
    NodeJS: { cpu: 0.5, ram: 0.5, settings: "max-old-space-size: 2048", description: "JavaScript runtime built on Chrome's V8 JavaScript engine." },
    MongoDB: { cpu: 1, ram: 1, settings: "wiredTigerCacheSizeGB: 1", description: "Cross-platform document-oriented NoSQL database." }
};

const config = {
    concurrentUsers: 100,
    storage: 20,
};

function createServiceToggles() {
    const servicesContainer = document.getElementById('services');
    for (const [service, requirements] of Object.entries(services)) {
        const toggle = document.createElement('div');
        toggle.className = 'flex items-center justify-between mb-4';
        let innerHTML = `
            <span class="text-gray-700">${service}</span>
            <div class="flex items-center">
        `;
        if (requirements.calculator) {
            innerHTML += `
                <a href="${requirements.calculator}" class="text-blue-500 hover:text-blue-700 mr-2" target="_blank" rel="noopener noreferrer">Calculator</a>
            `;
        }
        innerHTML += `
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" id="${service}Toggle">
                    <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
            </div>
        `;
        toggle.innerHTML = innerHTML;
        servicesContainer.appendChild(toggle);
        document.getElementById(`${service}Toggle`).addEventListener('change', calculateDetailedResources);
        
        // Add tooltip
        tippy(`#${service}Toggle`, {
            content: requirements.description,
            placement: 'top',
        });
    }
}

function calculateDetailedResources() {
    let detailedResources = {};
    let totalCPU = 0;
    let totalRAM = 0;

    for (const [service, requirements] of Object.entries(services)) {
        if (document.getElementById(`${service}Toggle`).checked) {
            detailedResources[service] = {
                cpu: requirements.cpu,
                ram: requirements.ram
            };
            totalCPU += requirements.cpu;
            totalRAM += requirements.ram;
        }
    }

    // Add resources for concurrent users
    const concurrentUsersCPU = Math.floor(config.concurrentUsers / 100);
    const concurrentUsersRAM = Math.floor(config.concurrentUsers / 50);
    detailedResources['Concurrent Users'] = {
        cpu: concurrentUsersCPU,
        ram: concurrentUsersRAM
    };
    totalCPU += concurrentUsersCPU;
    totalRAM += concurrentUsersRAM;

    // Update the results display
    const resultsContainer = document.getElementById('detailedResults');
    resultsContainer.innerHTML = '';
    for (const [service, resources] of Object.entries(detailedResources)) {
        resultsContainer.innerHTML += `
            <div class="mb-2">
                <span class="font-semibold">${service}:</span>
                CPU: ${resources.cpu.toFixed(1)} cores,
                RAM: ${resources.ram.toFixed(1)} GB
            </div>
        `;
    }
    resultsContainer.innerHTML += `
        <div class="mt-4 font-bold">
            Total: CPU: ${totalCPU.toFixed(1)} cores,
            RAM: ${totalRAM.toFixed(1)} GB,
            Storage: ${config.storage} GB
        </div>
    `;

    checkResourceLimits(totalCPU, totalRAM);
}

function checkResourceLimits(cpu, ram) {
    const errorElement = document.getElementById('error');
    const errorMessageElement = document.getElementById('errorMessage');
    
    if (cpu > 8 || ram > 16) {
        errorElement.classList.remove('hidden');
        errorMessageElement.textContent = 'Warning: The selected configuration exceeds recommended resource limits.';
    } else {
        errorElement.classList.add('hidden');
    }
}

function updateSliderValue(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    slider.addEventListener('input', function() {
        valueDisplay.textContent = this.value;
        config[sliderId] = parseInt(this.value);
        calculateDetailedResources();
    });
}

function setRecommendedConfig(configName) {
    const configs = {
        basicWordPress: {
            services: ['Apache', 'PHP', 'MySQL'],
            concurrentUsers: 50,
            storage: 10
        },
        ecommerce: {
            services: ['Nginx', 'PHP', 'MySQL', 'Redis'],
            concurrentUsers: 200,
            storage: 50
        },
        highTraffic: {
            services: ['Nginx', 'PHP', 'MariaDB', 'Redis', 'Memcached'],
            concurrentUsers: 500,
            storage: 100
        }
    };

    const selectedConfig = configs[configName];

    // Reset all toggles
    for (const service of Object.keys(services)) {
        document.getElementById(`${service}Toggle`).checked = false;
    }

    // Set selected services
    for (const service of selectedConfig.services) {
        document.getElementById(`${service}Toggle`).checked = true;
    }

    // Set concurrent users and storage
    document.getElementById('concurrentUsers').value = selectedConfig.concurrentUsers;
    document.getElementById('concurrentUsersValue').textContent = selectedConfig.concurrentUsers;
    document.getElementById('storage').value = selectedConfig.storage;
    document.getElementById('storageValue').textContent = selectedConfig.storage;

    // Update config object
    config.concurrentUsers = selectedConfig.concurrentUsers;
    config.storage = selectedConfig.storage;

    // Recalculate resources
    calculateDetailedResources();
}

// Event listeners for recommended configuration buttons
document.getElementById('basicWordPress').addEventListener('click', () => setRecommendedConfig('basicWordPress'));
document.getElementById('ecommerce').addEventListener('click', () => setRecommendedConfig('ecommerce'));
document.getElementById('highTraffic').addEventListener('click', () => setRecommendedConfig('highTraffic'));

// Initialize the calculator
createServiceToggles();
updateSliderValue('concurrentUsers', 'concurrentUsersValue');
updateSliderValue('storage', 'storageValue');
calculateDetailedResources();

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Add input validation
function validateInput(input, min, max) {
    input.addEventListener('change', function() {
        const value = parseInt(this.value);
        if (isNaN(value) || value < min || value > max) {
            this.value = Math.max(min, Math.min(max, value || min));
        }
        this.value = Math.round(this.value);
        config[this.id] = parseInt(this.value);
        calculateDetailedResources();
    });
}

validateInput(document.getElementById('concurrentUsers'), 1, 1000);
validateInput(document.getElementById('storage'), 1, 1000);