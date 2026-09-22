import { useEffect, useRef } from 'react'
import { prefersReducedMotion, useLoaded } from '../hooks/motion'
import Reveal from './Reveal'

const WORD_BASE = 'inline-block transition-transform duration-900 ease-soft'

// Each word slides up out of its mask, staggered, once the curtain lifts.
function Word({ children, index, className = '' }) {
  const loaded = useLoaded()
  return (
    <span
      className={`${WORD_BASE} ${className}`}
      style={{
        transform: loaded ? 'translateY(0)' : 'translateY(120%)',
        transitionDelay: `${250 + index * 90}ms`,
      }}
    >
      {children}
    </span>
  )
}

const BLOBS = [
  'top-[-10%] left-[-10%] w-[55vw] h-[55vw] bg-lilac opacity-70 [--blob-dur:14s]',
  'bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-peach opacity-80 [--blob-dur:18s] [animation-direction:reverse]',
  'top-[30%] right-[20%] w-[30vw] h-[30vw] bg-butter opacity-60 blur-[60px] [--blob-dur:11s]',
]

export default function Hero() {
  const heroRef = useRef(null)
  const blobRefs = useRef([])

  // Blobs drift toward the pointer, each at a different depth.
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches || prefersReducedMotion()) return
    const onMove = (e) => {
      const h = heroRef.current
      if (!h) return
      const r = h.getBoundingClientRect()
      const dx = (e.clientX - r.width / 2) / r.width
      const dy = (e.clientY - r.top - r.height / 2) / r.height
      blobRefs.current.forEach((b, i) => {
        if (b) b.style.transform = `translate(${dx * (50 + i * 40)}px,${dy * (50 + i * 40)}px)`
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <header id="top" ref={heroRef} className="relative flex min-h-svh items-end overflow-hidden bg-blush">
      {BLOBS.map((cls, i) => (
        <div
          key={i}
          ref={(el) => (blobRefs.current[i] = el)}
          className={`blob duration-1200 ${cls}`}
        />
      ))}

      {/* Video frame — drop a loop into /public/hero.mp4 and set src */}
      <div
        className="absolute overflow-hidden rounded-[32px] opacity-90"
        style={{
          inset: 'clamp(72px,8vw,110px) clamp(12px,3vw,40px) clamp(12px,3vw,40px)',
          background: 'repeating-linear-gradient(135deg,#D9A39D 0 14px,#E8BDB8 14px 28px)',
        }}
      >
        <video autoPlay muted loop playsInline className="absolute inset-0 size-full object-cover" />
        <div className="absolute top-[18px] left-5 rounded-lg bg-cream/70 px-2.5 py-1.5 font-mono text-xs leading-normal text-cocoa">
          video loop · ella entrenando / estirando en el set · sin audio
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(232,189,184,0)_25%,rgba(232,189,184,.75)_70%,#E8BDB8_100%)]" />
      </div>

      <svg aria-hidden="true" viewBox="0 0 1600 600" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full opacity-55">
        <path
          d="M-50 380 C 300 120, 520 620, 880 340 S 1350 60, 1700 300"
          fill="none"
          stroke="#F7E6E3"
          strokeWidth="54"
          strokeLinecap="round"
          className="animate-draw"
          style={{ strokeDasharray: 2600, strokeDashoffset: 2600 }}
        />
      </svg>

      <div className="px-gutter relative mx-auto grid w-full max-w-[1280px] gap-[22px] pb-[clamp(56px,7vw,96px)]">
        <div className="overflow-hidden font-hand text-[clamp(26px,2.6vw,38px)] leading-none text-cocoa">
          <Word index={0}>Tu momento también cuenta.</Word>
        </div>
        <h1 className="m-0 text-[clamp(46px,9.2vw,138px)] leading-[.95] tracking-[-0.045em] text-balance">
          <span className="block overflow-hidden pb-[.06em] font-extrabold">
            <Word index={1}>Soy</Word> <Word index={2}>mamá.</Word>
          </span>
          <span className="block overflow-hidden pb-[.06em] font-medium">
            <Word index={3}>Y</Word> <Word index={4}>también</Word> <Word index={5}>soy</Word> <Word index={6}>yo.</Word>
          </span>
        </h1>
        <Reveal className="grid max-w-[560px] gap-[26px]">
          <p className="m-0 text-[clamp(16px,1.3vw,19px)] leading-[1.55] text-pretty">
            Rutinas, nutrición y conversaciones para volver a tu cuerpo a tu ritmo. Sin culpa, con compañía.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#tienda" className="btn-fill min-h-[52px] px-7 text-base">Empieza tu recuperación</a>
            <a href="#historia" className="btn-outline min-h-[52px] px-7 text-base">Lee mi historia</a>
          </div>
        </Reveal>
      </div>

      <div className="absolute right-[clamp(20px,5vw,80px)] bottom-[clamp(56px,7vw,96px)] hidden flex-col items-center gap-2.5 text-xs tracking-[.08em] text-cocoa desk:flex">
        <span className="[writing-mode:vertical-rl]">desliza</span>
        <span className="h-11 w-[1.5px] bg-cocoa animate-bob" />
      </div>
    </header>
  )
}
