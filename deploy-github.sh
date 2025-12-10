#!/bin/bash

# ========================================
# RIVIC QSIC - GitHub Pages Deployment
# Quick Setup & Deploy Script
# ========================================

clear
echo "🚀 RIVIC QSIC - GitHub Pages Deployment"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check git installation
echo "📋 Step 1: Checking prerequisites..."
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Error: git not installed${NC}"
    echo "Install git: https://git-scm.com/downloads"
    exit 1
fi
echo -e "${GREEN}✅ Git found: $(git --version)${NC}"
echo ""

# Step 2: Configure git (if needed)
echo "📋 Step 2: Configure git user..."
GIT_NAME=$(git config --global user.name)
GIT_EMAIL=$(git config --global user.email)

if [ -z "$GIT_NAME" ]; then
    echo "Please enter your name for git commits:"
    read -p "Name: " INPUT_NAME
    git config --global user.name "$INPUT_NAME"
    echo -e "${GREEN}✅ Name set to: $INPUT_NAME${NC}"
else
    echo -e "${GREEN}✅ Git name already set: $GIT_NAME${NC}"
fi

if [ -z "$GIT_EMAIL" ]; then
    echo "Please enter your email for git commits:"
    read -p "Email: " INPUT_EMAIL
    git config --global user.email "$INPUT_EMAIL"
    echo -e "${GREEN}✅ Email set to: $INPUT_EMAIL${NC}"
else
    echo -e "${GREEN}✅ Git email already set: $GIT_EMAIL${NC}"
fi
echo ""

# Step 3: Initialize git repository
echo "📋 Step 3: Initialize git repository..."
if [ -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git repository already exists${NC}"
    echo "Do you want to use the existing repository? (y/n)"
    read -p "> " USE_EXISTING
    if [ "$USE_EXISTING" != "y" ]; then
        echo "Please manually handle the existing .git directory"
        exit 1
    fi
else
    git init
    echo -e "${GREEN}✅ Git repository initialized${NC}"
fi
echo ""

# Step 4: Add files to git
echo "📋 Step 4: Adding files to git..."
git add .
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Files added${NC}"
else
    echo -e "${RED}❌ Error adding files${NC}"
    exit 1
fi
echo ""

# Step 5: Create commit
echo "📋 Step 5: Creating initial commit..."
git commit -m "Initial commit - RIVIC QSIC Interactive Demo

- Status dashboard with TRL progress
- Interactive crypto demo (ML-KEM, ML-DSA)
- Hardware ASIC visualization
- Use case demonstrations (V2X, IoT, HSM)
- GitHub Pages ready deployment"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Commit created${NC}"
else
    echo -e "${YELLOW}⚠️  Nothing to commit or commit failed${NC}"
fi
echo ""

# Step 6: Get GitHub username
echo "========================================="
echo "📋 Step 6: GitHub Repository Setup"
echo "========================================="
echo ""
echo "Please enter your GitHub username:"
read -p "Username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ Error: GitHub username required${NC}"
    exit 1
fi
echo ""

# Step 7: Repository name
echo "What would you like to name your repository?"
read -p "Repository name [default: rivic-qsic-demo]: " REPO_NAME
REPO_NAME=${REPO_NAME:-rivic-qsic-demo}
echo ""

# Step 8: Instructions for creating GitHub repo
echo "========================================="
echo "📋 Step 7: Create GitHub Repository"
echo "========================================="
echo ""
echo -e "${BLUE}Please follow these steps:${NC}"
echo ""
echo "1. Open this URL in your browser:"
echo -e "   ${GREEN}https://github.com/new${NC}"
echo ""
echo "2. Fill in the form:"
echo -e "   Repository name: ${GREEN}$REPO_NAME${NC}"
echo "   Description: RIVIC QSIC Interactive Demo - Quantum-Safe Cryptography Platform"
echo "   Visibility: ✅ Public (required for free GitHub Pages)"
echo "   ❌ Do NOT initialize with README, .gitignore, or license"
echo ""
echo "3. Click 'Create repository'"
echo ""
echo "Press Enter when you've created the repository..."
read -p ""

# Step 9: Add remote and push
echo ""
echo "📋 Step 8: Pushing to GitHub..."
echo ""

GITHUB_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo "Adding remote: $GITHUB_URL"

# Check if remote already exists
if git remote get-url origin &> /dev/null; then
    echo -e "${YELLOW}⚠️  Remote 'origin' already exists. Updating...${NC}"
    git remote set-url origin $GITHUB_URL
else
    git remote add origin $GITHUB_URL
fi

# Set branch to main
git branch -M main

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
echo "(You may be prompted for your GitHub credentials)"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo -e "${GREEN}✅ CODE PUSHED TO GITHUB!${NC}"
    echo "========================================="
    echo ""
else
    echo ""
    echo -e "${RED}❌ Push failed${NC}"
    echo ""
    echo "Common issues:"
    echo "1. Authentication needed - Use GitHub Personal Access Token"
    echo "2. Repository doesn't exist - Create it at https://github.com/new"
    echo "3. Wrong credentials - Check username/password"
    echo ""
    echo "To authenticate with Personal Access Token:"
    echo "1. Create token at: https://github.com/settings/tokens"
    echo "2. When prompted for password, use token instead"
    echo ""
    exit 1
fi

# Step 10: Enable GitHub Pages
echo ""
echo "========================================="
echo "📋 Step 9: Enable GitHub Pages"
echo "========================================="
echo ""
echo -e "${BLUE}Follow these steps to enable GitHub Pages:${NC}"
echo ""
echo "1. Open this URL in your browser:"
echo -e "   ${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages${NC}"
echo ""
echo "2. Under 'Build and deployment':"
echo "   Source: Select 'GitHub Actions'"
echo ""
echo "3. Wait 2-3 minutes for deployment"
echo ""
echo "4. Your site will be live at:"
echo -e "   ${GREEN}https://$GITHUB_USERNAME.github.io/$REPO_NAME/${NC}"
echo ""
echo "========================================="
echo ""

# Save deployment info
cat > github-deployment-info.txt << EOF
RIVIC QSIC - GitHub Deployment Information
===========================================

Deployment Date: $(date)
GitHub Username: $GITHUB_USERNAME
Repository Name: $REPO_NAME
Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME

Live URLs (after GitHub Pages is enabled):
- Main Dashboard: https://$GITHUB_USERNAME.github.io/$REPO_NAME/
- Interactive Demo: https://$GITHUB_USERNAME.github.io/$REPO_NAME/demo.html
- API Data: https://$GITHUB_USERNAME.github.io/$REPO_NAME/api/status.json

GitHub Actions URL:
- https://github.com/$GITHUB_USERNAME/$REPO_NAME/actions

Commands for future updates:
- Make changes to code
- git add .
- git commit -m "Your update message"
- git push

Your site will auto-deploy on every push to main branch!
EOF

echo -e "${GREEN}✅ Deployment info saved to: github-deployment-info.txt${NC}"
echo ""

echo "========================================="
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Enable GitHub Pages (instructions above)"
echo "2. Wait 2-3 minutes for deployment"
echo "3. Visit your live site!"
echo ""
echo "Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo "Live Site: https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
echo "💡 Tip: Bookmark your live URLs for easy access!"
echo ""
