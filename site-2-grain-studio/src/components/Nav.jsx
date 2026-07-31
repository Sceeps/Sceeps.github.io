import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
]

const LINK_COLORS = ['text-acid', 'text-magenta', 'text-chalk', 'text-signal']

export default function Nav() {
  const [open, setOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleLinkClick = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) {
      window.setTimeout(
        () => el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' }),
        shouldReduceMotion ? 0 : 250,
      )
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-chalk/15 bg-ink/90 px-5 py-4 backdrop-blur-sm md:px-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            handleLinkClick('#top')
          }}
          className="font-display text-xl font-bold uppercase tracking-tight text-chalk md:text-2xl"
        >
          Grain<span className="text-acid">.</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex items-center gap-2 rounded-full border border-chalk/25 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-chalk transition-colors hover:border-acid hover:text-acid md:text-sm"
        >
          {open ? 'Close' : 'Menu'}
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-24 md:px-16"
          >
            <nav className="flex flex-1 flex-col items-start justify-center gap-1">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.href)
                  }}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: shouldReduceMotion ? 0 : 0.08 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group font-display text-[15vw] font-bold uppercase leading-[0.95] tracking-tight md:text-[7.5vw] ${LINK_COLORS[i % LINK_COLORS.length]}`}
                >
                  <span className="inline-flex items-center gap-3">
                    {link.label}
                    <ArrowUpRight
                      className="h-[0.5em] w-[0.5em] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      strokeWidth={2.5}
                    />
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-4 border-t border-chalk/15 pt-6 font-body text-sm text-chalk/70 md:flex-row md:items-end md:justify-between">
              <p>Los Angeles, CA — Chinatown</p>
              <a href="mailto:hello@grainstudio.co" className="text-chalk hover:text-acid">
                hello@grainstudio.co
              </a>
              <p>Open for work, Q4 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
