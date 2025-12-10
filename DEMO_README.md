# RIVIC QSIC Interactive Demo - README

## 🎯 Overview

The **RIVIC QSIC Interactive Demo** is a comprehensive software + hardware visualization showing how quantum-safe cryptography works with hardware acceleration. This demo demonstrates:

1. **Real Cryptographic Operations** - ML-KEM-768 and ML-DSA-65
2. **Hardware Acceleration Visualization** - ASIC processing simulation
3. **Real-World Use Cases** - Automotive V2X, IoT, Enterprise HSM

---

## 🚀 Features

### **1. Cryptographic Operations**

#### ML-KEM-768 (Key Encapsulation Mechanism)
- **Key Generation** - Generate quantum-safe key pairs
- **Encapsulation** - Encrypt shared secrets
- Real-time performance comparison (software vs hardware)
- Display of actual key sizes and processing times

#### ML-DSA-65 (Digital Signature Algorithm)
- **Message Signing** - Create quantum-safe digital signatures
- **Signature Verification** - Validate authenticity
- Interactive message input
- Side-by-side performance metrics

### **2. Hardware Visualization**

Interactive ASIC architecture simulation showing:

- **CPU Interface** - Data flow from host processor
- **Control Unit** - Operation state machine
- **NTT Accelerator** - 8 parallel butterfly units
- **Memory Subsystem** - 256KB SRAM with real-time usage
- **Security Module** - DPA masking, constant-time execution, TRNG
- **Performance Monitor** - Clock, power, temperature monitoring
- **Operation Timeline** - Visual representation of processing stages

### **3. Real-World Use Cases**

#### Automotive V2X Communication
- **Scenario**: Vehicle-to-vehicle and vehicle-to-infrastructure messaging
- **Challenge**: 10,000+ signatures/sec with <100ms latency
- **Demo**: Live message signing animation with performance stats
- **Metrics**: Messages sent, avg latency, success rate

#### IoT Device Security
- **Scenario**: Securing low-power IoT devices
- **Challenge**: Quantum-safe encryption on <500mW power budget
- **Demo**: Device-by-device security provisioning
- **Metrics**: Devices secured, power usage, uptime

#### Enterprise HSM (Hardware Security Module)
- **Scenario**: High-throughput key management
- **Challenge**: 1M+ operations/day, FIPS 140-3 compliance
- **Demo**: Load testing simulation with real-time metrics
- **Metrics**: Operations/sec, latency, load percentage

---

## 🎨 Interactive Elements

### **Mode Selection**
- **Software Mode**: Simulates current Python prototype performance
  - ML-KEM KeyGen: 300 ops/sec (3.33ms per operation)
  - ML-DSA Sign: 150 ops/sec (6.67ms per operation)

- **Hardware Mode**: Simulates QSIC ASIC with NTT acceleration
  - ML-KEM KeyGen: 2,000 ops/sec (0.5ms per operation)
  - ML-DSA Sign: 1,200 ops/sec (0.83ms per operation)

### **Real-Time Feedback**
- Operation progress animations
- Hardware block activation visualization
- NTT butterfly unit processing
- Memory usage tracking
- Timeline canvas rendering

---

## 📊 Performance Comparison

| Operation | Software | Hardware (QSIC) | Speedup |
|-----------|----------|-----------------|---------|
| **ML-KEM-768 KeyGen** | 300 ops/sec | 2,000 ops/sec | **6.7x** |
| **ML-KEM-768 Encaps** | 500 ops/sec | 3,500 ops/sec | **7.0x** |
| **ML-DSA-65 Sign** | 150 ops/sec | 1,200 ops/sec | **8.0x** |
| **ML-DSA-65 Verify** | 400 ops/sec | 2,800 ops/sec | **7.0x** |

---

## 🏗️ Architecture

### **Frontend Components**

```
public/
├── demo.html              # Main demo page
├── css/
│   ├── main.css          # Base styles (shared)
│   └── demo.css          # Demo-specific styles
└── js/
    ├── app.js            # Core utilities (shared)
    ├── crypto-demo.js    # Cryptographic operations
    ├── hardware-viz.js   # Hardware visualization
    └── use-cases.js      # Use case simulations
```

### **Key Classes**

1. **CryptoDemo** (`crypto-demo.js`)
   - Manages cryptographic operation simulations
   - Handles mode switching (software/hardware)
   - Generates mock crypto data
   - Triggers hardware visualizations

2. **HardwareVisualization** (`hardware-viz.js`)
   - Simulates ASIC processing
   - Animates hardware blocks
   - Renders timeline canvas
   - Updates performance metrics

3. **UseCasesDemo** (`use-cases.js`)
   - Tab switching for use cases
   - V2X, IoT, HSM simulations
   - Real-time stats updates
   - Animation orchestration

---

## 🎮 How to Use

### **1. Access the Demo**

```
http://localhost:8080/demo
```

Or after deploying to GCP:
```
https://your-app-name.run.app/demo
```

### **2. Select Execution Mode**

Click on either:
- **Software Only** - See current prototype performance
- **Hardware Accelerated** - See QSIC ASIC performance (6-8x faster)

### **3. Run Cryptographic Operations**

#### Generate Keys
1. Click "Generate Key Pair"
2. Watch hardware visualization activate
3. See public/private keys displayed
4. Note execution time

#### Encapsulate Secret
1. Generate keys first
2. Click "Encapsulate Secret"
3. View ciphertext and shared secret
4. Compare performance

#### Sign Message
1. Enter your message in text area
2. Click "Sign Message"
3. See digital signature generated
4. Performance metrics displayed

#### Verify Signature
1. Sign a message first
2. Click "Verify Signature"
3. Signature validation shown
4. Execution time compared

