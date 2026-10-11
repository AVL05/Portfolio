# ALEVICLOP 2.0 — M4: Final Quality & Launch Readiness

Fecha: 2026-10-11. Repositorio: `C:\Users\alexv\Documents\Desarrollo\GitHub\Portfolio`. Rama `main`; HEAD de partida `04e13c4a30270454bd423ceb66ea6462f0e776e1`. Trabajo local, sin commit, push, PR ni despliegue.

## 1. Resumen ejecutivo

**CONDITIONAL GO para preparar publicación; NO-GO para afirmar cumplidos los objetivos de rendimiento móvil.** No se detectan defectos graves pendientes de funcionalidad, contenido o dependencias en las comprobaciones ejecutadas. LCP móvil 3.428 s y Performance 84 siguen fuera del presupuesto. Se requiere aceptación explícita de esa limitación y verificación del formulario en hosting antes de publicar.

Se han revisado AGENTS.md, PRODUCT.md, DESIGN.md, los informes M1, M1.5, M2 y M3, componentes afectados, traducciones, rutas, SEO, contacto, CSP, dependencias y CI. Se conserva Next.js/App Router, React, TypeScript, Tailwind, GSAP, contenido real y los cuatro proyectos. La actualización de Next es de parche por seguridad, no una migración.

## 2. Cambios implementados

- **Arranque:** cinco importaciones `next/dynamic` incondicionales se sustituyen por importaciones directas en HomeClient. Las secciones se renderizaban todas inmediatamente: la división anterior no difería su carga y añadía fragmentación/descubrimiento de recursos. SSR, orden, imágenes lazy, interacciones y mejoras diferidas de GSAP se conservan.
- **GSAP:** se elimina registro/importación de ScrollToPlugin sin consumidores. Se conservan ScrollTrigger, los tokens M3, la coreografía del hero y su limpieza. No se añade animación ni se oculta el LCP.
- **Accesibilidad:** tecnologías de proyectos pasan de `div` etiquetado a lista `ul/li` con nombre accesible, manteniendo el layout. Placeholders de nombre, email y mensaje utilizan el color secundario completo: la opacidad anterior producía 4.22:1 en la comprobación del textarea móvil, inferior a 4.5:1; tras corregirlo se mide 7.24:1 sobre el mismo fondo.
- **ES/EN:** enlace legal del footer y selector de idioma de páginas legales llevan a su equivalente. El mapa de navegación incluye ambas legales; el conjunto indexable sigue exactamente en 16 URLs y no genera hreflang para legales.
- **Contacto sin JavaScript:** fallback localizado de email directo. El formulario JSON no se presenta como operativo sin JS; `method="post"` evita enviar datos por query string ante una interrupción. Validación, rate limit, honeypot, time trap, reintento y borrador permanecen.
- **Seguridad:** Next 16.3.4→16.3.8; overrides sharp 0.35.4→0.35.5, source-map-js 1.2.2 y brace-expansion 5.0.9→5.0.12. Se conserva pnpm y se actualiza su lockfile. Audit final sin avisos conocidos; no equivale a un pentest.
- **Preparación:** CI reutiliza `pnpm start` para E2E tras su build existente, en lugar de un servidor de desarrollo. `.vercelignore` excluye `artifacts/` de subidas CLI; las evidencias permanecen en el repositorio local.
- **Regresión:** nueva matriz final cross-browser/axe, Chrome instalado con tap simulado, ausencia de JS, pruebas de contraste por composición de colores, listas accesibles y navegación legal.

No se eliminan proyectos, información profesional, rutas ni funcionalidades de avatar. Las bibliotecas 3D se mantienen para funcionalidades existentes y no se incorporan al hero. No se añaden dependencias de producto. axe 4.10.3 se utiliza como herramienta de auditoría guardada en artifacts, sin incorporarlo al bundle.

## 3. Resultados de pruebas

| Comprobación final | Resultado ejecutado |
| --- | --- |
| pnpm lint | PASS |
| pnpm typecheck | PASS |
| pnpm test | 45 PASS, 0 FAIL |
| Build de producción | PASS; restauración final de la variante retenida verificada por checksum |
| E2E completo de la variante estática retenida | 74 PASS / 14 SKIP previstos / 0 FAIL (88 tests) |
| Regresión tras restauración y build final | 34 PASS / 4 SKIP previstos, hero/motion/contraste/legales |
| Axe cross-browser | 72 scans, 0 violaciones automáticas; resultados inconclusos conservados y revisados |
| Chrome instalado | Seis recorridos ES/EN, versión 154.0.8037.98, tap simulado y teclado, sin pageerror |
| SSR sin JS | Seis recorridos: tres motores × ES/EN; proyectos visibles y fallback de email |
| SEO HTTP | 16 páginas, sitemap 16 URLs, dos OG PNG, request inválida de contacto rechazada |
| Dependencias | Audit de todas las dependencias: 0 avisos conocidos |
| Lighthouse | Tres ejecuciones por perfil, series completas antes/final/control |

