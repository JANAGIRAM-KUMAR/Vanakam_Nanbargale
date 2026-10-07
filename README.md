# Janagiram Kumar — Portfolio

**Software Engineer • AI Agent Developer • Network Engineer**

A lightweight, production-ready personal portfolio built as a static React application. Designed to run reliably on an OpenStack virtual machine behind Docker and Nginx.

Theme: *a software engineer's personal infrastructure dashboard* — dark, technical, minimal, fast.

---

## Tech Stack

| Layer      | Choice                          |
| ---------- | ------------------------------- |
| Frontend   | React 19 + TypeScript (Vite)    |
| Styling    | Tailwind CSS v4                 |
| Animations | Framer Motion (CSS fallbacks)   |
| Icons      | Lucide React                    |
| Runtime    | Nginx (multi-stage Docker)      |
| Orchestration | Docker Compose               |

---

## 1. Local Development

Requirements: **Node.js 20+** (Node 22 recommended) and **npm 10+**.

```bash
git clone <repository>
cd portfolio

npm install
cp .env.example .env

npm run dev        # http://localhost:5173
```

### Commands

| Command           | Purpose                             |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start dev server with HMR           |
| `npm run build`   | Type-check + production build       |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Lint with oxlint                    |

### Production build (local)

```bash
npm run build      # outputs static site to ./dist
npm run preview    # serves ./dist for a final smoke test
```

---

## 2. OpenStack Deployment

### Step 1 — Create an OpenStack instance

1. Log in to your OpenStack dashboard (Horizon).
2. **Compute → Instances → Launch Instance**.
3. Suggested spec: Ubuntu 22.04/24.04 LTS, **2 vCPU / 4 GB RAM**, 20 GB disk.
3. Assign a floating IP to the instance.
4. In **Access & Security → Security Groups**, add these ingress rules:

| Protocol | Port   | Source        | Purpose            |
| -------- | ------ | ------------- | ------------------ |
| TCP      | 22     | Your IP/32    | SSH                |
| TCP      | 80     | 0.0.0.0/0     | HTTP               |
| TCP      | 443    | 0.0.0.0/0     | HTTPS              |

### Step 2 — SSH access

```bash
ssh -i <your-key>.pem ubuntu@<FLOATING_IP>
```

### Step 3 — Install Docker

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu   # log out/in afterwards
docker --version
```

Also install the compose plugin if missing:

```bash
sudo apt install -y docker-compose-v2
```

### Step 4 — Clone the repository

```bash
git clone <repository>
cd portfolio
```

### Step 5 — Configure environment variables

```bash
cp .env.example .env
nano .env
```

| Variable       | Description                          | Example                     |
| -------------- | ------------------------------------ | --------------------------- |
| `VITE_SITE_URL`| Public URL used for SEO metadata     | `https://janagiram.dpdns.org`     |
| `HTTP_PORT`    | Host port mapped to container :80    | `80`                        |
| `HTTPS_PORT`   | Host port mapped to container :443   | `443`                       |
| `VITE_EMAILJS_SERVICE_ID`  | EmailJS service id (optional — enables direct form delivery) | `service_xxxxxxx` |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template id (optional)      | `template_xxxxxxx`          |
| `VITE_EMAILJS_PUBLIC_KEY`  | EmailJS public key (optional, browser-safe) | `AbCdEf123456`     |

No passwords, API keys, or cloud credentials are required or stored in this project.

### Step 6 — Start the containers

```bash
docker compose up -d --build
docker compose ps
curl -I http://localhost/healthz
```

Useful operations:

```bash
docker compose logs -f        # tail logs
docker compose pull && docker compose up -d --build   # redeploy
docker compose down            # stop
```

### Step 7 — Configure Nginx

Nginx runs **inside** the container using [`nginx.conf`](./nginx.conf):

- serves the static build from `/usr/share/nginx/html`
- enables gzip, immutable caching for `/assets/`, and security headers
- exposes `/healthz` for health checks
- has a commented HTTPS `server` block ready for certificates

Edit `nginx.conf` and set `server_name yourdomain.com` before enabling HTTPS.

### Step 8 — Open security-group ports

Confirm steps in Step 1 are applied, then verify externally:

```bash
curl -I http://<FLOATING_IP>/
```

### Step 9 — Connect a domain

Create DNS records with your provider:

```
A     janagiram.dpdns.org    → <FLOATING_IP>
CNAME www              → janagiram.dpdns.org
```

