# Screensaver Setup Guide

## 🔐 Security & Environment Variables

### Local Development

1. **Create `.env.local` file** in the project root:
   ```bash
   cp .env.example .env.local
   ```

2. **Get a GitHub Personal Access Token**:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a descriptive name (e.g., "Screensaver App")
   - Select scopes: `public_repo` (for public repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

3. **Add your token to `.env.local`**:
   ```env
   GITHUB_TOKEN=ghp_your_actual_token_here
   GITHUB_OWNER=kumar-ns-projects
   GITHUB_REPO=screensaverstvbsk-commits
   ```

4. **Never commit `.env.local`** - it's already in `.gitignore`

### Vercel Deployment

1. **Go to your Vercel project settings**:
   - Navigate to https://vercel.com/your-username/your-project
   - Go to "Settings" → "Environment Variables"

2. **Add the following environment variables**:
   
   | Name | Value | Environment |
   |------|-------|-------------|
   | `GITHUB_TOKEN` | `ghp_your_token_here` | Production, Preview, Development |
   | `GITHUB_OWNER` | `kumar-ns-projects` | Production, Preview, Development |
   | `GITHUB_REPO` | `screensaverstvbsk-commits` | Production, Preview, Development |

3. **Redeploy** your application after adding environment variables

## 🚀 Usage

### Adding Screensaver to Your App

1. **Import the Screensaver component** in your page:

```tsx
import { Screensaver } from '../components/Screensaver';
```

2. **Add it to your page component**:

```tsx
export default function Home() {
  return (
    <div>
      {/* Your existing content */}
      
      {/* Screensaver - will activate after 1 minute of inactivity */}
      <Screensaver 
        idleTimeout={60000}  // 60 seconds (optional, default is 60000)
        enabled={true}        // Enable/disable screensaver (optional, default is true)
      />
    </div>
  );
}
```

### Configuration Options

- `idleTimeout`: Time in milliseconds before screensaver activates (default: 60000 = 1 minute)
- `enabled`: Boolean to enable/disable the screensaver (default: true)

### Customizing Idle Detection

The `useIdleTimer` hook detects these events by default:
- Mouse movement
- Mouse clicks
- Keyboard presses
- Scrolling
- Touch events
- Wheel events

You can customize this in `hooks/useIdleTimer.ts` if needed.

## 🔧 API Route Details

### Endpoint: `/api/commits`

**Features:**
- ✅ Server-side GitHub token (secure)
- ✅ 5-minute caching to avoid rate limits
- ✅ Stale-while-revalidate pattern
- ✅ Comprehensive error handling
- ✅ Rate limit monitoring

**Response Format:**
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

## 🎨 Customizing the Screensaver

Edit `components/Screensaver.tsx` to customize:
- Background gradients
- Animation timing
- Commit rotation speed
- Display layout
- Colors and styling

## 🐛 Troubleshooting

### "GitHub token not configured" error
- Ensure `GITHUB_TOKEN` is set in `.env.local` (local) or Vercel environment variables (production)
- Verify the token has the correct permissions

### "Failed to fetch commits" error
- Check that `GITHUB_OWNER` and `GITHUB_REPO` are correct
- Verify the repository is public or your token has access
- Check GitHub API rate limits: https://api.github.com/rate_limit

### Screensaver not activating
- Check browser console for errors
- Verify `enabled={true}` is set
- Try reducing `idleTimeout` for testing (e.g., 5000 for 5 seconds)

### Rate limit issues
- The API route caches responses for 5 minutes
- GitHub allows 5,000 requests/hour for authenticated requests
- Check rate limit in browser console logs

## 📝 Notes

- The GitHub token is **never exposed to the client**
- All API calls go through the Next.js API route (`/api/commits`)
- Caching prevents excessive API calls
- The screensaver automatically exits on any user activity
- Commits rotate every 5 seconds when screensaver is active

## 🔒 Security Best Practices

✅ **DO:**
- Store tokens in environment variables
- Use `.env.local` for local development
- Add `.env.local` to `.gitignore`
- Use Vercel environment variables for production
- Rotate tokens periodically

❌ **DON'T:**
- Commit tokens to Git
- Share tokens publicly
- Use tokens in client-side code
- Hard-code sensitive values

## 📚 Additional Resources

- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
