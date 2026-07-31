import { cx } from '../../lib/cx'

const base =
  'inline-flex items-center justify-center gap-2 font-mono text-[0.78rem] font-medium uppercase ' +
  'tracking-[0.1em] transition-[background-color,color,border-color,transform] duration-150 ' +
  'active:translate-y-px disabled:opacity-50 disabled:pointer-events-none'

const sizes = {
  md: 'px-4 py-2.5 min-h-[44px]',
  lg: 'px-6 py-3.5 min-h-[48px]',
}

const variants = {
  stamp: 'bg-mark text-sheet hover:bg-mark-deep',
  ink: 'bg-ink text-sheet hover:bg-slate-2',
  scribed: 'border border-rule-strong bg-transparent text-ink hover:border-mark hover:text-mark',
  scribedInv:
    'border border-rule-inv bg-transparent text-ink-inv hover:border-mark-inv hover:text-mark-inv',
}

export default function Button({
  as: Tag = 'a',
  variant = 'stamp',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag className={cx(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </Tag>
  )
}
