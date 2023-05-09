'use client'

import React from 'react'
import { useId, IS_SERVER, useIsomorphicLayoutEffect } from './utils'

const SYMBOL_KEY = '__wrap_b'
const SYMBOL_OBSERVER_KEY = '__wrap_o'

interface WrapperElement extends HTMLElement {
  [SYMBOL_OBSERVER_KEY]?: ResizeObserver | undefined
}

type RelayoutFn = (
  id: string | number,
  ratio: number,
  wrapper?: WrapperElement
) => void

declare global {
  interface Window {
    [SYMBOL_KEY]: RelayoutFn
  }
}

const relayout: RelayoutFn = (id, ratio, wrapper) => {
  wrapper =
    wrapper || document.querySelector<WrapperElement>(`[data-br="${id}"]`)
  const container = wrapper.parentElement

  const update = (width: number) => (wrapper.style.maxWidth = width + 'px')

  // Reset wrapper width
  wrapper.style.maxWidth = ''

  // Get the initial container size
  const width = container.clientWidth
  const height = container.clientHeight

  // Synchronously do binary search and calculate the layout
  let lower: number = width / 2 - 0.25
  let upper: number = width + 0.5
  let middle: number

  if (width) {
    // Ensure we don't search widths lower than when the text overflows
    update(lower)
    lower = Math.max(wrapper.scrollWidth, lower)

    while (lower + 1 < upper) {
      middle = Math.round((lower + upper) / 2)
      update(middle)
      if (container.clientHeight === height) {
        upper = middle
      } else {
        lower = middle
      }
    }

    // Update the wrapper width
    update(upper * ratio + width * (1 - ratio))
  }

  // Create a new observer if we don't have one.
  // Note that we must inline the key here as we use `toString()` to serialize
  // the function.
  if (!wrapper['__wrap_o']) {
    if (typeof ResizeObserver !== 'undefined') {
      ;(wrapper['__wrap_o'] = new ResizeObserver(() => {
        self.__wrap_b(0, +wrapper.dataset.brr, wrapper)
      })).observe(container)
    } else {
      // Silently ignore ResizeObserver for production builds
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          'The browser you are using does not support the ResizeObserver API. ' +
            'Please consider add polyfill for this API to avoid potential layout shifts or upgrade your browser. ' +
            'Read more: https://github.com/shuding/react-wrap-balancer#browser-support-information'
        )
      }
    }
  }
}

const RELAYOUT_STR = relayout.toString()

const createScriptElement = (
  injected: boolean,
  nonce?: string,
  suffix: string = ''
) => (
  <script
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      // Calculate the balance initially for SSR
      __html: (injected ? '' : `self.${SYMBOL_KEY}=${RELAYOUT_STR};`) + suffix,
    }}
    nonce={nonce}
  />
)

interface BalancerOwnProps<
  ElementType extends React.ElementType = React.ElementType
> extends React.HTMLAttributes<HTMLElement> {
  /**
   * The HTML tag to use for the wrapper element.
   * @default 'span'
   */
  as?: ElementType
  /**
   * The balance ratio of the wrapper width (0 <= ratio <= 1).
   * 0 means the wrapper width is the same as the container width (no balance, browser default).
   * 1 means the wrapper width is the minimum (full balance, most compact).
   * @default 1
   */
  ratio?: number
  /**
   * The nonce attribute to allowlist inline script injection by the component.
   */
  nonce?: string
  children?: React.ReactNode
}

type BalancerProps<ElementType extends React.ElementType> =
  BalancerOwnProps<ElementType> &
    Omit<React.ComponentPropsWithoutRef<ElementType>, keyof BalancerOwnProps>

/**
 * An optional provider to inject the global relayout function, so all children
 * Balancer components can share it.
 */
const BalancerContext = React.createContext<boolean>(false)
const Provider: React.FC<{
  /**
   * The nonce attribute to allowlist inline script injection by the component
   */
  nonce?: string
  children?: React.ReactNode
}> = ({ nonce, children }) => {
  return (
    <BalancerContext.Provider value={true}>
      {createScriptElement(false, nonce)}
      {children}
    </BalancerContext.Provider>
  )
}

const Balancer = <ElementType extends React.ElementType = React.ElementType>({
  ratio = 1,
  nonce,
  children,
  ...props
}: BalancerProps<ElementType>) => {
  const id = useId()
  const wrapperRef = React.useRef<WrapperElement>()
  const hasProvider = React.useContext(BalancerContext)
  const Wrapper: React.ElementType = props.as || 'span'

  // Re-balance on content change and on mount/hydration.
  useIsomorphicLayoutEffect(() => {
    if (wrapperRef.current) {
      // Re-assign the function here as the component can be dynamically rendered, and script tag won't work in that case.
      ;(self[SYMBOL_KEY] = relayout)(0, ratio, wrapperRef.current)
    }
  }, [children, ratio])

  // Remove the observer when unmounting.
  useIsomorphicLayoutEffect(() => {
    return () => {
      if (!wrapperRef.current) return

      const resizeObserver = wrapperRef.current[SYMBOL_OBSERVER_KEY]
      if (!resizeObserver) return

      resizeObserver.disconnect()
      delete wrapperRef.current[SYMBOL_OBSERVER_KEY]
    }
  }, [])

  if (process.env.NODE_ENV === 'development') {
    // In development, we check `children`'s type to ensure we are not wrapping
    // elements like <p> or <h1> inside. Instead <Balancer> should directly
    // wrap text nodes.
    if (children && !Array.isArray(children) && typeof children === 'object') {
      if (
        'type' in children &&
        typeof children.type === 'string' &&
        children.type !== 'span'
      ) {
        console.warn(
          `<Balancer> should not wrap <${children.type}> inside. Instead, it should directly wrap text or inline nodes.

Try changing this:
  <Balancer><${children.type}>content</${children.type}></Balancer>
To:
  <${children.type}><Balancer>content</Balancer></${children.type}>`
        )
      }
    }
  }

  return (
    <>
      <Wrapper
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
      </Wrapper>
      {createScriptElement(
        hasProvider,
        nonce,
        `self.${SYMBOL_KEY}("${id}",${ratio})`
      )}
    </>
  )
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
          const elements =
            document.querySelectorAll<WrapperElement>('[data-br]')

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

export default Balancer
export { Provider, Balancer }
