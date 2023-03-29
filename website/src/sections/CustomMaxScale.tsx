'use client'

import { useSpring } from '@react-spring/web'
import { useState } from 'react'
import Balancer from 'react-wrap-balancer'

export default function CustomMaxScale() {
  const [scale, setScale] = useState<number>(1.5)
  const [currentScale, setCurrentScale] = useState<number>(1.5)

  const handleRange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setScale(+event.target.value / 100 + 1)
  }

  useSpring({
    from: { r: 1.5 },
    to: { r: scale },
    onChange(prop) {
      setCurrentScale(prop.value.r)
    },
  })

  return (
    <>
      <p className='headline'>
        <Balancer>Custom Max Scale</Balancer>
      </p>
      <div className='demo-container'>
        <div className='controller'>
          <input type='range' defaultValue='50' onChange={handleRange} />
        </div>
        <div className='demo' style={{ width: 480, maxWidth: '100%' }}>
          <div
            style={{
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div>
              <h2 className='scale-title'>
                <Balancer maxScale={currentScale}>
                  The quick brown fox jumps over the lazy dog
                </Balancer>
              </h2>
              <code>{`<Balancer maxScale={${scale.toFixed(2)}}>`}</code>
            </div>
          </div>
        </div>
      </div>
      <h3>
        <Balancer>
          Adjust the max scale to a custom value between{' '}
          <span className='code'>1</span> (no scaling, the default) and{' '}
          <span className='code'>2</span> (twice the authored font-size)
        </Balancer>
      </h3>
    </>
  )
}
