# ---------- Stage 1: build ----------
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# Public identifiers, baked at build time (env overrides; safe in the browser).
ARG VITE_SITE_URL=https://janagiram.dpdns.org
ARG VITE_EMAILJS_SERVICE_ID=service_g4o2ec5
ARG VITE_EMAILJS_TEMPLATE_ID=template_8e8dfdb
ARG VITE_EMAILJS_PUBLIC_KEY=bkfDl801vABe-1wnM
ENV VITE_SITE_URL=$VITE_SITE_URL \
    VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID \
    VITE_EMAILJS_TEMPLATE_ID=$VITE_EMAILJS_TEMPLATE_ID \
    VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY

RUN npm run build

# ---------- Stage 2: serve (non-root, minimal surface) ----------
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

# curl is required by the HEALTHCHECK. The unprivileged image already runs
# nginx as uid 101 (no root master), so a compromised nginx has no root
# capabilities to escalate with.
RUN apk add --no-cache curl

# Drop the bundled default server block.
RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/portfolio.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Only the built assets ship: no source, no node_modules, no lockfile.
EXPOSE 8080 8443

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]