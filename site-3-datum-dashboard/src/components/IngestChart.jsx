import { useMemo, useState } from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Table2, LineChart as LineChartIcon } from 'lucide-react';
import { Panel } from './ui.jsx';
import { ICON_SM, STROKE } from '../lib/tokens.js';
import ChartTooltip from './ChartTooltip.jsx';
import { INGEST_HOURLY } from '../data/mockData.js';
import { compact, thousands } from '../lib/format.js';

// Поток по часам за 72 часа. Шаг часовой, потому что четырёхчасовой инцидент
// в суточных корзинах не виден. Обе серии — одна и та же величина, поэтому
// ось Y общая.

const RELEASE_BUCKET = '14:00';
const RELEASE_DAY = 'Jul 29';
const HOTFIX_BUCKET = '06:00';
const HOTFIX_DAY = 'Jul 30';

export default function IngestChart() {
  const [view, setView] = useState('chart');
  const data = useMemo(() => INGEST_HOURLY, []);

  // Ключ по индексу, а не по времени: за три дня "14:00" встречается трижды.
  const indexed = useMemo(() => data.map((d, i) => ({ ...d, i })), [data]);

  const releaseIdx = indexed.findIndex((d) => d.dayLabel === RELEASE_DAY && d.label === RELEASE_BUCKET);
  const hotfixIdx = indexed.findIndex((d) => d.dayLabel === HOTFIX_DAY && d.label === HOTFIX_BUCKET);
  const incidentFrom = indexed.findIndex((d) => d.dayLabel === 'Jul 30' && d.label === '02:00');
  const incidentTo = indexed.findIndex((d) => d.dayLabel === 'Jul 30' && d.label === '06:00');
  const lastIdx = indexed.length - 1;

  // Засечка каждые 6 часов, в полночь вместо времени — название дня.
  const ticks = indexed.filter((d) => d.hour % 6 === 0).map((d) => d.i);

  const peak = useMemo(
    () => indexed.reduce((m, d) => (!d.partial && d.events > m.events ? d : m), indexed[0]),
    [indexed],
  );

  return (
    <Panel
      title="Ingest volume"
      meta="Events per hour · last 72h, UTC · gray = same hour averaged over 4 prior weeks"
      bodyHeight={view === 'chart' ? 264 : undefined}
      aside={
        <div className="flex items-center gap-1 rounded-control border border-border bg-surface-2 p-0.5">
          <ViewToggle active={view === 'chart'} onClick={() => setView('chart')} icon={LineChartIcon} label="Chart" />
          <ViewToggle active={view === 'table'} onClick={() => setView('table')} icon={Table2} label="Table" />
        </div>
      }
    >
      {view === 'chart' ? (
        <>
          <Legend peak={peak} />
          <div className="h-[calc(100%-26px)] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              {/* Нижний margin держит ось внутри контейнера, иначе у карточки
                  появляется собственный скроллбар. */}
              <ComposedChart data={indexed} margin={{ top: 16, right: 8, bottom: 4, left: 0 }}>
                <defs>
                  <linearGradient id="ingestWash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-series)" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="var(--color-series)" stopOpacity={0} />
                  </linearGradient>
                  {/* Неполный час штрихуем, а не подкрашиваем: штриховка
                      выживает в grayscale и forced-colors. */}
                  <pattern id="partialHatch" width={5} height={5} patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <rect width={5} height={5} fill="var(--color-surface)" />
                    <line x1={0} y1={0} x2={0} y2={5} stroke="var(--color-border-strong)" strokeWidth={1} />
                  </pattern>
                </defs>

                <CartesianGrid stroke="var(--color-chart-grid)" vertical={false} />

                {/* Окно инцидента рисуется позади данных. */}
                {incidentFrom >= 0 && (
                  <ReferenceArea
                    x1={incidentFrom}
                    x2={incidentTo}
                    fill="var(--color-error)"
                    fillOpacity={0.09}
                    stroke="var(--color-error)"
                    strokeOpacity={0.28}
                    strokeWidth={1}
                    label={{
                      value: 'INC-2291',
                      position: 'insideTopLeft',
                      fill: 'var(--color-error)',
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      offset: 6,
                    }}
                  />
                )}

                <ReferenceArea
                  x1={lastIdx - 0.5}
                  x2={lastIdx}
                  fill="url(#partialHatch)"
                  fillOpacity={0.9}
                  stroke="none"
                />

                {releaseIdx >= 0 && (
                  <ReferenceLine
                    x={releaseIdx}
                    stroke="var(--color-chart-annot)"
                    strokeWidth={1}
                    label={{
                      value: '2026.7.3',
                      position: 'top',
                      fill: 'var(--color-ink-faint)',
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                    }}
                  />
                )}
                {hotfixIdx >= 0 && (
                  <ReferenceLine
                    x={hotfixIdx}
                    stroke="var(--color-chart-annot)"
                    strokeWidth={1}
                    strokeDasharray="2 2"
                    label={{
                      value: 'hf1',
                      position: 'top',
                      fill: 'var(--color-ink-faint)',
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                    }}
                  />
                )}

                <XAxis
                  dataKey="i"
                  type="number"
                  domain={[0, lastIdx]}
                  ticks={ticks}
                  axisLine={{ stroke: 'var(--color-border)' }}
                  tickLine={false}
                  tickMargin={7}
                  interval={0}
                  height={24}
                  tick={{ fill: 'var(--color-ink-faint)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                  tickFormatter={(i) => {
                    const d = indexed[i];
                    if (!d) return '';
                    return d.hour === 0 ? d.weekday : d.label.slice(0, 2);
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  // Хватает на "25.5K" в моно 11px без вылета за край.
                  width={44}
                  tickCount={4}
                  tick={{ fill: 'var(--color-ink-faint)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                  tickFormatter={(v) => compact(v)}
                />
                <Tooltip
                  cursor={{ stroke: 'var(--color-border-strong)', strokeWidth: 1 }}
                  content={
                    <ChartTooltip
                      heading={(p) => (p ? `${p.weekday} ${p.dayLabel} · ${p.label} UTC` : '')}
                      rows={(p) =>
                        p
                          ? [
                              {
                                key: 'events',
                                name: 'This week',
                                color: 'var(--color-series)',
                                value: thousands(p.events),
                              },
                              {
                                key: 'baseline',
                                name: '4-week baseline',
                                color: 'var(--color-series-base)',
                                value: thousands(p.baseline),
                              },
                            ]
                          : []
                      }
                      footer={(p) => {
                        if (p.partial) return 'Partial hour — 42 of 60 minutes counted';
                        const d = ((p.events - p.baseline) / p.baseline) * 100;
                        return `${d >= 0 ? '+' : '−'}${Math.abs(d).toFixed(0)}% vs. baseline`;
                      }}
                    />
                  }
                />

                {/* База идёт первой, чтобы основная серия рисовалась поверх. */}
                <Line
                  type="monotone"
                  dataKey="baseline"
                  name="4-week baseline"
                  stroke="var(--color-series-base)"
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="events"
                  name="This week"
                  stroke="var(--color-series)"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="url(#ingestWash)"
                  dot={false}
                  // Кольцо цвета фона, иначе маркер теряется на базовой линии.
                  activeDot={{
                    r: 4,
                    fill: 'var(--color-series)',
                    stroke: 'var(--color-surface)',
                    strokeWidth: 2,
                  }}
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <IngestTable rows={indexed} />
      )}
    </Panel>
  );
}

function ViewToggle({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex h-7 items-center gap-1 rounded-[3px] px-2 text-2xs font-medium transition-colors duration-[--dur-fast] ${
        active ? 'bg-surface-4 text-ink' : 'text-ink-faint hover:text-ink-muted'
      }`}
    >
      <Icon size={ICON_SM} strokeWidth={STROKE} aria-hidden />
      {label}
    </button>
  );
}

// Табличный двойник графика: и доступно, и точные числа читать быстрее.
function IngestTable({ rows }) {
  const recent = [...rows].reverse().slice(0, 14);
  return (
    <div className="max-h-[264px] overflow-y-auto rounded-control border border-border">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">Ingest volume per hour, most recent first</caption>
        <thead className="sticky top-0 bg-surface-2">
          <tr>
            <th scope="col" className="px-2.5 py-1.5 text-left text-3xs font-semibold uppercase tracking-[0.05em] text-ink-faint">
              Hour (UTC)
            </th>
            <th scope="col" className="px-2.5 py-1.5 text-right text-3xs font-semibold uppercase tracking-[0.05em] text-ink-faint">
              This week
            </th>
            <th scope="col" className="px-2.5 py-1.5 text-right text-3xs font-semibold uppercase tracking-[0.05em] text-ink-faint">
              Baseline
            </th>
            <th scope="col" className="px-2.5 py-1.5 text-right text-3xs font-semibold uppercase tracking-[0.05em] text-ink-faint">
              Δ
            </th>
          </tr>
        </thead>
        <tbody>
          {recent.map((r) => {
            const d = ((r.events - r.baseline) / r.baseline) * 100;
            return (
              <tr key={r.t} className="border-t border-border">
                <td className="px-2.5 py-1.5 text-2xs text-ink-muted tnum whitespace-nowrap">
                  {r.weekday} {r.label}
                  {r.partial && <span className="ml-1.5 text-ink-faint">partial</span>}
                </td>
                <td className="px-2.5 py-1.5 text-right text-2xs text-ink tnum">{thousands(r.events)}</td>
                <td className="px-2.5 py-1.5 text-right text-2xs text-ink-faint tnum">{thousands(r.baseline)}</td>
                <td
                  className={`px-2.5 py-1.5 text-right text-2xs tnum ${
                    Math.abs(d) < 5 ? 'text-ink-faint' : d > 0 ? 'text-success' : 'text-error'
                  }`}
                >
                  {d >= 0 ? '+' : '−'}
                  {Math.abs(d).toFixed(0)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Легенда заодно подписывает пик, чтобы крайнее значение не приходилось
// искать наведением.
function Legend({ peak }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pb-1.5 pl-1">
      <span className="inline-flex items-center gap-1.5 text-2xs text-ink-muted">
        <span aria-hidden className="h-[2px] w-3 rounded-full bg-series" />
        This week
      </span>
      <span className="inline-flex items-center gap-1.5 text-2xs text-ink-faint">
        <span aria-hidden className="h-[2px] w-3 rounded-full bg-series-base" />
        4-week baseline
      </span>
      <span className="inline-flex items-center gap-1.5 text-2xs text-ink-faint">
        <span aria-hidden className="hatch-partial h-2.5 w-3 rounded-[2px]" />
        Partial hour
      </span>
      <span className="ml-auto text-2xs text-ink-faint tnum">
        peak {compact(peak.events)} · {peak.weekday} {peak.label}
      </span>
    </div>
  );
}
