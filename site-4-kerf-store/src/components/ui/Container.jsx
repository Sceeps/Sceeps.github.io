import { cx } from '../../lib/cx'

// narrow — мера для текста (до 70ch), wide — под фото во всю ширину.
const widths = {
  sheet: 'max-w-[1180px]',
  narrow: 'max-w-[68ch]',
  wide: 'max-w-none',
}

export default function Container({
  as: Tag = 'div',
  width = 'sheet',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag className={cx('mx-auto w-full px-4 sm:px-7 lg:px-10', widths[width], className)} {...props}>
      {children}
    </Tag>
  )
}
