'use client'

import {
  animated,
  Interpolation,
  SpringValue,
  useSpring,
} from '@react-spring/web'

// TODO: Better typing for "a" and "b" props
interface ComparisonProps {
  a: any
  b: any
  align?: React.CSSProperties['textAlign']
}

export default function Comparison({ a, b, align = 'left' }: ComparisonProps) {
  const [{ width }, api] = useSpring(() => ({ width: 0.55 }))

  const handleRange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    api.start({ width: +event.target.value / 100 })
  }

  return (
    <div className='demo-container'>
      <div className='controller'>
        <input type='range' defaultValue='55' onChange={handleRange} />
      </div>

      <ConditionalRender {...{ a, b, align, width }} />
    </div>
  )
}

function ConditionalRender({
  a,
  b,
  align,
  width,
}: ComparisonProps & {
  width: SpringValue<number>
}) {
  if (typeof a !== typeof b) return null

  let interpolation: Interpolation<number, string>

  if (typeof a === 'function') {
    interpolation = width.to(
      (v) => `calc(${v} * var(--w1) + ${150 * (1 - v) - 31 * v}px)`
    )

    return (
      <div
        style={{ width: `calc(55% + 144px)`, textAlign: align }}
        className='demo'
      >
        {renderAB(a(interpolation), b(interpolation))}
      </div>
    )
  }

  interpolation = width.to((v) => `calc(${v * 100}% + ${1 - v} * var(--w0))`)

  return (
    <animated.div
      style={{ textAlign: align, width: interpolation }}
      className='demo'
    >
      {renderAB(a, b)}
    </animated.div>
  )
}

const renderAB = (a: JSX.Element, b: JSX.Element) => (
  <>
    <div>
      <legend>Default</legend>
      {a}
    </div>
    <div>
      <legend>With Balancer</legend>
      {b}
    </div>
  </>
)
