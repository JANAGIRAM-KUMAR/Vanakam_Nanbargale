import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ACTIVE_THEME } from './theme'

document.documentElement.dataset.theme = ACTIVE_THEME

const themeColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-void')
  .trim()

if (themeColor) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
