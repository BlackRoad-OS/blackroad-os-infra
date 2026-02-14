import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// Hugging Face AI Insights Generation
export async function POST(request: NextRequest) {
  try {
    const { metrics } = await request.json()

    if (!metrics) {
      return NextResponse.json(
        { error: 'Metrics data required' },
        { status: 400 }
      )
    }

    // Generate AI insights using Hugging Face Inference API
    const insights = await generateAIInsights(metrics)

    return NextResponse.json({ insights }, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
      }
    })
  } catch (error) {
    console.error('Error generating insights:', error)

    // Fallback to rule-based insights
    const fallbackInsights = generateRuleBasedInsights(await request.json())
    return NextResponse.json({ insights: fallbackInsights })
  }
}

async function generateAIInsights(metrics: any) {
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY

  if (!HUGGINGFACE_API_KEY) {
    // Fallback to rule-based if no API key
    return generateRuleBasedInsights(metrics)
  }

  try {
    // Use Hugging Face Inference API for sentiment analysis and insights
    // Model: distilbert-base-uncased-finetuned-sst-2-english (sentiment analysis)

    const systemSummary = `
System Health: ${metrics.health?.score || 0}/100
Open Issues: ${metrics.openIssues || 0}
Critical Issues: ${metrics.health?.criticalIssues || 0}
Open PRs: ${metrics.openPRs || 0}
Active Agents: ${metrics.agents || 100}
Status: ${metrics.health?.status || 'unknown'}
    `.trim()

    // Call Hugging Face Inference API
    const response = await fetch(
      'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: systemSummary,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Hugging Face API error')
    }

    const sentimentData = await response.json()
    const sentiment = sentimentData[0]?.find((s: any) => s.label === 'POSITIVE')?.score || 0.5

    // Generate insights based on AI sentiment + rule-based logic
    const insights = []

    // Health-based insights
    if (metrics.health?.score >= 90) {
      insights.push({
        type: 'positive',
        title: 'Excellent System Health',
        description: `AI detected ${Math.round(sentiment * 100)}% positive sentiment. System is running optimally!`,
        sentiment: sentiment
      })
    } else if (metrics.health?.score < 70) {
      insights.push({
        type: 'warning',
        title: 'System Needs Attention',
        description: `Health score is ${metrics.health.score}/100. AI recommends immediate review.`,
        sentiment: 1 - sentiment
      })
    }

    // Critical issues
    if (metrics.health?.criticalIssues > 0) {
      insights.push({
        type: 'warning',
        title: 'Critical Issues Detected',
        description: `${metrics.health.criticalIssues} critical issue(s) detected. AI prioritizes immediate resolution.`,
        sentiment: 0.2
      })
    }

    // PR volume
    if (metrics.openPRs > 10) {
      insights.push({
        type: 'suggestion',
        title: 'High PR Volume',
        description: `${metrics.openPRs} open PRs. AI suggests prioritizing reviews to maintain velocity.`,
        sentiment: 0.6
      })
    }

    // Agent status
    if (metrics.agents === 100) {
      insights.push({
        type: 'positive',
        title: 'Full Agent Coverage',
        description: 'All 100 AI agents active. AI ecosystem is fully operational!',
        sentiment: 0.95
      })
    }

    return insights.slice(0, 4) // Return top 4 insights
  } catch (error) {
    console.error('Hugging Face API error:', error)
    return generateRuleBasedInsights(metrics)
  }
}

function generateRuleBasedInsights(data: any) {
  const metrics = data.metrics || data
  const insights = []

  if (metrics?.health?.score >= 90) {
    insights.push({
      type: 'positive',
      title: 'System Running Smoothly',
      description: `Health score is ${metrics.health.score}/100. All systems operational!`,
      sentiment: 0.95
    })
  }

  if (metrics?.health?.criticalIssues > 0) {
    insights.push({
      type: 'warning',
      title: 'Critical Issues',
      description: `${metrics.health.criticalIssues} critical issue(s) need immediate attention.`,
      sentiment: 0.2
    })
  }

  if (metrics?.openPRs > 10) {
    insights.push({
      type: 'suggestion',
      title: 'High PR Volume',
      description: `${metrics.openPRs} open PRs detected. Consider review prioritization.`,
      sentiment: 0.6
    })
  }

  if (metrics?.agents === 100) {
    insights.push({
      type: 'positive',
      title: 'Full Agent Coverage',
      description: 'All 100 AI agents are active and monitoring!',
      sentiment: 0.9
    })
  }

  return insights.slice(0, 4)
}
