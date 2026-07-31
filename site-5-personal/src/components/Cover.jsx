import { motion, useReducedMotion } from 'motion/react'
import { IDENTITY, SHEETS } from '../data.js'

/* Титульный лист: слева выпускной блок, справа список листов, ниже схема. */

// Схема собрана из SVG-геометрии и HTML-подписей поверх неё, а не из <text>
// внутри SVG: тот масштабируется вместе с картинкой, и на 375px подписи
// 11.5px превращались бы в 5px.
const PHASES = [
  {
    key: 'html',
    label: 'HTML',
    sub: '4.1 KB',
    t: '0 ms',
    depth: 'h-[38%]',
    note: 'Server sends the whole document. Every sheet, every number, already in the markup.',
  },
  {
    key: 'paint',
    label: 'FIRST PAINT',
    sub: 'text readable',
    t: '190 ms',
    depth: 'h-[64%]',
    note: 'The page is legible here, before a line of my JavaScript has run.',
  },
  {
    key: 'hydrate',
    label: 'HYDRATE',
    sub: '11 KB JS',
    t: '410 ms',
    depth: 'h-[92%]',
    note: 'Sheet-index tracking and the reveals attach. Nothing depends on this to be readable.',
  },
]

function SectionDrawing() {
  const reduce = useReducedMotion()

  const grow = (i) =>
    reduce
      ? { initial: { opacity: 1 } }
      : {
          initial: { opacity: 0, scaleY: 0.55 },
          animate: { opacity: 1, scaleY: 1 },
          transition: { duration: 0.75, delay: 0.35 + i * 0.14, ease: [0.16, 1, 0.3, 1] },
        }

  return (
    <div>
      <div className="mb-2 flex items-center gap-3 text-red">
        <span aria-hidden="true" className="leader" />
        <span className="dim shrink-0 text-[0.78rem] font-bold tracking-[0.03em] text-red-ink sm:text-[0.82rem]">
          640 ms TOTAL BUDGET
        </span>
        <span aria-hidden="true" className="leader" />
      </div>

      <div className="flex h-[9.5rem] items-end gap-1.5 sm:h-[11rem] sm:gap-2.5">
        {PHASES.map((p, i) => (
          <motion.div
            key={p.key}
            {...grow(i)}
            style={{ transformOrigin: 'bottom' }}
            className={`relative flex-1 border border-print/70 bg-print/8 ${p.depth}`}
          >
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              {Array.from({ length: 9 }).map((_, k) => (
                <path
                  key={k}
                  d={`M${k * 13 - 10} 100 L${k * 13 + 14} 0`}
                  stroke="oklch(0.3 0.13 264 / 0.16)"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            <div className="relative flex h-full flex-col justify-between p-2 sm:p-3">
              <div>
                <p className="font-drawn text-[0.75rem] font-extrabold leading-tight tracking-[0.04em] text-ink sm:text-[0.8rem]">
                  {p.label}
                </p>
                <p className="dim mt-0.5 text-[0.75rem] leading-tight text-ink-mid sm:text-[0.78rem]">
                  {p.sub}
                </p>
              </div>
              <p className="dim self-end text-[0.78rem] font-bold text-print sm:text-[0.82rem]">
                {p.t}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <svg
        aria-hidden="true"
        className="h-3.5 w-full sm:h-4"
        preserveAspectRatio="none"
        viewBox="0 0 800 16"
      >
        <path
          d="M0 1 H800"
          stroke="oklch(0.3 0.13 264)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {Array.from({ length: 54 }).map((_, i) => (
          <path
            key={i}
            d={`M${8 + i * 15} 1 L${i * 15} 15`}
            stroke="oklch(0.3 0.13 264 / 0.4)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <p className="mt-4 flex max-w-[27rem] items-start gap-2 border-t border-red/40 pt-3 font-spec text-[0.9rem] leading-snug text-red-ink sm:text-[0.95rem]">
        <span aria-hidden="true" className="dim mt-px shrink-0 font-bold">
          &uarr;
        </span>
        Text before JS is non-negotiable. If the second stratum ever depends on
        the third, the sheet is wrong.
      </p>

      <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-3">
        {PHASES.map((p) => (
          <div key={p.key} className="border-t border-ink/20 pt-3">
            <dt className="dim text-[0.78rem] font-bold text-print">
              {p.t} &middot; {p.label}
            </dt>
            <dd className="mt-1 font-spec text-[0.9rem] leading-[1.5] text-ink-mid">
              {p.note}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function Cover() {
  const reduce = useReducedMotion()

  const stack = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.07,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      id="cover"
      aria-label="Cover sheet"
      className="stock-grid border-b border-ink/25"
    >
      <motion.div
        variants={stack}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-[100rem]"
      >
        <motion.div
          variants={item}
          className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-ink/20 px-4 py-2.5 sm:px-8"
        >
          <span className="sheet-no text-red-ink">SET 01 — PERSONAL</span>
          <span className="dim text-[0.75rem] text-ink-mid">
            ISSUED FOR REVIEW · {IDENTITY.location}
          </span>
          <span className="dim ml-auto text-[0.75rem] text-ink-mid">
            {IDENTITY.license}
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_22rem] xl:grid-cols-[1fr_25rem]">
          <div className="border-b border-ink/20 px-4 py-10 sm:px-8 sm:py-14 lg:border-b-0 lg:border-r lg:py-20">
            <motion.h1
              variants={item}
              className="font-drawn text-[clamp(2.5rem,8.5vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink"
            >
              Mara Solden
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-[38ch] font-drawn text-[clamp(1.15rem,2.6vw,1.6rem)] font-medium leading-[1.28] text-print"
            >
              {IDENTITY.cover}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 max-w-[34rem] border-l-0 border-t border-ink/25 pt-5"
            >
              <p className="font-spec text-[1.0625rem] leading-[1.62] text-ink sm:text-[1.125rem]">
                {IDENTITY.premise}
              </p>
              <p className="mt-4 font-spec text-[0.95rem] leading-[1.6] text-ink-mid">
                {IDENTITY.discipline_note}
              </p>
            </motion.div>
          </div>

          <motion.div variants={item} className="bg-panel/70">
            <div className="flex items-baseline justify-between gap-3 border-b border-ink/25 px-4 py-3 sm:px-6">
              <h2 className="font-drawn text-[0.9rem] font-bold uppercase tracking-[0.1em] text-ink">
                Sheet index
              </h2>
              <span className="dim text-[0.75rem] text-ink-mid">
                {SHEETS.length} sheets
              </span>
            </div>

            <ol className="divide-y divide-ink/15">
              {SHEETS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.slug}`}
                    className="group flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-print/10 sm:px-6"
                  >
                    <span className="sheet-no mt-0.5 w-[3.1rem] shrink-0 text-red-ink">
                      {s.id}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-drawn text-[0.95rem] font-semibold leading-tight text-ink">
                        {s.project}
                      </span>
                      <span className="mt-0.5 block font-spec text-[0.85rem] leading-snug text-ink-mid">
                        {s.title}
                      </span>
                    </span>
                    <span className="dim mt-0.5 shrink-0 text-[0.75rem] text-ink-mid">
                      {s.span.split(' — ')[0]}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#revisions"
                  className="group flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-red/10 sm:px-6"
                >
                  <span className="sheet-no mt-0.5 w-[3.1rem] shrink-0 text-red-ink">
                    R-01
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-drawn text-[0.95rem] font-semibold leading-tight text-ink">
                      Revision log
                    </span>
                    <span className="mt-0.5 block font-spec text-[0.85rem] leading-snug text-ink-mid">
                      Five opinions I changed, and what changed them
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#scope"
                  className="group flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-red/10 sm:px-6"
                >
                  <span className="sheet-no mt-0.5 w-[3.1rem] shrink-0 text-red-ink">
                    G-00
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-drawn text-[0.95rem] font-semibold leading-tight text-ink">
                      Scope exclusions
                    </span>
                    <span className="mt-0.5 block font-spec text-[0.85rem] leading-snug text-ink-mid">
                      What this set explicitly does not cover
                    </span>
                  </span>
                </a>
              </li>
            </ol>
          </motion.div>
        </div>

        <motion.figure
          variants={item}
          className="border-t border-ink/25 px-4 pb-10 pt-8 sm:px-8 sm:pb-14"
        >
          <figcaption className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="sheet-no text-red-ink">FIG 1</span>
            <span className="font-drawn text-[0.95rem] font-semibold text-ink">
              Section through this page&rsquo;s render path
            </span>
            <span className="font-spec text-[0.9rem] text-ink-mid">
              Drawn to the budget it actually ships at, not the one I&rsquo;d prefer.
            </span>
          </figcaption>
          <div className="mx-auto max-w-[62rem]">
            <SectionDrawing />
          </div>
        </motion.figure>
      </motion.div>
    </section>
  )
}
