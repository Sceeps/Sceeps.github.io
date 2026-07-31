import { motion, useReducedMotion } from 'motion/react'
import Container from './ui/Container.jsx'
import Button from './ui/Button.jsx'
import { slideUp, stagger } from '../lib/motion'

const PHOTO = {
  src: 'https://images.unsplash.com/photo-1596299085622-4f96269e5bc7?auto=format&fit=crop&w=2000&q=82',
  alt: 'Kerf No. 1 Gyuto lying on a granite surface plate, a single raking light running the length of the ground bevel so the grind line reads from heel to tip.',
}

const CERT = [
  { k: 'Model', v: 'No. 1 Gyuto · 210mm' },
  { k: 'Heat lot', v: '52100 / H-2419' },
  { k: 'Serial', v: 'K-0412 of 40' },
  { k: 'Plated', v: '2026-07-14' },
  { k: 'Inspector', v: 'D. Vasquez' },
]

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section id="sheet" className="relative border-b border-rule-strong bg-slate on-slate">
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 'var(--z-photo)' }}>
        <motion.img
          src={PHOTO.src}
          alt={PHOTO.alt}
          fetchPriority="high"
          initial={reduced ? false : { scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Плотность затемнения подобрана под самый светлый пиксель снимка, а не
          под средний: на 0.86 мелкие подписи 12px уже проваливались. Градиент
          ниже лежит поверх этой основы, а не вместо неё. */}
      <div
        className="absolute inset-0 bg-slate/92"
        style={{ zIndex: 'var(--z-scrim)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-slate via-slate/55 to-transparent"
        style={{ zIndex: 'var(--z-scrim)' }}
        aria-hidden="true"
      />
      <div
        className="substrate-inv absolute inset-0"
        style={{ zIndex: 'var(--z-scrim)' }}
        aria-hidden="true"
      />

      <Container
        className="relative flex min-h-[100svh] flex-col justify-end pt-28 pb-0 sm:pt-32"
        style={{ zIndex: 'var(--z-callout)' }}
      >
        <motion.div initial="hidden" animate="visible" variants={stagger(0.07, 0.1)}>
          <motion.p
            variants={slideUp}
            className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.2em] text-mark-inv"
          >
            Dimensional inspection certificate
          </motion.p>

          <motion.h1
            variants={slideUp}
            className="mt-6 max-w-[19ch] text-[clamp(3.4rem,2.1rem+7.4vw,8.6rem)] font-extrabold text-ink-inv"
          >
            Every blade leaves with its own numbers.
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="mt-7 max-w-[58ch] text-[1.06rem] leading-[1.62] text-ink-inv-2"
          >
            We measure each knife on a granite plate before it ships and print the
            readings on the sheet in the box — spine thickness at four points,
            finished weight, balance point, tested hardness. Not a marketing range.
            The numbers off <em className="not-italic text-ink-inv">your</em> knife.
          </motion.p>

          <motion.div variants={slideUp} className="mt-9 flex flex-wrap items-center gap-3">
            <Button as="a" href="#order" variant="stamp" size="lg">
              Order the No. 1 · $340
            </Button>
            <Button as="a" href="#badly" variant="scribedInv" size="lg">
              Read what it does badly
            </Button>
          </motion.div>

          <motion.dl
            variants={slideUp}
            className="mt-12 grid grid-cols-2 border-t border-rule-inv sm:grid-cols-3 lg:grid-cols-5"
          >
            {CERT.map((row) => (
              <div
                key={row.k}
                className="border-r border-b border-rule-inv px-3.5 py-3 last:border-r-0"
              >
                <dt className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink-inv-3">
                  {row.k}
                </dt>
                <dd className="mt-1 font-mono text-[0.85rem] font-medium tabular-nums text-ink-inv">
                  {row.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>
    </section>
  )
}
