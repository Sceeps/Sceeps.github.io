import { useId, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Container from './ui/Container.jsx'
import FieldHead from './ui/FieldHead.jsx'
import { slideUp, stagger, seen } from '../lib/motion'

// Шкала твёрдости с дискретными положениями, а не ползунком: сталь бывает
// именно такой твёрдости, промежуточные значения никто не калит. Реализовано
// как radiogroup с roving tabindex и стрелками.
const STOPS = [
  {
    hrc: 56,
    name: 'Soft stainless',
    example: 'Supermarket 5Cr15MoV, most block sets',
    retention: 'Days',
    retentionPct: 12,
    chip: 'Almost never',
    chipPct: 8,
    sharpen: 'Two minutes on anything',
    sharpenPct: 95,
    verdict:
      'Rolls its edge instead of chipping. Forgiving, and dull by Wednesday. You sharpen constantly and never think about it.',
  },
  {
    hrc: 58,
    name: 'Mid stainless',
    example: 'VG-10, 14C28N, most €90 gyutos',
    retention: '2–3 weeks',
    retentionPct: 34,
    chip: 'Rare',
    chipPct: 18,
    sharpen: 'Easy on a 1000-grit',
    sharpenPct: 78,
    verdict:
      'The default compromise, and a genuinely sensible one. Nothing about it is exciting, including the edge.',
  },
  {
    hrc: 61,
    name: 'Kerf standard',
    example: 'Our 52100 — 61 HRC, tolerance ±0.5',
    retention: '6–10 weeks',
    retentionPct: 68,
    chip: 'Only on bone or frozen',
    chipPct: 38,
    sharpen: 'Needs a real stone, 15 min',
    sharpenPct: 52,
    verdict:
      'Hard enough to hold a genuinely thin edge through a month of daily prep. Soft enough that when you do hit a chicken bone you get a rolled edge you can strop out, not a crescent missing from the blade. This is the point we chose, and we chose it because the failure mode is repairable.',
    ours: true,
  },
  {
    hrc: 63,
    name: 'Hard carbon',
    example: 'Blue #2, White #1 at high temper',
    retention: '3–4 months',
    retentionPct: 86,
    chip: 'Yes, on lateral twist',
    chipPct: 68,
    sharpen: 'Diamond or good naturals only',
    sharpenPct: 30,
    verdict:
      'Superb while it lasts. Twist it in a butternut squash and you will take a chip out, and that chip is a grinding job, not a stropping job.',
  },
  {
    hrc: 65,
    name: 'Powder steel',
    example: 'ZDP-189, SG2 at the top of its range',
    retention: '6+ months',
    retentionPct: 97,
    chip: 'Brittle. Treat as glass.',
    chipPct: 92,
    sharpen: 'Diamond plates, patience, skill',
    sharpenPct: 12,
    verdict:
      'Holds an edge longer than most people own the knife. Also the steel that arrives back at our bench with the tip snapped off, because someone used it to open a clamshell package.',
  },
]

const OURS = STOPS.findIndex((s) => s.ours)

function Bar({ label, pct, value, danger = false }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.13em] text-ink-inv-3">
          {label}
        </span>
        <span className="font-mono text-[0.82rem] font-medium tabular-nums text-ink-inv">
          {value}
        </span>
      </div>
      <div className="mt-2 h-2 w-full border border-rule-inv" aria-hidden="true">
        <motion.div
          className={danger ? 'h-full hatch-reject bg-mark-inv/25' : 'h-full bg-mark-inv'}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

export default function FieldHardness() {
  const [i, setI] = useState(OURS)
  const s = STOPS[i]
  const groupId = useId()
  const refs = useRef([])

  const move = (next) => {
    const clamped = (next + STOPS.length) % STOPS.length
    setI(clamped)
    refs.current[clamped]?.focus()
  }

  const onKeyDown = (e) => {
    const k = e.key
    if (k === 'ArrowRight' || k === 'ArrowDown') {
      e.preventDefault()
      move(i + 1)
    } else if (k === 'ArrowLeft' || k === 'ArrowUp') {
      e.preventDefault()
      move(i - 1)
    } else if (k === 'Home') {
      e.preventDefault()
      move(0)
    } else if (k === 'End') {
      e.preventDefault()
      move(STOPS.length - 1)
    }
  }

  return (
    <section id="hardness" className="relative border-b border-rule-inv bg-slate on-slate">
      <div className="substrate-inv absolute inset-0" aria-hidden="true" />

      <Container className="relative pt-20 pb-20 sm:pt-28 sm:pb-28">
        <FieldHead
          inverted
          number="02"
          field="Hardness & the trade-off"
          title="61 HRC is a choice, not a boast."
          lede="Harder steel holds an edge longer and chips instead of bending. Softer steel bends instead of chipping and goes dull sooner. There is no setting that wins both. Drag along the scale and read what you would actually be buying at each hardness."
        />

        <div className="mt-14">
          <div className="flex items-baseline justify-between gap-4">
            <p
              id={`${groupId}-label`}
              className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-inv-2"
            >
              Rockwell C hardness
            </p>
            <p className="font-mono text-[0.68rem] text-ink-inv-3">
              Arrow keys to compare
            </p>
          </div>

          <div
            role="radiogroup"
            aria-labelledby={`${groupId}-label`}
            onKeyDown={onKeyDown}
            className="mt-4 grid grid-cols-5 border border-rule-inv"
          >
            {STOPS.map((stop, idx) => {
              const active = idx === i
              return (
                <button
                  key={stop.hrc}
                  ref={(el) => {
                    refs.current[idx] = el
                  }}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setI(idx)}
                  className={[
                    'relative flex min-h-[76px] flex-col items-center justify-center gap-1 border-r border-rule-inv px-1 py-3 last:border-r-0 transition-colors duration-150',
                    active ? 'bg-mark-inv/18' : 'bg-transparent hover:bg-ink-inv/8',
                  ].join(' ')}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute top-0 h-2.5 w-px',
                      active ? 'bg-mark-inv' : 'bg-rule-inv',
                    ].join(' ')}
                  />
                  <span
                    className={[
                      'font-mono text-[1.15rem] font-medium tabular-nums leading-none sm:text-[1.4rem]',
                      active ? 'text-mark-inv' : 'text-ink-inv-2',
                    ].join(' ')}
                  >
                    {stop.hrc}
                  </span>
                  <span
                    className={[
                      'text-center font-mono text-[0.56rem] font-medium uppercase leading-tight tracking-[0.07em] sm:text-[0.62rem]',
                      active ? 'text-ink-inv' : 'text-ink-inv-3',
                    ].join(' ')}
                  >
                    {stop.name}
                  </span>
                  {stop.ours && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 h-[3px] w-full bg-mark-inv"
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div
            aria-live="polite"
            className="mt-0 grid gap-0 border-x border-b border-rule-inv lg:grid-cols-[1fr_1.15fr]"
          >
            <div className="border-b border-rule-inv p-6 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink-inv-3">
                {s.ours ? 'What we build' : 'Typical of'}
              </p>
              <p className="mt-2 text-[1.05rem] leading-snug text-ink-inv">{s.example}</p>
              <p className="mt-5 text-[0.96rem] leading-[1.6] text-ink-inv-2">{s.verdict}</p>
              {s.ours && (
                <p className="mt-5 inline-flex border border-mark-inv px-2.5 py-1.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] text-mark-inv">
                  Kerf ships here
                </p>
              )}
            </div>

            <div className="flex flex-col justify-center gap-5 p-6">
              <Bar label="Edge holds for" pct={s.retentionPct} value={s.retention} />
              <Bar label="Chip risk" pct={s.chipPct} value={s.chip} danger />
              <Bar label="Ease of resharpening" pct={s.sharpenPct} value={s.sharpen} />
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={seen}
          variants={stagger(0.06)}
          className="mt-16 grid gap-0 border-t border-rule-inv sm:grid-cols-3"
        >
          {[
            {
              k: 'Normalize ×3',
              v: '1,550°F, air-cooled between cycles',
              n: 'Refines grain before any bevel is cut. Skipping this is how a blade ends up hard and coarse at the same time.',
            },
            {
              k: 'Quench',
              v: '1,475°F into 130°F fast oil',
              n: 'Parks 50 fluid. Under nine seconds to black. Warped blades are straightened at this stage or scrapped.',
            },
            {
              k: 'Temper ×2',
              v: '2 hours at 350°F, twice',
              n: 'Pulls it from 64 HRC as-quenched down to 61. The second cycle is what stops the edge being brittle.',
            },
          ].map((step) => (
            <motion.div
              key={step.k}
              variants={slideUp}
              className="border-b border-r border-rule-inv p-6 last:border-r-0"
            >
              <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-mark-inv">
                {step.k}
              </p>
              <p className="mt-2.5 font-mono text-[0.95rem] font-medium tabular-nums text-ink-inv">
                {step.v}
              </p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-inv-2">{step.n}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
