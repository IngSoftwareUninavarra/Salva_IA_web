import { useEffect, useRef } from 'react'
import { EASE, prefersReducedMotion, useLoaded } from '../hooks/motion'

// Fades and lifts each direct child in sequence when the block scrolls into view.
export default function Reveal({ as: Tag = 'div', children, ...props }) {
  const ref = useRef(null)
  const loaded = useLoaded()

  useEffect(() => {
    const el = ref.current
    if (!loaded || !el || prefersReducedMotion()) return
    const kids = [...el.children]
    kids.forEach((c, i) => {
      c.style.opacity = '0'
      c.style.transform = 'translateY(28px)'
      c.style.transition = `opacity .7s ${EASE} ${i * 90}ms, transform .9s ${EASE} ${i * 90}ms`
    })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          kids.forEach((c) => {
            c.style.opacity = '1'
            c.style.transform = 'none'
          })
          io.disconnect()
        })
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [loaded])

  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  )
}
