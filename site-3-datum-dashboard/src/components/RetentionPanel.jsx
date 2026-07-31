import { useMemo } from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Panel } from './ui.jsx';
import ChartTooltip from './ChartTooltip.jsx';
import { RETENTION } from '../data/mockData.js';
import { thousands } from '../lib/format.js';

// Ось X числовая, а не категориальная: иначе промежуток d21→d28 нарисуется
// таким же, как d0→d1, и кривая спада выйдет ложной.
export default function RetentionPanel() {
  const data = useMemo(() => RETENTION.days, []);

  return (
    <Panel
      title="Retention"
      meta={`${RETENTION.cohort} · ${thousands(RETENTION.size)} users`}
      bodyHeight={188}
    >
      <div className="h-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          {/* Правый margin — под подпись плато, нижний — под ось, чтобы она
              осталась внутри контейнера. */}
          <LineChart data={data} margin={{ top: 12, right: 10, bottom: 4, left: 0 }}>
            <CartesianGrid stroke="var(--color-chart-grid)" vertical={false} />
            <XAxis
              dataKey="day"
              type="number"
              domain={[0, 28]}
              ticks={[0, 7, 14, 21, 28]}
              axisLine={{ stroke: 'var(--color-border)' }}
              tickLine={false}
              tickMargin={6}
              height={22}
              tick={{ fill: 'var(--color-ink-faint)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
              tickFormatter={(d) => `d${d}`}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              axisLine={false}
              tickLine={false}
              // Хватает на "100%" в моно 11px; уже — засечка обрезается.
              width={38}
              tick={{ fill: 'var(--color-ink-faint)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
              tickFormatter={(v) => `${v}%`}
            />
            <ReferenceLine
              y={RETENTION.plateau}
              stroke="var(--color-chart-annot)"
              strokeDasharray="3 3"
              strokeWidth={1}
              label={{
                value: `plateau ${RETENTION.plateau}%`,
                // insideTopRight, а не 'right': внешняя подпись на этой ширине
                // вылезает за SVG и обрезается.
                position: 'insideTopRight',
                fill: 'var(--color-ink-faint)',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                offset: 6,
              }}
            />
            <Tooltip
              cursor={{ stroke: 'var(--color-border-strong)', strokeWidth: 1 }}
              content={
                <ChartTooltip
                  heading={(p) => (p ? `Day ${p.day}` : '')}
                  rows={(p) =>
                    p
                      ? [
                          {
                            key: 'pct',
                            name: 'Still active',
                            color: 'var(--color-series)',
                            value: `${p.pct}%`,
                          },
                          {
                            key: 'users',
                            name: 'Users',
                            value: thousands(Math.round((p.pct / 100) * RETENTION.size)),
                          },
                        ]
                      : []
                  }
                />
              }
            />
            <Line
              type="monotone"
              dataKey="pct"
              name="Still active"
              stroke="var(--color-series)"
              strokeWidth={2}
              strokeLinecap="round"
              dot={{ r: 2.5, fill: 'var(--color-series)', stroke: 'var(--color-surface)', strokeWidth: 2 }}
              activeDot={{ r: 4.5, fill: 'var(--color-series)', stroke: 'var(--color-surface)', strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-2xs text-ink-faint">{RETENTION.benchmark}</p>
    </Panel>
  );
}
