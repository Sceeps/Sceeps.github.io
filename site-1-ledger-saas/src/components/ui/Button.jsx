import { cx } from '../../lib/cx'

// Тень 2px без блюра гаснет при нажатии — на этом весь эффект штампа.
const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-[3px] font-semibold leading-none transition-[transform,box-shadow,background-color] duration-100 ease-out active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-60 disabled:pointer-events-none'

const sizes = {
  sm: 'px-3 py-2 text-[0.82rem]',
  md: 'px-4 py-2.5 text-[0.9rem]',
  lg: 'px-5 py-3.5 text-[0.98rem]',
}

const variants = {
  stamp:
    'bg-red text-bar-alt shadow-[2px_2px_0_0_var(--color-red-deep)] hover:bg-red-lift active:shadow-none',
  ink: 'bg-ink text-bar-alt shadow-[2px_2px_0_0_var(--color-rule-ui)] hover:bg-ink-mid active:shadow-none',
  ruled:
    'border border-rule-ui bg-transparent text-ink shadow-[2px_2px_0_0_var(--color-rule)] hover:bg-bar-alt active:shadow-none',
  // Для тёмной копирки
  field:
    'bg-red-on-field text-field shadow-[2px_2px_0_0_oklch(0.42_0.14_33)] hover:bg-on-field active:shadow-none',
  fieldRuled:
    'border border-field-rule bg-transparent text-on-field shadow-[2px_2px_0_0_var(--color-field-rule-soft)] hover:bg-field-lift active:shadow-none',
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
