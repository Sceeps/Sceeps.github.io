import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const HEADLINE_SIZE =
  'text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.88] tracking-tight'

function MisregisterLine({ text, delay = 0, base = 'text-chalk', ghosts = ['text-magenta', 'text-acid'] }) {
  const shouldReduceMotion = useReducedMotion()
  const dur = shouldReduceMotion ? 0.4 : 0.9
  const d = shouldReduceMotion ? 0 : delay

  return (
    <span className={`relative inline-block overflow-hidden py-[0.04em] ${HEADLINE_SIZE} font-display font-black uppercase`}>
      <motion.span
        aria-hidden="true"
        className={`absolute inset-0 translate-x-[0.05em] translate-y-[0.035em] ${ghosts[0]}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: dur, delay: d + (shouldReduceMotion ? 0 : 0.32) }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className={`absolute inset-0 -translate-x-[0.045em] -translate-y-[0.03em] ${ghosts[1]}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: dur, delay: d + (shouldReduceMotion ? 0 : 0.4) }}
      >
        {text}
      </motion.span>
      <motion.span
        className={`relative block ${base}`}
        initial={{ y: shouldReduceMotion ? 0 : '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: dur, delay: d, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  )
}

function RotatingBadge({ href = '#contact' }) {
  const shouldReduceMotion = useReducedMotion()
  const text = 'GRAIN STUDIO • OPEN FOR WORK • '
  const chars = text.split('')
  const step = 360 / chars.length

  const handleClick = (e) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label="Open for work — jump to contact"
      className="group relative flex h-[124px] w-[124px] shrink-0 items-center justify-center rounded-full bg-acid shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] md:h-[152px] md:w-[152px]"
    >
      <div
        className={shouldReduceMotion ? 'absolute inset-0' : 'absolute inset-0 animate-[spin-slow_15s_linear_infinite]'}
        aria-hidden="true"
      >
        {chars.map((ch, i) => (
          <span
            key={i}
            className="absolute inset-0 flex items-start justify-center"
            style={{ transform: `rotate(${i * step}deg)` }}
          >
            <span className="mt-[5px] font-display text-[9px] font-bold uppercase text-ink md:mt-[7px] md:text-[10px]">
              {ch === ' ' ? ' ' : ch}
            </span>
          </span>
        ))}
      </div>
      <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-magenta text-ink transition-transform duration-300 ease-out group-hover:scale-110 md:h-16 md:w-16">
        <ArrowUpRight size={24} strokeWidth={2.5} />
      </span>
    </a>
  )
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.4 : 0.7, delay: shouldReduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-24 pb-10 md:pt-28"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-2 top-1/2 hidden -translate-y-1/2 -rotate-90 font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-chalk/50 md:block"
      >
        Scroll — Vol. 01
      </span>

      <div className="flex flex-1 flex-col justify-center px-5 md:px-8">
        <motion.div {...fadeUp(0)} className="mb-6 self-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-magenta px-4 py-2 font-display text-xs font-bold uppercase tracking-wide text-ink md:text-sm">
            Brand — Motion — Product
          </span>
        </motion.div>

        <h1 className="flex flex-col gap-0 text-left">
          <MisregisterLine text="QUIET" delay={0.05} />
          <MisregisterLine text="BRANDS" delay={0.18} />
          <span className="flex flex-wrap items-baseline gap-x-6">
            <MisregisterLine text="GET" delay={0.31} />
            <MisregisterLine
              text="SKIPPED."
              delay={0.42}
              base="text-magenta"
              ghosts={['text-acid', 'text-chalk']}
            />
          </span>
        </h1>

        {/* pr держит место под абсолютный бейдж справа снизу (152px + 40px
            отступа), иначе кнопки уезжают под него. */}
        <div className="mt-10 flex flex-col items-start gap-8 md:mt-14 md:flex-row md:items-end md:justify-between md:pr-[13rem]">
          <motion.p
            {...fadeUp(0.58)}
            className="max-w-md font-body text-base text-chalk/80 md:text-lg"
          >
            Grain is an eight-person brand, motion and product studio in Los Angeles.
            We build identity systems, motion and digital product for consumer and
            culture brands who'd rather get remembered than get liked.
          </motion.p>

          {/* Ниже md бейдж 124px + 24px отступа стоит там же, поэтому нужен
              запас снизу. */}
          <motion.div {...fadeUp(0.68)} className="mb-[8.5rem] flex flex-wrap items-center gap-5 md:mb-0 md:gap-7">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-ink transition-colors duration-200 hover:bg-magenta"
            >
              Start a project
              <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#work')?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })
              }}
              className="font-display text-sm font-bold uppercase tracking-wide text-chalk underline decoration-chalk/40 decoration-2 underline-offset-4 transition-colors hover:text-acid hover:decoration-acid"
            >
              See the work
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0.4 : 0.8, delay: shouldReduceMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-6 right-5 md:bottom-10 md:right-10"
      >
        <RotatingBadge />
      </motion.div>
    </section>
  )
}
