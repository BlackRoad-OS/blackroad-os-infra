# 🤖 BlackRoad Slack Bot - Complete ChatOps Integration

**Status:** Production Ready ✅
**Deployment:** Railway
**Features:** Full ChatOps with /health, /agents, /deploy, /create-pr

---

## 🚀 Quick Start

### 1. Create Slack App

1. Go to https://api.slack.com/apps
2. Click "Create New App" → "From scratch"
3. Name: "BlackRoad Bot"
4. Select your workspace

### 2. Configure Slack App

**OAuth & Permissions:**
- Add Bot Token Scopes:
  - `app_mentions:read` - Listen for @mentions
  - `chat:write` - Send messages
  - `commands` - Slash commands
  - `users:read` - Read user info
  - `channels:read` - Read channel info
  - `files:write` - Upload files

**Slash Commands:**
Create these slash commands:
- `/health` → Request URL: `https://your-railway-app.railway.app/slack/commands`
- `/agents` → Request URL: `https://your-railway-app.railway.app/slack/commands`
- `/deploy` → Request URL: `https://your-railway-app.railway.app/slack/commands`
- `/create-pr` → Request URL: `https://your-railway-app.railway.app/slack/commands`

**Event Subscriptions:**
- Enable Events
- Request URL: `https://your-railway-app.railway.app/slack/events`
- Subscribe to bot events:
  - `app_mention` - When bot is @mentioned
  - `message.channels` - Messages in channels

**Socket Mode:**
- Enable Socket Mode (for local development)
- Generate App-Level Token with `connections:write` scope

### 3. Get Tokens

**Bot Token (SLACK_BOT_TOKEN):**
- OAuth & Permissions → "Bot User OAuth Token"
- Starts with `xoxb-`

**Signing Secret (SLACK_SIGNING_SECRET):**
- Basic Information → "Signing Secret"

**App Token (SLACK_APP_TOKEN):**
- Basic Information → "App-Level Tokens"
- Starts with `xapp-`

**GitHub Token (GITHUB_TOKEN):**
- GitHub → Settings → Developer settings → Personal access tokens
- Scopes: `repo`, `workflow`, `write:org`

### 4. Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway init

# Add environment variables
railway variables set SLACK_BOT_TOKEN=xoxb-...
railway variables set SLACK_SIGNING_SECRET=...
railway variables set SLACK_APP_TOKEN=xapp-...
railway variables set GITHUB_TOKEN=ghp_...
railway variables set PORT=3000
railway variables set NODE_ENV=production

# Deploy
railway up
```

### 5. Update Slack App URLs

After deployment, get your Railway URL:
```bash
railway domain
```

Update all Slack app URLs to use your Railway domain:
- Slash Commands → Request URL: `https://your-app.railway.app/slack/commands`
- Event Subscriptions → Request URL: `https://your-app.railway.app/slack/events`

### 6. Test the Bot

In your Slack workspace:

```
/health
```
Should show system health dashboard

```
/agents
```
Should list all 100 AI agents

```
/deploy production
```
Should trigger deployment

```
@BlackRoad Bot help
```
Should show available commands

---

## 💻 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Slack workspace admin access
- GitHub personal access token

### Setup

```bash
# Install dependencies
cd slack-bot
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your tokens
nano .env

# Run in dev mode
npm run dev
```

### Testing Commands Locally

Use Slack's Socket Mode for local testing without deploying.

---

## 🎯 Available Commands

### /health
Shows real-time system health:
- Health score (0-100)
- Open issues/PRs
- Critical issues
- Agent activity
- Interactive refresh button

### /agents
Lists all 100 AI agents:
- Agent name and role
- Current status (🟢/🟡/🔴)
- Active task count
- Agent dashboard link

### /deploy <environment>
Triggers deployment:
- Environments: production, staging, development
- Creates GitHub Actions workflow dispatch
- Shows deployment status
- Links to GitHub Actions page

### /create-pr
Opens modal to create PR:
- PR title input
- Description textarea
- Branch name input
- Creates PR via GitHub API
- Returns PR URL

---

## 📊 Architecture

```
┌─────────────┐
│    Slack    │
│  Workspace  │
└──────┬──────┘
       │
       │ Slash Commands
       │ Event Subscriptions
       │
┌──────▼──────┐
│   Railway   │
│  (Node.js)  │
│             │
│  Slack Bolt │
│  Framework  │
└──────┬──────┘
       │
       │ GitHub API
       │ (Octokit)
       │
┌──────▼──────┐
│   GitHub    │
│  BlackRoad  │
│     OS      │
└─────────────┘
```

---

## 🔧 Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Slack Bolt SDK
- **GitHub API:** Octokit
- **Hosting:** Railway
- **State:** Redis (optional)
- **Protocol:** HTTPS, WebSocket (Socket Mode)

---

## 📈 Monitoring

### Health Endpoint
```bash
curl https://your-app.railway.app/health
```

### Railway Logs
```bash
railway logs
```

### Slack Event Logs
Slack App → Event Subscriptions → View Recent Deliveries

---

## 🚨 Troubleshooting

### "This interaction failed"
- Check Railway logs: `railway logs`
- Verify environment variables are set
- Check Slack Request URL is correct

### Commands not responding
- Verify slash command URLs match Railway domain
- Check SLACK_SIGNING_SECRET is correct
- Check bot has correct OAuth scopes

### GitHub API errors
- Verify GITHUB_TOKEN has repo + workflow scopes
- Check token hasn't expired
- Verify repo exists and bot has access

### Socket Mode connection failed
- Check SLACK_APP_TOKEN is valid
- Verify app-level token has `connections:write` scope
- Check PORT environment variable

---

## 🔐 Security

- **Tokens:** Never commit tokens to Git
- **Signing Secret:** Validates requests from Slack
- **HTTPS Only:** All communication over HTTPS
- **Token Rotation:** Rotate tokens every 90 days
- **Scopes:** Minimum required OAuth scopes

---

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SLACK_BOT_TOKEN` | Bot User OAuth Token | `xoxb-...` |
| `SLACK_SIGNING_SECRET` | Request signing secret | `abc123...` |
| `SLACK_APP_TOKEN` | App-level token (Socket Mode) | `xapp-...` |
| `GITHUB_TOKEN` | GitHub personal access token | `ghp_...` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `production` |
| `REDIS_URL` | Redis connection (optional) | `redis://...` |

---

## 🎊 Success Metrics

After deployment, you'll have:
- ✅ Complete ChatOps integration
- ✅ 4 slash commands operational
- ✅ Real-time GitHub integration
- ✅ Interactive dashboards in Slack
- ✅ One-click deployments from chat
- ✅ PR creation from Slack

---

## 📚 Next Steps

1. Deploy to Railway
2. Configure Slack app
3. Test all commands
4. Add more commands (merge, trigger, assign)
5. Set up notifications (PR opened, deployment complete)
6. Build interactive dashboards
7. Add agent coordination features

---

**Built with:** Slack Bolt + Octokit + Railway
**Part of:** BlackRoad OS Master Automation Plan
**Status:** Phase 1 Complete! 🚀
