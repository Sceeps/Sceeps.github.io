import { ArrowUp } from 'lucide-react'
import Marquee from './Marquee'

const COLUMNS = [
  {
    title: 'Sitemap',
    links: [
      { label: 'Work', href: '#work' },
      { label: 'Studio', href: '#studio' },
      { label: 'Capabilities', href: '#capabilities' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Are.na', href: 'https://are.na' },
      { label: 'Vimeo', href: 'https://vimeo.com' },
    ],
  },
]

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault()
    document.querySelector('#top')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-ink pt-16 text-chalk">
      <Marquee
        items={['Grain Studio', 'Brand', 'Motion', 'Product']}
        bg="bg-ink"
        fg="text-chalk/70"
        border="border-chalk/15"
        size="text-xl md:text-2xl"
      />

      <div className="grid grid-cols-1 gap-12 px-5 py-16 md:grid-cols-12 md:gap-8 md:px-8 md:py-20">
        <div className="col-span-1 md:col-span-6">
          <p className="font-display text-4xl font-bold uppercase leading-none md:text-6xl">
            Let's make
            <br />
            some noise.
          </p>
          <a
            href="mailto:hello@grainstudio.co"
            className="mt-6 inline-block font-body text-lg text-chalk/80 underline decoration-chalk/30 underline-offset-4 hover:text-acid hover:decoration-acid"
          >
            hello@grainstudio.co
          </a>
          <p className="mt-2 font-body text-sm text-chalk/50">
            Chinatown, Los Angeles — open for work, Q4 2026
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} className="col-span-1 md:col-span-3">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-chalk/50">
              {col.title}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-base text-chalk/85 transition-colors hover:text-acid"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-chalk/15 px-5 py-6 font-body text-xs text-chalk/50 md:flex-row md:px-8">
        <p>© {new Date().getFullYear()} Grain Studio LLC. Loud on purpose.</p>
        <button
          type="button"
          onClick={scrollToTop}
          className="group flex items-center gap-2 rounded-full border border-chalk/20 px-4 py-2 uppercase tracking-wide transition-colors hover:border-acid hover:text-acid"
        >
          Back to top
          <ArrowUp size={14} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  )
}
