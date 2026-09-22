import { createContext, useContext, useEffect, useState } from 'react'

export const EASE = 'cubic-bezier(.2,.7,.2,1)'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// True once the intro curtain has lifted; entrance animations wait for it.
export const LoadedContext = createContext(false)
export const useLoaded = () => useContext(LoadedContext)

// Page scroll state: progress bar, nav background and parallax for every [data-blob].
export function useScrollEffects() {
  const [scroll, setScroll] = useState({ scrolled: false, progress: 0 })

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const onScroll = () => {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScroll({ scrolled: y > 40, progress: h ? y / h : 0 })
      if (reduced) return
      document.querySelectorAll('[data-blob]').forEach((b, i) => {
        const r = b.getBoundingClientRect()
        const c = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
        // `translate` (scroll) and `transform` (pointer) are independent CSS properties, so they compose.
        b.style.translate = `${c * (i % 2 ? 60 : -60)}px ${c * -90}px`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scroll
}

// Every [data-blob] drifts toward the pointer while its section is on screen.
// Blobs within the same section move at different depths.
export function usePointerBlobs() {
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches || prefersReducedMotion()) return
    let raf = 0
    let mx = 0
    let my = 0

    const update = () => {
      raf = 0
      const vh = window.innerHeight
      document.querySelectorAll('section').forEach((section) => {
        const r = section.getBoundingClientRect()
        if (r.bottom < 0 || r.top > vh) return
        const dx = (mx - r.left - r.width / 2) / r.width
        const dy = (my - r.top - r.height / 2) / r.height
        section.querySelectorAll('[data-blob]').forEach((b, i) => {
          const depth = 50 + i * 35
          b.style.transform = `translate(${dx * depth}px,${dy * depth}px)`
        })
      })
    }
    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
}

// Vertical parallax for a single element, relative to the viewport centre.
export function useParallax(ref, strength = -40) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const c = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
      el.style.transform = `translateY(${c * strength}px)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref, strength])
}
