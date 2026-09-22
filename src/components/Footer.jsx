import { waLink } from '../data/content'
import Logo from './Logo'

export function Footer() {
  return (
    <footer className="px-gutter bg-ink py-10 text-cream">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-[18px]">
        <Logo variant="rose" className="h-10 w-auto text-[28px]" />
        <p className="m-0 max-w-[520px] text-[13px] leading-normal text-dusty">
          Acompañamiento y educación; no sustituye atención médica.
        </p>
        <span className="text-[13px] text-dusty">© {new Date().getFullYear()} Salva IA</span>
      </div>
    </footer>
  )
}

export function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
      className="fixed right-[22px] bottom-[22px] z-70 grid size-[58px] place-items-center rounded-full bg-ink no-underline shadow-[0_12px_30px_-10px_rgba(36,43,48,.5)]"
    >
      <span className="absolute inset-0 rounded-full border-2 border-blush animate-pulse-ring" />
      <span className="box-border size-[22px] rounded-[50%_50%_50%_4px] border-[2.5px] border-mint" />
    </a>
  )
}
