# Portfolio v4 — Alex Vicente López

**Portfolio profesional** construido con Next.js 16, React 19 y TypeScript. Disponible en [aleviclop.dev](https://aleviclop.dev).

Proyecto principal: [raw.vives](https://gallery.aleviclop.dev/), un archivo fotográfico editorial bilingüe con 30 fotografías, 3 series y una [página de caso de estudio](https://aleviclop.dev/proyectos/raw-vives).

![raw.vives en producción](public/projects/raw-vives/raw-vives-hero.webp)

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
pnpm typecheck
pnpm test
pnpm test:e2e # Playwright: navegación, idiomas, archivo y formulario
```

## Estructura

```
app/          — Rutas, layout, metadata y favicon (Next App Router)
components/   — Secciones y componentes UI
lib/          — GSAP, contexto de idioma, SEO, utilidades
lib/locales/  — Traducciones ES / EN
public/       — Assets estáticos publicados (imágenes, documentos y CV)
docs/         — Integración y operación
```

## Secciones

`Navigation → Hero → Project scenes → Photography → Capabilities → Experience → Contact`

Todas las secciones respetan `prefers-reduced-motion`. El idioma (ES/EN) se persiste en cookie + localStorage.

## Despliegue

La rama `main` se valida con GitHub Actions y se publica en Vercel mediante la integración del repositorio. El rollback consiste en restaurar el deployment estable desde Vercel o revertir el commit publicado y volver a ejecutar CI.

## Derechos de autor

Todo el contenido (código, diseño, imágenes y fotografías) es propiedad de **Alex Vicente López**. Queda prohibida su copia, reproducción o redistribución sin autorización escrita.

Contacto: **alexviclop@gmail.com** — Licencia completa en `LICENSE.md`.

---

&copy; 2026 Alex Vicente López
