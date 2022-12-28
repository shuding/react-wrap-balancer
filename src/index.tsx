'use client'

import React from 'react'

const SYMBOL_KEY = '__wrap_balancer'
const IS_SERVER = typeof window === 'undefined'
const useIsomorphicLayoutEffect = IS_SERVER
  ? React.useEffect
  : React.useLayoutEffect

type RelayoutFn = (
  id: string | number,
  ratio: number,
  wrapper?: HTMLElement
) => void

declare global {
  interface Window {
    [SYMBOL_KEY]: RelayoutFn
  }
}

const relayout: RelayoutFn = (id, ratio, wrapper) => {
  wrapper = wrapper || document.querySelector<HTMLElement>(`[data-br="${id}"]`)
  const container = wrapper.parentElement

  const update = (width: number) => (wrapper.style.maxWidth = width + 'px')

  // Reset wrapper width
  wrapper.style.maxWidth = ''

  // Get the intial container size
  const width = container.clientWidth
  const height = container.clientHeight

  // Synchronously do binary search and calculate the layout
  let left: number = width / 2
  let right: number = width
  let middle: number

  if (width) {
    while (left + 1 < right) {
      middle = ~~((left + right) / 2)
      update(middle)
      if (container.clientHeight === height) {
        right = middle
      } else {
        left = middle
      }
    }

    // Update the wrapper width
    update(right * ratio + width * (1 - ratio))
  }
}

const MINIFIED_RELAYOUT_STR = relayout.toString()

interface BalancerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The HTML tag to use for the wrapper element.
   * @default 'span'
   */
  as?: React.ElementType
  /**
   * The balance ratio of the wrapper width (0 <= ratio <= 1).
   * 0 means the wrapper width is the same as the container width (no balance, browser default).
   * 1 means the wrapper width is the minimum (full balance, most compact).
   * @default 1
   */
  ratio?: number
  children?: React.ReactNode
}

// As Next.js adds `display: none` to `body` for development, we need to trigger
// a re-balance right after the style is removed, synchronously.
if (!IS_SERVER && process.env.NODE_ENV !== 'production') {
  const next_dev_style = document.querySelector<HTMLElement>(
    '[data-next-hide-fouc]'
  )
  if (next_dev_style) {
    const callback: MutationCallback = (mutationList) => {
      for (const mutation of mutationList) {
        for (const node of Array.from(mutation.removedNodes)) {
          if (node !== next_dev_style) continue

          observer.disconnect()
          const elements = document.querySelectorAll<HTMLElement>('[data-br]')

          for (const element of Array.from(elements)) {
            self[SYMBOL_KEY](0, +element.dataset.brr, element)
          }
        }
      }
    }
    const observer = new MutationObserver(callback)
    observer.observe(document.head, { childList: true })
  }
}

const Balancer: React.FC<BalancerProps> = ({
  as: Component = 'span',
  ratio = 1,
  children,
  ...props
}) => {
  const id = React.useId()
  const wrapperRef = React.useRef<HTMLElement>()

  // Re-balance on content change and on mount/hydration
  useIsomorphicLayoutEffect(() => {
    if (!wrapperRef.current) {
      return
    }

    // Re-assign the function here as the component can be dynamically rendered, and script tag won't work in that case.
    ;(self[SYMBOL_KEY] = relayout)(0, ratio, wrapperRef.current)
  }, [children, ratio])

  // Re-balance on resize
  useIsomorphicLayoutEffect(() => {
    if (!wrapperRef.current) return

    const container = wrapperRef.current.parentElement
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      if (!wrapperRef.current) return
      self[SYMBOL_KEY](0, ratio, wrapperRef.current)
    })
    resizeObserver.observe(container)
    return () => resizeObserver.unobserve(container)
  }, [])

  return (
    <>
      <Component
        {...props}
        data-br={id}
        data-brr={ratio}
        ref={wrapperRef}
        style={{
          display: 'inline-block',
          verticalAlign: 'top',
          textDecoration: 'inherit',
        }}
        suppressHydrationWarning
      >
        {children}
      </Component>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          // Calculate the balance initially for SSR
          __html: `self.${SYMBOL_KEY}=${MINIFIED_RELAYOUT_STR};self.${SYMBOL_KEY}("${id}",${ratio})`,
        }}
      />
    </>
  )
}

export default Balancer
