'use client'

import { useSpring } from '@react-spring/web'
import { useState } from 'react'
import Balancer from 'react-wrap-balancer'

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
                <Balancer ratio={currentRatio}>
                  The quick brown fox jumps over the lazy dog
                </Balancer>
              </h2>
              <code>{`<Balancer ratio={${ratio.toFixed(2)}}>`}</code>
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
    </>
  )
}
