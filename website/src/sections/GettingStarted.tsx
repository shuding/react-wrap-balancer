'use client'

import { useRef, useState } from 'react'
import Balancer from 'react-wrap-balancer'
import copy from 'copy-to-clipboard'

import BlankLink from '../components/BlankLink'
import CopyIcon from '../icons/Copy'
import GitHubIcon from '../icons/GitHub'

// Quick and dirty monochrome code highlighter via string templates, don't use this.
function highlightedCode(
  fades: TemplateStringsArray,
  ...highlighted: string[]
) {
  const elements: JSX.Element[] = []
  let i = 0

  for (const fade of fades) {
    elements.push(
      <span key={i++} className='hl-fade'>
        {fade}
      </span>
    )
    if (highlighted.length) {
      elements.push(
        <span key={i++} className='hl-highlighted'>
          {highlighted.shift()}
        </span>
      )
    }
  }

  return elements
}

export default function GettingStarted() {
  const [copying, setCopying] = useState<number>(0)
  const pointerPos = useRef<Record<'x' | 'y', number>>({ x: -1, y: -1 })

  const handlePointerMove: React.MouseEventHandler<HTMLElement> = (event) => {
    pointerPos.current.x = event.clientX
    pointerPos.current.y = event.clientY
  }

  const handleCopy: React.MouseEventHandler<HTMLElement> = (event) => {
    let text = 'npm install react-wrap-balancer'

    // Only copy the selected text if the pointer is moved
    if (
      Math.abs(event.clientX - pointerPos.current.x) > 5 ||
      Math.abs(event.clientY - pointerPos.current.y) > 5
    ) {
      text = window.getSelection().toString()
      if (!text) return
    }

    copy(text)
    setCopying((c) => c + 1)
    setTimeout(() => {
      setCopying((c) => c - 1)
    }, 2000)
  }

  return (
    <>
      <p className='headline'>
        <Balancer>Getting Started</Balancer>
      </p>
      <p>
        <label>Installation</label>
        <code
          className='installation'
          onPointerDown={handlePointerMove}
          onClick={handleCopy}
        >
          npm install react-wrap-balancer
          <span className='copy'>
            <CopyIcon copying={copying > 0} />
          </span>
        </code>
      </p>
      <p>
        <label>Usage</label>
        <span>
          The simplest way is to wrap the text content with{' '}
          <span className='code'>{`<Balancer>`}</span>:
        </span>
        <code>
          {highlightedCode`import ${'Balancer'} from ${"'react-wrap-balancer'"}\n\n// ...\n\n<h1>\n  ${'<Balancer>My Title</Balancer>'}\n</h1>`}
        </code>
        <span>
          If you have multiple <span className='code'>{`<Balancer>`}</span>{' '}
          components used, it&rsquo;s recommended (but optional) to use{' '}
          <span className='code'>{`<Provider>`}</span> to wrap the entire app.
          This will make them share the re-balance logic and reduce the HTML
          size:
        </span>
        <code>
          {highlightedCode`import { ${'Provider'} } from ${"'react-wrap-balancer'"}\n\n// ...\n\n${'<Provider>'}\n  <App/>\n${'</Provider>'}`}
        </code>
      </p>
      <div className='p'>
        <label>Features</label>
        <ul>
          <li>1 kB Gzipped</li>
          <li>Fast O(log n) algorithm</li>
          <li>
            Doesn&rsquo;t cause{' '}
            <BlankLink href='https://web.dev/cls/'>layout shifts</BlankLink>
          </li>
          <li>Works perfectly with web fonts</li>
          <li>
            SSR and{' '}
            <BlankLink href='https://beta.nextjs.org/docs/data-fetching/streaming-and-suspense'>
              streaming SSR
            </BlankLink>{' '}
            supported
          </li>
          <li>
            Switches to native CSS{' '}
            <BlankLink href='https://developer.chrome.com/blog/css-text-wrap-balance/'>
              text-wrap: balance
            </BlankLink>{' '}
            if available
          </li>
          <li>
            <BlankLink href='https://beta.nextjs.org/docs/rendering/server-and-client-components'>
              Next.js 13 app directory and React Server Components
            </BlankLink>{' '}
            compatible
          </li>
        </ul>
      </div>
      <p>
        <label>Requirements</label>
        This library requires React ≥ 16.8.0, and IE 11 is not supported.
      </p>
      <p>
        <BlankLink
          href='https://github.com/shuding/react-wrap-balancer'
          className='github-link'
        >
          <span>View project on</span>
          <span>
            <GitHubIcon height='1.1em' />
            GitHub
          </span>
        </BlankLink>
      </p>
    </>
  )
}
