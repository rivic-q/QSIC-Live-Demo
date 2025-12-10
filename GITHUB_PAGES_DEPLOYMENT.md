# 🚀 GitHub Pages Deployment - Quick Guide

## **Deploy in 3 Steps** (5 minutes)

### **Step 1: Run the Deployment Script**

```bash
cd /Users/ande/.gemini/antigravity/scratch/rivic-qsic-status

./deploy-github.sh
```

The script will:
- ✅ Check git installation
- ✅ Configure git (name/email)
- ✅ Initialize repository
- ✅ Commit your code
- ✅ Guide you to create GitHub repo
- ✅ Push to GitHub
- ✅ Show you how to enable Pages

---

### **Step 2: Create GitHub Repository**

When the script prompts, open: **https://github.com/new**

Fill in:
- **Repository name**: `rivic-qsic-demo` (or your choice)
- **Description**: "RIVIC QSIC Interactive Demo - Quantum-Safe Cryptography"
- **Visibility**: ✅ **Public** (required for free Pages)
- ❌ **Don't** initialize with README
- Click **"Create repository"**

---

### **Step 3: Enable GitHub Pages**

After pushing code, go to:
```
https://github.com/YOUR-USERNAME/rivic-qsic-demo/settings/pages
```

Under **"Build and deployment"**:
- **Source**: Select **"GitHub Actions"**

Wait 2-3 minutes ⏰

---

## 🌐 **Your Live URLs**

```
Main Dashboard:
https://YOUR-USERNAME.github.io/rivic-qsic-demo/

Interactive Demo:
https://YOUR-USERNAME.github.io/rivic-qsic-demo/demo.html

API Data:
https://YOUR-USERNAME.github.io/rivic-qsic-demo/api/status.json
```

---

## 🔄 **Update Your Site**

Every time you make changes:

```bash
cd /Users/ande/.gemini/antigravity/scratch/rivic-qsic-status

git add .
git commit -m "Updated demo features"
git push

# Wait 2-3 minutes, changes are live!
```

---

## 💰 **Cost**: $0.00 (Completely FREE!)

## ✨ **What You Get**:
- ✅ Live public website
- ✅ HTTPS included (secure)
- ✅ Auto-deploy on every push
- ✅ Custom domain support (optional)
- ✅ 100GB bandwidth/month
- ✅ Perfect for demos and portfolios

---

## 🎯 **Use Your Live Site For**:

✅ EXIST grant application demos  
✅ Investor presentations  
✅ Partner demonstrations  
✅ LinkedIn/Resume portfolio  
✅ Technical documentation  

---

## 🔧 **Optional: Custom Domain**

Want `demo.rivic.xyz` instead of `username.github.io/repo`?

1. Add `CNAME` file:
```bash
echo "demo.rivic.xyz" > public/CNAME
git add public/CNAME
git commit -m "Add custom domain"
git push
```

2. Update DNS settings at your domain registrar:
```
Type: CNAME
Name: demo
Value: YOUR-USERNAME.github.io
```

3. Wait 10-60 minutes for DNS propagation

---

## 🐛 **Troubleshooting**

### **Issue: "Authentication failed"**

**Solution**: Use Personal Access Token instead of password

1. Create token: https://github.com/settings/tokens/new
2. Scopes needed: `repo`, `workflow`
3. When prompted for password, paste token

### **Issue: "Repository not found"**

**Solution**: Make sure you created the repository at https://github.com/new

### **Issue: "Pages not deploying"**

**Solution**: 
1. Check Actions tab: `https://github.com/USERNAME/REPO/actions`
2. View errors in workflow run
3. Ensure `public/.nojekyll` file exists
4. Verify GitHub Actions are enabled in repo settings

---

## ✅ **Ready to Deploy!**

Run this now:

```bash
cd /Users/ande/.gemini/antigravity/scratch/rivic-qsic-status
./deploy-github.sh
```

**Follow the script prompts and you'll be live in 5 minutes!** 🚀

---

**Your demos will be at**: `https://YOUR-USERNAME.github.io/rivic-qsic-demo/`
