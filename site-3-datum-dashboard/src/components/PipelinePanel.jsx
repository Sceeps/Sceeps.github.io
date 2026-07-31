import { Panel, StatusText } from './ui.jsx';
import { STATUS, TONE_FILL } from '../lib/tokens.js';
import { PIPELINE, RELEASES } from '../data/mockData.js';
import { since, utcFull } from '../lib/format.js';

// Состояние конвейера. В каждой строке то число, по которому сервис можно
// исключить из подозреваемых, а не декоративная зелёная точка.

export default function PipelinePanel() {
  return (
    <Panel
      title="Pipeline"
      meta="Error budget consumed this billing period"
      padded={false}
      footer={
        <div className="min-w-0">
          <p className="text-3xs font-semibold uppercase tracking-[0.05em] text-ink-faint">Recent deploys</p>
          <ul className="mt-1 space-y-0.5">
            {RELEASES.map((r) => (
              <li key={r.version} className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-2xs text-ink-muted">
                  {r.version}
                  {r.kind === 'hotfix' && <span className="ml-1.5 text-warning">hotfix</span>}
                </span>
                <span className="shrink-0 text-2xs text-ink-faint tnum" title={utcFull(r.at)}>
                  {since(r.at)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <ul>
        {PIPELINE.map((s) => {
          const tone = STATUS[s.status]?.tone ?? 'info';
          return (
            <li key={s.id} className="px-3 py-2 border-b border-border last:border-b-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="min-w-0 truncate text-sm text-ink">{s.name}</span>
                <StatusText status={s.status} className="shrink-0" />
              </div>
              <p className="mt-0.5 text-2xs text-ink-faint tnum">{s.detail}</p>

              <div className="mt-1.5 flex items-center gap-2">
                <div
                  className="h-1 flex-1 overflow-hidden rounded-full bg-surface-3"
                  role="img"
                  aria-label={`${Math.round(s.budgetUsed * 100)} percent of error budget consumed`}
                >
                  <div
                    className={`h-full rounded-full ${TONE_FILL[tone]}`}
                    style={{ width: `${s.budgetUsed * 100}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-3xs text-ink-faint tnum">
                  {Math.round(s.budgetUsed * 100)}%
                </span>
              </div>

              {s.note && <p className="mt-1 text-3xs text-ink-faint">{s.note}</p>}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
