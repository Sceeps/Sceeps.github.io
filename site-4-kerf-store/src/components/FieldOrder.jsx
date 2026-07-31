import { motion } from 'motion/react'
import Container from './ui/Container.jsx'
import Button from './ui/Button.jsx'
import { slideUp, stagger, seen } from '../lib/motion'

const PHOTO = {
  src: 'https://images.unsplash.com/photo-1509460364839-ef5b594e0ee8?auto=format&fit=crop&w=1600&q=82',
  alt: 'A maker leaning into a blade held flat against a spinning grinding wheel, sparks fanning off the bevel, hands bare and braced.',
}

// Блок сертификации: что гарантируется, что нет, и подпись.
const TERMS = [
  {
    k: 'Sharpening',
    v: 'Free, forever, no limit',
    n: 'Post it back. We pay return postage inside the US and EU. Median turnaround is 6 days.',
  },
  {
    k: 'Returns',
    v: '60 days, used is fine',
    n: 'Cook with it. If it is not for you, send it back patinated and sharpened and we refund in full including your original postage.',
  },
  {
    k: 'Warranty',
    v: 'Lifetime on the maker',
    n: 'Heat-treat failure, handle failure, grind error, delamination — ours, repaired or replaced free.',
  },
  {
    k: 'Not covered',
    v: 'Chips, snapped tips, rust',
    n: 'The four items in Field 03. We will still repair them, usually free, but we will call it what it is rather than pretend it was a defect.',
  },
]

export default function FieldOrder() {
  return (
    <section id="order" className="relative bg-slate on-slate">
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 'var(--z-photo)' }}>
        <img
          src={PHOTO.src}
          alt={PHOTO.alt}
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      </div>
      {/* Затемнение под самый светлый пиксель: на этом снимке снопы искр. */}
      <div
        className="absolute inset-0 bg-slate/92"
        style={{ zIndex: 'var(--z-scrim)' }}
        aria-hidden="true"
      />
      <div
        className="substrate-inv absolute inset-0"
        style={{ zIndex: 'var(--z-scrim)' }}
        aria-hidden="true"
      />

      <Container
        className="relative pt-20 pb-20 sm:pt-28 sm:pb-28"
        style={{ zIndex: 'var(--z-callout)' }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={seen}
          variants={stagger(0.07)}
        >
          <motion.p
            variants={slideUp}
            className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-mark-inv"
          >
            Certification &amp; order
          </motion.p>

          <motion.h2
            variants={slideUp}
            className="mt-5 max-w-[22ch] text-[clamp(2.8rem,2rem+4.2vw,6rem)] font-extrabold text-ink-inv"
          >
            Buy it once. Send it back forever.
          </motion.h2>

          <motion.p
            variants={slideUp}
            className="mt-6 max-w-[60ch] text-[1.04rem] leading-[1.62] text-ink-inv-2"
          >
            Every knife is made to order in batches of forty and ships with the
            inspection sheet carrying its own measured numbers — the ones off your
            blade, not off this page.
          </motion.p>

          <motion.div
            variants={slideUp}
            className="mt-10 grid gap-0 border border-rule-inv sm:grid-cols-[1fr_auto]"
          >
            <dl className="grid grid-cols-2 sm:grid-cols-4">
              {[
                ['Item', 'No. 1 Gyuto'],
                ['Unit price', '$340'],
                ['Lead time', '2–3 weeks'],
                ['Batch', '9 of 40 left'],
              ].map(([k, v]) => (
                <div key={k} className="border-r border-b border-rule-inv px-4 py-3.5 sm:border-b-0">
                  <dt className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.13em] text-ink-inv-3">
                    {k}
                  </dt>
                  <dd className="mt-1 font-mono text-[0.92rem] font-medium tabular-nums text-ink-inv">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <Button
              as="a"
              href="#order"
              variant="stamp"
              size="lg"
              className="w-full sm:w-auto sm:min-w-[13rem]"
            >
              Add to order
            </Button>
          </motion.div>

          <motion.p variants={slideUp} className="mt-3 font-mono text-[0.72rem] text-ink-inv-3">
            Ships in a poplar box with a walnut saya, a diamond honing card, and the
            sheet. Left-hand grind at no charge — note it at checkout.
          </motion.p>

          <motion.dl
            variants={slideUp}
            className="mt-14 grid gap-0 border-t border-rule-inv sm:grid-cols-2 lg:grid-cols-4"
          >
            {TERMS.map((t, idx) => (
              <div
                key={t.k}
                className="border-b border-r border-rule-inv px-5 py-5 last:border-r-0"
              >
                <dt
                  className={[
                    'font-mono text-[0.66rem] font-medium uppercase tracking-[0.13em]',
                    idx === 3 ? 'text-mark-inv' : 'text-ink-inv-3',
                  ].join(' ')}
                >
                  {t.k}
                </dt>
                <dd className="mt-2 text-[1.02rem] font-medium leading-tight text-ink-inv">
                  {t.v}
                </dd>
                <dd className="mt-2.5 text-[0.9rem] leading-[1.58] text-ink-inv-2">{t.n}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            variants={slideUp}
            className="mt-12 flex flex-col gap-6 border border-rule-inv p-6 sm:flex-row sm:items-end sm:justify-between sm:p-7"
          >
            <div className="max-w-[52ch]">
              <p className="font-mono text-[0.64rem] font-medium uppercase tracking-[0.14em] text-ink-inv-3">
                Ground, heat-treated and inspected by
              </p>
              <p className="mt-2 text-[1.6rem] font-bold leading-none text-ink-inv">
                Dolores Vasquez
              </p>
              <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink-inv-2">
                Bladesmith, Kerf Knifeworks. Twelve years at a production grinder
                before this, which is where she learned what a rushed heat-treat looks
                like four years later.
              </p>
            </div>
            <div className="shrink-0 border-t border-rule-inv pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
              <p className="font-mono text-[0.64rem] font-medium uppercase tracking-[0.14em] text-ink-inv-3">
                Signed
              </p>
              <p
                className="mt-1 font-mono text-[1.05rem] font-medium tabular-nums text-mark-inv"
                aria-label="Signature: D V, dated 14 July 2026"
              >
                D·V — 2026-07-14
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
