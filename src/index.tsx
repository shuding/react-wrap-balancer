import React from 'react'

const SYMBOL_KEY = '__wrap_balancer__'
const DO_BALANCE = Symbol.for(SYMBOL_KEY)
const IS_SERVER = typeof window === 'undefined'
const useIsomorphicLayoutEffect = IS_SERVER
  ? React.useEffect
  : React.useLayoutEffect

// Register the balancer globally on client.
if (!IS_SERVER) {
  window[DO_BALANCE] = (id: string) => {
    const el = window.document.querySelector(
      `[data-balanced="${id}"]`
    ) as HTMLElement
    if (!el) return

    const wrapper = el.childNodes[0] as HTMLElement
    const update = (width) => (wrapper.style.maxWidth = width + 'px')

    // Reset wrapper width
    wrapper.style.maxWidth = ''

    // Get the intial container size
    const w = el.offsetWidth
    const h = el.offsetHeight

    // Synchrnously do binary search and calculate the layout
    let l = 0
    let r = w
    let m
    while (l + 1 < r) {
      m = ~~((l + r) / 2)
      update(m)
      if (el.offsetHeight === h) {
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
  as: string
}

export const Balancer: React.FC<Props> = ({ as = 'p', children, ...props }) => {
  const As = as
  const style = Object.assign({}, props.style)
  const id = React.useId()
  const containerRef = React.useRef()

  // Re-balance on content change and on mount/hydration
  useIsomorphicLayoutEffect(() => {
    window[DO_BALANCE](id)
  }, [children])

  // Re-balance on resize
  React.useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        window[DO_BALANCE](id)
      })
      resizeObserver.observe(containerRef.current)
      return () => {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <>
      <As {...props} style={style} data-balanced={id} ref={containerRef}>
        <span style={{ display: 'inline-block' }}>{children}</span>
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
