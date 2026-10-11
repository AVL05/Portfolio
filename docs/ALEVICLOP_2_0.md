# ALEVICLOP 2.0 — especificación y seguimiento

Solicitud del usuario: 2026-10-10. Solo M1 está autorizado para esta entrega.
No hacer commit, push, PR ni despliegue. Trabajar en la rama actual.

Revisión posterior de M1: [informe visual y de calidad](M1_VISUAL_REVIEW.md),
con capturas completas ES/EN dentro de `artifacts/visual-review/m1/2026-10-10/`
y mediciones Lighthouse. Sus resultados posteriores prevalecen sobre la tabla
original de entrega de M1 para los checks que se han repetido.

## Objetivo y dirección

Portfolio premium para empleabilidad, manteniendo a Alex Vicente López como
Desarrollador Full-Stack Junior. Ingeniería, criterio visual y evidencia real;
proyectos, experiencia, formación, stack, GitHub, CV y contacto fáciles de encontrar.
No inventar experiencia, disponibilidad, responsabilidades, tecnologías ni resultados.

Equilibrio Premium: 50% Dark Editorial, 30% Creative Technology, 20% Bold Experimental.
Referencia: https://dennissnellenberg.com/ (inspiración, sin copiar código, textos o imágenes).
Minimalismo, escala monumental, espacio negativo y asimetría controlada. Movimiento
intencional; evitar partículas, neones, gradientes de IA, glassmorphism y 3D ornamental.

La referencia se revisó en navegador, incluyendo hero desktop/móvil y el paso al
contenido y contacto. Se observó escala tipográfica protagonista, navegación breve,
espacio negativo, contraste claro/oscuro y una transición curva en el cierre móvil.
M1 toma la escala, la jerarquía y la contención; no reproduce el retrato, el marquee,
la pantalla de carga ni esa transición. Previews de proyectos quedan para M2.

## Sistema visual

- Fondo: `#0B0D12`; superficie: `#171A22`.
- Texto: `#F5F3EE`; secundario: `#A6AAB7`.
- Azul principal: `#7686FF`; naranja puntual: `#FF6542`.
- Secciones marfil permitidas para contraste editorial en hitos posteriores.
- Display: Space Grotesk; cuerpo: Inter; etiquetas: IBM Plex Mono.
- Escala con `clamp()`, grid de 12 columnas, máximo 1440px y márgenes responsive.
- Tokens compartidos de color, tipografía, espaciado y movimiento.

## M1 — Design Foundation + Hero

- Auditar instrucciones, PRODUCT.md, DESIGN.md, stack, dependencias, estilos,
  componentes, i18n, rutas, casos, motion, tests, CI y configuración.
- Header: AV, Proyectos/Work, Sobre mí/About, Contacto/Contact y ES/EN.
- Hero ES: «CONVIERTO IDEAS / EN EXPERIENCIAS / DIGITALES.».
- Hero EN: «TURNING IDEAS / INTO DIGITAL / EXPERIENCES.».
- Última línea azul. Nombre completo y perfil junior visibles, con Valencia.
- ES: «Soy Alex Vicente, desarrollador full-stack. Creo aplicaciones que combinan
  ingeniería, diseño y experiencias digitales.»; versión EN equivalente.
- CTA a proyectos y descarga del CV real. Indicador de scroll, enlaces profesionales
  y acceso a experiencia/formación. Disponibilidad solo con confirmación actual.
- Timeline GSAP ~1,3s: indicador → máscaras de líneas → descripción/CTA → pie.
  `power3.out` / `expo.out`. Scroll muy sutil, sin pin ni scrolljacking.
- Botones magnéticos limitados, solo ratón; zona clicable fija, foco visible.
- Contenido visible en SSR y sin JS. Movimiento reducido desactiva animaciones.
- Validar español/inglés, desktop 1440×900, móvil 390×844, teclado y responsive.

## M2 — Selected Work — PENDIENTE

Orden solicitado: LumaFlow Studio, Distrito Gourmet, AI Creative Assistant y raw.vives
como caso creativo web + fotografía. Mantener contenido verificable y rutas existentes.
Cada proyecto: imagen real amplia, categoría, descripción, tecnologías relevantes,
enlaces funcionales y estudio de caso cuando exista. Identidad diferenciada, reveals
con máscaras, previews desktop, parallax moderado y equivalentes táctiles con sentido.
Mejorar estudios de caso progresivamente. No usar stock como sustituto definitivo.

## M3 — Motion & Polish — PENDIENTE

