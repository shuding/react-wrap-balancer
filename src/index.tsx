import React from 'react'

const SYMBOL_KEY = '__wrap_balancer__'
const DO_BALANCE = Symbol.for(SYMBOL_KEY)
const IS_SERVER = typeof window === 'undefined'
const useIsomorphicLayoutEffect = IS_SERVER
  ? React.useEffect
  : React.useLayoutEffect

// Register the balancer globally on client.
if (!IS_SERVER) {
  window[DO_BALANCE] = (id: string, wrapper?: HTMLElement) => {
    wrapper =
      wrapper ||
      (window.document.querySelector(`[data-balancer="${id}"]`) as HTMLElement)
    const container = wrapper.parentElement as HTMLElement

    if (!wrapper || !container) return

    const update = (width) => (wrapper.style.maxWidth = width + 'px')

    // Reset wrapper width
    wrapper.style.maxWidth = ''

    // Get the intial container size
    const w = container.offsetWidth
    const h = container.offsetHeight

    // Synchrnously do binary search and calculate the layout
    let l = 0
    let r = w
    let m
    while (l + 1 < r) {
      m = ~~((l + r) / 2)
      update(m)
      if (container.offsetHeight === h) {
        r = m
      } else {
        l = m
      }
    }

    // Update the wrapper width
    update(r)
  }
}

type Props = {
  as?: string
}

export const Balancer: React.FC<Props> = ({
  as = 'span',
  children,
  ...props
}) => {
  const As = as
  const id = React.useId()
  const wrapperRef = React.useRef()

  // Re-balance on content change and on mount/hydration
  useIsomorphicLayoutEffect(() => {
    if (!wrapperRef.current) return
    window[DO_BALANCE](0, wrapperRef.current)
  }, [children])

  // Re-balance on resize
  React.useEffect(() => {
    if (!wrapperRef.current) return

    const container = wrapperRef.current.parentElement as HTMLElement
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      if (!wrapperRef.current) return
      window[DO_BALANCE](0, wrapperRef.current)
    })
    resizeObserver.observe(container)
    return () => {
      resizeObserver.unobserve(container)
    }
  }, [])

  return (
    <>
      <As
        {...props}
        data-balancer={id}
        ref={wrapperRef}
        style={{ display: 'inline-block', textDecoration: 'inherit' }}
      >
        {children}
      </As>
      <script
        dangerouslySetInnerHTML={{
          // Calculate the balance initially for SSR
          __html: `window[Symbol.for("${SYMBOL_KEY}")]("${id}")`,
        }}
      ></script>
    </>
  )
}
