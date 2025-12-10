const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Compression middleware
app.use(compression());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint for status data
app.get('/api/status', (req, res) => {
    res.json({
        reportDate: 'December 9, 2025',
        trl: 3,
        targetTrl: 5,
        components: {
            softwarePrototype: { status: 'complete', progress: 100 },
            proofOfConcept: { status: 'complete', progress: 100 },
            architectureDesign: { status: 'complete', progress: 100 },
            rtlCode: { status: 'in-progress', progress: 85 },
            fpgaPrototype: { status: 'not-started', progress: 0 },
            asicSilicon: { status: 'not-started', progress: 0 }
        },
        performance: {
            mlkem768: {
                keyGen: { software: 300, hardwareTarget: 2000 },
                encapsulation: { software: 500, hardwareTarget: 3500 }
            },
            mldsa65: {
                signing: { software: 150, hardwareTarget: 1200 },
                verification: { software: 400, hardwareTarget: 2800 }
            }
        },
        timeline: {
            withExist: [
                { month: 1, milestone: 'Order FPGA Board' },
                { month: 3, milestone: 'Synthesize RTL → FPGA' },
                { month: 6, milestone: 'FPGA Prototype Complete' },
                { month: 7, milestone: 'Submit ASIC Design' },
                { month: 12, milestone: 'ASIC Silicon Ready' },
                { month: 18, milestone: 'TRL 5 Achieved' }
            ],
            withoutExist: [
                { status: 'Stuck at TRL 3 - No Hardware Prototype' }
            ]
        },
        funding: {
            phase1Budget: 250000,
            breakdown: {
                fpgaPrototype: 63000,
                asicTapeout: 80000,
                postSiliconTesting: 30000,
                teamExpansion: 77000
            }
        }
    });
});

// Health check endpoint for GCP
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Demo page route
app.get('/demo', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/demo.html'));
});

// Catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 RIVIC QSIC Status Dashboard running on port ${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}`);
    console.log(`🔌 API: http://localhost:${PORT}/api/status`);
});
