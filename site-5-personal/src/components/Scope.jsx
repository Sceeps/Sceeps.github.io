import { EXCLUSIONS, TOOLS, IDENTITY } from '../data.js'


export default function Scope() {
  return (
    <section
      id="scope"
      aria-labelledby="scope-title"
      className="scroll-mt-[3.75rem] border-b border-ink/30 bg-panel/50"
    >
      <div className="mx-auto max-w-[100rem]">
        <div className="reveal border-b border-ink/25 px-4 py-8 sm:px-8 sm:py-11">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="sheet-no text-red-ink">G-00</span>
            <h2
              id="scope-title"
              className="font-drawn text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.025em] text-ink"
            >
              General notes
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2">
          <div className="reveal border-b border-ink/25 px-4 py-8 sm:px-8 lg:border-b-0 lg:border-r">
            <h3 className="sheet-no mb-2 text-red-ink">
              NOT IN SCOPE OF THIS SET
            </h3>
            <p className="mb-6 max-w-[30rem] font-spec text-[1rem] leading-[1.6] text-ink-mid">
              Four things I am not the right person for. Stated plainly, because
              finding out in week three is expensive for both of us.
            </p>
            <dl>
              {EXCLUSIONS.map((e) => (
                <div
                  key={e.label}
                  className="border-t border-ink/20 py-4 first:border-t-0 first:pt-0"
                >
                  <dt className="flex items-baseline gap-2.5 font-drawn text-[1.0625rem] font-bold leading-snug text-ink">
                    <span aria-hidden="true" className="text-red">
                      &times;
                    </span>
                    {e.label}
                  </dt>
                  <dd className="mt-1.5 max-w-[31rem] pl-6 font-spec text-[0.975rem] leading-[1.58] text-ink-mid">
                    {e.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal px-4 py-8 sm:px-8">
            <h3 className="sheet-no mb-2 text-print">SHOP-BUILT TOOLS</h3>
            <p className="mb-6 max-w-[30rem] font-spec text-[1rem] leading-[1.6] text-ink-mid">
              Three things I built for myself and still use. None of them are
              products, and none of them are more than 200 lines.
            </p>
            <dl>
              {TOOLS.map((t) => (
                <div
                  key={t.name}
                  className="border-t border-ink/20 py-4 first:border-t-0 first:pt-0"
                >
                  <dt className="dim text-[0.9rem] font-bold text-print">
                    ./{t.name}
                  </dt>
                  <dd className="mt-1.5 max-w-[31rem] font-spec text-[0.975rem] leading-[1.58] text-ink">
                    {t.line}
                    <span className="mt-1.5 block text-ink-mid">{t.use}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="reveal border-t border-ink/25 bg-stock px-4 py-8 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
            <div>
              <h3 className="sheet-no mb-3 text-print">DRAWN BY</h3>
              <p className="font-drawn text-[1.35rem] font-extrabold leading-tight tracking-[-0.02em] text-ink">
                {IDENTITY.name}
              </p>
              <p className="dim mt-1.5 text-[0.8rem] leading-relaxed text-ink-mid">
                {IDENTITY.years} yrs · {IDENTITY.discipline}
                <br />
                {IDENTITY.location}
              </p>
              <p
                className="stamp mt-5 inline-block text-[0.7rem] text-red-ink"
                style={{ transform: 'rotate(-1.5deg)' }}
              >
                ISSUED FOR REVIEW
              </p>
            </div>

            <div className="max-w-[34rem] space-y-4 font-spec text-[1.0625rem] leading-[1.65] text-ink">
              <p>
                I started as a designer and learned to code because I was tired of
                watching my work get rebuilt badly. Twelve years later I mostly
                write TypeScript, but I still sketch a screen before I open an
                editor, and I still think the hardest part of the job is deciding
                what not to build.
              </p>
              <p>
                What I&rsquo;m actually good at: finding the one constraint that
                makes a design inevitable, and then refusing to route around it.
                Most of the sheets in this set are that same move &mdash; measure
                first, find the governing number, delete whatever is not paying
                for itself. It is not a philosophy, it&rsquo;s a habit I built
                after getting it wrong in public a few times, which is what the
                revision block is for.
              </p>
              <p className="text-ink-mid">
                Currently leading the editor at Waypost. I renovate a house I
                should not have bought, and I have opinions about bridges that
                nobody asked for.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
