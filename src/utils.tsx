import React from 'react'

export const IS_SERVER = typeof window === 'undefined'
export const useIsomorphicLayoutEffect = IS_SERVER
  ? React.useEffect
  : React.useLayoutEffect

let ID = 0
const genId = () => ++ID
let serverHandoffComplete = false

function useIdPolyfill() {
  const [id, setId] = React.useState(serverHandoffComplete ? genId : undefined)

  useIsomorphicLayoutEffect(() => {
    if (id === undefined) {
      setId(genId())
    }

    serverHandoffComplete = true
  }, [])

  if (id === undefined) {
    return id
  }

  return `rwb-${id.toString(32)}`
}

/**
 * A hook for generating unique IDs that are stable across the server and client,
 * while avoiding hydration mismatches. Compatible with React 16+ by using
 * [React 18's useId](https://reactjs.org/docs/hooks-reference.html#useid) if
 * it's available, and a polyfill implementation inspired by
 * [@accessible/use-id](https://github.com/accessible-ui/use-id) if it is not.
 *
 * "rwb-" is hard-coded as a prefix in the polyfill. When using React 18+,
 * a prefix can be provided with the `identifierPrefix` option in
 * [ReactDOMClient](https://reactjs.org/docs/react-dom-client.html).
 */
export function useId() {
  const implementation = React.useMemo((): (() => string | number) => {
    if ('useId' in React) return React.useId
    return useIdPolyfill
  }, [])

  return implementation()
}
