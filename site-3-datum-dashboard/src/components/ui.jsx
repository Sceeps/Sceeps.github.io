// Общие примитивы интерфейса. Не-компонентные константы — в ../lib/tokens.js,
// иначе ломается Fast Refresh.
import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, ArrowUp, Loader2, Minus } from 'lucide-react';
import { ICON_SM, STATUS, TONE_CHIP, TONE_TEXT } from '../lib/tokens.js';

const cx = (...xs) => xs.filter(Boolean).join(' ');

// Button

const BTN_BASE =
  'inline-flex items-center justify-center gap-1.5 shrink-0 rounded-control font-medium ' +
  'whitespace-nowrap select-none transition-colors duration-[--dur-fast] ' +
  'disabled:pointer-events-none disabled:opacity-45';

const BTN_VARIANT = {
  primary: 'bg-accent text-accent-on hover:bg-accent-hover active:bg-accent-active',
  secondary:
    'bg-surface-2 text-ink-muted border border-border hover:text-ink hover:bg-surface-3 hover:border-border-strong active:bg-surface-4',
  ghost: 'text-ink-faint hover:text-ink hover:bg-surface-3 active:bg-surface-4',
  danger:
    'bg-surface-2 text-error border border-error/35 hover:bg-error-wash hover:border-error/60 active:bg-error-wash',
};

const BTN_SIZE = {
  sm: 'h-7 px-2 text-2xs',
  md: 'h-8 px-2.5 text-sm',
  icon: 'h-7 w-7 p-0',
  'icon-md': 'h-8 w-8 p-0',
};

export const Button = forwardRef(function Button(
  { variant = 'secondary', size = 'md', loading = false, children, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      {...rest}
      aria-busy={loading || undefined}
      className={cx(BTN_BASE, BTN_VARIANT[variant], BTN_SIZE[size], className)}
    >
      {loading && <Loader2 size={ICON_SM} strokeWidth={2} className="animate-spin" />}
      {children}
    </button>
  );
});

// Обёртка, которая показывает причину блокировки контрола.
export function DisabledReason({ reason, children }) {
  return (
    <span className="inline-flex" title={reason} aria-label={reason}>
      {children}
    </span>
  );
}

// Panel

// bodyHeight обязателен для панелей с графиком: ResponsiveContainer из
// recharts измеряет родителя, и без явной высоты график схлопывается в 0px.
export function Panel({
  title,
  meta,
  aside,
  bodyHeight,
  padded = true,
  footer,
  className,
  headerClassName,
  children,
  ...rest
}) {
  return (
    <section
      {...rest}
      className={cx('flex flex-col min-w-0 rounded-panel border border-border bg-surface', className)}
    >
      {(title || aside) && (
        <header
          className={cx(
            'flex items-start justify-between gap-3 px-3 pt-2.5 pb-2 min-w-0',
            headerClassName,
          )}
        >
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-ink tracking-[-0.005em] truncate">{title}</h2>
            {meta && <p className="mt-0.5 text-2xs text-ink-faint">{meta}</p>}
          </div>
          {aside && <div className="flex items-center gap-1.5 shrink-0">{aside}</div>}
        </header>
      )}
      <div
        className={cx('min-w-0', padded ? 'px-3 pb-3' : '', bodyHeight ? '' : 'flex-1')}
        style={bodyHeight ? { height: bodyHeight } : undefined}
      >
        {children}
      </div>
      {footer && (
        <footer className="mt-auto flex items-center justify-between gap-3 px-3 py-2 border-t border-border">
          {footer}
        </footer>
      )}
    </section>
  );
}

// Status

export function StatusChip({ status, label, className }) {
  const s = STATUS[status] ?? STATUS.info;
  const Icon = s.icon;
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 h-[18px] px-1.5 rounded-chip text-2xs font-medium',
        TONE_CHIP[s.tone],
        className,
      )}
    >
      <Icon size={10} strokeWidth={2.25} className={cx('shrink-0', s.spin && 'animate-spin')} aria-hidden />
      {label ?? s.label}
    </span>
  );
}

export function StatusText({ status, label, className }) {
  const s = STATUS[status] ?? STATUS.info;
  const Icon = s.icon;
  return (
    <span className={cx('inline-flex items-center gap-1.5 text-xs font-medium', TONE_TEXT[s.tone], className)}>
      <Icon size={ICON_SM} strokeWidth={2} className={cx('shrink-0', s.spin && 'animate-spin')} aria-hidden />
      {label ?? s.label}
    </span>
  );
}

