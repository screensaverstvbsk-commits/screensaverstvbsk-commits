# 🎬 GitHub Commits Screensaver - Next.js App

A Next.js application with an integrated GitHub commits screensaver that activates after user inactivity.

## 🚀 Features

- ✅ **Secure Server-Side API**: GitHub token stored securely on the server
- ✅ **Smart Caching**: 5-minute cache to avoid GitHub API rate limits
- ✅ **Idle Detection**: Automatic screensaver activation after inactivity
- ✅ **Beautiful UI**: Animated screensaver with commit visualization
- ✅ **Error Handling**: Comprehensive error handling and fallbacks
- ✅ **Vercel Ready**: Optimized for Vercel deployment

## 📋 Prerequisites

- Node.js 18+ installed
- GitHub account with a personal access token
- Vercel account (for deployment)

## 🔧 Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

### 3. Get GitHub Personal Access Token

1. Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Name: `Screensaver App`
4. Scopes: Select `public_repo`
5. Click **"Generate token"**
6. **Copy the token immediately!**

### 4. Update `.env.local`

```env
GITHUB_TOKEN=ghp_your_actual_token_here
GITHUB_OWNER=kumar-ns-projects
GITHUB_REPO=screensaverstvbsk-commits
COMMITS_PER_PAGE=30
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 6. Test the Screensaver

- Visit [http://localhost:3000/screensaver](http://localhost:3000/screensaver)
- Wait 1 minute without activity (or modify `idleTimeout` in the component)
- The screensaver will activate showing GitHub commits

## 🌐 Vercel Deployment

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add GitHub commits screensaver"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Click **"Deploy"**

3. **Add Environment Variables**:
   - Go to **Project Settings** → **Environment Variables**
   - Add the following variables for **Production**, **Preview**, and **Development**:
     - `GITHUB_TOKEN`: Your GitHub personal access token
     - `GITHUB_OWNER`: `kumar-ns-projects`
     - `GITHUB_REPO`: `screensaverstvbsk-commits`
     - `COMMITS_PER_PAGE`: `30` (optional)

4. **Redeploy**:
   - Go to **Deployments** tab
   - Click **"Redeploy"** on the latest deployment

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add GITHUB_TOKEN
vercel env add GITHUB_OWNER
vercel env add GITHUB_REPO

# Deploy to production
vercel --prod
```

## 📁 Project Structure

```
c:\Screen Saver\
├── app/
│   ├── api/
│   │   └── commits/
│   │       └── route.ts          # Server-side API endpoint
│   ├── screensaver/
│   │   └── page.tsx               # Dedicated screensaver page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                   # Main landing page
├── components/
│   └── Screensaver.tsx            # Screensaver component
├── hooks/
│   ├── useCommits.ts              # Fetch commits hook
│   └── useIdleTimer.ts            # Idle detection hook
├── .env.example                   # Environment template
├── .env.local                     # Your local environment (gitignored)
├── .gitignore
├── next.config.mjs                # Next.js configuration
├── package.json
├── tsconfig.json
└── SCREENSAVER_SETUP.md          # Detailed setup guide
```

## 🎨 Usage

### Add Screensaver to Any Page

```tsx
import { Screensaver } from '../components/Screensaver';

export default function MyPage() {
  return (
    <div>
      {/* Your content */}
      
      <Screensaver 
        idleTimeout={60000}  // 1 minute (optional)
        enabled={true}        // Enable/disable (optional)
      />
    </div>
  );
}
```

### Dedicated Screensaver Route

Visit `/screensaver` to see the screensaver in action.

## 🔒 Security Best Practices

✅ **DO:**
- Store GitHub token in environment variables
- Use `.env.local` for local development
- Add `.env.local` to `.gitignore`
- Use Vercel environment variables for production
- Rotate tokens periodically

❌ **DON'T:**
- Commit tokens to Git
- Share tokens publicly
- Use tokens in client-side code
- Hard-code sensitive values

## 🐛 Troubleshooting

### "GitHub token not configured" Error

**Solution**: Ensure `GITHUB_TOKEN` is set in:
- `.env.local` (local development)
- Vercel environment variables (production)

### "Failed to fetch commits" Error

**Possible causes**:
1. Invalid GitHub token
2. Repository doesn't exist or is private
3. Rate limit exceeded

**Solution**:
- Verify `GITHUB_OWNER` and `GITHUB_REPO` are correct
- Check token has `public_repo` scope
- Wait for rate limit to reset (check console logs)

### Screensaver Not Activating

**Solution**:
- Check browser console for errors
- Verify `enabled={true}` is set
- Try reducing `idleTimeout` for testing (e.g., `5000` for 5 seconds)

### TypeScript/Lint Errors

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

## 📊 API Endpoint

### `GET /api/commits`

Returns GitHub commits with caching.

**Response**:
```json
{
  "data": [
    {
      "sha": "abc123...",
      "message": "Commit message",
      "author": {
        "name": "Author Name",
        "email": "author@example.com",
        "username": "github-username",
        "avatar": "https://avatars.githubusercontent.com/..."
      },
      "date": "2024-01-01T12:00:00Z"
    }
  ],
  "cached": false,
  "rateLimit": {
    "limit": "5000",
    "remaining": "4999",
    "reset": "1234567890"
  }
}
```

## 🎯 Configuration Options

### Screensaver Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `idleTimeout` | `number` | `60000` | Milliseconds before activation |
| `enabled` | `boolean` | `true` | Enable/disable screensaver |

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GITHUB_TOKEN` | ✅ Yes | - | GitHub personal access token |
| `GITHUB_OWNER` | ✅ Yes | `kumar-ns-projects` | Repository owner |
| `GITHUB_REPO` | ✅ Yes | `screensaverstvbsk-commits` | Repository name |
| `COMMITS_PER_PAGE` | ❌ No | `30` | Number of commits to fetch |

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [SCREENSAVER_SETUP.md](./SCREENSAVER_SETUP.md) - Detailed setup guide

## 📝 License

This project is part of the Screen Savers repair service application.

## 🤝 Support

For issues or questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [SCREENSAVER_SETUP.md](./SCREENSAVER_SETUP.md)
3. Check GitHub API rate limits: https://api.github.com/rate_limit

---

**Built with ❤️ using Next.js 14**
