// Service definitions with categories for 2026
const services = {
    // Web Servers
    Apache: {
        cpu: 1,
        ram: 1,
        category: 'webServers',
        settings: "MaxRequestWorkers: 150, KeepAlive: On",
        description: "Battle-tested web server. Great for shared hosting and .htaccess support."
    },
    Nginx: {
        cpu: 0.5,
        ram: 0.5,
        category: 'webServers',
        settings: "worker_processes: auto, worker_connections: 2048",
        description: "High-performance reverse proxy and web server."
    },
    Caddy: {
        cpu: 0.5,
        ram: 0.3,
        category: 'webServers',
        settings: "auto_https, http3",
        description: "Modern web server with automatic HTTPS and HTTP/3."
    },
    LiteSpeed: {
        cpu: 0.5,
        ram: 0.5,
        category: 'webServers',
        settings: "LSAPI, HTTP/3, QUIC",
        description: "High-performance server with built-in caching."
    },

    // Runtimes
    PHP: {
        cpu: 0.5,
        ram: 0.5,
        category: 'runtimes',
        settings: "max_execution_time: 30, memory_limit: 256M",
        calculator: "https://php-fpm.gkanev.com/",
        description: "PHP 8.4+ with JIT compilation."
    },
    NodeJS: {
        cpu: 0.5,
        ram: 0.5,
        category: 'runtimes',
        settings: "max-old-space-size: 4096",
        description: "JavaScript runtime with npm ecosystem."
    },
    Bun: {
        cpu: 0.3,
        ram: 0.3,
        category: 'runtimes',
        settings: "bunfig.toml, native bundler",
        description: "Ultra-fast JS runtime, 4x faster than Node."
    },
    Deno: {
        cpu: 0.4,
        ram: 0.4,
        category: 'runtimes',
        settings: "--allow-net, --allow-read",
        description: "Secure runtime with native TypeScript."
    },

    // Databases
    MySQL: {
        cpu: 1,
        ram: 1,
        category: 'databases',
        settings: "innodb_buffer_pool_size: 70% of RAM",
        calculator: "https://database.gkanev.com/",
        description: "World's most popular open-source database."
    },
    MariaDB: {
        cpu: 1,
        ram: 1,
        category: 'databases',
        settings: "innodb_buffer_pool_size: 70% of RAM",
        calculator: "https://database.gkanev.com/",
        description: "MySQL fork with better performance."
    },
    PostgreSQL: {
        cpu: 1,
        ram: 1.5,
        category: 'databases',
        settings: "shared_buffers: 25% of RAM",
        description: "Advanced SQL database with JSON and pgvector."
    },
    MongoDB: {
        cpu: 1,
        ram: 1.5,
        category: 'databases',
        settings: "wiredTigerCacheSizeGB: 50% of RAM",
        description: "Document database for flexible schemas."
    },
    SQLite: {
        cpu: 0.1,
        ram: 0.1,
        category: 'databases',
        settings: "journal_mode: WAL",
        description: "Serverless SQL. Perfect for edge computing."
    },
    Qdrant: {
        cpu: 1,
        ram: 2,
        category: 'databases',
        settings: "vector_size: 1536, distance: Cosine",
        description: "Vector database for AI/ML and RAG applications."
    },

    // Caching & Message Queues
    Valkey: {
        cpu: 0.5,
        ram: 1,
        category: 'caching',
        settings: "maxmemory: 2gb, maxmemory-policy: allkeys-lru",
        description: "Open-source Redis fork (Linux Foundation)."
    },
    Redis: {
        cpu: 0.5,
        ram: 1,
        category: 'caching',
        settings: "maxmemory: 2gb, maxmemory-policy: allkeys-lru",
        description: "In-memory data store. License changed in 2024."
    },
    Memcached: {
        cpu: 0.3,
        ram: 0.5,
        category: 'caching',
        settings: "-m 512 -c 2048 -t 4",
        description: "Simple, high-performance distributed cache."
    },
    RabbitMQ: {
        cpu: 0.5,
        ram: 0.5,
        category: 'caching',
        settings: "vm_memory_high_watermark: 0.4",
        description: "Message broker for microservices."
    }
};

