# ALEVICLOP 2.0 — M3: Motion & Polish

Fecha: 2026-10-11. Implementación y validación local sobre la rama actual. M2 está aceptado funcionalmente y conserva su revisión visual definitiva pendiente. No se inicia M4, ni se realiza commit, push, PR o despliegue. No se añaden dependencias.

## Resultado y criterio de aprobación

M3 está preparado para revisión y aprobación de movimiento: entradas coordinadas, contenido accesible durante scroll rápido, previews reversibles sin fotogramas vacíos, navegación activa coherente y feedback inmediato del formulario. Se conserva la dirección artística de M1/M2 y toda la información profesional existente.

La serie final no muestra regresión de rendimiento: mediana móvil 88 / LCP 3.673 s y escritorio 100 / LCP 0.758 s. Los objetivos móviles ≥90 y ≤2.5 s **siguen pendientes**. La variabilidad de CPU entre las series impide atribuir toda la mejora de puntuación al código. Esta aprobación de M3 no acredita los objetivos finales de rendimiento ni Core Web Vitals de usuarios reales.

## Auditoría y correcciones

| Superficie | Hallazgo anterior | Cambio M3 y motivo |
| --- | --- | --- |
| Hero | Coreografía aceptada; la descripción ya era el elemento LCP visible | Se conserva la secuencia de aproximadamente 1.3 s y su composición. Duraciones/easing usan tokens. La descripción no recibe opacidad ni transformación de entrada. |
| Encabezados | Cuatro animaciones separadas, duraciones y puntos de inicio distintos | Un timeline coordinado para línea, etiqueta, palabras y descripción; inicio al 88% del viewport. Texto siempre visible. |
| Capabilities | Filas ocultas por `autoAlpha`, entrada de 0.7 s y umbral tardío | Traslación de 12 px, 0.45 s y stagger de 0.04 s. Se elimina la ocultación. Limpieza explícita de transformaciones al activar movimiento reducido. |
| Contacto | Ocultación del formulario y desplazamiento de 48 px durante 0.9 s | Formulario visible desde el principio; entrada de 12 px / 0.45 s. Reacciona a cambios de preferencia durante la sesión. |
| Scroll rápido | Las entradas podían seguir incompletas fuera de pantalla | Helper existente ampliado con trigger compartido, `once`, `fastScrollEnd` y finalización al abandonar el viewport. Se protege el cambio a movimiento reducido. |
| Project scenes | Máscaras y textos con tiempos diferentes del resto | Máscara 0.65 s, título 0.6 s y detalles 0.45 s; título con desplazamiento menor en móvil. Se mantiene la identidad de cada escena. |
| Previews | Desmontaje inmediato al salir; imagen alternativa podía no estar cargada | Se monta tras la primera interacción compatible, espera `onLoad` antes del crossfade y permanece cacheada. Entrada/salida reversibles; imagen principal visible durante la carga. |
| Navegación | Capabilities podía borrar el estado activo de About; móvil no exponía el estado equivalente | About incluye capacidades, experiencia, fotografía y Currently. Estado móvil con `aria-current`, índice/subrayado y color. Foco inmediato; Escape devuelve el foco y libera el scroll. |
| Cursor | Cursor global personalizado heredado, ajeno al alcance solicitado | Se desmonta de RootShell y se utiliza el cursor nativo. El componente legacy permanece sin uso para evitar una eliminación ajena al alcance. |
| Botones/formulario | `transition-all` y desplazamientos de botones en hover | Transiciones limitadas a propiedades de estado; superficie clicable estable. `aria-busy` del formulario, feedback de envío y error, conservación del borrador. |
| Tipografía entre secciones | Mezcla de fuentes legacy, títulos de peso distinto y fuente técnica extra | Superficies premium comparten Space Grotesk 500, Inter e IBM Plex Mono 400. El skip link reutiliza la fuente técnica ya precargada. |
| Navegación entre páginas | Transición raíz con desplazamiento vertical | Crossfade breve sin desplazamiento del documento ni espera previa a navegar; movimiento reducido desactiva la transición. |
| Fotografía | Escala hover de 500 ms y dependencia exclusiva de la demo externa | Hover limitado a puntero fino sin movimiento reducido; transición 240 ms. Se añade acceso al estudio de caso real y localizado, conservando el enlace externo. |

