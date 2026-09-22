import { services } from '../data/content'
import { EASE, prefersReducedMotion } from '../hooks/motion'
import Blob from './Blob'
import Reveal from './Reveal'
import Ribbon from './Ribbon'

const tilt = (e) => {
  if (prefersReducedMotion()) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transition = 'transform .15s linear'
  el.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-4px)`
}

const untilt = (e) => {
  const el = e.currentTarget
  el.style.transition = `transform .7s ${EASE}`
  el.style.transform = 'none'
}

function ServiceCard({ s }) {
  return (
    <article
      data-hover
      onMouseMove={tilt}
      onMouseLeave={untilt}
      className="relative flex min-h-[340px] flex-col gap-4 overflow-hidden rounded-[30px] bg-petal px-7 pt-[30px] pb-7 [transform-style:preserve-3d] [--r:44px] hover:[--r:360px]"
      style={{ marginTop: s.offset }}
    >
      <div
        className="pointer-events-none absolute -right-[22px] -bottom-[22px] size-(--r) rounded-full opacity-55 transition-[width,height] duration-700 ease-soft"
        style={{ background: s.color }}
      />
      <div className="relative grid size-14 place-items-center rounded-full bg-cream">
        <div className="size-[22px] border-3 border-cocoa" style={{ borderRadius: s.iconRadius, transform: s.iconT }} />
      </div>
      <h3 className="relative mt-1.5 mb-0 text-[26px] leading-[1.05] font-extrabold tracking-[-0.035em]">{s.title}</h3>
      <p className="relative m-0 flex-1 text-[15.5px] leading-[1.55] text-pretty">{s.text}</p>
      <span className="relative self-start rounded-full bg-cream px-3 py-1.5 text-[13px] text-cocoa">{s.tag}</span>
    </article>
  )
}

export default function Services() {
  return (
    <section id="servicios" className="px-gutter py-section relative overflow-hidden bg-cream">
      <Ribbon d="M-50 150 C 350 500, 700 -50, 1100 300 S 1500 650, 1700 350" wave="16s" />
      <Blob className="top-[-10%] right-[-8%] size-[36vw]" color="#FDEAB2" duration="15s" />
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="mb-[clamp(40px,5vw,72px)] grid max-w-[640px] gap-3.5">
          <h2 className="heading-xl">Cuatro pilares para volver a ti.</h2>
          <p className="m-0 text-[17px] leading-[1.55] text-cocoa text-pretty">
            Cuerpo, mesa, palabra y red. Eliges por dónde empezar.
          </p>
        </Reveal>
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] items-start gap-5 perspective-[1200px]">
          {services.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
