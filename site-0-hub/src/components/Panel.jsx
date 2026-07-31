import { LINES } from '../lines.js'

export default function Panel() {
  return (
    <header className="fascia relative isolate overflow-hidden">
      <div aria-hidden="true" className="h-px w-full bg-cabinet-hi/70" />

      <div className="mx-auto w-full max-w-[84rem] px-5 pt-8 pb-0 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-6">
          <div className="min-w-0">
            <p className="font-jack text-[0.6875rem] leading-none tracking-[0.18em] text-stencil-3 uppercase">
              Панель&nbsp;К-5
            </p>

            <h1 className="mt-5 font-panel text-stencil [font-stretch:88%] text-[clamp(2.5rem,10vw,5.5rem)] leading-[0.94]">
              Sceeps
            </h1>

            <p className="mt-4 max-w-[46ch] text-[clamp(1.0625rem,2.2vw,1.375rem)] leading-[1.45] text-stencil-2">
              Делаю сайты и интерфейсы. Здесь пять штук — можно открыть и
              потыкать, они рабочие.
            </p>

            <p className="mt-4 max-w-[54ch] text-[0.9375rem] leading-[1.6] text-stencil-3">
              Каждый я делал целиком: от идеи до вёрстки. У всех пяти разные
              шрифты и цвета — так и было задумано, мне хотелось проверить, что
              умею не один приём, а несколько.
            </p>
          </div>

          <nav aria-label="Пять сайтов" className="w-full shrink-0 sm:w-auto">
            <p className="font-jack text-[0.625rem] leading-none tracking-[0.18em] text-stencil-4 uppercase">
              Что здесь есть
            </p>

            <ul className="mt-4 flex flex-col gap-2.5">
              {LINES.map((line) => (
                <li key={line.id}>
                  <a
                    href={`#${line.id}`}
                    className="ease-key group/nav flex flex-wrap items-baseline gap-x-3 gap-y-0.5 transition-colors duration-150"
                  >
                    <span className="font-panel text-[1.0625rem] leading-tight font-bold text-stencil-2 underline decoration-stencil-4/40 decoration-1 underline-offset-4 group-hover/nav:text-stencil group-hover/nav:decoration-signal">
                      {line.name}
                    </span>
                    <span className="text-[0.875rem] leading-tight text-stencil-4">
                      {line.kind}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="enamel mt-10 mb-8 flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3 sm:mt-12 sm:px-5">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="screw" />
            <span className="font-jack text-[0.625rem] leading-none tracking-[0.16em] text-engrave-2 uppercase">
              Сразу честно
            </span>
          </span>
          <p className="min-w-[16rem] flex-1 text-[0.9375rem] leading-[1.5] text-engrave">
            Это{' '}
            <strong className="font-semibold">учебные работы</strong>. Названия
            фирм, люди и цифры внутри — придуманные: заказчиков не было,
            пользователей тоже. Настоящие тут только дизайн и код.
          </p>
          <span aria-hidden="true" className="screw" />
        </div>
      </div>
    </header>
  )
}
