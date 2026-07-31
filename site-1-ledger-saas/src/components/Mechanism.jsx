import { useOnApproach } from '../lib/motion'

const STEPS = [
  {
    t: '+000ms',
    title: 'Authorization hits the network',
    body: 'Visa sends the auth for $9,784.00 at Snowflake on J. Alvarez’s card ending 4471. Ledger sees it before the merchant does.',
    detail: 'MCC 7372 · Computer programming services',
    tone: 'ok',
  },
  {
    t: '+004ms',
    title: 'Policy evaluates, not suggests',
    body: 'Cardholder is on the Infra allowlist, so the vendor clears. The amount does not: anything over $5,000 needs a CFO countersign, and that hasn’t happened.',
    detail: 'Rule 12 · Over $5k · CFO countersign',
    tone: 'held',
  },
  {
    t: '+006ms',
    title: 'The card declines at the terminal',
    body: 'Not flagged for review three weeks later in an expense report. Declined, at the swipe, with the reason attached — so the fix is a conversation today, not a variance in August.',
    detail: 'Decline code 5100 · policy_hold',
    tone: 'held',
  },
  {
    t: '+9m 12s',
    title: 'CFO countersigns from the notification',
    body: 'P. Nathan approves on her phone. Ledger re-authorizes automatically; nobody re-enters the vendor, the amount, or the reason.',
    detail: 'Countersign · P. Nathan · FIN-OPS',
    tone: 'ok',
  },
  {
    t: '+9m 13s',
    title: 'Both sides of the entry are written',
    body: 'Debit 6415 Data warehouse, cost center ENG-DATA. Credit 2100 Card liability. Coded from the merchant, the cardholder’s department and the contract — not from a dropdown someone picks later.',
    detail: 'DR 6415 · CR 2100 · balanced',
    tone: 'ok',
  },
  {
    t: '+2d',
    title: 'Receipt arrives and matches itself',
    body: 'The invoice lands in AP two days later at $9,784.00. Ledger ties it to the posting on amount, vendor and date. Nobody chases it. If it had come in at $9,874.00, the transposition would surface as an exception the same hour.',
    detail: 'Match confidence 0.99 · no human touch',
    tone: 'ok',
  },
]

function Step({ step, index, active }) {
  const isHeld = step.tone === 'held'
  return (
    <li
      className="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-rule-soft py-6 md:grid-cols-[7rem_2.5rem_1fr] md:py-7"
      style={
        active
          ? { animation: `feed-in 0.45s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s both` }
          : undefined
      }
    >
      <span
        className={`num text-[0.76rem] leading-none font-semibold ${
          isHeld ? 'text-red' : 'text-ink'
        }`}
      >
        {step.t}
      </span>

      <span className="num hidden text-[0.68rem] leading-none text-ink-soft md:block">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="min-w-0">
        <h3
          className={`cond-mid m-0 text-[1.15rem] leading-tight font-semibold tracking-[-0.01em] sm:text-[1.3rem] ${
            isHeld ? 'text-red' : 'text-ink'
          }`}
        >
          {step.title}
        </h3>
        <p className="m-0 mt-2 max-w-[62ch] text-[0.98rem] leading-[1.6] text-ink-mid">
          {step.body}
        </p>
        <p className="num m-0 mt-3 text-[0.68rem] text-ink-soft">{step.detail}</p>
      </div>
    </li>
  )
}

export default function Mechanism() {
  const [ref, active] = useOnApproach({ amount: 0.08 })

  return (
    <section
      id="mechanism"
      ref={ref}
      className="greenbar border-b-[3px] border-double border-rule-ui"
    >
      <div className="mx-auto w-full max-w-[92rem] px-4 py-16 sm:px-8 md:px-14 lg:py-24">
        <div className="max-w-[54rem]">
          <h2 className="cond-mid m-0 text-[clamp(1.9rem,1.1rem+2.6vw,3.1rem)] leading-[0.98] font-bold tracking-[-0.02em] text-ink uppercase">
            One charge, traced all the way down.
          </h2>
          <p className="m-0 mt-5 max-w-[58ch] text-[1.02rem] leading-[1.55] text-ink-mid">
            Cards, approvals, coding and close aren&apos;t four products we sell
            together. They&apos;re four moments inside a single authorization. Here is
            an actual one — including the part where it gets declined.
          </p>
        </div>

        <ol className="m-0 mt-12 flex list-none flex-col border-t-2 border-rule-ui p-0">
          {STEPS.map((step, i) => (
            <Step key={step.t} step={step} index={i} active={active} />
          ))}
        </ol>

        <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-[7rem_1fr] md:gap-x-6">
          <span className="num text-[0.76rem] leading-none font-semibold text-red">
            = CLOSED
          </span>
          <p className="m-0 max-w-[62ch] text-[1.02rem] leading-[1.55] text-ink">
            By the time the period ends, that entry has been coded, approved, journaled
            and matched for twenty-eight days. There is no month-end version of this
            work, because it already happened.
          </p>
        </div>
      </div>
    </section>
  )
}
