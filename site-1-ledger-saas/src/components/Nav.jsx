import { useEffect, useRef, useState } from 'react'
import Logomark from './Logomark.jsx'
import Button from './ui/Button.jsx'

const SECTIONS = [
  { label: 'The 11-day problem', href: '#problem', short: 'Problem' },
  { label: 'How the close runs', href: '#mechanism', short: 'Mechanism' },
  { label: 'What it costs', href: '#terms', short: 'Terms' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onClick = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !toggleRef.current?.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClick)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-rule-ui bg-bar-alt">
      <div className="mx-auto grid w-full max-w-[92rem] grid-cols-[auto_1fr] items-center gap-4 px-4 py-3 sm:px-8 lg:grid-cols-[auto_1fr_auto]">
        <a
          href="#top"
          className="flex items-center gap-2.5 py-1.5 text-ink transition-opacity hover:opacity-80"
        >
          <Logomark size={22} />
          <span className="cond text-[1.1rem] font-bold tracking-[-0.01em] uppercase">Ledger</span>
          <span className="num hidden text-[0.66rem] text-ink-soft sm:inline">FORM 1403-GL</span>
        </a>

        <nav aria-label="Sections" className="hidden justify-center lg:flex">
          <ul className="m-0 flex list-none items-center gap-7 p-0">
            {SECTIONS.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  className="num text-[0.7rem] text-ink-mid underline decoration-rule decoration-1 underline-offset-[5px] transition-colors hover:text-red hover:decoration-red"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <a
            href="#terms"
            className="num hidden text-[0.7rem] text-ink-mid transition-colors hover:text-red sm:inline"
          >
            SIGN IN
          </a>
          <Button
            as="a"
            href="#book"
            variant="stamp"
            size="sm"
            className="num !py-2.5 !text-[0.72rem]"
          >
            BOOK A CLOSE REVIEW
          </Button>
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? 'Hide sections' : 'Show sections'}
            aria-expanded={open}
            aria-controls="section-index"
            onClick={() => setOpen((v) => !v)}
            className="num rounded-[3px] border border-rule-ui px-2.5 py-2 text-[0.72rem] text-ink transition-colors hover:bg-bar lg:hidden"
          >
            {open ? 'CLOSE' : 'INDEX'}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="section-index"
          ref={panelRef}
          className="border-t border-rule bg-bar lg:hidden"
        >
          <ul className="m-0 flex list-none flex-col p-0">
            {SECTIONS.map((s) => (
              <li key={s.href} className="border-b border-rule-soft last:border-b-0">
                <a
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="num flex items-baseline justify-between px-4 py-3.5 text-[0.78rem] text-ink transition-colors hover:bg-bar-alt sm:px-8"
                >
                  {s.label}
                  <span className="text-ink-soft">{s.short}</span>
                </a>
              </li>
            ))}
            <li className="border-t border-rule">
              <a
                href="#terms"
                onClick={() => setOpen(false)}
                className="num flex px-4 py-3.5 text-[0.78rem] text-ink-mid transition-colors hover:bg-bar-alt sm:px-8"
              >
                SIGN IN
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
