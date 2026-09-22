import { specialists } from '../data/content'
import Blob from './Blob'
import Reveal from './Reveal'
import Ribbon from './Ribbon'

export default function Specialists() {
  return (
    <section id="especialistas" className="px-gutter py-section relative overflow-hidden bg-cream">
      <Ribbon d="M-50 500 C 300 100, 650 750, 1000 350 S 1400 -50, 1700 400" wave="20s" />
      <Blob className="top-[20%] left-[-12%] size-[34vw]" color="#9FC9FA" duration="16s" />
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="mb-[clamp(36px,4vw,56px)] grid max-w-[640px] gap-3">
          <h2 className="heading-xl">Una red que te sostiene.</h2>
          <p className="m-0 text-[17px] leading-[1.55] text-cocoa">
            Profesionales que conocen el posparto de cerca. Escríbeles directo.
          </p>
        </Reveal>
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px]">
          {specialists.map((e) => (
            <article
              key={e.role}
              data-hover
              className="group relative isolate grid gap-3 overflow-hidden rounded-[28px] bg-petal p-[26px]"
            >
              <div className="absolute inset-0 -z-10 translate-y-full bg-blush transition-transform duration-600 ease-soft group-hover:translate-y-0" />
              <div className="flex items-center gap-3.5">
                <div
                  className="grid size-14 flex-none place-items-center rounded-full text-lg font-extrabold text-ink"
                  style={{ background: e.color }}
                >
                  {e.initial}
                </div>
                <div>
                  <div className="text-lg font-extrabold tracking-[-0.02em]">{e.name}</div>
                  <div className="text-sm text-cocoa">{e.role}</div>
                </div>
              </div>
              <p className="m-0 text-[15px] leading-[1.55] text-pretty">{e.desc}</p>
              <a href={e.wa} target="_blank" rel="noopener" className="btn-outline min-h-11 justify-self-start px-5 text-sm">
                Contactar
              </a>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
