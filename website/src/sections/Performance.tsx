'use client'

import Balancer from 'react-wrap-balancer'

import BlankLink from '../components/BlankLink'

export default function Performance() {
  return (
    <>
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
        <BlankLink href='https://github.com/shuding/react-wrap-balancer/tree/main/test/benchmark'>
          source
        </BlankLink>
        ) is done by measuring the script execution time of X balanced titles
        when loading the webpage (
        <BlankLink href='https://gist.github.com/shuding/1554c7bf31efb389c9960758e9f27274'>
          raw data
        </BlankLink>
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
        These numbers don&rsquo;t scale linearly because re-layouts usually have
        an impact to other elements on the page. Hence the best practice is to
        only use this library for title elements when necessary, or use it for
        content that is behind user interactions (e.g. tooltips), to avoid
        negative impacts to the page performance.
      </p>
    </>
  )
}
