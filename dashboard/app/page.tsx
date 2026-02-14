'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Activity, Bot, GitPullRequest, AlertCircle, TrendingUp, Sparkles } from 'lucide-react'
import SystemHealth from '@/components/SystemHealth'
import AgentGrid from '@/components/AgentGrid'
import PRList from '@/components/PRList'
import IssueList from '@/components/IssueList'
import AIInsights from '@/components/AIInsights'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Dashboard() {
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Fetch dashboard data with auto-refresh every 5 seconds
  const { data: metrics, error, isLoading } = useSWR(
    '/api/metrics',
    fetcher,
    { refreshInterval: 5000 }
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-400">Error loading dashboard</p>
          <p className="text-gray-500 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">
                  BlackRoad OS Dashboard
                </h1>
                <p className="text-sm text-gray-400">
                  Live metrics • {metrics?.agents || 100} AI agents • Real-time insights
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xs text-gray-500">Last update</div>
                <div className="text-sm text-gray-300 font-mono">
                  {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Health - Top Section */}
        <section className="mb-8">
          <SystemHealth data={metrics?.health} />
        </section>

        {/* AI Insights - Hugging Face Integration */}
        <section className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-100">AI Insights</h2>
            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
              Powered by Hugging Face
            </span>
          </div>
          <AIInsights metrics={metrics} />
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Agents Grid */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-100">AI Agents</h2>
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                {metrics?.agents || 100} active
              </span>
            </div>
            <AgentGrid agents={metrics?.agentList} />
          </section>

          {/* Pull Requests */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <GitPullRequest className="h-5 w-5 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-100">Pull Requests</h2>
              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                {metrics?.openPRs || 0} open
              </span>
            </div>
            <PRList prs={metrics?.prs} />
          </section>
        </div>

        {/* Issues Section */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-100">Issues</h2>
            <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
              {metrics?.openIssues || 0} open
            </span>
          </div>
          <IssueList issues={metrics?.issues} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>BlackRoad OS Dashboard • Auto-refreshes every 5 seconds</p>
            <p className="mt-1">
              Powered by Cloudflare Pages + Hugging Face AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
