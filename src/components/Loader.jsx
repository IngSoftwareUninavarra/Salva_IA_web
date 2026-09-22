import Logo from './Logo'

// Full-screen intro curtain that slides up once the page is ready.
export default function Loader({ loaded }) {
  return (
    <div
      data-loader
      aria-hidden="true"
      className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-3.5 bg-blush transition-transform duration-900 ease-soft will-change-transform"
      style={{ transform: loaded ? 'translateY(-101%)' : 'translateY(0)' }}
    >
      <Logo
        className="h-auto w-[min(320px,70vw)] text-[clamp(56px,12vw,96px)] animate-wipe"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
      />
      <div className="font-hand text-[30px] text-cocoa opacity-0 animate-fade">Tu momento también cuenta.</div>
    </div>
  )
}
