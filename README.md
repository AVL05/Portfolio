# Portfolio — Alex Vicente López

**Portfolio profesional** construido con Next.js 16, React 19 y TypeScript. Disponible en [aleviclop.dev](https://aleviclop.dev).

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS v4 + PostCSS |
| Animaciones | GSAP 3 + @gsap/react (ScrollTrigger, ScrollToPlugin) |
| Tipografía | Geist Sans / Geist Mono |
| Componentes | Radix UI (primitivas) |
| Iconos | Lucide React + react-icons |
| Formulario | Web3Forms API |
| Analytics | Vercel Analytics + Speed Insights |
| Lint | ESLint + @typescript-eslint |

## Requisitos

- **Node.js** 22.x
- **pnpm** (obligatorio)

## Desarrollo

```bash
pnpm install
pnpm dev      # servidor de desarrollo (webpack, no Turbopack)
pnpm build    # build de producción
pnpm lint     # ESLint
```

## Estructura

```
app/          — Rutas y layout (Next App Router)
components/   — Secciones y componentes UI
lib/          — GSAP, contexto de idioma, SEO, utilidades
lib/locales/  — Traducciones ES / EN
public/       — Assets estáticos (imágenes, CV, favicons)
```

## Secciones

`Navigation → Hero → Projects → Skills → Experience → Photography → Contact`

Todas las secciones respetan `prefers-reduced-motion`. El idioma (ES/EN) se persiste en cookie + localStorage.

## Derechos de autor

Todo el contenido (código, diseño, imágenes y fotografías) es propiedad de **Alex Vicente López**. Queda prohibida su copia, reproducción o redistribución sin autorización escrita.

Contacto: **alexviclop@gmail.com** — Licencia completa en `LICENSE.md`.

---

&copy; 2026 Alex Vicente López
