import { useRef } from 'react'
import { useParallax } from '../hooks/motion'
import Blob from './Blob'
import Reveal from './Reveal'
import Ribbon from './Ribbon'

export default function Story() {
  const photoRef = useRef(null)
  useParallax(photoRef, -40)

  return (
    <section id="historia" className="px-gutter py-section relative overflow-hidden bg-blush">
      <Ribbon d="M-50 600 C 400 200, 700 900, 1100 450 S 1500 100, 1700 300" opacity={0.5} wave="18s" />
      <Blob className="top-[-12%] right-[-10%] size-[38vw]" color="#CCBBEF" opacity={0.6} duration="16s" />
      <Blob className="bottom-[-18%] left-[-8%] size-[30vw]" color="#FDEAB2" opacity={0.6} duration="13s" />
      <Reveal className="relative mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(28px,5vw,80px)]">
        {/* Wrapper so the reveal transform and the parallax transform don't fight */}
        <div>
          <div
            ref={photoRef}
            className="relative aspect-[4/5] overflow-hidden rounded-[30px_30px_160px_30px] transition-transform duration-200 ease-linear"
            style={{ background: 'repeating-linear-gradient(135deg,#D9A39D 0 14px,#B97C76 14px 28px)' }}
          >
            <div className="absolute bottom-6 left-5 rounded-lg bg-ink/55 px-2.5 py-1.5 font-mono text-xs leading-normal text-cream">
              foto · ella con su hijo · tejidos suaves, luz cálida
            </div>
          </div>
        </div>
        <div>
          <div className="-rotate-[1.6deg] rounded-[20px] bg-cream p-3.5 shadow-[0_30px_60px_-30px_rgba(142,87,81,.45)]">
            <div className="grid gap-[18px] rounded-xl border-[1.5px] border-dashed border-dusty p-[clamp(24px,3vw,40px)]">
              <h2 className="m-0 text-[clamp(30px,3.4vw,46px)] leading-none font-extrabold tracking-[-0.04em]">
                Cómo me fue a mí, sin filtros.
              </h2>
              <p className="m-0 text-base leading-[1.65] text-pretty">
                Mi parto no fue el que había imaginado. Salí del hospital con un cuerpo que no reconocía y una lista de
                cosas que “debía” hacer. Nadie me preguntó cómo estaba yo.
              </p>
              <p className="m-0 text-base leading-[1.65] text-pretty">
                Empecé despacio: cinco minutos de suelo pélvico, un batido que me apetecía, una conversación con otra
                mamá. De ahí nació este método. Hoy mi cuerpo cuenta otra historia, y quiero que el tuyo también pueda
                contarla.
              </p>
              <p className="m-0 text-base leading-[1.65] text-cocoa">Aquí hay espacio para los dos: tu bebé y tú.</p>
              <div className="mt-1.5 font-hand text-[38px] leading-none text-cocoa">Con cariño, Salva</div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
