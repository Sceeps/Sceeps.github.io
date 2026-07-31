import { motion } from 'motion/react'
import Container from './ui/Container.jsx'
import FieldHead from './ui/FieldHead.jsx'
import { slideUp, stagger, seen } from '../lib/motion'

// Поле 03: условия, при которых нож выходит из допуска. У каждого пункта
// конкретное последствие и альтернатива.
const REJECTS = [
  {
    n: 'R1',
    do: 'Bone, joints, frozen anything',
    why:
      'A 15.5° edge at 61 HRC will chip on chicken thigh bone and shatter-chip on anything frozen. This is not a defect claim we will honour — it is the documented limit of a thin hard edge.',
    instead: 'Use a 50°-edged cleaver or a boning knife. We do not make either.',
  },
  {
    n: 'R2',
    do: 'Dishwashers, ever, not once',
    why:
      'Detergent strips the patina and the heat cycle swells the walnut against the tang. One cycle can crack a handle scale, and a cracked scale is not covered.',
    instead: 'Rinse, dry with a towel, hang it up. Eight seconds.',
  },
  {
    n: 'R3',
    do: 'Twisting or prying',
    why:
      'The distal taper that makes this knife cut well leaves 0.71mm of steel near the tip. Lateral force snaps tips. We see two or three a year, always from opening packaging.',
    instead: 'Keep a cheap paring knife by the recycling. Genuinely.',
  },
  {
    n: 'R4',
    do: 'Glass, stone, ceramic or steel boards',
    why:
      'A hard board rolls the apex flat in one session. You will think the knife went dull in a week; the knife did not, the board did it.',
    instead: 'End-grain or edge-grain wood, or soft poly. Nothing harder.',
  },
]

const HONEST = [
  {
    k: 'It will rust',
    v:
      '52100 is carbon steel with no meaningful chromium. Leave it wet in a sink overnight and you will find orange spot rust by morning. Cut a lemon and walk away for an hour and you will find a grey stain that is now permanent. This is the trade we made for edge performance, and it is a real cost, not a charming quirk.',
  },
  {
    k: 'It is right-hand biased',
    v:
      'The 70/30 asymmetric grind steers slightly for a left-handed user. We grind 50/50 on request at no charge — say so at checkout. If you order the standard grind and you are left-handed, that is on us to have asked, so we will regrind it free.',
  },
  {
    k: 'The handle is not waterproof',
    v:
      'Cactus-resin stabilized walnut is water-resistant, not sealed plastic. After two or three years of daily use the octagonal facets go slightly matte where your fingers sit. Most owners like it. Some do not.',
  },
]

export default function FieldBadly() {
  return (
    <section id="badly" className="relative border-b border-rule-strong bg-sheet">
      <Container className="relative pt-20 pb-20 sm:pt-28 sm:pb-28">
        <FieldHead
          number="03"
          field="Reject criteria"
          title="What this knife is bad at."
          lede="Four things will damage it, and we would rather you read them here than discover them in your kitchen. A shop that only lists strengths is a shop that expects you not to use the thing."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={seen}
          variants={stagger(0.06)}
          className="mt-14 border-t border-rule-strong"
        >
          {REJECTS.map((r) => (
            <motion.article
              key={r.n}
              variants={slideUp}
              className="grid grid-cols-1 gap-x-6 gap-y-2 border-b border-rule py-6 sm:grid-cols-[3.25rem_1fr] lg:grid-cols-[3.25rem_17rem_1fr]"
            >
              <div className="flex items-start">
                <span
                  className="hatch-reject flex h-9 w-9 items-center justify-center border border-mark font-mono text-[0.7rem] font-medium text-mark"
                  aria-hidden="true"
                >
                  {r.n}
                </span>
              </div>

              <h3 className="text-[1.35rem] font-bold leading-[1.06] text-ink lg:text-[1.5rem]">
                <span className="sr-only">Reject criterion {r.n}: </span>
                {r.do}
              </h3>

              <div className="lg:pt-1">
                <p className="text-[0.98rem] leading-[1.62] text-ink-2">{r.why}</p>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-2 text-[0.92rem] leading-relaxed">
                  <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.13em] text-mark">
                    Instead
                  </span>
                  <span className="text-ink-2">{r.instead}</span>
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={seen}
          variants={stagger(0.07)}
          className="mt-16"
        >
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-3">
            Also true, and we are not going to bury it
          </p>
          <div className="mt-5 grid gap-0 border-t border-rule-strong md:grid-cols-3">
            {HONEST.map((h) => (
              <motion.div
                key={h.k}
                variants={slideUp}
                className="border-b border-rule px-0 py-6 md:border-r md:px-6 md:py-7 md:first:pl-0 md:last:border-r-0"
              >
                <h3 className="text-[1.2rem] font-bold leading-tight text-mark">{h.k}</h3>
                <p className="mt-3 text-[0.94rem] leading-[1.62] text-ink-2">{h.v}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
