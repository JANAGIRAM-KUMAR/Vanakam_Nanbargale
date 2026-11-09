import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Resume } from './components/Resume'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <div className="site-bg" aria-hidden="true" />

      <div className="relative z-10">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-sage focus:px-4 focus:py-2 focus:text-sm focus:text-void"
        >
          Skip to content
        </a>

        <Nav />

        <main id="main">
          <Hero />
          <Resume />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  )
}
