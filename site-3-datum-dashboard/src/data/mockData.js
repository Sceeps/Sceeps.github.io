// Выдуманные данные, но не случайные: весь набор считается из одного
// сценария. Ср 14:10 — релиз с новым SDK; Ср 22:40 — клиент начинает
// ретраить, сырой поток растёт, а checkout падает; Чт 02:15 — перегружается
// европейская нода, платежи проваливаются на 4 часа (INC-2291); Чт 06:25 —
// хотфикс. Сейчас пятница 09:42. Из этой хронологии выведены и графики, и
// воронка, и статусы конвейера.

// Детерминированный шум малой амплитуды: форму кривой задаёт календарь, а не
// генератор.
function mulberry(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const NOW = new Date('2026-07-31T09:42:00Z');
export const RELEASE_AT = new Date('2026-07-29T14:10:00Z');
export const INCIDENT_START = new Date('2026-07-30T02:15:00Z');
export const INCIDENT_END = new Date('2026-07-30T06:25:00Z');

const DAY = 86400000;
const HOUR = 3600000;

// Коэффициенты по дням недели, вс..сб: пик во вт/ср, выходные около 62%.
const WEEKDAY = [0.62, 0.94, 1.0, 0.99, 0.95, 0.88, 0.6];

function isoDay(d) {
  return d.toISOString().slice(0, 10);
}
function dayLabel(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}
function weekdayShort(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
}

// Поток по часам за 72 часа. В суточных корзинах четырёхчасовой инцидент не
// виден вообще, поэтому шаг именно часовой.

// Суточная кривая, индекс — час UTC. Два горба: утро в EU и в US.
const DIURNAL = [
  0.34, 0.28, 0.25, 0.26, 0.31, 0.42, 0.58, 0.74, 0.88, 0.96, 1.0, 0.98,
  0.93, 0.95, 1.0, 1.02, 0.99, 0.9, 0.82, 0.73, 0.64, 0.55, 0.47, 0.4,
];

export const INGEST_HOURLY = (() => {
  const rnd = mulberry(20260731);
  const out = [];
  // 72 корзины, последняя — текущий неполный час.
  const endHour = new Date(Date.UTC(2026, 6, 31, 9, 0, 0));
  for (let i = 71; i >= 0; i--) {
    const t = new Date(endHour.getTime() - i * HOUR);
    const h = t.getUTCHours();
    const wd = WEEKDAY[t.getUTCDay()];
    const base = 21400 * DIURNAL[h] * wd;

    // База — тот же час, усреднённый за 4 предыдущие недели.
    const baseline = Math.round(base * 0.945 * (0.985 + rnd() * 0.03));

    let v = base * (0.975 + rnd() * 0.05);

    // Шторм ретраев после релиза: разгон за 3 часа, пик +26%, спад к четвергу.
    const sinceRelease = (t - RELEASE_AT) / HOUR;
    if (sinceRelease > 0) {
      const ramp = Math.min(1, sinceRelease / 3);
      const decay = Math.exp(-Math.max(0, sinceRelease - 8) / 26);
      v *= 1 + 0.26 * ramp * decay;
    }

    // Инцидент 02:15–06:25: события теряются, кривая проваливается прямо
    // посреди шторма ретраев.
    if (t >= new Date(INCIDENT_START.getTime() - HOUR) && t < INCIDENT_END) {
      const depth = t.getTime() === Date.UTC(2026, 6, 30, 4, 0, 0) ? 0.42 : 0.58;
      v *= depth;
    }

    const partial = i === 0;
    out.push({
      t: t.toISOString(),
      label: `${String(h).padStart(2, '0')}:00`,
      dayLabel: dayLabel(t),
      weekday: weekdayShort(t),
      hour: h,
      // В текущей корзине только 42 минуты из 60.
      events: Math.round(partial ? v * (42 / 60) : v),
      baseline,
      partial,
    });
  }
  return out;
})();

// Суточный поток за 28 дней: для спарклайнов и сравнения с прошлой неделей.
export const INGEST_DAILY = (() => {
  const rnd = mulberry(88231);
  const out = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(Date.UTC(2026, 6, 31) - i * DAY);
    const wd = WEEKDAY[d.getUTCDay()];
    // Органический дрейф +0.4% в день.
    const drift = Math.pow(1.004, 27 - i);
    let v = 452000 * wd * drift * (0.985 + rnd() * 0.03);

    const isReleaseDay = isoDay(d) === '2026-07-29';
    const isIncidentDay = isoDay(d) === '2026-07-30';
    if (isReleaseDay) v *= 1.11;
    if (isIncidentDay) v *= 1.04; /* retry storm minus 4h of dropped ingest */

    const isToday = isoDay(d) === '2026-07-31';
    out.push({
      date: isoDay(d),
      label: dayLabel(d),
      weekday: weekdayShort(d),
      weekend: d.getUTCDay() === 0 || d.getUTCDay() === 6,
      events: Math.round(isToday ? v * 0.4 : v),
      partial: isToday,
      annotation: isReleaseDay ? 'release' : isIncidentDay ? 'incident' : null,
    });
  }
  return out;
})();

