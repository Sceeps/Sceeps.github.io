import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  Columns3,
  Download,
  Keyboard,
  RotateCcw,
  Search,
  SearchX,
  ShieldAlert,
  X,
} from 'lucide-react';
import {
  Button,
  DisabledReason,
  PopItem,
  PopLabel,
  PopSeparator,
  Popover,
  SkeletonLine,
  StatusChip,
} from './ui.jsx';
import { CONTROL, ICON_SM, STROKE } from '../lib/tokens.js';
import { EVENT_STREAM, SAVED_VIEWS, STREAM_TOTAL } from '../data/mockData.js';
import { since, thousands, utcClock, utcFull } from '../lib/format.js';

// Таблица событий. Навигация с клавиатуры сделана через roving tabindex: у
// всей сетки один таб-стоп, стрелки двигают курсор по строкам.

const COLUMNS = [
  { key: 'name', label: 'Event', sortable: true, w: 'w-[184px]' },
  { key: 'status', label: 'Result', sortable: true, w: 'w-[104px]' },
  { key: 'reason', label: 'Detail', sortable: false, w: 'min-w-[220px]' },
  { key: 'source', label: 'Source', sortable: true, w: 'w-[104px]', optional: true },
  { key: 'sdk', label: 'SDK', sortable: true, w: 'w-[70px]', align: 'right', optional: true },
  { key: 'region', label: 'Region', sortable: true, w: 'w-[100px]', optional: true },
  { key: 'distinctId', label: 'Distinct ID', sortable: false, w: 'w-[92px]', optional: true },
  { key: 'count', label: 'Batch', sortable: true, w: 'w-[62px]', align: 'right' },
  { key: 'at', label: 'Received', sortable: true, w: 'w-[92px]', align: 'right' },
];

const PAGE = 10;

// Сортировка по умолчанию: сначала сбои, потом свежие. Чисто по времени на
// первой странице оказываются здоровые строки за последние минуты.
const SEVERITY_RANK = { rejected: 0, dropped: 1, queued: 2, accepted: 3 };

