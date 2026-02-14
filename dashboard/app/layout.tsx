import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BlackRoad OS Dashboard',
  description: 'Live metrics dashboard for BlackRoad OS - 100 AI agents, real-time insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100">{children}</body>
    </html>
  )
}
