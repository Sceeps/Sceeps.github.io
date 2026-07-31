// Одна запись о сайте: полоса на всю ширину из двух зон — текст и скриншот.
// `flip` меняет их местами, у первой записи скриншот шире.
export default function Line({ line, index, flip }) {
  const wide = index === 0

  return (
    <article
      id={line.id}
      className="seat scroll-mt-24"
      style={{ '--seat-delay': `${Math.min(index, 3) * 70}ms` }}
    >
      <div aria-hidden="true" className="scribe h-px w-full" />

      <div
        className={[
          'mx-auto grid w-full max-w-[84rem] items-start gap-x-12 gap-y-8 px-5 py-12 sm:px-8 sm:py-16 lg:px-12',
          // Шаблон колонок обязан зеркалиться вместе с order, иначе скриншот
          // уезжает в узкую колонку и сплющивается.
          flip
            ? 'lg:grid-cols-[minmax(0,30rem)_minmax(20rem,1fr)]'
            : wide
              ? 'lg:grid-cols-[minmax(20rem,32rem)_minmax(0,1fr)]'
              : 'lg:grid-cols-[minmax(20rem,1fr)_minmax(0,30rem)]',
        ].join(' ')}
      >
        <div className={['min-w-0', flip ? 'lg:order-2' : 'lg:order-1'].join(' ')}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h2 className="font-panel text-[clamp(2rem,6.5vw,3.25rem)] leading-[0.96] text-stencil [font-stretch:90%]">
              {line.name}
            </h2>
            <p className="font-jack text-[0.6875rem] tracking-[0.12em] text-signal uppercase">
              {line.kind}
            </p>
          </div>

          <p className="mt-5 max-w-[60ch] text-[1.0625rem] leading-[1.55] text-stencil-2">
            {line.subject}
          </p>

          <div className="recessed mt-6 rounded-[3px] px-4 py-4 sm:px-5 sm:py-5">
            <p className="font-jack text-[0.625rem] leading-none tracking-[0.16em] text-stencil-4 uppercase">
              Откуда такой вид
            </p>
            <p className="mt-3 max-w-[64ch] text-[1rem] leading-[1.6] text-stencil-2">
              {line.artifact}
            </p>
            <p className="mt-3 max-w-[64ch] text-[0.9375rem] leading-[1.6] text-stencil-3">
              {line.device}
            </p>
          </div>

          <dl className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
            <div>
              <dt className="font-jack text-[0.625rem] leading-none tracking-[0.16em] text-stencil-4 uppercase">
                Стек
              </dt>
              <dd className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5">
                {line.stack.map((s) => (
                  <span
                    key={s}
                    className="font-jack border border-nickel px-2 py-1 text-[0.6875rem] leading-none text-stencil-2"
                  >
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-jack text-[0.625rem] leading-none tracking-[0.16em] text-stencil-4 uppercase">
                Шрифты
              </dt>
              <dd className="font-jack mt-2 text-[0.8125rem] leading-none text-stencil-3">
                {line.fonts}
              </dd>
            </div>
          </dl>

          <a
            href={line.href}
            className="ease-key group/open mt-7 inline-flex items-center gap-3 bg-signal px-5 py-3 text-recess transition-all duration-200 hover:bg-stencil focus-visible:outline-offset-4"
          >
            <span className="font-panel text-[0.9375rem] leading-none font-bold tracking-[0.01em]">
              Открыть {line.name}
            </span>
            <svg
              aria-hidden="true"
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              className="ease-key transition-transform duration-200 group-hover/open:translate-x-1"
            >
              <path
                d="M0 5h13M9.5 1L14 5l-4.5 4"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </a>
        </div>

        <div className={flip ? 'lg:order-1' : 'lg:order-2'}>
          <Window line={line} index={index} />
        </div>
      </div>
    </article>
  )
}

// Через <picture> узкая версия скриншота, чтобы на 375px не грузился
// 2880px-файл. width/height обязательны: без них страница прыгает при
// подгрузке (~5 МБ на все десять картинок).
function Window({ line, index }) {
  const eager = index === 0

  return (
    <figure className="relative">
      <div
        aria-hidden="true"
        className="lamp h-[3px] w-full"
        style={{
          backgroundColor: line.lamp,
          '--lamp-glow': `0 0 14px 0 ${line.lamp}`,
          '--lamp-delay': `${180 + index * 90}ms`,
        }}
      />

      <div className="recessed overflow-hidden p-2 sm:p-2.5">
        <picture>
          <source
            media="(max-width: 719px)"
            srcSet={`/shots/${line.shot}-390.png`}
            width="780"
            height="1688"
          />
          <img
            src={`/shots/${line.shot}-1440.png`}
            alt={line.alt}
            width="2880"
            height="1800"
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
            decoding="async"
            className="block h-auto w-full bg-recess-2"
          />
        </picture>
      </div>

      <figcaption className="font-jack mt-3 text-[0.6875rem] leading-none text-stencil-4">
        Скриншот с самого сайта
      </figcaption>
    </figure>
  )
}
