# Janagiram Kumar — Portfolio

**Software Engineer • Distributed Systems & Cloud Infrastructure**

An editorial, typography-driven personal portfolio engineered with React 19, Vite, and Tailwind CSS v4. Designed for static delivery on virtual infrastructure behind Docker and Nginx with defense-in-depth security headers.

Concept: *"The oversized name"* — a warm-paper editorial layout where typography forms the entire visual structure. Structured with thin 1px rules, a numbered index (01–04), self-hosted Geist & Geist Mono fonts, and an interactive 3D resume sheet.

---

## Design System

- **Light Mode**: Warm Paper (`#F4F1EA`), Ink (`#161512`), Muted (`#5F5B52`), Vermilion accent (`#C4330C`).
- **Dark Mode**: System-driven (`#121110`), High-contrast text (`#EDE9DF`), Muted (`#9C978D`), Warm Vermilion (`#FF6A3D`).
- **Contrast**: Full WCAG AA compliance across all light and dark palettes.
- **Typography**: Self-hosted Geist (Latin subset) and Geist Mono. Edge-to-edge clamped name headline.
- **Motion**: CSS fade-up on scroll (250ms) via IntersectionObserver, growing link underlines (150ms), pointer-aware CSS 3D resume sheet tilt (max 6deg), and full reduced-motion accessibility overrides.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19 + TypeScript (Vite) |
| **Styling** | Tailwind CSS v4 |
| **Fonts** | Self-hosted Geist & Geist Mono (woff2) |
| **Contact** | EmailJS with direct mailto fallback & rate limiting |
| **Runtime** | Nginx on Alpine Linux (multi-stage Docker build) |
| **Security** | Strict CSP, X-Frame-Options, DoS / Slowloris timeouts |

---

## Local Development

Requirements: **Node.js 20+** and **npm 10+**.

```bash
git clone https://github.com/JANAGIRAM-KUMAR/Vanakam_Nanbargale.git
cd Vanakam_Nanbargale

npm install
cp .env.example .env

npm run dev        # Starts Vite dev server at http://localhost:5173
```

### Verification Commands

```bash
npm run lint       # Run oxlint checks
npm run build      # Typecheck and compile static bundle into ./dist
npm run preview    # Preview compiled production build locally
```

---

## Architecture & Deployment

The application compiles to pure static HTML/CSS/JS and static assets, served with an Nginx reverse proxy with:
- Connection limiting (`limit_conn`) and request burst throttling (`limit_req`).
- Slowloris mitigation (`client_body_timeout 10s`, `client_header_timeout 10s`).
- Content Security Policy (strict script and style sandboxing).
- Immutable caching on hashed `/assets/` and instant revalidation on `index.html`.
