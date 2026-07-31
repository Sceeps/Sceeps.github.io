export default function Logomark({ size = 26, className = '', inverted = false }) {
  const line = inverted ? 'var(--color-ink-inv-2)' : 'var(--color-ink-2)'
  const edge = inverted ? 'var(--color-mark-inv)' : 'var(--color-mark)'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="25" height="25" stroke={line} strokeWidth="1" opacity="0.5" />
      <path d="M5 6.5 L20.5 13 L5 19.5 Z" stroke={line} strokeWidth="1.25" fill="none" />
      <line x1="5" y1="6.5" x2="5" y2="19.5" stroke={line} strokeWidth="1" opacity="0.75" />
      <line x1="2.6" y1="6.5" x2="7.4" y2="6.5" stroke={line} strokeWidth="0.9" opacity="0.5" />
      <line x1="2.6" y1="19.5" x2="7.4" y2="19.5" stroke={line} strokeWidth="0.9" opacity="0.5" />
      <line x1="19" y1="13" x2="23.5" y2="13" stroke={edge} strokeWidth="1.75" />
    </svg>
  )
}
