'use client'

import { GitPullRequest, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface PR {
  number: number
  title: string
  author: string
  status: 'approved' | 'pending' | 'changes_requested'
  health: number
  url: string
}

export default function PRList({ prs }: { prs?: PR[] }) {
  const defaultPRs: PR[] = []

  const prList = prs || defaultPRs

  const getStatusIcon = (status: string) => {
    if (status === 'approved') return <CheckCircle className="h-4 w-4 text-green-500" />
    if (status === 'pending') return <Clock className="h-4 w-4 text-yellow-500" />
    return <AlertCircle className="h-4 w-4 text-red-500" />
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-500'
    if (health >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  if (prList.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 card-glow">
        <div className="text-center text-gray-500 py-8">
          <GitPullRequest className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No open pull requests</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 card-glow max-h-96 overflow-y-auto">
      <div className="space-y-3">
        {prList.map((pr) => (
          <a
            key={pr.number}
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/70 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <GitPullRequest className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-100 truncate">
                    #{pr.number} {pr.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">by {pr.author}</p>
                </div>
              </div>
              {getStatusIcon(pr.status)}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-400 capitalize">
                {pr.status.replace('_', ' ')}
              </span>
              <span className={`text-xs font-semibold ${getHealthColor(pr.health)}`}>
                Health: {pr.health}%
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
