import { CONTACT, IDENTITY } from '../data.js'

/* Контакты оформлены как ведомость замечаний: нумерованные строки, без
   иконок. */

export default function Review() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="review"
      aria-labelledby="review-title"
      className="diazo on-print scroll-mt-[3.75rem] bg-print-deep"
    >
      <div className="relative mx-auto max-w-[100rem]" style={{ zIndex: 'var(--z-mark)' }}>
        <div className="grid lg:grid-cols-[1fr_28rem]">
          <div className="reveal border-b border-paper/20 px-4 py-12 sm:px-8 sm:py-16 lg:border-b-0 lg:border-r">
            <span className="sheet-no text-red-light">RFI &mdash; OPEN</span>
            <h2
              id="review-title"
              className="mt-3 max-w-[24ch] font-drawn text-[clamp(2rem,6vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-paper"
            >
              {CONTACT.headline}
            </h2>
            <p className="mt-5 max-w-[34rem] font-spec text-[1.0625rem] leading-[1.65] text-paper-dim sm:text-[1.125rem]">
              {CONTACT.body}
            </p>
          </div>

          <div className="reveal">
            <h3 className="sheet-no border-b border-paper/25 px-4 py-3 text-paper-soft sm:px-8">
              COMMENT SCHEDULE
            </h3>
            <ol className="divide-y divide-paper/20">
              {CONTACT.links.map((l, i) => {
                const external = l.href.startsWith('http')
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="group flex items-baseline gap-4 px-4 py-5 transition-colors hover:bg-red-light/15 sm:px-8"
                    >
                      <span className="sheet-no shrink-0 text-red-light">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-drawn text-[1.0625rem] font-bold text-paper">
                          {l.label}
                        </span>
                        <span className="dim mt-1 block break-words text-[0.85rem] text-paper-dim">
                          {l.detail}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-drawn text-[1.1rem] font-bold text-red-light transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </a>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <div className="border-t border-paper/25">
          <dl className="mx-auto grid grid-cols-2 divide-paper/20 sm:grid-cols-4 sm:divide-x">
            {[
              ['DRAWN BY', IDENTITY.name],
              ['DISCIPLINE', IDENTITY.discipline],
              ['LOCATION', IDENTITY.location],
              ['SET', `01 / REV 05 / ${year}`],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`px-4 py-4 sm:px-6 ${i < 2 ? 'border-b border-paper/20 sm:border-b-0' : ''} ${
                  i % 2 === 1 ? 'border-l border-paper/20 sm:border-l-0' : ''
                }`}
              >
                <dt className="sheet-no text-paper-soft">{k}</dt>
                <dd className="dim mt-1.5 text-[0.8rem] leading-snug text-paper-dim">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border-t border-paper/20 px-4 py-4 sm:px-8">
          <p className="dim max-w-[38rem] text-[0.76rem] leading-relaxed text-paper-soft">
            Every company, product, metric and post title on this page is
            invented. Built with Vite, React and Tailwind; 11 KB of JavaScript;
            no analytics, no cookie banner, nothing to consent to.
          </p>
        </div>
      </div>
    </footer>
  )
}
