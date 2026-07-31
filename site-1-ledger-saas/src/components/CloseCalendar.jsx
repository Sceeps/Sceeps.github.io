import { useOnApproach } from '../lib/motion'

const DAYS = 11

// [подпись, день начала с 1, длительность в днях]
const BEFORE = [
  ['Wait for card statement', 1, 4],
  ['Chase 40 missing receipts', 3, 5],
  ['Code transactions by hand', 5, 4],
  ['Reconcile card liability', 8, 2],
  ['Book accruals', 9, 2],
  ['Review, find variance, redo', 10, 2],
]

const AFTER = [
  ['Receipts already matched', 1, 1],
  ['Coding already done at swipe', 1, 1],
  ['Liability already tied out', 1, 1],
  ['Accruals posted continuously', 1, 2],
  ['Controller reviews and signs', 2, 2],
]

function Strip({ rows, tone, active }) {
  const isBefore = tone === 'before'
  return (
    <ol className="m-0 flex list-none flex-col p-0">
      {rows.map(([label, start, span], i) => (
        <li key={label} className="grid grid-cols-[1fr] items-center gap-x-4 md:grid-cols-[15rem_1fr]">
          <span
            className={`num border-rule-soft py-2.5 text-[0.7rem] leading-tight md:border-b ${
              isBefore ? 'text-ink-mid' : 'text-ink'
            }`}
          >
            {label}
          </span>
          <div
            className="relative grid h-8 border-b border-rule-soft"
            style={{ gridTemplateColumns: `repeat(${DAYS}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: DAYS }, (_, d) => (
              <span
                key={d}
                aria-hidden="true"
                className="border-l border-rule-soft/70 first:border-l-0"
              />
            ))}
            <span
              className={`absolute inset-y-1.5 rounded-[2px] ${
                isBefore
                  ? 'border border-rule-ui bg-bar-deep'
                  : 'bg-red shadow-[1px_1px_0_0_var(--color-red-deep)]'
              }`}
              style={{
                left: `${((start - 1) / DAYS) * 100}%`,
                width: `${(span / DAYS) * 100}%`,
                transformOrigin: 'left',
                animation: active
                  ? `bar-wipe 0.55s cubic-bezier(0.22,1,0.36,1) ${0.06 * i}s both`
                  : undefined,
              }}
            />
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function CloseCalendar() {
  const [ref, active] = useOnApproach({ amount: 0.2 })

  return (
    <section
      id="problem"
      ref={ref}
      className="greenbar-deep border-b-[3px] border-double border-rule-ui"
    >
      <style>{`@keyframes bar-wipe{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>

      <div className="mx-auto w-full max-w-[92rem] px-4 py-16 sm:px-8 md:px-14 lg:py-24">
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
          <h2 className="cond-mid m-0 text-[clamp(1.9rem,1.1rem+2.6vw,3.1rem)] leading-[0.98] font-bold tracking-[-0.02em] text-ink uppercase lg:col-span-7">
            Your close isn't slow.
            <br />
            It's waiting in line.
          </h2>
          <p className="m-0 max-w-[46ch] self-end text-[1.02rem] leading-[1.55] text-ink-mid lg:col-span-5">
            Eleven days isn't eleven days of work. It's two days of work stretched
            around a statement that arrives on the 4th, receipts that arrive when
            someone remembers, and a coding pass nobody can start until both land.
          </p>
        </div>

        <div className="mt-14 grid gap-x-4 md:grid-cols-[15rem_1fr]">
          <span className="num hidden self-end pb-2 text-[0.66rem] text-ink-soft md:block">
            BUSINESS DAY →
          </span>
          <div
            className="grid pb-2"
            style={{ gridTemplateColumns: `repeat(${DAYS}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: DAYS }, (_, d) => (
              <span key={d} className="num text-center text-[0.66rem] text-ink-soft">
                {d + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-rule-ui pt-3">
          <p className="num m-0 pb-1 text-[0.68rem] tracking-[0.04em] text-ink-mid">
            SPREADSHEET CLOSE · 11 BUSINESS DAYS · 6 SEQUENTIAL DEPENDENCIES
          </p>
          <Strip rows={BEFORE} tone="before" active={active} />
        </div>

        <div className="mt-10 border-t-2 border-red pt-3">
          <p className="num m-0 pb-1 text-[0.68rem] tracking-[0.04em] text-red">
            LEDGER CLOSE · 3 BUSINESS DAYS · NOTHING WAITS ON ANYTHING
          </p>
          <Strip rows={AFTER} tone="after" active={active} />
        </div>

        <p className="num mt-6 max-w-[70ch] text-[0.72rem] leading-[1.7] text-ink-soft">
          Median across 214 mid-market card programs on Ledger, trailing four
          quarters. Day count measured from period end to controller sign-off, not
          to first draft.
        </p>
      </div>
    </section>
  )
}
