// ===================================
// RIVIC QSIC Hardware Visualization
// Real-time ASIC Processing Simulation
// ===================================

class HardwareVisualization {
    constructor() {
        this.isProcessing = false;
        this.currentOperation = null;
        this.timelineCanvas = document.getElementById('timeline-canvas');
        this.timelineCtx = this.timelineCanvas ? this.timelineCanvas.getContext('2d') : null;

        if (this.timelineCanvas) {
            this.setupCanvas();
        }

        this.init();
    }

    init() {
        // Initialize all hardware blocks to idle state
        this.setHardwareIdle();
    }

    setupCanvas() {
        const container = this.timelineCanvas.parentElement;
        this.timelineCanvas.width = container.clientWidth;
        this.timelineCanvas.height = 100;

        window.addEventListener('resize', () => {
            this.timelineCanvas.width = container.clientWidth;
            this.timelineCanvas.height = 100;
        });
    }

    // ==== SIMULATE OPERATION ====
    async simulateOperation(operation, duration) {
        if (this.isProcessing) return;

        this.isProcessing = true;
        this.currentOperation = operation;

        // Update control unit
        this.updateControlUnit(operation);

        // Activate hardware blocks
        this.activateHardwareBlocks();

        // Simulate processing based on operation type
        switch (operation) {
            case 'keygen':
                await this.simulateKeyGeneration(duration);
                break;
            case 'encaps':
                await this.simulateEncapsulation(duration);
                break;
            case 'sign':
                await this.simulateSign(duration);
                break;
            case 'verify':
                await this.simulateVerify(duration);
                break;
        }

        // Deactivate hardware blocks
        await this.delay(200);
        this.setHardwareIdle();
        this.isProcessing = false;
    }

    // ==== KEY GENERATION SIMULATION ====
    async simulateKeyGeneration(duration) {
        const steps = 50;
        const stepDuration = duration / steps;

        for (let i = 0; i < steps; i++) {
            // Update progress
            const progress = (i + 1) / steps;

            // Activate CPU interface
            this.setBlockActive('cpu-status', true);
            this.updateDataFlow('cpu-data', true);

            // Activate NTT accelerator (main workload)
            this.setBlockActive('ntt-status', true);
            this.activateNTTButterflies(progress);
            this.updateNTTCycles(i * 1000);

            // Update memory
            this.setBlockActive('memory-status', true);
            this.updateMemoryUsage(progress * 80); // 80KB for keys

            // Update performance monitor
            this.setBlockActive('perf-status', true);
            this.updatePerformanceMetrics(450 + Math.random() * 50, 45 + Math.random() * 5);

            // Draw timeline
            this.drawTimeline(progress, 'keygen');

            await this.delay(stepDuration);
        }
    }

    // ==== ENCAPSULATION SIMULATION ====
    async simulateEncapsulation(duration) {
        const steps = 40;
        const stepDuration = duration / steps;

        for (let i = 0; i < steps; i++) {
            const progress = (i + 1) / steps;

            this.setBlockActive('cpu-status', true);
            this.updateDataFlow('cpu-data', true);
            this.setBlockActive('ntt-status', true);
            this.activateNTTButterflies(progress);
            this.updateNTTCycles(i * 800);
            this.setBlockActive('memory-status', true);
            this.updateMemoryUsage(progress * 60);
            this.setBlockActive('perf-status', true);
            this.updatePerformanceMetrics(420 + Math.random() * 40, 43 + Math.random() * 4);

            this.drawTimeline(progress, 'encaps');

            await this.delay(stepDuration);
        }
    }

    // ==== SIGNING SIMULATION ====
    async simulateSign(duration) {
        const steps = 60;
        const stepDuration = duration / steps;

        for (let i = 0; i < steps; i++) {
            const progress = (i + 1) / steps;

            this.setBlockActive('cpu-status', true);
            this.updateDataFlow('cpu-data', true);
            this.setBlockActive('ntt-status', true);
            this.activateNTTButterflies(progress);
            this.updateNTTCycles(i * 1200);
            this.setBlockActive('memory-status', true);
            this.updateMemoryUsage(progress * 100);
            this.setBlockActive('perf-status', true);
            this.updatePerformanceMetrics(480 + Math.random() * 60, 47 + Math.random() * 6);

            this.drawTimeline(progress, 'sign');

            await this.delay(stepDuration);
        }
    }

    // ==== VERIFICATION SIMULATION ====
    async simulateVerify(duration) {
        const steps = 35;
        const stepDuration = duration / steps;

        for (let i = 0; i < steps; i++) {
            const progress = (i + 1) / steps;

            this.setBlockActive('cpu-status', true);
            this.updateDataFlow('cpu-data', true);
            this.setBlockActive('ntt-status', true);
            this.activateNTTButterflies(progress);
            this.updateNTTCycles(i * 700);
            this.setBlockActive('memory-status', true);
            this.updateMemoryUsage(progress * 50);
            this.setBlockActive('perf-status', true);
            this.updatePerformanceMetrics(400 + Math.random() * 50, 44 + Math.random() * 5);

            this.drawTimeline(progress, 'verify');

            await this.delay(stepDuration);
        }
    }

