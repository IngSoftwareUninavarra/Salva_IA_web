import { INSTAGRAM_URL, reels } from '../data/content'
import Blob from './Blob'
import Reveal from './Reveal'

export default function Reels() {
  return (
    <section className="px-gutter py-section relative overflow-hidden bg-cream">
      <Blob className="bottom-[-15%] left-[-10%] size-[40vw]" color="#CCBBEF" duration="17s" />
      <Blob className="top-[-10%] right-[10%] size-[28vw]" color="#BFE5D5" duration="13s" />
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="mb-[clamp(36px,4vw,56px)] flex flex-wrap items-end justify-between gap-5">
          <h2 className="heading-xl">Lo que te cuento en Instagram.</h2>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="btn-outline min-h-12 px-6 text-[15px]">
            Sígueme en Instagram
          </a>
        </Reveal>
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] items-start gap-[18px]">
          {reels.map((r) => (
            // Outer div carries the reveal animation; the link owns the hover lift.
            <div key={r.title} style={{ marginTop: r.offset }}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener"
                className="relative block aspect-[9/16] overflow-hidden rounded-[28px] text-ink no-underline transition-[transform,box-shadow] duration-600 ease-soft hover:shadow-[0_30px_50px_-30px_rgba(142,87,81,.5)] hover:[transform:translateY(-12px)_rotate(var(--rot))]"
                style={{ background: r.color, '--rot': r.rot }}
              >
                <div className="stripes absolute inset-0" />
                <div className="absolute top-3.5 left-3.5 rounded-md bg-cream/75 px-2 py-1 font-mono text-[11px] leading-[1.4]">
                  {r.thumb}
                </div>
                <div className="absolute top-3.5 right-3.5 rounded-full bg-ink px-2 py-1 text-xs font-extrabold text-cream">
                  {r.dur}
                </div>
                <div className="absolute top-1/2 left-1/2 grid size-[54px] -translate-1/2 place-items-center rounded-full bg-cream">
                  <span className="ml-1 size-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-ink" />
                </div>
                <div className="absolute inset-x-4 bottom-4 text-sm leading-[1.2] font-extrabold tracking-[-0.02em]">
                  {r.title}
                </div>
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
