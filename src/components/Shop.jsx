import { useRef } from 'react'
import { products } from '../data/content'
import Reveal from './Reveal'
import Ribbon from './Ribbon'

function ArrowButton({ dir, onClick }) {
  const prev = dir === 'prev'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={prev ? 'Anterior' : 'Siguiente'}
      className="grid size-[52px] cursor-pointer place-items-center rounded-full border-0 bg-ink text-cream transition-colors duration-300 hover:bg-cocoa"
    >
      <span
        className={`size-2.5 rotate-45 border-current ${
          prev ? 'ml-1 border-b-[2.5px] border-l-[2.5px]' : 'mr-1 border-t-[2.5px] border-r-[2.5px]'
        }`}
      />
    </button>
  )
}

function ProductCard({ p }) {
  return (
    <article className="flex flex-[0_0_min(86vw,320px)] snap-start flex-col gap-3.5 rounded-[30px] bg-cream p-4 shadow-[0_20px_40px_-30px_rgba(142,87,81,.4)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]" style={{ background: p.color }}>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.2)_0_12px,transparent_12px_24px)]" />
        <span className="absolute top-3.5 left-3.5 rounded-md bg-cream/80 px-2 py-1 font-mono text-[11px] leading-[1.4]">
          {p.thumb}
        </span>
      </div>
      <div className="grid gap-2 px-1.5 pb-1.5">
        <span className="text-[13px] text-cocoa">{p.type}</span>
        <h3 className="m-0 text-[22px] leading-[1.1] font-extrabold tracking-[-0.03em]">{p.title}</h3>
        <p className="m-0 text-[14.5px] leading-normal text-pretty">{p.desc}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xl font-extrabold tracking-[-0.02em]">{p.price}</span>
          <a href={p.link} className="btn-fill min-h-11 px-5 text-sm" draggable="false">
            Comprar
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Shop() {
  const trackRef = useRef(null)
  const drag = useRef(null)

  const scrollByCard = (d) => trackRef.current?.scrollBy({ left: d * 340, behavior: 'smooth' })

  // Mouse drag-to-scroll; touch keeps native panning.
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = trackRef.current
    drag.current = { x: e.clientX, sl: el.scrollLeft, moved: false }
    el.style.cursor = 'grabbing'
    el.style.scrollSnapType = 'none'
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) drag.current.moved = true
    trackRef.current.scrollLeft = drag.current.sl - dx
  }
  const endDrag = () => {
    const el = trackRef.current
    if (el) {
      el.style.cursor = 'grab'
      el.style.scrollSnapType = ''
    }
    setTimeout(() => (drag.current = null), 0)
  }
  // Swallow the click that ends a drag so "Comprar" isn't triggered accidentally.
  const onClickCapture = (e) => {
    if (drag.current?.moved) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <section id="tienda" className="py-section relative overflow-hidden bg-petal">
      <Ribbon d="M-50 650 C 400 250, 800 850, 1200 400 S 1550 50, 1700 250" stroke="#E8BDB8" opacity={0.6} wave="18s" />
      <div className="px-gutter relative mx-auto max-w-[1280px]">
        <Reveal className="mb-[clamp(36px,4vw,56px)] flex flex-wrap items-end justify-between gap-5">
          <div className="grid max-w-[600px] gap-3">
            <h2 className="heading-xl">Elige tu punto de partida.</h2>
            <p className="m-0 text-[17px] leading-[1.55] text-cocoa">
              Programas, guías y sesiones. Pagas una vez, empiezas hoy.
            </p>
          </div>
          <div className="flex gap-2.5">
            <ArrowButton dir="prev" onClick={() => scrollByCard(-1)} />
            <ArrowButton dir="next" onClick={() => scrollByCard(1)} />
          </div>
        </Reveal>
      </div>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={() => drag.current && endDrag()}
        onClickCapture={onClickCapture}
        className="px-gutter no-scrollbar relative flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pt-1.5 pb-[30px] select-none"
      >
        {products.map((p) => (
          <ProductCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  )
}
