import { motion } from 'motion/react'
import Container from './ui/Container.jsx'
import FieldHead from './ui/FieldHead.jsx'
import { slideUp, stagger, seen } from '../lib/motion'

// Поле 06: журнал обслуживания вместо отзывов. У каждой записи серийный номер,
// срок, что сообщил владелец и что сделали в мастерской.
const LOG = [
  {
    serial: 'K-0188',
    elapsed: 'Month 4',
    owner: 'Home cook, ~5 hrs/week',
    reported: 'Edge stopped biting tomato skin. No visible damage.',
    bench:
      'Normal wear, apex rounded to about 12µm. Two minutes on a 4000-grit and a strop. Returned in 6 days.',
    outcome: 'routine',
  },
  {
    serial: 'K-0092',
    elapsed: 'Month 9',
    owner: 'Line cook, daily service',
    reported: '2mm chip near the heel. Admitted to a chicken bone.',
    bench:
      'Ground the chip out over 20 minutes, which took the blade height from 48.0 to 47.4mm. Reprofiled the whole edge to keep the line straight. No charge, but the knife is permanently 0.6mm shorter.',
    outcome: 'damage',
  },
  {
    serial: 'K-0041',
    elapsed: 'Month 14',
    owner: 'Supper-club host, weekly',
    reported: 'Handle felt slightly loose in the hand.',
    bench:
      'Walnut had moved with a dry winter. Re-pinned and re-epoxied the tang, refinished the octagon. This is the failure we see most often on wood-handled knives and it is always repairable.',
    outcome: 'repair',
  },
  {
    serial: 'K-0007',
    elapsed: 'Year 3',
    owner: 'Recipe developer, daily',
    reported: 'Nothing wrong. Sent it in for the annual free sharpen.',
    bench:
      'Blade height down to 46.1mm from 48.0 — about 1.9mm of steel gone in three years of hard use. Patina fully black. Regrind, new saya. Owner declined a replacement.',
    outcome: 'routine',
  },
  {
    serial: 'K-0015',
    elapsed: 'Year 4',
    owner: 'Home cook, daily',
    reported: 'Tip snapped, roughly 8mm. Opening a cardboard box.',
    bench:
      'Reground a new tip and shortened the blade to 203mm. Told them plainly it was misuse, not a defect. Charged nothing because we would rather they kept using it. See Field 03, R3.',
    outcome: 'damage',
  },
]

const STATS = [
  { k: 'Knives shipped since 2021', v: '1,204' },
  { k: 'Returned for free sharpening', v: '431' },
  { k: 'Chips or breaks, all causes', v: '17' },
  { k: 'Returned within 60 days for refund', v: '9' },
  { k: 'Median months between sharpenings', v: '7.5' },
]

const OUTCOME = {
  routine: { label: 'Routine', cls: 'border-rule-strong text-ink-2' },
  repair: { label: 'Repair', cls: 'border-ink text-ink' },
  damage: { label: 'Damage', cls: 'border-mark text-mark hatch-reject' },
}

export default function FieldServiceLog() {
  return (
    <section id="log" className="relative border-b border-rule-strong bg-sheet">
      <Container className="relative pt-20 pb-20 sm:pt-28 sm:pb-28">
        <FieldHead
          number="06"
          field="Service log"
          title="Five real knives, and what went wrong with them."
          lede="We sharpen every knife we sell, for free, forever — which means we get them back and we know what happens to them. This is the log, including the two that came back broken. There are no star ratings on this page because a star rating would tell you nothing about year four."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={seen}
          variants={stagger(0.06)}
          className="mt-14 border-t border-ink"
        >
          {LOG.map((e) => {
            const o = OUTCOME[e.outcome]
            return (
              <motion.article
                key={e.serial}
                variants={slideUp}
                className="grid grid-cols-1 gap-x-6 gap-y-3 border-b border-rule py-6 lg:grid-cols-[8.5rem_1fr_1.25fr]"
              >
                <div>
                  <p className="font-mono text-[0.95rem] font-medium tabular-nums text-ink">
                    {e.serial}
                  </p>
                  <p className="mt-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-mark">
                    {e.elapsed}
                  </p>
                  <p className="mt-2 text-[0.82rem] leading-snug text-ink-3">{e.owner}</p>
                  <span
                    className={[
                      'mt-3 inline-flex border px-2 py-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em]',
                      o.cls,
                    ].join(' ')}
                  >
                    {o.label}
                  </span>
                </div>

                <div>
                  <p className="font-mono text-[0.64rem] font-medium uppercase tracking-[0.13em] text-ink-3">
                    Owner reported
                  </p>
                  <p className="mt-1.5 text-[0.98rem] leading-[1.6] text-ink">{e.reported}</p>
                </div>

                <div>
                  <p className="font-mono text-[0.64rem] font-medium uppercase tracking-[0.13em] text-ink-3">
                    Bench action
                  </p>
                  <p className="mt-1.5 text-[0.96rem] leading-[1.6] text-ink-2">{e.bench}</p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={seen}
          variants={stagger(0.05)}
          className="mt-14 grid grid-cols-2 border-t border-ink sm:grid-cols-3 lg:grid-cols-5"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.k}
              variants={slideUp}
              className="border-b border-r border-rule px-4 py-4 last:border-r-0"
            >
              <dt className="font-mono text-[0.63rem] font-medium uppercase leading-tight tracking-[0.12em] text-ink-3">
                {s.k}
              </dt>
              <dd className="mt-2 font-mono text-[1.35rem] font-medium tabular-nums leading-none text-ink">
                {s.v}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <p className="mt-5 max-w-[74ch] font-mono text-[0.74rem] leading-relaxed text-ink-3">
          Figures cover 2021-03 to 2026-07 and count every knife under our own
          serial. 17 of 1,204 is 1.4%; twelve of those seventeen were bone, frozen
          food, or prying. Serial numbers are shortened in this log at the owners&apos;
          request.
        </p>
      </Container>
    </section>
  )
}
