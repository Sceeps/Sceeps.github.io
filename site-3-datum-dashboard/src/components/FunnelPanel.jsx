import { AlertTriangle } from 'lucide-react';
import { Panel } from './ui.jsx';
import { FUNNEL } from '../data/mockData.js';
import { compact, thousands } from '../lib/format.js';

// Бары сделаны вручную, а не через FunnelChart: рядом с каждым шагом нужны
// три числа, и библиотека отбирает под них место. Трапеция вдобавок сужается
// для красоты и врёт о величинах.
export default function FunnelPanel() {
  const first = FUNNEL.steps[0].users;
  const worst = FUNNEL.steps.reduce(
    (w, s) => (s.rate != null && s.priorRate != null && s.rate - s.priorRate < (w?.delta ?? 0)
      ? { ...s, delta: s.rate - s.priorRate }
      : w),
    null,
  );

  return (
    <Panel title="Checkout funnel" meta={FUNNEL.window}>
      <ol className="space-y-1.5">
        {FUNNEL.steps.map((s, i) => {
          const widthPct = (s.users / first) * 100;
          const delta = s.rate != null && s.priorRate != null ? s.rate - s.priorRate : null;
          const isWorst = worst && s.event === worst.event;
          const lost = i > 0 ? FUNNEL.steps[i - 1].users - s.users : 0;

          return (
            <li key={s.event}>
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="min-w-0 truncate font-mono text-2xs text-ink-muted">{s.event}</span>
                <span className="flex shrink-0 items-baseline gap-2">
                  {delta != null && (
                    <span
                      className={`text-3xs tnum ${
                        Math.abs(delta) < 1.5 ? 'text-ink-faint' : delta < 0 ? 'text-error' : 'text-success'
                      }`}
                    >
                      {delta >= 0 ? '+' : '−'}
                      {Math.abs(delta).toFixed(1)}pt
                    </span>
                  )}
                  {s.rate != null && (
                    <span className="text-xs font-medium text-ink tnum">{s.rate.toFixed(1)}%</span>
                  )}
                  <span className="w-[52px] text-right text-2xs text-ink-faint tnum">{compact(s.users)}</span>
                </span>
              </div>

              <div className="relative h-4 overflow-hidden rounded-[3px] bg-surface-2">
                <div
                  className="h-full rounded-[3px] transition-[width] duration-[--dur-slow]"
                  style={{ width: `${widthPct}%`, background: `var(--color-step-${5 - i})` }}
                />
                {i > 0 && (
                  <span
                    className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-3xs text-ink-faint tnum"
                    style={{ left: `calc(${widthPct}% + 6px)` }}
                  >
                    −{compact(lost)}
                  </span>
                )}
              </div>

              {isWorst && (
                <p className="mt-1 flex items-start gap-1.5 text-3xs text-error">
                  <AlertTriangle size={11} strokeWidth={2} className="mt-px shrink-0" aria-hidden />
                  <span>
                    Regressed {Math.abs(worst.delta).toFixed(1)}pt vs. last week — was {s.priorRate.toFixed(1)}%
                    of {FUNNEL.steps[i - 1].event}
                  </span>
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-2.5 pt-2 border-t border-border text-2xs text-ink-faint">
        <span className="text-ink-muted tnum">{thousands(FUNNEL.steps[0].users)}</span> entered ·{' '}
        <span className="text-ink-muted tnum">
          {((FUNNEL.steps.at(-1).users / first) * 100).toFixed(1)}%
        </span>{' '}
        completed end to end
      </p>
    </Panel>
  );
}
