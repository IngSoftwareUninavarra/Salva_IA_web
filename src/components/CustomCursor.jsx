import { useEffect, useRef } from 'react'

// Soft trailing dot that grows over interactive elements (fine pointers only).
export default function CustomCursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return
    const root = document.documentElement
    root.style.cursor = 'none'
    let mx = null, my = null, cx = -100, cy = -100, big = false, raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      big = !!e.target.closest?.('a,button,[data-hover],input,select,textarea,label')
    }
    const loop = () => {
      const c = ref.current
      if (c && mx != null) {
        cx += (mx - cx) * 0.16
        cy += (my - cy) * 0.16
        c.style.transform = `translate(${cx - 11}px,${cy - 11}px) scale(${big ? 2.6 : 1})`
        c.style.opacity = '1'
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    loop()
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      root.style.cursor = ''
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-95 size-[22px] rounded-full bg-blush opacity-0 mix-blend-multiply transition-opacity duration-300"
    />
  )
}
