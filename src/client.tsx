'use client'

import React from 'react'
import {SYMBOL_KEY, SYMBOL_OBSERVER_KEY} from './constants'
import type {BalancerProps} from "./index";

declare global {
    interface Window {
        [SYMBOL_KEY]: RelayoutFn
    }
}

interface WrapperElement extends HTMLElement {
    [SYMBOL_OBSERVER_KEY]?: ResizeObserver | undefined
}

type RelayoutFn = (
    id: string | number,
    ratio: number,
    wrapper?: WrapperElement
) => void

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
        ;(wrapper['__wrap_o'] = new ResizeObserver(() => {
            self.__wrap_b(0, +wrapper.dataset.brr, wrapper)
        })).observe(container)
    }
}

export const RELAYOUT_STR = relayout.toString()

const IS_SERVER = typeof window === 'undefined'
const useIsomorphicLayoutEffect = IS_SERVER
    ? React.useEffect
    : React.useLayoutEffect

interface ClientBalancerProps extends BalancerProps {
    id: string
    // `as` and `ratio` are required in the client component
    as: BalancerProps['as'],
    ratio: BalancerProps['ratio'],
}
export const ClientBalancer: React.FC<ClientBalancerProps> = ({
                                                                  id,
                                                                as: Wrapper,
                                                                ratio,
                                                                children,
                                                                ...props
                                                            }) => {
    const wrapperRef = React.useRef<WrapperElement>()

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
        observer.observe(document.head, {childList: true})
    }
}