// Cloud provider pricing (monthly estimates for 2026)
const cloudPricing = {
    hetzner: { name: 'Hetzner', cpuCost: 8, ramCost: 3, storageCost: 0.05 },
    digitalocean: { name: 'DigitalOcean', cpuCost: 18, ramCost: 6, storageCost: 0.10 },
    vultr: { name: 'Vultr', cpuCost: 16, ramCost: 5, storageCost: 0.10 },
    aws: { name: 'AWS', cpuCost: 25, ramCost: 8, storageCost: 0.10 }
};

const config = {
    concurrentUsers: 100,
    storage: 20,
};

let selectedServices = new Set();

// Create service toggle switches (simple style like original)
function createServiceToggles() {
    const categories = {
        webServers: document.getElementById('webServers'),
        runtimes: document.getElementById('runtimes'),
        databases: document.getElementById('databases'),
        caching: document.getElementById('caching')
    };

    for (const [service, requirements] of Object.entries(services)) {
        const container = categories[requirements.category];
        if (!container) continue;

        const toggle = document.createElement('div');
        toggle.className = 'flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded';

        const labelSpan = document.createElement('span');
        labelSpan.className = 'text-gray-700 dark:text-gray-300';
        labelSpan.textContent = service;

        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'flex items-center gap-2';

        if (requirements.calculator) {
            const calcLink = document.createElement('a');
            calcLink.href = requirements.calculator;
            calcLink.className = 'text-blue-500 hover:text-blue-700 text-sm';
            calcLink.target = '_blank';
            calcLink.rel = 'noopener noreferrer';
            calcLink.textContent = 'Calculator';
            controlsDiv.appendChild(calcLink);
        }

        const label = document.createElement('label');
        label.className = 'inline-flex items-center cursor-pointer';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'sr-only peer';
        checkbox.id = `${service}Toggle`;

        const toggleDiv = document.createElement('div');
        toggleDiv.className = 'relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600';

        label.appendChild(checkbox);
        label.appendChild(toggleDiv);
        controlsDiv.appendChild(label);

        toggle.appendChild(labelSpan);
        toggle.appendChild(controlsDiv);
        container.appendChild(toggle);

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedServices.add(service);
            } else {
                selectedServices.delete(service);
            }
            calculateDetailedResources();
        });

        // Add tooltip
        tippy(toggle, {
            content: requirements.description,
            placement: 'top',
            delay: [300, 0]
        });
    }
}

function calculateDetailedResources() {
    let detailedResources = {};
    let totalCPU = 0;
    let totalRAM = 0;

    for (const service of selectedServices) {
        const requirements = services[service];
        if (requirements) {
            detailedResources[service] = {
                cpu: requirements.cpu,
                ram: requirements.ram
            };
            totalCPU += requirements.cpu;
            totalRAM += requirements.ram;
        }
    }

    // Add resources for concurrent users
    const userFactor = Math.log10(config.concurrentUsers + 1) / 2;
    const concurrentUsersCPU = Math.max(0.5, Math.floor(config.concurrentUsers / 100) * userFactor);
    const concurrentUsersRAM = Math.max(0.5, Math.floor(config.concurrentUsers / 50) * userFactor);

    if (config.concurrentUsers > 10) {
        detailedResources['User Load'] = {
            cpu: Math.round(concurrentUsersCPU * 10) / 10,
            ram: Math.round(concurrentUsersRAM * 10) / 10
        };
        totalCPU += concurrentUsersCPU;
        totalRAM += concurrentUsersRAM;
    }

    totalCPU = Math.round(totalCPU * 10) / 10;
    totalRAM = Math.round(totalRAM * 10) / 10;

    // Update detailed results
    const resultsContainer = document.getElementById('detailedResults');
    resultsContainer.replaceChildren();

    if (Object.keys(detailedResources).length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'text-gray-500 dark:text-gray-400 text-center py-4';
        emptyMsg.textContent = 'Select services above to see resource estimates.';
        resultsContainer.appendChild(emptyMsg);
    } else {
        for (const [service, resources] of Object.entries(detailedResources)) {
            const row = document.createElement('div');
            row.className = 'mb-2';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'font-semibold';
            nameSpan.textContent = `${service}: `;

            const statsSpan = document.createElement('span');
            statsSpan.textContent = `CPU: ${resources.cpu.toFixed(1)} cores, RAM: ${resources.ram.toFixed(1)} GB`;

            row.appendChild(nameSpan);
            row.appendChild(statsSpan);
            resultsContainer.appendChild(row);
        }
    }

    // Update total results
    const totalContainer = document.getElementById('totalResults');
    totalContainer.replaceChildren();

    const totalDiv = document.createElement('div');
    totalDiv.className = 'font-bold text-lg';
    totalDiv.textContent = `Total: CPU: ${totalCPU.toFixed(1)} cores, RAM: ${totalRAM.toFixed(1)} GB, Storage: ${config.storage} GB`;
    totalContainer.appendChild(totalDiv);

    // Update cloud pricing
    updateCloudPricing(totalCPU, totalRAM, config.storage);

    // Check limits
    checkResourceLimits(totalCPU, totalRAM);
}

