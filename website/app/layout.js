import { Inter, Alice } from '@next/font/google'
import './style.css'

const inter = Inter({
  weight: 'variable',
  subsets: ['latin'],
})

const alice = Alice({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-alice',
})

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className={inter.className + ' ' + alice.variable}>{children}</body>
    </html>
  )
}
