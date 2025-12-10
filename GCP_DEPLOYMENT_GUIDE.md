# 🚀 GCP Cloud Run Deployment Guide - RIVIC QSIC

## Quick Deploy (5 minutes)

### **Option 1: Automated Script** (Recommended)

```bash
cd /Users/ande/.gemini/antigravity/scratch/rivic-qsic-status

# Run the deployment script
./deploy-gcp.sh
```

The script will:
1. ✅ Check prerequisites (gcloud CLI)
2. ✅ Prompt for Project ID
3. ✅ Enable required APIs
4. ✅ Let you choose region
5. ✅ Deploy to Cloud Run
6. ✅ Give you live URLs

**Expected Time**: 3-5 minutes

---

### **Option 2: Manual Commands**

If you prefer manual control:

#### **Step 1: Login to GCP**

```bash
gcloud auth login
```

This opens your browser for authentication.

#### **Step 2: Set Your Project**

```bash
# Replace with actual project ID
export PROJECT_ID="your-project-id"

gcloud config set project $PROJECT_ID
```

**Don't have a project?** Create one:
```bash
gcloud projects create rivic-qsic-prod --name="RIVIC QSIC Demo"
```

#### **Step 3: Enable Required APIs**

```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

#### **Step 4: Deploy**

```bash
cd /Users/ande/.gemini/antigravity/scratch/rivic-qsic-status

gcloud run deploy rivic-qsic-demo \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --project $PROJECT_ID
```

#### **Step 5: Get Your URL**

After deployment completes (3-5 minutes), you'll see:

```
Service URL: https://rivic-qsic-demo-xxxxx-ew.a.run.app
```

---

## 🌍 Recommended Regions

| Region | Location | Best For |
|--------|----------|----------|
| `europe-west1` | Belgium | Europe, EXIST reviewers |
| `us-central1` | Iowa, USA | North America |
| `asia-southeast1` | Singapore | Asia-Pacific |

---

## 💰 Cost Breakdown

### **Cloud Run Pricing**:
- **First 2 million requests/month**: FREE
- **CPU**: $0.00002400/vCPU-second
- **Memory**: $0.00000250/GiB-second
- **Networking**: $0.12/GB egress

### **Estimated Monthly Cost**:

**Low Traffic** (1,000 visits/month):
- Cost: **€0-1** (likely free tier)

**Moderate Traffic** (10,000 visits/month):
- Cost: **€3-5**

**High Traffic** (100,000 visits/month):
- Cost: **€15-25**

**Scale-to-Zero**: When no traffic, cost = €0 🎉

---

## 🔧 Post-Deployment Configuration

### **1. Custom Domain Setup**

```bash
# Map your custom domain
gcloud run domain-mappings create \
  --service rivic-qsic-demo \
  --domain demo.rivic.xyz \
  --region europe-west1
```

Then add DNS records (Cloud Console will show you what to add).

### **2. Enable HTTPS**

HTTPS is **automatic** with Cloud Run! ✅

### **3. View Logs**

```bash
gcloud run services logs read rivic-qsic-demo \
  --region europe-west1 \
  --limit 50
```

### **4. Monitor Performance**

Visit Cloud Console:
```
https://console.cloud.google.com/run
```

Metrics available:
- Request count
- Request latency
- Container instance count
- CPU/Memory utilization
- Error rate

### **5. Update Deployment**

After making changes locally:

```bash
cd /Users/ande/.gemini/antigravity/scratch/rivic-qsic-status

gcloud run deploy rivic-qsic-demo \
  --source . \
  --region europe-west1
```

---

## 🔐 Security Best Practices

### **1. Enable Cloud Armor** (Optional - DDoS protection)

```bash
# Create security policy
gcloud compute security-policies create qsic-policy \
  --description "QSIC demo protection"

# Add rate limiting rule
gcloud compute security-policies rules create 1000 \
  --security-policy qsic-policy \
  --expression "true" \
  --action "rate-based-ban" \
  --rate-limit-threshold-count 100 \
  --rate-limit-threshold-interval-sec 60
```

### **2. Set Up Alerts**

Cloud Console → Monitoring → Alerting:
- High error rate (>5%)
- High latency (>2s)
- High costs (>€10/day)

### **3. Implement IAM Restrictions**

```bash
# Least privilege principle
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="user:your-email@gmail.com" \
  --role="roles/run.admin"
```

---

## 📈 Scaling Configuration

### **Auto-Scaling Settings**

```bash
gcloud run services update rivic-qsic-demo \
  --region europe-west1 \
  --min-instances 0 \
  --max-instances 100 \
  --concurrency 80
```

**Explained**:
- `min-instances: 0` - Scale to zero when idle
- `max-instances: 100` - Handle traffic spikes
- `concurrency: 80` - Requests per container

### **Performance Tuning**

For high traffic events (demos, launches):

```bash
gcloud run services update rivic-qsic-demo \
  --region europe-west1 \
  --min-instances 2 \
  --cpu-boost
```

Then scale back after:

```bash
gcloud run services update rivic-qsic-demo \
  --region europe-west1 \
  --min-instances 0 \
  --no-cpu-boost
