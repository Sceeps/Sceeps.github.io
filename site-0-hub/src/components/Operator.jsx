export default function Operator() {
  return (
    <section
      id="operator"
      aria-labelledby="operator-title"
      className="scroll-mt-24 bg-plate text-engrave"
    >
      <div className="mx-auto w-full max-w-[62rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <p className="font-jack text-[0.625rem] leading-none tracking-[0.18em] text-engrave-2 uppercase">
          Обратная сторона
        </p>

        <h2
          id="operator-title"
          className="mt-4 font-panel text-[clamp(1.875rem,5.5vw,3rem)] leading-[1] text-engrave [font-stretch:90%]"
        >
          Кто это собрал
        </h2>

        <div className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2">
          <div className="min-w-0">
            <p className="max-w-[52ch] text-[1.0625rem] leading-[1.6] text-engrave">
              <strong className="font-semibold">Sceeps</strong> — это ник.
              Настоящее имя не публикую: смотреть тут всё равно надо на работы, а
              не на строчку в резюме.
            </p>

            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-[1.65] text-engrave-2">
              Работаю с React, Vite и Tailwind. Верстаю сам, дизайн придумываю
              сам — поэтому пять сайтов рядом и не похожи друг на друга.
            </p>
          </div>

          <div className="min-w-0">
            <p className="max-w-[52ch] text-[0.9375rem] leading-[1.65] text-engrave-2">
              Что для меня важно в этих проектах: они доделаны. Работают на
              телефоне и на большом экране, текст читается, контраст я считал, а
              не прикидывал на глаз.
            </p>

            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-[1.65] text-engrave-2">
              Собираются и выкладываются автоматически, одним прогоном — исходники
              открыты, можно посмотреть, как именно.
            </p>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="https://github.com/Sceeps"
            rel="me noopener"
            className="ease-key inline-flex items-center gap-3 bg-engrave px-5 py-3 text-plate transition-colors duration-200 hover:bg-signal-deep"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-2.91-.88-2.91-2.9 0-.65.23-1.18.61-1.6-.06-.15-.27-.77.06-1.6 0 0 .63-.2 2.06.77.6-.17 1.24-.25 1.88-.25s1.28.08 1.88.25c1.43-.98 2.06-.77 2.06-.77.33.83.12 1.45.06 1.6.38.42.61.95.61 1.6 0 2.03-1.13 2.7-2.92 2.9.31.27.58.79.58 1.6 0 1.15-.01 2.08-.01 2.37 0 .21.15.46.55.38A7.995 7.995 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            <span className="font-panel text-[0.9375rem] leading-none font-bold">
              github.com/Sceeps
            </span>
          </a>

          <a
            href="https://t.me/LitvinenkoListve"
            rel="me noopener"
            target="_blank"
            className="ease-key inline-flex items-center gap-3 bg-telegram px-5 py-3 text-plate transition-colors duration-200 hover:bg-telegram-deep"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21.94 4.3 18.7 19.58c-.24 1.08-.88 1.35-1.79.84l-4.94-3.64-2.38 2.29c-.26.26-.48.48-.99.48l.35-5.03 9.15-8.26c.4-.36-.09-.55-.62-.2L6.17 13.17 1.3 11.65c-1.06-.33-1.08-1.06.22-1.57l19-7.32c.88-.32 1.65.2 1.42 1.54Z" />
            </svg>
            <span className="font-panel text-[0.9375rem] leading-none font-bold">
              Телеграм
            </span>
          </a>
        </div>

        <p className="font-jack mt-4 text-[0.75rem] leading-[1.5] text-engrave-3">
          Почту не указываю — лучше без адреса, чем адрес, на который никто не
          ответит. В телеграм пишите смело.
        </p>
      </div>
    </section>
  )
}
