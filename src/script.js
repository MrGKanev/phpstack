 const services = {
            Apache: { cpu: 1, ram: 1, settings: "MaxRequestWorkers: 150, KeepAlive: On" },
            Nginx: { cpu: 0.5, ram: 0.5, settings: "worker_processes: auto, worker_connections: 1024" },
            PHP: { cpu: 0.5, ram: 0.5, settings: "max_execution_time: 30, memory_limit: 128M", calculator: "https://php-fpm.gkanev.com/" },
            MySQL: { cpu: 1, ram: 1, settings: "innodb_buffer_pool_size: 50% of RAM, max_connections: 100", calculator: "https://database.gkanev.com/" },
            Redis: { cpu: 0.5, ram: 0.5, settings: "maxmemory: 2gb, maxmemory-policy: allkeys-lru" },
            Memcached: { cpu: 0.5, ram: 0.5, settings: "-m 64 -c 1024 -t 4" },
            MariaDB: { cpu: 1, ram: 1, settings: "innodb_buffer_pool_size: 50% of RAM, max_connections: 100", calculator: "https://database.gkanev.com/" },
            PostgreSQL: { cpu: 1, ram: 1, settings: "shared_buffers: 25% of RAM, max_connections: 100" },
            NodeJS: { cpu: 0.5, ram: 0.5, settings: "max-old-space-size: 2048" },
            MongoDB: { cpu: 1, ram: 1, settings: "wiredTigerCacheSizeGB: 1" }
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
                        <a href="${requirements.calculator}" class="text-blue-500 hover:text-blue-700 mr-2" target="_blank">Calculator</a>
                    `;
                }
                innerHTML += `
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" id="${service}Toggle">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                `;
                toggle.innerHTML = innerHTML;
                servicesContainer.appendChild(toggle);
                document.getElementById(`${service}Toggle`).addEventListener('change', calculateResources);
            }
        }

        function calculateResources() {
            let totalCPU = 0;
            let totalRAM = 0;

            for (const [service, requirements] of Object.entries(services)) {
                if (document.getElementById(`${service}Toggle`).checked) {
                    totalCPU += requirements.cpu;
                    totalRAM += requirements.ram;
                }
            }

            totalCPU += Math.floor(config.concurrentUsers / 100);
            totalRAM += Math.floor(config.concurrentUsers / 50);

            document.getElementById('cpuResult').textContent = totalCPU.toFixed(1);
            document.getElementById('ramResult').textContent = totalRAM.toFixed(1);
            document.getElementById('storageResult').textContent = config.storage;

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
                calculateResources();
            });
        }

        createServiceToggles();
        updateSliderValue('concurrentUsers', 'concurrentUsersValue');
        updateSliderValue('storage', 'storageValue');
        calculateResources();

        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();