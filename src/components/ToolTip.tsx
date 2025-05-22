'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type TooltipProps = {
    text: string
    direction?: 'top' | 'bottom'
    children: React.ReactNode
}

export default function Tooltip({ text, direction = 'bottom', children }: TooltipProps) {
    const iconRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)

    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [visible, setVisible] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)
    const isTop = direction === 'top'

    useEffect(() => {
        if (!visible || !iconRef.current || !tooltipRef.current) return

        const iconRect = iconRef.current.getBoundingClientRect()
        const tooltipRect = tooltipRef.current.getBoundingClientRect()
        const main = document.querySelector('main')
        const mainRect = main?.getBoundingClientRect()
        const spacing = 4

        let left = iconRect.left
        const top = isTop
            ? iconRect.top - tooltipRect.height - spacing
            : iconRect.bottom + spacing

        let flipped = false
        if (mainRect && left + tooltipRect.width > mainRect.right) {
            left = iconRect.right - tooltipRect.width
            flipped = true
        }

        setPosition({ top, left })
        setIsFlipped(flipped)
    }, [visible, isTop])

    return (
        <>
            <div
                ref={iconRef}
                className="inline-block"
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
            </div>

            {visible && (
                <div
                    ref={tooltipRef}
                    className="fixed z-50 flex flex-col items-start"
                    style={{
                        top: position.top,
                        left: position.left,
                    }}
                >
                    {isTop && (
                        <>
                            <div className="w-fit h-[40px] px-3 flex items-center rounded-lg bg-gradient-to-r from-[#9A77FF] to-[#4D6FFF] text-white text-xs font-semibold whitespace-nowrap">
                                {text}
                            </div>
                            <Image
                                src="/icons/Arrow.svg"
                                alt="arrow"
                                width={24}
                                height={8}
                                className={`rotate-180 mt-[-2px] ${isFlipped ? 'self-end' : 'self-start'}`}
                            />
                        </>
                    )}
                    {!isTop && (
                        <>
                            <Image
                                src="/icons/Arrow.svg"
                                alt="arrow"
                                width={24}
                                height={8}
                                className={`mb-[-2px] ${isFlipped ? 'self-end' : 'self-start'}`}
                            />
                            <div className="w-fit h-[40px] px-3 flex items-center rounded-lg bg-gradient-to-r from-[#9A77FF] to-[#4D6FFF] text-white text-xs font-semibold whitespace-nowrap">
                                {text}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
