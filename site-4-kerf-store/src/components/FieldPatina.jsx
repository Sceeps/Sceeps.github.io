import { useState } from 'react'
import { motion } from 'motion/react'
import Container from './ui/Container.jsx'
import FieldHead from './ui/FieldHead.jsx'
import { slideUp, stagger, seen } from '../lib/motion'

// Поле 04: четыре стадии патины. Табы над одним кадром; неактивные панели
// скрыты через hidden, а не прозрачностью, поэтому видимая рисуется сразу.
const STAGES = [
  {
    id: 'w1',
    when: 'Week 1',
    title: 'Straw and light blue',
    look:
      'Faint straw-gold blotching where you cut onions, a bluish cast along the flats. Uneven and slightly alarming.',
    what:
      'Iron reacting with acid and moisture to form a thin oxide film. This film is what stops deeper rust later.',
    doThis: 'Nothing. Do not scrub it back to bright.',
    photo:
      'https://images.unsplash.com/photo-1601924924989-38cb0c36cd98?auto=format&fit=crop&w=1600&q=82',
    alt: 'A carbon-steel blade on a steel bench in the first week of use, the flats showing patchy straw-gold and pale blue oxide where acidic produce has touched the steel.',
  },
  {
    id: 'm2',
    when: 'Month 2',
    title: 'Mottled grey',
    look:
      'The blotches have joined into a slate-grey field. The grind line and the kurouchi finish above it stay clearly separate.',
    what:
      'The oxide layer has evened out and thickened. The blade now resists spot rust noticeably better than it did in week one.',
    doThis: 'Nothing. This is the stage people photograph.',
    photo:
      'https://images.unsplash.com/photo-1590234275421-e19db506a4f9?auto=format&fit=crop&w=1600&q=82',
    alt: 'The same knife after two months of daily prep, the blade flats now an even mottled slate-grey patina against a warm wooden board.',
  },
  {
    id: 'y1',
    when: 'Year 1',
    title: 'Even gunmetal',
    look:
      'A settled dark grey-brown across the whole flat, darker at the heel where your hand shields it from drying.',
    what:
      'Stable magnetite. At this point the patina is doing real protective work; owners report spot rust essentially stops appearing.',
    doThis: 'Nothing. Still nothing.',
    photo:
      'https://images.unsplash.com/photo-1593618523725-c22aa27d353d?auto=format&fit=crop&w=1600&q=82',
    alt: 'A one-year-old carbon-steel kitchen knife on black ground, its blade an even settled gunmetal with a bright hand-honed edge bevel running the full length.',
  },
  {
    id: 'y5',
    when: 'Year 5+',
    title: 'Thinner, darker, still sharp',
    look:
      'Near-black flats. The blade is visibly narrower — five years of sharpening removes steel, and the profile has climbed maybe 1.5mm at the heel.',
    what:
      'The knife is now a slightly different knife. Most owners say it cuts better than it did new, because the edge has been thinned by repeated sharpening.',
    doThis: 'Send it to us. We regrind the profile straight, free, forever.',
    photo:
      'https://images.unsplash.com/photo-1574906328425-c7a4cb49bfa8?auto=format&fit=crop&w=1600&q=82',
    alt: 'A well-used carbon-steel chef knife after years of service, blade darkened almost black and visibly narrowed by sharpening, edge still bright where the stone has cut.',
  },
]