// Delta

const DELTA_TONE = {
  good: 'text-success',
  bad: 'text-error',
  flat: 'text-ink-faint',
};
const GLYPH = { up: ArrowUp, down: ArrowDown, flat: Minus };

// Направление передают стрелка, знак и цвет — три канала, не один.
export function Delta({ delta, className }) {
  const Icon = GLYPH[delta.glyph];
  return (
    <span
      className={cx('inline-flex items-center gap-0.5 text-2xs font-medium tnum', DELTA_TONE[delta.tone], className)}
    >
      <Icon size={10} strokeWidth={2.75} className="shrink-0" aria-hidden />
      <span aria-label={delta.aria}>{delta.text}</span>
    </span>
  );
}

// Skeletons

export function SkeletonLine({ w = '100%', h = 10, className }) {
  return <div className={cx('skeleton', className)} style={{ width: w, height: h }} />;
}

// Popover

// Рендерится в <body> через портал, иначе его обрезает любой родитель с
// overflow. Позиция fixed, с переворотом у края экрана.
export function Popover({ trigger, children, align = 'start', width = 224, label }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const id = useId();

  const place = () => {
    const t = triggerRef.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    const w = Math.min(width, window.innerWidth - 16);
    let left = align === 'end' ? r.right - w : r.left;
    left = Math.max(8, Math.min(left, window.innerWidth - w - 8));
    const below = window.innerHeight - r.bottom;
    setPos({
      left,
      width: w,
      top: below > 240 || r.top < 240 ? r.bottom + 6 : undefined,
      bottom: below > 240 || r.top < 240 ? undefined : window.innerHeight - r.top + 6,
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    place();
    const onScrollResize = () => place();
    window.addEventListener('resize', onScrollResize);
    window.addEventListener('scroll', onScrollResize, true);
    return () => {
      window.removeEventListener('resize', onScrollResize);
      window.removeEventListener('scroll', onScrollResize, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const items = () =>
      [...(panelRef.current?.querySelectorAll('[data-pop-item]:not([disabled])') ?? [])];

    const first = items()[0];
    first?.focus();

    function onKey(e) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === 'Tab') {
        setOpen(false);
        return;
      }
      const list = items();
      if (!list.length) return;
      const i = list.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        list[(i + 1 + list.length) % list.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        list[(i - 1 + list.length) % list.length].focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        list[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        list[list.length - 1].focus();
      }
    }
    function onDown(e) {
      if (panelRef.current?.contains(e.target) || triggerRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', onDown, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('pointerdown', onDown, true);
    };
  }, [open]);

  return (
    <>
      {trigger({
        ref: triggerRef,
        onClick: () => setOpen((o) => !o),
        'aria-expanded': open,
        'aria-haspopup': 'menu',
        'aria-controls': open ? id : undefined,
        open,
      })}
      {open &&
        pos &&
        createPortal(
          <div
            ref={panelRef}
            id={id}
            role="menu"
            aria-label={label}
            style={{
              position: 'fixed',
              left: pos.left,
              top: pos.top,
              bottom: pos.bottom,
              width: pos.width,
              zIndex: 'var(--z-popover)',
            }}
            className="rounded-panel border border-border-strong bg-surface-2 shadow-popover py-1 overflow-hidden"
          >
            {children({ close: () => { setOpen(false); triggerRef.current?.focus(); } })}
          </div>,
          document.body,
        )}
    </>
  );
}

export function PopItem({ selected, tone, children, className, ...rest }) {
  return (
    <button
      type="button"
      role="menuitem"
      data-pop-item=""
      {...rest}
      className={cx(
        'flex items-center gap-2 w-full px-2.5 py-1.5 text-left text-sm',
        'transition-colors duration-[--dur-fast]',
        selected ? 'text-ink font-medium bg-surface-3' : 'text-ink-muted hover:text-ink hover:bg-surface-3',
        tone === 'danger' && 'text-error hover:text-error hover:bg-error-wash',
        'disabled:opacity-45 disabled:pointer-events-none',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function PopSeparator() {
  return <div role="separator" className="my-1 h-px bg-border" />;
}

export function PopLabel({ children }) {
  return <p className="px-2.5 pt-1 pb-1 text-3xs font-semibold tracking-[0.06em] uppercase text-ink-faint">{children}</p>;
}


