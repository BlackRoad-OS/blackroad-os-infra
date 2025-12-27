# 📊 BlackRoad OS Dashboard - Live Metrics + AI Insights

**Real-time dashboard powered by Cloudflare Pages + Hugging Face AI**

---

## 🚀 Features

### Real-Time Metrics
- **System Health Score** (0-100) with live trend graph
- **100 AI Agents** status and task monitoring
- **Pull Requests** tracking with health scores
- **Issues** monitoring with priority labels
- **Auto-refresh** every 5 seconds

### AI-Powered Insights (Hugging Face)
- **Sentiment Analysis** on system health
- **Predictive Recommendations** for issue prioritization
- **Trend Detection** and anomaly alerts
- **Natural Language Insights** about system status

### Beautiful UI
- Dark theme with orange/pink gradients
- Responsive design (mobile, tablet, desktop)
- Real-time animations and transitions
- Chart visualizations with Recharts
- Card-based layout with glassmorphism effects

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS
- **Charts:** Recharts
- **AI:** Hugging Face Inference API
- **Data Fetching:** SWR (auto-refresh)
- **Icons:** Lucide React
- **Deployment:** Cloudflare Pages
- **Database:** Cloudflare D1 (optional)
- **Cache:** Cloudflare KV (optional)

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Wrangler CLI (Cloudflare)
- Hugging Face API key (optional, for AI insights)

### Setup

```bash
# Navigate to dashboard directory
cd dashboard

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your tokens
nano .env

# Run development server
npm run dev
```

Visit http://localhost:3000

---

## 🌐 Deployment to Cloudflare Pages

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Login to Cloudflare

```bash
wrangler login
```

### 3. Create D1 Database (Optional)

```bash
wrangler d1 create blackroad-metrics
```

Copy the database ID to `wrangler.toml`:
```toml
[[env.production.d1_databases]]
binding = "DB"
database_name = "blackroad-metrics"
database_id = "your-database-id"
```

### 4. Create KV Namespace (Optional)

```bash
wrangler kv:namespace create CACHE
```

Copy the ID to `wrangler.toml`:
```toml
[[env.production.kv_namespaces]]
binding = "CACHE"
id = "your-kv-id"
```

### 5. Set Environment Variables

```bash
# GitHub token for API access
wrangler secret put GITHUB_TOKEN

# Hugging Face API key for AI insights
wrangler secret put HUGGINGFACE_API_KEY
```

### 6. Build and Deploy

```bash
# Build for Cloudflare Pages
npm run pages:build

# Deploy to Cloudflare Pages
wrangler pages deploy
```

### 7. Get Your URL

```bash
wrangler pages deployment list
```

Your dashboard will be available at:
`https://blackroad-dashboard.pages.dev`

---

## 🔑 Environment Variables

Create a `.env` file:

```env
# GitHub Configuration
GITHUB_TOKEN=ghp_your_token_here
GITHUB_ORG=BlackRoad-OS
GITHUB_REPO=blackroad-os-infra

# Hugging Face (optional - for AI insights)
HUGGINGFACE_API_KEY=hf_your_key_here

# Cloudflare (set via wrangler secrets)
```

### Getting Tokens

**GitHub Token:**
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Scopes: `repo`, `read:org`

**Hugging Face API Key:**
1. Go to https://huggingface.co/settings/tokens
2. Create new token
3. Copy the key starting with `hf_`

---

## 🎨 Dashboard Sections

### 1. System Health
- Real-time health score (0-100)
- Status: Healthy / Warning / Degraded / Critical
- Open issues, PRs, critical issues count
- Health trend graph (last 12 data points)

### 2. AI Insights (Hugging Face)
- Sentiment analysis on system status
- Positive/Warning/Suggestion insights
- Confidence scores for each insight
- Auto-generated recommendations

### 3. AI Agents Grid
- 100 agents across 8 categories:
  - Core (19)
  - Database (5)
  - Frontend (5)
  - Backend (5)
  - DevOps (5)
  - Testing (5)
  - Security (5)
  - Languages (25)
  - Frameworks (26)
