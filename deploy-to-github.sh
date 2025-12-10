#!/bin/bash

# ========================================
# RIVIC QSIC - Push to GitHub (rivic-q/Rivicq)
# Complete Setup for Live Website
# ========================================

clear
echo "🚀 RIVIC QSIC - GitHub Deployment"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "This script will push your QSIC demo to:"
echo "Repository: https://github.com/rivic-q/Rivicq"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Not in QSIC project directory${NC}"
    echo "Please run this from: /Users/ande/.gemini/antigravity/scratch/rivic-qsic-status"
    exit 1
fi

echo "========================================="
echo "🔐 Step 1: GitHub Authentication"
echo "========================================="
echo ""
echo -e "${YELLOW}You need to authenticate with GitHub.${NC}"
echo ""
echo "Choose authentication method:"
echo "1) Personal Access Token (Recommended - easier)"
echo "2) SSH Key (More secure, but requires setup)"
echo "3) GitHub CLI (Easiest - automatic)"
echo ""
read -p "Enter choice (1-3): " AUTH_CHOICE

case $AUTH_CHOICE in
    1)
        echo ""
        echo "📋 Creating Personal Access Token:"
        echo ""
        echo "1. Open this URL in your browser:"
        echo -e "   ${GREEN}https://github.com/settings/tokens/new${NC}"
        echo ""
        echo "2. Fill in:"
        echo "   Note: RIVIC QSIC Deployment"
        echo "   Expiration: 90 days"
        echo "   Scopes: Check 'repo' and 'workflow'"
        echo ""
        echo "3. Click 'Generate token'"
        echo "4. Copy the token (starts with ghp_...)"
        echo ""
        read -p "Press Enter when you have your token..."
        echo ""
        echo "Now pushing to GitHub..."
        echo "When prompted:"
        echo "  Username: rivic-q"
        echo "  Password: PASTE YOUR TOKEN (not your password!)"
        echo ""
        git push -u origin main
        ;;
    
    2)
        echo ""
        echo "📋 SSH Key Setup:"
        echo ""
        echo "1. Generate SSH key (if you don't have one):"
        echo "   ssh-keygen -t ed25519 -C \"your-email@example.com\""
        echo ""
        echo "2. Add to GitHub:"
        echo "   cat ~/.ssh/id_ed25519.pub"
        echo "   Copy output and add at: https://github.com/settings/keys"
        echo ""
        echo "3. Change remote to SSH:"
        git remote set-url origin git@github.com:rivic-q/Rivicq.git
        echo ""
        read -p "Press Enter when SSH key is added to GitHub..."
        echo ""
        git push -u origin main
        ;;
    
    3)
        echo ""
        echo "📋 Installing GitHub CLI..."
        if ! command -v gh &> /dev/null; then
            echo "Installing gh CLI..."
            brew install gh
        else
            echo "✅ gh CLI already installed"
        fi
        echo ""
        echo "Logging in to GitHub..."
        gh auth login
        echo ""
        echo "Pushing to GitHub..."
        git push -u origin main
        ;;
    
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

# Check if push was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo -e "${GREEN}✅ CODE PUSHED TO GITHUB!${NC}"
    echo "========================================="
    echo ""
    
    echo "📋 Step 2: Enable GitHub Pages"
    echo "========================================"
    echo ""
    echo "Now let's make your site live!"
    echo ""
    echo "1. Open this URL:"
    echo -e "   ${GREEN}https://github.com/rivic-q/Rivicq/settings/pages${NC}"
    echo ""
    echo "2. Under 'Build and deployment':"
    echo "   Source: Select 'GitHub Actions'"
    echo ""
    echo "3. Click 'Save'"
    echo ""
    echo "4. Wait 2-3 minutes for deployment"
    echo ""
    echo "========================================="
    echo ""
    echo -e "${GREEN}🌐 YOUR LIVE SITE WILL BE:${NC}"
    echo ""
    echo "   https://rivic-q.github.io/Rivicq/"
    echo ""
    echo "========================================="
    echo ""
    echo "📊 Access your demo:"
    echo ""
    echo "   Main Dashboard:"
    echo "   https://rivic-q.github.io/Rivicq/"
    echo ""
    echo "   Interactive Demo:"
    echo "   https://rivic-q.github.io/Rivicq/demo.html"
    echo ""
    echo "   API Data:"
    echo "   https://rivic-q.github.io/Rivicq/api/status.json"
    echo ""
    echo "========================================="
    echo ""
    
    # Create info file
    cat > LIVE_SITE_INFO.txt << EOF
RIVIC QSIC - Live Site Information
===================================

Deployment Date: $(date)
Repository: https://github.com/rivic-q/Rivicq
GitHub Pages: https://rivic-q.github.io/Rivicq/

Live URLs:
----------
Main Dashboard: https://rivic-q.github.io/Rivicq/
Interactive Demo: https://rivic-q.github.io/Rivicq/demo.html
API Endpoint: https://rivic-q.github.io/Rivicq/api/status.json

GitHub Actions:
https://github.com/rivic-q/Rivicq/actions

How to Update:
--------------
1. Make changes to code
2. git add .
3. git commit -m "Your update message"
4. git push

Your site will auto-deploy in 2-3 minutes!

Share These Links:
------------------
- EXIST Reviewers: https://rivic-q.github.io/Rivicq/
- Investors: https://rivic-q.github.io/Rivicq/demo.html
- Partners: https://rivic-q.github.io/Rivicq/

Cost: $0.00 (FREE with GitHub Pages)
EOF

    echo -e "${GREEN}✅ Live site info saved to: LIVE_SITE_INFO.txt${NC}"
    echo ""
    
    echo "💡 Next Steps:"
    echo "1. Enable GitHub Pages (instructions above)"
    echo "2. Wait 2-3 minutes"
    echo "3. Visit: https://rivic-q.github.io/Rivicq/"
    echo "4. Share with investors, EXIST reviewers, partners!"
    echo ""
    
else
    echo ""
    echo "========================================="
    echo -e "${RED}❌ PUSH FAILED${NC}"
    echo "========================================="
    echo ""
    echo "Common issues:"
    echo "1. Wrong token/password"
    echo "2. No access to rivic-q organization"
    echo "3. Internet connection issue"
    echo ""
    echo "Solutions:"
    echo "- Try again with correct token"
    echo "- Check organization access at: https://github.com/orgs/rivic-q/people"
    echo "- Use SSH method instead"
    echo ""
    exit 1
fi
