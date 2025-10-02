import './globals.css'
import Providers from './providers'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Todo App - Next.js TypeScript',
  description: 'Todo App converted to Next.js with TypeScript, React Query, Tailwind CSS'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
