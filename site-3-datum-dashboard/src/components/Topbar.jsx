import { useEffect, useRef, useState } from 'react';
import { Calendar, Check, ChevronDown, Command, LogOut, Menu, Search, UserCog } from 'lucide-react';
import { Button, PopItem, PopLabel, PopSeparator, Popover, StatusText } from './ui.jsx';
import { CONTROL, ICON, ICON_SM, STROKE } from '../lib/tokens.js';
import { PROJECTS } from '../data/mockData.js';

// Период задаётся здесь и распространяется на все блоки ниже, а не отдельно
// у каждого графика.

const RANGES = [
  { id: '1h', label: 'Last hour', hint: '60 buckets, 1m' },
  { id: '6h', label: 'Last 6 hours', hint: '72 buckets, 5m' },
  { id: '24h', label: 'Last 24 hours', hint: '24 buckets, 1h' },
  { id: '72h', label: 'Last 72 hours', hint: '72 buckets, 1h' },
  { id: '7d', label: 'Last 7 days', hint: '7 buckets, 1d' },
  { id: 'release', label: 'Since 2026.7.3', hint: 'Wed 14:10 → now', pinned: true },
];

export default function Topbar({ onOpenNav, range, onRangeChange, project, onProjectChange }) {
  const searchRef = useRef(null);
  const [hint, setHint] = useState(true);

  // «/» ставит фокус в поиск.
  useEffect(() => {
    function onKey(e) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t instanceof HTMLElement && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable))
        return;
      e.preventDefault();
      searchRef.current?.focus();
      setHint(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const activeRange = RANGES.find((r) => r.id === range) ?? RANGES[3];
  const activeProject = PROJECTS.find((p) => p.id === project) ?? PROJECTS[0];

  return (
    <header
      className="sticky top-0 flex h-12 shrink-0 items-center gap-2 border-b border-border bg-surface px-2 lg:px-3"
      style={{ zIndex: 'var(--z-sticky)' }}
    >
      {/* Зона нажатия 44x44 набирается отрицательным отступом, чтобы не
          растягивать ряд контролов высотой 32px. */}
      <Button
        size="icon-md"
        variant="ghost"
        onClick={onOpenNav}
        aria-label="Open navigation"
        className="lg:hidden relative before:absolute before:-inset-1.5 before:content-['']"
      >
        <Menu size={ICON} strokeWidth={STROKE} aria-hidden />
      </Button>

      <Popover
        label="Switch project"
        width={244}
        trigger={({ ref, open, ...p }) => (
          <button
            ref={ref}
            type="button"
            {...p}
            className={`flex h-8 items-center gap-1.5 rounded-control px-2 text-sm font-medium text-ink transition-colors duration-[--dur-fast] ${
              open ? 'bg-surface-3' : 'hover:bg-surface-3'
            }`}
          >
            <span
              aria-hidden
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                activeProject.health === 'operational' ? 'bg-success' : 'bg-warning'
              }`}
            />
            <span className="max-w-[92px] truncate sm:max-w-none">{activeProject.name}</span>
            <ChevronDown
              size={ICON_SM}
              strokeWidth={STROKE}
              aria-hidden
              className={`text-ink-faint transition-transform duration-[--dur-fast] ${open ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      >
        {({ close }) => (
          <>
            <PopLabel>Projects</PopLabel>
            {PROJECTS.map((p) => (
              <PopItem
                key={p.id}
                selected={p.id === project}
                onClick={() => {
                  onProjectChange(p.id);
                  close();
                }}
              >
                <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                  {p.id === project && <Check size={11} strokeWidth={2.5} className="text-accent-text" aria-hidden />}
                </span>
                <span className="min-w-0 flex-1 truncate">{p.name}</span>
                <StatusText status={p.status ?? p.health} label="" className="shrink-0" />
              </PopItem>
            ))}
          </>
        )}
      </Popover>

      <div aria-hidden className="hidden h-5 w-px bg-border sm:block" />

      <div className="relative min-w-0 flex-1 sm:max-w-sm">
        <Search
          size={ICON_SM}
          strokeWidth={STROKE}
          aria-hidden
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          ref={searchRef}
          type="search"
          aria-label="Search events, properties and cohorts"
          placeholder="Search events, properties, cohorts…"
          onFocus={() => setHint(false)}
          onBlur={() => setHint(true)}
          className={`${CONTROL} w-full pl-8 pr-9`}
        />
        {hint && (
          <kbd
            aria-hidden
            className="pointer-events-none absolute right-2 top-1/2 hidden h-5 -translate-y-1/2 items-center rounded-[3px] border border-border bg-surface px-1.5 font-mono text-3xs text-ink-faint sm:flex"
          >
            /
          </kbd>
        )}
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Popover
          label="Time range"
          width={232}
          align="end"
          trigger={({ ref, open, ...p }) => (
            <button
              ref={ref}
              type="button"
              {...p}
              className={`flex h-8 items-center gap-1.5 rounded-control border px-2 text-sm font-medium transition-colors duration-[--dur-fast] ${
                open
                  ? 'border-border-strong bg-surface-3 text-ink'
                  : 'border-border bg-surface-2 text-ink-muted hover:bg-surface-3 hover:text-ink'
              }`}
            >
              <Calendar size={ICON_SM} strokeWidth={STROKE} aria-hidden className="text-ink-faint" />
              <span className="whitespace-nowrap">{activeRange.label}</span>
              <ChevronDown
                size={ICON_SM}
                strokeWidth={STROKE}
                aria-hidden
                className={`text-ink-faint transition-transform duration-[--dur-fast] ${open ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        >
          {({ close }) => (
            <>
              {RANGES.map((r) => (
                <PopItem
                  key={r.id}
                  selected={r.id === range}
                  onClick={() => {
                    onRangeChange(r.id);
                    close();
                  }}
                  className={r.pinned ? 'border-t border-border mt-1 pt-2' : undefined}
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                    {r.id === range && <Check size={13} strokeWidth={2.5} className="text-accent-text" aria-hidden />}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{r.label}</span>
                  <span className="shrink-0 font-mono text-3xs text-ink-faint">{r.hint}</span>
                </PopItem>
              ))}
              <PopSeparator />
              <PopItem>
                <span className="w-4" />
                Custom range…
              </PopItem>
            </>
          )}
        </Popover>

        <div aria-hidden className="hidden h-5 w-px bg-border sm:block" />

        <Popover
          label="Account"
          width={216}
          align="end"
          trigger={({ ref, open, ...p }) => (
            <button
              ref={ref}
              type="button"
              {...p}
              aria-label="Account menu"
              className={`flex h-8 items-center gap-1 rounded-control pl-0.5 pr-1 transition-colors duration-[--dur-fast] ${
                open ? 'bg-surface-3' : 'hover:bg-surface-3'
              }`}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-4 text-2xs font-semibold text-ink-muted">
                MK
              </span>
              <ChevronDown size={ICON_SM} strokeWidth={STROKE} aria-hidden className="hidden text-ink-faint sm:block" />
            </button>
          )}
        >
          {() => (
            <>
              <div className="px-2.5 pb-1.5 pt-1">
                <p className="truncate text-sm font-medium text-ink">Maya Kessler</p>
                <p className="truncate text-2xs text-ink-faint">maya@datum.dev · Engineering</p>
              </div>
              <PopSeparator />
              <PopItem>
                <UserCog size={ICON_SM} strokeWidth={STROKE} aria-hidden />
                Workspace settings
              </PopItem>
              <PopItem>
                <Command size={ICON_SM} strokeWidth={STROKE} aria-hidden />
                Keyboard shortcuts
              </PopItem>
              <PopSeparator />
              <PopItem tone="danger">
                <LogOut size={ICON_SM} strokeWidth={STROKE} aria-hidden />
                Sign out
              </PopItem>
            </>
          )}
        </Popover>
      </div>
    </header>
  );
}
