'use client'

import { animated } from '@react-spring/web'
import Balancer from 'react-wrap-balancer'

import Comparison from '../components/Comparison'
import Content from '../components/Content'
import TooltipArrowIcon from '../icons/TooltipArrow'
import TooltipTriggerIcon from '../icons/TooltipTrigger'

export default function UseCases() {
  return (
    <>
      <p className="headline">
        <Balancer>Use Cases</Balancer>
      </p>
      <Comparison
        a={(width) => (
          <div className="tooltip-container">
            <div className="TooltipContent">
              <animated.div style={{ width }}>
                <div className="tooltip item">
                  This deployment is currently in progress. <a>Read more</a>.
                </div>
              </animated.div>
              <TooltipArrowIcon />
            </div>
            <div className="tooltip-trigger">
              <TooltipTriggerIcon />
            </div>
          </div>
        )}
        b={(width) => (
          <div className="tooltip-container">
            <div className="TooltipContent">
              <animated.div style={{ width }}>
                <div className="tooltip item">
                  <Balancer>
                    This deployment is currently in progress. <a>Read more</a>.
                  </Balancer>
                </div>
              </animated.div>
              <TooltipArrowIcon />
            </div>
            <div className="tooltip-trigger">
              <TooltipTriggerIcon />
            </div>
          </div>
        )}
      />
      <h3>
        <Balancer>Useful in tooltips and other UI components</Balancer>
      </h3>
      <Comparison
        a={
          <Content>
            <h2 className="item">
              第六個沉思：論物質性東西的存在；論人的靈魂和肉體之間的實在區別
            </h2>
          </Content>
        }
        b={
          <Content>
            <h2 className="item">
              <Balancer>
                第六個沉思：論物質性東西的存在；論人的靈魂和肉體之間的實在區別
              </Balancer>
            </h2>
          </Content>
        }
      />
      <h3>
        <Balancer>Left aligned, non-latin content</Balancer>
      </h3>
      <Comparison
        a={
          <blockquote className="item">
            <span>
              You have wakened not out of sleep, but into a prior dream, and
              that dream lies within another, and so on, to infinity, which is
              the number of grains of sand. The path that you are to take is
              endless, and you will die before you have truly awakened.
            </span>
            <br />- Jorge Luis Borges
          </blockquote>
        }
        b={
          <blockquote className="item">
            <Balancer>
              You have wakened not out of sleep, but into a prior dream, and
              that dream lies within another, and so on, to infinity, which is
              the number of grains of sand. The path that you are to take is
              endless, and you will die before you have truly awakened.
            </Balancer>
            <br />- Jorge Luis Borges
          </blockquote>
        }
      />
      <h3>
        <Balancer>
          Makes multi-line content more compact with fewer visual changes when
          resizing
        </Balancer>
      </h3>
    </>
  )
}
