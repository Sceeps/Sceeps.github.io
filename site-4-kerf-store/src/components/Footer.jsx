import Logomark from './Logomark.jsx'
import Container from './ui/Container.jsx'

const COLUMNS = [
  {
    heading: 'Knives',
    links: ['No. 1 Gyuto · $340', 'No. 2 Petty · $185', 'No. 3 Santoku · $295', 'No. 4 Sujihiki · $395'],
  },
  {
    heading: 'Service',
    links: ['Free sharpening', 'Send a knife back', 'Left-hand regrind', '60-day returns'],
  },
  {
    heading: 'Shop',
    links: ['How we heat-treat', 'Where the steel comes from', 'Batch schedule', 'Visit the bench'],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-rule-strong bg-plate pt-16 pb-8">
      <div className="tooth absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a
              href="#sheet"
              className="inline-flex min-h-[44px] items-center gap-2.5 text-ink"
              aria-label="Kerf Knifeworks — back to the top of the inspection sheet"
            >
              <Logomark size={24} />
              <span className="text-[1.3rem] font-extrabold leading-none">Kerf</span>
            </a>
            <p className="mt-4 max-w-[34ch] text-[0.92rem] leading-relaxed text-ink-2">
              Four carbon-steel kitchen knives, forged and ground in batches of forty
              in Providence, Rhode Island. Measured before they leave.
            </p>
            <p className="mt-4 font-mono text-[0.72rem] leading-relaxed text-ink-3">
              14 Dyer Street, Unit 3
              <br />
              Providence RI 02903
              <br />
              Bench hours Thu–Sat, 10–4
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="border-b border-rule-strong pb-2 font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink-3">
                {col.heading}
              </p>
              <ul className="mt-3 flex flex-col">
                {col.links.map((link) => (
                  <li key={link} className="border-b border-rule">
                    <a
                      href="#sheet"
                      className="block py-2.5 text-[0.9rem] text-ink-2 transition-colors hover:text-mark"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <dl className="mt-14 grid grid-cols-2 border-t border-ink sm:grid-cols-4">
          {[
            ['Sheet', '1 of 1'],
            ['Revision', 'C · 2026-07'],
            ['Drawn by', 'D. Vasquez'],
            ['Units', 'mm / g / HRC'],
          ].map(([k, v]) => (
            <div key={k} className="border-r border-b border-rule px-3 py-3 last:border-r-0">
              <dt className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.13em] text-ink-3">
                {k}
              </dt>
              <dd className="mt-1 font-mono text-[0.85rem] font-medium tabular-nums text-ink">
                {v}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.72rem] text-ink-3">
            © 2026 Kerf Knifeworks. All measurements are from real blades.
          </p>
          <div className="-mx-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            {['Instagram', 'Batch notes', 'Contact the bench'].map((l) => (
              <a
                key={l}
                href="#sheet"
                className="inline-flex min-h-[44px] items-center px-2 font-mono text-[0.72rem] text-ink-2 transition-colors hover:text-mark"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