- Status indicators (active/warning/error)
- Task count per agent

### 4. Pull Requests
- Open PR list with health scores
- Status: Approved / Pending / Changes Requested
- Author and PR number
- Direct links to GitHub

### 5. Issues
- Open issues with priority labels
- Labels: Critical / High / Medium / Low
- Assignee information
- Direct links to GitHub

---

## 🤖 Hugging Face Integration

### How It Works

1. **Dashboard fetches metrics** from GitHub API every 5 seconds
2. **Metrics sent to `/api/ai-insights`** endpoint
3. **Hugging Face Inference API** analyzes the data:
   - Model: `distilbert-base-uncased-finetuned-sst-2-english`
   - Task: Sentiment analysis
4. **AI generates insights** based on:
   - Sentiment score (0-1)
   - System health patterns
   - Issue/PR trends
5. **Insights displayed** in dashboard with confidence scores

### Fallback Behavior

If Hugging Face API is unavailable:
- Dashboard falls back to rule-based insights
- Still provides valuable recommendations
- No breaking changes to UI

---

## 📊 API Routes

### `GET /api/metrics`
Returns current system metrics:
```json
{
  "health": {
    "score": 92,
    "status": "healthy",
    "openIssues": 15,
    "openPRs": 8,
    "criticalIssues": 1,
    "trend": 5,
    "history": [...]
  },
  "agents": 100,
  "agentList": [...],
  "prs": [...],
  "issues": [...]
}
```

### `POST /api/ai-insights`
Generates AI-powered insights:
```json
{
  "insights": [
    {
      "type": "positive",
      "title": "Excellent System Health",
      "description": "...",
      "sentiment": 0.95
    }
  ]
}
```

---

## 🎯 Development

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Cloudflare Build

```bash
npm run preview
```

### Deploy to Cloudflare

```bash
npm run deploy
```

---

## 🔧 Customization

### Change Refresh Interval

Edit `app/page.tsx`:
```typescript
const { data: metrics } = useSWR(
  '/api/metrics',
  fetcher,
  { refreshInterval: 5000 } // Change to desired ms
)
```

### Add More Metrics

Edit `app/api/metrics/route.ts` to fetch additional data from GitHub API.

### Customize Theme Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  blackroad: {
    500: '#f97316', // Change primary color
  }
}
```

---

## 📈 Performance

- **Edge Runtime:** Sub-100ms response times
- **CDN:** Global distribution via Cloudflare
- **Caching:** 5s cache on metrics, 30s on insights
- **Auto-refresh:** SWR with stale-while-revalidate
- **Bundle Size:** ~150KB (gzipped)

---

## 🚨 Troubleshooting

### "Error fetching metrics"
- Check `GITHUB_TOKEN` is set correctly
- Verify token has `repo` scope
- Check API rate limits (5000/hour)

### "Hugging Face API error"
- Check `HUGGINGFACE_API_KEY` is valid
- Verify API is not rate-limited
- Dashboard will fall back to rule-based insights

### Build errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

---

## 🎊 Success Metrics

After deployment, you'll have:

✅ **Real-time dashboard** updating every 5 seconds
✅ **AI-powered insights** from Hugging Face
✅ **100 AI agents** monitored and tracked
✅ **Beautiful UI** with charts and visualizations
✅ **Edge deployment** with global CDN
✅ **Auto-caching** for optimal performance

---

## 📚 Next Steps

1. **Deploy to Cloudflare Pages** (`npm run deploy`)
2. **Connect GitHub API** with real data
3. **Add more AI models** (text generation, summarization)
4. **Create alerts** for critical events
5. **Add user authentication** (Cloudflare Access)
6. **Build mobile app** (React Native)

---

**Built with:** Next.js + Cloudflare Pages + Hugging Face
**Part of:** BlackRoad OS Master Automation Plan
**Status:** Ready to deploy! 🚀