function updateCloudPricing(cpu, ram, storage) {
    const container = document.getElementById('cloudProviders');
    container.replaceChildren();

    for (const [key, provider] of Object.entries(cloudPricing)) {
        const monthlyCost = (cpu * provider.cpuCost) + (ram * provider.ramCost) + (storage * provider.storageCost);

        const card = document.createElement('div');
        card.className = 'bg-gray-50 dark:bg-gray-700 p-3 rounded text-center';

        const name = document.createElement('div');
        name.className = 'text-sm text-gray-600 dark:text-gray-400';
        name.textContent = provider.name;

        const price = document.createElement('div');
        price.className = 'font-bold text-lg';
        price.textContent = `~$${Math.round(monthlyCost)}/mo`;

        card.appendChild(name);
        card.appendChild(price);
        container.appendChild(card);
    }
}

function checkResourceLimits(cpu, ram) {
    const errorElement = document.getElementById('error');
    const errorMessageElement = document.getElementById('errorMessage');

    if (cpu > 16 || ram > 32) {
        errorElement.classList.remove('hidden');
        errorMessageElement.textContent = 'High resource configuration. Consider load balancing or managed services.';
    } else if (cpu > 8 || ram > 16) {
        errorElement.classList.remove('hidden');
        errorMessageElement.textContent = 'Moderate to high resources. Ensure your infrastructure can handle this.';
    } else {
        errorElement.classList.add('hidden');
    }
}

function updateSliderValue(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);

    slider.addEventListener('input', function() {
        const value = parseInt(this.value);
        valueDisplay.textContent = value.toLocaleString();
        config[sliderId] = value;
        calculateDetailedResources();
    });
}

function setRecommendedConfig(configName) {
    const configs = {
        basicWordPress: {
            services: ['Apache', 'PHP', 'MySQL'],
            concurrentUsers: 50,
            storage: 20
        },
        ecommerce: {
            services: ['Nginx', 'PHP', 'MySQL', 'Valkey'],
            concurrentUsers: 300,
            storage: 100
        },
        highTraffic: {
            services: ['Caddy', 'PHP', 'PostgreSQL', 'Valkey'],
            concurrentUsers: 1000,
            storage: 200
        },
        modernJamstack: {
            services: ['Bun', 'SQLite', 'Valkey'],
            concurrentUsers: 500,
            storage: 50
        },
        microservices: {
            services: ['Deno', 'PostgreSQL', 'RabbitMQ', 'Valkey'],
            concurrentUsers: 800,
            storage: 150
        },
        aiReady: {
            services: ['Bun', 'PostgreSQL', 'Qdrant', 'Valkey'],
            concurrentUsers: 200,
            storage: 500
        }
    };

    const selectedConfig = configs[configName];
    if (!selectedConfig) return;

    // Reset all toggles
    selectedServices.clear();
    for (const service of Object.keys(services)) {
        const checkbox = document.getElementById(`${service}Toggle`);
        if (checkbox) checkbox.checked = false;
    }

    // Set selected services
    for (const service of selectedConfig.services) {
        const checkbox = document.getElementById(`${service}Toggle`);
        if (checkbox) {
            checkbox.checked = true;
            selectedServices.add(service);
        }
    }

    // Set sliders
    document.getElementById('concurrentUsers').value = selectedConfig.concurrentUsers;
    document.getElementById('concurrentUsersValue').textContent = selectedConfig.concurrentUsers.toLocaleString();
    document.getElementById('storage').value = selectedConfig.storage;
    document.getElementById('storageValue').textContent = selectedConfig.storage.toLocaleString();

    config.concurrentUsers = selectedConfig.concurrentUsers;
    config.storage = selectedConfig.storage;

    calculateDetailedResources();
}

