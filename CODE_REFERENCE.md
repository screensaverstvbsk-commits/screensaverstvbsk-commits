# 📝 Code Reference Guide

## Quick Code Snippets

### 1. Server-Side API Route (`app/api/commits/route.ts`)

```typescript
// Key features:
// - Server-side GitHub token access
// - 5-minute caching
// - Error handling with fallback to stale cache
// - Rate limit monitoring

export async function GET(request: NextRequest) {
  // Check cache first
  if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
    return NextResponse.json({ data: cachedData, cached: true });
  }

  // Fetch from GitHub with token
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  // Update cache and return
  cachedData = transformedCommits;
  return NextResponse.json({ data: transformedCommits });
}
```

### 2. Fetch Commits Hook (`hooks/useCommits.ts`)

```typescript
// Usage:
const { commits, loading, error, refetch } = useCommits();

// Features:
// - Automatic fetching
// - Loading and error states
// - Manual refetch capability
// - Cache status tracking

export function useCommits(autoFetch = true): UseCommitsReturn {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommits = useCallback(async () => {
    const response = await fetch('/api/commits');
    const data = await response.json();
    setCommits(data.data || []);
  }, []);

  return { commits, loading, error, refetch: fetchCommits };
}
```

### 3. Idle Timer Hook (`hooks/useIdleTimer.ts`)

```typescript
// Usage:
const { isIdle, reset, pause, resume } = useIdleTimer({
  timeout: 60000,  // 1 minute
  onIdle: () => console.log('User is idle'),
  onActive: () => console.log('User is active'),
});

// Features:
// - Detects mouse, keyboard, touch, scroll events
// - Configurable timeout
// - Pause/resume functionality
// - Callbacks for idle/active states

const DEFAULT_EVENTS = [
  'mousedown', 'mousemove', 'keypress', 
  'scroll', 'touchstart', 'click', 'wheel'
];
```

### 4. Screensaver Component (`components/Screensaver.tsx`)

```typescript
// Usage:
<Screensaver 
  idleTimeout={60000}  // 1 minute
  enabled={true}
/>

// Features:
// - Auto-activates on idle
// - Displays commits with animations
// - Rotates through commits every 5 seconds
// - Exits on any user activity
// - Error handling with retry

export function Screensaver({ idleTimeout = 60000, enabled = true }) {
  const { commits, loading, error, refetch } = useCommits();
  const { isIdle } = useIdleTimer({ timeout: idleTimeout, enabled });

  // Rotate commits every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % commits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [commits.length]);

  if (!isIdle) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Display current commit */}
    </div>
  );
}
```

### 5. Next.js Configuration (`next.config.mjs`)

```javascript
const nextConfig = {
  // Don't use 'export' mode - it doesn't support API routes
  // Use default output for Vercel deployment
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};
```

### 6. Environment Variables (`.env.local`)

```env
# Required
GITHUB_TOKEN=ghp_your_actual_token_here
GITHUB_OWNER=kumar-ns-projects
GITHUB_REPO=screensaverstvbsk-commits

# Optional
COMMITS_PER_PAGE=30
```

### 7. TypeScript Types

```typescript
// Commit interface
interface Commit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    username: string;
    avatar: string;
  };
  date: string;
}

// API Response
interface CommitsResponse {
  data: Commit[];
  cached?: boolean;
  stale?: boolean;
  error?: string;
  rateLimit?: {
    limit: string | null;
    remaining: string | null;
    reset: string | null;
  };
}
```

## 🎯 Common Use Cases

### Add Screensaver to Existing Page

```typescript
// app/page.tsx
import { Screensaver } from '../components/Screensaver';

export default function Home() {
  return (
    <div>
      {/* Your existing content */}
      
      {/* Add screensaver at the end */}
      <Screensaver idleTimeout={60000} enabled={true} />
    </div>
  );
}
```

### Create Dedicated Screensaver Route

