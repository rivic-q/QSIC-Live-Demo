// ===================================
// RIVIC QSIC Use Cases Demo
// Interactive Simulations
// ===================================

class UseCasesDemo {
    constructor() {
        this.activeUseCase = 'automotive';
        this.demoRunning = {
            v2x: false,
            iot: false,
            hsm: false
        };

        this.init();
    }

    init() {
        this.setupTabs();
        this.setupDemoButtons();
    }

    // ==== TAB SWITCHING ====
    setupTabs() {
        const tabs = document.querySelectorAll('.use-case-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const usecase = tab.getAttribute('data-usecase');
                this.switchUseCase(usecase);
            });
        });
    }

    switchUseCase(usecase) {
        this.activeUseCase = usecase;

        // Update tabs
        document.querySelectorAll('.use-case-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-usecase') === usecase) {
                tab.classList.add('active');
            }
        });

        // Update content
        document.querySelectorAll('.use-case-content').forEach(content => {
            content.classList.remove('active');
            if (content.id === `usecase-${usecase}`) {
                content.classList.add('active');
            }
        });
    }

    // ==== DEMO BUTTONS ====
    setupDemoButtons() {
        // V2X Demo
        const v2xBtn = document.getElementById('v2x-demo-button');
        if (v2xBtn) {
            v2xBtn.addEventListener('click', () => this.runV2XDemo());
        }

        // IoT Demo
        const iotBtn = document.getElementById('iot-demo-button');
        if (iotBtn) {
            iotBtn.addEventListener('click', () => this.runIoTDemo());
        }

        // HSM Demo
        const hsmBtn = document.getElementById('hsm-demo-button');
        if (hsmBtn) {
            hsmBtn.addEventListener('click', () => this.runHSMDemo());
        }
    }

    // ==== V2X AUTOMOTIVE DEMO ====
    async runV2XDemo() {
        if (this.demoRunning.v2x) return;
        this.demoRunning.v2x = true;

        const button = document.getElementById('v2x-demo-button');
        button.innerHTML = '<span>⏸️ Running V2X Demo...</span>';
        button.disabled = true;

        const messagesSent = document.getElementById('v2x-messages-sent');
        const latency = document.getElementById('v2x-latency');
        const success = document.getElementById('v2x-success');

        let count = 0;
        const totalMessages = 100;
        const interval = 50; // 50ms per message = 20 messages/sec

        for (let i = 0; i < totalMessages; i++) {
            // Update stats
            count++;
            messagesSent.textContent = count;

            // Random latency between 15-25ms (hardware mode)
            const currentLatency = 15 + Math.random() * 10;
            latency.textContent = `${currentLatency.toFixed(1)}ms`;

            // Show message flow animation
            this.animateV2XMessage(i % 3); // Cycle between vehicles

            await this.delay(interval);
        }

        button.innerHTML = '<span>▶️ Start V2X Demo</span>';
        button.disabled = false;
        this.demoRunning.v2x = false;
    }

    animateV2XMessage(vehicleIndex) {
        const vehicles = [
            document.getElementById('vehicle-1'),
            document.getElementById('vehicle-2'),
            document.getElementById('traffic-light')
        ];

        if (!vehicles[vehicleIndex]) return;

        const vehicle = vehicles[vehicleIndex];
        vehicle.classList.add('active');

        setTimeout(() => {
            vehicle.classList.remove('active');
        }, 200);
    }

    // ==== IoT DEMO ====
    async runIoTDemo() {
        if (this.demoRunning.iot) return;
        this.demoRunning.iot = true;

        const button = document.getElementById('iot-demo-button');
        button.innerHTML = '<span>⏸️ Securing Devices...</span>';
        button.disabled = true;

        const devicesSecured = document.getElementById('iot-devices-secured');
        const power = document.getElementById('iot-power');

        const iotDevices = document.querySelectorAll('.iot-device');

        // Secure devices one by one
        for (let i = 0; i < iotDevices.length; i++) {
            const device = iotDevices[i];
            const status = device.querySelector('.device-status');

            // Show securing animation
            device.style.borderColor = 'var(--quantum-warning)';
            await this.delay(500);

            // Mark as secured
            device.classList.add('secured');
            status.classList.add('secured');
            device.style.borderColor = '';

            // Update stats
            devicesSecured.textContent = i + 1;
            const currentPower = 100 + (i + 1) * 80; // 80mW per device
            power.textContent = `${currentPower}mW`;

            await this.delay(300);
        }

        button.innerHTML = '<span>▶️ Start IoT Demo</span>';
        button.disabled = false;
        this.demoRunning.iot = false;
    }

    // ==== HSM DEMO ====
    async runHSMDemo() {
        if (this.demoRunning.hsm) return;
        this.demoRunning.hsm = true;

        const button = document.getElementById('hsm-demo-button');
        button.innerHTML = '<span>⏸️ Load Test Running...</span>';
        button.disabled = true;

        const opsDisplay = document.getElementById('hsm-ops');
        const latencyDisplay = document.getElementById('hsm-latency');
        const loadBar = document.getElementById('hsm-load');
        const loadValue = document.getElementById('hsm-load-value');
        const keysDisplay = document.getElementById('hsm-keys');

        const duration = 5000; // 5 seconds
        const steps = 50;
        const stepDuration = duration / steps;

        for (let i = 0; i < steps; i++) {
            const progress = (i + 1) / steps;

            // Simulate ramping up operations
            const ops = Math.floor(progress * 2000 + Math.random() * 200);
            opsDisplay.textContent = ops.toLocaleString();

            // Latency increases slightly under load
            const lat = 5 + progress * 3 + Math.random() * 2;
            latencyDisplay.textContent = `${lat.toFixed(1)}ms`;

            // Load percentage
            const load = Math.floor(progress * 75 + Math.random() * 10);
            loadBar.style.width = `${load}%`;
            loadValue.textContent = load;

            // Key count
            const keys = Math.floor(progress * 10000);
            keysDisplay.textContent = keys.toLocaleString();

            await this.delay(stepDuration);
        }

        // Ramp down
        for (let i = steps; i > 0; i--) {
            const progress = i / steps;

            const ops = Math.floor(progress * 2000 + Math.random() * 200);
            opsDisplay.textContent = ops.toLocaleString();

            const lat = 5 + progress * 3 + Math.random() * 2;
            latencyDisplay.textContent = `${lat.toFixed(1)}ms`;

            const load = Math.floor(progress * 75);
            loadBar.style.width = `${load}%`;
            loadValue.textContent = load;

            await this.delay(stepDuration / 2);
        }

        button.innerHTML = '<span>▶️ Start HSM Load Test</span>';
        button.disabled = false;
        this.demoRunning.hsm = false;
    }

    // ==== HELPER ====
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize use cases demo when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.useCasesDemo = new UseCasesDemo();
    });
} else {
    window.useCasesDemo = new UseCasesDemo();
}
