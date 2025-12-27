'use client'

import { Bot, CheckCircle, AlertCircle, Clock } from 'lucide-react'

interface Agent {
  name: string
  role: string
  status: 'active' | 'warning' | 'error'
  tasks: number
  category: string
}

export default function AgentGrid({ agents }: { agents?: Agent[] }) {
  const defaultAgents: Agent[] = Array.from({ length: 12 }, (_, i) => ({
    name: `Agent ${i + 1}`,
    role: 'Specialist',
    status: 'active',
    tasks: Math.floor(Math.random() * 10),
    category: 'core'
  }))

  const agentList = agents || defaultAgents

  const getStatusIcon = (status: string) => {
    if (status === 'active') return <CheckCircle className="h-4 w-4 text-green-500" />
    if (status === 'warning') return <Clock className="h-4 w-4 text-yellow-500" />
    return <AlertCircle className="h-4 w-4 text-red-500" />
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      core: 'bg-blue-500/20 text-blue-300',
      database: 'bg-purple-500/20 text-purple-300',
      frontend: 'bg-pink-500/20 text-pink-300',
      backend: 'bg-green-500/20 text-green-300',
      devops: 'bg-orange-500/20 text-orange-300',
      security: 'bg-red-500/20 text-red-300',
    }
    return colors[category] || 'bg-gray-500/20 text-gray-300'
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 card-glow max-h-96 overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {agentList.slice(0, 12).map((agent, index) => (
          <div
            key={index}
            className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/70 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-400" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-100">{agent.name}</h4>
                  <p className="text-xs text-gray-500">{agent.role}</p>
                </div>
              </div>
              {getStatusIcon(agent.status)}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(agent.category)}`}>
                {agent.category}
              </span>
              <span className="text-xs text-gray-400">
                {agent.tasks} tasks
              </span>
            </div>
          </div>
        ))}
      </div>
      {agentList.length > 12 && (
        <div className="text-center mt-4">
          <button className="text-sm text-orange-500 hover:text-orange-400">
            View all {agentList.length} agents →
          </button>
        </div>
      )}
    </div>
  )
}
