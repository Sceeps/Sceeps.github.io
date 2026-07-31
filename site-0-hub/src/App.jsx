import { LINES } from './lines.js'
import Panel from './components/Panel.jsx'
import Line from './components/Line.jsx'
import Operator from './components/Operator.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a
        href="#lines"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-40 focus-visible:bg-signal focus-visible:px-4 focus-visible:py-2 focus-visible:font-panel focus-visible:text-[0.875rem] focus-visible:font-bold focus-visible:text-recess"
      >
        Перейти к сайтам
      </a>

      <Panel />

      <main id="lines" className="fascia">
        <h2 className="sr-only">Пять сайтов</h2>
        {LINES.map((line, i) => (
          <Line key={line.id} line={line} index={i} flip={i % 2 === 1} />
        ))}
      </main>

      <Operator />
      <Footer />
    </>
  )
}
