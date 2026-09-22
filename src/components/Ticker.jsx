import { ticker } from '../data/content'

export default function Ticker() {
  const items = [...ticker, ...ticker]
  return (
    <div className="overflow-hidden whitespace-nowrap bg-ink py-[18px] text-cream">
      <div className="ticker inline-flex gap-14 will-change-transform [--ticker-dur:40s]">
        {items.map((p, i) => (
          <span key={i} className="inline-flex items-baseline gap-14">
            <span className="text-[22px] font-extrabold tracking-[-0.03em]">{p.bold}</span>
            <span className="font-hand text-[28px] text-blush">{p.hand}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
