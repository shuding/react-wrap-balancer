import React from 'react'
import {ClientBalancer, RELAYOUT_STR} from './client'
import {SYMBOL_KEY} from './constants'

let hasGlobalRelayoutScript = false

const RelayoutScript: React.FC<{ isGlobal?: boolean, suffix?: string }> = ({isGlobal, suffix = ''}) => {
    const relayoutScript = (
        <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
                // Calculate the balance initially for SSR
                __html: (hasGlobalRelayoutScript ? '' : `self.${SYMBOL_KEY}=${RELAYOUT_STR};`) + suffix,
            }}
        />
    )

    if (isGlobal) {
        hasGlobalRelayoutScript = true
    }

    return relayoutScript
}

const Provider: React.FC<{
    children?: React.ReactNode
}> = ({children}) => (
    <>
        <RelayoutScript isGlobal/>
        {children}
    </>
)

export interface BalancerProps extends React.HTMLAttributes<HTMLElement> {
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

const Balancer: React.FC<BalancerProps> = ({
                                               as = 'span',
                                               ratio = 1,
                                               children,
                                               ...props
                                           }) => {
    const id = React.useId()

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
            <ClientBalancer id={id} as={as} ratio={ratio} {...props}>{children}</ClientBalancer>
            <RelayoutScript suffix={`self.${SYMBOL_KEY}("${id}",${ratio})`}/>
        </>
    )
};

export default Balancer
export { Provider }
