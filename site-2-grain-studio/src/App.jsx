import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Work from './components/Work'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import GrainOverlay from './components/GrainOverlay'

const SERVICE_WORDS = ['Brand Identity', 'Motion Design', 'Digital Product', 'Campaigns', 'Sound']

function App() {
  return (
    <>
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <Marquee items={SERVICE_WORDS} bg="bg-acid" fg="text-ink" border="border-ink/10" />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
