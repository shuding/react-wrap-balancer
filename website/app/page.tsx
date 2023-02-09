'use client'

import { Provider } from 'react-wrap-balancer'

import Section from '../src/sections'

export default function HomePage() {
  return (
    <Provider>
      <main>
        <Section.Header />
        <Section.Hero />
        <Section.GettingStarted />
        <Section.CustomBalanceRatio />
        <Section.CustomMaxScale />
        <Section.HowItWorks />
        <Section.UseCases />
        <Section.Performance />
        <Section.About />
        <Section.Footer />
      </main>
    </Provider>
  )
}
