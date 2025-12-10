// ===================================
// RIVIC QSIC Status Dashboard
// Interactive Features & Animations
// ===================================

// ===== QUANTUM NETWORK BACKGROUND =====
class QuantumNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.maxParticles = 80;
        this.connectionDistance = 150;
        this.mouse = { x: null, y: null, radius: 150 };

        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                hue: Math.random() * 60 + 200 // Blue to purple range
            });
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Mouse interaction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.vx -= Math.cos(angle) * force * 0.2;
                    particle.vy -= Math.sin(angle) * force * 0.2;
                }
            }

            // Limit velocity
            const maxSpeed = 2;
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > maxSpeed) {
                particle.vx = (particle.vx / speed) * maxSpeed;
                particle.vy = (particle.vy / speed) * maxSpeed;
            }
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${particle.opacity})`;
            this.ctx.fill();

            // Glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = `hsla(${particle.hue}, 100%, 60%, 0.5)`;
            this.ctx.shadowBlur = 0;
        });
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.3;
                    const avgHue = (this.particles[i].hue + this.particles[j].hue) / 2;

                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `hsla(${avgHue}, 100%, 60%, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.animateProgressBars();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.status-card, .metric-card, .funding-card, .risk-card, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    animateProgressBars() {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.progress-fill, .metric-bar-fill');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                    progressObserver.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.status-card, .metric-card').forEach(el => {
            progressObserver.observe(el);
        });
    }
}

// ===== TRL PROGRESS ANIMATION =====
class TRLProgress {
    constructor() {
        this.trlFill = document.querySelector('.trl-fill');
        this.currentMarker = document.querySelector('.trl-marker.current');
        this.targetMarker = document.querySelector('.trl-marker.target');

        if (this.trlFill) {
            this.animateTRL();
        }
    }

    animateTRL() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        this.trlFill.style.width = '33%';
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.trlFill.parentElement);
    }
}

// ===== SMOOTH SCROLL =====
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ===== PERFORMANCE COUNTER ANIMATION =====
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-value, .funding-amount');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));

        if (isNaN(number)) return;

        const duration = 1500;
        const steps = 60;
        const increment = number / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            current += increment;
            step++;

            if (step >= steps) {
                current = number;
                clearInterval(timer);
            }

            element.textContent = text.replace(number.toString(), Math.floor(current).toString());
        }, duration / steps);
    }
}

// ===== FETCH AND UPDATE DATA =====
class DataManager {
    constructor() {
        this.apiEndpoint = '/api/status.json';
        this.fetchData();
    }

    // Fetch status data from API (static JSON for GitHub Pages)
    async fetchData() {
        try {
            const response = await fetch(this.apiEndpoint);
            const data = await response.json();

            // Update dashboard with API data
            console.log('Status data loaded:', data);
            this.updateUI(data);
        } catch (error) {
            console.error('Error fetching status data:', error);
        }
    }

    updateUI(data) {
        // Update TRL level
        if (data.trl) {
            const trlPercentage = (data.trl / 9) * 100;
            const trlFill = document.querySelector('.trl-fill');
            if (trlFill) {
                trlFill.setAttribute('data-trl', data.trl);
            }
        }

        // Update component statuses
        if (data.components) {
            Object.keys(data.components).forEach(key => {
                const component = data.components[key];
                const card = document.querySelector(`[data-component="${key}"]`);
                if (card) {
                    const progressBar = card.querySelector('.progress-fill');
                    if (progressBar) {
                        progressBar.style.width = `${component.progress}%`;
                    }
                }
            });
        }
    }
}

// ===== MOBILE MENU =====
class MobileMenu {
    constructor() {
        this.createMenuButton();
        this.setupEventListeners();
    }

    createMenuButton() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.nav');
            if (nav && !document.querySelector('.menu-toggle')) {
                const toggle = document.createElement('button');
                toggle.className = 'menu-toggle';
                toggle.innerHTML = '☰';
                toggle.setAttribute('aria-label', 'Toggle menu');
                nav.parentElement.insertBefore(toggle, nav);
            }
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                const nav = document.querySelector('.nav');
                if (nav) nav.classList.remove('mobile-open');
            } else {
                this.createMenuButton();
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('menu-toggle')) {
                const nav = document.querySelector('.nav');
                if (nav) nav.classList.toggle('mobile-open');
            }
        });
    }
}

// ===== LOADING ANIMATION =====
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');

            // Trigger initial animations
            setTimeout(() => {
                document.querySelectorAll('.hero .hero-badge, .hero .hero-title, .hero .hero-subtitle, .hero .trl-progress').forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
            }, 100);
        });
    }
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 RIVIC QSIC Status Dashboard Initializing...');

    // Initialize quantum network animation
    const quantumNetwork = new QuantumNetwork('quantum-network');

    // Initialize scroll animations
    const scrollAnimations = new ScrollAnimations();

    // Initialize TRL progress
    const trlProgress = new TRLProgress();

    // Initialize smooth scroll
    const smoothScroll = new SmoothScroll();

    // Initialize counter animations
    const counterAnimation = new CounterAnimation();

    // Initialize data manager
    const dataManager = new DataManager();

    // Initialize mobile menu
    const mobileMenu = new MobileMenu();

    // Initialize loading animation
    const loadingAnimation = new LoadingAnimation();

    console.log('✅ Dashboard initialized successfully!');
});

// ===== ANALYTICS & TRACKING =====
// Track page views and interactions for EXIST application demonstration
const trackEvent = (category, action, label) => {
    console.log(`📊 Event: ${category} - ${action} - ${label}`);
    // In production, integrate with Google Analytics or similar
};

// Track section visibility
const trackSectionViews = () => {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id || entry.target.className;
                trackEvent('Section View', 'Scroll', sectionId);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
};

// Initialize tracking
trackSectionViews();
