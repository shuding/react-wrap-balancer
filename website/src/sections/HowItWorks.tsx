'use client'

import Balancer from 'react-wrap-balancer'

import BlankLink from '../components/BlankLink'

export default function HowItWorks() {
  return (
    <>
      <p className="headline">
        <Balancer>How Does It Work?</Balancer>
      </p>
      <p>
        React Wrap Balancer reduces the width of the content wrapper as much as
        it could, before causing an extra line break. When reaching the minimum
        width, each line will approximately have the same width, and look more
        compact and balanced.
      </p>
      <p>
        Check out the{' '}
        <BlankLink href="https://github.com/shuding/react-wrap-balancer">
          GitHub Repository
        </BlankLink>{' '}
        to learn more.
      </p>
    </>
  )
}
