import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import CloseCalendar from './components/CloseCalendar.jsx'
import Mechanism from './components/Mechanism.jsx'
import TrialBalance from './components/TrialBalance.jsx'
import Terms from './components/Terms.jsx'
import SignOff from './components/SignOff.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CloseCalendar />
        <Mechanism />
        <TrialBalance />
        <Terms />
        <SignOff />
      </main>
      <Footer />
    </>
  )
}
