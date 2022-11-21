'use client'

import { Balancer } from 'react-wrap-balancer'
import { useSpring, animated } from '@react-spring/web'

const content = (
  <>
    <div className='skeleton' style={{ '--w': '60%' }} />
    <div className='skeleton' style={{ '--w': '80%' }} />
    <div className='skeleton' style={{ '--w': '75%' }} />
  </>
)

function Comparison({ a, b, align = 'left' }) {
  const [styles, api] = useSpring(() => ({
    width: 0.55,
  }))
  return (
    <div className='demo-container'>
      <div className='controller'>
        <input
          type='range'
          onChange={(e) => {
            api.start({ width: +e.target.value / 100 })
          }}
        />
      </div>
      {typeof a === 'function' ? (
        <div
          style={{ width: `calc(55% + 144px)`, textAlign: align }}
          className='demo'
        >
          <div>
            <legend>Default</legend>
            {a(
              styles.width.to(
                (v) => `calc(${v} * var(--w1) + ${150 * (1 - v) - 31 * v}px)`
              )
            )}
          </div>
          <div>
            <legend>With Balancer</legend>
            {b(
              styles.width.to(
                (v) => `calc(${v} * var(--w1) + ${150 * (1 - v) - 31 * v}px)`
              )
            )}
          </div>
        </div>
      ) : (
        <animated.div
          style={{
            width: styles.width.to(
              (v) => `calc(${v * 100}% + ${1 - v} * var(--w0))`
            ),
            textAlign: align,
          }}
          className='demo'
        >
          <div>
            <legend>Default</legend>
            {a}
          </div>
          <div>
            <legend>With Balancer</legend>
            {b}
          </div>
        </animated.div>
      )}
    </div>
  )
}

export default function () {
  return (
    <main>
      <div className='logo-container'>
        <a
          href='https://github.com/shuding/react-wrap-balancer'
          target='_blank'
          className='logo'
        >
          React
          <br />
          Wrap
          <br />
          Balancer
        </a>
      </div>
      <p className='headline'>
        <Balancer>
          Simple React Component That Makes Titles More Readable
        </Balancer>
      </p>
      <Comparison
        align='center'
        a={
          <div className='item'>
            <h2>React: A JavaScript library for building user interfaces</h2>
            {content}
          </div>
        }
        b={
          <div className='item'>
            <h2>
              <Balancer>
                React: A JavaScript library for building user interfaces
              </Balancer>
            </h2>
            {content}
          </div>
        }
      />
      <h3>
        <Balancer>
          React Wrap Balancer avoids single hanging word on the last line
        </Balancer>
      </h3>
      <p className='headline'>
        <Balancer>Getting Started</Balancer>
      </p>
      <p>
        <label>Installation</label>
        <code>npm install react-wrap-balancer</code>
      </p>
      <p>
        <label>Usage</label>
        <code>{`import { Balancer } from 'react-wrap-balancer'\n\n// ...\n\n<h1>\n  <Balancer>My Title</Balancer>\n</h1>`}</code>
      </p>
      <div className='p'>
        <label>Features</label>
        <ul>
          <li>&lt;0.7kB Gzipped</li>
          <li>Fast O(log n) algorithm</li>
          <li>Doesn’t cause layout shift</li>
          <li>SSR and streaming SSR supported</li>
        </ul>
      </div>
      <p>
        <label>Requirements</label>
        This library requires at least React 18.0.0, and IE 11 is not supported.
      </p>
      <p className='headline'>
        <Balancer>How Does It Work?</Balancer>
      </p>
      <p>
        React Wrap Balancer tries to reduce the width of the content, but not
        causing an extra line break. When the minimum width is reached, each
        line should approximately have the same width, hence it’ll look more
        balanced.
      </p>
      <p>
        Check out the{' '}
        <a
          href='https://github.com/shuding/react-wrap-balancer'
          target='_blank'
        >
          GitHub Repository
        </a>{' '}
        to learn more.
      </p>
      <p className='headline'>
        <Balancer>Use Cases</Balancer>
      </p>
      <Comparison
        a={(width) => (
          <>
            <div className='tooltip-container'>
              <div className='TooltipContent'>
                <animated.div style={{ width }}>
                  <div className='tooltip item'>
                    This deployment is currently in progress.{' '}
                    <a href='javascript:void(0)'>Read more</a>.
                  </div>
                </animated.div>
                <svg
                  className='TooltipArrow'
                  width='10'
                  height='5'
                  viewBox='0 0 30 10'
                  preserveAspectRatio='none'
                >
                  <polygon points='0,0 30,0 15,10'></polygon>
                </svg>
              </div>
              <div className='tooltip-trigger'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  width='16'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </>
        )}
        b={(width) => (
          <>
            <div className='tooltip-container'>
              <div className='TooltipContent'>
                <animated.div style={{ width }}>
                  <div className='tooltip item'>
                    <Balancer>
                      This deployment is currently in progress.{' '}
                      <a href='javascript:void(0)'>Read more</a>.
                    </Balancer>
                  </div>
                </animated.div>
                <svg
                  className='TooltipArrow'
                  width='10'
                  height='5'
                  viewBox='0 0 30 10'
                  preserveAspectRatio='none'
                >
                  <polygon points='0,0 30,0 15,10'></polygon>
                </svg>
              </div>
              <div className='tooltip-trigger'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  width='16'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      />
      <h3>
        <Balancer>Useful in tooltips and other UI components</Balancer>
      </h3>
      <Comparison
        align='left'
        a={
          <>
            <h2 className='item'>
              第六個沉思：論物質性東西的存在；論人的靈魂和肉體之間的實在區別
            </h2>
            {content}
          </>
        }
        b={
          <>
            <h2 className='item'>
              <Balancer>
                第六個沉思：論物質性東西的存在；論人的靈魂和肉體之間的實在區別
              </Balancer>
            </h2>
            {content}
          </>
        }
      />
      <h3>
        <Balancer>Left aligned, non-latin content</Balancer>
      </h3>
      <Comparison
        a={
          <>
            <blockquote className='item'>
              <span>
                You have wakened not out of sleep, but into a prior dream, and
                that dream lies within another, and so on, to infinity, which is
                the number of grains of sand. The path that you are to take is
                endless, and you will die before you have truly awakened.
              </span>
              <br />- Jorge Luis Borges
            </blockquote>
          </>
        }
        b={
          <>
            <blockquote className='item'>
              <Balancer>
                You have wakened not out of sleep, but into a prior dream, and
                that dream lies within another, and so on, to infinity, which is
                the number of grains of sand. The path that you are to take is
                endless, and you will die before you have truly awakened.
              </Balancer>
              <br />- Jorge Luis Borges
            </blockquote>
          </>
        }
      />
      <h3>
        <Balancer>
          Makes multi-line content more compact with fewer visual changes when
          resizing
        </Balancer>
      </h3>
      <p className='headline'>
        <Balancer>About React Wrap Balancer</Balancer>
      </p>
      <p style={{ textAlign: 'center', fontSize: 14 }}>
        <Balancer>
          Created by{' '}
          <a href='https://shud.in' target='_blank'>
            Shu Ding
          </a>{' '}
          in 2022, released under the MIT license.
        </Balancer>
      </p>
    </main>
  )
}
