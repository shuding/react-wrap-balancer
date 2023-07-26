'use client'

import { useSpring } from '@react-spring/web'
import { useState } from 'react'
import Balancer from 'react-wrap-balancer'
import { BlankLink } from '../components'

export default function CustomBalanceRatio() {
  const [ratio, setRatio] = useState<number>(0.65)
  const [currentRatio, setCurrentRatio] = useState<number>(0.65)

  const handleRange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setRatio(+event.target.value / 100)
  }

  useSpring({
    from: { r: 0.65 },
    to: { r: ratio },
    onChange(prop) {
      setCurrentRatio(prop.value.r)
    },
  })

  return (
    <>
      <p className='headline'>
        <Balancer>Custom Balance Ratio</Balancer>
      </p>
      <div className='demo-container'>
        <div className='controller'>
          <input type='range' defaultValue='65' onChange={handleRange} />
        </div>
        <div className='demo' style={{ width: 480, maxWidth: '100%' }}>
          <div
            style={{
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div>
              <h2 className='ratio-ruler'>
                <Balancer>
                  <span>The quick brown fox jumps over the lazy dog</span>
                </Balancer>
              </h2>
              <h2 className='ratio-title'>
                <Balancer ratio={currentRatio} preferNative={false}>
                  The quick brown fox jumps over the lazy dog
                </Balancer>
              </h2>
              <code>{`<Balancer ratio={${ratio.toFixed(
                2
              )}} preferNative={false}>`}</code>
            </div>
          </div>
        </div>
      </div>
      <h3>
        <Balancer>
          Adjust the balance ratio to a custom value between{' '}
          <span className='code'>0</span> (loose) and{' '}
          <span className='code'>1</span> (compact, the default)
        </Balancer>
      </h3>
      <p
        style={{
          position: 'relative',
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='#363636'
          width={18}
          style={{
            position: 'absolute',
            right: '100%',
            marginTop: 4,
            marginRight: 5,
          }}
        >
          <path
            fillRule='evenodd'
            d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
            clipRule='evenodd'
          />
        </svg>
        Note that if the native CSS balance (
        <BlankLink href='https://developer.chrome.com/blog/css-text-wrap-balance/'>
          text-wrap: balance
        </BlankLink>
        ) is available, React Wrap Balancer will use it instead. And the `ratio`
        option will be ignored in that case. You can provide the `preferNative`
        option to opt out.
      </p>
    </>
  )
}
