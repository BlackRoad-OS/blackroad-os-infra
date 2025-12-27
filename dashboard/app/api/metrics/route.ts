import { NextResponse } from 'next/server'

export const runtime = 'edge'

// Mock data generation - in production this would call GitHub API
export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    // Generate mock metrics
    const now = new Date()
    const history = Array.from({ length: 12 }, (_, i) => ({
      time: new Date(now.getTime() - (11 - i) * 5 * 60 * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      score: 85 + Math.random() * 15
    }))

    const agents = [
      { name: 'Claude', role: 'Architect', status: 'active', tasks: 3, category: 'core' },
      { name: 'Felix', role: 'Auto-Fixer', status: 'active', tasks: 12, category: 'core' },
      { name: 'Ruby', role: 'Code Reviewer', status: 'active', tasks: 8, category: 'core' },
      { name: 'Winston', role: 'Refactorer', status: 'active', tasks: 5, category: 'core' },
      { name: 'Cadillac', role: 'Optimizer', status: 'active', tasks: 2, category: 'core' },
      { name: 'Silas', role: 'Guardian', status: 'active', tasks: 1, category: 'security' },
      { name: 'PostgreSQL Optimizer', role: 'Database Specialist', status: 'active', tasks: 4, category: 'database' },
      { name: 'React Specialist', role: 'Frontend Expert', status: 'active', tasks: 6, category: 'frontend' },
      { name: 'API Designer', role: 'Backend Architect', status: 'active', tasks: 3, category: 'backend' },
      { name: 'Kubernetes Manager', role: 'DevOps Specialist', status: 'active', tasks: 7, category: 'devops' },
      { name: 'Security Scanner', role: 'Security Specialist', status: 'warning', tasks: 9, category: 'security' },
      { name: 'Python Expert', role: 'Language Specialist', status: 'active', tasks: 2, category: 'core' },
    ]

    const metrics = {
      health: {
        score: Math.round(history[history.length - 1].score),
        status: history[history.length - 1].score >= 90 ? 'healthy' :
                history[history.length - 1].score >= 70 ? 'warning' : 'degraded',
        openIssues: 15,
        openPRs: 8,
        criticalIssues: 1,
        trend: Math.round((Math.random() - 0.5) * 10),
        history
      },
      agents: 100,
      agentList: agents,
      openIssues: 15,
      openPRs: 8,
      prs: [],
      issues: []
    }

    return NextResponse.json(metrics, {
      headers: {
        'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10'
      }
    })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}
