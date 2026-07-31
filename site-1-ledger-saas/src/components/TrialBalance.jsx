import { useOnApproach } from '../lib/motion'

const ROWS = [
  {
    company: 'Gridwell Energy',
    sector: 'Utilities · 640 staff',
    cards: 412,
    monthly: 4.1,
    was: 19,
    now: 2.5,
    quote: 'Nineteen days to two and a half. I didn’t add a single headcount.',
    who: 'D. Whitfield, VP Finance',
  },
  {
    company: 'Anvil Freight',
    sector: 'Logistics · 1,180 staff',
    cards: 903,
    monthly: 7.8,
    was: 14,
    now: 3,
    quote: 'Policy violations halved in a quarter because the card just says no.',
    who: 'M. Ionescu, Controller',
  },
  {
    company: 'Fathom Studio',
    sector: 'Agency · 210 staff',
    cards: 96,
    monthly: 1.2,
    was: 9,
    now: 2,
    quote: 'The board deck used to be six spreadsheets. Now it’s an export.',
    who: 'P. Nathan, CFO',
  },
  {
    company: 'Northline Health',
    sector: 'Clinics · 2,400 staff',
    cards: 1740,
    monthly: 12.4,
    was: 16,
    now: 4,
    quote: 'Eleven entities consolidate without a single intercompany fire drill.',
    who: 'R. Osei, Group Controller',
  },
  {
    company: 'Voss Robotics',
    sector: 'Hardware · 380 staff',
    cards: 244,
    monthly: 3.6,
    was: 12,
    now: 3,
    quote: 'Our auditors stopped sampling receipts. They pull the journal instead.',
    who: 'K. Berg, Director of Accounting',
  },
]

const total = {
  cards: ROWS.reduce((s, r) => s + r.cards, 0),
  monthly: ROWS.reduce((s, r) => s + r.monthly, 0),
  was: ROWS.reduce((s, r) => s + r.was, 0) / ROWS.length,
  now: ROWS.reduce((s, r) => s + r.now, 0) / ROWS.length,
}

export default function TrialBalance() {
  const [ref, active] = useOnApproach({ amount: 0.12 })

  return (
    <section
      id="customers"
      ref={ref}
      className="on-field border-b-[3px] border-double border-field-rule bg-field"
    >
      <div className="relative">
        <div
          className="tractor-dark pointer-events-none absolute inset-y-0 left-0 hidden w-6 md:block"
          aria-hidden="true"
        />
        <div
          className="tractor-dark pointer-events-none absolute inset-y-0 right-0 hidden w-6 md:block"
          aria-hidden="true"
        />

        <div className="mx-auto w-full max-w-[92rem] px-4 py-16 sm:px-8 md:px-14 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <h2 className="cond-mid m-0 max-w-[24ch] text-[clamp(1.9rem,1.1rem+2.6vw,3.1rem)] leading-[0.98] font-bold tracking-[-0.02em] text-on-field uppercase">
              Five programs, audited.
            </h2>
            <p className="num m-0 text-[0.7rem] text-on-field-mid">
              SCHEDULE C-2 · CUSTOMER CLOSE TIMES · TRAILING 4 QUARTERS
            </p>
          </div>

          {/* Таблица получает tabindex, чтобы её можно было прокрутить с
              клавиатуры, а не только жестом. */}
          <div
            role="region"
            aria-label="Customer close times schedule, scrolls horizontally"
            tabIndex={0}
            className="mt-11 overflow-x-auto"
          >
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">
                Customer card programs on Ledger, with close time before and after
                adoption
              </caption>
              <thead>
                <tr className="border-y-2 border-field-rule">
                  <th scope="col" className="num py-3 pr-6 text-[0.66rem] font-medium text-on-field-mid">
                    PROGRAM
                  </th>
                  <th scope="col" className="num py-3 pr-6 text-right text-[0.66rem] font-medium text-on-field-mid">
                    CARDS
                  </th>
                  <th scope="col" className="num py-3 pr-6 text-right text-[0.66rem] font-medium text-on-field-mid">
                    $M / MO
                  </th>
                  <th scope="col" className="num py-3 pr-6 text-right text-[0.66rem] font-medium text-on-field-mid">
                    WAS
                  </th>
                  <th scope="col" className="num py-3 pr-6 text-right text-[0.66rem] font-medium text-on-field-mid">
                    NOW
                  </th>
                  <th scope="col" className="num py-3 text-[0.66rem] font-medium text-on-field-mid">
                    ON THE RECORD
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr
                    key={r.company}
                    className="border-b border-field-rule-soft align-top"
                    style={
                      active
                        ? {
                            animation: `feed-in 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s both`,
                          }
                        : undefined
                    }
                  >
                    <th scope="row" className="py-5 pr-6 font-normal">
                      <span className="cond-mid block text-[1.05rem] leading-tight font-semibold text-on-field">
                        {r.company}
                      </span>
                      <span className="num mt-1.5 block text-[0.66rem] text-on-field-soft">
                        {r.sector}
                      </span>
                    </th>
                    <td className="num py-5 pr-6 text-right text-[0.8rem] text-on-field-mid">
                      {r.cards.toLocaleString('en-US')}
                    </td>
                    <td className="num py-5 pr-6 text-right text-[0.8rem] text-on-field-mid">
                      {r.monthly.toFixed(1)}
                    </td>
                    <td className="num py-5 pr-6 text-right text-[0.8rem] text-on-field-soft line-through decoration-red-on-field decoration-2">
                      {r.was}d
                    </td>
                    <td className="num py-5 pr-6 text-right text-[0.86rem] font-semibold text-red-on-field">
                      {r.now}d
                    </td>
                    <td className="py-5 align-top">
                      <p className="m-0 max-w-[36ch] text-[0.95rem] leading-[1.5] text-on-field">
                        &ldquo;{r.quote}&rdquo;
                      </p>
                      <p className="num m-0 mt-2 text-[0.66rem] text-on-field-soft">{r.who}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-[3px] border-double border-field-rule">
                  <th scope="row" className="num py-4 pr-6 text-left text-[0.7rem] font-semibold text-on-field-mid">
                    TOTAL / MEAN
                  </th>
                  <td className="num py-4 pr-6 text-right text-[0.8rem] font-semibold text-on-field">
                    {total.cards.toLocaleString('en-US')}
                  </td>
                  <td className="num py-4 pr-6 text-right text-[0.8rem] font-semibold text-on-field">
                    {total.monthly.toFixed(1)}
                  </td>
                  <td className="num py-4 pr-6 text-right text-[0.8rem] text-on-field-soft">
                    {total.was.toFixed(1)}d
                  </td>
                  <td className="num py-4 pr-6 text-right text-[0.86rem] font-semibold text-red-on-field">
                    {total.now.toFixed(1)}d
                  </td>
                  <td className="num py-4 text-[0.7rem] text-on-field-mid">
                    −{(total.was - total.now).toFixed(1)} DAYS, MEAN
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="num mt-6 max-w-[76ch] text-[0.7rem] leading-[1.7] text-on-field-soft">
            Close time measured period end to controller sign-off. &ldquo;Was&rdquo; is
            the trailing three closes before implementation; &ldquo;now&rdquo; is the
            trailing three closes on Ledger. Quotes used with permission.
          </p>
        </div>
      </div>
    </section>
  )
}
