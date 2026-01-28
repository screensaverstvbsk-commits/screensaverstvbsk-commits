# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local and add your GitHub token
# Get token from: https://github.com/settings/tokens
```

### 3. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000/screensaver

## 🔑 Get GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scope: `public_repo`
4. Copy token to `.env.local`

## 🌐 Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Import to Vercel
# Add environment variables in Vercel dashboard
# Redeploy
```

See [README.md](./README.md) for full documentation.