```typescript
// app/screensaver/page.tsx
'use client';

import { Screensaver } from '../../components/Screensaver';

export default function ScreensaverPage() {
  return <Screensaver idleTimeout={60000} enabled={true} />;
}
```

### Customize Idle Timeout

```typescript
// 30 seconds
<Screensaver idleTimeout={30000} />

// 2 minutes
<Screensaver idleTimeout={120000} />

// 5 minutes
<Screensaver idleTimeout={300000} />
```

### Disable Screensaver Conditionally

```typescript
const [enabled, setEnabled] = useState(true);

<Screensaver 
  idleTimeout={60000} 
  enabled={enabled}  // Control with state
/>
```

### Manual Fetch with Retry

```typescript
const { commits, loading, error, refetch } = useCommits(false);

// Manual fetch
<button onClick={refetch}>Load Commits</button>

// Auto-retry on error
useEffect(() => {
  if (error) {
    const timer = setTimeout(refetch, 5000);
    return () => clearTimeout(timer);
  }
}, [error, refetch]);
```

### Custom Idle Events

```typescript
// In useIdleTimer.ts, modify DEFAULT_EVENTS:
const CUSTOM_EVENTS = [
  'mousedown',
  'keypress',
  // Add custom events
  'focus',
  'blur',
];
```

## 🔧 Debugging

### Check API Response

```typescript
// In browser console:
fetch('/api/commits')
  .then(r => r.json())
  .then(console.log);
```

### Monitor Cache Status

```typescript
// The API returns cache info:
{
  "data": [...],
  "cached": true,      // Is this from cache?
  "cacheAge": 120,     // Seconds since cached
  "stale": false       // Is cache stale?
}
```

### Test Idle Detection

```typescript
// Reduce timeout for testing
<Screensaver idleTimeout={5000} />  // 5 seconds

// Add logging
const { isIdle } = useIdleTimer({
  timeout: 5000,
  onIdle: () => console.log('IDLE!'),
  onActive: () => console.log('ACTIVE!'),
});
```

### Check Rate Limits

```typescript
// In browser console, check logs after API call:
// GitHub API Rate Limit: {
//   remaining: "4999",
//   limit: "5000",
//   resetTime: "..."
// }
```

## 🎨 Styling Customization

### Change Background Gradient

```typescript
// In Screensaver.tsx
<div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
```

### Modify Animation Speed

```typescript
// Commit rotation speed (default: 5 seconds)
const interval = setInterval(() => {
  setCurrentIndex((prev) => (prev + 1) % commits.length);
}, 3000);  // Change to 3 seconds
```

### Customize Text Styles

```typescript
// Commit message
<h2 className="text-5xl font-bold text-white">
  {currentCommit.message}
</h2>

// Author name
<span className="text-xl text-purple-300">
  {currentCommit.author.name}
</span>
```

## 📊 Performance Tips

### Optimize Re-renders

```typescript
// Use React.memo for Screensaver
export const Screensaver = React.memo(({ idleTimeout, enabled }) => {
  // Component code
});
```

### Reduce API Calls

```typescript
// Increase cache duration (in route.ts)
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
```

### Lazy Load Screensaver

```typescript
// Only load when needed
const Screensaver = dynamic(() => import('../components/Screensaver'), {
  ssr: false,
});
```

## 🚀 Deployment Commands

### Local Development

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
vercel --prod
```

### Check Build Output

```bash
npm run build
# Check .next folder for API routes
```

## 🔒 Security Checklist

```bash
# ✅ Verify .env.local is in .gitignore
cat .gitignore | grep .env.local

# ✅ Check no tokens in code
grep -r "ghp_" --exclude-dir=node_modules .

# ✅ Verify API route uses env vars
grep "process.env.GITHUB_TOKEN" app/api/commits/route.ts

# ✅ Test without token (should error gracefully)
# Remove GITHUB_TOKEN from .env.local and test
```

---

**Quick Reference Complete! 🎉**

Use these snippets to quickly implement and customize your screensaver.
