import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

// Default public URL for SEO metadata (overridable via .env or CI).
process.env.VITE_SITE_URL ??= 'https://janagiram.dpdns.org'

// Best-effort Content Security Policy for static hosting environments.
// Injected only during `vite build` so local dev (HMR) remains unaffected.
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
          if (id.includes('node_modules/@emailjs')) return 'emailjs'
          if (id.includes('node_modules/react')) return 'vendor'
        },
      },
    },
  },
})
