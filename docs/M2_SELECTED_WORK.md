# M2 — Selected Work

Extensión aprobada el 2026-10-10, validación cerrada el 2026-10-11, implementada localmente en la rama actual. No se ha hecho commit, push, PR ni despliegue. M3 y M4 conservan su autorización independiente. Este informe complementa M1 y M1.5; no sustituye su evidencia histórica.

## Alcance y decisiones

Se reutiliza `Projects` tanto en la home como en el índice de proyectos, con los mismos cuatro índices de contenido y rutas ES/EN. La secuencia implementada es AI Creative Assistant → Distrito Gourmet → LumaFlow Studio → raw.vives. El orden solicitado inicialmente queda registrado en ALEVICLOP_2_0.md; esta entrega documenta el orden efectivo del código, sin alterar los datos profesionales.

- AI Creative Assistant: escena principal panorámica. Captura real del cliente web de desarrollo del repositorio hermano; no demuestra ejecución del motor nativo. GitHub confirmó el repositorio PRIVATE: CTA a contacto y texto «Código privado», sin prometer un enlace público que devuelve 404.
- Distrito Gourmet: composición asimétrica, imagen dominante a la izquierda y panel editorial marfil con verde propio del proyecto. En móvil pasa a lectura vertical.
- LumaFlow Studio: texto a la izquierda e interfaz a la derecha, galería real en el caso. Las capturas muestran estado sin modelo y entrega con datos de ejemplo; sus pies lo explicitan y no acreditan resultados de IA ni clientes reales.
- raw.vives: titular de gran escala, archivo fotográfico a la derecha y detalles a la izquierda. Sigue siendo un caso web + fotografía dentro del perfil full-stack.

Imágenes WebP locales con `next/image`, proporciones reservadas y carga diferida. LumaFlow y raw.vives montan una segunda captura solo tras interacción de ratón/foco con puntero fino, hover disponible y sin reducción de movimiento; no se descarga inicialmente ni se exige hover para leer el contenido o acceder al caso. Los enlaces y pies siguen disponibles en táctil.

GSAP reutiliza la infraestructura existente: inicialización diferida al acercarse al viewport, scope local, máscaras `clip-path`, entradas de 18/12px y limpieza de `matchMedia`. Parallax de imagen limitado a −10/+10px únicamente desde 1024px, puntero fino y movimiento permitido. SSR/sin JavaScript mantienen contenido y acciones visibles; reduced motion evita estos efectos. Metadatos colocados debajo de los títulos, sin convertir etiquetas superiores en regla visual.

Los enlaces de imagen a casos usan navegación nativa y nombres de transición compartidos mediante CSS `@view-transition`, como mejora progresiva en navegadores compatibles. La navegación normal preserva el acceso donde esa API no existe; no se habilitan flags experimentales de Next ni dependencias de transición.

Los tres casos existentes (Distrito, LumaFlow y raw.vives) amplían hero, navegación interna por anclas y jerarquía editorial; no se crea una ruta de caso para AI. Se mantienen rutas, canonicals, hreflang, traducciones, índices y contenido factual. No hay stock, claims nuevos, dependencias, vídeo, WebGL ni avance del rediseño M3/M4.

## Procedencia de medios

| Archivo publicado | Fuente real | Bytes |
| --- | --- | --- |
| `public/projects/ai-creative-assistant-ui.webp` | Captura del cliente web del repositorio hermano AI-Creative-Assistant, conservada en `artifacts/visual-review/m2/2026-10-10/source/ai-creative-assistant-development.jpg`; muestra ausencia de motor local | 30662 |
| `public/projects/lumaflow-studio-ai.webp` | `../lumaflow-studio/docs/screenshots/ai-assistant.png`, interfaz sin modelo instalado | 40582 |
| `public/projects/lumaflow-studio-delivery.webp` | `../lumaflow-studio/docs/screenshots/gallery.png`, datos de ejemplo | 38924 |

Distrito y raw.vives reutilizan los medios locales existentes; las ilustraciones conceptuales anteriores no se presentan como interfaz funcional. No se alteraron los originales de los repositorios hermanos.

## Evidencia visual

Raíz absoluta: `C:/Users/alexv/Documents/Desarrollo/GitHub/Portfolio/artifacts/visual-review/m2/2026-10-10/`.
`before/` conserva la línea base; `review/` conserva la revisión intermedia; `after/` contiene la captura posterior a las correcciones. No confundir esas series.

