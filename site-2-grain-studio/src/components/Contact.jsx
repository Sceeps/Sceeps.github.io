import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'

const PROJECT_TYPES = ['Brand identity', 'Motion design', 'Digital product', 'Not sure yet']

export default function Contact() {
  const shouldReduceMotion = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', type: PROJECT_TYPES[0], message: '' })

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-acid px-5 py-24 text-ink md:px-8 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: shouldReduceMotion ? 0.3 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl font-display text-5xl font-bold uppercase leading-[0.92] md:text-7xl"
      >
        Got a brand worth yelling about?
      </motion.h2>

      <motion.a
        href="mailto:hello@grainstudio.co"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: shouldReduceMotion ? 0.3 : 0.7, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="group mt-8 inline-flex items-center gap-3 font-display text-3xl font-bold break-all text-ink underline decoration-ink/30 decoration-2 underline-offset-8 transition-colors hover:text-magenta-deep hover:decoration-magenta-deep sm:text-5xl md:text-6xl"
      >
        hello@grainstudio.co
        <ArrowUpRight
          size={38}
          strokeWidth={2.5}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </motion.a>

      <p className="mt-5 max-w-md font-body text-base text-ink/80 md:text-lg">
        Tell us what you're building, when it ships, and roughly what you've got
        to spend. We reply within two business days — always a human, never a form letter.
      </p>

      <div className="mt-14 max-w-xl">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.5 }}
            className="flex items-center gap-4 rounded-2xl bg-ink px-6 py-8 text-chalk"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-acid text-ink">
              <Check size={20} strokeWidth={3} />
            </span>
            <div>
              <p className="font-display text-lg font-bold uppercase">Got it. We'll be in touch.</p>
              <p className="mt-1 font-body text-sm text-chalk/70">
                Usually within two business days — sooner if it's exciting.
              </p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/70">
                  Name
                </span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  className="rounded-lg border-2 border-ink/20 bg-chalk/90 px-4 py-3 font-body text-ink placeholder:text-ink/60 focus:border-ink focus:outline-none"
                  placeholder="Jane Founder"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/70">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  className="rounded-lg border-2 border-ink/20 bg-chalk/90 px-4 py-3 font-body text-ink placeholder:text-ink/60 focus:border-ink focus:outline-none"
                  placeholder="jane@brand.com"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/70">
                Project type
              </span>
              <select
                value={form.type}
                onChange={handleChange('type')}
                className="rounded-lg border-2 border-ink/20 bg-chalk/90 px-4 py-3 font-body text-ink focus:border-ink focus:outline-none"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/70">
                What are we making?
              </span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={handleChange('message')}
                className="resize-none rounded-lg border-2 border-ink/20 bg-chalk/90 px-4 py-3 font-body text-ink placeholder:text-ink/60 focus:border-ink focus:outline-none"
                placeholder="Launch, relaunch, campaign, product — give us the shape of it."
              />
            </label>

            <button
              type="submit"
              className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-7 py-4 font-display text-sm font-bold uppercase tracking-wide text-chalk transition-colors hover:bg-magenta-deep"
            >
              Send it over
              <ArrowUpRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