Coherencia entre secciones, microinteracciones y refinamiento de scroll y móvil.
Reutilizar utilidades actuales antes de crear HeroReveal, FadeUp, SplitTextReveal,
ProjectReveal, MagneticButton, ProjectHoverPreview, ScrollProgress o SectionTransition.
Sin animaciones redundantes, scrolljacking, ocultación por hidratación, saltos de layout
ni secciones bloqueadas. GSAP con scope y limpieza de contextos/listeners/observers.
Lenis y Three.js son opcionales: no añadirlos sin una necesidad justificada.

Estructura final prevista: Hero → Selected Work → How I Build → Experience & About →
Beyond the Code → Contact. No adelantar el rediseño de estos bloques en M1.

## M4 — Quality & Launch — PENDIENTE

Tests, accesibilidad, rendimiento, SEO, capturas comparativas y revisión final.
Objetivos medidos, nunca supuestos: Lighthouse móvil Performance ≥90 y Accessibility
≥95; LCP p75 ≤2,5s y CLS ≤0,1. El percentil 75 requiere datos de campo representativos;
un informe Lighthouse local no acredita ese objetivo. Teclado completo, reducción de
movimiento, imágenes optimizadas y sin errores relevantes de consola/overflow.
Preservar canonical, hreflang recíproco, x-default ES y 16 URLs indexables.
Publicación en producción requiere autorización independiente.

## Decisiones de implementación M1

- Hero tipográfico en componentes existentes. La escena 3D y sus assets se conservan,
  pero no se montan en la home: no hay transferencias GLB para la primera impresión.
- `.premium-home` contiene la nueva paleta. Hero/header usan las nuevas fuentes;
  el resto conserva su estructura y tipografía hasta sus siguientes hitos.
- Fuentes mediante `next/font/google`: autoalojadas por Next, sin peticiones a Google
  desde el navegador y sin ampliar CSP. La compilación descarga fuentes de Google.
- Diálogo nativo móvil: aislamiento/foco nativos, Escape, cierre y retorno al trigger.
  Sin JS, hay navegación alternativa y se oculta el botón que requiere hidratación.
- El magnetismo mueve únicamente el contenido de los CTA (máximo 4px X / 3px Y).
- `gsap.matchMedia()` revierte entrada, scroll y magnetismo cuando cambia reduced motion.
- Se elimina el Suspense global con fallback nulo: sus segmentos SSR ocultaban toda
  la página sin JavaScript. Se conserva la carga dinámica de las secciones existentes.
- Tests de assets 3D conservados. E2E del antiguo estudio sustituido por el contrato
  del nuevo hero; se adaptan expectativas de titular e i18n, sin reducir garantías SEO.
- Sin nuevas dependencias, cambios de rutas, contacto, datos profesionales ni infraestructura.

## Validación M1

Realizada localmente con Node 22.22.2 y pnpm 10.34.1, sin publicar:

| Comprobación | Resultado |
| --- | --- |
| `pnpm lint` | PASS |
| `pnpm typecheck` | PASS |
| `pnpm test` | PASS — 44 tests |
| `pnpm build` | PASS — build de producción y generación de 26 páginas |
| `pnpm test:e2e` sobre `pnpm start`, puerto 3100 | PASS — 31 tests, 3 omisiones por tipo de viewport |
| ES/EN a 1440×900 y 390×844 | PASS — revisión visual y capturas del build |
| 320px, 768px y 1024px | PASS — titular sin recortes ni overflow |
| JS desactivado, ES/EN y ambos viewports | PASS — hero, CTA CV y navegación alternativa |
| Reduced motion y cambio de preferencia en ejecución | PASS — transforms revertidos |
| Magnetismo desktop | PASS — desplazamiento acotado y área clicable fija |
| Menú móvil y teclado | PASS — aislamiento nativo, Escape, retorno de foco y enlace a experiencia |
| Contraste de cuerpo, titular azul y CTA primario | PASS — ≥4,5:1, calculado desde estilos renderizados |
| Canonical, hreflang, rutas equivalentes e indexabilidad | PASS — tests Node y E2E; 16 URLs indexables |
| CV y media local | PASS — respuestas HTTP disponibles |
| Regresión de contacto | PASS — validación y respuesta exitosa simulada; no envío real al proveedor |
| Consola del build, hero ES/EN | PASS — sin errores observados ni `pageerror` en las pruebas |
| Lighthouse / Core Web Vitals de campo / lector de pantalla real | NOT RUN |

