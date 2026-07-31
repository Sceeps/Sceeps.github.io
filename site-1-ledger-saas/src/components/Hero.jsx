import PostingTape from './PostingTape.jsx'
import Button from './ui/Button.jsx'
import { useCanAnimate } from '../lib/motion'

const RUN = [
  ['RUN', '2026-07-31 14:02 PT'],
  ['ENTITY', 'Consolidated · 4 subs'],
  ['PREPARER', 'Ledger · automated'],
  ['REVIEWER', 'D. Whitfield, VP Fin'],
]

export default function Hero() {
  const canAnimate = useCanAnimate()
  const strike = (i) =>
    canAnimate
      ? { animation: `feed-in 0.5s cubic-bezier(0.22,1,0.36,1) ${0.05 + i * 0.11}s both` }
      : undefined

  return (
    <section id="top" className="greenbar relative border-b-[3px] border-double border-rule-ui">
      <div
        className="tractor pointer-events-none absolute inset-y-0 left-0 hidden w-6 md:block"
        aria-hidden="true"
      />
      <div
        className="tractor pointer-events-none absolute inset-y-0 right-0 hidden w-6 md:block"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-[92rem] grid-cols-1 gap-x-10 gap-y-12 px-4 pt-14 pb-16 sm:px-8 md:px-14 lg:grid-cols-12 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-7 lg:pr-6 xl:col-span-6">
          <p
            className="num m-0 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-[0.7rem] text-ink-mid"
            style={strike(0)}
          >
            <span className="stamp rounded-[2px] px-1.5 py-1 text-[0.62rem] font-semibold">
              Close package
            </span>
            <span>PERIOD ENDED 31 JUL 2026</span>
          </p>

          <h1
            className="cond m-0 mt-5 text-[clamp(2.75rem,1.1rem+7.4vw,5.5rem)] leading-[0.9] font-bold tracking-[-0.025em] text-ink uppercase"
            style={strike(1)}
          >
            We closed
            <br />
            on the third.
          </h1>

          <p
            className="m-0 mt-6 max-w-[38ch] text-[1.12rem] leading-[1.5] text-ink-mid sm:text-[1.26rem]"
            style={strike(2)}
          >
            Not because the team worked a weekend. Because there was nothing left to
            reconcile — every card swipe had already been coded, matched and journaled
            the second it hit the network.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3" style={strike(3)}>
            <Button as="a" href="#book" variant="stamp" size="lg">
              Book a close review
            </Button>
            <Button as="a" href="#mechanism" variant="ruled" size="lg">
              Read the mechanism
            </Button>
          </div>

          <dl
            className="mt-11 grid max-w-[34rem] grid-cols-1 gap-x-8 gap-y-0 border-t border-rule-ui pt-4 sm:grid-cols-2"
            style={strike(4)}
          >
            {RUN.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-3 border-b border-rule-soft py-2"
              >
                <dt className="num m-0 text-[0.66rem] text-ink-soft">{k}</dt>
                <dd className="num m-0 text-right text-[0.7rem] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="min-w-0 lg:col-span-5 xl:col-span-6"
          style={
            canAnimate
              ? { animation: 'feed-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both' }
              : undefined
          }
        >
          <PostingTape />
        </div>
      </div>
    </section>
  )
}
