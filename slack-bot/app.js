const { App } = require('@slack/bolt');
const { Octokit } = require('@octokit/rest');
require('dotenv').config();

// Initialize Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const GITHUB_ORG = 'BlackRoad-OS';
const GITHUB_REPO = 'blackroad-os-infra';

console.log('🚀 BlackRoad Slack Bot Starting...');

// ========================================
// SLASH COMMANDS
// ========================================

// /health - Show system health
app.command('/health', async ({ command, ack, respond }) => {
  await ack();

  try {
    // Fetch health data from GitHub
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner: GITHUB_ORG,
      repo: GITHUB_REPO,
      state: 'open'
    });

    const criticalIssues = issues.filter(i =>
      i.labels.some(l => l.name.includes('critical'))
    ).length;

    const { data: prs } = await octokit.rest.pulls.list({
      owner: GITHUB_ORG,
      repo: GITHUB_REPO,
      state: 'open'
    });

    // Calculate health score
    let healthScore = 100;
    healthScore -= criticalIssues * 10;
    if (issues.length > 20) healthScore -= 10;
    if (prs.length > 10) healthScore -= 10;
    healthScore = Math.max(0, Math.min(100, healthScore));

    const healthStatus = healthScore >= 90 ? '🟢 Healthy' :
                        healthScore >= 70 ? '🟡 Warning' :
                        healthScore >= 50 ? '🟠 Degraded' : '🔴 Critical';

    await respond({
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🏥 System Health Report'
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Health Score:*\n${healthScore}/100`
            },
            {
              type: 'mrkdwn',
              text: `*Status:*\n${healthStatus}`
            },
            {
              type: 'mrkdwn',
              text: `*Open Issues:*\n${issues.length}`
            },
            {
              type: 'mrkdwn',
              text: `*Critical Issues:*\n${criticalIssues}`
            },
            {
              type: 'mrkdwn',
              text: `*Open PRs:*\n${prs.length}`
            },
            {
              type: 'mrkdwn',
              text: `*Ready to Merge:*\n0`
            }
          ]
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '📊 View Dashboard'
              },
              url: `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}`
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '🔄 Refresh'
              },
              action_id: 'refresh_health'
            }
          ]
        }
      ]
    });
  } catch (error) {
    console.error('Error fetching health:', error);
    await respond(`❌ Error fetching health: ${error.message}`);
  }
});

// /agents - List all agents
app.command('/agents', async ({ command, ack, respond }) => {
  await ack();

  const agents = [
    { name: 'Claude', role: 'Architect', status: '🟢', tasks: 3 },
    { name: 'Felix', role: 'Auto-Fixer', status: '🟢', tasks: 12 },
    { name: 'Ruby', role: 'Code Reviewer', status: '🟢', tasks: 8 },
    { name: 'Winston', role: 'Refactorer', status: '🟢', tasks: 5 },
    { name: 'Cadillac', role: 'Optimizer', status: '🟢', tasks: 2 },
    { name: 'Silas', role: 'Guardian', status: '🟢', tasks: 1 },
    { name: 'Codex', role: 'Innovator', status: '🟡', tasks: 15 },
    { name: 'Ophelia', role: 'Poet', status: '🟢', tasks: 4 },
    { name: 'ChatGPT', role: 'Support', status: '🟢', tasks: 7 },
    { name: 'Elias', role: 'Tester', status: '🟢', tasks: 6 },
    { name: 'Athena', role: 'Warrior', status: '🟢', tasks: 3 },
    { name: 'Cecilia', role: 'Data Scientist', status: '🟢', tasks: 2 }
  ];

  const agentList = agents.map(a =>
    `${a.status} *${a.name}* (${a.role}) - ${a.tasks} tasks`
  ).join('\n');

  await respond({
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🤖 Active AI Agents'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Total Agents:* ${agents.length}\n*Active:* ${agents.filter(a => a.status === '🟢').length}\n\n${agentList}`
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '📊 Agent Dashboard'
            },
            action_id: 'view_agent_dashboard'
          }
        ]
      }
    ]
  });
});

