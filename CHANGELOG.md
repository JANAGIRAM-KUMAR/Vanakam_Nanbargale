# Changelog

All notable changes to this project are documented here.

## [2.0.0] - 2026-11-11

### Redesign: "The Oversized Name"
- **Typography & Visual System Overhaul**:
  - Replaced the dark glassmorphic styling, glowing radial gradients, and floating pill navbar with an editorial paper aesthetic.
  - Implemented dual-theme color system (Light: `#F4F1EA` paper with `#161512` ink and `#C4330C` vermilion accent; Dark: `#121110` background with `#EDE9DF` text and `#FF6A3D` accent).
  - Self-hosted Geist and Geist Mono Latin subsets with preloading in `index.html`.
  - Introduced edge-to-edge clamped name headline (`JANAGIRAM KUMAR`) as the primary visual anchor.
- **Structural Layout (01–04 Index)**:
  - **Top bar**: Minimalist header containing `"JK"` initials and text links (`Work`, `Experience`, `Resume`, `Contact`).
  - **Hero**: Oversized name, single-line thesis statement, and two button styles (`View my work` and `Download resume`).
  - **01 Work**: Three full-width project rows with interactive 6px hover translate, numerical indicators, concise summaries, technology tags, and repository links.
  - **02 Experience**: Clean bullet points for Ciena internship achievements, quiet education line without grades, and core skills line.
  - **03 Resume**: Replaced heavy embedded PDF viewer `<iframe>` with a lightweight, pre-rendered WebP document sheet tilted `-1deg` featuring pointer-following CSS 3D tilt (max 6deg) and an accessible focus-trapped lightbox modal.
  - **04 Contact**: "Let's talk." editorial layout, copyable email address, direct text links for GitHub and LinkedIn, and an underline-only message form with spam honeypot and rate limiting.
  - **Footer**: Single-line copyright and credits.
- **Performance & Motion**:
  - Replaced Framer Motion runtime dependency with native CSS transitions and a lightweight `IntersectionObserver` hook (`useScrollFade`).
  - Implemented 150ms growing link underlines and 250ms scroll fade-up reveals.
  - Enforced `prefers-reduced-motion` compliance across all transitions and disabled 3D tilt on touch devices.
- **Cleanup & Sanitization**:
  - Removed all empty component and hook directories under `src/`.
  - Removed CGPA, academic scores, research paper references, and availability claims across all application components, metadata, JSON-LD schema, and documentation.
