'use client'

import { useEffect, useState } from 'react'
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react'

interface AIInsight {
  type: 'positive' | 'warning' | 'suggestion'
  title: string
  description: string
  sentiment?: number
}

export default function AIInsights({ metrics }: { metrics: any }) {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate AI insights using Hugging Face
    const generateInsights = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/ai-insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ metrics })
        })
        const data = await response.json()
        setInsights(data.insights || [])
      } catch (error) {
        console.error('Error generating insights:', error)
        // Fallback to rule-based insights
        setInsights(generateRuleBasedInsights(metrics))
      } finally {
        setLoading(false)
      }
    }

    if (metrics) {
      generateInsights()
    }
  }, [metrics])

  const generateRuleBasedInsights = (m: any): AIInsight[] => {
    const insights: AIInsight[] = []

    if (m?.health?.score >= 90) {
      insights.push({
        type: 'positive',
        title: 'System Running Smoothly',
        description: `Health score is ${m.health.score}/100. All agents are operating efficiently!`,
        sentiment: 0.95
      })
    }

    if (m?.health?.criticalIssues > 0) {
      insights.push({
        type: 'warning',
        title: 'Critical Issues Detected',
        description: `${m.health.criticalIssues} critical issue(s) require immediate attention.`,
        sentiment: 0.2
      })
    }

    if (m?.openPRs > 10) {
      insights.push({
        type: 'suggestion',
        title: 'High PR Volume',
        description: `${m.openPRs} open PRs detected. Consider prioritizing reviews.`,
        sentiment: 0.6
      })
    }

    if (m?.agents === 100) {
      insights.push({
        type: 'positive',
        title: 'Full Agent Coverage',
        description: 'All 100 AI agents are active and ready to assist!',
        sentiment: 0.9
      })
    }

    return insights
  }

  const getInsightIcon = (type: string) => {
    if (type === 'positive') return <TrendingUp className="h-5 w-5 text-green-500" />
    if (type === 'warning') return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    return <Lightbulb className="h-5 w-5 text-blue-500" />
  }

  const getInsightBorder = (type: string) => {
    if (type === 'positive') return 'border-green-500/30'
    if (type === 'warning') return 'border-yellow-500/30'
    return 'border-blue-500/30'
  }

  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 card-glow">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
          <div className="text-sm text-gray-400">Generating AI insights...</div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-700/30 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 card-glow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`bg-gray-900/50 rounded-lg p-4 border-l-4 ${getInsightBorder(insight.type)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-100 mb-1">
                  {insight.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {insight.description}
                </p>
                {insight.sentiment !== undefined && (
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                        style={{ width: `${insight.sentiment * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {Math.round(insight.sentiment * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {insights.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No insights available at this time</p>
        </div>
      )}
    </div>
  )
}
