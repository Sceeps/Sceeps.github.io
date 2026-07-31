import { useCallback, useMemo, useState } from 'react'
import { CARDHOLDERS, OPENING_CENTS, POSTINGS, cardholder, formatUSD } from '../lib/transactions'
import { useTicker } from '../lib/motion'

const WINDOW = 7
const CADENCE = 3600

function Cell({ children, className = '' }) {
  return <span className={`num text-[0.7rem] leading-none ${className}`}>{children}</span>
}

export default function PostingTape() {
  const [head, setHead] = useState(WINDOW)

  const advance = useCallback(() => setHead((h) => h + 1), [])
  const live = useTicker(advance, CADENCE)

  const rows = useMemo(() => {
    const out = []
    for (let i = 0; i < WINDOW; i += 1) {
      const idx = (head - 1 - i + POSTINGS.length * 4) % POSTINGS.length
      out.push({ ...POSTINGS[idx], seq: head - i })
    }
    return out
  }, [head])

  // Контрольный итог считается из проводок, а не задан руками: иначе он
  // разъедется с лентой при любой правке данных.
  const control = useMemo(() => {
    let cents = OPENING_CENTS
    for (let i = 0; i < head; i += 1) {
      const p = POSTINGS[i % POSTINGS.length]
      if (p.state !== 'held') cents += p.cents
    }
    return cents
  }, [head])

  const held = rows.filter((r) => r.state === 'held').length
  const newestSeq = rows[0]?.seq

  return (
    <figure className="on-field m-0 w-full">
      <div className="overflow-hidden rounded-[3px] bg-field shadow-[0_2px_0_0_var(--color-rule),0_24px_44px_-28px_oklch(0.19_0.02_168/0.55)]">
        <div className="perf-bottom-dark flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 pt-3.5 pb-3.5 sm:px-5">
          <div className="flex items-baseline gap-3">
            <span className="num text-[0.68rem] tracking-[0.06em] text-on-field-mid">JRNL-CARD-07</span>
            <span className="num text-[0.68rem] text-on-field-soft">GL 2100 · CARD LIABILITY</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="num text-[0.68rem] text-on-field-soft">PERIOD 2026-07</span>
            <span
              className={`num text-[0.68rem] ${live ? 'text-red-on-field' : 'text-on-field-soft'}`}
            >
              {live ? 'PRINTING' : 'PAUSED'}
            </span>
          </div>
        </div>

        <div
          className="grid gap-x-3 border-b border-field-rule px-4 py-2 sm:px-5"
          style={{ gridTemplateColumns: 'minmax(0,1fr) 5.5rem 5.5rem' }}
        >
          <Cell className="text-on-field-mid">ENTRY</Cell>
          <Cell className="text-right text-on-field-mid">DEBIT</Cell>
          <Cell className="text-right text-on-field-mid">CREDIT</Cell>
        </div>

        <ul className="m-0 flex list-none flex-col p-0">
          {rows.map((row) => {
            const holder = cardholder(row.card)
            const isHeld = row.state === 'held'
            const isNewest = row.seq === newestSeq
            const magnitude = formatUSD(row.cents, { sign: false })
            const isCredit = row.cents > 0

            return (
              <li
                key={row.seq}
                className={`border-b border-field-rule-soft px-4 py-3 last:border-b-0 sm:px-5 ${
                  live && isNewest ? 'animate-feed' : ''
                }`}
              >
                {/* Дебет */}
                <div
                  className={`grid gap-x-3 ${live && isNewest ? 'animate-strike' : ''}`}
                  style={{ gridTemplateColumns: 'minmax(0,1fr) 5.5rem 5.5rem' }}
                >
                  <span className="flex min-w-0 items-baseline gap-2">
                    <Cell className="shrink-0 text-on-field-soft">{row.t}</Cell>
                    <span className="min-w-0 truncate text-[0.9rem] leading-none font-medium text-on-field">
                      {row.merchant}
                    </span>
                  </span>
                  <Cell
                    className={`text-right ${isCredit ? 'text-on-field-soft' : 'text-on-field'}`}
                  >
                    {isCredit ? '—' : magnitude}
                  </Cell>
                  <Cell
                    className={`text-right ${isCredit ? 'text-on-field' : 'text-on-field-soft'}`}
                  >
                    {isCredit ? magnitude : '—'}
                  </Cell>
                </div>

                {/* Кредит и правило, по которому проводка закодирована */}
                <div
                  className="mt-1.5 grid gap-x-3"
                  style={{ gridTemplateColumns: 'minmax(0,1fr) 5.5rem 5.5rem' }}
                >
                  <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
                    <Cell className="text-on-field-mid">
                      {row.debit} {row.account}
                    </Cell>
                    <Cell className="text-on-field-soft">·</Cell>
                    <Cell className="text-on-field-soft">{row.cc}</Cell>
                    <Cell className="text-on-field-soft">·</Cell>
                    <Cell className="text-on-field-soft">
                      {holder.name} ··{holder.last4}
                    </Cell>
                  </span>
                  <Cell
                    className={`col-span-2 text-right ${
                      isHeld ? 'text-red-on-field' : 'text-on-field-soft'
                    }`}
                  >
                    {isHeld ? `HELD · ${row.rule}` : row.rule}
                  </Cell>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="border-t-[3px] border-double border-field-rule bg-field-lift px-4 py-4 sm:px-5">
          <div
            className="grid items-end gap-x-3 gap-y-2"
            style={{ gridTemplateColumns: 'minmax(0,1fr) auto' }}
          >
            <div>
              <p className="num m-0 text-[0.68rem] leading-none text-on-field-mid">
                CONTROL TOTAL · CARD LIABILITY
              </p>
              <p className="num m-0 mt-2 text-[clamp(1.35rem,1rem+1.4vw,1.85rem)] leading-none font-semibold text-on-field">
                {formatUSD(control, { sign: false })}
              </p>
            </div>
            <div className="text-right">
              <p className="num m-0 text-[0.68rem] leading-none text-on-field-mid">
                {head} ENTRIES · BALANCED
              </p>
              <p
                className={`num m-0 mt-2 text-[0.78rem] leading-none ${
                  held > 0 ? 'text-red-on-field' : 'text-on-field-soft'
                }`}
              >
                {held > 0 ? `${held} HELD AT SWIPE` : 'NOTHING HELD'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="num mt-3 text-[0.68rem] leading-relaxed text-ink-soft">
        Live journal · both sides of every entry written at authorization ·{' '}
        {CARDHOLDERS.length} cardholders on program
      </figcaption>
    </figure>
  )
}
