import { SPECIMEN } from '../data.js'

/* Лист с листингом кода. Подсветка размечена вручную в data.js: у готового
   хайлайтера цвета не проверить на контраст. */

const TONE = {
  k: 'text-c-key',
  s: 'text-c-str',
  n: 'text-c-num',
  c: 'text-c-com',
  f: 'text-c-str',
  p: 'text-c-plain',
}

export default function Specimen() {
  return (
    <section
      id="specimen"
      aria-labelledby="specimen-title"
      className="diazo on-print scroll-mt-[3.75rem] border-b border-ink/30 bg-print"
    >
      <div className="relative mx-auto max-w-[100rem]" style={{ zIndex: 'var(--z-mark)' }}>
        {/* min-w-0 у детей сетки обязателен: по умолчанию у grid-элемента
            min-width:auto, и прокручиваемый <pre> внутри растягивает колонку,
            а вместе с ней всю страницу. */}
        <div className="grid xl:grid-cols-[minmax(0,1fr)_26rem]">
          <div className="reveal min-w-0 border-b border-paper/20 px-4 py-9 sm:px-8 sm:py-12 xl:border-b-0 xl:border-r">
            <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="sheet-no text-red-light">SPEC 01</span>
              <h2
                id="specimen-title"
                className="font-drawn text-[clamp(1.5rem,3.6vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em] text-paper"
              >
                Read the actual code
              </h2>
            </div>
            <p className="mb-6 max-w-[58ch] font-spec text-[1.0625rem] leading-[1.6] text-paper-dim">
              {SPECIMEN.note}
            </p>

            <div className="overflow-x-auto border border-paper/25 bg-code">
              <pre className="dim min-w-fit py-4 text-[0.78rem] leading-[1.75] sm:text-[0.875rem]">
                <code>
                  {SPECIMEN.lines.map((line, i) => {
                    const marked = SPECIMEN.mark.at === i
                    return (
                      <span
                        key={i}
                        className={`flex ${
                          marked ? 'bg-red-light/15 shadow-[inset_2px_0_0_var(--color-red-light)]' : ''
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="w-10 shrink-0 select-none pr-3 text-right text-c-com sm:w-12 sm:pr-4"
                        >
                          {i + 1}
                        </span>
                        <span className="pr-5 sm:pr-8">
                          {line.length === 0 ? (
                            ' '
                          ) : (
                            line.map(([txt, t], j) => (
                              <span key={j} className={TONE[t] || TONE.p}>
                                {txt}
                              </span>
                            ))
                          )}
                        </span>
                      </span>
                    )
                  })}
                </code>
              </pre>
              <p className="border-t border-paper/20 px-4 py-2.5 font-spec text-[0.8rem] text-c-com sm:px-5">
                {SPECIMEN.file}
              </p>
            </div>
          </div>

          <aside className="reveal min-w-0 px-4 py-9 sm:px-8 xl:py-12">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-[1.85rem] min-w-[1.85rem] items-center justify-center rounded-full border-[1.5px] border-red-light px-1 font-dim text-[0.75rem] font-bold text-red-light"
                style={{ fontFamily: 'var(--font-dim)' }}
              >
                L6
              </span>
              <div className="min-w-0">
                <h3 className="sheet-no mb-2.5 text-red-light">MARK — LINE 6</h3>
                <p className="max-w-[42ch] font-drawn text-[1.0625rem] font-semibold leading-[1.4] text-paper">
                  {SPECIMEN.mark.text}
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-paper/25 pt-6">
              <h3 className="sheet-no mb-3 text-paper-soft">WHY IT&rsquo;S HERE</h3>
              <p className="max-w-[44ch] font-spec text-[1rem] leading-[1.62] text-paper-dim">
                A portfolio that shows only outcomes is unfalsifiable. Twelve lines
                you can argue with are worth more than four case studies you
                can&rsquo;t. If you think the fallback on line 9 is wrong, you are
                the person I want to hear from.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