Los logs están en `artifacts/visual-review/m4/2026-10-11/validation/`. Las omisiones de Playwright corresponden a escenarios exclusivos de un dispositivo o matrices ejecutadas una sola vez; no son errores ni pruebas retiradas.

La matriz de auditoría automática ejecuta WCAG 2 A/AA, 2.1 AA, 2.2 AA y best practices: home ES/EN a 1440×900, 768×1024 y 390×844, menú abierto, y las otras catorce URLs indexables en desktop, con Chromium, Firefox y WebKit. Incluye seis recorridos sin JS. Chrome instalado se comprueba adicionalmente en los seis tamaños/idiomas, con Tab/Enter, menú, Escape y tap en contextos táctiles.

**Límites del teclado WebKit:** el MiniBrowser de Playwright en Windows recorre controles de formulario con Tab y omite enlaces por su preferencia predeterminada. Se conserva el fallo inicial de esa suposición en `cross-browser-webkit-tab.txt`; no se modifica el portfolio para cambiar una preferencia del navegador. En ese motor se comprueba foco explícito + Enter para el skip link y Tab en controles, además de Escape/foco del diálogo. No se presenta esta prueba como un recorrido de enlaces con Tab en Safari real. [Referencia WebKit sobre tabsToLinks](https://bugs.webkit.org/show_bug.cgi?id=161394).

axe distingue **violaciones** de comprobaciones **inconclusas**. Los resultados originales detectaban ARIA sobre contenedores genéricos y contraste que requería revisión. Se corrigió la semántica y se añadió prueba específica del contraste de placeholders. El control de menú referencia un diálogo existente, oculto cuando está cerrado; su apertura y relación se verifican en los escenarios de menú. Un resultado automatizado limpio no acredita WCAG integral ni prueba con lector de pantalla.

No se ha enviado correo real: éxito, error y envío pendiente usan mocks. Una petición HTTP inválida a `/api/contact` devuelve 400 antes del proveedor. Los artefactos `contact-a11y-before.json` / `contact-a11y-after.json` conservan la medición 4.22→7.24:1. En el entorno local no hay clave Web3Forms; la configuración y entrega real en hosting son gates de publicación pendientes.

## 4. Lighthouse antes/después y LCP

Baseline histórico aprobado M3: móvil 88 / LCP 3.67 s, desktop 100 / LCP 0.76 s, Accessibility 100 / CLS 0. La serie fresca M4 antes se ejecutó sobre esa misma implementación, antes de editar. No se sustituye el histórico por la nueva serie.

Harness sin cambios: `scripts/measure-m15.ps1`, Lighthouse 12.8.2, Node 22.22.2 y Chromium de Playwright contra producción local `127.0.0.1:3100`, no dev/HMR. Tres ejecuciones por perfil y serie, secuenciales, sin E2E ni grabaciones en paralelo. Móvil con throttling simulado ×4, viewport 412×823; desktop preset 1350×940. No se modifica throttling ni se elimina una ejecución por su resultado.

| Serie | Perfil | Run | Performance | LCP ms | TBT ms | CPU benchmark |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| before | mobile | 1 | 87 | 3669.724 | 197.138 | 2618 |
| before | mobile | 2 | 70 | 3790.632 | 751.789 | 2634.5 |
| before | mobile | 3 | 85 | 3686.073 | 243.464 | 2501 |
| before | desktop | 1 | 100 | 752.749 | 0.000 | 2948.5 |
| before | desktop | 2 | 100 | 755.692 | 0.000 | 2909.5 |
| before | desktop | 3 | 100 | 766.343 | 0.000 | 2525 |
| after | mobile | 1 | 86 | 3425.420 | 277.520 | 2804 |
| after | mobile | 2 | 83 | 3431.440 | 348.265 | 2758.5 |
| after | mobile | 3 | 84 | 3427.964 | 332.134 | 2638 |
| after | desktop | 1 | 100 | 721.455 | 0.000 | 2666 |
| after | desktop | 2 | 100 | 727.265 | 0.000 | 2568 |
| after | desktop | 3 | 100 | 749.906 | 0.000 | 2877.5 |
| experiment-dynamic | mobile | 1 | 79 | 3887.104 | 384.128 | 2703.5 |
| experiment-dynamic | mobile | 2 | 80 | 3711.659 | 401.000 | 3114.5 |
| experiment-dynamic | mobile | 3 | 83 | 3721.995 | 297.701 | 2809.5 |
| experiment-dynamic | desktop | 1 | 100 | 784.272 | 0.000 | 2803.5 |
| experiment-dynamic | desktop | 2 | 100 | 773.340 | 0.000 | 2757 |
| experiment-dynamic | desktop | 3 | 100 | 790.741 | 0.000 | 3083.5 |
| Exploratoria inicial, no aceptación | mobile | 1 | 83 | 3375.698 | 375.651 | 2889.5 |
| Exploratoria inicial, no aceptación | desktop | 1 | 100 | 712.640 | 0.000 | 3032 |

| Mediana | Antes | Final | Control dinámico, mismos parches |
| --- | ---: | ---: | ---: |
| mobile Performance | 85 | 84 | 80 |
| mobile LCP ms | 3686.073 | 3427.964 | 3721.995 |
| mobile TBT ms | 243.464 | 332.134 | 384.128 |
| desktop Performance | 100 | 100 | 100 |
| desktop LCP ms | 755.692 | 727.265 | 784.272 |
| desktop TBT ms | 0.000 | 0.000 | 0.000 |

Accessibility 100 y CLS 0 en las dieciocho ejecuciones de estas tres series. El final también conserva Best Practices y SEO 100. **Móvil 84 / LCP 3.428 s: no cumple ≥90 ni ≤2.5 s. Desktop 100 / LCP 0.727 s sí cumple ≥95.** La serie histórica M3 88→84 tampoco se presenta como mejora de Performance. La serie fresca antes tiene TBT 197–752 ms con benchmarks cercanos, por lo que el benchmark por sí solo no explica toda la variabilidad. El control con parches idénticos no recupera el TBT ni el LCP: se conserva la variante estática medida, que obtiene mejores medianas que ese control. Ambas variantes y todos sus runs permanecen publicados, sin seleccionar solo las mejores ejecuciones.

La máquina no ofrece CPU controlada: se publican los benchmarks individuales. Las diferencias de puntuación no se atribuyen íntegramente al código. La serie exploratoria `experiment-imports/` contiene una ejecución por perfil de la primera build candidata. El control `experiment-dynamic/` restaura las cinco importaciones con exactamente los mismos parches y otras correcciones: tres ejecuciones por perfil. La variante estática queda retenida tras comparar ambas series; no se seleccionan ejecuciones dentro de cada serie. Tras el control se restaura HomeClient byte a byte (SHA256 en `validation/source-restoration.json`) y se recompila esa misma fuente validada por la suite completa.

### Diagnóstico del elemento LCP

Se analizan mobile-3 de ambas series (ejecuciones representativas de sus medianas, conservando las seis completas). Elemento textual: `p[data-hero-copy]`.

| Fase simulada | Antes ms | Final ms |
| --- | ---: | ---: |
| TTFB | 453.691 | 451.866 |
| Load Delay | 0.000 | 0.000 |
| Load Time | 0.000 | 0.000 |
| Render Delay | 3232.382 | 2976.098 |

Traza observada local: TTFB 9.916→10.285 ms y render delay 330.512→537.608 ms. Estos valores no son el LCP simulado ni los objetivos móviles. Las tres fuentes críticas finalizan antes del candidato LCP; sus URLs, tiempos, CSS bloqueante, cobertura JS y eventos más largos están en los diagnosis.json. La tabla principal de Lighthouse conserva la métrica válida para evaluar aceptación.


La descripción `p[data-hero-copy]` está presente en SSR, con opacidad 1 y sin transformación. Ya era así en M3 y las pruebas lo confirman después: mostrarla no requiere una nueva animación ni esperar al resto de la secuencia. Los titulares mantienen sus máscaras y la coreografía editorial; GSAP no anima la descripción. No se demuestra que una espera de la timeline explique el render delay de Lighthouse.

La mejora del LCP simulado no implica una mejora global de CPU: en estas trazas representativas el render observado aumenta de 330.512 a 537.608 ms y el Layout más largo permanece en ~121 ms sobre 831 objetos. El TBT final también supera la mediana fresca anterior. El control con importaciones dinámicas y los mismos parches resulta peor, pero no aísla la contribución de la actualización de Next frente a la variabilidad de la máquina. Se conserva la reducción verificable de recursos y se registra la incidencia completa, sin atribuirla arbitrariamente a GSAP ni declarar resuelto el renderizado.

La investigación anterior y las trazas locales muestran estilo/layout sobre cientos de objetos y evaluación de scripts antes del candidato LCP. Las fuentes críticas ya están precargadas; no hay imagen LCP ni un recurso de proyecto que descubrir. Los audits de render delay **simulado** incluyen el modelo de Lighthouse y no deben confundirse con las subpartes **observadas** de la traza local. Tampoco representan métricas p75 de usuarios reales.

La candidata inicial reduce solicitudes JavaScript 19→12, transferencia JavaScript 264082→244452 bytes y CSS 3→2 recursos, 21556→20128 bytes (mobile-2 antes frente a mobile-1 exploratoria). Es una reducción de recursos verificable; los parches de dependencias también forman parte de la candidata, por lo que no se atribuye cada byte exclusivamente a la simplificación de imports.

No se oculta contenido para reducir layout, no se introducen alturas estimadas ni se sustituyen tipografías por fallbacks para perseguir el score. No se afirma que alcanzar 2.5 s sea imposible: no se ha demostrado una corrección adicional segura que lo alcance dentro de esta implementación. El siguiente trabajo de rendimiento debe aislar coste de layout/hidratación con CPU estable, medir cambios pequeños y conservar SEO, SSR, accesibilidad y composición.

Reportes reproducibles en `artifacts/performance/m4/2026-10-11/{before,after}/`: `runs.json`, seis `.report.html`, seis `.report.json`, seis `.devtoolslog.json` y seis trazas completas `.trace.json.gz` por serie. El harness verifica la compresión sin pérdida. `diagnosis.json` conserva el elemento y las fases elegidas para el análisis; no se presenta esa ejecución aislada como mediana.

## 5. Auditoría visual y empleabilidad

Se conserva Equilibrio Premium: Space Grotesk, Inter, IBM Plex Mono, azul de marca y contraste marfil de Distrito. No se copia código, assets ni diseño del referente. Se revisan hero, escenas, casos, capacidades, experiencia, fotografía, contacto y footer mediante capturas, navegador local y muestras de las grabaciones.

| Escenario heurístico | Evaluación |
| --- | --- |
| Reclutador, 30 segundos | Nombre, especialidad Junior Full-Stack y ubicación en el hero; proyectos y CV como acciones principales; experiencia/formación, GitHub y LinkedIn accesibles. El texto permite comprender frontend, backend y datos sin necesitar una interacción decorativa. |
| Responsable técnico, cinco minutos | Cuatro proyectos diferenciados; stack, rol, evidencias y destinos explícitos. Tres casos reales bilingües. AI tiene código privado y contacto, no una demo pública inventada. Luma distingue IA sin modelo y datos de ejemplo; raw.vives se presenta como caso web + fotografía. |

Esto es una revisión experta de encontrabilidad, no una prueba con reclutadores reales ni una métrica de conversión. No se añaden empleo, tecnologías, resultados o métricas nuevas. Se conservan todas las traducciones profesionales.

Mejoras estéticas opcionales: el microcopy de Luma que aclara «sin convertir el proyecto en un SaaS ficticio» podría formularse de forma más directa; las páginas legales mantienen parte del lenguaje visual legacy. No se considera ninguno un defecto funcional ni se rediseñan estas superficies arbitrariamente en el cierre.

## 6. SEO, seguridad y enlaces

- Verificación HTTP de las 16 páginas indexables: 200, un h1, título, descripción, canonical propio, tres alternates recíprocos y x-default español, Open Graph y JSON-LD. Sitemap exactamente 16 URLs, sin legales; robots preservado. Dos respuestas OG PNG reales, ES/EN, guardadas en validation.
- Legales siguen noindex/no-follow y sin hreflang indexable; se normalizan `/es/*` existentes y se conserva 404 para rutas desconocidas. Tests Node/E2E cubren esas relaciones.
- Se preservan CSP, frame-ancestors, nosniff, HSTS, Referrer-Policy y Permissions-Policy. No se amplían permisos ni se exponen claves. La CSP conserva `unsafe-inline` de la arquitectura Next actual y las excepciones locales de media; pasar a nonces exigiría validar renderizado/caché y no se declara implementado.
- Audit inicial de producción: 9 avisos (1 crítico, 3 altos, 4 moderados y 1 bajo). Tras los parches, audit de todas las dependencias: 0. [Advisory oficial next/og](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j) y [release source-map-js 1.2.2](https://github.com/7rulnik/source-map-js/releases/tag/v1.2.2). La vulnerabilidad next/og exige entradas controladas en SVG; la ruta del portfolio utiliza div/texto, no se afirma explotación demostrada.
- Formulario server-only, validación y protecciones existentes verificadas por tests. El rate limit en memoria es por instancia: no equivale a un límite distribuido en Vercel. No se cambia la infraestructura en esta fase.
- Dominio principal HTTPS y redirección apex→www responden 200 con validación TLS correcta. Distrito, raw.vives, e-commerce y repositorio raw devuelven 200. raw termina en `/en` en curl; el navegador ya confirmó su galería en M3. No se modifica DNS ni se inventa otra URL.
- GitHub y LinkedIn conservan sus URLs reales. LinkedIn devolvió HTTP 999 al cliente automatizado; un bloqueo de transporte no se considera un perfil inexistente. Ver `validation/professional-links.json`.
- Vercel Analytics/Speed Insights ya existentes se activan solo en Vercel. La medición local no acredita su coste en el candidato publicado ni su configuración cloud; se requiere una comprobación posterior en preview.

Evidencia: `validation/seo-http.json`, `sitemap.xml`, `robots.txt`, `og-es.png`, `og-en.png`, `public-links.json`, `professional-links.json`, `dependency-audit*.json` y presencia de entorno sin valores secretos. `browsers.json` conserva versiones y ejecutables; `build-asset-identity.json` confirma que los 17 recursos con fingerprint del informe retenido existen en la build final.

## 7. Incidencias y riesgos de lanzamiento

| Prioridad | Incidencia | Consecuencia / gate |
| --- | --- | --- |
| P1 de rendimiento | Objetivo LCP móvil | Mantener abierto si la mediana supera 2.5 s; no declarar aprobado. Repetir bajo CPU estable y validar experiencia real de móvil antes de cerrar el presupuesto. |
| Gate operativo | Web3Forms en hosting y entrega real | No hay clave local ni envío real. Confirmar configuración server-only en preview/producción y recepción con autorización antes de publicación. Email directo permanece accesible. |
| Gate de publicación | Árbol de trabajo con M1–M4 sin commit | Revisar diff completo, activos y cambios heredados; seleccionar archivos deliberadamente y ejecutar CI tras autorizar commit/push. |
| Cobertura | Safari real, dispositivos físicos y lector de pantalla | No ejecutados. WebKit automatizado no sustituye esos entornos, especialmente la preferencia de teclado. |
| Operativo | Rate limit por instancia; CSP inline heredada | Riesgos limitados existentes que deben registrarse, sin presentar la auditoría como pentest ni protección distribuida. |
| Verificación posterior | Analytics y métricas de campo | Preview/producción pueden añadir coste de scripts; observar Web Vitals reales después de publicar con autorización. |

## 8. Checklist de publicación y rollback

- [x] Conservar la rama actual y el trabajo previo; sin commit/push/despliegue.
- [x] Build de producción local y revisión de contratos profesionales/ES/EN.
- [x] Parches de seguridad con lockfile pnpm y audit final sin avisos conocidos.
- [x] SEO indexable, sitemap, robots y OG verificados localmente.
- [x] Comprobación HTTP de HTTPS/apex/www y demos existentes; sin cambios DNS.
- [x] Evidencias guardadas; `artifacts/` fuera de subidas Vercel CLI y de `public/`.
- [ ] Aceptar explícitamente la incidencia móvil si sigue fuera del presupuesto; no cambiar los objetivos para presentar un GO.
- [ ] Confirmar `WEB3FORMS_ACCESS_KEY` server-only en los entornos de hosting necesarios. Alias legacy `CONTACT_WEB3FORMS_KEY` aceptado por el servidor; ninguna clave `NEXT_PUBLIC_*`.
- [ ] Confirmar `NEXT_PUBLIC_SITE_URL=https://www.aleviclop.dev` o conservar su fallback canónico; Node 22/pnpm 10, `pnpm install --frozen-lockfile`, `pnpm build` y `.next` en Vercel.
- [ ] Verificar entrega real de formulario, fallback/reintento y borrador en preview con autorización de envío.
- [ ] Revisar accesibilidad con lector de pantalla y experiencia en dispositivos físicos/Safari; conservar los límites automatizados en el registro.
- [ ] Revisar el diff heredado completo y separar código/activos profesionales de evidencias pesadas antes de autorizar commit/push.
- [ ] Ejecutar CI sobre el SHA autorizado y smoke en preview de rutas, imágenes, CV, formularios, CSP, analytics y SEO.
- [ ] Registrar la URL/ID y SHA de la última **deployment sana real** antes de promover el candidato. El HEAD de partida de este informe no se declara SHA de producción.
- [ ] Autorizar publicación; comprobar dominio final, SSL, redirecciones, 404, canonical, hreflang y contacto tras publicar.

**Rollback preparado, no ejecutado:** conservar la deployment sana de Vercel y sus variables; ante una regresión, promover esa deployment mediante el flujo autorizado de Vercel, verificar dominio y smoke. No usar force-push ni reset destructivo. Si hace falta corregir código después, preparar un revert convencional únicamente con autorización. No hay migraciones de datos/infraestructura nuevas que revertir en M4.

## 9. Evidencias visuales y recomendación

Base de evidencias: `artifacts/visual-review/m4/2026-10-11/`.

| Tamaño / idioma | Antes completo | Después completo | Grabación final |
| --- | --- | --- | --- |
| Desktop ES | [PNG](../artifacts/visual-review/m4/2026-10-11/before/desktop-es-full.png) | [PNG](../artifacts/visual-review/m4/2026-10-11/after/desktop-es-full.png) | [WebM](../artifacts/visual-review/m4/2026-10-11/after/desktop-es-motion.webm) |
| Desktop EN | [PNG](../artifacts/visual-review/m4/2026-10-11/before/desktop-en-full.png) | [PNG](../artifacts/visual-review/m4/2026-10-11/after/desktop-en-full.png) | [WebM](../artifacts/visual-review/m4/2026-10-11/after/desktop-en-motion.webm) |
| Tablet ES | [PNG](../artifacts/visual-review/m4/2026-10-11/before/tablet-es-full.png) | [PNG](../artifacts/visual-review/m4/2026-10-11/after/tablet-es-full.png) | [WebM](../artifacts/visual-review/m4/2026-10-11/after/tablet-es-motion.webm) |
| Tablet EN | [PNG](../artifacts/visual-review/m4/2026-10-11/before/tablet-en-full.png) | [PNG](../artifacts/visual-review/m4/2026-10-11/after/tablet-en-full.png) | [WebM](../artifacts/visual-review/m4/2026-10-11/after/tablet-en-motion.webm) |
| Mobile ES | [PNG](../artifacts/visual-review/m4/2026-10-11/before/mobile-es-full.png) | [PNG](../artifacts/visual-review/m4/2026-10-11/after/mobile-es-full.png) | [WebM](../artifacts/visual-review/m4/2026-10-11/after/mobile-es-motion.webm) |
| Mobile EN | [PNG](../artifacts/visual-review/m4/2026-10-11/before/mobile-en-full.png) | [PNG](../artifacts/visual-review/m4/2026-10-11/after/mobile-en-full.png) | [WebM](../artifacts/visual-review/m4/2026-10-11/after/mobile-en-motion.webm) |

Ambas carpetas conservan seis heroes, menús y previews desktop, vídeos y `matrix.json`. Después añade 24 recortes de proyectos, seis auditorías de layout/frames y `after/cases/` con 18 completas y 18 heroes (tres casos × tres tamaños × dos idiomas). `after/cross-browser/` guarda capturas completas por motor, Chrome instalado y reportes axe con sus resultados inconclusos; la matriz final distingue teclado programático de Tab real. Las grabaciones son vídeo a 25 fps, no un benchmark de fluidez. Se revisan muestras de fotogramas y capturas, sin prometer una garantía de 60 fps.

**Recomendación final: CONDITIONAL GO.** El candidato puede pasar a revisión de publicación con seguridad y funcionalidades verificadas, conservando como condiciones la aceptación explícita del presupuesto móvil pendiente, comprobar Web3Forms/entrega real en hosting y autorizar el flujo Git/publicación. Sin esas condiciones no se recomienda promover a producción. No se declara GO ni se inicia la publicación.
