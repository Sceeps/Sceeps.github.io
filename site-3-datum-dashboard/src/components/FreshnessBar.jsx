import { CircleDashed, Pause, Play, RefreshCw, TriangleAlert } from 'lucide-react';
import { Button } from './ui.jsx';
import { ICON_SM, STROKE } from '../lib/tokens.js';
import { NOW } from '../data/mockData.js';
import { utcClock } from '../lib/format.js';

// Полоса доверия к данным: свежесть, полнота текущей корзины и потерянные во
// время инцидента события. Потерянные не догрузятся, поэтому итоги за то окно
// останутся заниженными — об этом сказано прямо.
export default function FreshnessBar({ live, onToggleLive, loading, onRefresh, stale }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-panel border border-border bg-surface px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden
          className={`relative grid h-2 w-2 shrink-0 place-items-center`}
        >
          <span
            className={`absolute h-2 w-2 rounded-full ${live && !stale ? 'bg-success' : 'bg-ink-dim'}`}
          />
          {live && !stale && (
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-success opacity-60" />
          )}
        </span>
        <p className="min-w-0 text-2xs text-ink-muted">
          {stale ? (
            <>
              Paused at <span className="text-ink tnum">{utcClock(NOW)} UTC</span>
            </>
          ) : (
            <>
              Streaming · last complete bucket{' '}
              <span className="text-ink tnum">09:00 UTC</span>
            </>
          )}
        </p>
      </div>

      <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />

      <p className="flex items-center gap-1.5 text-2xs text-ink-faint">
        <CircleDashed size={ICON_SM} strokeWidth={STROKE} aria-hidden />
        <span>
          Current hour <span className="text-ink-muted tnum">42/60 min</span> counted
        </span>
      </p>

      <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />

      <p className="flex items-start gap-1.5 text-2xs text-warning">
        <TriangleAlert size={ICON_SM} strokeWidth={STROKE} aria-hidden className="mt-px shrink-0" />
        <span>
          <span className="tnum">41,290</span> events dropped 02:15–06:25 — totals covering that
          window are permanently low
        </span>
      </p>

      <div className="ml-auto flex items-center gap-1.5">
        <Button size="sm" variant="ghost" onClick={onToggleLive} aria-pressed={!live}>
          {live ? (
            <>
              <Pause size={ICON_SM} strokeWidth={STROKE} aria-hidden />
              Pause
            </>
          ) : (
            <>
              <Play size={ICON_SM} strokeWidth={STROKE} aria-hidden />
              Resume
            </>
          )}
        </Button>
        <Button size="sm" variant="secondary" onClick={onRefresh} loading={loading} disabled={loading}>
          {!loading && <RefreshCw size={ICON_SM} strokeWidth={STROKE} aria-hidden />}
          {loading ? 'Refreshing' : 'Refresh'}
        </Button>
      </div>
    </div>
  );
}