Las 3 omisiones corresponden a menú móvil en desktop, magnetismo de ratón en móvil
y barrido adicional de tamaños (ya ejecutado con el contexto desktop). No son fallos.
Las capturas están fuera del repositorio, en la carpeta de visualizaciones de esta
sesión. No se añaden imágenes temporales a `public/`.

Durante la edición, Turbopack emitió errores de actualización de chunks CSS en la
pestaña antigua. La comprobación final usa un build limpio y una pestaña nueva,
sin esos errores. Los primeros E2E detectaron el Suspense global oculto sin JS;
ese problema está corregido y cubierto por pruebas.

La fase posterior de optimización está documentada en [M1_5_PERFORMANCE.md](M1_5_PERFORMANCE.md),
con series Lighthouse, capturas en el repositorio y validación final. Sus objetivos
móviles siguen pendientes; este registro de M1 conserva sus resultados históricos.

M2, M3 y M4 siguen pendientes. Esta validación no acredita Lighthouse, cumplimiento
integral WCAG ni LCP/CLS p75 de producción. No se ejecutó commit, push, PR o despliegue.

## Estado actual — extensión aprobada M2 (2026-10-10)

M2 está implementado localmente: cuatro escenas diferenciadas en Projects reutilizado, capturas reales optimizadas, reveals/parallax acotados y los tres casos existentes ampliados. [Informe M2, decisiones, capturas y validaciones](M2_SELECTED_WORK.md).

La indicación inicial «solo M1 autorizado» y las secciones pendientes anteriores conservan el historial original; la autorización posterior habilita M2. M3, M4, commit, push, PR y despliegue siguen pendientes de autorización. Cierre de validación el 2026-10-11: lint, typecheck, 44 tests Node y build PASS; suite E2E final 57 PASS/11 SKIP, matriz de casos explícita PASS y revisión independiente de correcciones resuelta. Seis Lighthouse de producción: medianas móvil 87 y LCP 4.00s, desktop 99 y LCP 0.826s, Accessibility 100 y CLS 0. La incidencia LCP móvil sigue pendiente; ver serie completa y límites en el informe M2. Este estado no sustituye las mediciones ni validaciones históricas de M1/M1.5.

## Estado actual — M3 implementado para revisión (2026-10-11)

La autorización posterior habilita M3: tokens compartidos, coordinación de entradas, previews reversibles y cargados antes de mostrarse, cursor nativo, navegación activa, feedback del formulario y continuidad tipográfica. Se conserva el hero y su descripción LCP visible. M2 está aceptado funcionalmente y pendiente de revisión visual definitiva. [Informe M3, series completas, capturas y grabaciones](M3_MOTION_POLISH.md).

Validación final: lint, typecheck, build, 44 tests Node PASS; E2E 68 PASS / 12 SKIP / 0 FAIL, más seis repeticiones de movimiento reducido. Lighthouse después (tres ejecuciones por dispositivo): mediana móvil 88 / LCP 3.673 s, desktop 100 / LCP 0.758 s, Accessibility 100 / CLS 0. Se conserva la serie fresca antes y la advertencia de variabilidad CPU; no se atribuye toda la diferencia al código. Objetivos móviles ≥90 / ≤2.5 s pendientes. M3 queda preparado para aprobación de movimiento con esa incidencia abierta. M4, commit, push, PR y despliegue no se ejecutan.

## Estado actual — M4: auditoría y preparación de publicación (2026-10-11)

M4 ejecutado localmente: parches de seguridad, reducción de fragmentación inicial, semántica y contraste, navegación legal bilingüe, fallback de contacto sin JS y preparación de E2E de producción. [Informe final M4, series completas, capturas y checklist](M4_FINAL_AUDIT.md).

Dictamen: CONDITIONAL GO para preparar publicación, condicionado a aceptar la incidencia móvil y verificar Web3Forms/entrega real en hosting. Objetivos móviles no cumplidos: mediana final Performance 84 / LCP 3.428 s; desktop 100 / LCP 0.727 s, Accessibility 100 / CLS 0. Se conserva la comparación fresca anterior y un control con importaciones dinámicas y parches idénticos. Validación de la variante retenida: 45 Node PASS, 74 E2E PASS / 14 SKIP previstos, 72 scans axe sin violaciones automáticas, comprobaciones inconclusas revisadas y Chrome/Firefox/WebKit automatizados con límites documentados. No se hizo commit, push, PR ni despliegue; no se sustituye el historial de M1–M3.