// Export functions
function exportAsJSON() {
    const data = {
        generatedAt: new Date().toISOString(),
        generator: 'Stack Calculator 2026',
        url: 'https://phpstack.gkanev.com',
        configuration: {
            services: Array.from(selectedServices),
            concurrentUsers: config.concurrentUsers,
            storageGB: config.storage
        },
        resources: { cpuCores: 0, ramGB: 0, storageGB: config.storage },
        serviceDetails: {}
    };

    let totalCPU = 0, totalRAM = 0;
    for (const service of selectedServices) {
        const req = services[service];
        data.serviceDetails[service] = { cpu: req.cpu, ram: req.ram, settings: req.settings };
        totalCPU += req.cpu;
        totalRAM += req.ram;
    }
    data.resources.cpuCores = Math.round(totalCPU * 10) / 10;
    data.resources.ramGB = Math.round(totalRAM * 10) / 10;

    downloadFile(JSON.stringify(data, null, 2), 'stack-config.json', 'application/json');
}

function exportAsYAML() {
    let yaml = `# Stack Calculator 2026 Configuration
# Generated: ${new Date().toISOString()}
# URL: https://phpstack.gkanev.com

configuration:
  concurrent_users: ${config.concurrentUsers}
  storage_gb: ${config.storage}

services:\n`;

    let totalCPU = 0, totalRAM = 0;
    for (const service of selectedServices) {
        const req = services[service];
        yaml += `  ${service.toLowerCase()}:
    enabled: true
    cpu: ${req.cpu}
    ram_gb: ${req.ram}
    settings: "${req.settings}"
`;
        totalCPU += req.cpu;
        totalRAM += req.ram;
    }

    yaml += `
resources:
  total_cpu_cores: ${Math.round(totalCPU * 10) / 10}
  total_ram_gb: ${Math.round(totalRAM * 10) / 10}
  storage_gb: ${config.storage}
`;

    downloadFile(yaml, 'stack-config.yaml', 'text/yaml');
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Dark mode
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        html.classList.add('dark');
    }

    toggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
}

// Event listeners
document.getElementById('basicWordPress')?.addEventListener('click', () => setRecommendedConfig('basicWordPress'));
document.getElementById('ecommerce')?.addEventListener('click', () => setRecommendedConfig('ecommerce'));
document.getElementById('highTraffic')?.addEventListener('click', () => setRecommendedConfig('highTraffic'));
document.getElementById('modernJamstack')?.addEventListener('click', () => setRecommendedConfig('modernJamstack'));
document.getElementById('microservices')?.addEventListener('click', () => setRecommendedConfig('microservices'));
document.getElementById('aiReady')?.addEventListener('click', () => setRecommendedConfig('aiReady'));

document.getElementById('exportJSON')?.addEventListener('click', exportAsJSON);
document.getElementById('exportYAML')?.addEventListener('click', exportAsYAML);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    createServiceToggles();
    updateSliderValue('concurrentUsers', 'concurrentUsersValue');
    updateSliderValue('storage', 'storageValue');
    calculateDetailedResources();

    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Input validation
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

document.addEventListener('DOMContentLoaded', () => {
    const concurrentUsersInput = document.getElementById('concurrentUsers');
    const storageInput = document.getElementById('storage');
    if (concurrentUsersInput) validateInput(concurrentUsersInput, 1, 10000);
    if (storageInput) validateInput(storageInput, 1, 2000);
});
