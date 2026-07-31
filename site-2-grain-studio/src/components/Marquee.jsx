import { Asterisk } from 'lucide-react'

// Дети дублируются, потому что цикл сдвигает дорожку ровно на 50%: без
// копии в конце появляется пустое место.
export default function Marquee({
  items,
  bg = 'bg-ink',
  fg = 'text-chalk',
  border = 'border-chalk/15',
  speedClass = '',
  size = 'text-2xl md:text-4xl',
}) {
  const content = (
    <span className="flex items-center shrink-0">
      {items.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span
            className={`${size} font-display font-semibold uppercase whitespace-nowrap px-6`}
          >
            {item}
          </span>
          <Asterisk className="shrink-0" size={22} strokeWidth={2.5} aria-hidden="true" />
        </span>
      ))}
    </span>
  )

  return (
    <div
      className={`w-full overflow-hidden border-y ${border} ${bg} ${fg} py-4`}
      aria-hidden="true"
    >
      <div className={`marquee-track flex w-max ${speedClass}`}>
        {content}
        {content}
      </div>
    </div>
  )
}
