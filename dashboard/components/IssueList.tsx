'use client'

import { AlertCircle, Circle } from 'lucide-react'

interface Issue {
  number: number
  title: string
  labels: string[]
  assignee?: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  url: string
}

export default function IssueList({ issues }: { issues?: Issue[] }) {
  const defaultIssues: Issue[] = []

  const issueList = issues || defaultIssues

  const getPriorityColor = (priority: string) => {
    if (priority === 'critical') return 'text-red-500 bg-red-500/20'
    if (priority === 'high') return 'text-orange-500 bg-orange-500/20'
    if (priority === 'medium') return 'text-yellow-500 bg-yellow-500/20'
    return 'text-blue-500 bg-blue-500/20'
  }

  if (issueList.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 card-glow">
        <div className="text-center text-gray-500 py-8">
          <Circle className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No open issues</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 card-glow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {issueList.map((issue) => (
          <a
            key={issue.number}
            href={issue.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/70 transition-colors"
          >
            <div className="flex items-start space-x-3 mb-3">
              <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-100 line-clamp-2">
                  #{issue.number} {issue.title}
                </h4>
                {issue.assignee && (
                  <p className="text-xs text-gray-500 mt-1">@{issue.assignee}</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(issue.priority)}`}>
                {issue.priority}
              </span>
              {issue.labels.length > 0 && (
                <span className="text-xs text-gray-400">
                  {issue.labels.length} labels
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
