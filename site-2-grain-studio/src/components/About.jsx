import { motion, useReducedMotion } from 'motion/react'

const STATS = [
  { value: '8', label: 'People on the crew' },
  { value: '40+', label: 'Brand launches shipped since 2019' },
  { value: '120+', label: 'Motion pieces directed & cut' },
  { value: '12', label: 'Boring rebrands we said no to' },
]

const ROLES = ['Designers', 'Animators', 'Directors', 'Writers', 'One very good dog']

export default function About() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="studio" className="relative overflow-hidden bg-magenta px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 font-display text-5xl font-bold uppercase leading-[0.92] md:col-span-7 md:text-8xl"
        >
          Eight people.
          <br />
          Zero chill.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.7, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 flex flex-col gap-5 md:col-span-5"
        >
          <p className="font-body text-lg leading-snug md:text-xl">
            We're a small studio in LA's Chinatown — designers, animators and one
            director who used to tour with a punk band. No account managers, no
            "synergy," no seventeen-person Slack channel to get a logo approved.
          </p>
          <p className="font-body text-base leading-snug text-ink/80 md:text-lg">
            We build reference walls, argue about kerning at 1am, and ship rough
            cuts before they're comfortable. If the work doesn't make someone stop
            scrolling, we don't send the invoice with a straight face.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40, rotate: shouldReduceMotion ? 0 : -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: shouldReduceMotion ? 0.3 : 0.7, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 grid grid-cols-2 gap-6 rounded-2xl bg-chalk p-7 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.45)] md:mt-24 md:max-w-3xl md:grid-cols-4 md:gap-8 md:p-10"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="font-display text-4xl font-bold text-magenta-deep md:text-5xl">
              {stat.value}
            </span>
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/70 md:text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      <div className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink/20 pt-8 font-display text-sm font-semibold uppercase tracking-wide text-ink/80 md:mt-20 md:text-base">
        {ROLES.map((role, i) => (
          <span key={role} className="flex items-center gap-3">
            {role}
            {i < ROLES.length - 1 && <span aria-hidden="true" className="text-ink/60">/</span>}
          </span>
        ))}
      </div>
    </section>
  )
}
