import { reviews } from '../data/content'
import Blob from './Blob'
import Reveal from './Reveal'

function ReviewCard({ r }) {
  return (
    <blockquote className="m-0 grid w-[320px] gap-2.5 rounded-[26px] p-6 text-ink" style={{ background: r.color }}>
      <span className="tracking-[2px] text-cocoa" aria-label="5 de 5 estrellas">★★★★★</span>
      <p className="m-0 text-[15.5px] leading-normal">{r.quote}</p>
      <footer className="text-[13px] font-extrabold">{r.name}</footer>
    </blockquote>
  )
}

// Two marquee rows running in opposite directions; each list is doubled for a seamless loop.
export default function Reviews() {
  const rowA = [...reviews, ...reviews]
  const reversed = [...reviews].reverse()
  const rowB = [...reversed, ...reversed]

  return (
    <section className="py-section relative overflow-hidden bg-ink text-cream">
      <Blob className="top-[-20%] left-[20%] size-[50vw]" color="#8E5751" duration="19s" />
      <Blob className="right-[-10%] bottom-[-30%] size-[40vw]" color="#CCBBEF" opacity={0.25} duration="14s" />
      <Reveal className="px-gutter relative mx-auto mb-[clamp(36px,4vw,56px)] grid max-w-[1280px] gap-2">
        <div className="font-hand text-[clamp(30px,3vw,44px)] leading-none text-blush">Una marca. Todos tus matices.</div>
        <h2 className="heading-xl">Lo que dicen otras mamás.</h2>
      </Reveal>
      <div className="relative grid gap-[18px]">
        <div className="ticker flex w-max gap-[18px] [--ticker-dur:60s]">
          {rowA.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
        <div className="ticker-reverse flex w-max gap-[18px] [--ticker-dur:70s]">
          {rowB.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
