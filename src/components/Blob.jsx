// Blurred colour blob; [data-blob] opts it into scroll parallax (see useScrollEffects).
export default function Blob({ className = '', color, opacity = 0.55, duration = '15s' }) {
  return (
    <div
      data-blob
      className={`blob ${className}`}
      style={{ background: color, opacity, '--blob-dur': duration }}
    />
  )
}
