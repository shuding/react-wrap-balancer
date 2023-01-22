'use client'

import Balancer from 'react-wrap-balancer'

import BlankLink from '../components/BlankLink'

export default function About() {
  return (
    <>
      <p className='headline'>
        <Balancer>About React Wrap Balancer</Balancer>
      </p>
      <p
        style={{
          textAlign: 'left',
          fontSize: 14,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Balancer>
          This project was inspired by Adobe&rsquo;s{' '}
          <BlankLink href='https://github.com/adobe/balance-text'>
            balance-text
          </BlankLink>{' '}
          project, NYT&rsquo;s{' '}
          <BlankLink href='https://github.com/nytimes/text-balancer'>
            text-balancer
          </BlankLink>{' '}
          project, and Daniel Aleksandersen&rsquo;s{' '}
          <BlankLink href='https://www.ctrl.blog/entry/text-wrap-balance.html'>
            Improving the New York Times&rsquo; line wrap balancer
          </BlankLink>
          . If you want to learn more, you can also take a look at the{' '}
          <span className='code'>
            <BlankLink href='https://drafts.csswg.org/css-text-4/#text-wrap'>
              text-wrap: balance
            </BlankLink>
          </span>{' '}
          proposal.
        </Balancer>
      </p>
      <p style={{ textAlign: 'center', fontSize: 14 }}>
        <Balancer>
          Special thanks to{' '}
          <BlankLink href='https://twitter.com/emilkowalski_'>
            Emil Kowalski
          </BlankLink>{' '}
          for testing and feedback. Created by{' '}
          <BlankLink href='https://twitter.com/shuding_'>Shu Ding</BlankLink> in
          2022, released under the MIT license.
        </Balancer>
      </p>
    </>
  )
}
