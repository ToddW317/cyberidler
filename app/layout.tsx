import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata: Metadata = {
  title: 'CyberIdler',
  description: 'An idle-incremental game set in a cyberpunk world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  )
}