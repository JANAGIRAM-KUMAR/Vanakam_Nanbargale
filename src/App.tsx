import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Resume } from './components/Resume'
import { Work } from './components/Work'
import { useScrollFade } from './useScrollFade'

export default function App() {
  useScrollFade()

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-[var(--accent-color)] selection:text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent-color)] focus:text-white font-mono text-xs uppercase tracking-wider"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
