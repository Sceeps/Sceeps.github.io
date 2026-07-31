import Button from './ui/Button.jsx'

const PLANS = [
  {
    id: 'program',
    name: 'Program',
    fee: '0',
    feeUnit: 'per month',
    rebate: '1.10%',
    line: 'Card program and continuous coding. For teams replacing a bank card and a spreadsheet.',
    lines: [
      ['Physical and virtual cards', 'Unlimited'],
      ['Policy enforced at authorization', 'Included'],
      ['Automatic GL coding', 'Included'],
      ['Receipt matching', 'Included'],
      ['Interchange rebate to you', '1.10% of spend'],
      ['Entities consolidated', '1'],
      ['Close checklist', '—'],
      ['Support response', 'Next business day'],
    ],
    cta: 'Start a program',
    variant: 'ruled',
  },
  {
    id: 'close',
    name: 'Close',
    fee: '1,400',
    feeUnit: 'per month, flat',
    rebate: '1.40%',
    line: 'The full close. For controllers who own sign-off and consolidate more than one entity.',
    lines: [
      ['Physical and virtual cards', 'Unlimited'],
      ['Policy enforced at authorization', 'Included'],
      ['Automatic GL coding', 'Included'],
      ['Receipt matching', 'Included'],
      ['Interchange rebate to you', '1.40% of spend'],
      ['Entities consolidated', 'Up to 25'],
      ['Close checklist', 'Live, with sign-off trail'],
      ['Support response', '4 hours, named contact'],
    ],
    cta: 'Book a close review',
    variant: 'stamp',
    lead: true,
  },
]

const NOT_CHARGED = [
  ['Per seat', 'Your whole finance team can log in. Adding a controller does not change the invoice.'],
  ['Per card', 'Issue four hundred. Issue four thousand. Same fee.'],
  ['Per transaction', 'Coding a posting is the product, not a metered line item.'],
  ['Implementation', 'Median time to first close on Ledger is 19 days. We do not bill for those 19 days.'],
  ['FX markup', 'Interbank plus 0.00%. Cross-border assessments pass through at cost, itemised.'],
]

export default function Terms() {
  return (
    <section id="terms" className="greenbar-deep border-b-[3px] border-double border-rule-ui">
      <div className="mx-auto w-full max-w-[92rem] px-4 py-16 sm:px-8 md:px-14 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2 className="cond-mid m-0 max-w-[26ch] text-[clamp(1.9rem,1.1rem+2.6vw,3.1rem)] leading-[0.98] font-bold tracking-[-0.02em] text-ink uppercase">
            Two plans. One invoice line.
          </h2>
          <p className="num m-0 text-[0.7rem] text-ink-mid">
            RATE SCHEDULE · EFFECTIVE 01 JUL 2026 · USD
          </p>
        </div>

        <div className="mt-11 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col bg-bar-alt ${
                plan.lead
                  ? 'border-2 border-red shadow-[3px_3px_0_0_var(--color-red)]'
                  : 'border border-rule-ui shadow-[3px_3px_0_0_var(--color-rule)]'
              }`}
            >
              <div
                className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-5 py-4 sm:px-7 ${
                  plan.lead ? 'bg-red text-bar-alt' : 'border-b border-rule-ui'
                }`}
              >
                <h3
                  className={`cond m-0 text-[1.5rem] leading-none font-bold uppercase ${
                    plan.lead ? 'text-bar-alt' : 'text-ink'
                  }`}
                >
                  {plan.name}
                </h3>
                <span
                  className={`num text-[0.68rem] ${plan.lead ? 'text-bar-alt' : 'text-ink-mid'}`}
                >
                  {plan.rebate} REBATE
                </span>
              </div>

              <div className="flex grow flex-col px-5 py-6 sm:px-7">
                <p className="m-0 max-w-[40ch] text-[0.98rem] leading-[1.55] text-ink-mid">
                  {plan.line}
                </p>

                <p className="m-0 mt-6 flex items-baseline gap-2">
                  <span className="num text-[clamp(2.1rem,1.4rem+2vw,2.9rem)] leading-none font-semibold text-ink">
                    ${plan.fee}
                  </span>
                  <span className="num text-[0.72rem] text-ink-soft">{plan.feeUnit}</span>
                </p>

                <dl className="m-0 mt-7 grid grid-cols-1 border-t border-rule-ui">
                  {plan.lines.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-rule-soft py-2.5"
                    >
                      <dt className="num m-0 text-[0.72rem] text-ink-mid">{k}</dt>
                      <dd
                        className={`num m-0 text-right text-[0.72rem] ${
                          v === '—' ? 'text-ink-soft' : 'text-ink'
                        }`}
                      >
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Button
                  as="a"
                  href="#book"
                  variant={plan.variant}
                  size="lg"
                  className="mt-8 w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t-2 border-rule-ui pt-8">
          <h3 className="cond-mid m-0 text-[1.35rem] leading-tight font-bold tracking-[-0.01em] text-ink uppercase sm:text-[1.6rem]">
            Line items you will not find on the invoice
          </h3>
          <dl className="m-0 mt-6 grid gap-x-10 gap-y-0 md:grid-cols-2">
            {NOT_CHARGED.map(([k, v]) => (
              <div key={k} className="border-b border-rule-soft py-4">
                <dt className="num m-0 flex items-baseline gap-2 text-[0.74rem] font-semibold text-red">
                  <span aria-hidden="true">✗</span>
                  {k}
                </dt>
                <dd className="m-0 mt-1.5 max-w-[52ch] text-[0.95rem] leading-[1.55] text-ink-mid">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="num mt-8 max-w-[76ch] text-[0.7rem] leading-[1.7] text-ink-soft">
          Rebate paid monthly against settled spend. Programs above $25M in annual spend
          or 25 entities are priced individually — the fee goes down, not up. Ledger
          Financial Technologies is a financial technology company, not a bank; cards are
          issued by a partner bank member FDIC.
        </p>
      </div>
    </section>
  )
}
