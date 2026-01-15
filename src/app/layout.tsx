import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daddy G.O. Simulator',
  description: 'Become the ultimate Nigerian mega-church pastor in this premium simulation game.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  themeColor: '#0f172a', // Matches var(--bg-void)
  appleWebApp: {
    title: 'Daddy G.O.',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Material Symbols Font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={inter.className} style={{ background: '#0a0a0f' }}>
        <main style={{
          minHeight: '100vh',
          maxWidth: '768px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
          background: '#0a0a0f'
        }}>
          {children}
        </main>
      </body>
    </html>
  )
}
