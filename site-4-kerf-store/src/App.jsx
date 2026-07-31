import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import FieldDimensional from './components/FieldDimensional.jsx'
import FieldHardness from './components/FieldHardness.jsx'
import FieldBadly from './components/FieldBadly.jsx'
import FieldPatina from './components/FieldPatina.jsx'
import FieldRange from './components/FieldRange.jsx'
import FieldServiceLog from './components/FieldServiceLog.jsx'
import FieldOrder from './components/FieldOrder.jsx'
import Footer from './components/Footer.jsx'

// Страница — один документ, инспекционный сертификат: поля идут по порядку,
// от размеров к журналу обслуживания и подписи.
function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FieldDimensional />
        <FieldHardness />
        <FieldBadly />
        <FieldPatina />
        <FieldRange />
        <FieldServiceLog />
        <FieldOrder />
      </main>
      <Footer />
    </>
  )
}

export default App
