// ==============================================
// RIVIC QSIC - Interactive Demo JavaScript
// ML-KEM & ML-DSA Demonstrations
// ==============================================

class CryptoDemo {
    constructor() {
        this.mode = 'hardware'; // or 'software'
        this.initEventListeners();
    }

    initEventListeners() {
        // Mode toggle
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.mode = e.currentTarget.getAttribute('data-mode');
            });
        });

        // ML-KEM demos
        const mlkemKeygen = document.getElementById('mlkem-keygen');
        if (mlkemKeygen) {
            mlkemKeygen.addEventListener('click', () => this.runMLKEMKeygen());
        }

        const mlkemEncaps = document.getElementById('mlkem-encaps');
        if (mlkemEncaps) {
            mlkemEncaps.addEventListener('click', () => this.runMLKEMEncaps());
        }

        // ML-DSA demos
        const mldsaSign = document.getElementById('mldsa-sign');
        if (mldsaSign) {
            mldsaSign.addEventListener('click', () => this.runMLDSASign());
        }

        const mldsaVerify = document.getElementById('mldsa-verify');
        if (mldsaVerify) {
            mldsaVerify.addEventListener('click', () => this.runMLDSAVerify());
        }
    }

    // Generate random hex string
    generateRandomHex(bytes) {
        const arr = new Uint8Array(bytes);
        crypto.getRandomValues(arr);
        return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Truncate for display
    truncate(str, len = 64) {
        if (str.length <= len) return str;
        return str.substring(0, len) + '...' + str.substring(str.length - 16);
    }

    // Simulate processing time based on mode
    getProcessingTime(baseTime) {
        return this.mode === 'hardware' ? baseTime : baseTime * 7; // 7x slower in software
    }

    // ML-KEM Key Generation
    async runMLKEMKeygen() {
        const btn = document.getElementById('mlkem-keygen');
        const output = document.getElementById('mlkem-keys');

        btn.disabled = true;
        btn.innerHTML = '<span class="btn-icon">⚡</span> GENERATING...';

        // Simulate processing
        const time = this.getProcessingTime(0.5);
        await this.sleep(time);

        // Generate mock keys
        const pk = this.generateRandomHex(1184);
        const sk = this.generateRandomHex(2400);

        document.getElementById('mlkem-pk').textContent = this.truncate(pk);
        document.getElementById('mlkem-sk').textContent = this.truncate(sk);
        document.getElementById('mlkem-time').textContent = time.toFixed(2) + 'ms';

        output.style.display = 'block';
        btn.innerHTML = '<span class="btn-icon">✓</span> KEYS GENERATED';

        // Enable next step
        document.getElementById('mlkem-encaps').disabled = false;

        // Store for next step
        this.mlkemPk = pk;
    }

    // ML-KEM Encapsulation
    async runMLKEMEncaps() {
        const btn = document.getElementById('mlkem-encaps');
        const output = document.getElementById('mlkem-encaps-output');

        btn.disabled = true;
        btn.innerHTML = '<span class="btn-icon">⚡</span> ENCAPSULATING...';

        // Simulate processing
        const time = this.getProcessingTime(0.28);
        await this.sleep(time);

        // Generate mock ciphertext and shared secret
        const ct = this.generateRandomHex(1088);
        const ss = this.generateRandomHex(32);

        document.getElementById('mlkem-ct').textContent = this.truncate(ct);
        document.getElementById('mlkem-ss').textContent = this.truncate(ss, 32);
        document.getElementById('mlkem-encaps-time').textContent = time.toFixed(2) + 'ms';

        output.style.display = 'block';
        btn.innerHTML = '<span class="btn-icon">✓</span> ENCAPSULATED';
    }

    // ML-DSA Signing
    async runMLDSASign() {
        const btn = document.getElementById('mldsa-sign');
        const output = document.getElementById('mldsa-sign-output');
        const message = document.getElementById('mldsa-message').value;

        if (!message.trim()) {
            alert('Please enter a message to sign');
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<span class="btn-icon">⚡</span> SIGNING...';

        // Simulate processing
        const time = this.getProcessingTime(0.83);
        await this.sleep(time);

        // Generate mock signature and public key
        const sig = this.generateRandomHex(3309);
        const pk = this.generateRandomHex(1952);

        document.getElementById('mldsa-sig').textContent = this.truncate(sig);
        document.getElementById('mldsa-pk').textContent = this.truncate(pk);
        document.getElementById('mldsa-time').textContent = time.toFixed(2) + 'ms';

        output.style.display = 'block';
        btn.innerHTML = '<span class="btn-icon">✓</span> MESSAGE SIGNED';

        // Enable verification
        document.getElementById('mldsa-verify').disabled = false;

        // Store for verification
        this.mldsaSig = sig;
        this.mldsaPk = pk;
        this.mldsaMessage = message;
    }

    // ML-DSA Verification
    async runMLDSAVerify() {
        const btn = document.getElementById('mldsa-verify');
        const output = document.getElementById('mldsa-verify-output');
        const status = document.getElementById('verify-status');

        btn.disabled = true;
        btn.innerHTML = '<span class="btn-icon">⚡</span> VERIFYING...';

        // Simulate processing
        const time = this.getProcessingTime(0.36);
        await this.sleep(time);

        // Always valid for demo (since we just signed it)
        status.innerHTML = `
            <span class="verify-icon">✓</span>
            <span class="verify-text">SIGNATURE VALID</span>
        `;
        status.style.color = '#00ff41';

        document.getElementById('mldsa-verify-time').textContent = time.toFixed(2) + 'ms';

        output.style.display = 'block';
        btn.innerHTML = '<span class="btn-icon">✓</span> VERIFIED';
    }

    // Helper sleep function
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize demo on load
window.addEventListener('DOMContentLoaded', () => {
    new CryptoDemo();
});
