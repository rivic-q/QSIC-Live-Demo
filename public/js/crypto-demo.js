// ===================================
// RIVIC QSIC Cryptographic Operations
// Interactive Demo
// ===================================

class CryptoDemo {
    constructor() {
        this.mode = 'software'; // 'software' or 'hardware'
        this.keys = {
            mlkem: null,
            mldsa: null
        };
        this.encapsulatedData = null;
        this.signedMessage = null;

        this.init();
    }

    init() {
        this.setupModeSelection();
        this.setupOperationButtons();
    }

    // ==== MODE SELECTION ====
    setupModeSelection() {
        const modeButtons = document.querySelectorAll('.mode-button');
        modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.mode = button.getAttribute('data-mode');
                this.updateActiveModeIndicator();
                this.showNotification(`Switched to ${this.mode} mode`, 'success');
            });
        });
    }

    updateActiveModeIndicator() {
        const indicator = document.getElementById('active-mode');
        if (indicator) {
            indicator.textContent = this.mode.charAt(0).toUpperCase() + this.mode.slice(1);

            // Update indicator color
            if (this.mode === 'hardware') {
                indicator.style.background = 'var(--gradient-success)';
            } else {
                indicator.style.background = 'var(--gradient-primary)';
            }
        }
    }

    // ==== OPERATION BUTTONS ====
    setupOperationButtons() {
        // ML-KEM Key Generation
        const keygenBtn = document.getElementById('keygen-button');
        if (keygenBtn) {
            keygenBtn.addEventListener('click', () => this.generateKeys());
        }

        // ML-KEM Encapsulation
        const encapsBtn = document.getElementById('encaps-button');
        if (encapsBtn) {
            encapsBtn.addEventListener('click', () => this.encapsulateSecret());
        }

        // ML-DSA Signing
        const signBtn = document.getElementById('sign-button');
        if (signBtn) {
            signBtn.addEventListener('click', () => this.signMessage());
        }

        // ML-DSA Verification
        const verifyBtn = document.getElementById('verify-button');
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => this.verifySignature());
        }
    }

    // ==== ML-KEM KEY GENERATION ====
    async generateKeys() {
        const startTime = performance.now();
        const output = document.getElementById('keygen-output');
        const timeDisplay = document.getElementById('keygen-time');

        // Simulate key generation
        output.innerHTML = '<div class="output-placeholder"><p>🔄 Generating ML-KEM-768 key pair...</p></div>';

        // Simulate processing time based on mode
        const processingTime = this.mode === 'software' ? 3.33 : 0.5; // ms
        await this.delay(processingTime);

        // Generate mock keys
        this.keys.mlkem = {
            publicKey: this.generateMockData(1184),
            privateKey: this.generateMockData(2400)
        };

        const endTime = performance.now();
        const actualTime = (endTime - startTime).toFixed(2);

        // Display results
        output.innerHTML = `
      <div class="output-data">
        <div class="output-label">Public Key (1,184 bytes):</div>
        ${this.formatHex(this.keys.mlkem.publicKey)}
        
        <div class="output-label">Private Key (2,400 bytes):</div>
        ${this.formatHex(this.keys.mlkem.privateKey)}
        
        <div class="output-success">✅ Key pair generated successfully!</div>
      </div>
    `;

        timeDisplay.textContent = `${actualTime} ms (${this.mode})`;

        // Trigger hardware visualization
        if (this.mode === 'hardware') {
            window.hardwareViz?.simulateOperation('keygen', actualTime);
        }

        this.showNotification('ML-KEM keys generated!', 'success');
    }

    // ==== ML-KEM ENCAPSULATION ====
    async encapsulateSecret() {
        if (!this.keys.mlkem) {
            this.showNotification('Please generate keys first!', 'error');
            return;
        }

        const startTime = performance.now();
        const output = document.getElementById('encaps-output');
        const timeDisplay = document.getElementById('encaps-time');

        output.innerHTML = '<div class="output-placeholder"><p>🔄 Encapsulating shared secret...</p></div>';

        const processingTime = this.mode === 'software' ? 2.0 : 0.28;
        await this.delay(processingTime);

        // Generate mock encapsulated data
        this.encapsulatedData = {
            ciphertext: this.generateMockData(1088),
            sharedSecret: this.generateMockData(32)
        };

        const endTime = performance.now();
        const actualTime = (endTime - startTime).toFixed(2);

        output.innerHTML = `
      <div class="output-data">
        <div class="output-label">Ciphertext (1,088 bytes):</div>
        ${this.formatHex(this.encapsulatedData.ciphertext)}
        
        <div class="output-label">Shared Secret (32 bytes):</div>
        ${this.formatHex(this.encapsulatedData.sharedSecret)}
        
        <div class="output-success">✅ Secret encapsulated successfully!</div>
      </div>
    `;

        timeDisplay.textContent = `${actualTime} ms (${this.mode})`;

        if (this.mode === 'hardware') {
            window.hardwareViz?.simulateOperation('encaps', actualTime);
        }

        this.showNotification('Secret encapsulated!', 'success');
    }

    // ==== ML-DSA SIGNING ====
    async signMessage() {
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();

        if (!message) {
            this.showNotification('Please enter a message to sign!', 'error');
            return;
        }

        const startTime = performance.now();
        const output = document.getElementById('sign-output');
        const timeDisplay = document.getElementById('sign-time');

        output.innerHTML = '<div class="output-placeholder"><p>🔄 Signing message with ML-DSA-65...</p></div>';

        const processingTime = this.mode === 'software' ? 6.67 : 0.83;
        await this.delay(processingTime);

        // Generate mock signature
        this.signedMessage = {
            message: message,
            signature: this.generateMockData(3309),
            publicKey: this.generateMockData(1952)
        };

        const endTime = performance.now();
        const actualTime = (endTime - startTime).toFixed(2);

        output.innerHTML = `
      <div class="output-data">
        <div class="output-label">Message:</div>
        "${message}"
        
        <div class="output-label">Signature (3,309 bytes):</div>
        ${this.formatHex(this.signedMessage.signature)}
        
        <div class="output-label">Public Key (1,952 bytes):</div>
        ${this.formatHex(this.signedMessage.publicKey)}
        
        <div class="output-success">✅ Message signed successfully!</div>
      </div>
    `;

        timeDisplay.textContent = `${actualTime} ms (${this.mode})`;

        if (this.mode === 'hardware') {
            window.hardwareViz?.simulateOperation('sign', actualTime);
        }

        this.showNotification('Message signed!', 'success');
    }

    // ==== ML-DSA VERIFICATION ====
    async verifySignature() {
        if (!this.signedMessage) {
            this.showNotification('Please sign a message first!', 'error');
            return;
        }

        const startTime = performance.now();
        const output = document.getElementById('verify-output');
        const timeDisplay = document.getElementById('verify-time');
        const statusDisplay = document.getElementById('verify-status');

        output.innerHTML = '<div class="output-placeholder"><p>🔄 Verifying signature...</p></div>';

        const processingTime = this.mode === 'software' ? 2.5 : 0.36;
        await this.delay(processingTime);

        const endTime = performance.now();
        const actualTime = (endTime - startTime).toFixed(2);

        // Signature is always valid in this demo
        const isValid = true;

        output.innerHTML = `
      <div class="output-data">
        <div class="output-label">Message:</div>
        "${this.signedMessage.message}"
        
        <div class="output-label">Signature Verification:</div>
        <div class="output-success">✅ VALID - Signature verified successfully!</div>
        
        <div class="output-label">Details:</div>
        • Algorithm: ML-DSA-65<br>
        • Security Level: NIST Level 3<br>
        • Signature Size: 3,309 bytes<br>
        • Verification Time: ${actualTime} ms
      </div>
    `;

        timeDisplay.textContent = `${actualTime} ms (${this.mode})`;
        statusDisplay.textContent = 'Valid ✅';
        statusDisplay.style.color = 'var(--quantum-success)';

        if (this.mode === 'hardware') {
            window.hardwareViz?.simulateOperation('verify', actualTime);
        }

        this.showNotification('Signature verified!', 'success');
    }

    // ==== HELPER FUNCTIONS ====
    generateMockData(bytes) {
        const data = [];
        for (let i = 0; i < bytes; i++) {
            data.push(Math.floor(Math.random() * 256).toString(16).padStart(2, '0'));
        }
        return data.join('');
    }

    formatHex(hexString) {
        // Show first 64 chars + ... + last 64 chars
        if (hexString.length > 128) {
            const start = hexString.substring(0, 64);
            const end = hexString.substring(hexString.length - 64);
            return `${start}...[${((hexString.length - 128) / 2)} bytes omitted]...${end}`;
        }
        return hexString;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      background: ${type === 'success' ? 'var(--gradient-success)' : 'var(--gradient-danger)'};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      font-weight: 700;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .notification {
    font-family: var(--font-primary);
    font-size: 0.9375rem;
  }
`;
document.head.appendChild(style);

// Initialize crypto demo when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cryptoDemo = new CryptoDemo();
    });
} else {
    window.cryptoDemo = new CryptoDemo();
}
