'use client'

import Balancer from 'react-wrap-balancer'

import Comparison from '../components/Comparison'
import Content from '../components/Content'

export default function HeroSection() {
  return (
    <>
      <p className="headline">
        <Balancer>
          Simple React Component That Makes Titles More Readable
        </Balancer>
      </p>
      <Comparison
        align="center"
        a={
          <Content as="div" className="item">
            <h2>React: A JavaScript library for building user interfaces</h2>
          </Content>
        }
        b={
          <Content as="div" className="item">
            <h2>
              <Balancer>
                React: A JavaScript library for building user interfaces
              </Balancer>
            </h2>
          </Content>
        }
      />
      <h3>
        <Balancer>
          React Wrap Balancer avoids single hanging word on the last line
        </Balancer>
      </h3>
    </>
  )
}