// Четыре показателя: у каждого своя единица, своё направление «хорошо» и
// своя оговорка.
const last24 = INGEST_HOURLY.slice(-24);
const sumBy = (xs, k) => xs.reduce((s, r) => s + r[k], 0);
const ingest24 = sumBy(last24, 'events');
// Сравнение с базой за 4 недели, а не с предыдущими 24 часами: в те сутки
// попал пик шторма ретраев, и дельта выходила −3.6% при потоке на 17% выше
// нормы.
const ingestBaseline24 = sumBy(last24, 'baseline');

export const VITALS = [
  {
    id: 'ingest',
    label: 'Events ingested',
    unit: 'events',
    value: ingest24,
    format: 'compact',
    delta: ((ingest24 - ingestBaseline24) / ingestBaseline24) * 100,
    higherIsBetter: true,
    comparison: 'vs. 4-week baseline for these hours',
    // Показатель вырос по плохой причине, и интерфейс должен это сказать.
    caveat: 'Inflated by SDK v4 retries — see INC-2291',
    spark: last24.map((r) => r.events),
  },
  {
    id: 'checkout',
    label: 'checkout_completed',
    unit: 'events',
    value: 2841,
    format: 'plain',
    delta: -18.4,
    higherIsBetter: true,
    comparison: 'vs. same window last week',
    caveat: null,
    spark: [4210, 4180, 4055, 3980, 3410, 2960, 2841],
    status: 'error',
  },
  {
    id: 'ingest-lag',
    label: 'Ingest lag (p95)',
    unit: 'ms',
    value: 1840,
    format: 'ms',
    delta: 412,
    deltaFormat: 'absolute-ms',
    higherIsBetter: false,
    comparison: 'vs. 7-day median 1,428ms',
    caveat: null,
    spark: [1390, 1405, 1420, 1470, 2980, 2210, 1840],
    status: 'warning',
  },
  {
    id: 'schema',
    label: 'Schema violations',
    unit: 'events',
    value: 1207,
    format: 'plain',
    delta: 1207,
    deltaFormat: 'new',
    higherIsBetter: false,
    comparison: 'none in the 30 days before 2026.7.3',
    caveat: null,
    spark: [0, 0, 0, 0, 380, 902, 1207],
    status: 'error',
  },
];

