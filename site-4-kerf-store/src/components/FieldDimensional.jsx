import { motion } from 'motion/react'
import Container from './ui/Container.jsx'
import FieldHead from './ui/FieldHead.jsx'
import { slideUp, stagger, seen } from '../lib/motion'

const PHOTO = {
  src: 'https://images.unsplash.com/photo-1611605377578-594f5bcf3e97?auto=format&fit=crop&w=1800&q=82',
  alt: 'The No. 1 Gyuto photographed square-on against dark ground, spine uppermost, so the distal taper from heel to tip is visible as a continuous wedge.',
}

// Выноски размеров: x/y — проценты от кадра. От lg они лежат поверх фото, ниже
// оверлей скрыт и те же данные показывает список под снимком.
const CALLOUTS = [
  { id: 'A', label: 'Spine at heel', value: '2.10', unit: 'mm', x: 15, y: 20, lx: 15, ly: 46 },
  { id: 'B', label: 'Spine at midpoint', value: '1.64', unit: 'mm', x: 43, y: 13, lx: 43, ly: 44 },
  { id: 'C', label: 'Spine 10mm from tip', value: '0.71', unit: 'mm', x: 76, y: 20, lx: 79, ly: 47 },
  { id: 'D', label: 'Edge angle per side', value: '15.5', unit: '°', x: 60, y: 78, lx: 55, ly: 56 },
  { id: 'E', label: 'Balance point, fwd of bolster', value: '11', unit: 'mm', x: 15, y: 76, lx: 22, ly: 58 },
]

const RECORD = [
  { k: 'Steel', v: '52100', n: 'Ball-bearing steel. 1.0% carbon, 1.5% chromium.' },
  { k: 'Tested hardness', v: '61 HRC', n: 'Rockwell C, three indents, averaged. Tolerance ±0.5.' },
  { k: 'Blade length', v: '211 mm', n: 'Heel to tip. Nominal 210.' },
  { k: 'Blade height at heel', v: '48 mm', n: 'Knuckle clearance on a 20mm board.' },
  { k: 'Finished weight', v: '187 g', n: 'Assembled, dry, no saya.' },
  { k: 'Handle', v: 'Stabilized walnut', n: 'Octagonal, 108mm, cactus-resin stabilized.' },
  { k: 'Grind', v: 'Convex, 70/30', n: 'Asymmetric. Right-hand bias as standard.' },
  { k: 'Finish', v: 'Kurouchi + hand-rubbed', n: 'Forge scale kept above the shinogi.' },
]

export default function FieldDimensional() {
  return (
    <section id="dimensional" className="relative border-b border-rule-strong bg-plate">
      <div className="substrate absolute inset-0" aria-hidden="true" />

      <Container className="relative pt-20 pb-20 sm:pt-28 sm:pb-28">
        <FieldHead
          number="01"
          field="Dimensional"
          title="A knife is a wedge. Ours gets thinner faster."
          lede="Distal taper is the whole argument. A blade that stays thick to the tip pushes food apart instead of parting it. We grind 2.10mm at the heel down to 0.71mm ten millimetres from the tip — measured with a ball-anvil micrometer, because a flat anvil reads high on a convex grind."
        />

        <motion.figure
          initial="hidden"
          whileInView="visible"
          viewport={seen}
          variants={stagger(0.08, 0.15)}
          className="mt-14 border border-rule-strong bg-slate on-slate"
        >
          <div className="relative">
            <img
              src={PHOTO.src}
              alt={PHOTO.alt}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
            />
            {/* Затемнение считалось по самому светлому пикселю снимка: на 0.70
                волосяные выноски на блике уже теряются. */}
            <div className="absolute inset-0 bg-slate/84" aria-hidden="true" />

            {/* aria-hidden: те же данные читаются из списка ниже. */}
            <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
              <svg
                className="leader absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
              >
                {CALLOUTS.map((c) => (
                  <line
                    key={c.id}
                    x1={c.x}
                    y1={c.y}
                    x2={c.lx}
                    y2={c.ly}
                    stroke="var(--color-mark-inv)"
                    strokeWidth="0.22"
                    vectorEffect="non-scaling-stroke"
                    style={{ '--len': 120 }}
                  />
                ))}
              </svg>

              {CALLOUTS.map((c) => (
                <div
                  key={c.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  <div className="flex items-center gap-2 border border-mark-inv bg-slate/95 px-2.5 py-1.5">
                    <span className="font-mono text-[0.62rem] font-medium text-mark-inv">
                      {c.id}
                    </span>
                    <span className="font-mono text-[0.92rem] font-medium tabular-nums leading-none text-ink-inv">
                      {c.value}
                      <span className="text-ink-inv-2">{c.unit}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* На мобильных это и есть список размеров: оверлей скрыт, ничего не
              перекрывается. */}
          <motion.dl
            variants={slideUp}
            className="grid grid-cols-1 border-t border-rule-inv sm:grid-cols-2 lg:grid-cols-5"
          >
            {CALLOUTS.map((c) => (
              <div key={c.id} className="border-b border-r border-rule-inv px-4 py-3.5">
                <dt className="flex items-baseline gap-2">
                  <span className="font-mono text-[0.62rem] font-medium text-mark-inv">{c.id}</span>
                  <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.1em] text-ink-inv-3">
                    {c.label}
                  </span>
                </dt>
                <dd className="mt-1.5 font-mono text-[1.15rem] font-medium tabular-nums text-ink-inv">
                  {c.value}
                  <span className="ml-0.5 text-[0.8rem] text-ink-inv-2">{c.unit}</span>
                </dd>
              </div>
            ))}
          </motion.dl>

          <figcaption className="border-t border-rule-inv px-4 py-3 font-mono text-[0.68rem] leading-relaxed text-ink-inv-2">
            Serial K-0412. Measured 2026-07-14 on a grade-A granite plate at 20°C.
            Micrometer: Mitutoyo 293-340, ball anvil, zeroed before each blade.
          </figcaption>
        </motion.figure>

        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={seen}
          variants={stagger(0.04)}
          className="mt-14 border-t border-rule-strong"
        >
          {RECORD.map((r) => (
            <motion.div
              key={r.k}
              variants={slideUp}
              className="grid grid-cols-1 gap-1 border-b border-rule py-4 sm:grid-cols-[13rem_9rem_1fr] sm:items-baseline sm:gap-6"
            >
              <dt className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-3">
                {r.k}
              </dt>
              <dd className="font-mono text-[1.02rem] font-medium tabular-nums text-ink">{r.v}</dd>
              <dd className="text-[0.92rem] leading-relaxed text-ink-2">{r.n}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </Container>
    </section>
  )
}
