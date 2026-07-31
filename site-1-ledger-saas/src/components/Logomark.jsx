export default function Logomark({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="0.75" y="2.75" width="22.5" height="18.5" rx="1" fill="currentColor" opacity="0.1" />
      <rect
        x="0.75"
        y="2.75"
        width="22.5"
        height="18.5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M5.25 2.75V21.25" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <circle cx="3" cy="7.25" r="1.05" fill="currentColor" opacity="0.55" />
      <circle cx="3" cy="12" r="1.05" fill="currentColor" opacity="0.55" />
      <circle cx="3" cy="16.75" r="1.05" fill="currentColor" opacity="0.55" />
      <path d="M8 8.25H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <path
        d="M8 12H17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        opacity="0.6"
      />
      <path
        d="M8 15.75H14.5"
        stroke="var(--color-red)"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </svg>
  )
}