```

---

## 🧪 Testing Deployment

### **1. Health Check**

```bash
curl https://your-service-url.run.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-09T19:50:00.000Z"
}
```

### **2. Load Test** (Optional)

```bash
# Install Apache Bench
brew install apache-bench

# Run 1000 requests with 10 concurrent connections
ab -n 1000 -c 10 https://your-service-url.run.app/
```

### **3. End-to-End Test**

1. Open dashboard: `https://your-service-url.run.app`
2. Navigate to demo: `https://your-service-url.run.app/demo`
3. Run crypto operations:
   - Generate ML-KEM keys
   - Sign a message
   - Run V2X demo
4. Check all animations work
5. Verify mobile responsive (browser dev tools)

---

## 🐛 Troubleshooting

### **Issue: "Billing not enabled"**

**Solution**:
1. Go to: https://console.cloud.google.com/billing
2. Link a billing account
3. Enable billing for your project

### **Issue: "Permission denied"**

**Solution**:
```bash
# Check current account
gcloud auth list

# Switch accounts if needed
gcloud config set account your-email@gmail.com

# Re-authenticate
gcloud auth login
```

### **Issue: "Deployment timeout"**

**Solution**:
```bash
# Increase timeout
gcloud run deploy rivic-qsic-demo \
  --source . \
  --region europe-west1 \
  --timeout 600
```

### **Issue: "Container crashes on startup"**

**Check logs**:
```bash
gcloud run services logs read rivic-qsic-demo \
  --region europe-west1 \
  --limit 100
```

**Common causes**:
- Port mismatch (ensure `PORT=8080` in code)
- Missing environment variables
- Syntax errors in server code

**Test locally first**:
```bash
docker build -t qsic-test .
docker run -p 8080:8080 qsic-test
```

### **Issue: "403 Forbidden"**

**Check IAM permissions**:
```bash
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:user:your-email@gmail.com"
```

Need these roles:
- `roles/run.admin` or
- `roles/run.developer`

---

## 📊 Monitoring Dashboard

### **Key Metrics to Watch**:

1. **Request Count** - Total HTTP requests
2. **Request Latency** - P50, P95, P99 percentiles
3. **Error Rate** - 4xx and 5xx responses
4. **Container Instances** - Active container count
5. **Billable Time** - CPU + Memory usage
6. **Cold Starts** - First request latency

### **Set Up Monitoring**:

```bash
# Create notification channel (email)
gcloud alpha monitoring channels create \
  --display-name="QSIC Alerts" \
  --type=email \
  --channel-labels=email_address=your-email@gmail.com

# Create alerting policy
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="High Error Rate" \
  --condition-display-name="Error rate > 5%" \
  --condition-threshold-value=5 \
  --condition-threshold-duration=60s
```

---

## 🔄 CI/CD Integration (Optional)

### **GitHub Actions Auto-Deploy**

Create `.github/workflows/deploy-gcp.yml`:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches:
      - main

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REGION: europe-west1
  SERVICE: rivic-qsic-demo

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - id: auth
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}
      
      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy $SERVICE \
            --source . \
            --platform managed \
            --region $REGION \
            --allow-unauthenticated \
            --project $PROJECT_ID
```

**Required Secrets** (GitHub repo settings):
- `GCP_PROJECT_ID`: Your project ID
- `GCP_SA_KEY`: Service account JSON key

---

## 📝 Deployment Checklist

Before deploying:
- [ ] `gcloud` CLI installed and authenticated
- [ ] GCP project created
- [ ] Billing enabled
- [ ] APIs enabled (Cloud Run, Cloud Build)
- [ ] Code tested locally (`npm start`)
- [ ] Docker works (`docker build -t test .`)

After deploying:
- [ ] Test `/health` endpoint
- [ ] Test main dashboard
- [ ] Test `/demo` page
- [ ] Verify all animations work
- [ ] Check mobile responsive
- [ ] Set up monitoring alerts
- [ ] Configure custom domain (if needed)
- [ ] Update documentation with live URL

---

## 🎯 Quick Commands Reference

```bash
# Deploy
./deploy-gcp.sh

# View logs
gcloud run services logs read rivic-qsic-demo --region europe-west1

# Update
gcloud run deploy rivic-qsic-demo --source . --region europe-west1

# Delete
gcloud run services delete rivic-qsic-demo --region europe-west1

# Get URL
gcloud run services describe rivic-qsic-demo \
  --region europe-west1 \
  --format 'value(status.url)'

# Check status
gcloud run services describe rivic-qsic-demo \
  --region europe-west1 \
  --format 'value(status.conditions[0].type)'
```

---

## 🌟 You're Ready!

**Run the deployment script now**:

```bash
cd /Users/ande/.gemini/antigravity/scratch/rivic-qsic-status
./deploy-gcp.sh
```

**Expected time**: 3-5 minutes  
**Expected cost**: €0-5/month  
**Result**: Live public URL for your QSIC demo! 🚀

---

**Need help?** Check GCP documentation:
- Cloud Run: https://cloud.google.com/run/docs
- Pricing: https://cloud.google.com/run/pricing
- Support: https://console.cloud.google.com/support
