'use client'

import copy from 'copy-to-clipboard'
import Balancer from 'react-wrap-balancer'
import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

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
          defaultValue='55'
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

function Ratio() {
  const [ratio, setRatio] = useState(0.65)
  const [currentRatio, setCurrentRatio] = useState(0.65)

  useSpring({
    from: { r: 0.65 },
    to: { r: ratio },
    onChange(prop) {
      setCurrentRatio(prop.value.r)
    },
  })

  return (
    <div className='demo-container'>
      <div className='controller'>
        <input
          type='range'
          defaultValue='65'
          onChange={(e) => {
            setRatio(+e.target.value / 100)
          }}
        />
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
  )
}

export default function () {
  const [copying, setCopying] = useState(0)

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
        <code
          className='installation'
          onClick={() => {
            copy('npm install react-wrap-balancer')
            setCopying((c) => c + 1)
            setTimeout(() => {
              setCopying((c) => c - 1)
            }, 2000)
          }}
        >
          npm install react-wrap-balancer
          <span className='copy'>
            {copying > 0 ? (
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z'
                  fill='currentColor'
                  fillRule='evenodd'
                  clipRule='evenodd'
                ></path>
              </svg>
            ) : (
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z'
                  fill='currentColor'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  stroke='currentColor'
                  strokeWidth={0.1}
                ></path>
              </svg>
            )}
          </span>
        </code>
      </p>
      <p>
        <label>Usage</label>
        <code>
          {`import Balancer from 'react-wrap-balancer'\n\n// ...\n\n<h1>\n  <Balancer>My Title</Balancer>\n</h1>`}
        </code>
      </p>
      <div className='p'>
        <label>Features</label>
        <ul>
          <li>0.84 kB Gzipped</li>
          <li>Fast O(log n) algorithm</li>
          <li>
            Doesn’t cause{' '}
            <a href='https://web.dev/cls/' target='_blank'>
              layout shifts
            </a>
          </li>
          <li>
            SSR and{' '}
            <a
              href='https://beta.nextjs.org/docs/data-fetching/streaming-and-suspense'
              target='_blank'
            >
              streaming SSR
            </a>{' '}
            supported
          </li>
          <li>
            <a
              href='https://beta.nextjs.org/docs/rendering/server-and-client-components'
              target='_blank'
            >
              Next.js 13 app directory and React Server Components
            </a>{' '}
            compatible
          </li>
        </ul>
      </div>
      <p>
        <label>Requirements</label>
        This library requires React ≥ 18.0.0, and IE 11 is not supported.
      </p>
      <p>
        <a
          href='https://github.com/shuding/react-wrap-balancer'
          target='_blank'
          className='github-link'
        >
          <span>View project on</span>
          <span>
            <svg
              width='1.1em'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z'
                fill='currentColor'
                fill-rule='evenodd'
                clip-rule='evenodd'
              ></path>
            </svg>
            GitHub
          </span>
        </a>
      </p>
      <p className='headline'>
        <Balancer>Custom Balance Ratio</Balancer>
      </p>
      <Ratio />
      <h3>
        <Balancer>
          Adjust the balance ratio to a custom value between{' '}
          <span className='code'>0</span> (loose) and{' '}
          <span className='code'>1</span> (compact, the default)
        </Balancer>
      </h3>
      <p className='headline'>
        <Balancer>How Does It Work?</Balancer>
      </p>
      <p>
        React Wrap Balancer reduces the width of the content wrapper as much as
        it could, before causing an extra line break. When the minimum width is
        reached, each line should approximately have the same width, hence it’ll
        look more balanced and compact.
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
                    This deployment is currently in progress. <a>Read more</a>.
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
                      This deployment is currently in progress. <a>Read more</a>
                      .
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
        <Balancer>Performance Impact</Balancer>
      </p>
      <p
        style={{
          textAlign: 'left',
          fontSize: 14,
        }}
      >
        It is worth to mention that this project is a workaround for the lack of
        native support for balanced text wrapping in CSS. It is not perfect as
        it adds some performance overhead. However, the performance impact is
        usually very trivial and can be ignored in most cases.
      </p>
      <p
        style={{
          textAlign: 'left',
          fontSize: 14,
        }}
      >
        The following benchmark (
        <a
          href='https://github.com/shuding/react-wrap-balancer/tree/main/test/benchmark'
          target='_blank'
        >
          source
        </a>
        ) is done by measuring the script execution time of X balanced titles
        when loading the webpage (
        <a
          href='https://gist.github.com/shuding/1554c7bf31efb389c9960758e9f27274'
          target='_blank'
        >
          raw data
        </a>
        ):
      </p>
      <a href='/bench.svg' target='_blank' className='benchmark'>
        <img src='/bench.svg' alt='Benchmark result' />
      </a>
      <p
        style={{
          textAlign: 'left',
          fontSize: 14,
        }}
      >
        It shows that when there are less than 100 elements with React Wrap
        Balancer in the initial HTML, the per-element impact to the page load
        time is less than 0.25 ms. When there are 1,000 elements, that number
        increases to ~1 ms. When there are 5,000 elements, the per-element
        script execution time becomes ~7 ms.
      </p>
      <p
        style={{
          textAlign: 'left',
          fontSize: 14,
        }}
      >
        These numbers don’t scale linearly because re-layouts usually have an
        impact to other elements on the page. Hence the best practice is to only
        use this library for title elements when necessary, or use it for
        content that is behind user interactions (e.g. tooltips), to avoid
        negative impacts to the page performance.
      </p>
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
          This project was inspired by Adobe’s{' '}
          <a href=' https://github.com/adobe/balance-text' target='_blank'>
            balance-text
          </a>{' '}
          project, NYT’s{' '}
          <a href='https://github.com/nytimes/text-balancer' target='_blank'>
            text-balancer
          </a>{' '}
          project, and Daniel Aleksandersen’s{' '}
          <a
            href='https://www.ctrl.blog/entry/text-wrap-balance.html'
            target='_blank'
          >
            Improving the New York Times’ line wrap balancer
          </a>
          . If you want to learn more, you can also take a look at the{' '}
          <span className='code'>
            <a
              href='https://drafts.csswg.org/css-text-4/#text-wrap'
              target='_blank'
            >
              text-wrap: balance
            </a>
          </span>{' '}
          proposal.
        </Balancer>
      </p>
      <p style={{ textAlign: 'center', fontSize: 14 }}>
        <Balancer>
          Special thanks to{' '}
          <a href='https://twitter.com/emilkowalski_' target='_blank'>
            Emil Kowalski
          </a>{' '}
          for testing and feedback. Created by{' '}
          <a href='https://twitter.com/shuding_' target='_blank'>
            Shu Ding
          </a>{' '}
          in 2022, released under the MIT license.
        </Balancer>
      </p>
      <p
        className='headline'
        style={{
          fontSize: 20,
          marginBottom: 100,
        }}
      >
        <a
          href='https://vercel.com'
          target='_blank'
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '.4rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span>Deployed on</span>
          <svg height='1.1em' viewBox='0 0 284 65' style={{ marginTop: 2 }}>
            <path d='M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9v-34h9v9.2c0-5.08 5.91-9.2 13.2-9.2z'></path>
          </svg>
        </a>
      </p>
    </main>
  )
}