export default function FieldPatina() {
  const [i, setI] = useState(0)

  return (
    <section id="patina" className="relative border-b border-rule-inv bg-slate on-slate">
      <div className="substrate-inv absolute inset-0" aria-hidden="true" />

      <Container className="relative pt-20 pb-20 sm:pt-28 sm:pb-28">
        <FieldHead
          inverted
          number="04"
          field="Patina clock"
          title="It will not stay looking like the photograph."
          lede="Within a week your knife stops matching the one at the top of this page. That is not a fault and it is not reversible. Here is exactly what happens, on what schedule, with photographs of blades at each stage."
        />

        <div
          role="tablist"
          aria-label="Patina stages"
          className="mt-14 grid grid-cols-2 border border-rule-inv sm:grid-cols-4"
        >
          {STAGES.map((s, idx) => {
            const active = idx === i
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                id={`patina-tab-${s.id}`}
                aria-selected={active}
                aria-controls={`patina-panel-${s.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setI(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') {
                    e.preventDefault()
                    setI((p) => (p + 1) % STAGES.length)
                  } else if (e.key === 'ArrowLeft') {
                    e.preventDefault()
                    setI((p) => (p - 1 + STAGES.length) % STAGES.length)
                  }
                }}
                className={[
                  'relative flex min-h-[72px] flex-col items-start gap-1 border-r border-b border-rule-inv px-4 py-3.5 text-left transition-colors duration-150 last:border-r-0 sm:border-b-0',
                  active ? 'bg-mark-inv/18' : 'hover:bg-ink-inv/8',
                ].join(' ')}
              >
                <span
                  className={[
                    'font-mono text-[0.68rem] font-medium uppercase tracking-[0.13em]',
                    active ? 'text-mark-inv' : 'text-ink-inv-3',
                  ].join(' ')}
                >
                  {s.when}
                </span>
                <span
                  className={[
                    'text-[0.94rem] font-medium leading-tight',
                    active ? 'text-ink-inv' : 'text-ink-inv-2',
                  ].join(' ')}
                >
                  {s.title}
                </span>
              </button>
            )
          })}
        </div>

        {STAGES.map((s, idx) => (
          <div
            key={s.id}
            role="tabpanel"
            id={`patina-panel-${s.id}`}
            aria-labelledby={`patina-tab-${s.id}`}
            hidden={idx !== i}
            className="grid gap-0 border-x border-b border-rule-inv lg:grid-cols-[1.25fr_1fr]"
          >
            <div className="relative border-b border-rule-inv lg:border-b-0 lg:border-r">
              <img
                src={s.photo}
                alt={s.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <p className="absolute bottom-0 left-0 border-t border-r border-rule-inv bg-slate/95 px-3 py-1.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] text-ink-inv">
                {s.when} · owner-submitted
              </p>
            </div>

            <dl className="p-6 sm:p-7">
              {[
                ['Looks like', s.look],
                ['What is happening', s.what],
                ['What you should do', s.doThis],
              ].map(([k, v], rowIdx) => (
                <div key={k} className={rowIdx === 0 ? '' : 'mt-6'}>
                  <dt
                    className={[
                      'font-mono text-[0.66rem] font-medium uppercase tracking-[0.13em]',
                      rowIdx === 2 ? 'text-mark-inv' : 'text-ink-inv-3',
                    ].join(' ')}
                  >
                    {k}
                  </dt>
                  <dd
                    className={[
                      'mt-2 text-[0.96rem] leading-[1.62]',
                      rowIdx === 2 ? 'text-ink-inv' : 'text-ink-inv-2',
                    ].join(' ')}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={seen}
          variants={stagger(0.06)}
          className="mt-16 border border-rule-inv"
        >
          <p className="border-b border-rule-inv px-6 py-4 font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-mark-inv">
            Standing procedure · the entire maintenance requirement
          </p>
          <div className="grid gap-0 sm:grid-cols-3">
            {[
              ['After each use', 'Rinse in warm water. Dry immediately with a towel. Not the draining board.'],
              ['Every 3–4 weeks', 'Ten passes per side on a fine ceramic rod or a strop. Two minutes.'],
              ['Every 6–9 months', '1000 then 4000 grit, or post it to us and we do it free.'],
            ].map(([k, v]) => (
              <motion.div
                key={k}
                variants={slideUp}
                className="border-b border-r border-rule-inv px-6 py-5 last:border-r-0"
              >
                <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.13em] text-ink-inv-3">
                  {k}
                </p>
                <p className="mt-2 text-[0.96rem] leading-[1.6] text-ink-inv">{v}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
