import Button from './ui/Button.jsx'

const LINES = [
  ['Prepared by', 'Ledger — continuous close'],
  ['Reviewed by', 'You, on the third'],
]

export default function SignOff() {
  return (
    <section id="book" className="greenbar border-b-[3px] border-double border-rule-ui">
      <div className="mx-auto w-full max-w-[92rem] px-4 py-16 sm:px-8 md:px-14 lg:py-24">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="num m-0 text-[0.7rem] tracking-[0.04em] text-ink-mid">
              ATTESTATION · TO BE COMPLETED BY REVIEWER
            </p>
            <h2 className="cond m-0 mt-4 text-[clamp(2.1rem,1.1rem+4vw,3.9rem)] leading-[0.94] font-bold tracking-[-0.025em] text-ink uppercase">
              Send us one month
              <br />
              of card data.
            </h2>
            <p className="m-0 mt-6 max-w-[46ch] text-[1.08rem] leading-[1.5] text-ink-mid">
              We&apos;ll code it, match it and hand back the trial balance you would
              have spent eleven days assembling. If the numbers don&apos;t tie to your
              books, you&apos;ll know inside an hour and we&apos;ll have wasted an hour
              of your time instead of a quarter.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button as="a" href="#book" variant="stamp" size="lg">
                Book a close review
              </Button>
              <Button as="a" href="#mechanism" variant="ink" size="lg">
                See how a charge posts
              </Button>
            </div>

            <p className="num mt-6 max-w-[60ch] text-[0.72rem] leading-[1.7] text-ink-soft">
              45 minutes, with your controller in the room. Read-only export is enough —
              no integration, no sandbox, no procurement review to sit through first.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border-2 border-rule-ui bg-bar-alt p-6 shadow-[3px_3px_0_0_var(--color-rule)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="num m-0 text-[0.66rem] text-ink-soft">FORM 1403-GL</p>
                  <p className="cond-mid m-0 mt-1 text-[1.15rem] leading-none font-bold text-ink uppercase">
                    Close package
                  </p>
                </div>
                <span
                  className="stamp num shrink-0 rounded-[2px] px-2 py-1.5 text-[0.62rem] font-bold"
                  style={{ transform: 'rotate(-4deg)' }}
                >
                  Signed
                </span>
              </div>

              <dl className="m-0 mt-8 flex flex-col gap-7">
                {LINES.map(([role, who]) => (
                  <div key={role}>
                    <dd className="m-0 border-b border-ink pb-1.5">
                      <span className="cond-mid text-[1.05rem] leading-none text-ink">{who}</span>
                    </dd>
                    <dt className="num m-0 mt-2 text-[0.66rem] text-ink-soft">{role}</dt>
                  </div>
                ))}
                <div>
                  <dd className="m-0 border-b border-ink pb-1.5">
                    <span className="num text-[1rem] leading-none text-ink">3 AUG 2026</span>
                  </dd>
                  <dt className="num m-0 mt-2 text-[0.66rem] text-ink-soft">Date of sign-off</dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
