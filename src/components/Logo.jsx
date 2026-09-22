import { useState } from 'react'

// Brand logo from /public. Falls back to a text wordmark if the PNG is missing.
export default function Logo({ variant = 'dark', className = '', style }) {
  const [failed, setFailed] = useState(false)
  const color = variant === 'rose' ? 'text-blush' : 'text-ink'

  if (failed) {
    return (
      <span className={`inline-block font-extrabold tracking-[-0.04em] leading-none ${color} ${className}`} style={style}>
        salva <span className="text-cocoa">IA</span>
      </span>
    )
  }

  return (
    <img
      src={`/logo-${variant}.png`}
      alt="salva IA"
      className={`block ${className}`}
      style={style}
      onError={() => setFailed(true)}
    />
  )
}
