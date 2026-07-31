// Варианты анимируют только y / x / scaleY и никогда не гасят opacity до 0:
// без JS и в headless-рендере элемент просто стоит на месте видимым.

export const EASE_GAUGE = [0.16, 1, 0.3, 1]
export const EASE_CALIPER = [0.33, 1, 0.68, 1]

export const slideUp = {
  hidden: { y: 18 },
  visible: { y: 0, transition: { duration: 0.6, ease: EASE_GAUGE } },
}

export const slideRight = {
  hidden: { x: -16 },
  visible: { x: 0, transition: { duration: 0.6, ease: EASE_GAUGE } },
}

export function stagger(amount = 0.06, delayChildren = 0) {
  return { hidden: {}, visible: { transition: { staggerChildren: amount, delayChildren } } }
}

export const gaugeIn = {
  hidden: { scaleY: 0.72 },
  visible: { scaleY: 1, transition: { duration: 0.55, ease: EASE_CALIPER } },
}

export const seen = { once: true, amount: 0.15 }
export const seenEarly = { once: true, amount: 0.05 }