// Аномалии отсортированы по серьёзности, а не по времени.
export const ANOMALIES = [
  {
    id: 'INC-2291',
    severity: 'error',
    title: 'payment_confirmed down 34% since 02:15 UTC',
    detail:
      'EU-west ingest node saturated for 4h 10m. 41,290 events dropped, not queued — they are gone, not late. Export worker is backfilling what the client SDK retried.',
    metric: 'payment_confirmed',
    scope: 'eu-west-1 · Web app, iOS app',
    firstSeen: new Date('2026-07-30T02:15:00Z'),
    correlatesWith: 'Ingest API saturation',
    status: 'investigating',
    owner: 'R. Okonjo',
  },
  {
    id: 'ANO-4417',
    severity: 'error',
    title: 'checkout_completed missing required property `cart_id`',
    detail:
      '1,207 events rejected since release 2026.7.3. The v4 SDK renamed `cart_id` to `cartId`; the schema was never updated to accept either.',
    metric: 'checkout_completed',
    scope: 'Web app · SDK v4.0.1',
    firstSeen: new Date('2026-07-29T14:22:00Z'),
    correlatesWith: 'Release 2026.7.3',
    status: 'triaged',
    owner: 'M. Kessler',
  },
  {
    id: 'ANO-4419',
    severity: 'warning',
    title: 'session_start volume +26% with flat active users',
    detail:
      'More sessions, same people. Consistent with the v4 SDK opening a new session on token refresh rather than resuming. Not user growth.',
    metric: 'session_start',
    scope: 'All sources',
    firstSeen: new Date('2026-07-29T17:40:00Z'),
    correlatesWith: 'Release 2026.7.3',
    status: 'watching',
    owner: null,
  },
  {
    id: 'ANO-4421',
    severity: 'info',
    title: 'export_requested queue depth 8,400 and falling',
    detail:
      'Backfill from INC-2291. Draining at roughly 1,900/min; expected clear by 11:10 UTC. No action needed unless depth rises again.',
    metric: 'export_requested',
    scope: 'Export worker',
    firstSeen: new Date('2026-07-30T06:31:00Z'),
    correlatesWith: 'INC-2291 recovery',
    status: 'watching',
    owner: null,
  },
];

// Воронка неровная: обрыв на оплате, а не размазан по пяти шагам. Рядом со
// ставкой этой недели стоит прошлая, иначе просадку не с чем сравнить.
export const FUNNEL = {
  window: 'Last 24h vs. same window last week',
  steps: [
    { event: 'session_start', users: 48120, priorRate: null, rate: null },
    { event: 'product_viewed', users: 31280, priorRate: 66.1, rate: 65.0 },
    { event: 'add_to_cart', users: 9614, priorRate: 30.4, rate: 30.7 },
    { event: 'checkout_started', users: 7108, priorRate: 76.2, rate: 73.9 },
    // Просадка здесь: 39.9% против 30.9% от предыдущего шага.
    { event: 'payment_confirmed', users: 2196, priorRate: 39.9, rate: 30.9 },
  ],
};

// Удержание: быстрый спад, затем плато.
export const RETENTION = {
  cohort: 'Signed up week of Jun 29',
  size: 3418,
  // d0 по определению 100.
  days: [
    { day: 0, pct: 100 },
    { day: 1, pct: 44.2 },
    { day: 3, pct: 31.6 },
    { day: 7, pct: 24.8 },
    { day: 14, pct: 20.1 },
    { day: 21, pct: 18.4 },
    { day: 28, pct: 17.9 },
  ],
  plateau: 17.9,
  benchmark: 'Prior 4 cohorts plateaued at 16.2–17.1%',
};