    // ==== HARDWARE BLOCK UPDATES ====
    setBlockActive(statusId, active) {
        const status = document.getElementById(statusId);
        if (status) {
            if (active) {
                status.classList.add('active');
            } else {
                status.classList.remove('active');
            }
        }
    }

    updateDataFlow(elementId, active) {
        const element = document.getElementById(elementId);
        if (element) {
            if (active) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        }
    }

    updateControlUnit(operation) {
        const stateElement = document.getElementById('control-state');
        const opElement = document.getElementById('control-op');

        if (stateElement) {
            stateElement.textContent = 'PROCESSING';
            stateElement.style.color = 'var(--quantum-success)';
        }

        if (opElement) {
            const opNames = {
                'keygen': 'ML-KEM-KEYGEN',
                'encaps': 'ML-KEM-ENCAPS',
                'sign': 'ML-DSA-SIGN',
                'verify': 'ML-DSA-VERIFY'
            };
            opElement.textContent = opNames[operation] || operation.toUpperCase();
        }
    }

    activateNTTButterflies(progress) {
        const butterflies = document.querySelectorAll('.butterfly-unit');
        butterflies.forEach((butterfly, index) => {
            const unitProgress = (progress * 8) % 1;
            if (Math.floor(progress * 8) >= index) {
                butterfly.classList.add('active');
                setTimeout(() => butterfly.classList.remove('active'), 100);
            }
        });
    }

    updateNTTCycles(cycles) {
        const cyclesElement = document.getElementById('ntt-cycles');
        if (cyclesElement) {
            cyclesElement.textContent = Math.floor(cycles).toLocaleString();
        }
    }

    updateMemoryUsage(kb) {
        const memoryFill = document.getElementById('memory-fill');
        const memoryUsed = document.getElementById('memory-used');

        if (memoryFill) {
            const percentage = (kb / 256) * 100;
            memoryFill.style.width = `${Math.min(percentage, 100)}%`;
        }

        if (memoryUsed) {
            memoryUsed.textContent = Math.floor(kb);
        }
    }

    updatePerformanceMetrics(power, temp) {
        const powerElement = document.getElementById('hw-power');
        const tempElement = document.getElementById('hw-temp');

        if (powerElement) {
            powerElement.textContent = `${Math.floor(power)} mW`;
        }

        if (tempElement) {
            tempElement.textContent = `${Math.floor(temp)}°C`;
        }
    }

    activateHardwareBlocks() {
        // Add active class to main hardware container
        const hwBlocks = document.querySelectorAll('.hw-block');
        hwBlocks.forEach((block, index) => {
            setTimeout(() => {
                block.classList.add('active');
            }, index * 50);
        });
    }

    setHardwareIdle() {
        // Reset all blocks to idle
        const statusElements = ['cpu-status', 'control-status', 'ntt-status', 'memory-status', 'perf-status'];
        statusElements.forEach(id => this.setBlockActive(id, false));

        const dataFlows = ['cpu-data'];
        dataFlows.forEach(id => this.updateDataFlow(id, false));

        const stateElement = document.getElementById('control-state');
        const opElement = document.getElementById('control-op');

        if (stateElement) {
            stateElement.textContent = 'IDLE';
            stateElement.style.color = 'var(--text-secondary)';
        }

        if (opElement) {
            opElement.textContent = '-';
        }

        const butterflies = document.querySelectorAll('.butterfly-unit');
        butterflies.forEach(butterfly => butterfly.classList.remove('active'));

        this.updateMemoryUsage(0);
        this.updateNTTCycles(0);
        this.updatePerformanceMetrics(0, 45);

        const hwBlocks = document.querySelectorAll('.hw-block');
        hwBlocks.forEach(block => block.classList.remove('active'));
    }

    // ==== TIMELINE VISUALIZATION ====
    drawTimeline(progress, operation) {
        if (!this.timelineCtx) return;

        const canvas = this.timelineCanvas;
        const ctx = this.timelineCtx;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barHeight = 25;
        const spacing = 5;

        // Draw CPU processing (top bar)
        ctx.fillStyle = 'hsl(220, 100%, 60%)';
        ctx.fillRect(0, 0, canvas.width * progress * 0.2, barHeight);

        // Draw NTT acceleration (middle bar)
        ctx.fillStyle = 'hsl(150, 80%, 50%)';
        const nttStart = canvas.width * progress * 0.15;
        const nttWidth = canvas.width * progress * 0.7;
        ctx.fillRect(nttStart, barHeight + spacing, nttWidth, barHeight);

        // Draw memory access (bottom bar)
        ctx.fillStyle = 'hsl(280, 100%, 65%)';
        const memStart = canvas.width * progress * 0.1;
        const memWidth = canvas.width * progress * 0.85;
        ctx.fillRect(memStart, (barHeight + spacing) * 2, memWidth, barHeight);

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'hsl(150, 80%, 50%)';
    }

    // ==== HELPER ====
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize hardware visualization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.hardwareViz = new HardwareVisualization();
    });
} else {
    window.hardwareViz = new HardwareVisualization();
}