| Viewport | ES antes / después | EN antes / después |
| --- | --- | --- |
| 1440×900 | [antes](../artifacts/visual-review/m2/2026-10-10/before/desktop-es-full.png) / [después](../artifacts/visual-review/m2/2026-10-10/after/desktop-es-full.png) | [antes](../artifacts/visual-review/m2/2026-10-10/before/desktop-en-full.png) / [después](../artifacts/visual-review/m2/2026-10-10/after/desktop-en-full.png) |
| 768×1024 | [antes](../artifacts/visual-review/m2/2026-10-10/before/tablet-es-full.png) / [después](../artifacts/visual-review/m2/2026-10-10/after/tablet-es-full.png) | [antes](../artifacts/visual-review/m2/2026-10-10/before/tablet-en-full.png) / [después](../artifacts/visual-review/m2/2026-10-10/after/tablet-en-full.png) |
| 390×844 | [antes](../artifacts/visual-review/m2/2026-10-10/before/mobile-es-full.png) / [después](../artifacts/visual-review/m2/2026-10-10/after/mobile-es-full.png) | [antes](../artifacts/visual-review/m2/2026-10-10/before/mobile-en-full.png) / [después](../artifacts/visual-review/m2/2026-10-10/after/mobile-en-full.png) |

Para cada combinación, `after/{desktop|tablet|mobile}-{es|en}-hero.png` conserva el hero y `after/{device}-{locale}-work-{1|2|3|4}.png` los cuatro detalles: 6 páginas completas, 6 heroes y 24 escenas. Los JSON homónimos contienen overflow, clipping, errores y muestreo de layout/frame intervals; ese muestreo no constituye un benchmark general de FPS.

Casos: `before/cases/{device}-{locale}-{slug}-full.png` y `after/cases/{device}-{locale}-{slug}-{full|hero}.png`, con los mismos tres dispositivos, dos idiomas y slugs `distrito-gourmet`, `lumaflow-studio`, `raw-vives`: 18 completos antes, 18 completos y 18 heroes después. [Matriz HTTP y errores](../artifacts/visual-review/m2/2026-10-10/after/cases/case-matrix.json).

## Validación

Evidencias en `C:/Users/alexv/Documents/Desarrollo/GitHub/Portfolio/artifacts/visual-review/m2/2026-10-10/validation/`.

| Comprobación | Resultado / evidencia |
| --- | --- |
| Lint | PASS — `lint.txt` |
| Typecheck | PASS — `typecheck.txt` |
| Node tests | PASS — 44 tests, `test.txt` |
| Build de producción | PASS — `build.txt` |
| E2E final tras últimas correcciones | PASS — 57 pruebas, 11 omisiones previstas, `e2e-final-suite.txt`; específico M2: 12 PASS, 2 SKIP, `e2e-m2-final.txt` |
| Matriz visual ES/EN, 1440/768/390 | Capturas `after/` y JSON; casos responden 200 sin errores registrados |
| Revisión independiente de continuación | PASS — correcciones resueltas, disposición ship limitada al lote; `independent-review.md` |
| Detector de diseño | 19 avisos consultivos — `design-detector.json`, ejecutado una vez; deriva de paleta legacy no normalizada por esta extensión |
| Enlaces externos | `external-links.json` y `ai-repository-visibility.json` |
| Lighthouse final | Ejecutado — seis mediciones de producción, resultados inferiores |

El gate de capturas tras las correcciones visuales registró 56 PASS, 2 FAIL y 10 SKIP: las dos expectativas EN pedían /en#contact en vez de /en/#contact producido por el helper existente. Se corrigió el test y se añadió verificación real del desplazamiento a Contacto; el rerun específico terminó 12 PASS y 2 SKIP previstos por captura opcional. La suite completa final terminó 57 PASS, 11 SKIP y 0 FAIL; la matriz opcional de casos se omite en esta ejecución ordinaria, pero sus 18 capturas ya habían pasado en el gate explícito anterior. Las otras omisiones corresponden a checks exclusivos de dispositivo o matrices duplicadas, no a errores ocultados. Una ejecución anterior de la matriz/suite registró 58 PASS y 10 SKIP antes del ajuste final. Hubo un fallo de auditoría por corrupción del ZIP de trace Playwright; las repeticiones de captura/matriz y suite pasaron. No se identificó un bug de aplicación a partir de ese error del artefacto. Un error UTF-8 de compilación introducido durante la edición se corrigió y el build posterior pasó. Ambos incidentes se conservan como contexto, sin promover ejecuciones anteriores a resultado del gate final.

