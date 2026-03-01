import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Methods',
  description: 'Learn about the science and philosophy behind our skincare formulations.',
}

export default function OurMethodsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}