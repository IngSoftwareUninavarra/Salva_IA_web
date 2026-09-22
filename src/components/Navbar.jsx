import Logo from './Logo'
import { navLinks } from '../data/content'

export default function Navbar({ scrolled }) {
  return (
    <nav
      className="px-gutter fixed inset-x-0 top-0 z-80 flex items-center justify-between py-3.5 transition-[background-color] duration-500 ease-soft"
      style={{
        backgroundColor: scrolled ? 'rgba(232,189,184,.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      }}
    >
      <a href="#top" aria-label="Salva IA" className="flex items-center gap-2 no-underline">
        <Logo className="h-10 w-auto text-[28px]" />
      </a>
      <div className="hidden items-center gap-8 desk:flex">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} className="link-underline text-[15px] text-ink">
            {l.label}
          </a>
        ))}
      </div>
      <a href="#contacto" className="btn-fill min-h-11 px-[22px] text-[15px] tracking-[-0.01em]">
        Empieza hoy
      </a>
    </nav>
  )
}
