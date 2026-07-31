import { useState } from 'react';
import { ChevronRight, CircleUser, Link2, Filter } from 'lucide-react';
import { Button, StatusChip } from './ui.jsx';
import { ICON_SM, STROKE } from '../lib/tokens.js';
import { ANOMALIES } from '../data/mockData.js';
import { since, utcFull } from '../lib/format.js';

// Инциденты раскрываются на месте, а не в модалке: график должен оставаться
// на экране, пока читаешь подробности.

const SEV_RAIL = {
  error: 'before:bg-error',
  warning: 'before:bg-warning',
  info: 'before:bg-info',
};

export default function AnomalyFeed({ onScopeTo }) {
  const [open, setOpen] = useState('INC-2291');
  const critical = ANOMALIES.filter((a) => a.severity === 'error').length;

  return (
    <section
      aria-labelledby="anomalies-heading"
      className="rounded-panel border border-border bg-surface overflow-hidden"
    >
      <header className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-border">
        <div className="flex items-baseline gap-2 min-w-0">
          <h2 id="anomalies-heading" className="text-sm font-semibold text-ink">
            Needs attention
          </h2>
          <span className="text-2xs text-ink-faint tnum">
            {critical} critical · {ANOMALIES.length - critical} watching
          </span>
        </div>
        <p className="text-2xs text-ink-faint">
          Detected against 4-week seasonal baselines · sensitivity{' '}
          <span className="text-ink-muted">medium</span>
        </p>
      </header>

      <ul className="divide-y divide-border">
        {ANOMALIES.map((a) => {
          const expanded = open === a.id;
          return (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : a.id)}
                aria-expanded={expanded}
                className={`group relative flex w-full items-start gap-2.5 py-2 pl-3 pr-3 text-left
                  transition-colors duration-[--dur-fast] hover:bg-surface-2
                  before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] ${SEV_RAIL[a.severity]}
                  ${expanded ? 'bg-surface-2' : ''}`}
              >
                <ChevronRight
                  size={ICON_SM}
                  strokeWidth={STROKE}
                  aria-hidden
                  className={`mt-[3px] shrink-0 text-ink-faint transition-transform duration-[--dur-fast] ${
                    expanded ? 'rotate-90' : ''
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-mono text-2xs text-ink-faint">{a.id}</span>
                    <span className="min-w-0 flex-1 text-sm font-medium text-ink">{a.title}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-2xs text-ink-faint">
                    <StatusChip status={a.status} />
                    <span title={utcFull(a.firstSeen)}>since {since(a.firstSeen)}</span>
                    <span className="hidden sm:inline">{a.scope}</span>
                    {a.owner && (
                      <span className="hidden md:inline-flex items-center gap-1">
                        <CircleUser size={11} strokeWidth={STROKE} aria-hidden />
                        {a.owner}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {expanded && (
                <div className="pl-[30px] pr-3 pb-3 -mt-0.5 bg-surface-2">
                  <p className="max-w-[68ch] text-xs text-ink-muted">{a.detail}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onScopeTo?.(a)}
                      title={`Filter the event stream to ${a.metric}`}
                    >
                      <Filter size={ICON_SM} strokeWidth={STROKE} aria-hidden />
                      Scope stream to {a.metric}
                    </Button>
                    <span className="inline-flex items-center gap-1.5 text-2xs text-ink-faint">
                      <Link2 size={11} strokeWidth={STROKE} aria-hidden />
                      correlates with <span className="text-ink-muted">{a.correlatesWith}</span>
                    </span>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
