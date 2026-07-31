import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';
import { Delta, SkeletonLine } from './ui.jsx';
import { VITALS } from '../data/mockData.js';
import { describeDelta, vitalValue } from '../lib/format.js';

// Одна полоса, разделённая волосяными линиями, а не четыре карточки. Первая
// ячейка — главное число, остальные мельче.
export default function VitalsStrip({ loading = false }) {
  return (
    <section
      aria-label="Pipeline vitals, last 24 hours"
      className="grid grid-cols-2 rounded-panel border border-border bg-surface
                 lg:grid-cols-[1.35fr_1fr_1fr_1fr]
                 divide-x divide-y divide-border lg:divide-y-0
                 [&>*]:border-0"
    >
      {VITALS.map((v, i) => (
        <Cell key={v.id} vital={v} hero={i === 0} loading={loading} />
      ))}
    </section>
  );
}

function Cell({ vital, hero, loading }) {
  const delta = describeDelta(vital);

  if (loading) {
    // Скелетон повторяет форму содержимого, чтобы не сдвигать разметку.
    return (
      <div className="border-r border-b border-border p-3 last:border-r-0">
        <SkeletonLine w={hero ? 104 : 88} h={9} />
        <SkeletonLine w={hero ? 126 : 74} h={hero ? 26 : 18} className="mt-2.5" />
        <SkeletonLine w={96} h={8} className="mt-2.5" />
        <SkeletonLine w="100%" h={hero ? 26 : 18} className="mt-3" />
      </div>
    );
  }

  return (
    <div className="relative flex min-w-0 flex-col border-r border-b border-border p-3 last:border-r-0">
      <div className="flex items-start justify-between gap-2">
        <p
          className={`min-w-0 truncate text-2xs ${
            // Ключ события — код, значит моно; человеческое название — нет.
            vital.label.includes('_') ? 'font-mono text-ink-muted' : 'font-medium text-ink-muted'
          }`}
        >
          {vital.label}
        </p>
      </div>

      <div className="mt-1.5 flex items-baseline gap-2">
        {/* У крупного числа пропорциональные цифры: табличные на большом
            кегле выглядят разреженными. Мелкие ячейки — табличные, они стоят
            в ряд. */}
        <span
          className={`font-semibold tracking-[-0.015em] text-ink ${
            hero ? 'text-2xl pnum' : 'text-lg tnum'
          }`}
        >
          {vitalValue(vital)}
        </span>
        <Delta delta={delta} />
      </div>

      <p className="mt-1 text-2xs text-ink-faint">{vital.comparison}</p>

      {vital.caveat && (
        <p className="mt-1.5 flex items-start gap-1 text-3xs text-warning">
          <Info size={10} strokeWidth={2} className="mt-[2px] shrink-0" aria-hidden />
          <span>{vital.caveat}</span>
        </p>
      )}

      <div className={`mt-auto pt-2.5 ${hero ? 'h-9' : 'h-7'}`} aria-hidden>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={vital.spark.map((y, i) => ({ i, y }))}
            margin={{ top: 2, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id={`spark-${vital.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-series)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--color-series)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="y"
              stroke="var(--color-series)"
              strokeWidth={1.5}
              fill={`url(#spark-${vital.id})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
