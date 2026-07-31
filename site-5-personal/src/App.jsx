import { useEffect } from 'react'
import TitleBlock from './components/TitleBlock.jsx'
import Cover from './components/Cover.jsx'
import Sheets from './components/Sheets.jsx'
import Specimen from './components/Specimen.jsx'
import Revisions from './components/Revisions.jsx'
import Scope from './components/Scope.jsx'
import Review from './components/Review.jsx'

// Класс .js-reveal ставится только после проверки IntersectionObserver и
// prefers-reduced-motion: в CSS блоки видимы по умолчанию, поэтому без JS
// страница остаётся читаемой.
function useSheetReveals() {
  useEffect(() => {
    const root = document.documentElement
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce || typeof IntersectionObserver === 'undefined') return

    const targets = Array.from(document.querySelectorAll('.reveal'))
    if (!targets.length) return

    root.classList.add('js-reveal')

    // То, что уже на экране при загрузке, показываем сразу.
    const vh = window.innerHeight || 800
    for (const el of targets) {
      const r = el.getBoundingClientRect()
      if (r.top < vh * 0.92) el.classList.add('is-in')
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.02 },
    )
    targets.forEach((el) => {
      if (!el.classList.contains('is-in')) io.observe(el)
    })

    // Страховка: в придушенной вкладке колбэки могут не прийти.
    const failsafe = window.setTimeout(() => {
      targets.forEach((el) => el.classList.add('is-in'))
    }, 1200)

    return () => {
      window.clearTimeout(failsafe)
      io.disconnect()
      root.classList.remove('js-reveal')
    }
  }, [])
}

function App() {
  useSheetReveals()

  return (
    <>
      <a
        href="#cover"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-3 focus-visible:top-3 focus-visible:z-50 focus-visible:border focus-visible:border-ink focus-visible:bg-stock focus-visible:px-3 focus-visible:py-2 focus-visible:font-drawn focus-visible:text-sm focus-visible:font-semibold focus-visible:text-ink"
      >
        Skip to cover sheet
      </a>
      <TitleBlock />
      <main>
        <Cover />
        <Sheets />
        <Specimen />
        <Revisions />
        <Scope />
      </main>
      <Review />
    </>
  )
}

export default App
