# ALEVICLOP 2.1 — integración de la dirección principal

El usuario autoriza integrar Code / Composition como home local. No se ejecutan commit, push o despliegue. El lanzamiento sigue detenido.

## Cambios

- Hero real de Next.js con identidad AV vectorial, interfaces reales de LumaFlow y Distrito, y composición elegida. Space Grotesk, Inter y etiquetas existentes se conservan.
- ES: Código. Criterio. EN: Code. Craft. Etiquetas Interfaz / API / Datos traducidas mediante el contexto existente. Nombre, perfil junior, experiencia, CV, GitHub y LinkedIn accesibles.
- Imágenes optimizadas mediante next/image, tamaños responsive y carga eager de los dos recursos del hero. Sin dependencias o activos nuevos para producción.
- GSAP con scope y limpieza correctos: entrada de paneles, líneas y título; contenedor exterior desplazado hasta 18 px con scroll en escritorio. La descripción permanece visible y estacionaria. Hidratación tardía omite la entrada.
- CTA circular con contenido magnético limitado, área fija y desactivación táctil / movimiento reducido.
- Tokens `code-home` locales a la home, fondo azul tinta y gris mineral en proyectos y experiencia. Contraste de texto, enlaces y foco preservado. El resto de funcionalidades de los proyectos se conserva.
- Tests de titulares, layout y geometría del CTA actualizados para la dirección elegida, sin eliminar pruebas de contenido, teclado, responsive, movimiento reducido, CV o SEO.

## Evidencia

- Lint: PASS.
- Typecheck: PASS.
- Node: 51/51 PASS.
- Build final: PASS, 26 páginas generadas.
- Revisión en navegador: ES/EN a 1440 y 390 px, sin overflow horizontal, imágenes del hero cargadas y titular localizado.
- E2E hero/i18n, ejecución final: 31 PASS, 3 SKIP por perfil (ratón solo desktop, diálogo solo móvil, sweep de tamaños solo desktop). Sin fallos. Se conservan pruebas de movimiento reducido, foco, geometría magnética, contenido sin JavaScript, fuentes lentas, hidratación tardía, CV y SEO.

Capturas completas: `artifacts/aleviclop-2-1/home/es-desktop.jpg`, `en-desktop.jpg`, `es-mobile.jpg`, `en-mobile.jpg`. Resultados visuales: `visual-checks.json` en esa carpeta.

## Límites

La home está en http://127.0.0.1:3101/ y http://127.0.0.1:3101/en. No se ha vuelto a medir Lighthouse ni se afirma resolver la incidencia de LCP móvil. No se prueban dispositivos físicos ni todos los navegadores. Esta candidata modifica el código posterior al manifest y la preview anteriores: no se declara que la preview publicada coincida con 2.1. Los prototipos se conservan como historial de exploración y permanecen excluidos de Vercel.

## Case study website presentation

The three case studies share a responsive CSS laptop frame with the existing real screenshot. The image remains uncropped. `ProjectShowcase` supports an optional `videoSrc` rendered with native controls, `playsInline`, no autoplay and `preload="none"`; generic case data uses `demoVideo`. No video is configured or downloaded yet. When adding a narrated recording, provide captions before publication. Live-site links and galleries remain unchanged.

## GitHub synchronization without launch

`vercel.json` disables automatic Git deployments from `main` while launch is paused. GitHub CI remains enabled. Remove this branch guard only when publication is authorized. The Vercel project currently names `master` as its production branch; no project settings, domains or aliases are changed. Local explorations, captures and the unused AI Creative Assistant screenshot remain outside these commits.
