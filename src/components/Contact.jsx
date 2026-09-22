import { useState } from 'react'
import { EMAIL, INSTAGRAM_URL, WHATSAPP_DISPLAY, moments, waLink } from '../data/content'
import Blob from './Blob'
import Reveal from './Reveal'
import Ribbon from './Ribbon'

const FIELD =
  'w-full box-border rounded-2xl border-[1.5px] border-blush bg-cream px-[18px] text-base text-ink outline-offset-2 transition-colors focus:border-cocoa focus:outline-none'

// Label sits inside the field and floats up when focused or filled.
function FloatLabel({ active, children }) {
  return (
    <span
      className="pointer-events-none absolute left-[18px] text-cocoa transition-all duration-300 ease-soft"
      style={{ top: active ? 9 : 18, fontSize: active ? 12 : 16 }}
    >
      {children}
    </span>
  )
}

const contactLinks = [
  { href: waLink(), label: `WhatsApp · ${WHATSAPP_DISPLAY}`, dot: 'bg-mint' },
  { href: `mailto:${EMAIL}`, label: EMAIL, dot: 'bg-butter' },
  { href: INSTAGRAM_URL, label: '@salva.ia', dot: 'bg-lilac' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', moment: '', msg: '' })
  const [focus, setFocus] = useState('')

  const bind = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
    onFocus: () => setFocus(key),
    onBlur: () => setFocus(''),
  })
  const isActive = (key) => focus === key || !!form[key]

  const submit = (e) => {
    e.preventDefault()
    const text = `Hola, soy ${form.name}. Momento: ${form.moment}. ${form.msg}`
    window.open(waLink(text), '_blank', 'noopener')
  }

  return (
    <section id="contacto" className="px-gutter py-section relative overflow-hidden bg-blush">
      <Ribbon d="M-50 200 C 400 700, 800 -100, 1200 400 S 1600 700, 1700 500" opacity={0.5} wave="19s" />
      <Blob className="top-[-15%] left-[-10%] size-[36vw]" color="#FDEAB2" opacity={0.5} duration="17s" />
      <Blob className="right-[-12%] bottom-[-20%] size-[34vw]" color="#CCBBEF" opacity={0.45} duration="14s" />
      <Reveal className="relative mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-[clamp(32px,5vw,80px)]">
        <div className="grid gap-[26px]">
          <h2 className="m-0 text-[clamp(38px,5vw,74px)] leading-[.98] font-extrabold tracking-[-0.045em] text-balance">
            Cuéntame en qué momento estás.
          </h2>
          <p className="m-0 max-w-[460px] text-[17px] leading-[1.55] text-cocoa">
            Te respondo yo. Sin formularios eternos ni respuestas automáticas.
          </p>
          <div className="grid gap-2.5 text-[17px]">
            {contactLinks.map((l) => (
              <a key={l.label} href={l.href} className="flex min-h-11 items-center gap-3 font-extrabold text-ink no-underline hover:text-cocoa">
                <span className={`size-2.5 rounded-full ${l.dot}`} />
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={submit}
          className="grid gap-[22px] rounded-[30px] bg-cream p-[clamp(24px,3vw,40px)] shadow-[0_30px_60px_-30px_rgba(142,87,81,.45)]"
        >
          <label className="relative block">
            <FloatLabel active={isActive('name')}>Tu nombre</FloatLabel>
            <input {...bind('name')} name="name" id="contact-name" required autoComplete="name" className={`${FIELD} min-h-14 pt-[22px] pb-2`} />
          </label>
          <label className="relative block">
            <FloatLabel active={isActive('moment')}>Tu momento</FloatLabel>
            <select {...bind('moment')} name="moment" id="contact-moment" required className={`${FIELD} min-h-14 appearance-none pt-[22px] pb-2`}>
              <option value="" />
              {moments.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-6 right-5 size-[9px] rotate-45 border-r-2 border-b-2 border-cocoa" />
          </label>
          <label className="relative block">
            <FloatLabel active={isActive('msg')}>Tu mensaje</FloatLabel>
            <textarea {...bind('msg')} name="message" id="contact-message" rows={4} className={`${FIELD} resize-y pt-[26px] pb-3 leading-normal`} />
          </label>
          <button type="submit" className="btn-fill min-h-[54px] cursor-pointer justify-center border-0 text-base">
            Enviar por WhatsApp
          </button>
        </form>
      </Reveal>
    </section>
  )
}