// /deploy - Deploy to environment
app.command('/deploy', async ({ command, ack, respond, say }) => {
  await ack();

  const env = command.text || 'production';

  await respond({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `🚀 Deploying to *${env}*...`
        }
      }
    ]
  });

  // Trigger GitHub Actions deployment
  try {
    await octokit.rest.actions.createWorkflowDispatch({
      owner: GITHUB_ORG,
      repo: GITHUB_REPO,
      workflow_id: 'deploy.yml',
      ref: 'main',
      inputs: {
        environment: env
      }
    });

    setTimeout(async () => {
      await say({
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `✅ Deployment to *${env}* started successfully!\n\nCheck status: https://github.com/${GITHUB_ORG}/${GITHUB_REPO}/actions`
            }
          }
        ]
      });
    }, 2000);
  } catch (error) {
    await say(`❌ Deployment failed: ${error.message}`);
  }
});

// /create-pr - Create a pull request
app.command('/create-pr', async ({ command, ack, client, body }) => {
  await ack();

  // Open modal for PR creation
  await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      type: 'modal',
      callback_id: 'create_pr_modal',
      title: {
        type: 'plain_text',
        text: 'Create Pull Request'
      },
      submit: {
        type: 'plain_text',
        text: 'Create'
      },
      blocks: [
        {
          type: 'input',
          block_id: 'pr_title',
          element: {
            type: 'plain_text_input',
            action_id: 'title_input',
            placeholder: {
              type: 'plain_text',
              text: 'PR title...'
            }
          },
          label: {
            type: 'plain_text',
            text: 'Title'
          }
        },
        {
          type: 'input',
          block_id: 'pr_body',
          element: {
            type: 'plain_text_input',
            multiline: true,
            action_id: 'body_input',
            placeholder: {
              type: 'plain_text',
              text: 'Describe the changes...'
            }
          },
          label: {
            type: 'plain_text',
            text: 'Description'
          }
        },
        {
          type: 'input',
          block_id: 'pr_branch',
          element: {
            type: 'plain_text_input',
            action_id: 'branch_input',
            placeholder: {
              type: 'plain_text',
              text: 'feature/my-branch'
            }
          },
          label: {
            type: 'plain_text',
            text: 'Branch name'
          }
        }
      ]
    }
  });
});

// Handle PR creation modal submission
app.view('create_pr_modal', async ({ ack, body, view, client }) => {
  await ack();

  const title = view.state.values.pr_title.title_input.value;
  const description = view.state.values.pr_body.body_input.value;
  const branch = view.state.values.pr_branch.branch_input.value;

  try {
    const { data: pr } = await octokit.rest.pulls.create({
      owner: GITHUB_ORG,
      repo: GITHUB_REPO,
      title: title,
      body: description,
      head: branch,
      base: 'main'
    });

    await client.chat.postMessage({
      channel: body.user.id,
      text: `✅ PR created successfully!\n\n${pr.html_url}`
    });
  } catch (error) {
    await client.chat.postMessage({
      channel: body.user.id,
      text: `❌ Failed to create PR: ${error.message}`
    });
  }
});

// ========================================
// EVENT LISTENERS
// ========================================

// Welcome message when bot is added to channel
app.event('app_mention', async ({ event, say }) => {
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey <@${event.user}>! 👋\n\nI'm the BlackRoad OS automation bot. Here's what I can do:`
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Commands:*\n• \`/health\` - System health status\n• \`/agents\` - List all AI agents\n• \`/deploy <env>\` - Deploy to environment\n• \`/create-pr\` - Create a pull request\n• \`/merge <pr>\` - Merge a PR\n• \`/trigger <workflow>\` - Run a workflow`
        }
      }
    ]
  });
});

// ========================================
// START BOT
// ========================================

(async () => {
  await app.start();
  console.log('✅ BlackRoad Slack Bot is running!');
  console.log('📡 Listening for commands...');
})();
