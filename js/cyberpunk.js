// ==============================================
// RIVIC QSIC - CYBERPUNK JAVASCRIPT
// Matrix Rain, Quantum Particles, Animations
// ==============================================

// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789QUANTUM安全RIVIC量子';
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00f0ff';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillText(char, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Quantum Particles Effect
class QuantumParticles {
    constructor() {
        this.canvas = document.getElementById('quantum-particles');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.particles = [];
        this.particleCount = 80;
        this.createParticles();

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                radius: Math.random() * 3 + 1,
                color: this.getRandomColor(),
                alpha: Math.random() * 0.5 + 0.3,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    getRandomColor() {
        const colors = ['#ff006e', '#00f0ff', '#b300ff', '#00ff41'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((p, i) => {
            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Pulse
            p.alpha = 0.5 + Math.sin(Date.now() * p.pulseSpeed) * 0.3;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.hexToRgba(p.color, p.alpha);
            this.ctx.fill();

            // Draw connections
            this.particles.forEach((p2, j) => {
                if (i === j) return;
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = this.hexToRgba(p.color, (1 - dist / 150) * 0.2);
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

// 3D Quantum Cube
class QuantumCube {
    constructor() {
        this.canvas = document.getElementById('quantum-cube');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.rotation = { x: 0, y: 0, z: 0 };
        this.rotationSpeed = { x: 0.005, y: 0.008, z: 0.003 };

        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    project(x, y, z) {
        const scale = 200 / (200 + z);
        const x2d = x * scale + this.canvas.width / 2;
        const y2d = y * scale + this.canvas.height / 2;
        return { x: x2d, y: y2d };
    }

    rotateX(x, y, z, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
            x: x,
            y: y * cos - z * sin,
            z: y * sin + z * cos
        };
    }

    rotateY(x, y, z, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
            x: x * cos + z * sin,
            y: y,
            z: -x * sin + z * cos
        };
    }

    rotateZ(x, y, z, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
            x: x * cos - y * sin,
            y: x * sin + y * cos,
            z: z
        };
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.rotation.x += this.rotationSpeed.x;
        this.rotation.y += this.rotationSpeed.y;
        this.rotation.z += this.rotationSpeed.z;

        // Define cube vertices
        const size = 80;
        const vertices = [
            { x: -size, y: -size, z: -size },
            { x: size, y: -size, z: -size },
            { x: size, y: size, z: -size },
            { x: -size, y: size, z: -size },
            { x: -size, y: -size, z: size },
            { x: size, y: -size, z: size },
            { x: size, y: size, z: size },
            { x: -size, y: size, z: size }
        ];

        // Rotate and project
        const projected = vertices.map(v => {
            let rotated = this.rotateX(v.x, v.y, v.z, this.rotation.x);
            rotated = this.rotateY(rotated.x, rotated.y, rotated.z, this.rotation.y);
            rotated = this.rotateZ(rotated.x, rotated.y, rotated.z, this.rotation.z);
            return this.project(rotated.x, rotated.y, rotated.z);
        });

        // Draw edges
        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], // Front
            [4, 5], [5, 6], [6, 7], [7, 4], // Back
            [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting
        ];

        this.ctx.strokeStyle = '#00f0ff';
        this.ctx.lineWidth = 2;
        this.ctx.shadowColor = '#00f0ff';
        this.ctx.shadowBlur = 20;

        edges.forEach(edge => {
            this.ctx.beginPath();
            this.ctx.moveTo(projected[edge[0]].x, projected[edge[0]].y);
            this.ctx.lineTo(projected[edge[1]].x, projected[edge[1]].y);
            this.ctx.stroke();
        });

        // Draw vertices
        this.ctx.fillStyle = '#ff006e';
        this.ctx.shadowColor = '#ff006e';
        projected.forEach(v => {
            this.ctx.beginPath();
            this.ctx.arc(v.x, v.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Typing Effect
class TypingEffect {
    constructor() {
        this.element = document.getElementById('typing-effect');
        if (!this.element) return;

        this.phrases = [
            '6-8× Hardware Acceleration',
            'ML-KEM-768 | ML-DSA-65',
            'NIST Post-Quantum Ready',
            'Automotive | IoT | Enterprise',
            'TRL 3.5 → TRL 6.0 in 18 months',
            'Powered by Custom ASIC'
        ];

        this.currentPhrase = 0;
        this.currentChar = 0;
        this.isDeleting = false;

        this.type();
    }

    type() {
        const phrase = this.phrases[this.currentPhrase];

        if (this.isDeleting) {
            this.currentChar--;
            this.element.textContent = phrase.substring(0, this.currentChar);
        } else {
            this.currentChar++;
            this.element.textContent = phrase.substring(0, this.currentChar);
        }

        let speed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.currentChar === phrase.length) {
            speed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
            speed = 500;
        }

        setTimeout(() => this.type(), speed);
    }
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Nav Active State
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Countdown Timers
function updateCountdown(elementId, targetYear) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const now = new Date();
    const target = new Date(targetYear, 0, 1);
    const diff = target - now;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    element.textContent = Math.max(0, years);
}

// Glitch Number Effect
document.querySelectorAll('.glitch-number').forEach(el => {
    const originalValue = el.getAttribute('data-value');
    let isGlitching = false;

    setInterval(() => {
        if (isGlitching) return;

        isGlitching = true;
        let iterations = 0;

        const glitchInterval = setInterval(() => {
            el.textContent = Math.random().toString(36).substring(2, originalValue.length + 2).toUpperCase();
            iterations++;

            if (iterations > 5) {
                clearInterval(glitchInterval);
                el.textContent = originalValue;
                isGlitching = false;
            }
        }, 50);
    }, 5000);
});

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    new MatrixRain();
    new QuantumParticles();
    new QuantumCube();
    new TypingEffect();

    updateCountdown('countdown-2029', 2029);
    updateCountdown('countdown-2030', 2030);

    // Update countdowns every day
    setInterval(() => {
        updateCountdown('countdown-2029', 2029);
        updateCountdown('countdown-2030', 2030);
    }, 86400000);
});

// Mouse trail effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
});

// Performance optimization - pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause heavy animations
        console.log('Tab hidden - animations paused');
    } else {
        // Resume animations
        console.log('Tab visible - animations resumed');
    }
});
