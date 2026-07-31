import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Logomark from './Logomark.jsx'
import Button from './ui/Button.jsx'

const FIELDS = [
  { n: '01', label: 'Dimensional', href: '#dimensional', id: 'dimensional' },
  { n: '02', label: 'Hardness', href: '#hardness', id: 'hardness' },
  { n: '03', label: 'Reject criteria', href: '#badly', id: 'badly' },
  { n: '04', label: 'Patina', href: '#patina', id: 'patina' },
  { n: '05', label: 'Range', href: '#range', id: 'range' },
  { n: '06', label: 'Service log', href: '#log', id: 'log' },
]

export default function Nav() {
  const [lifted, setLifted] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Наблюдатель подсвечивает текущее поле и ни на что больше не влияет: если он
  // не сработает, контент от этого не пострадает.
  useEffect(() => {
    const targets = FIELDS.map((f) => document.getElementById(f.id)).filter(Boolean)
    if (!targets.length || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-72px 0px -55% 0px', threshold: 0 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const current = FIELDS.find((f) => f.id === active)

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 border-b transition-colors duration-200',
        lifted
          ? 'border-rule-strong bg-plate/95 backdrop-blur-sm'
          : 'border-transparent bg-transparent',
      ].join(' ')}
      style={{ zIndex: 'var(--z-nav)' }}
    >
      {/* Над тёмной обложкой шапка светлая, на светлом фоне — тёмная: два
          набора токенов переключаются классом. */}
      <div className={lifted ? '' : 'on-slate'}>
        <nav className="mx-auto flex max-w-[1180px] items-center gap-4 px-4 py-3 sm:px-7 lg:px-10">
          <a
            href="#sheet"
            aria-label="Kerf Knifeworks — top of the inspection sheet"
            className={[
              'flex min-h-[44px] shrink-0 items-center gap-2.5',
              lifted ? 'text-ink' : 'text-ink-inv',
            ].join(' ')}
          >
            <Logomark size={24} inverted={!lifted} />
            <span className="text-[1.35rem] font-extrabold leading-none tracking-[0.01em]">
              Kerf
            </span>
            <span
              className={[
                'hidden font-mono text-[0.62rem] font-medium uppercase tracking-[0.13em] sm:inline',
                lifted ? 'text-ink-3' : 'text-ink-inv-3',
              ].join(' ')}
            >
              Knifeworks
            </span>
          </a>

          <ul className="ml-auto hidden items-center gap-0 xl:flex">
            {FIELDS.map((f) => {
              const on = f.id === active
              return (
                <li key={f.href}>
                  <a
                    href={f.href}
                    aria-current={on ? 'true' : undefined}
                    className={[
                      'flex items-baseline gap-1.5 border-l px-3 py-1.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.1em] transition-colors',
                      lifted ? 'border-rule' : 'border-rule-inv',
                      on
                        ? lifted
                          ? 'text-mark'
                          : 'text-mark-inv'
                        : lifted
                          ? 'text-ink-2 hover:text-ink'
                          : 'text-ink-inv-2 hover:text-ink-inv',
                    ].join(' ')}
                  >
                    <span className="tabular-nums opacity-70">{f.n}</span>
                    {f.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Компактный вывод текущего поля для md–lg, где список не влезает. */}
          <p
            className={[
              'ml-auto hidden font-mono text-[0.68rem] font-medium uppercase tracking-[0.1em] lg:block xl:hidden',
              lifted ? 'text-ink-2' : 'text-ink-inv-2',
            ].join(' ')}
          >
            {current ? (
              <>
                <span className="tabular-nums opacity-70">{current.n}</span> {current.label}
              </>
            ) : (
              'Inspection sheet'
            )}
          </p>

          <Button
            as="a"
            href="#order"
            variant="stamp"
            size="md"
            className="ml-auto hidden shrink-0 lg:ml-4 lg:inline-flex"
          >
            Order · $340
          </Button>

          <button
            type="button"
            aria-label={open ? 'Close field index' : 'Open field index'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={[
              'ml-auto inline-flex min-h-[44px] min-w-[44px] items-center justify-center border px-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.1em] lg:hidden',
              lifted
                ? 'border-rule-strong text-ink'
                : 'border-rule-inv text-ink-inv',
            ].join(' ')}
          >
            {open ? 'Close' : 'Index'}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-rule-strong bg-plate lg:hidden"
          >
            <ul className="px-4 py-2 sm:px-7">
              {FIELDS.map((f) => (
                <li key={f.href} className="border-b border-rule last:border-b-0">
                  <a
                    href={f.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[48px] items-center gap-3 py-2 font-mono text-[0.8rem] font-medium uppercase tracking-[0.08em] text-ink-2"
                  >
                    <span className="tabular-nums text-mark">{f.n}</span>
                    {f.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-4 pt-2 pb-4 sm:px-7">
              <Button
                as="a"
                href="#order"
                variant="stamp"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Order the No. 1 · $340
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