Son correcciones de coordinación, accesibilidad y estabilidad, no un nuevo diseño de proyectos. No se añaden animaciones continuas, cursor global, scrolljacking, loaders, WebGL ni vídeo de producto. El magnetismo existente mueve únicamente la etiqueta del CTA con límites pequeños, sin desplazar la superficie clicable.

## Sistema compartido

Se reutiliza `lib/gsap.ts`; no se crea una segunda infraestructura. Tokens de GSAP:

| Token | Valor |
| --- | --- |
| `duration.fast / state` | 0.14 / 0.24 s |
| `duration.enter / title / mask / hero` | 0.45 / 0.60 / 0.65 / 0.80 s |
| `ease.out / reveal` | `power3.out` / `expo.out` |
| `distance.small / content / title / parallax` | 8 / 12 / 18 / 10 px |
| `stagger.content / hero` | 0.04 / 0.08 s |
| `opacity.hidden / visible` | 0 / 1; ocultación reservada a mejoras decorativas apropiadas |
| Máscara de imagen | `inset(12% 0 12% 0)` → abierta |
| Entradas de sección | `top 88%`, una vez, finalización si se salta la sección |

CSS comparte 140, 240, 450, 600 y 650 ms y la curva de salida `cubic-bezier(.16,1,.3,1)`. Estados de foco de enlaces y previews no esperan la animación de ratón. No se obliga a todas las interacciones a tener la misma duración: se conserva el presupuesto del hero, su scroll sutil y el parallax M2 de ±10 px exclusivamente en desktop compatible. La animación del archivo secundario ya funcional también se mantiene.

GSAP sigue scoped mediante `useGSAP`/contextos y `matchMedia`, con limpieza al desmontar o cambiar preferencias. Las mejoras diferidas mantienen el HTML SSR accesible. No se transforma ni oculta el párrafo `p[data-hero-copy]` que produce el LCP. En touch no hay preview como requisito ni parallax de escenas; reducido elimina el movimiento no esencial, incluso si cambia con la página abierta.

## Referencia y revisión visual

