import { NOW } from '../data/mockData.js';

const trim = (s) => s.replace(/\.?0+$/, '');

// Сокращаем только выше 10K, чтобы небольшие числа оставались точными.
export function compact(n) {
  const abs = Math.abs(n);
  if (abs >= 1000000) return trim((n / 1000000).toFixed(2)) + 'M';
  if (abs >= 10000) return trim((n / 1000).toFixed(1)) + 'K';
  return n.toLocaleString('en-US');
}

export function thousands(n) {
  return n.toLocaleString('en-US');
}

export function pct(n, digits = 1) {
  return `${n.toFixed(digits)}%`;
}

export function ms(n) {
  if (n >= 1000) return `${trim((n / 1000).toFixed(2))}s`;
  return `${Math.round(n)}ms`;
}

export function vitalValue(v) {
  switch (v.format) {
    case 'compact':
      return compact(v.value);
    case 'ms':
      return ms(v.value);
    case 'pct':
      return pct(v.value, 1);
    default:
      return thousands(v.value);
  }
}

// Дельта несёт знак в тексте, тон и отдельную иконку: цвет сам по себе
// ничего не сообщает. tone считается из higherIsBetter, а не из знака.
export function describeDelta(v) {
  const d = v.delta;
  if (v.deltaFormat === 'new') {
    return { text: 'new', tone: 'bad', glyph: 'up', aria: `${thousands(d)} new, none before` };
  }
  if (v.deltaFormat === 'absolute-ms') {
    const sign = d > 0 ? '+' : d < 0 ? '−' : '';
    const text = `${sign}${ms(Math.abs(d))}`;
    const good = v.higherIsBetter ? d > 0 : d < 0;
    return {
      text,
      tone: Math.abs(d) < 1 ? 'flat' : good ? 'good' : 'bad',
      glyph: d > 0 ? 'up' : d < 0 ? 'down' : 'flat',
      aria: `${d > 0 ? 'up' : 'down'} ${ms(Math.abs(d))}`,
    };
  }
  const sign = d > 0 ? '+' : d < 0 ? '−' : '';
  const text = `${sign}${Math.abs(d).toFixed(1)}%`;
  const flat = Math.abs(d) < 0.5;
  const good = v.higherIsBetter ? d > 0 : d < 0;
  return {
    text: flat ? 'flat' : text,
    tone: flat ? 'flat' : good ? 'good' : 'bad',
    glyph: flat ? 'flat' : d > 0 ? 'up' : 'down',
    aria: flat ? 'unchanged' : `${d > 0 ? 'up' : 'down'} ${Math.abs(d).toFixed(1)} percent`,
  };
}

export function since(date, now = NOW) {
  const secs = Math.round((now - date) / 1000);
  if (secs < 45) return `${secs}s ago`;
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  if (hrs < 24) return rem ? `${hrs}h ${rem}m ago` : `${hrs}h ago`;
  return utcStamp(date);
}

// Везде UTC: смешивать его с локальным временем в аналитике нельзя.
export function utcStamp(date) {
  return date.toLocaleString('en-GB', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  });
}

export function utcClock(date) {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  });
}

export function utcFull(date) {
  return (
    date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
      hour12: false,
    }) + ' UTC'
  );
}
