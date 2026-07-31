import { useEffect, useState } from 'react'
import { IDENTITY, SHEETS } from '../data.js'

/* Штамп листа вместо обычной навигации: показывает, на каком листе читатель
   сейчас, а пункты меню — это номера листов. */

const SHEET_NAV = [
  ...SHEETS.map((s) => ({ id: s.id, href: `#${s.slug}`, label: s.project })),
  { id: 'R-01', href: '#revisions', label: 'Revisions' },
  { id: 'G-00', href: '#scope', label: 'Scope' },
]

export default function TitleBlock() {
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const ids = SHEET_NAV.map((s) => s.href.slice(1))
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!nodes.length) return

    const seen = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.intersectionRatio)
        let best = null
        let bestRatio = 0
        for (const [id, ratio] of seen) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (bestRatio > 0.06) {
          const hit = SHEET_NAV.find((s) => s.href.slice(1) === best)
          setCurrent(hit ? hit.id : null)
        }
      },
      { threshold: [0, 0.06, 0.25, 0.5, 0.75, 1] },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <header
      className="sticky top-0 border-b border-ink/25 bg-stock/95 backdrop-blur-[2px]"
      style={{ zIndex: 'var(--z-titleblock)' }}
    >
      <div className="mx-auto flex max-w-[100rem] items-stretch">
        <a
          href="#cover"
          className="flex shrink-0 flex-col justify-center border-r border-ink/25 px-3 py-2 transition-colors hover:bg-print/8 sm:px-5"
        >
          <span className="font-drawn text-[0.9rem] font-bold leading-none tracking-tight text-ink sm:text-base">
            {IDENTITY.name}
          </span>
          <span className="sheet-no mt-1 leading-none text-print">
            {IDENTITY.stamp}
          </span>
        </a>

        {/* Список листов прокручивается по горизонтали, иначе на узких экранах
            он растягивает страницу. */}
        <nav
          aria-label="Sheet index"
          className="flex min-w-0 flex-1 items-stretch overflow-x-auto"
        >
          {SHEET_NAV.map((s) => {
            const active = current === s.id
            return (
              <a
                key={s.id}
                href={s.href}
                aria-current={active ? 'true' : undefined}
                className={`group flex shrink-0 flex-col justify-center gap-0.5 border-r border-ink/15 px-3 py-2 transition-colors sm:px-4 ${
                  active ? 'bg-print text-paper' : 'hover:bg-print/10'
                }`}
              >
                <span
                  className={`sheet-no leading-none ${
                    active ? 'text-paper' : 'text-red-ink'
                  }`}
                >
                  {s.id}
                </span>
                <span
                  className={`font-drawn text-[0.8rem] leading-none ${
                    active ? 'text-paper' : 'text-ink-mid group-hover:text-ink'
                  }`}
                >
                  {s.label}
                </span>
              </a>
            )
          })}
        </nav>

        <a
          href="#review"
          className="group hidden shrink-0 flex-col justify-center border-l border-ink/25 bg-red-tint px-5 py-2 transition-colors hover:bg-red md:flex"
        >
          <span className="sheet-no leading-none text-red-ink transition-colors group-hover:text-paper">
            RFI
          </span>
          <span className="font-drawn text-[0.8rem] font-semibold leading-none text-ink transition-colors group-hover:text-paper">
            Send a comment
          </span>
        </a>
      </div>
    </header>
  )
}
