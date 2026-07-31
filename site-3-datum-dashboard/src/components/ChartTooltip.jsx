// Один тултип на все графики. Всё, что он показывает, есть и в таблице под
// графиком, — за тултипом ничего не спрятано.
export default function ChartTooltip({ active, payload, label, heading, rows, footer }) {
  if (!active || !payload || payload.length === 0) return null;

  const point = payload[0]?.payload;
  const lines = rows
    ? rows(point, payload)
    : payload.map((p) => ({
        key: p.dataKey,
        name: p.name,
        color: p.color ?? p.stroke ?? p.fill,
        value: p.value?.toLocaleString('en-US'),
      }));

  return (
    <div
      className="pointer-events-none min-w-[164px] max-w-[252px] rounded-control border border-border-strong bg-surface-2 px-2.5 py-2 shadow-popover"
      style={{ zIndex: 'var(--z-tooltip)' }}
    >
      <p className="text-2xs font-medium text-ink-muted">{heading ? heading(point) : label}</p>
      <div className="mt-1.5 space-y-1">
        {lines.map((l) => (
          <div key={l.key} className="flex items-baseline justify-between gap-3">
            <span className="flex items-center gap-1.5 min-w-0 text-2xs text-ink-faint">
              {l.color && (
                <span
                  aria-hidden
                  className="h-[2px] w-2.5 shrink-0 rounded-full"
                  style={{ background: l.color }}
                />
              )}
              <span className="truncate">{l.name}</span>
            </span>
            <span className="shrink-0 text-xs font-medium text-ink tnum">{l.value}</span>
          </div>
        ))}
      </div>
      {footer && point && (
        <p className="mt-1.5 pt-1.5 border-t border-border text-3xs text-ink-faint">{footer(point)}</p>
      )}
    </div>
  );
}