Point the domain in `VITE_SITE_URL` and `server_name`, then rebuild:

```bash
docker compose up -d --build
```

### Step 10 — Enable HTTPS

Recommended: use **certbot on the host** with the nginx container in `network_mode` or use Let's Encrypt DNS-01. Minimal HTTP-01 approach:

```bash
sudo apt install -y certbot
sudo certbot certonly --webroot -w ./certs -d janagiram.dpdns.org -d www.janagiram.dpdns.org
```

Copy the issued files into `./certs/`, uncomment the HTTPS block in `nginx.conf`
(`ssl_certificate` / `ssl_certificate_key`), mount the volume in
`docker-compose.yml`, then:

```bash
docker compose up -d --build
```

Force HTTP → HTTPS by uncommenting the `return 301 https://...` line.

---

## Project Structure

```
.
├── Dockerfile               # multi-stage: node build → nginx runtime
├── docker-compose.yml       # one-command deployment
├── nginx.conf               # production web server config
├── .env.example             # environment variables template (incl. EmailJS)
├── index.html               # SEO metadata + structured data
├── public/
│   └── favicon.svg
└── src/
    ├── App.tsx              # section composition
    ├── index.css            # design tokens, animations, reduced-motion
    ├── data/content.ts      # all resume content (single source of truth)
    ├── hooks/
    │   └── useCommandPalette.ts
    └── components/
        ├── Nav.tsx              # sticky navigation
        ├── CommandPalette.tsx   # ⌘K palette
        ├── Hero.tsx             # hero section
        ├── Terminal.tsx         # interactive terminal + easter egg
        ├── Topology.tsx         # animated network topology
        ├── About.tsx
        ├── Experience.tsx       # Ciena timeline + lab diagram
        ├── Skills.tsx           # expandable stack categories
        ├── Projects.tsx         # large project panels + architecture flows
        ├── Research.tsx         # research / achievements / philosophy
        ├── Architecture.tsx     # scroll-animated stack layers
        ├── Deployment.tsx       # OpenStack deployment dashboard
        ├── Contact.tsx          # contact details + EmailJS form (mailto fallback)
        ├── Footer.tsx
        ├── icons.tsx            # GitHub/LinkedIn icons
        └── ui.tsx               # Section/Panel/Chip primitives
```

---

## Environment Variables

See `.env.example` for the full list:

```
VITE_SITE_URL            # public URL baked into SEO metadata at build time
HTTP_PORT                # host port for HTTP (default 80)
HTTPS_PORT               # host port for HTTPS (default 443)
VITE_EMAILJS_SERVICE_ID  # optional — direct contact-form delivery
VITE_EMAILJS_TEMPLATE_ID # optional
VITE_EMAILJS_PUBLIC_KEY  # optional (public by design, safe in the browser)
```

### Contact form delivery (EmailJS)

The contact form sends **directly from the frontend** to `janagi2368@gmail.com`
via [EmailJS](https://www.emailjs.com) when configured. Setup:

1. Create a free account at <https://dashboard.emailjs.com>.
2. **Email Services** → add Gmail (connect `janagi2368@gmail.com`) → copy the **Service ID**.
3. **Email Templates** → create a template with these variables:
   ```
   To:      janagi2368@gmail.com
   From:    {{from_name}} <{{from_email}}>
   Reply-To: {{reply_to}}
   Subject: Portfolio contact — {{from_name}}
   Body:
     {{message}}
     — {{from_name}} ({{from_email}})
   ```
   → copy the **Template ID**.
4. **Account → General** → copy the **Public Key**.
5. Put all three in `.env` (local) **and** as Actions variables/secrets
   (repo **Settings → Secrets and variables → Actions → Variables**), then rebuild.

The public key is intentionally public — EmailJS keys are designed to ship in
browser code. Restrict the allowed domain to `janagiram.dpdns.org` in EmailJS
settings. If the three values are empty, the form falls back to `mailto:` and
**no secrets are ever exposed in the frontend**.

---

## Performance & Accessibility Notes

- Static output — no backend server required
- Vendor code-split into cached chunks; hashed assets cached for 1 year
- System font stack (zero font downloads)
- CSS-driven animations with `prefers-reduced-motion` support
- Semantic HTML, skip link, ARIA labels, visible focus states

---

## Easter Egg

Open the terminal in the hero and type:

```
sudo hire janagiram
```