export default function EventStream({ loading = false, stale = false, scopedView, onClearScope }) {
  const [viewId, setViewId] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'status', dir: 'asc' });
  const [page, setPage] = useState(0);
  const [hidden, setHidden] = useState(() => new Set(['distinctId']));
  const [cursor, setCursor] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [showKeys, setShowKeys] = useState(false);
  const bodyRef = useRef(null);

  const view = SAVED_VIEWS.find((v) => v.id === viewId) ?? SAVED_VIEWS[0];

  const rows = useMemo(() => {
    let out = EVENT_STREAM;
    if (scopedView) out = out.filter((r) => r.name === scopedView.metric);
    else if (view.filter) out = out.filter(view.filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter(
        (r) =>
          r.name.includes(q) ||
          r.region.includes(q) ||
          r.source.toLowerCase().includes(q) ||
          (r.reason ?? '').toLowerCase().includes(q),
      );
    }
    const { key, dir } = sort;
    return [...out].sort((a, b) => {
      let av = a[key];
      let bv = b[key];
      // Статус сортируется по серьёзности, а не по алфавиту.
      if (key === 'status') {
        av = SEVERITY_RANK[av] ?? 9;
        bv = SEVERITY_RANK[bv] ?? 9;
        // Внутри группы — свежие первыми.
        if (av === bv) return b.at - a.at;
      }
      if (av instanceof Date) {
        av = av.getTime();
        bv = bv.getTime();
      }
      if (av == null) av = '';
      if (bv == null) bv = '';
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return dir === 'asc' ? cmp : -cmp;
    });
  }, [view, query, sort, scopedView]);

  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const safePage = Math.min(page, pages - 1);
  const pageRows = rows.slice(safePage * PAGE, safePage * PAGE + PAGE);
  const cols = COLUMNS.filter((c) => !hidden.has(c.key));

  useEffect(() => {
    setPage(0);
    setCursor(0);
    setExpanded(null);
  }, [viewId, query, scopedView]);

  const toggleSort = (key) =>
    setSort((s) => ({ key, dir: s.key === key ? (s.dir === 'asc' ? 'desc' : 'asc') : 'desc' }));

  // Один таб-стоп на tbody, курсор внутри двигают стрелки.
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCursor((c) => Math.min(pageRows.length - 1, c + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCursor((c) => Math.max(0, c - 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCursor(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCursor(pageRows.length - 1);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const row = pageRows[cursor];
        if (row) setExpanded((x) => (x === row.id ? null : row.id));
      } else if (e.key === 'Escape') {
        if (expanded) {
          e.preventDefault();
          setExpanded(null);
        }
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        setPage((p) => Math.min(pages - 1, p + 1));
        setCursor(0);
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        setPage((p) => Math.max(0, p - 1));
        setCursor(0);
      }
    },
    [pageRows, cursor, expanded, pages],
  );

  useEffect(() => {
    const el = bodyRef.current?.querySelector('[data-cursor="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [cursor, safePage]);

  return (
    <section
      aria-labelledby="stream-heading"
      className="flex min-w-0 flex-col rounded-panel border border-border bg-surface"
    >
      <header className="flex flex-col gap-2 px-3 pt-2.5 pb-2 border-b border-border">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-baseline gap-2 min-w-0">
            <h2 id="stream-heading" className="text-sm font-semibold text-ink">
              Event stream
            </h2>
            <span className="text-2xs text-ink-faint tnum">
              {thousands(STREAM_TOTAL)} events in range
            </span>
            {stale && (
              <span className="inline-flex items-center gap-1 text-2xs text-warning">
                <RotateCcw size={10} strokeWidth={2} aria-hidden />
                paused
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Button size="sm" variant="ghost" onClick={() => setShowKeys((s) => !s)} aria-pressed={showKeys}>
              <Keyboard size={ICON_SM} strokeWidth={STROKE} aria-hidden />
              <span className="hidden sm:inline">Keys</span>
            </Button>

            <Popover
              label="Columns"
              width={196}
              align="end"
              trigger={({ ref, ...p }) => (
                <Button ref={ref} size="sm" variant="secondary" {...p}>
                  <Columns3 size={ICON_SM} strokeWidth={STROKE} aria-hidden />
                  <span className="hidden sm:inline">Columns</span>
                </Button>
              )}
            >
              {() => (
                <>
                  <PopLabel>Show columns</PopLabel>
                  {COLUMNS.filter((c) => c.optional).map((c) => {
                    const on = !hidden.has(c.key);
                    return (
                      <PopItem
                        key={c.key}
                        selected={on}
                        onClick={() =>
                          setHidden((h) => {
                            const n = new Set(h);
                            if (n.has(c.key)) n.delete(c.key);
                            else n.add(c.key);
                            return n;
                          })
                        }
                      >
                        <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                          {on && <Check size={11} strokeWidth={2.5} className="text-accent-text" aria-hidden />}
                        </span>
                        {c.label}
                      </PopItem>
                    );
                  })}
                  <PopSeparator />
                  <PopLabel>Always shown</PopLabel>
                  {COLUMNS.filter((c) => !c.optional).map((c) => (
                    <PopItem key={c.key} disabled title="Required for this view">
                      <span className="w-3.5" />
                      {c.label}
                    </PopItem>
                  ))}
                </>
              )}
            </Popover>

            <DisabledReason reason="Export is unavailable while the backfill queue is draining (ETA 11:10 UTC)">
              <Button size="sm" variant="secondary" disabled aria-disabled="true">
                <Download size={ICON_SM} strokeWidth={STROKE} aria-hidden />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </DisabledReason>
          </div>
        </div>

        {showKeys && (
          <p className="flex flex-wrap gap-x-3 gap-y-1 rounded-control bg-surface-2 px-2 py-1.5 text-2xs text-ink-faint">
            <Key k="↑ ↓">move</Key>
            <Key k="Enter">expand payload</Key>
            <Key k="Esc">collapse</Key>
            <Key k="Home / End">first / last</Key>
            <Key k="PgUp / PgDn">page</Key>
            <Key k="/">search</Key>
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {scopedView ? (
            <span className="inline-flex items-center gap-1.5 h-7 pl-2 pr-1 rounded-control bg-accent-wash text-2xs font-medium text-accent-text">
              <ShieldAlert size={ICON_SM} strokeWidth={STROKE} aria-hidden />
              scoped to {scopedView.metric}
              <button
                type="button"
                onClick={onClearScope}
                aria-label="Clear scope"
                className="ml-0.5 grid h-5 w-5 place-items-center rounded-[3px] hover:bg-accent/25"
              >
                <X size={11} strokeWidth={2.25} aria-hidden />
              </button>
            </span>
          ) : (
            <div className="flex flex-wrap items-center gap-1" role="tablist" aria-label="Saved views">
              {SAVED_VIEWS.map((v) => {
                const active = v.id === viewId;
                return (
                  <button
                    key={v.id}
                    role="tab"
                    aria-selected={active}
                    type="button"
                    onClick={() => setViewId(v.id)}
                    className={`inline-flex items-center gap-1.5 h-7 px-2 rounded-control text-2xs font-medium
                      transition-colors duration-[--dur-fast]
                      ${
                        active
                          ? 'bg-surface-4 text-ink'
                          : 'text-ink-faint hover:text-ink-muted hover:bg-surface-3'
                      }`}
                  >
                    {v.label}
                    {v.count != null && (
                      <span className={`tnum ${v.tone === 'error' && !active ? 'text-error' : 'text-ink-faint'}`}>
                        {thousands(v.count)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="relative ml-auto w-full sm:w-56">
            <Search
              size={ICON_SM}
              strokeWidth={STROKE}
              aria-hidden
              className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by event, region, reason…"
              aria-label="Filter events"
              className={`${CONTROL} h-7 w-full pl-7 pr-2 text-2xs`}
            />
          </div>
        </div>
      </header>

      {loading ? (
        <StreamSkeleton cols={cols.length} />
      ) : pageRows.length === 0 ? (
        <EmptyResult
          view={view}
          query={query}
          onReset={() => {
            setViewId('all');
            setQuery('');
            onClearScope?.();
          }}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <caption className="sr-only">
              Raw event stream, {rows.length} matching rows. Use arrow keys to move between rows.
            </caption>
            <thead>
              <tr className="border-b border-border bg-surface-2">
                {cols.map((c) => {
                  const active = sort.key === c.key;
                  const Arrow = sort.dir === 'asc' ? ArrowUp : ArrowDown;
                  return (
                    <th
                      key={c.key}
                      scope="col"
                      aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                      className={`${c.w} px-2.5 py-0 text-3xs font-semibold uppercase tracking-[0.05em] whitespace-nowrap ${
                        c.align === 'right' ? 'text-right' : 'text-left'
                      } ${active ? 'text-ink-muted' : 'text-ink-faint'}`}
                    >
                      {c.sortable ? (
                        // Зона нажатия — вся высота ячейки: по строчке текста
                        // в 15px пальцем не попасть.
                        <button
                          type="button"
                          onClick={() => toggleSort(c.key)}
                          className={`group inline-flex h-8 w-full items-center gap-1 hover:text-ink ${
                            c.align === 'right' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          {c.label}
                          <Arrow
                            size={10}
                            strokeWidth={2.5}
                            aria-hidden
                            className={active ? '' : 'opacity-0 transition-opacity group-hover:opacity-50'}
                          />
                        </button>
                      ) : (
                        // Несортируемые заголовки держат ту же высоту 32px.
                        <span className="inline-flex h-8 items-center">{c.label}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody
              ref={bodyRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              aria-label="Event rows"
              className="focus-visible:outline-2 focus-visible:outline-accent-text focus-visible:outline-offset-[-2px]"
            >
              {pageRows.map((r, i) => {
                const isCursor = i === cursor;
                const isOpen = expanded === r.id;
                return (
                  <Fragment key={r.id}>
                    <tr
                      data-cursor={isCursor}
                      onClick={() => {
                        setCursor(i);
                        setExpanded(isOpen ? null : r.id);
                      }}
                      className={`cursor-pointer border-b border-border transition-colors duration-[--dur-fast]
                        ${isCursor ? 'bg-accent-wash/55' : 'hover:bg-surface-2'}
                        ${isOpen ? 'bg-surface-2' : ''}`}
                    >
                      {cols.map((c) => (
                        <td
                          key={c.key}
                          className={`px-2.5 py-[7px] whitespace-nowrap ${
                            c.align === 'right' ? 'text-right' : ''
                          }`}
                        >
                          <Cell col={c} row={r} />
                        </td>
                      ))}
                    </tr>
                    {isOpen && (
                      <tr className="border-b border-border bg-surface-2">
                        <td colSpan={cols.length} className="px-2.5 pb-2.5 pt-0.5">
                          <Payload row={r} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <footer className="mt-auto flex items-center justify-between gap-3 px-3 py-2 border-t border-border">
        <p className="text-2xs text-ink-faint">
          {rows.length === 0 ? (
            'No matching rows'
          ) : (
            <>
              <span className="text-ink-muted tnum">
                {safePage * PAGE + 1}–{Math.min((safePage + 1) * PAGE, rows.length)}
              </span>{' '}
              of <span className="text-ink-muted tnum">{thousands(rows.length)}</span> matching
            </>
          )}
        </p>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            disabled={safePage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft size={ICON_SM} strokeWidth={STROKE} aria-hidden />
          </Button>
          <span className="px-1 text-2xs text-ink-faint tnum">
            {safePage + 1} / {pages}
          </span>
          <Button
            size="icon"
            variant="ghost"
            disabled={safePage >= pages - 1}
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            aria-label="Next page"
          >
            <ChevronRight size={ICON_SM} strokeWidth={STROKE} aria-hidden />
          </Button>
        </div>
      </footer>
    </section>
  );
}

function Key({ k, children }) {
  return (
    <span className="inline-flex items-center gap-1">
      <kbd className="rounded-[3px] border border-border bg-surface px-1 font-mono text-3xs text-ink-muted">{k}</kbd>
      {children}
    </span>
  );
}

function Cell({ col, row }) {
  switch (col.key) {
    case 'name':
      return <span className="font-mono text-2xs text-ink">{row.name}</span>;
    case 'status':
      return <StatusChip status={row.status} />;
    case 'reason':
      return row.reason ? (
        <span className="text-2xs text-ink-faint">{row.reason}</span>
      ) : (
        <span className="text-2xs text-ink-dim">—</span>
      );
    case 'sdk':
      return (
        <span className={`font-mono text-2xs tnum ${row.sdk.startsWith('4') ? 'text-ink-muted' : 'text-ink-faint'}`}>
          {row.sdk}
        </span>
      );
    case 'region':
      return <span className="font-mono text-2xs text-ink-faint">{row.region}</span>;
    case 'distinctId':
      return <span className="font-mono text-2xs text-ink-faint">{row.distinctId}</span>;
    case 'count':
      return <span className="text-2xs text-ink-muted tnum">{row.count}</span>;
    case 'at':
      return (
        <span className="text-2xs text-ink-faint tnum" title={utcFull(row.at)}>
          {since(row.at)}
        </span>
      );
    default:
      return <span className="text-2xs text-ink-muted">{row[col.key]}</span>;
  }
}

function Payload({ row }) {
  const body = {
    event: row.name,
    distinct_id: row.distinctId,
    received_at: row.at.toISOString(),
    properties: {
      $source: row.source,
      $sdk_version: row.sdk,
      $region: row.region,
      ...(row.name.startsWith('checkout') || row.name.startsWith('payment')
        ? { cartId: 'crt_8f2ad1', revenue: 42.5, currency: 'USD' }
        : { path: '/pricing', referrer: 'google.com' }),
    },
  };
  return (
    <div className="rounded-control border border-border bg-canvas p-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-1.5">
        <span className="font-mono text-3xs text-ink-faint">{row.id}</span>
        <span className="font-mono text-3xs text-ink-faint tnum">{utcClock(row.at)} UTC</span>
      </div>
      {row.reason && (
        <p className="mb-1.5 rounded-[3px] bg-error-wash px-1.5 py-1 font-mono text-3xs text-error">
          {row.status}: {row.reason}
        </p>
      )}
      <pre className="overflow-x-auto font-mono text-3xs leading-[1.6] text-ink-muted">
        {JSON.stringify(body, null, 2)}
      </pre>
    </div>
  );
}

// Скелетон повторяет форму таблицы, чтобы разметка не прыгала.
function StreamSkeleton({ cols }) {
  const widths = ['62%', '48%', '78%', '54%', '40%', '58%', '34%', '44%'];
  return (
    <div className="px-3 py-2" aria-busy="true" aria-label="Loading events">
      <div className="flex gap-2.5 border-b border-border pb-2">
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonLine key={i} w={`${100 / cols}%`} h={7} />
        ))}
      </div>
      {Array.from({ length: 10 }).map((_, r) => (
        <div key={r} className="flex items-center gap-2.5 border-b border-border py-[9px] last:border-b-0">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} style={{ width: `${100 / cols}%` }}>
              <SkeletonLine w={widths[(r + c) % widths.length]} h={9} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Пустой результат называет активный фильтр и даёт способ его сбросить.
function EmptyResult({ view, query, onReset }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-surface-3 text-ink-faint">
        <SearchX size={17} strokeWidth={STROKE} aria-hidden />
      </div>
      <p className="mt-3 text-sm font-medium text-ink">No events match this filter</p>
      <p className="mt-1 max-w-[46ch] text-2xs text-ink-faint">
        The view <span className="text-ink-muted">{view.label}</span>
        {query && (
          <>
            {' '}
            plus the search <span className="font-mono text-ink-muted">{query}</span>
          </>
        )}{' '}
        matched nothing in the last 72 hours. Saved views filter the raw stream, so an empty result
        usually means the events genuinely stopped arriving — which is itself worth knowing.
      </p>
      <div className="mt-3 flex items-center gap-2">
        <Button size="sm" variant="primary" onClick={onReset}>
          <RotateCcw size={ICON_SM} strokeWidth={STROKE} aria-hidden />
          Show all events
        </Button>
      </div>
    </div>
  );
}
