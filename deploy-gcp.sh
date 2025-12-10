#!/bin/bash

# ========================================
# RIVIC QSIC - GCP Cloud Run Deployment
# ========================================

echo "🚀 Starting RIVIC QSIC deployment to GCP Cloud Run..."
echo ""

# Step 1: Check prerequisites
echo "📋 Step 1: Checking prerequisites..."

if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI not installed"
    echo "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "⚠️  Warning: Docker not installed (optional for local testing)"
fi

echo "✅ gcloud CLI found: $(gcloud --version | head -n 1)"
echo ""

# Step 2: Set project configuration
echo "📋 Step 2: Configure GCP project..."
echo ""
echo "Please enter your GCP Project ID:"
read -p "Project ID: " PROJECT_ID

if [ -z "$PROJECT_ID" ]; then
    echo "❌ Error: Project ID cannot be empty"
    exit 1
fi

# Set project
gcloud config set project $PROJECT_ID

# Verify project exists
if ! gcloud projects describe $PROJECT_ID &> /dev/null; then
    echo "❌ Error: Project $PROJECT_ID not found or you don't have access"
    echo "Create a project at: https://console.cloud.google.com/projectcreate"
    exit 1
fi

echo "✅ Project set to: $PROJECT_ID"
echo ""

# Step 3: Enable required APIs
echo "📋 Step 3: Enabling required APIs..."

gcloud services enable run.googleapis.com --project=$PROJECT_ID
gcloud services enable cloudbuild.googleapis.com --project=$PROJECT_ID
gcloud services enable containerregistry.googleapis.com --project=$PROJECT_ID

echo "✅ APIs enabled"
echo ""

# Step 4: Choose deployment region
echo "📋 Step 4: Select deployment region..."
echo ""
echo "Recommended regions:"
echo "1) europe-west1 (Belgium) - Low latency for Europe"
echo "2) us-central1 (Iowa) - Low latency for US"
echo "3) asia-southeast1 (Singapore) - Low latency for Asia"
echo ""
read -p "Enter region [default: europe-west1]: " REGION
REGION=${REGION:-europe-west1}

echo "✅ Selected region: $REGION"
echo ""

# Step 5: Choose service name
echo "📋 Step 5: Configure service name..."
echo ""
read -p "Enter service name [default: rivic-qsic-demo]: " SERVICE_NAME
SERVICE_NAME=${SERVICE_NAME:-rivic-qsic-demo}

echo "✅ Service name: $SERVICE_NAME"
echo ""

# Step 6: Deploy to Cloud Run
echo "📋 Step 6: Deploying to Cloud Run..."
echo ""
echo "⏳ This will take 3-5 minutes (building Docker image and deploying)..."
echo ""

gcloud run deploy $SERVICE_NAME \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0 \
  --port 8080 \
  --timeout 300 \
  --project $PROJECT_ID

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo "✅ DEPLOYMENT SUCCESSFUL!"
    echo "========================================="
    echo ""
    
    # Get the service URL
    SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
        --region $REGION \
        --project $PROJECT_ID \
        --format 'value(status.url)')
    
    echo "🌐 Your live URLs:"
    echo ""
    echo "   Main Dashboard:     $SERVICE_URL"
    echo "   Interactive Demo:   $SERVICE_URL/demo"
    echo "   API Endpoint:       $SERVICE_URL/api/status"
    echo "   Health Check:       $SERVICE_URL/health"
    echo ""
    echo "========================================="
    echo ""
    echo "📊 Next steps:"
    echo ""
    echo "1. Test your deployment:"
    echo "   curl $SERVICE_URL/health"
    echo ""
    echo "2. View in browser:"
    echo "   open $SERVICE_URL"
    echo ""
    echo "3. Monitor logs:"
    echo "   gcloud run services logs read $SERVICE_NAME --region $REGION --project $PROJECT_ID"
    echo ""
    echo "4. Add custom domain (optional):"
    echo "   gcloud run domain-mappings create --service $SERVICE_NAME --domain demo.rivic.xyz --region $REGION"
    echo ""
    echo "5. View in Cloud Console:"
    echo "   https://console.cloud.google.com/run/detail/$REGION/$SERVICE_NAME?project=$PROJECT_ID"
    echo ""
    echo "========================================="
    echo ""
    echo "💰 Cost estimate: €3-5/month for moderate traffic"
    echo "💡 Tip: Service scales to zero when not in use (no cost)"
    echo ""
    
    # Save deployment info
    cat > deployment-info.txt << EOF
RIVIC QSIC Deployment Information
==================================

Deployment Date: $(date)
Project ID: $PROJECT_ID
Service Name: $SERVICE_NAME
Region: $REGION
Service URL: $SERVICE_URL

URLs:
- Dashboard: $SERVICE_URL
- Demo: $SERVICE_URL/demo
- API: $SERVICE_URL/api/status

Commands:
- View logs: gcloud run services logs read $SERVICE_NAME --region $REGION
- Update: gcloud run deploy $SERVICE_NAME --source . --region $REGION
- Delete: gcloud run services delete $SERVICE_NAME --region $REGION
EOF

    echo "📝 Deployment info saved to: deployment-info.txt"
    echo ""
    
else
    echo ""
    echo "========================================="
    echo "❌ DEPLOYMENT FAILED"
    echo "========================================="
    echo ""
    echo "Common issues:"
    echo "1. Billing not enabled - Enable at: https://console.cloud.google.com/billing"
    echo "2. APIs not enabled - Run script again"
    echo "3. Insufficient permissions - Check IAM roles"
    echo "4. Dockerfile errors - Test locally: docker build -t test ."
    echo ""
    echo "For detailed logs, check the output above."
    echo ""
    exit 1
fi
