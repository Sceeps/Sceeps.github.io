import { REVISIONS } from '../data.js'

/* Блок изменений: номер, дата, что изменилось. Номера здесь — настоящие номера
   ревизий, а не декоративная нумерация секций. */

export default function Revisions() {
  return (
    <section
      id="revisions"
      aria-labelledby="revisions-title"
      className="stock-grid scroll-mt-[3.75rem] border-b border-ink/30"
    >
      <div className="mx-auto max-w-[100rem]">
        <div className="reveal border-b border-ink/25 px-4 py-8 sm:px-8 sm:py-11">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="sheet-no text-red-ink">R-01</span>
            <h2
              id="revisions-title"
              className="font-drawn text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.025em] text-ink"
            >
              Revision block
            </h2>
          </div>
          <p className="mt-3 max-w-[34rem] font-spec text-[1.0625rem] leading-[1.6] text-ink">
            Things I believed, stopped believing, and the specific event that did
            it. Ordered newest first, the way a revision block is. If you want to
            know how someone thinks, this is more useful than a list of blog
            posts &mdash; and unlike the posts, I can&rsquo;t fake it retroactively.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">
              Revision log of changed engineering opinions, newest first
            </caption>
            <thead>
              <tr className="border-b border-ink/30 bg-panel/70">
                <th scope="col" className="sheet-no w-16 px-4 py-2.5 text-print sm:px-6">
                  REV
                </th>
                <th scope="col" className="sheet-no w-24 px-3 py-2.5 text-print">
                  DATE
                </th>
                <th scope="col" className="sheet-no px-3 py-2.5 text-print">
                  WAS
                </th>
                <th scope="col" className="sheet-no px-3 py-2.5 text-red-ink">
                  IS NOW
                </th>
                <th scope="col" className="sheet-no w-56 px-3 py-2.5 pr-4 text-print sm:pr-6">
                  WHAT CHANGED IT
                </th>
              </tr>
            </thead>
            <tbody>
              {REVISIONS.map((r) => (
                <tr
                  key={r.rev}
                  className="reveal border-b border-ink/15 align-top transition-colors hover:bg-red-tint/60"
                >
                  <td className="px-4 py-5 sm:px-6">
                    <span className="rev-bubble">{r.rev}</span>
                  </td>
                  <td className="dim px-3 py-5 text-[0.8rem] text-ink-mid">
                    <time dateTime={r.date}>{r.dateLabel}</time>
                  </td>
                  <td className="px-3 py-5">
                    <p className="max-w-[26ch] font-spec text-[0.975rem] leading-[1.5] text-ink-mid line-through decoration-red decoration-[1.5px]">
                      {r.held}
                    </p>
                  </td>
                  <td className="px-3 py-5">
                    <p className="max-w-[38ch] font-drawn text-[1rem] font-semibold leading-[1.45] text-ink">
                      {r.now}
                    </p>
                  </td>
                  <td className="px-3 py-5 pr-4 sm:pr-6">
                    <p className="max-w-[30ch] font-spec text-[0.9rem] leading-[1.5] text-red-ink">
                      {r.trigger}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
