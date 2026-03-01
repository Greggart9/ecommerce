import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with your orders, returns, and product questions.',
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}