import { useLayoutEffect, useRef } from 'react'
import { EASE, prefersReducedMotion } from '../hooks/motion'

// Wide decorative brush stroke behind a section. It draws itself in the first
// time the section scrolls into view, then keeps gently waving.
export default function Ribbon({ d, stroke = '#F7E6E3', opacity = 0.7, wave, className = '' }) {
  const pathRef = useRef(null)

  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path || prefersReducedMotion()) return
    const len = Math.ceil(path.getTotalLength())
    path.style.strokeDasharray = `${len} ${len}`
    path.style.strokeDashoffset = `${len}`

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        path.style.transition = `stroke-dashoffset 2.4s ${EASE}`
        path.style.strokeDashoffset = '0'
        io.disconnect()
      },
      { threshold: 0.2 },
    )
    io.observe(path.ownerSVGElement)
    return () => io.disconnect()
  }, [d])

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 800"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
      style={{ opacity }}
    >
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="70"
        strokeLinecap="round"
        className={wave ? 'ribbon-wave' : undefined}
        style={wave ? { '--wave-dur': wave } : undefined}
      />
    </svg>
  )
}
