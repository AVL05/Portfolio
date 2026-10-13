# ALEVICLOP — Alex Vicente López

Portfolio profesional de [Alex Vicente López](https://www.aleviclop.dev), Desarrollador Full-Stack Junior en Valencia con formación en Desarrollo de Aplicaciones Web y Sistemas Microinformáticos y Redes, experiencia profesional y proyectos propios. Presenta casos de estudio, experiencia profesional y trabajo fotográfico mediante una experiencia bilingüe y accesible.

[Ver portfolio](https://www.aleviclop.dev) · [Explorar raw.vives](https://rawvives.aleviclop.dev) · [GitHub](https://github.com/AVL05) · [LinkedIn](https://www.linkedin.com/in/aleviclop/)

> **ALEVICLOP 2.1 — publicación autorizada.** La versión se valida antes de desplegar a producción. La incidencia de LCP móvil permanece abierta; las mediciones históricas no se presentan como resultados actuales.

![Interfaz de Distrito Gourmet](public/projects/distrito_gourmet/distrito-gourmet.png)

## Dirección visual y proyectos

La dirección **Code / Composition** combina una identidad AV vectorial, interfaces reales, fondo azul tinta y superficies en gris mineral. El perfil profesional, los proyectos, el CV y las vías de contacto permanecen accesibles.

| Proyecto | Enfoque | Caso de estudio |
| --- | --- | --- |
| Distrito Gourmet | Aplicación para restaurante: carta, pedidos, reservas y administración | [Ver caso](https://www.aleviclop.dev/proyectos/distrito-gourmet) |
| LumaFlow Studio | Aplicación de escritorio para fotografía e IA local | [Ver caso](https://www.aleviclop.dev/proyectos/lumaflow-studio) |
| raw.vives | Experiencia web para presentar fotografía | [Ver caso](https://www.aleviclop.dev/proyectos/raw-vives) |

Los enlaces apuntan a la versión pública; las capturas del repositorio pueden corresponder a una candidata posterior. Los casos incorporan un portátil responsive con la captura real de la interfaz, preparado para mostrar una futura grabación con controles nativos. Actualmente no hay vídeos configurados.

## Características

- Presentación profesional en español e inglés con preferencia persistente.
- Casos de estudio para aplicaciones full-stack, backend y APIs, y proyectos web y fotográficos.
- Contenido responsive con navegación accesible y objetivos táctiles adecuados.
- Animaciones GSAP compatibles con `prefers-reduced-motion`.
- SEO localizado con canonical, sitemap, robots, Open Graph, Twitter Cards y JSON-LD.
- Formulario de contacto con validación accesible y entrega mediante Web3Forms.
- Analytics y métricas de rendimiento mediante Vercel Analytics y Speed Insights.

## Stack

| Área | Tecnologías |
| --- | --- |
| Framework | Next.js 16.3.8, App Router, React 19 |
| Lenguaje | TypeScript 5.7 |
| Estilos | Tailwind CSS 4, PostCSS |
| Movimiento | GSAP, `@gsap/react`, ScrollTrigger, ScrollToPlugin |
| UI | Radix UI, Lucide, React Icons |
| Tipografía | Space Grotesk, Inter, IBM Plex Mono; Geist en secciones existentes |
| Calidad | ESLint, TypeScript, Node Test Runner, Playwright |
| Plataforma | Vercel, GitHub Actions |

## Arquitectura

```text
app/            Rutas, layouts, metadata, sitemap, robots y endpoints
components/     Secciones del portfolio y componentes reutilizables
components/ui/  Primitivas compartidas de interfaz
lib/            Idiomas, SEO, GSAP y utilidades comunes
lib/locales/    Catálogos de contenido en español e inglés
public/         Imágenes, documentos, favicon y recursos publicados
tests/          Pruebas de integración y contratos del producto
tests/e2e/      Flujos de navegador con Playwright
docs/           Documentación técnica específica
```

Los catálogos de idioma viven en `lib/locales/`. `lib/i18n-paths.ts` define las parejas de rutas y `lib/seo.ts` centraliza las URLs y metadata. Los datos de los casos genéricos están en `lib/case-study-content.ts`; raw.vives mantiene su componente específico.

## Rutas principales

| Español | Inglés |
| --- | --- |
| `/` | `/en` |
| `/sobre-mi` | `/en/about` |
| `/proyectos` | `/en/projects` |
| `/proyectos/raw-vives` | `/en/projects/raw-vives` |
| `/proyectos/lumaflow-studio` | `/en/projects/lumaflow-studio` |
| `/proyectos/distrito-gourmet` | `/en/projects/distrito-gourmet` |
| `/fotografia` | `/en/photography` |
| `/contacto` | `/en/contact` |
| `/legal` | `/en/legal` |

Español reside en la raíz, sin un sitio paralelo `/es`. Hay 16 URLs indexables; las rutas legales quedan fuera del sitemap.

## Requisitos

- Node.js 22.x
- pnpm 10.34.1, conforme a `package.json`

## Instalación y desarrollo

```bash
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 3100
```

Abre [español](http://127.0.0.1:3100/) o [inglés](http://127.0.0.1:3100/en). Utiliza pnpm y conserva `pnpm-lock.yaml`.

Copia [.env.example](.env.example) a `.env.local` para configurar las variables necesarias:

| Variable | Uso |
| --- | --- |
| `WEB3FORMS_ACCESS_KEY` | Clave utilizada únicamente en el servidor para entregar mensajes |
| `NEXT_PUBLIC_SITE_URL` | Origen canónico; por defecto `https://www.aleviclop.dev` |

No versionar `.env.local` ni claves reales. La clave de Web3Forms no debe llevar el prefijo `NEXT_PUBLIC_`.

El formulario de contacto se envía a `POST /api/contact`, que valida,
aplica rate-limit y anti-spam (honeypot + time-trap) y reenvía a Web3Forms
desde el servidor con reintento. Configura la clave solo en el servidor:

```bash
WEB3FORMS_ACCESS_KEY=tu-clave-aqui
```

Sin esta variable el formulario responde `503` con alternativa a email
directo, y el borrador del usuario se conserva en `localStorage`.

Una prueba con una clave válida puede enviar un correo real: usa los tests con proveedor simulado para validar sin contactar al servicio.

El servidor de desarrollo utiliza Turbopack. Para diagnosticar diferencias entre compiladores, usa `pnpm dev:webpack`.

Para probar una build de producción local:

```bash
pnpm build
pnpm start --hostname 127.0.0.1 --port 3100
```

Detén antes el servidor de desarrollo si utiliza ese puerto. Estos comandos no publican la aplicación.

## Comandos

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Inicia el entorno local de desarrollo |
| `pnpm lint` | Ejecuta ESLint sobre el repositorio |
| `pnpm typecheck` | Valida TypeScript sin emitir archivos |
| `pnpm test` | Ejecuta las pruebas de integración con `node:test` |
| `pnpm test:e2e` | Ejecuta los flujos E2E de Playwright |
| `pnpm build` | Genera el build optimizado de producción |
| `pnpm start` | Sirve un build de producción existente |

## Validación

Antes de publicar cambios deben completarse estas comprobaciones:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

Playwright comprueba perfiles de escritorio (1440 × 900) y móvil (390 × 844). Su configuración puede iniciar el servidor local en el puerto 3100. Para utilizar otro servidor ya iniciado, establece `PLAYWRIGHT_BASE_URL` con su URL.

Las pruebas cubren paridad ES/EN, contratos SEO, recursos publicados, accesibilidad básica, navegación, cambio de idioma, formulario de contacto y comportamiento responsive. No sustituyen la revisión visual, los dispositivos físicos ni la comprobación de recepción del correo.

Las mediciones Lighthouse históricas están documentadas por fase. **No se declara resuelto el LCP móvil ni se atribuyen esas mediciones a la candidata 2.1.**

## SEO y descubrimiento

El portfolio expone:

- metadata localizada y URL canonical bajo `www.aleviclop.dev`;
- datos estructurados `Person`, `WebSite` y `ProfilePage`;
- `robots.txt` abierto a rastreadores y referencia al sitemap;
- `sitemap.xml` con todas las rutas públicas indexables;
- favicon público y estable en `/favicon.png`;
- enlaces internos a las páginas de perfil, proyectos, fotografía y contacto.

Los motores de búsqueda mantienen índices independientes. La publicación técnica facilita el descubrimiento, pero la incorporación y posición final dependen de cada buscador.

## Despliegue

Un push a `main` ejecuta GitHub Actions. Los despliegues por Git se mantienen desactivados para esa rama; la publicación se realiza explícitamente mediante Vercel CLI sobre la versión validada. La preview histórica no representa automáticamente el código actual.

El workflow de CI ejecuta lint, tipos, tests, build y Playwright. La configuración de build e instalación está en `vercel.json`; los headers y CSP están en `next.config.mjs`.

La URL canónica puede configurarse mediante `NEXT_PUBLIC_SITE_URL`; si no se define, se usa `https://www.aleviclop.dev`.

La publicación exige revisar variables de entorno, protección y noindex de staging, contacto, rutas, SEO, enlaces externos y un deployment de rollback.

## Documentación

- [PRODUCT.md](PRODUCT.md): posicionamiento y reglas de contenido verificable.
- [DESIGN.md](DESIGN.md): sistema visual y dirección artística.
- [ALEVICLOP 2.1](docs/ALEVICLOP_2_1.md): integración actual, evidencia y limitaciones.
- [Publicación 2.1](docs/RELEASE_2_1.md): limpieza, validación y despliegue actual.
- [Auditoría M4](docs/M4_FINAL_AUDIT.md): resultados históricos y riesgos.
- [Release Candidate](docs/RELEASE_CANDIDATE.md): preparación, gates y rollback.
- [Validación de staging](docs/STAGING_VALIDATION.md): procedimiento y evidencia de la preview anterior.

## Seguridad y contenido

- No deben versionarse archivos `.env`, secretos, fotografías RAW ni exportaciones temporales.
- Los recursos publicados deben residir en `public/` y estar referenciados por el código o la documentación.
- El contenido, código, diseño e imágenes pertenecen a Alex Vicente López salvo indicación expresa.

## Licencia y contacto

Consulta [LICENSE.md](LICENSE.md): **todos los derechos reservados**. No reutilizar contenido sin permiso.

Contacto profesional: [alexviclop@gmail.com](mailto:alexviclop@gmail.com)
