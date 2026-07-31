import { SHEETS } from '../data.js'
import Artifact from './Artifact.jsx'

/* Листы работ. Порядок полей одинаков у всех: ограничение, решение, измеренный
   результат, цена, правка. */

function SheetTab({ id, index }) {
  return (
    <div className="flex shrink-0 items-start border-b border-ink/20 bg-print px-4 py-2 lg:sticky lg:top-[3.5rem] lg:w-14 lg:flex-col lg:items-center lg:border-b-0 lg:border-r lg:border-ink/25 lg:px-0 lg:py-5">
      <span className="sheet-no text-paper lg:[writing-mode:vertical-rl]">
        SHEET {id}
      </span>
      <span
        aria-hidden="true"
        className="dim ml-auto text-[0.75rem] text-paper-soft lg:ml-0 lg:mt-4"
      >
        {String(index + 1).padStart(2, '0')}/{String(SHEETS.length).padStart(2, '0')}
      </span>
    </div>
  )
}

function Field({ label, children, tone = 'ink' }) {
  const labelTone = tone === 'red' ? 'text-red-ink' : 'text-print'
  return (
    <div className="border-t border-ink/20 pt-4">
      <h4 className={`sheet-no mb-2 ${labelTone}`}>{label}</h4>
      {children}
    </div>
  )
}

function Measure({ metric, from, to }) {
  return (
    <div className="border-t border-ink/15 py-3 first:border-t-0 first:pt-0">
      <p className="font-spec text-[0.9rem] leading-snug text-ink-mid">{metric}</p>
      <div className="mt-2 flex items-center gap-3 text-print">
        <span className="dim shrink-0 text-[0.9rem] text-ink-mid line-through decoration-red decoration-[1.5px]">
          {from}
        </span>
        <span aria-hidden="true" className="leader" />
        <span className="dim shrink-0 text-[1.0625rem] font-bold text-print">
          {to}
        </span>
      </div>
    </div>
  )
}

export default function Sheets() {
  return (
    <div>
      {SHEETS.map((sheet, i) => (
        <section
          key={sheet.id}
          id={sheet.slug}
          aria-labelledby={`${sheet.slug}-title`}
          className="scroll-mt-[3.75rem] border-b border-ink/30"
        >
          <div className="mx-auto flex max-w-[100rem] flex-col lg:flex-row">
            <SheetTab id={sheet.id} index={i} />

            <div className="min-w-0 flex-1">
              <div className="reveal border-b border-ink/25 px-4 py-7 sm:px-8 sm:py-9">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3
                    id={`${sheet.slug}-title`}
                    className="font-drawn text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.025em] text-ink"
                  >
                    {sheet.project}
                  </h3>
                  <span className="dim text-[0.8rem] text-ink-mid">{sheet.span}</span>
                </div>
                <p className="mt-2 max-w-[52ch] font-drawn text-[1.0625rem] font-medium leading-snug text-print sm:text-[1.25rem]">
                  {sheet.title}
                </p>

                <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <dt className="sheet-no text-ink-mid">ROLE</dt>
                    <dd className="mt-1 font-spec text-[0.9rem] leading-snug text-ink">
                      {sheet.role}
                    </dd>
                  </div>
                  <div>
                    <dt className="sheet-no text-ink-mid">SCALE</dt>
                    <dd className="mt-1 font-spec text-[0.9rem] leading-snug text-ink">
                      {sheet.scale}
                    </dd>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <dt className="sheet-no text-ink-mid">STACK</dt>
                    <dd className="dim mt-1 text-[0.8rem] leading-relaxed text-ink">
                      {sheet.stack.join(' · ')}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="grid xl:grid-cols-[1fr_24rem]">
                <div className="reveal space-y-5 border-b border-ink/20 px-4 py-7 sm:px-8 sm:py-9 xl:border-b-0 xl:border-r">
                  <Field label="GOVERNING CONSTRAINT">
                    <p className="max-w-[34rem] font-spec text-[1.0625rem] leading-[1.62] text-ink">
                      {sheet.governs}
                    </p>
                  </Field>

                  <Field label="DECISION">
                    <p className="max-w-[34rem] font-spec text-[1.0625rem] leading-[1.62] text-ink">
                      {sheet.decision}
                    </p>
                  </Field>

                  <Field label="ACCEPTED COST">
                    <p className="max-w-[34rem] font-spec text-[1.0625rem] leading-[1.62] text-ink-mid">
                      {sheet.cost}
                    </p>
                  </Field>
                </div>

                <div className="reveal bg-panel/60">
                  <div className="border-b border-ink/20 px-4 py-6 sm:px-6">
                    <h4 className="sheet-no mb-4 text-print">MEASURED</h4>
                    <div>
                      {sheet.numbers.map((n) => (
                        <Measure key={n.metric} {...n} />
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-6 sm:px-6">
                    <Artifact kind={sheet.artifact} />
                  </div>
                </div>
              </div>

              <div className="reveal border-t border-red/40 bg-red-tint px-4 py-7 sm:px-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-7">
                  <div className="flex shrink-0 items-start gap-3">
                    <span className="rev-bubble" aria-hidden="true">
                      R1
                    </span>
                    <span className="sheet-no pt-1.5 text-red-ink sm:hidden">
                      GOT THIS WRONG FIRST
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="sheet-no mb-3 hidden text-red-ink sm:block">
                      REV 1 — GOT THIS WRONG FIRST
                    </h4>
                    <p className="max-w-[35rem] font-drawn text-[1.0625rem] font-semibold leading-snug text-ink">
                      <span className="marked">{sheet.redline.wrong}</span>
                    </p>
                    <p className="mt-3 max-w-[35rem] font-spec text-[1rem] leading-[1.6] text-ink">
                      {sheet.redline.why}
                    </p>
                    <p className="mt-3 max-w-[35rem] font-spec text-[1rem] leading-[1.6] text-red-ink">
                      <strong className="font-bold">Correction: </strong>
                      {sheet.redline.fix}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