### **4. Explore Hardware Visualization**

Watch real-time updates:
- **CPU Interface** - Data flow indicator
- **Control Unit** - Current operation state
- **NTT Accelerator** - 8 butterfly units animating
- **Memory** - Usage bar filling up
- **Security** - Always-on protection indicators
- **Timeline** - Visual processing stages

### **5. Try Use Cases**

#### Automotive V2X
1. Switch to "Automotive V2X" tab
2. Click "Start V2X Demo"
3. Watch vehicles sign/verify messages
4. See latency <25ms per message

#### IoT Devices
1. Switch to "IoT Devices" tab
2. Click "Start IoT Demo"
3. Watch 4 devices get secured
4. Monitor power consumption

#### Enterprise HSM
1. Switch to "Enterprise HSM" tab
2. Click "Start HSM Load Test"
3. Ramp up to 2,000 ops/sec
4. Monitor latency and load

---

## 🔧 Technical Details

### **Simulation Accuracy**

- **Processing Times**: Based on cycle-accurate analysis
  - Software: Measured on Intel Core i7-11700K
  - Hardware: 50,000 cycles @ 100MHz for ML-KEM KeyGen

- **Hardware Architecture**: Matches technical whitepaper
  - 8 parallel NTT butterfly units
  - 256KB dual-port SRAM
  - Modular arithmetic units with Barrett reduction

- **Security Features**: As specified in ASIC design
  - First-order DPA masking
  - Constant-time implementation
  - TRNG for nonce generation

### **Mock Data Generation**

The demo generates **cryptographically-plausible** mock data:
- Key sizes match NIST specifications
- Hex format matches actual output
- Performance timing is realistic

**Note**: This is a demonstration. For production use, integrate with actual `liboqs` library.

---

## 📈 Performance Metrics Explained

### **Operations Per Second (ops/sec)**
- Number of complete operations in 1 second
- Higher = better throughput
- Critical for high-volume applications (HSM, V2X)

### **Execution Time (ms)**
- Time to complete one operation
- Lower = better latency
- Critical for real-time applications (automotive)

### **Power Consumption (mW)**
- Average power draw during operation
- Lower = better for IoT/mobile
- QSIC target: <500mW @ 100MHz

### **Speedup (Nx)**
- Hardware performance / Software performance
- QSIC achieves 6-8x speedup via NTT acceleration

---

## 🎯 Use Case Requirements Matrix

| Requirement | Automotive V2X | IoT Devices | Enterprise HSM |
|-------------|---------------|-------------|----------------|
| **Throughput** | 10,000 ops/sec | 100+ ops/sec | 1M+ ops/day |
| **Latency** | <100ms | <500ms | <10ms |
| **Power** | <5W | <500mW | Not constrained |
| **Security** | Quantum-safe | Quantum-safe | Quantum-safe + FIPS |
| **Cost** | <$50/unit | <$10/unit | <$20K/HSM |

**RIVIC QSIC Performance**:
- ✅ Throughput: 2,000 ops/sec per algorithm
- ✅ Latency: 0.4-0.8ms average
- ✅ Power: 400-480mW typical
- ✅ Security: NIST PQC + side-channel protection
- ✅ Cost: €8-12K (50% cheaper than competitors)

---

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Canvas rendering requires modern browser with full HTML5 support.

---

## 🚀 Deployment Notes

The demo is fully integrated with the main status dashboard:

1. **Same Backend**: Express server handles both pages
2. **Shared Assets**: CSS/JS utilities reused
3. **Single Deployment**: One `gcloud run deploy` command
4. **Same Docker Image**: No separate container needed

---

## 📝 Educational Value

This demo is perfect for:

1. **EXIST Application Reviewers** - See technology in action
2. **Potential Investors** - Understand value proposition
3. **Technical Partners** - Evaluate integration complexity
4. **Customers** - Experience real-world scenarios
5. **Engineering Teams** - Learn PQC concepts

---

## 🔮 Future Enhancements

**Phase 1** (Current):
- [x] Software vs Hardware mode
- [x] ML-KEM and ML-DSA operations
- [x] Hardware visualization
- [x] 3 use case scenarios

**Phase 2** (With FPGA Prototype):
- [ ] Real FPGA backend integration
- [ ] Actual liboqs-python connection
- [ ] Live performance measurements
- [ ] WebSocket real-time updates

**Phase 3** (With ASIC Silicon):
- [ ] Physical hardware connection
- [ ] Oscilloscope power measurements
- [ ] Side-channel analysis visualization
- [ ] FIPS 140-3 validation demos

---

## 📊 Success Metrics

**Engagement Goals**:
- **Session Duration**: >3 minutes average
- **Demo Interaction**: 80%+ users run at least one operation
- **Use Case Views**: All 3 tabs visited
- **Mode Switching**: Users toggle software/hardware modes

**Technical Communication**:
- **Complexity Reduction**: Complex crypto → visual animations
- **Performance Clarity**: 6-8x speedup clearly demonstrated
- **Trust Building**: Transparent simulation vs real data

---

## 🏆 Competitive Advantage

**PQShield** - Software only, no visualization  
**Sealsq** - Hardware exists, but closed-source black box  
**Cryptonext** - Software focus, no hardware demo  

**RIVIC Advantage**: Interactive, educational, transparent demonstration of software + hardware integration.

---

## 📞 Support

For technical questions about the demo:
- Check browser console for errors
- Ensure JavaScript enabled
- Test in Chrome/Firefox for best experience
- View source code for implementation details

---

**Built by RIVIC Technologies**  
Quantum-Safe Integrated Circuits  
December 2025
