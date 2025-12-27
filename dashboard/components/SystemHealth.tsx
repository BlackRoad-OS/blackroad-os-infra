'use client'

import { Activity, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface HealthData {
  score: number
  status: string
  openIssues: number
  openPRs: number
  criticalIssues: number
  trend: number
  history: Array<{ time: string; score: number }>
}

export default function SystemHealth({ data }: { data?: HealthData }) {
  if (!data) {
    return <div className="animate-pulse bg-gray-800 rounded-lg h-64"></div>
  }

  const { score, status, openIssues, openPRs, criticalIssues, trend, history } = data

  const getStatusColor = (status: string) => {
    if (status === 'healthy') return 'text-green-500'
    if (status === 'warning') return 'text-yellow-500'
    if (status === 'degraded') return 'text-orange-500'
    return 'text-red-500'
  }

  const getStatusIcon = (status: string) => {
    if (status === 'healthy') return <CheckCircle className="h-8 w-8" />
    return <AlertCircle className="h-8 w-8" />
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 card-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={getStatusColor(status)}>
            {getStatusIcon(status)}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-100">System Health</h3>
            <p className="text-sm text-gray-400 capitalize">{status}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold text-gradient">{score}</div>
          <div className="text-xs text-gray-400 flex items-center justify-end space-x-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            <span>{trend > 0 ? '+' : ''}{trend}%</span>
          </div>
        </div>
      </div>

      {/* Health Chart */}
      <div className="h-32 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#f97316"
              fillOpacity={1}
              fill="url(#healthGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{openIssues}</div>
          <div className="text-xs text-gray-500 mt-1">Open Issues</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{openPRs}</div>
          <div className="text-xs text-gray-500 mt-1">Open PRs</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{criticalIssues}</div>
          <div className="text-xs text-gray-500 mt-1">Critical</div>
        </div>
      </div>
    </div>
  )
}