Distrito demo y los tres repositorios públicos devolvieron HTTP 200. La demo raw.vives tuvo un fallo de fetch en este entorno: disponibilidad externa no verificada, URL conservada. El 404 público de AI corresponde al repositorio privado confirmado y la acción pública se corrigió hacia contacto. Un 200 acredita respuesta HTTP, no funcionamiento exhaustivo de la aplicación externa.

## Rendimiento de laboratorio

Mismo servidor de producción local y script `scripts/measure-m15.ps1`, Lighthouse 12.8.2, tres corridas móvil y tres desktop. Ruta absoluta: `C:/Users/alexv/Documents/Desarrollo/GitHub/Portfolio/artifacts/performance/m2/2026-10-10/after/`; informes individuales HTML/JSON, trazas comprimidas sin pérdida y `runs.json`.

| Corrida | Performance | Accessibility | LCP (s) | TBT (ms) | CLS | CPU benchmark |
| --- | --- | --- | --- | --- | --- | --- |
| mobile-1 | 87 | 100 | 3.995 | 20 | 0 | 3706.5 |
| mobile-2 | 87 | 100 | 3.999 | 17 | 0 | 3738.5 |
| mobile-3 | 87 | 100 | 4.003 | 19.5 | 0 | 3474 |
| desktop-1 | 99 | 100 | 0.826 | 0 | 0 | 3261 |
| desktop-2 | 99 | 100 | 0.825 | 0 | 0 | 3400.5 |
| desktop-3 | 99 | 100 | 0.852 | 0 | 0 | 3692.5 |

| Serie / mediana | Performance | Accessibility | LCP (s) | CLS |
| --- | --- | --- | --- | --- |
| M1.5 móvil | 88 | 100 | 3.8407325 | 0 |
| M1.5 desktop | 100 | 100 | 0.798336 | 0 |
| M2 móvil | 87 | 100 | 3.999 | 0 |
| M2 desktop | 99 | 100 | 0.826 | 0 |

[Línea base M1.5](../artifacts/performance/m1-5/2026-10-10/after/runs.json). Comparar medianas y dispersión, no elegir la mejor corrida. La variación de `benchmarkIndex`, carga del host y simulación CPU/red limita la atribución causal entre series. Lighthouse local no acredita LCP/CLS p75 de campo ni experiencia de usuarios reales. Los objetivos móviles de laboratorio Performance ≥90 y LCP ≤2.5s siguen incumplidos; tampoco se han medido datos p75 de campo.

Las medianas bajan un punto de Performance en ambos dispositivos; LCP móvil aumenta 158ms (+4.1%) y desktop 27ms. No aparece una regresión significativa en bloqueo del hilo (TBT móvil mediano 19.5ms, desktop 0), accesibilidad o estabilidad. SEO y Best Practices son 100 en las seis corridas. Se conserva íntegra la serie, sin elegir la mejor ejecución.

El elemento LCP permanece en `p[data-hero-copy]`, la descripción de M1. La descomposición simulada de mobile-1 estima TTFB 452ms y render delay 3543ms; el insight de traza sin simulación registra TTFB 6.52ms y render delay 396.194ms. Son modelos distintos, no métricas intercambiables. La oportunidad pendiente es el camino de renderizado inicial del hero/fuentes/hidratación ya registrado en M1.5, sin atribuir por defecto el problema a GSAP o a imágenes nuevas.

Comparando `resource-summary` de mobile-1 antes/después: transferencia 457218 → 467699 bytes (+10481), JavaScript 263793 → 264441 (+648), CSS 18899 → 21220 (+2321), fuentes 138155 → 138155. La primera imagen real de AI se solicita por el umbral nativo de lazy loading y transfiere 9062 bytes (antes la ilustración 1696); no es el LCP. No se introduce eager loading, vídeo, WebGL ni nuevos paquetes. Los demás recursos permanecen diferidos. Esta diferencia pequeña se registra, sin afirmar equivalencia exacta de condiciones de CPU entre series.

La comprobación final `git diff --check` también pasa (`validation/diff-check.txt`). M2 está implementado y preparado para revisión; no se considera resuelta la incidencia previa de LCP móvil ni se acredita publicación.

## Límites

No se acredita auditoría integral WCAG, lector de pantalla real, datos de campo ni lanzamiento público. El código privado y los estados de desarrollo se explicitan. M3, M4 y publicación siguen fuera de esta entrega. El frontmatter legacy y sus sidecars no se regeneran: la aprobación autoriza una extensión localizada del sistema existente.