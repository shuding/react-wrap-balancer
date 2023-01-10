import { Inter, Alice } from '@next/font/google'
import React from 'react'
import clsx from 'clsx'
import './style.css'

const inter = Inter({
  weight: 'variable',
  subsets: ['latin'],
  display: 'block',
})

const alice = Alice({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-alice',
  display: 'block',
})

interface LayoutProps {
  children: React.ReactNode
  params?: Record<string, string | string[]>
}

export default function RootLayout({ children }: LayoutProps): JSX.Element {
  const bodyClassName = clsx(inter.className, alice.variable)

  return (
    <html>
      <head />
      <body className={bodyClassName}>{children}</body>
    </html>
  )
}
