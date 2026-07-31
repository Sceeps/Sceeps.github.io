import { motion } from 'motion/react'
import Container from './ui/Container.jsx'
import FieldHead from './ui/FieldHead.jsx'
import { slideUp, stagger, seen } from '../lib/motion'

// Поле 05: сравнение по характеристикам. Рекомендуемая модель занимает широкую
// строку с фото, остальные — обычные строки той же таблицы.
const LEAD = {
  name: 'No. 1 Gyuto',
  len: '210mm',
  price: '$340',
  hrc: '61',
  weight: '187g',
  spine: '2.10mm',
  goodAt: 'Everything except the four things in Field 03. If you buy one knife, this is the one.',
  badAt: 'Too long for small hands on a small board. Try the 180 if your board is under 30cm.',
  photo:
    'https://images.unsplash.com/photo-1666013942797-9daa4b8b3b4f?auto=format&fit=crop&w=1600&q=82',
  alt: 'The Kerf No. 1 Gyuto resting across a scrubbed wooden board beside a second blade, its octagonal walnut handle and dark kurouchi flats reading against pale wood.',
  stock: 'In stock · 9 of this batch remaining',
}

const REST = [
  {
    name: 'No. 2 Petty',
    len: '135mm',
    price: '$185',
    hrc: '61',
    weight: '84g',
    spine: '1.70mm',
    goodAt: 'Shallots, garlic, trimming fat, anything done in your hand off the board.',
    badAt: 'A cabbage. It is too short and you will hate it. Not a small chef knife.',
    photo:
      'https://images.unsplash.com/photo-1613865994285-83b12407bf3e?auto=format&fit=crop&w=900&q=80',
    alt: 'A short petty knife held in one hand mid-cut, the compact blade angled into the light.',
    stock: 'In stock',
  },
  {
    name: 'No. 3 Santoku',
    len: '175mm',
    price: '$295',
    hrc: '61',
    weight: '162g',
    spine: '1.95mm',
    goodAt: 'Flat push-cutting. Straighter profile than the gyuto, so less rock, more board contact.',
    badAt: 'Rock-chopping herbs — the flat profile fights you. Carving a roast; too short.',
    photo:
      'https://images.unsplash.com/photo-1596633609591-e4e1e9e06b7f?auto=format&fit=crop&w=900&q=80',
    alt: 'A santoku with a flat-profiled blade and bright ground bevel lying on dark ground.',
    stock: 'Next batch 2026-09',
  },
  {
    name: 'No. 4 Sujihiki',
    len: '240mm',
    price: '$395',
    hrc: '61',
    weight: '171g',
    spine: '1.85mm',
    goodAt: 'One long pull through cooked protein or raw fish. Very thin, very little drag.',
    badAt: 'Board work. It is a slicer — narrow, whippy, wrong for chopping an onion.',
    photo:
      'https://images.unsplash.com/photo-1537557209696-c595cc42018d?auto=format&fit=crop&w=900&q=80',
    alt: 'A long slicing blade being drawn from the forge fire, glowing steel held in tongs above the anvil.',
    stock: 'Made to order · 4–5 weeks',
  },
]

const COLS = ['Length', 'Price', 'HRC', 'Weight', 'Spine at heel']

