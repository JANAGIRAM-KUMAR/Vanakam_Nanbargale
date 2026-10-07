import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { About } from './components/About'
import { Architecture } from './components/Architecture'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { Deployment } from './components/Deployment'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Achievements, Philosophy, Research } from './components/Research'
import { Skills } from './components/Skills'
import { useCommandPalette } from './hooks/useCommandPalette'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  useCommandPalette(paletteOpen, setPaletteOpen)

  return (
    <div className="noise relative min-h-screen bg-void">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:border focus:border-cyan focus:bg-panel focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-cyan"
      >
        Skip to content
      </a>

      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <AnimatePresence>
        {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
      </AnimatePresence>

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Research />
        <Achievements />
        <Philosophy />
        <Architecture />
        <Deployment />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
