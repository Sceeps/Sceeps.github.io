import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    name: 'Pulsar Festival',
    type: 'Identity + Motion',
    desc: 'Full rebrand and live motion system for a three-day electronic festival — kinetic type built to survive a 40ft LED wall.',
    tags: ['Identity', 'Motion', 'Wayfinding'],
    year: '2025',
    img: 'https://images.unsplash.com/photo-1617336799406-5a3d155a846f?auto=format&fit=crop&w=1600&q=80',
    tint: 'bg-magenta',
    area: 'md:[grid-column:1/5] md:[grid-row:1/3]',
    h: 'min-h-[13rem] md:min-h-[10rem]',
  },
  {
    name: 'Nocturne Records',
    type: 'Brand Relaunch',
    desc: 'Sonic-led identity and campaign toolkit for a label relaunch, built around one recurring red signal.',
    tags: ['Identity', 'Campaign'],
    year: '2024',
    img: 'https://images.unsplash.com/photo-1614995008867-32eef7bff38c?auto=format&fit=crop&w=1600&q=80',
    tint: 'bg-acid-deep',
    area: 'md:[grid-column:5/7] md:[grid-row:1/5]',
    h: 'min-h-[12rem] md:min-h-[10rem]',
  },
  {
    name: 'Modem',
    type: 'Digital Product',
    desc: 'Peer-to-peer resale app — interaction design and a UI kit built for fast, one-handed listing.',
    tags: ['Product', 'UI/UX'],
    year: '2025',
    img: 'https://images.unsplash.com/photo-1673446295665-4baf81bc1f98?auto=format&fit=crop&w=1600&q=80',
    tint: 'bg-signal',
    area: 'md:[grid-column:1/3] md:[grid-row:3/5]',
    h: 'min-h-[11rem] md:min-h-[9rem]',
  },
  {
    name: 'Kolor Mag',
    type: 'Editorial System',
    desc: 'Print identity and grid system for a culture-and-fashion quarterly — built to be photocopied and still work.',
    tags: ['Identity', 'Print'],
    year: '2023',
    img: 'https://images.unsplash.com/photo-1422036306541-00138cae4dbc?auto=format&fit=crop&w=1600&q=80',
    tint: 'bg-magenta',
    area: 'md:[grid-column:3/5] md:[grid-row:3/5]',
    h: 'min-h-[11rem] md:min-h-[9rem]',
  },
  {
    name: 'Heartbreak Radio',
    type: 'Brand + Motion',
    desc: 'A late-night radio show turned media brand — on-air identity, sting package and a logo that only works in neon.',
    tags: ['Identity', 'Motion', 'Sound'],
    year: '2024',
    img: 'https://images.unsplash.com/photo-1646206346896-14367dee001b?auto=format&fit=crop&w=1600&q=80',
    tint: 'bg-acid-deep',
    // Две строки сетки: подпись с тремя тегами и двумя строками текста в
    // одну авто-строку 150px не влезает.
    area: 'md:[grid-column:1/7] md:[grid-row:5/7]',
    h: 'min-h-[12rem] md:min-h-[10rem]',
  },
]

function Card({ project, index }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: shouldReduceMotion ? 0.3 : 0.6, delay: shouldReduceMotion ? 0 : (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-ink-soft ${project.area}`}
    >
      {/* Фото и подпись — соседи в колонке, подпись не лежит поверх фото.
          В абсолюте она перекрывала снимок целиком, когда её содержимое
          становилось выше фотоблока. */}
      <div className={`relative w-full flex-1 overflow-hidden ${project.h}`}>
        <img
          src={project.img}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover grayscale-[15%] transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 mix-blend-color ${project.tint} opacity-70 transition-opacity duration-500 group-hover:opacity-15`}
        />

        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-chalk text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </span>
      </div>

      {/* Подпись лежит на сплошном фоне, а не на градиенте поверх фото:
          на светлых снимках текст пропадал. */}
      <div className="flex flex-col gap-2 bg-ink p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-2xl font-bold uppercase leading-none text-chalk md:text-3xl">
            {project.name}
          </h3>
          <span className="font-body text-xs font-semibold text-chalk/60">{project.year}</span>
        </div>
        <p className="max-w-md font-body text-sm text-chalk/80">{project.desc}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          <span className="rounded-full bg-chalk/10 px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-wide text-chalk/90">
            {project.type}
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-chalk/25 px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-wide text-chalk/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  return (
    <section id="work" className="bg-chalk px-5 py-24 md:px-8 md:py-32">
      <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-2xl font-display text-5xl font-bold uppercase leading-[0.95] text-ink md:text-7xl">
          Selected work,
          <br />
          not everything.
        </h2>
        <p className="max-w-sm font-body text-base text-ink/70 md:text-lg">
          Five projects we're still proud of a year later. The rest is under NDA,
          in a drawer, or both.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[150px]">
        {PROJECTS.map((project, i) => (
          <Card key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