export default function FieldRange() {
  return (
    <section id="range" className="relative border-b border-rule-strong bg-plate">
      <div className="substrate absolute inset-0" aria-hidden="true" />

      <Container className="relative pt-20 pb-20 sm:pt-28 sm:pb-28">
        <FieldHead
          number="05"
          field="Range"
          title="Four knives, and what each one is wrong for."
          lede="We make four. Not forty. Each row below tells you what the knife is bad at, because that is the column that actually decides which one you want — and because we would rather sell you the right $185 knife than the wrong $395 one."
        />

        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={seen}
          variants={stagger(0.07, 0.1)}
          className="mt-14 grid gap-0 border border-ink bg-sheet lg:grid-cols-[1.1fr_1fr]"
        >
          <div className="relative border-b border-rule-strong lg:border-b-0 lg:border-r">
            <img
              src={LEAD.photo}
              alt={LEAD.alt}
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto lg:min-h-[420px]"
            />
            <p className="absolute top-0 left-0 border-r border-b border-ink bg-mark px-3 py-1.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.13em] text-sheet">
              Recommended
            </p>
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <motion.div variants={slideUp} className="flex items-start justify-between gap-4">
              <h3 className="text-[clamp(2rem,1.4rem+2vw,2.9rem)] font-extrabold leading-[0.95] text-ink">
                {LEAD.name}
              </h3>
              <p className="shrink-0 font-mono text-[1.6rem] font-medium tabular-nums leading-none text-mark">
                {LEAD.price}
              </p>
            </motion.div>

            <motion.dl
              variants={slideUp}
              className="mt-6 grid grid-cols-2 border-t border-rule-strong sm:grid-cols-4"
            >
              {[
                ['Length', LEAD.len],
                ['HRC', LEAD.hrc],
                ['Weight', LEAD.weight],
                ['Spine', LEAD.spine],
              ].map(([k, v]) => (
                <div key={k} className="border-r border-b border-rule px-3 py-2.5 last:border-r-0">
                  <dt className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.13em] text-ink-3">
                    {k}
                  </dt>
                  <dd className="mt-0.5 font-mono text-[0.95rem] font-medium tabular-nums text-ink">
                    {v}
                  </dd>
                </div>
              ))}
            </motion.dl>

            <motion.dl variants={slideUp} className="mt-6 space-y-4">
              <div>
                <dt className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.13em] text-ink-3">
                  Good at
                </dt>
                <dd className="mt-1.5 text-[0.98rem] leading-[1.6] text-ink-2">{LEAD.goodAt}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.13em] text-mark">
                  Bad at
                </dt>
                <dd className="mt-1.5 text-[0.98rem] leading-[1.6] text-ink-2">{LEAD.badAt}</dd>
              </div>
            </motion.dl>

            <motion.p
              variants={slideUp}
              className="mt-auto pt-6 font-mono text-[0.72rem] tabular-nums text-ink-3"
            >
              {LEAD.stock}
            </motion.p>
          </div>
        </motion.article>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={seen}
          variants={stagger(0.06)}
          className="mt-10"
        >
          {/* Column header, desktop only — a real table head. */}
          <div
            className="hidden border-b border-ink pb-2 lg:grid lg:grid-cols-[6rem_11rem_repeat(5,minmax(0,1fr))_1.5fr] lg:gap-4"
            aria-hidden="true"
          >
            <span />
            <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.13em] text-ink-3">
              Model
            </span>
            {COLS.map((c) => (
              <span
                key={c}
                className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.13em] text-ink-3"
              >
                {c}
              </span>
            ))}
            <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.13em] text-mark">
              Bad at
            </span>
          </div>

          {REST.map((k) => (
            <motion.article
              key={k.name}
              variants={slideUp}
              className="grid grid-cols-[4.5rem_1fr] items-start gap-x-4 gap-y-3 border-b border-rule py-5 lg:grid-cols-[6rem_11rem_repeat(5,minmax(0,1fr))_1.5fr] lg:items-center lg:gap-4"
            >
              <img
                src={k.photo}
                alt={k.alt}
                loading="lazy"
                className="aspect-square w-full border border-rule-strong object-cover"
              />

              <div className="min-w-0">
                <h3 className="text-[1.4rem] font-bold leading-none text-ink">{k.name}</h3>
                <p className="mt-1.5 font-mono text-[0.68rem] tabular-nums text-ink-3">{k.stock}</p>
              </div>

              {/* На мобильных — сетка в две колонки, на десктопе — ячейки
                  таблицы. */}
              <dl className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-rule pt-3 sm:grid-cols-5 lg:hidden">
                {[
                  ['Length', k.len],
                  ['Price', k.price],
                  ['HRC', k.hrc],
                  ['Weight', k.weight],
                  ['Spine', k.spine],
                ].map(([label, v]) => (
                  <div key={label}>
                    <dt className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-ink-3">
                      {label}
                    </dt>
                    <dd className="font-mono text-[0.9rem] font-medium tabular-nums text-ink">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              {[k.len, k.price, k.hrc, k.weight, k.spine].map((v, idx) => (
                <p
                  key={COLS[idx]}
                  className={[
                    'hidden font-mono text-[0.95rem] font-medium tabular-nums lg:block',
                    idx === 1 ? 'text-mark' : 'text-ink',
                  ].join(' ')}
                >
                  <span className="sr-only">{COLS[idx]}: </span>
                  {v}
                </p>
              ))}

              <div className="col-span-2 lg:col-span-1">
                <p className="text-[0.94rem] leading-[1.55] text-ink-2">
                  <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-mark lg:sr-only">
                    Bad at —{' '}
                  </span>
                  {k.badAt}
                </p>
                <p className="mt-2 text-[0.9rem] leading-[1.55] text-ink-3 lg:hidden">
                  <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-ink-3">
                    Good at —{' '}
                  </span>
                  {k.goodAt}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