// Состояние конвейера: строки подтверждают тот же инцидент, что и графики.
export const PIPELINE = [
  {
    id: 'ingest',
    name: 'Ingest API',
    status: 'degraded',
    detail: 'p95 1,840ms · 3 of 12 nodes above 80% CPU',
    metric: 1840,
    metricUnit: 'ms',
    budgetUsed: 0.71,
    note: 'Recovered from saturation at 06:25',
  },
  {
    id: 'pipeline',
    name: 'Event pipeline',
    status: 'operational',
    detail: 'p95 118ms · lag under 1 batch',
    metric: 118,
    metricUnit: 'ms',
    budgetUsed: 0.12,
    note: null,
  },
  {
    id: 'query',
    name: 'Query engine',
    status: 'operational',
    detail: 'p95 640ms · 2 slow queries queued',
    metric: 640,
    metricUnit: 'ms',
    budgetUsed: 0.34,
    note: null,
  },
  {
    id: 'export',
    name: 'Export worker',
    status: 'backfilling',
    detail: '8,400 queued · draining ~1,900/min',
    metric: 8400,
    metricUnit: 'queued',
    budgetUsed: 0.88,
    note: 'Backfill from INC-2291, ETA 11:10 UTC',
  },
  {
    id: 'webhooks',
    name: 'Webhook dispatcher',
    status: 'operational',
    detail: '99.2% delivered in 1 attempt',
    metric: 203,
    metricUnit: 'ms',
    budgetUsed: 0.19,
    note: null,
  },
];

export const RELEASES = [
  { version: '2026.7.3-hf1', at: new Date('2026-07-30T06:25:00Z'), kind: 'hotfix' },
  { version: '2026.7.3', at: RELEASE_AT, kind: 'release' },
  { version: '2026.7.2', at: new Date('2026-07-24T11:05:00Z'), kind: 'release' },
];

// Поток событий. Веса взяты для середины инцидента, а не для спокойного дня:
// при шторме ретраев затронутые события действительно перевешивают.
const EVENT_SHAPES = [
  { name: 'page_viewed', weight: 18, sources: ['Web app', 'iOS app', 'Android app'] },
  { name: 'session_start', weight: 12, sources: ['Web app', 'iOS app', 'Android app'] },
  { name: 'checkout_completed', weight: 11, sources: ['Web app', 'iOS app'] },
  { name: 'payment_confirmed', weight: 9, sources: ['Server SDK'] },
  { name: 'feature_flag_evaluated', weight: 8, sources: ['Server SDK', 'Web app'] },
  { name: 'product_viewed', weight: 8, sources: ['Web app', 'iOS app'] },
  { name: 'add_to_cart', weight: 6, sources: ['Web app', 'iOS app'] },
  { name: 'checkout_started', weight: 6, sources: ['Web app', 'iOS app'] },
  { name: 'export_requested', weight: 5, sources: ['Web app', 'HTTP API'] },
  { name: 'error_thrown', weight: 5, sources: ['Web app', 'iOS app', 'Server SDK'] },
  { name: 'webhook_delivered', weight: 4, sources: ['Server SDK'] },
  { name: 'trial_started', weight: 3, sources: ['Web app'] },
  { name: 'plan_upgraded', weight: 3, sources: ['Web app'] },
  { name: 'invite_sent', weight: 2, sources: ['Web app'] },
];

const REGIONS = [
  { code: 'us-east-1', label: 'us-east-1', weight: 34 },
  { code: 'eu-west-1', label: 'eu-west-1', weight: 27 },
  { code: 'us-west-2', label: 'us-west-2', weight: 16 },
  { code: 'ap-south-1', label: 'ap-south-1', weight: 13 },
  { code: 'sa-east-1', label: 'sa-east-1', weight: 10 },
];

// Web и iOS уже на v4, Android — нет: релиз до него не дошёл. Отсюда пустой
// сохранённый вид по Android на v4.
const SDK_BY_SOURCE = {
  'Web app': ['4.0.1', '4.0.1', '4.0.1', '4.0.1', '3.9.4'],
  'iOS app': ['4.0.1', '4.0.1', '4.0.1', '3.9.4'],
  'Android app': ['3.9.4', '3.9.4', '3.9.4'],
  'Server SDK': ['4.0.1', '4.0.1', '3.9.4'],
  'HTTP API': ['—'],
};

