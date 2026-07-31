import { useEffect, useRef } from 'react';
import {
  Activity,
  Braces,
  Boxes,
  FlaskConical,
  GitCompareArrows,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Siren,
  Users,
  X,
} from 'lucide-react';
import { ICON, STROKE } from '../lib/tokens.js';

// Меню сгруппировано по задачам: следить, разбираться, проверять разметку.
const GROUPS = [
  {
    label: 'Monitor',
    items: [
      { id: 'pulse', label: 'Pulse', icon: Activity, hint: 'Live health + anomalies' },
      { id: 'alerts', label: 'Alerts', icon: Siren, badge: 2, badgeTone: 'error', hint: '2 firing' },
    ],
  },
  {
    label: 'Explore',
    items: [
      { id: 'journeys', label: 'Journeys', icon: GitCompareArrows, hint: 'Funnels + paths' },
      { id: 'cohorts', label: 'Cohorts', icon: Users, hint: 'Retention + segments' },
      { id: 'experiments', label: 'Experiments', icon: FlaskConical, hint: 'Running tests' },
    ],
  },
  {
    label: 'Instrument',
    items: [
      { id: 'schema', label: 'Schema', icon: Braces, badge: 1, badgeTone: 'warning', hint: '1 contract broken' },
      { id: 'sources', label: 'Sources', icon: Boxes, hint: 'SDKs + integrations' },
    ],
  },
];

const BADGE_TONE = {
  error: 'bg-error-wash text-error',
  warning: 'bg-warning-wash text-warning',
};

export default function Sidebar({ collapsed, onToggleCollapse, active, onNavigate, mobileOpen, onCloseMobile }) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const el = drawerRef.current;
    const focusables = () =>
      [...(el?.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])') ?? [])].filter(
        (n) => n.offsetParent !== null,
      );
    // Фокус ставим на первый ВИДИМЫЙ контрол: кнопки свернуть/развернуть есть
    // в DOM и на мобильных, но с display:none, и .focus() на них молча ничего
    // не делает. Два rAF — чтобы панель успела доехать.
    requestAnimationFrame(() => requestAnimationFrame(() => focusables()[0]?.focus()));

    function onKey(e) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseMobile();
      } else if (e.key === 'Tab') {
        const list = focusables();
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [mobileOpen, onCloseMobile]);

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          aria-hidden
          className="fixed inset-0 bg-black/65 lg:hidden"
          style={{ zIndex: 'var(--z-scrim)' }}
        />
      )}

      <aside
        ref={drawerRef}
        aria-label="Primary"
        aria-modal={mobileOpen ? 'true' : undefined}
        role={mobileOpen ? 'dialog' : undefined}
        style={{ zIndex: mobileOpen ? 'var(--z-drawer)' : undefined }}
        className={`fixed inset-y-0 left-0 flex shrink-0 flex-col border-r border-border bg-surface
          transition-[width,transform] duration-[--dur-slow] ease-[--ease-out]
          lg:static lg:z-auto lg:translate-x-0
          ${collapsed ? 'w-[56px]' : 'w-[212px]'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div
          className={`flex h-12 shrink-0 items-center border-b border-border ${
            collapsed ? 'justify-center px-0' : 'justify-between pl-3 pr-2'
          }`}
        >
          <span className="flex min-w-0 items-center gap-2">
            <Mark />
            {!collapsed && (
              <span className="truncate text-sm font-semibold tracking-[-0.01em] text-ink">Datum</span>
            )}
          </span>
          {!collapsed && (
            <>
              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label="Collapse sidebar"
                className="hidden h-7 w-7 place-items-center rounded-control text-ink-faint transition-colors duration-[--dur-fast] hover:bg-surface-3 hover:text-ink lg:grid"
              >
                <PanelLeftClose size={ICON} strokeWidth={STROKE} aria-hidden />
              </button>
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close navigation"
                className="grid h-7 w-7 place-items-center rounded-control text-ink-faint transition-colors duration-[--dur-fast] hover:bg-surface-3 hover:text-ink lg:hidden"
              >
                <X size={ICON} strokeWidth={STROKE} aria-hidden />
              </button>
            </>
          )}
        </div>

        {collapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="mx-auto mt-2 hidden h-7 w-7 place-items-center rounded-control text-ink-faint transition-colors duration-[--dur-fast] hover:bg-surface-3 hover:text-ink lg:grid"
          >
            <PanelLeftOpen size={ICON} strokeWidth={STROKE} aria-hidden />
          </button>
        )}

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-2.5">
          {GROUPS.map((group) => (
            <div key={group.label} className="mb-3 last:mb-0">
              {!collapsed ? (
                <p className="px-2 pb-1 text-3xs font-semibold uppercase tracking-[0.07em] text-ink-faint">
                  {group.label}
                </p>
              ) : (
                <div className="mx-auto mb-1.5 h-px w-5 bg-border" aria-hidden />
              )}
              <ul>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const on = active === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate(item.id)}
                        aria-current={on ? 'page' : undefined}
                        title={collapsed ? `${item.label} — ${item.hint}` : item.hint}
                        className={`relative flex w-full items-center gap-2 rounded-control px-2 py-[6px] text-sm
                          transition-colors duration-[--dur-fast]
                          ${collapsed ? 'justify-center' : ''}
                          ${
                            on
                              ? 'bg-surface-4 font-medium text-ink'
                              : 'text-ink-muted hover:bg-surface-3 hover:text-ink'
                          }`}
                      >
                        {on && (
                          <span
                            aria-hidden
                            className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-accent"
                          />
                        )}
                        <Icon
                          size={ICON}
                          strokeWidth={STROKE}
                          aria-hidden
                          className={`shrink-0 ${on ? 'text-accent-text' : ''}`}
                        />
                        {!collapsed && <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>}
                        {item.badge != null &&
                          (collapsed ? (
                            <span
                              aria-hidden
                              className={`absolute right-1 top-1 h-1.5 w-1.5 rounded-full ${
                                item.badgeTone === 'error' ? 'bg-error' : 'bg-warning'
                              }`}
                            />
                          ) : (
                            <span
                              className={`grid h-[17px] min-w-[17px] shrink-0 place-items-center rounded-full px-1 text-3xs font-medium tnum ${
                                BADGE_TONE[item.badgeTone]
                              }`}
                            >
                              {item.badge}
                            </span>
                          ))}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-border p-2">
          <button
            type="button"
            title={collapsed ? 'Settings' : undefined}
            className={`flex w-full items-center gap-2 rounded-control px-2 py-[6px] text-sm text-ink-muted transition-colors duration-[--dur-fast] hover:bg-surface-3 hover:text-ink ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <Settings size={ICON} strokeWidth={STROKE} aria-hidden className="shrink-0" />
            {!collapsed && <span>Settings</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

// Обводка 1.5px — как у иконок lucide рядом, иначе знак выбивается по весу.
function Mark() {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[5px] bg-accent text-accent-on">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M4.6 2.2H3.1a.9.9 0 0 0-.9.9v7.8a.9.9 0 0 0 .9.9h1.5M9.4 2.2h1.5a.9.9 0 0 1 .9.9v7.8a.9.9 0 0 1-.9.9H9.4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="7" cy="7" r="1.6" fill="currentColor" />
      </svg>
    </span>
  );
}
