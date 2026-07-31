import { LINES } from '../lines.js'

export default function Footer() {
  return (
    <footer className="fascia">
      <div aria-hidden="true" className="scribe h-px w-full" />

      <div className="mx-auto w-full max-w-[84rem] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-8">
          <div className="min-w-0">
            <p className="font-panel text-[1.5rem] leading-none text-stencil [font-stretch:88%]">
              Sceeps
            </p>
            <p className="mt-3 max-w-[44ch] text-[0.875rem] leading-[1.6] text-stencil-3">
              Пять учебных сайтов. Названия фирм и цифры внутри придуманы,
              дизайн и код — нет.
            </p>
            <a
              href="https://github.com/Sceeps"
              rel="me noopener"
              className="font-jack mt-4 inline-block text-[0.8125rem] leading-none text-signal underline decoration-signal/50 underline-offset-4 hover:decoration-signal"
            >
              github.com/Sceeps
            </a>
          </div>

          <nav aria-label="Все пять сайтов" className="min-w-0">
            <p className="font-jack text-[0.625rem] leading-none tracking-[0.18em] text-stencil-4 uppercase">
              Все пять
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {LINES.map((line) => (
                <li key={line.id}>
                  <a
                    href={line.href}
                    className="ease-key group/f flex flex-wrap items-baseline gap-x-3 gap-y-0.5 transition-colors duration-150"
                  >
                    <span className="text-[0.9375rem] leading-tight text-stencil-2 underline decoration-stencil-4/40 decoration-1 underline-offset-4 group-hover/f:text-stencil group-hover/f:decoration-signal">
                      {line.name}
                    </span>
                    <span className="text-[0.8125rem] leading-tight text-stencil-4">
                      {line.kind}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-nickel pt-6">
          <p className="font-jack text-[0.75rem] leading-none text-stencil-4">
            React 19 · Vite · Tailwind v4
          </p>
          <p className="font-jack text-[0.75rem] leading-none text-stencil-4">
            Собирается и выкладывается через GitHub Actions
          </p>
          <a
            href="https://github.com/Sceeps/Sceeps.github.io"
            rel="noopener"
            className="font-jack text-[0.75rem] leading-none text-stencil-3 underline decoration-stencil-4/40 underline-offset-4 hover:text-stencil hover:decoration-signal"
          >
            Исходники этой страницы
          </a>
        </div>
      </div>
    </footer>
  )
}