function weightedPick(rnd, items) {
  const total = items.reduce((s, i) => s + i.weight, 0);
  let r = rnd() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return items[items.length - 1];
}

export const EVENT_STREAM = (() => {
  const rnd = mulberry(4417);
  const rows = [];
  let t = NOW.getTime();

  for (let i = 0; i < 96; i++) {
    // Интервалы прихода: обычно секунды, иногда пауза подольше.
    t -= Math.round((2 + rnd() * 28) * 1000);
    const shape = weightedPick(rnd, EVENT_SHAPES);
    // Платежи смещены в eu-west-1: там процессинг карт, поэтому перегрузка
    // европейской ноды ударила именно по ним.
    const region =
      shape.name === 'payment_confirmed' && rnd() < 0.62
        ? REGIONS[1]
        : weightedPick(rnd, REGIONS);
    const source = shape.sources[Math.floor(rnd() * shape.sources.length)];
    const pool = SDK_BY_SOURCE[source];
    const sdk = pool[Math.floor(rnd() * pool.length)];

    // Статус выводится из данных самой строки, а не проставляется случайно:
    // каждая отклонённая строка привязана к аномалии из списка выше.
    let status = 'accepted';
    let reason = null;
    if (shape.name === 'checkout_completed' && sdk.startsWith('4') && rnd() < 0.85) {
      status = 'rejected';
      reason = 'missing required property `cart_id`';
    } else if (shape.name === 'payment_confirmed' && region.code === 'eu-west-1' && rnd() < 0.45) {
      status = 'dropped';
      reason = 'ingest node saturated (INC-2291)';
    } else if (shape.name === 'export_requested' && rnd() < 0.6) {
      status = 'queued';
      reason = 'backfill queue depth 8,400';
    } else if (shape.name === 'error_thrown' && rnd() < 0.35) {
      status = 'rejected';
      reason = 'property `revenue` expected number, got string';
    }

    rows.push({
      id: `evt_${(0x100000 + Math.floor(rnd() * 0xefffff)).toString(16)}`,
      name: shape.name,
      source,
      sdk,
      region: region.label,
      distinctId: `u_${(0x10000 + Math.floor(rnd() * 0xeffff)).toString(16)}`,
      count: 1 + Math.floor(rnd() * (status === 'queued' ? 40 : 4)),
      status,
      reason,
      at: new Date(t),
    });
  }
  return rows;
})();

export const STREAM_TOTAL = 4318552;

// Сохранённые виды
export const SAVED_VIEWS = [
  { id: 'all', label: 'All events', count: null, filter: null },
  {
    id: 'rejected',
    label: 'Failing validation',
    count: 1207,
    filter: (r) => r.status === 'rejected',
    tone: 'error',
  },
  {
    id: 'checkout',
    label: 'Checkout funnel',
    count: null,
    filter: (r) =>
      ['product_viewed', 'add_to_cart', 'checkout_started', 'checkout_completed', 'payment_confirmed'].includes(
        r.name,
      ),
  },
  {
    id: 'eu',
    label: 'eu-west-1 only',
    count: null,
    filter: (r) => r.region === 'eu-west-1',
  },
  {
    id: 'sdk4',
    label: 'SDK v4 clients',
    count: null,
    filter: (r) => r.sdk.startsWith('4'),
  },
  // Этот вид пуст по данным: релиз не дошёл до Android, значит ни один
  // Android-клиент не на v4. Так проверяется пустое состояние таблицы.
  {
    id: 'android-v4',
    label: 'Android on SDK v4',
    count: 0,
    filter: (r) => r.source === 'Android app' && r.sdk.startsWith('4'),
  },
];

export const PROJECTS = [
  { id: 'prod', name: 'Production', env: 'prod', health: 'degraded' },
  { id: 'staging', name: 'Staging', env: 'staging', health: 'operational' },
  { id: 'eu', name: 'Production (EU)', env: 'prod', health: 'operational' },
];
