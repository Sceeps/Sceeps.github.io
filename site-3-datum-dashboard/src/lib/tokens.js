// Константы лежат отдельно от ui.jsx: Fast Refresh требует, чтобы тот файл
// экспортировал только компоненты.
import { AlertTriangle, CheckCircle2, Circle, Info, Loader2, XCircle } from 'lucide-react';

export const ICON_SM = 13;
export const ICON = 15;
export const STROKE = 1.75;

// Здесь намеренно нет focus:outline-none: он ставит
// --tw-outline-style: none, это наследуют focus-visible-утилиты, и фокусное
// кольцо тихо исчезает как раз на полях ввода.
export const CONTROL =
  'h-8 rounded-control bg-surface-2 border border-border text-sm text-ink ' +
  'placeholder:text-ink-faint hover:border-border-strong focus:border-accent ' +
  'focus-visible:outline-2 focus-visible:outline-accent-text focus-visible:outline-offset-1 ' +
  'transition-colors duration-[--dur-fast]';

// Единый словарь статусов: у каждого иконка и слово, не только цвет. Новый
// статус добавляется строкой здесь, а не инлайновым стилем.
export const STATUS = {
  operational: { tone: 'success', icon: CheckCircle2, label: 'Operational' },
  degraded: { tone: 'warning', icon: AlertTriangle, label: 'Degraded' },
  backfilling: { tone: 'info', icon: Loader2, label: 'Backfilling', spin: true },
  down: { tone: 'error', icon: XCircle, label: 'Down' },

  accepted: { tone: 'success', icon: CheckCircle2, label: 'Accepted' },
  queued: { tone: 'info', icon: Loader2, label: 'Queued', spin: true },
  rejected: { tone: 'error', icon: XCircle, label: 'Rejected' },
  dropped: { tone: 'warning', icon: AlertTriangle, label: 'Dropped' },

  investigating: { tone: 'error', icon: Circle, label: 'Investigating' },
  triaged: { tone: 'warning', icon: Circle, label: 'Triaged' },
  watching: { tone: 'info', icon: Circle, label: 'Watching' },

  error: { tone: 'error', icon: XCircle, label: 'Critical' },
  warning: { tone: 'warning', icon: AlertTriangle, label: 'Warning' },
  info: { tone: 'info', icon: Info, label: 'Notice' },
};

export const TONE_TEXT = {
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',
};

export const TONE_CHIP = {
  success: 'text-success bg-success-wash',
  warning: 'text-warning bg-warning-wash',
  error: 'text-error bg-error-wash',
  info: 'text-info bg-info-wash',
};

export const TONE_FILL = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
};
