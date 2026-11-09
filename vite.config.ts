import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

// Default public URL for SEO metadata (overridable via .env or CI).
process.env.VITE_SITE_URL ??= 'https://janagiram.dpdns.org'

// Best-effort Content Security Policy for hosts that cannot send response
// headers (e.g. GitHub Pages). frame-ancestors is not allowed in a <meta>
// policy; nginx.conf sends the full header including frame-ancestors.
// Injected only during `vite build` so the dev server (HMR, eval) is unaffected.
function htmlSecurityHeaders(): Plugin {
  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.emailjs.com",
    "frame-src 'none'",
    "worker-src 'none'",
    "manifest-src 'self'",
    "media-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ')

  return {
    name: 'html-security-headers',
    apply: 'build',
    transformIndexHtml(html) {
      const meta = [
        `<meta http-equiv="Content-Security-Policy" content="${csp}" />`,
        '<meta http-equiv="X-Content-Type-Options" content="nosniff" />',
        '<meta name="referrer" content="strict-origin-when-cross-origin" />',
      ].join('\n    ')
      return html.replace('<meta name="theme-color"', meta + '\n    <meta name="theme-color"')
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), htmlSecurityHeaders()],
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/lucide-react')) return 'icons'
          if (id.includes('node_modules/react')) return 'vendor'
        },
      },
    },
  },
})
