# Quick Deployment Guide for GCP Cloud Run

## Prerequisites
- Google Cloud account with billing enabled
- gcloud CLI installed and configured
- Project created in GCP

## 1️⃣ One-Command Deployment

```bash
# Set your project ID
export PROJECT_ID="your-project-id-here"

# Deploy (single command)
gcloud run deploy rivic-qsic-status \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --project $PROJECT_ID
```

This command will:
1. Build your Docker image using Cloud Build
2. Push to Container Registry
3. Deploy to Cloud Run
4. Provide a public URL

## 2️⃣ Post-Deployment

After deployment completes, you'll receive a URL like:
```
Service [rivic-qsic-status] revision [rivic-qsic-status-00001-xyz] has been deployed and is serving 100 percent of traffic.
Service URL: https://rivic-qsic-status-xxxxxxxxxx-ew.a.run.app
```

Visit this URL to see your live dashboard!

## 3️⃣ Update/Redeploy

To update after making changes:

```bash
# Same command - Cloud Run handles versioning
gcloud run deploy rivic-qsic-status \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --project $PROJECT_ID
```

## 4️⃣ Custom Domain (Optional)

```bash
# Map custom domain
gcloud run services update rivic-qsic-status \
  --platform managed \
  --region europe-west1 \
  --project $PROJECT_ID

# Then configure DNS in Cloud Console
```

## 5️⃣ Monitor Deployment

```bash
# View logs
gcloud run logs read rivic-qsic-status \
  --platform managed \
  --region europe-west1 \
  --project $PROJECT_ID

# View service details
gcloud run services describe rivic-qsic-status \
  --platform managed \
  --region europe-west1 \
  --project $PROJECT_ID
```

## 🔧 Troubleshooting

**Error: "API not enabled"**
```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

**Error: "Permission denied"**
```bash
gcloud auth login
gcloud config set project $PROJECT_ID
```

**Error: "Billing not enabled"**
- Go to GCP Console → Billing
- Enable billing for your project

## 💰 Cost Estimate

Cloud Run pricing (as of 2025):
- First 2 million requests/month: FREE
- After: ~$0.40 per million requests
- Estimated cost for demo: <€5/month

## 🎯 Next Steps

1. Test the deployed URL
2. Share with EXIST reviewers
3. Update content as needed
4. Monitor analytics via GCP Console

---

**Need help?** Check the full README.md or GCP Cloud Run documentation.
