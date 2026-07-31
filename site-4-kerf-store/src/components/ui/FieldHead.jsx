import { motion } from 'motion/react'
import { cx } from '../../lib/cx'
import { slideUp, stagger, seenEarly } from '../../lib/motion'

// Заголовок нумерованного поля: номер в рамке, название рядом, линейка на всю
// ширину.
export default function FieldHead({
  number,
  field,
  title,
  lede,
  inverted = false,
  className = '',
  id,
}) {
  const num = inverted ? 'text-mark-inv border-rule-inv' : 'text-mark border-rule-strong'
  const label = inverted ? 'text-ink-inv-2' : 'text-ink-2'
  const rule = inverted ? 'bg-rule-inv' : 'bg-rule-strong'
  const head = inverted ? 'text-ink-inv' : 'text-ink'
  const body = inverted ? 'text-ink-inv-2' : 'text-ink-2'

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={seenEarly}
      variants={stagger(0.05)}
      className={cx('relative', className)}
    >
      <motion.div variants={slideUp} className="flex items-stretch gap-0">
        <span
          className={cx(
            'flex shrink-0 items-center justify-center border px-2.5 py-1 font-mono text-[0.72rem] font-medium tabular-nums',
            num,
          )}
        >
          {number}
        </span>
        <span
          className={cx(
            'flex min-w-0 items-center px-3 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em]',
            label,
          )}
        >
          <span className="truncate">{field}</span>
        </span>
        <span className={cx('mt-auto mb-[0.55rem] h-px min-w-4 flex-1', rule)} aria-hidden="true" />
      </motion.div>

      <motion.h2
        variants={slideUp}
        id={id}
        className={cx(
          'mt-5 max-w-[24ch] text-[clamp(2.6rem,1.9rem+3.6vw,5.1rem)] font-extrabold',
          head,
        )}
      >
        {title}
      </motion.h2>

      {lede && (
        <motion.p
          variants={slideUp}
          className={cx('mt-5 max-w-[62ch] text-[1.02rem] leading-[1.62]', body)}
        >
          {lede}
        </motion.p>
      )}
    </motion.div>
  )
}
