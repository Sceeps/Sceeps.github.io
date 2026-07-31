import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const SERVICES = [
  {
    name: 'Identity',
    detail: 'Naming, logotype, systems, guidelines — built to survive contact with a junior designer.',
    sweep: 'bg-acid',
    text: 'text-ink',
    img: 'https://images.unsplash.com/photo-1422036306541-00138cae4dbc?auto=format&fit=crop&w=1600&q=80',
  },
  {
    name: 'Motion',
    detail: 'Title sequences, sting packages, launch films and the kind of type animation people screen-record.',
    sweep: 'bg-magenta',
    text: 'text-ink',
    img: 'https://images.unsplash.com/photo-1673446295665-4baf81bc1f98?auto=format&fit=crop&w=1600&q=80',
  },
  {
    name: 'Digital Product',
    detail: 'Interfaces, design systems and prototypes for teams shipping fast, not shipping safe.',
    sweep: 'bg-signal',
    text: 'text-ink',
    img: 'https://images.unsplash.com/photo-1617336799406-5a3d155a846f?auto=format&fit=crop&w=1600&q=80',
  },
  {
    name: 'Campaign & Launch',
    detail: 'Key art, toolkits and rollout systems built for one big week and a long tail after it.',
    sweep: 'bg-acid-deep',
    text: 'text-ink',
    img: 'https://images.unsplash.com/photo-1646206346896-14367dee001b?auto=format&fit=crop&w=1600&q=80',
  },
]


function ServiceRow({ service, index }) {
  const [hovered, setHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden border-b border-chalk/15"
    >
      <motion.div
        aria-hidden="true"
        className={`absolute inset-0 origin-left ${service.sweep}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
      />

      <div
        className={`relative flex flex-col gap-4 px-1 py-8 transition-colors duration-300 md:flex-row md:items-center md:justify-between md:gap-8 md:py-10 ${
          hovered ? service.text : 'text-chalk'
        }`}
      >
        <span className="font-display text-4xl font-bold uppercase leading-none md:text-6xl">
          {service.name}
        </span>
        <p
          className={`max-w-md font-body text-sm md:text-base ${
            hovered ? 'opacity-100' : 'opacity-90 md:opacity-70'
          }`}
        >
          {service.detail}
        </p>
        {/* Превью — обычный элемент потока, а не абсолютный оверлей: в
            абсолюте оно закрывало то подпись «Enquire», то текст описания.
            Сейчас оно всегда держит свою колонку и на ховере только
            меняет прозрачность и масштаб. */}
        <div
          aria-hidden="true"
          className="hidden h-24 w-20 shrink-0 md:block"
        >
          <div
            className={`h-full w-full overflow-hidden rounded-lg border-4 border-chalk shadow-xl transition-all duration-300 ${
              hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ transform: `rotate(${index % 2 === 0 ? -6 : 6}deg)` }}
          >
            <img src={service.img} alt="" className="h-full w-full object-cover" />
          </div>
        </div>

        <span className="hidden shrink-0 items-center gap-2 font-display text-xs font-bold uppercase tracking-wide md:flex">
          Enquire
          <ArrowUpRight
            size={18}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </span>
      </div>
    </li>
  )
}

export default function Services() {
  return (
    <section id="capabilities" className="bg-ink px-5 py-24 md:px-8 md:py-32">
      <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-xl font-display text-5xl font-bold uppercase leading-[0.95] text-chalk md:text-7xl">
          What we actually do
        </h2>
        <p className="max-w-sm font-body text-base text-chalk/70 md:text-lg">
          Four disciplines, one crew. No subcontracted "partners," no
          hand-offs — the people in the deck do the work.
        </p>
      </div>

      <ul>
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.name} service={service} index={i} />
        ))}
      </ul>
    </section>
  )
}
