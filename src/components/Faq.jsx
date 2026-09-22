import { useState } from 'react'
import { faqs } from '../data/content'
import Blob from './Blob'
import Reveal from './Reveal'
import Ribbon from './Ribbon'

function FaqItem({ f, open, onToggle, id }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-cream">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-6 py-[22px] text-left text-lg font-extrabold tracking-[-0.02em] text-ink"
      >
        <span>{f.q}</span>
        <span
          aria-hidden="true"
          className={`grid size-11 flex-none place-items-center rounded-full text-[26px] leading-none font-medium transition-[transform,background-color] duration-500 ease-soft ${
            open ? 'rotate-45 bg-ink text-cream' : 'rotate-0 bg-blush text-ink'
          }`}
        >
          +
        </span>
      </button>
      <div
        id={id}
        className="overflow-hidden transition-[max-height,opacity] duration-600 ease-soft"
        style={{ maxHeight: open ? 240 : 0, opacity: open ? 1 : 0 }}
      >
        <p className="m-0 max-w-[640px] px-6 pb-6 text-base leading-[1.6] text-pretty">{f.a}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(-1)

  return (
    <section className="px-gutter py-section relative overflow-hidden bg-petal">
      <Ribbon d="M-50 300 C 350 -50, 700 700, 1100 300 S 1500 -50, 1700 250" stroke="#FAF6EF" opacity={0.8} wave="17s" />
      <Blob className="right-[-8%] bottom-[-10%] size-[32vw]" color="#F8B9AA" duration="15s" />
      <Reveal className="relative mx-auto grid max-w-[820px] gap-3">
        <h2 className="heading-xl mb-5!">Lo que sueles preguntarme.</h2>
        {faqs.map((f, i) => (
          <FaqItem key={f.q} f={f} id={`faq-${i}`} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </Reveal>
    </section>
  )
}
