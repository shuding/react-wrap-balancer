import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Inter, Alice } from 'next/font/google'
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

const title = 'React Wrap Balancer'
const description = 'Simple React Component That Makes Titles More Readable'
const url = 'https://react-wrap-balancer.vercel.app/'
const ogImage = url + 'og.png'

const iconSizes = ['32x32', '96x96', '16x16']
const andriodIconSizes = [
  '36x36',
  '48x48',
  '72x72',
  '96x96',
  '144x144',
  '192x192',
]
const appleIconSizes = [
  '57x57',
  '60x60',
  '72x72',
  '76x76',
  '114x114',
  '120x120',
  '144x144',
  '152x152',
  '180x180',
]

export const metadata: Metadata = {
  title,
  description,
  keywords: 'react, wrapping, typography, balance, web',
  authors: { name: 'Shu Ding' },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  openGraph: {
    title,
    description,
    siteName: title,
    url,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shuding_',
    title,
    description,
    images: [ogImage],
  },
  icons: {
    shortcut: [
      { url: '/favicon.ico', media: '(prefers-color-scheme: light)' },
      { url: '/dark-favicon.ico', media: '(prefers-color-scheme: dark)' },
    ],
    icon: [
      ...andriodIconSizes.map((sizes) => ({
        type: 'image/png',
        sizes,
        url: `/android-icon-${sizes}.png`,
        media: '(prefers-color-scheme: light)',
      })),
      ...iconSizes.map((sizes) => ({
        type: 'image/png',
        sizes,
        url: `/favicon-${sizes}.png`,
        media: '(prefers-color-scheme: light)',
      })),
      ...andriodIconSizes.map((sizes) => ({
        type: 'image/png',
        sizes,
        url: `/dark-android-icon-${sizes}.png`,
        media: '(prefers-color-scheme: dark)',
      })),
      ...iconSizes.map((sizes) => ({
        type: 'image/png',
        sizes,
        url: `/dark-favicon-${sizes}.png`,
        media: '(prefers-color-scheme: dark)',
      })),
    ],
    apple: [
      ...appleIconSizes.map((sizes) => ({
        type: 'image/png',
        sizes,
        url: `/apple-icon-${sizes}.png`,
        media: '(prefers-color-scheme: light)',
      })),
      ...appleIconSizes.map((sizes) => ({
        type: 'image/png',
        sizes,
        url: `/dark-apple-icon-${sizes}.png`,
        media: '(prefers-color-scheme: dark)',
      })),
    ],
  },
}

interface LayoutProps {
  children: React.ReactNode
  params?: Record<string, string | string[]>
}

export default function RootLayout({ children }: LayoutProps): JSX.Element {
  const bodyClassName = clsx(inter.className, alice.variable)

  return (
    <html>
      <head />
      <body className={bodyClassName}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
