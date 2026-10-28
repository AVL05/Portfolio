<div align="center">

# ALEVICLOP

### Portfolio de Alex Vicente López

**Desarrollador Full-Stack · Frontend, backend y experiencias web**

Valencia, España · React · Next.js · JavaScript · PHP · Laravel

Un portfolio pensado para mostrar **trabajo real, decisiones técnicas y atención al detalle**, desde la interfaz hasta la lógica de aplicación.

**[Explorar portfolio](https://www.aleviclop.dev)** · **[Ver proyectos](https://www.aleviclop.dev/#proyectos)** · **[LinkedIn](https://www.linkedin.com/in/aleviclop/)** · **[Contacto](mailto:alexviclop@gmail.com)**

</div>

---

## En 30 segundos

Soy Alex, desarrollador Full-Stack con formación en Desarrollo de Aplicaciones Web y Sistemas Microinformáticos y Redes, experiencia profesional desarrollando software y especial interés por crear interfaces cuidadas y aplicaciones útiles.

Este repositorio contiene **mi portfolio personal**, no todos los proyectos que aparecen en él. Lo he construido para que un reclutador o un equipo técnico pueda conocer mi perfil, explorar casos de estudio y acceder a mi contacto sin perderse en una lista interminable de tecnologías.

- **Mi enfoque:** desarrollo web completo, con especial atención a frontend, experiencia de usuario y calidad del producto.
- **Qué encontrarás:** proyectos seleccionados, experiencia, decisiones de diseño y desarrollo, y formas directas de contactar.
- **Idiomas:** español e inglés.
- **Sitio publicado:** **[aleviclop.dev](https://www.aleviclop.dev)**.

> **¿Quieres ver cómo trabajo?** La mejor forma de conocer este proyecto es abrir el [portfolio en vivo](https://www.aleviclop.dev). No se incluye una captura genérica ni la imagen de otro proyecto como si fuera la portada de esta web.

## Trabajo seleccionado

Tres proyectos con enfoques distintos: resolver un flujo de negocio, diseñar software para un sector creativo y construir una experiencia visual propia.

| Proyecto | Problema / enfoque | Explorar |
| :--- | :--- | :--- |
| **Distrito Gourmet** | Experiencia digital para un restaurante: carta, pedidos, reservas y administración. | [Caso de estudio](https://www.aleviclop.dev/proyectos/distrito-gourmet) |
| **LumaFlow Studio** | Herramientas de software para mejorar flujos de trabajo vinculados a fotografía y creación audiovisual. | [Caso de estudio](https://www.aleviclop.dev/proyectos/lumaflow-studio) |
| **raw.vives** | Una galería personal donde la fotografía, la composición y el desarrollo web se encuentran. | [Caso de estudio](https://www.aleviclop.dev/proyectos/raw-vives) |

Los casos de estudio permiten conocer el contexto y el trabajo detrás de cada propuesta. **Cada aplicación tiene su propio alcance**: no todo lo mostrado en el portfolio forma parte de este repositorio.

## Qué aporta este portfolio

| Área | Implementación |
| :--- | :--- |
| **Diseño e interacción** | Dirección visual propia, componentes reutilizables, GSAP y transiciones que respetan las preferencias de movimiento reducido. |
| **Experiencia responsive** | Presentación adaptada a distintos tamaños de pantalla y navegación accesible. |
| **Contenido bilingüe** | Español e inglés, rutas localizadas y preferencia de idioma persistente. |
| **Casos de estudio** | Páginas dedicadas para explicar los proyectos más allá de una simple miniatura. |
| **Contacto** | Formulario validado en el servidor, con controles anti-spam y envío mediante Web3Forms. |
| **SEO** | Metadatos localizados, URLs canónicas, sitemap, robots y datos estructurados. |
| **Calidad técnica** | ESLint, comprobación de tipos, pruebas automatizadas y flujos E2E con Playwright. |

### Tecnologías utilizadas en este repositorio

**Frontend:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS 4, GSAP, Radix UI.

**Tooling y calidad:** pnpm, ESLint, Node.js Test Runner, Playwright, GitHub Actions.

**Infraestructura:** Vercel, Vercel Analytics y Speed Insights.

> El stack de **este portfolio** no representa todas las tecnologías con las que trabajo. También desarrollo aplicaciones con PHP, Laravel y bases de datos relacionales.

---

<details>
<summary><strong>Para desarrolladores: instalación y ejecución local</strong></summary>

### Requisitos

- Node.js 22.x
- pnpm 10.34.1 (declarado en `package.json`)

### Inicio rápido

```bash
git clone https://github.com/AVL05/Portfolio.git
cd Portfolio
corepack enable
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 3100
```

Abre [http://127.0.0.1:3100](http://127.0.0.1:3100). La versión en inglés está disponible en `/en`.

### Variables de entorno

Configura `.env.local` si necesitas probar las funciones que utilizan servicios externos:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3100
WEB3FORMS_ACCESS_KEY=tu_clave_privada
```

| Variable | Uso |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Origen canónico del sitio. |
| `WEB3FORMS_ACCESS_KEY` | Clave privada de envío del formulario de contacto. |

No compartas ni versiones claves reales. El formulario necesita la clave de Web3Forms para entregar mensajes.

### Comandos

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

Para servir una compilación de producción usa `pnpm start`. Para diagnosticar diferencias con el bundler de desarrollo, `pnpm dev:webpack`.

</details>

<details>
<summary><strong>Arquitectura, calidad y publicación</strong></summary>

### Organización

```text
app/                  Rutas, layouts, APIs y SEO
components/           Componentes y secciones
lib/                  Utilidades y lógica compartida
lib/locales/          Textos de español e inglés
public/               Recursos estáticos
tests/                Pruebas automatizadas
tests/e2e/            Pruebas de navegador
docs/                 Decisiones y documentación técnica
.github/workflows/    Integración continua
```

La internacionalización se apoya en `lib/locales/` y `lib/i18n-paths.ts`. La configuración SEO se centraliza en `lib/seo.ts`.

### CI y despliegue

GitHub Actions ejecuta verificaciones del código en `main` y en las pull requests. El proyecto está preparado para Vercel, pero la publicación de producción se gestiona de forma explícita tras la validación; **un merge no equivale automáticamente a un despliegue**.

La documentación de releases y auditorías recoge decisiones y pruebas históricas, no garantías sobre métricas actuales.

### Documentación del proyecto

- [PRODUCT.md](PRODUCT.md) — objetivos y criterios del portfolio.
- [DESIGN.md](DESIGN.md) — lenguaje visual y decisiones de diseño.
- [docs/EXPERIENCE_REDESIGN.md](docs/EXPERIENCE_REDESIGN.md) — evolución de la experiencia.
- [docs/RELEASE_CANDIDATE.md](docs/RELEASE_CANDIDATE.md) — controles previos a publicación.
- [AGENTS.md](AGENTS.md) — contexto para agentes de desarrollo.

</details>

---

## Hablemos

Busco seguir creciendo profesionalmente en desarrollo web y participar en proyectos donde importen tanto la implementación técnica como la experiencia de quien los utiliza.

**[Visitar mi portfolio](https://www.aleviclop.dev)** · **[Conectar en LinkedIn](https://www.linkedin.com/in/aleviclop/)** · **[Escribirme por email](mailto:alexviclop@gmail.com)**

<sub>Desarrollado por Alex Vicente López · Valencia, España</sub>

### Licencia

Este es un proyecto personal. El código, el diseño y los contenidos están sujetos a **todos los derechos reservados**. Consulta [LICENSE.md](LICENSE.md) antes de reutilizar cualquier parte.