Se inspeccionó la página real de [Dennis Snellenberg](https://dennissnellenberg.com/) en el navegador. Se toma como criterio su jerarquía monumental, contención editorial, ritmo y precisión de feedback; no se copia su retrato, assets, textos, código, cursor ni pantalla de entrada. Evidencia: `artifacts/visual-review/m3/2026-10-11/source/reference-desktop.jpg`.

La revisión local cubre 1440×900, 768×1024 y 390×844, ES/EN, menús, proyectos, capacidades, experiencia, fotografía y contacto. Se revisaron capturas del hero y secuencias de fotogramas de las grabaciones desktop/móvil antes/después; además se abrió la build final en el navegador. La tipografía y proporciones de M1/M2 se conservan, con continuidad de fuentes en las secciones inferiores. No se observaron líneas cortadas, overflow horizontal ni contenido que desaparezca en los escenarios comprobados.

Las grabaciones permiten revisar el recorrido completo. La inspección de fotogramas no es una medición de FPS ni garantiza fluidez en hardware real: Playwright registra vídeo a 25 fps y la auditoría conserva intervalos de frames del navegador, incluidos frames largos. El resumen final `validation/visual-summary.json` registra medianas de ~16.7 ms y máximos de 49.9–66.7 ms en los seis escenarios; no se declara una garantía de 60 fps.

## Rendimiento: método y series completas

Se utiliza el harness existente `scripts/measure-m15.ps1`, Lighthouse 12.8.2 y Chromium instalado para Playwright, contra `http://127.0.0.1:3100/` con build de producción y `next start`. Tres ejecuciones móviles y tres desktop por serie, secuenciales, sin ejecutar simultáneamente E2E o grabaciones. Móvil: throttling simulado, CPU ×4, 412×823; desktop: preset desktop, 1350×940. Los viewports de auditoría visual son distintos deliberadamente y constan arriba.

El histórico M2 aportado por el usuario es móvil 87 / LCP 4.00 s y desktop 99. La siguiente serie **antes** es una nueva medición del mismo M2 realizada en esta sesión, antes de editar M3. No se reemplaza ni se reinterpretan los resultados históricos.

| Serie | Dispositivo | Ejecución | Performance | LCP ms | TBT ms | CPU benchmark |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Antes | Mobile | 1 | 61 | 4365.115 | 1067.954 | 1235 |
| Antes | Mobile | 2 | 87 | 3910.405 | 80.459 | 2646.5 |
| Antes | Mobile | 3 | 75 | 4036.907 | 443.547 | 1526.5 |
| Antes | Desktop | 1 | 100 | 819.889 | 0 | 2943 |
| Antes | Desktop | 2 | 100 | 807.336 | 0 | 3097.5 |
| Antes | Desktop | 3 | 100 | 811.128 | 0 | 2319.5 |
| Después | Mobile | 1 | 87 | 3626.345 | 200.828 | 2920 |
| Después | Mobile | 2 | 89 | 3672.866 | 74.878 | 3107 |
| Después | Mobile | 3 | 88 | 3680.197 | 149.601 | 2866.5 |
| Después | Desktop | 1 | 100 | 758.914 | 0 | 3131 |
| Después | Desktop | 2 | 100 | 758.497 | 0 | 3153 |
| Después | Desktop | 3 | 100 | 758.233 | 0 | 3040.5 |

| Mediana independiente por métrica | Antes | Después |
| --- | ---: | ---: |
| Mobile Performance | 75 | 88 |
| Mobile LCP | 4.037 s | 3.673 s |
| Mobile TBT | 443.547 ms | 149.601 ms |
| Desktop Performance | 100 | 100 |
| Desktop LCP | 0.811 s | 0.758 s |
| Desktop TBT | 0 ms | 0 ms |

Accessibility 100 y CLS 0 en las doce ejecuciones. La serie después también obtiene Best Practices y SEO 100 en las seis ejecuciones. No se excluye la ejecución móvil 61 ni ningún otro resultado. El benchmark de CPU cambia sustancialmente entre ambas series: las opciones de Lighthouse son comparables, pero la máquina no ofrece rendimiento de CPU controlado. No se puede convertir la diferencia de puntuación en una ganancia causal exclusiva de M3. No aparece una regresión significativa en estas mediciones; se necesita hardware estable para aislar cambios pequeños.

### LCP: evidencia y trabajo pendiente

El elemento exacto antes/después es **la descripción del hero `p[data-hero-copy]`**, texto de 372×84 px en Lighthouse móvil. No es una imagen de Selected Work ni un preview. Se analizan la ejecución mobile-2 de ambas series y sus trazas completas, conservando todas las demás ejecuciones.

| Fase de Lighthouse simulado, mobile-2 | Antes | Después |
| --- | ---: | ---: |
| TTFB | 452.081 ms (12%) | 454.622 ms (12%) |
| Retraso de descubrimiento/carga del recurso LCP | 0 ms | 0 ms |
| Tiempo de carga del recurso LCP | 0 ms | 0 ms |
| Retraso de renderizado | 3458.324 ms (88%) | 3218.244 ms (88%) |

Es un LCP textual: los campos de carga del recurso son cero. El párrafo permanece visible y sin transformación; no se usa una entrada visual para aplazar su presentación. Las trazas no justifican culpar a la timeline del hero de los 3.2–3.5 s simulados.

La traza **observada sin la simulación** de mobile-2 registra TTFB 8.861 / 11.562 ms y render delay 366.372 / 274.045 ms. Son valores del entorno local sin el mismo coste simulado, no un LCP móvil de laboratorio de 0.286 s ni un Core Web Vital de campo. Nunca se mezclan estas escalas al evaluar el objetivo de 2.5 s.

Las tres fuentes críticas estaban descubiertas mediante preload y completadas a ~55 ms antes y ~62 ms después, antes del candidato LCP. La versión anterior cargaba además dos fuentes legacy descubiertas a ~305 ms. La unificación tipográfica y del skip link elimina esas dos solicitudes en la medición después: fuentes 5→3 y transferencia de fuentes 138155→83777 bytes. Transferencia total de esa ejecución 467697→413259 bytes; JavaScript 264441→264082 bytes. Se documenta una reducción real de recursos, no una supuesta eliminación de hidratación.

La traza anterior contiene un Layout de 161.190 ms sobre 825 objetos antes del candidato LCP; después, 78.739 ms sobre 831 objetos. UpdateLayoutTree principal 62.412→48.451 ms y EvaluateScript máximo anterior al candidato 35.489→32.754 ms. Son observaciones, sensibles al benchmark de CPU. La auditoría de hilo principal sobre su ventana completa informa Style & Layout 1416.98→867.12 ms y Script Evaluation 1094.27→999.28 ms; esa ventana incluye trabajo posterior al LCP y no equivale íntegramente a su retraso.

Los tres CSS de la build final son recursos bloqueantes (21556 bytes en total). Lighthouse les atribuye ~305 ms simulados por solicitud, pero estima ahorro global 0 ms en ese audit: no hay evidencia suficiente para imponer CSS inline o una reorganización de arquitectura. Las imágenes secundarias mantienen carga diferida y proporciones reservadas; los previews no solicitan su alternativa antes de interactuar.

La oportunidad pendiente es reducir coste de estilo/layout del documento completo e inicio de JavaScript/hidratación bajo CPU móvil. No se añade `content-visibility` con alturas estimadas ni se ocultan/eliminan secciones para perseguir una puntuación; ambas opciones necesitan validación específica de scroll, accesibilidad y CLS. No se inicia una reestructuración para esa investigación en M3.

Evidencia reproducible: `artifacts/performance/m3/2026-10-11/{before,after}/diagnosis.json`, `runs.json`, seis `.report.json`, seis `.report.html`, seis `.trace.json.gz` y seis `.devtoolslog.json` por serie. Las trazas están comprimidas sin pérdida y verificadas contra su contenido original.

## Enlaces externos

Se verificaron por HTTP GET los enlaces reales del repositorio:

| Enlace | Resultado observado |
| --- | --- |
| `https://distrito.aleviclop.dev/` | HTTP 200 |
| `https://rawvives.aleviclop.dev/` | HTTP 200; petición curl termina en `/en` |
| `https://aitanamora.vercel.app/` | HTTP 200 |
| `https://github.com/AVL05/alexgallery` | HTTP 200 |

La demo correcta de raw.vives se abrió además en el navegador: home en español y navegación Trabajo → `/es/work`, con título y galería visibles. Su DNS devuelve el CNAME `alexgallery-83x.pages.dev`. No se modificó DNS ni infraestructura. Los timeouts previos no se presentan como una caída vigente: esta comprobación demuestra disponibilidad en el momento de la revisión, no uptime continuo.

El acceso adicional desde fotografía apunta al caso existente `/proyectos/raw-vives` y `/en/projects/raw-vives`, probado por E2E. No se inventa una demo nueva. AI continúa comunicando código privado y acceso por contacto; Luma conserva su evidencia local real. No se envió ningún mensaje externo.

Evidencia: `artifacts/visual-review/m3/2026-10-11/validation/external-demos.json`, `raw-vives-http.txt`, `raw-vives-browser.txt` y `source/raw-vives-live.jpg`.

## Validación ejecutada

| Comprobación final | Resultado |
| --- | --- |
| `pnpm lint` | PASS |
| `pnpm typecheck` | PASS |
| `pnpm build` | PASS, build de producción |
| `pnpm test` | PASS: 44 tests, 0 fallos |
| `pnpm test:e2e --workers=1` | PASS: 68 correctos, 12 omisiones previstas, 0 fallos |
| Cambio live a movimiento reducido, móvil ES/EN repetido tres veces | PASS: 6/6 |
| Matriz visual/video 3 tamaños × 2 idiomas | PASS; sin overflow ni `pageerror` observados |
| Teclado, diálogo móvil/Escape/foco, previews y estado activo | PASS en los escenarios E2E |
| Formulario pendiente/error y borrador | PASS, API mock; sin enviar correo real |
| Rutas ES/EN, casos existentes, CV y medios locales | PASS en la suite existente |
| Lighthouse producción | 12 ejecuciones completas guardadas, objetivos móviles pendientes |

Las omisiones incluyen escenarios exclusivos de desktop o móvil, matrices ejecutadas una sola vez y captura opcional anterior. No son tests fallidos ni requisitos retirados. La suite conserva los contratos de contenido/SEO/localización, SSR sin JS y movimiento reducido de M1/M2.

Durante la validación inicial se detectó que la última fila de capacidades podía conservar una matriz de transformación neutra al activar movimiento reducido durante el stagger. Se conserva ese primer fallo en `focused-e2e.txt` y `e2e-neutral-matrix.txt`. La corrección añade limpieza de las transformaciones propias al desactivar la media query, sin debilitar la aserción `transform: none`. El escenario pasó seis repeticiones y la suite completa final. Logs finales en `artifacts/visual-review/m3/2026-10-11/validation/`: `lint.txt`, `typecheck.txt`, `build.txt`, `test.txt`, `e2e.txt`, `reduced-motion-repeat.txt` y `diff-check.txt`.

## Capturas y grabaciones: rutas exactas

Directorio relativo al repositorio: `artifacts/visual-review/m3/2026-10-11/`. Las dos carpetas contienen la misma matriz antes/después; los enlaces siguientes abren los archivos.

| Tamaño / idioma | Completa antes | Completa después | Vídeo antes | Vídeo después |
| --- | --- | --- | --- | --- |
| Desktop ES | [PNG](../artifacts/visual-review/m3/2026-10-11/before/desktop-es-full.png) | [PNG](../artifacts/visual-review/m3/2026-10-11/after/desktop-es-full.png) | [WebM](../artifacts/visual-review/m3/2026-10-11/before/desktop-es-motion.webm) | [WebM](../artifacts/visual-review/m3/2026-10-11/after/desktop-es-motion.webm) |
| Desktop EN | [PNG](../artifacts/visual-review/m3/2026-10-11/before/desktop-en-full.png) | [PNG](../artifacts/visual-review/m3/2026-10-11/after/desktop-en-full.png) | [WebM](../artifacts/visual-review/m3/2026-10-11/before/desktop-en-motion.webm) | [WebM](../artifacts/visual-review/m3/2026-10-11/after/desktop-en-motion.webm) |
| Tablet ES | [PNG](../artifacts/visual-review/m3/2026-10-11/before/tablet-es-full.png) | [PNG](../artifacts/visual-review/m3/2026-10-11/after/tablet-es-full.png) | [WebM](../artifacts/visual-review/m3/2026-10-11/before/tablet-es-motion.webm) | [WebM](../artifacts/visual-review/m3/2026-10-11/after/tablet-es-motion.webm) |
| Tablet EN | [PNG](../artifacts/visual-review/m3/2026-10-11/before/tablet-en-full.png) | [PNG](../artifacts/visual-review/m3/2026-10-11/after/tablet-en-full.png) | [WebM](../artifacts/visual-review/m3/2026-10-11/before/tablet-en-motion.webm) | [WebM](../artifacts/visual-review/m3/2026-10-11/after/tablet-en-motion.webm) |
| Mobile ES | [PNG](../artifacts/visual-review/m3/2026-10-11/before/mobile-es-full.png) | [PNG](../artifacts/visual-review/m3/2026-10-11/after/mobile-es-full.png) | [WebM](../artifacts/visual-review/m3/2026-10-11/before/mobile-es-motion.webm) | [WebM](../artifacts/visual-review/m3/2026-10-11/after/mobile-es-motion.webm) |
| Mobile EN | [PNG](../artifacts/visual-review/m3/2026-10-11/before/mobile-en-full.png) | [PNG](../artifacts/visual-review/m3/2026-10-11/after/mobile-en-full.png) | [WebM](../artifacts/visual-review/m3/2026-10-11/before/mobile-en-motion.webm) | [WebM](../artifacts/visual-review/m3/2026-10-11/after/mobile-en-motion.webm) |

En ambas carpetas: seis `*-hero.png`, cuatro `*-menu.png`, dos `desktop-*-preview.png`, `matrix.json` y dos secuencias `desktop-es-motion-frames.png` / `mobile-es-motion-frames.png`. Son grabaciones reales; `validation/video-metadata.json` verifica los doce WebM (VP8, tamaño y duración). Las secuencias muestran muestras cada 0.5 s, no todos los frames.

Después incluye además 24 recortes `*-work-{1,2,3,4}.png`, seis auditorías `desktop-es.json` etc. con fuentes, layout shifts e intervalos de frames, y `after/cases/` con 18 capturas completas, 18 heroes y `case-matrix.json` (tres casos × tres tamaños × dos idiomas). Para comparar los casos con M2 se conserva la matriz anterior en `artifacts/visual-review/m2/2026-10-10/after/cases/`; no se presenta esa matriz histórica como una captura nueva de M3.

## Límites y siguiente revisión

- LCP móvil 3.673 s y Performance 88 no cumplen los objetivos finales. Mantener incidencia de renderizado/hidratación y repetir bajo CPU estable antes de atribuir mejoras pequeñas.
- M2 conserva revisión visual definitiva del usuario pendiente. M3 es una propuesta implementada y validada para su aprobación, no una aprobación automática de todo el portfolio.
- Chromium automatizado e inspección local no acreditan Safari, lectores de pantalla reales, dispositivos físicos, WCAG integral ni métricas p75 de campo.
- La disponibilidad externa se verificó en este momento; no se auditó toda la aplicación raw.vives ni su uptime.
- No se han ejecutado M4, publicación, commit, push, PR o cambios de infraestructura.
