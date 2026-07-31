import { useEffect, useRef, useState } from 'react'

// Флаг поднимается только после реального кадра rAF: в headless-рендере и в
// придушенной фоновой вкладке кадров нет, и страница остаётся в готовом
// состоянии вместо пустой.

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useCanAnimate() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setReady(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])

  return ready
}

// [ref, active]. `active` стартует с false, поэтому компонент обязан быть
// читаемым уже в этом состоянии: хук добавляет анимацию, а не контент.
export function useOnApproach(options = {}) {
  const { amount = 0.35, once = true } = options
  const ref = useRef(null)
  const canAnimate = useCanAnimate()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!canAnimate) return
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setActive(false)
          }
        }
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [canAnimate, amount, once])

  return [ref, active]
}

export function useTicker(callback, delay) {
  const canAnimate = useCanAnimate()
  const cbRef = useRef(callback)
  cbRef.current = callback

  useEffect(() => {
    if (!canAnimate || delay == null) return
    const id = setInterval(() => cbRef.current(), delay)
    return () => clearInterval(id)
  }, [canAnimate, delay])

  return canAnimate
}

export const STRIKE = [0.22, 1, 0.36, 1]
