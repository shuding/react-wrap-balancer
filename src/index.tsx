'use client'

import React from 'react'

const SYMBOL_KEY = '__wrap_balancer'
const IS_SERVER = typeof window === 'undefined'
const useIsomorphicLayoutEffect = IS_SERVER
  ? React.useEffect
  : React.useLayoutEffect

// Register the balancer globally on client.
/* Compressed with SWC using the following config:
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": true
    },
    "target": "es2015",
    "loose": true,
    "minify": {
      "compress": {
        "arguments": true,
        "arrows": true,
        "booleans": true,
        "booleans_as_integers": true,
        "collapse_vars": true,
        "comparisons": true,
        "computed_props": true,
        "conditionals": true,
        "dead_code": true,
        "directives": true,
        "drop_console": true,
        "drop_debugger": true,
        "evaluate": true,
        "expression": true,
        "hoist_funs": true,
        "hoist_props": true,
        "hoist_vars": true,
        "if_return": true,
        "join_vars": true,
        "keep_classnames": true,
        "keep_fargs": true,
        "keep_fnames": true,
        "keep_infinity": true,
        "loops": true,
        "negate_iife": true,
        "properties": true,
        "reduce_funcs": true,
        "reduce_vars": true,
        "side_effects": true,
        "switches": true,
        "typeofs": true,
        "unsafe": true,
        "unsafe_arrows": true,
        "unsafe_comps": true,
        "unsafe_Function": true,
        "unsafe_math": true,
        "unsafe_symbols": true,
        "unsafe_methods": true,
        "unsafe_proto": true,
        "unsafe_regexp": true,
        "unsafe_undefined": true,
        "unused": true,
        "const_to_let": true,
        "pristine_globals": true
      },
      "mangle": {
        "toplevel": true,
        "keep_classnames": false,
        "keep_fnames": false,
        "keep_private_props": false,
        "ie8": false,
        "safari10": false
      }
    }
  },
  "module": {
    "type": "es6"
  },
  "minify": true,
  "isModule": true
}
 */
// const layout = (id: string, wrapper?: HTMLElement) => {
//   wrapper =
//     wrapper ||
//     (document.querySelector(`[data-balancer="${id}"]`) as HTMLElement)
//   const container = wrapper.parentElement as HTMLElement

//   const update = (width) => (wrapper.style.maxWidth = width + 'px')

//   // Reset wrapper width
//   wrapper.style.maxWidth = ''

//   // Get the intial container size
//   const w = container.clientWidth
//   const h = container.clientHeight
//   if (!w) return

//   // Synchrnously do binary search and calculate the layout
//   let l = w / 2
//   let r = w
//   let m
//   while (l + 1 < r) {
//     m = ~~((l + r) / 2)
//     update(m)
//     if (container.clientHeight == h) {
//       r = m
//     } else {
//       l = m
//     }
//   }

//   // Update the wrapper width
//   update(r)
// }

type Props = {
  as?: string
  children?: React.ReactNode
}

// As Next.js adds `display: none` to `body` for development, we need to trigger
// a re-balance right after the style is removed, synchronously.
if (!IS_SERVER && process.env.NODE_ENV !== 'production') {
  const next_dev_style = document.querySelector('[data-next-hide-fouc]')
  if (next_dev_style) {
    const callback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.removedNodes.length) {
          for (const node of mutation.removedNodes) {
            if (node === next_dev_style) {
              observer.disconnect()
              const el = document.querySelectorAll('[data-balancer]')
              // @ts-ignore
              for (const e of el) {
                self[SYMBOL_KEY](0, e)
              }
            }
          }
        }
      }
    }
    const observer = new MutationObserver(callback)
    observer.observe(document.head, { childList: true })
  }
}

const Balancer: React.FC<Props> = ({ as = 'span', children, ...props }) => {
  const As = as
  const id = React.useId()
  const wrapperRef = React.useRef()

  // Re-balance on content change and on mount/hydration
  useIsomorphicLayoutEffect(() => {
    if (!wrapperRef.current) return
    self[SYMBOL_KEY](0, wrapperRef.current)
  }, [children])

  // Re-balance on resize
  useIsomorphicLayoutEffect(() => {
    if (!wrapperRef.current) return

    const container = wrapperRef.current.parentElement as HTMLElement
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      if (!wrapperRef.current) return
      self[SYMBOL_KEY](0, wrapperRef.current)
    })
    resizeObserver.observe(container)
    return () => resizeObserver.unobserve(container)
  }, [])

  return (
    <>
      <As
        {...props}
        data-balancer={id}
        ref={wrapperRef}
        style={{
          display: 'inline-block',
          verticalAlign: 'top',
          textDecoration: 'inherit',
        }}
        suppressHydrationWarning={true}
      >
        {children}
      </As>
      <script
        dangerouslySetInnerHTML={{
          // Calculate the balance initially for SSR
          __html: `self.${SYMBOL_KEY}=${'((e,t)=>{let l;t=t||document.querySelector(`[data-balancer="${e}"]`);let a=t.parentElement,f=e=>t.style.maxWidth=e+"px";t.style.maxWidth="";let o=a.clientWidth,d=a.clientHeight,i=o/2,r=o;if(!o)return;for(;i+1<r;)f(l=~~((i+r)/2)),a.clientHeight==d?r=l:i=l;f(r)})'};self.${SYMBOL_KEY}("${id}")`,
        }}
      ></script>
    </>
  )
}

export default Balancer
