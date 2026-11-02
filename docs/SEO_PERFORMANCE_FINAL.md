# Auditoría final de calidad y rendimiento

## Estado definitivo para publicación — 2 de noviembre de 2026

Las correcciones de contraste y los tres vídeos optimizados están validados para publicarse en GitHub. El despliegue de producción queda pendiente de autorización. El commit de producción utilizado como referencia es b1d7598a6b0b61382008b2c3e1793b071d23d270. Las capturas locales no describen una versión ya desplegada.

### Plan de Vercel y analítica

**Plan confirmado: Hobby.** La consulta de solo lectura `get_git_deployment_context` de Vercel devuelve el equipo `aleviclop` con `plan: hobby` y su proyecto `portfolio` vinculado a `AVL05/Portfolio`. No se ha contratado ningún servicio ni cambiado el plan.

La [documentación oficial de Vercel](https://vercel.com/docs/analytics/custom-events) reserva Custom Events a Pro/Enterprise. Por tanto, **los eventos personalizados no son compatibles con el plan actual y no se presentan como operativos**.

- Se ha retirado completamente la instrumentación de CV, GitHub/LinkedIn, demos y contacto que se preparó durante la auditoría: no se publican el listener compartido, el helper ni sus llamadas o nuevas marcas de demo.
- Web Analytics y Speed Insights permanecen exactamente como estaban en [RootShell](../components/root-shell.tsx), con montaje condicionado a VERCEL=1. Se conservan para las métricas disponibles en el plan. Su recepción efectiva en el panel no se ha confirmado mediante estas pruebas.
- No se añade ninguna dependencia, cookie, sistema alternativo de medición, proveedor ni almacenamiento.
- Las marcas data-track de CV que ya existían son inertes; no significan que las descargas se estén midiendo. Tampoco se cuentan los clics profesionales, aperturas de demo o contactos como conversiones personalizadas.
- El formulario, API y enlaces conservan su implementación anterior. Se han quitado únicamente las adiciones de Custom Events; no se modifica el contrato de envío ni sus protecciones.

### Cambios que se publican

1. [Selector ES/EN](../components/language-toggle.tsx): texto inactivo de 55 % a 70 % de opacidad, con los colores, dimensiones y estados existentes.
2. [Navegación raw.vives](../components/raw-vives-case-study.tsx): fondo translúcido basado en el fondo claro de su sección, corrigiendo el contraste cercano a 1,55:1 sin alterar la estructura.
3. Los tres MP4 de Distrito Gourmet en sus mismas URLs, con resolución, fps, audio, posters y reproducción conservados.
4. [Pruebas de cierre](../tests/e2e/quality-closure.spec.ts) y este informe.

No cambian contenido SEO, rutas, canonicals, hreflang, sitemap, robots, animaciones, arquitectura ni configuración de Vercel. Los archivos de formulario, shell y enlaces quedan idénticos al HEAD de referencia.

### Validaciones finales ejecutadas

| Comprobación | Resultado real de esta preparación |
| --- | --- |
| pnpm lint | PASS, sin errores ni advertencias de ESLint |
| pnpm typecheck | PASS |
| pnpm test | 61 PASS, 0 FAIL, 0 SKIP |
| pnpm build | PASS, build de producción generado |
| pnpm test:e2e sobre ese build | 162 PASS, 18 SKIP, 0 FAIL, 0 flaky; un worker y cero retries |
| Contraste de navegación y selector | Las seis rutas de casos ES/EN superan 4,5:1 en móvil y escritorio |
| Vídeos | Los tres reproducen/pausan por teclado y decodifican a 1080p en ambos perfiles; posters accesibles, preload=none y cero peticiones multimedia iniciales |
| Ausencia de Custom Events | Cuatro pruebas ES/EN × móvil/escritorio confirman descarga del CV, enlaces y contacto satisfactorio sin llamadas de evento al SDK |
| Recursos para publicar | Hashes de los tres MP4 coinciden con los candidatos aceptados; ningún original, temporal o credencial detectada en el conjunto revisado |

Las 18 nuevas comprobaciones corresponden a 12 casos de contraste, cuatro de compatibilidad con Hobby y dos de reproducción de los tres vídeos. Se conserva la suite anterior de contacto para errores, recuperación del borrador y envíos simultáneos. Los éxitos de contacto se simulan localmente; no se envía correo real.

Las 18 omisiones son anteriores a estas correcciones: diez por perfil o duplicación de matrices y ocho auditorías explícitas de captura/cross-browser que requieren activación y herramientas adicionales. No se han añadido skips para evitar fallos. [Detalle individual](../artifacts/quality-release-final-2026-11-02/skipped-tests.json).

Evidencias de esta preparación: [lint](../artifacts/quality-release-final-2026-11-02/lint.log), [typecheck](../artifacts/quality-release-final-2026-11-02/typecheck.log), [tests Node](../artifacts/quality-release-final-2026-11-02/tests.log), [build](../artifacts/quality-release-final-2026-11-02/build.log), [Playwright JSON](../artifacts/quality-release-final-2026-11-02/playwright-results.json), [salida Playwright](../artifacts/quality-release-final-2026-11-02/playwright.log) y [revisión de archivos y recursos](../artifacts/quality-release-final-2026-11-02/preflight.json). Son artefactos locales ignorados por Git; para compartirlos hay que adjuntarlos por separado.

### Publicación y comprobación posterior en Vercel

El flujo solicitado publica a main conservando el historial. `vercel.json` mantiene `git.deploymentEnabled.main=false`; el workflow de GitHub Actions ejecuta comprobaciones y no contiene un paso de deploy. No se modifica ninguno de los dos. Publicar en GitHub no equivale a desplegar estas correcciones en producción.

Después de autorizar y realizar un despliegue independiente:

1. Confirmar que Vercel sirve el SHA publicado y conserva https://www.aleviclop.dev como dominio canónico; comprobar las ocho páginas ES/EN.
2. Revisar contraste, cambio de idioma, navegación, enlaces profesionales y descarga del CV en móvil y escritorio.
3. Comprobar posters y reproducción de los tres MP4, respuestas por rangos 206 y ausencia de carga de vídeo antes de entrar en la sección. Completar la revisión en Safari/iPhone y Android físico.
4. Enviar un contacto real autorizado y comprobar su entrega. Revisar visitas y Web Vitals disponibles en Web Analytics/Speed Insights; no esperar eventos personalizados de CV, enlaces, demos o contacto en Hobby.
5. Si se compara rendimiento, ejecutar Lighthouse en producción con los mismos perfiles y muestras; consultar también datos de campo con volumen suficiente.

**Limitaciones:** no se ha comprobado entrega real de correo, recepción de métricas en el panel, dispositivos físicos ni una auditoría completa con lector de pantalla. No se certifica conformidad WCAG de todo el sitio a partir de Lighthouse o de estas pruebas de contraste. No se ha cambiado DNS, Search Console, plan ni configuración remota.

### Vídeos: comparación y criterio de aceptación

| Archivo | Antes (bytes) | Después (bytes) | Reducción | VMAF medio |
| --- | ---: | ---: | ---: | ---: |
| Inicio.mp4 | 24,790,985 | 4,350,403 | 82.5 % | 97.82 |
| Experiencia usuario.mp4 | 72,836,842 | 17,203,490 | 76.4 % | 97.47 |
| Administracion.mp4 | 30,021,409 | 5,808,106 | 80.7 % | 97.00 |

Total: 127.65 MB → 27.36 MB; ahorro 78.6 %. Son tamaños completos, no transferencia obligatoria por visita.

FFmpeg: libx264, preset slow, CRF 20, yuv420p, H.264 High, audio copiado y movflags +faststart. Se mantiene 1920 × 1080, 60 fps en Inicio y 24000/1001 fps en los otros dos. Duraciones conservadas: 18,304 / 144,789 / 81,130 s. Nivel 4.2 en 1080p60 y 4.0 en los otros clips. No se recorta contenido ni se elimina audio.

Se aceptaron únicamente candidatos con reducción superior al 30 % y VMAF medio >= 95. Medición VMAF a lo largo de todo el clip, muestreando un fotograma de cada cinco a resolución original; es una medida perceptual, no una garantía de igualdad de todos los fotogramas. Se revisaron además comparativas visuales a los 8 s de los tres clips: texto y elementos de interfaz legibles. Los originales quedan preservados en Git y en la carpeta local de evidencias.

Verificado moov antes de mdat para los tres archivos, facilitando el inicio por streaming. Playwright confirma poster accesible, preload=none, controles, playsInline, ausencia de descarga multimedia inicial, decodificación 1080p y reproducción/pausa por teclado de los tres vídeos en ambos perfiles. Las pruebas existentes cubren también rangos 206, autoplay al entrar en vista, pausa al salir y movimiento reducido.

Evidencias: [tamaños, metadatos y VMAF](../artifacts/seo-performance-fixes-2026-11-02/video-comparison.json), [estructura MP4](../artifacts/seo-performance-fixes-2026-11-02/mp4-structure.json), [comandos de codificación](../artifacts/seo-performance-fixes-2026-11-02/encode.ps1), [comparación](../artifacts/seo-performance-fixes-2026-11-02/compare-videos.ps1), capturas [Inicio](../artifacts/seo-performance-fixes-2026-11-02/inicio.comparison.png), [cliente](../artifacts/seo-performance-fixes-2026-11-02/customer.comparison.png) y [administración](../artifacts/seo-performance-fixes-2026-11-02/admin.comparison.png).


## Mediciones Lighthouse anteriores al ajuste definitivo para Hobby

Los dos bloques siguientes conservan las mediciones reales de la auditoría: ocho rutas en ambos perfiles y controles locales del commit anterior. El build medido todavía incluía la instrumentación de eventos que ahora se ha retirado. **Lighthouse no se ha repetido en esta preparación final**; sus puntuaciones no se atribuyen al SHA que se publica. El contraste, los hashes multimedia y el comportamiento del estado final sí se vuelven a comprobar con la suite indicada arriba.

### Ocho rutas y ambos perfiles (build intermedio)

Lighthouse 12.8.2 y Chromium 156, perfiles y throttling de la auditoría inicial. Se ejecutan 16 capturas válidas sobre el build de producción local, una por combinación. A, BP y SEO son 100 en las 16. CLS es 0 en las 16. Vídeo inicial transferido: 0 bytes.

**Comparación entre entornos:** la columna P anterior es la mediana de tres muestras de Vercel; la posterior es una muestra local, sin CDN ni los scripts inyectados por Vercel. Por sí sola no mide mejora o regresión del código. Se conserva sin ocultar las puntuaciones menores y se añade debajo un control local del commit anterior.

#### Móvil

| Ruta / informe local | P publicado antes → local después | A antes → después | BP / SEO después | LCP (s) | CLS | TBT (ms) | FCP (s) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [/](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/home-es-mobile.report.html) | 94 → 88 | 100 → 100 | 100 / 100 | 3.87 | 0.000 | 48.5 | 1.06 |
| [/en](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/home-en-mobile.report.html) | 92 → 89 | 100 → 100 | 100 / 100 | 3.72 | 0.000 | 59 | 1.05 |
| [/proyectos/raw-vives](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/raw-es-mobile.report.html) | 97 → 93 | 96 → 100 | 100 / 100 | 3.27 | 0.000 | 54.5 | 0.92 |
| [/en/projects/raw-vives](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/raw-en-mobile.report.html) | 96 → 91 | 96 → 100 | 100 / 100 | 3.47 | 0.000 | 51.5 | 1.44 |
| [/proyectos/lumaflow-studio](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/luma-es-mobile.report.html) | 97 → 94 | 96 → 100 | 100 / 100 | 3.13 | 0.000 | 61 | 0.92 |
| [/en/projects/lumaflow-studio](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/luma-en-mobile.report.html) | 96 → 93 | 96 → 100 | 100 / 100 | 3.26 | 0.000 | 54 | 0.90 |
| [/proyectos/distrito-gourmet](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/distrito-es-mobile.report.html) | 93 → 88 | 95 → 100 | 100 / 100 | 3.83 | 0.000 | 49.5 | 1.08 |
| [/en/projects/distrito-gourmet](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/distrito-en-mobile.report.html) | 93 → 89 | 95 → 100 | 100 / 100 | 3.85 | 0.000 | 54.5 | 1.06 |

#### Escritorio

| Ruta / informe local | P publicado antes → local después | A antes → después | BP / SEO después | LCP (s) | CLS | TBT (ms) | FCP (s) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [/](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/home-es-desktop.report.html) | 100 → 100 | 100 → 100 | 100 / 100 | 0.73 | 0.000 | 0 | 0.29 |
| [/en](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/home-en-desktop.report.html) | 100 → 100 | 100 → 100 | 100 / 100 | 0.76 | 0.000 | 0 | 0.30 |
| [/proyectos/raw-vives](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/raw-es-desktop.report.html) | 100 → 100 | 96 → 100 | 100 / 100 | 0.68 | 0.000 | 0 | 0.25 |
| [/en/projects/raw-vives](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/raw-en-desktop.report.html) | 100 → 100 | 96 → 100 | 100 / 100 | 0.68 | 0.000 | 0 | 0.25 |
| [/proyectos/lumaflow-studio](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/luma-es-desktop.report.html) | 100 → 100 | 96 → 100 | 100 / 100 | 0.67 | 0.000 | 0 | 0.25 |
| [/en/projects/lumaflow-studio](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/luma-en-desktop.report.html) | 100 → 100 | 96 → 100 | 100 / 100 | 0.67 | 0.000 | 0 | 0.25 |
| [/proyectos/distrito-gourmet](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/distrito-es-desktop.report.html) | 100 → 100 | 95 → 100 | 100 / 100 | 0.77 | 0.000 | 0 | 0.30 |
| [/en/projects/distrito-gourmet](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/distrito-en-desktop.report.html) | 100 → 100 | 95 → 100 | 100 / 100 | 0.77 | 0.000 | 0 | 0.29 |

[Resultados completos de las 16 capturas](../artifacts/seo-performance-fixes-2026-11-02/lighthouse/results.json) y [runner](../artifacts/seo-performance-fixes-2026-11-02/lighthouse.ps1). Los informes HTML individuales están enlazados en las tablas.

### Control antes/después en el mismo entorno local

Se exportó HEAD b1d7598 mediante git archive a una carpeta ignorada, sin cambiar de rama ni tocar el checkout. El baseline se compiló con las mismas dependencias instaladas y next.config.mjs idéntico; ambos builds se sirvieron con next start, en puertos 3101 y 3100. Se precargaron las mismas variantes de imagen en ambos servidores. Capturas móviles secuenciales e intercaladas antes/después, sin otras suites ni transcodificaciones simultáneas.

| Ruta móvil | Muestras por versión | P antes → después | A antes → después | LCP antes → después (s) | TBT antes → después (ms) |
| --- | ---: | ---: | ---: | ---: | ---: |
| / | 3 | 88 → 89 | 100 → 100 | 3.86 → 3.71 | 55 → 52 |
| /proyectos/raw-vives | 1 | 93 → 93 | 96 → 100 | 3.26 → 3.26 | 51.5 → 54.5 |
| /proyectos/distrito-gourmet | 1 | 89 → 89 | 95 → 100 | 3.77 → 3.76 | 51 → 51 |

La home utiliza medianas de tres capturas por versión; los dos casos son controles individuales, insuficientes para interpretar diferencias pequeñas como ganancias. El control reproduce la menor puntuación móvil en localhost con el código anterior. No demuestra una regresión significativa atribuible a estos cambios ni permite afirmar una mejora de Core Web Vitals de usuarios reales. El ahorro de vídeo está medido por bytes y calidad; no se atribuye al LCP inicial, donde esos vídeos no se descargan.

[Resultados de control](../artifacts/seo-performance-fixes-2026-11-02/control/results.json), [entorno y builds](../artifacts/seo-performance-fixes-2026-11-02/control/environment.json), [runner](../artifacts/seo-performance-fixes-2026-11-02/control.ps1), [build baseline](../artifacts/seo-performance-fixes-2026-11-02/baseline-build.log). Una tanda inicial de control sin categorías válidas por el formato de argumentos de PowerShell se descartó y se repitió con validación explícita de categoría. Los informes conservados de esa tanda están separados en control-invalid-categories y no aportan puntuaciones a estas tablas.


## Auditoría publicada de referencia, anterior a las correcciones

El bloque siguiente conserva los resultados originales y sus limitaciones. Cualquier recomendación histórica de añadir Custom Events queda descartada para el plan Hobby confirmado. Sus referencias a ausencia de eventos o a código sin modificar describen esa auditoría inicial, no el estado local corregido.

Fecha: 2 de noviembre de 2026. Sitio: https://www.aleviclop.dev.

### Dictamen

El rendimiento publicado es sólido: las ocho rutas obtienen Performance 100 en escritorio y medianas de 92–97 en móvil. Best Practices y SEO son 100 en todas las combinaciones. La home obtiene Accessibility 100; los casos de estudio quedan en 95–96 por contraste. No se ha demostrado un fallo crítico que justifique modificar la aplicación en esta auditoría.

Las acciones con valor son corregir esos contrastes, completar la medición de conversiones y reducir el coste de los vídeos cuando se reproducen. Conviene contrastar el LCP móvil con datos de usuarios antes de alterar animaciones, fuentes o arquitectura. No se recomienda una campaña para alcanzar 100 en móvil.

### Alcance y reproducibilidad

- Producción verificada mediante Vercel antes y después de Lighthouse: deployment READY `dpl_6ShRbvniFus2xJokVrddfTSJskuU`, alias `portfolio-p49e42i72-aleviclop.vercel.app`, origen Git, commit `b1d7598a6b0b61382008b2c3e1793b071d23d270`. Coincide con HEAD local. No se cambió el despliegue.
- Ocho documentos públicos: home y tres casos de estudio, cada uno en ES/EN. Se comprueba el conjunto real publicado, no los ejemplos históricos de rutas en documentación.
- Lighthouse CLI 12.8.2, Node 22.22.2, Chromium headless 156.0.8078.4 en Windows. Sin Chrome DevTools MCP disponible; se ejecutó Lighthouse real con Chromium y Playwright, sin sustituir mediciones por estimaciones manuales.
- 48 capturas válidas: tres por ruta y perfil, secuenciales, sin ejecutar otras suites simultáneamente. Ventana Lighthouse: 14:35–14:53 UTC (15:35–15:53 en Madrid). Almacenamiento reiniciado por Lighthouse.
- Móvil Lighthouse: 412 × 823, DPR 1,75, emulación Moto G Power, red simulada 1.638,4 Kbps / RTT 150 ms, CPU ×4. Escritorio: 1350 × 940, DPR 1, 10.240 Kbps / RTT 40 ms, CPU ×1. La emulación usa el UA configurado por Lighthouse; no equivale a un teléfono físico.
- Nueve capturas adicionales fallaron al registrar la traza con `NO_NAVSTART`; se conservaron como inválidas y se repitieron. No se excluyeron puntuaciones bajas válidas. El rango muestra las tres ejecuciones válidas.
- Cada celda es la mediana independiente de tres muestras; no representa necesariamente una misma ejecución. Los HTML enlazados son muestras y los JSON conservan las tres.
- El 100/96 de la home aportado por el usuario tiene otra metodología no documentada aquí: estas cifras no demuestran una regresión frente a esa referencia.

Son resultados de laboratorio, no Core Web Vitals de campo. No se ha medido INP real ni obtenido un p75 de CrUX/Speed Insights.

### Resultados Lighthouse

#### Móvil

| Ruta / informe de muestra | Performance (rango) | Accessibility | Best Practices | SEO | LCP (s) | CLS | TBT (ms) | FCP (s) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [/](../artifacts/seo-performance-final-2026-11-02/home-es-mobile-1.report.html) | 94 (93–94) | 100 | 100 | 100 | 2.84 | 0 | 135 | 1.09 |
| [/en](../artifacts/seo-performance-final-2026-11-02/home-en-mobile-1.report.html) | 92 (92–95) | 100 | 100 | 100 | 2.85 | 0 | 186.5 | 1.01 |
| [/proyectos/raw-vives](../artifacts/seo-performance-final-2026-11-02/raw-es-mobile-1.report.html) | 97 (96–98) | 96 | 100 | 100 | 2.44 | 0 | 113 | 0.94 |
| [/en/projects/raw-vives](../artifacts/seo-performance-final-2026-11-02/raw-en-mobile-1.report.html) | 96 (96–96) | 96 | 100 | 100 | 2.67 | 0 | 103 | 0.94 |
| [/proyectos/lumaflow-studio](../artifacts/seo-performance-final-2026-11-02/luma-es-mobile-1.report.html) | 97 (97–98) | 96 | 100 | 100 | 2.53 | 0 | 107 | 0.94 |
| [/en/projects/lumaflow-studio](../artifacts/seo-performance-final-2026-11-02/luma-en-mobile-1.report.html) | 96 (95–96) | 96 | 100 | 100 | 2.59 | 0 | 130 | 0.94 |
| [/proyectos/distrito-gourmet](../artifacts/seo-performance-final-2026-11-02/distrito-es-mobile-1.report.html) | 93 (93–96) | 95 | 100 | 100 | 3.10 | 0 | 114 | 1.03 |
| [/en/projects/distrito-gourmet](../artifacts/seo-performance-final-2026-11-02/distrito-en-mobile-1.report.html) | 93 (93–93) | 95 | 100 | 100 | 3.11 | 0 | 119 | 1.06 |

#### Escritorio

| Ruta / informe de muestra | Performance (rango) | Accessibility | Best Practices | SEO | LCP (s) | CLS | TBT (ms) | FCP (s) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [/](../artifacts/seo-performance-final-2026-11-02/home-es-desktop-1.report.html) | 100 (100–100) | 100 | 100 | 100 | 0.60 | 0 | 0 | 0.34 |
| [/en](../artifacts/seo-performance-final-2026-11-02/home-en-desktop-1.report.html) | 100 (100–100) | 100 | 100 | 100 | 0.62 | 0 | 0 | 0.32 |
| [/proyectos/raw-vives](../artifacts/seo-performance-final-2026-11-02/raw-es-desktop-1.report.html) | 100 (100–100) | 96 | 100 | 100 | 0.56 | 0 | 0 | 0.28 |
| [/en/projects/raw-vives](../artifacts/seo-performance-final-2026-11-02/raw-en-desktop-1.report.html) | 100 (100–100) | 96 | 100 | 100 | 0.60 | 0 | 0 | 0.27 |
| [/proyectos/lumaflow-studio](../artifacts/seo-performance-final-2026-11-02/luma-es-desktop-1.report.html) | 100 (100–100) | 96 | 100 | 100 | 0.54 | 0 | 0 | 0.28 |
| [/en/projects/lumaflow-studio](../artifacts/seo-performance-final-2026-11-02/luma-en-desktop-1.report.html) | 100 (100–100) | 96 | 100 | 100 | 0.60 | 0 | 0 | 0.28 |
| [/proyectos/distrito-gourmet](../artifacts/seo-performance-final-2026-11-02/distrito-es-desktop-1.report.html) | 100 (100–100) | 95 | 100 | 100 | 0.66 | 0 | 0 | 0.31 |
| [/en/projects/distrito-gourmet](../artifacts/seo-performance-final-2026-11-02/distrito-en-desktop-1.report.html) | 100 (100–100) | 95 | 100 | 100 | 0.65 | 0 | 0 | 0.31 |

Las medianas CLS son 0; el máximo individual fue 0.000140. El TBT móvil mediano máximo es 186,5 ms, con máximo individual de 204 ms. No hay evidencia de bloqueo grave del hilo principal ni de inestabilidad visual en estas cargas.

### Hallazgos y prioridades

#### P1 — Contraste de navegación en los casos de estudio: confirmado

El único criterio automatizado de accesibilidad fallido en los casos es `color-contrast`, reproducido en ambos idiomas y perfiles:

- raw.vives: texto del enlace de vuelta aproximadamente `#4b5344` sobre fondo compuesto `#6c6f68`, contraste 1,56:1; el idioma inactivo ronda 2,07:1. La navegación aplica un fondo oscuro translúcido sobre el papel claro.
- LumaFlow y Distrito: idioma inactivo aproximadamente `#747870` sobre `#e9ece1`, contraste 3,76:1 para texto de 11 px, inferior a 4,5:1.

Revisar el fondo de navegación de [raw.vives](../components/raw-vives-case-study.tsx) y el color/opacidad del idioma inactivo en [LanguageToggle](../components/language-toggle.tsx). Es una corrección localizada; no requiere rediseño. Validar de nuevo ambas lenguas, teclado y contraste con los fondos efectivos, incluidos estados hover/focus.

Evidencias: auditoría `color-contrast` de los informes, estilos calculados en [browser-observations.json](../artifacts/seo-performance-final-2026-11-02/browser-observations.json), capturas [raw.vives](../artifacts/seo-performance-final-2026-11-02/raw-vives-contrast-mobile.png), [LumaFlow](../artifacts/seo-performance-final-2026-11-02/lumaflow-studio-contrast-mobile.png) y [Distrito](../artifacts/seo-performance-final-2026-11-02/distrito-gourmet-contrast-mobile.png).

#### P1 — Conversiones sin instrumentación específica: confirmado en código

[RootShell](../components/root-shell.tsx) monta Vercel Web Analytics y Speed Insights cuando `VERCEL=1`. Los dos scripts llegan con HTTP 200 en producción, también sus rutas proxy publicadas. Esto acredita la integración, no la recepción histórica de datos en el panel.

| Medición | Estado comprobado | Acción útil |
| --- | --- | --- |
| Visitas y navegación | SDK Web Analytics presente | Confirmar recepción en el panel con una visita humana |
| Web Vitals | SDK Speed Insights presente | Consultar p75 móvil por ruta y volumen de muestras |
| Descarga del CV | Cuatro enlaces con `data-track="cv-download"`; no hay consumidor del atributo ni llamada a `track()` | Evento `cv_download` con idioma y ubicación del enlace |
| Contacto completado | No hay evento específico | `contact_success` únicamente tras respuesta satisfactoria de la API |
| GitHub, LinkedIn y correo | No hay evento específico | `professional_link_click` con destino e idioma; distingue intención de envío efectivo |
| Error de contacto | Sin evento específico | Opcional: código de error para detectar fricción, sin contenido personal |

No enviar nombre, correo ni mensaje del formulario a analítica. Un clic en enviar no debe contarse como contacto entregado.

El script público de Analytics omite navegadores con `navigator.webdriver` o UA Headless. Por eso la ausencia de eventos en estas sesiones automatizadas no prueba ausencia de analítica para usuarios. Las consultas de lectura `aggregate_events` y `count_pageviews` devolvieron 404 “Web Analytics not found”; las cifras históricas quedan pendientes, sin inferir cero visitas ni servicio desactivado. Evidencias: [endpoints](../artifacts/seo-performance-final-2026-11-02/telemetry-endpoints.json), [script servido](../artifacts/seo-performance-final-2026-11-02/insights-script.js) y observaciones del navegador.

#### P2 — Vídeos de Distrito: peso elevado después de entrar en la sección

| Vídeo | Tamaño decimal | Duración | Formato | Bitrate total |
| --- | ---: | ---: | --- | ---: |
| Inicio.mp4 | 24,8 MB | 18,30 s | H.264, 1080p, 60 fps + AAC | 10,84 Mbps |
| Experiencia usuario.mp4 | 72,8 MB | 144,79 s | H.264, 1080p, 23,98 fps + AAC | 4,02 Mbps |
| Administracion.mp4 | 30,0 MB | 81,13 s | H.264, 1080p, 23,98 fps + AAC | 2,96 Mbps |

Los tres suman 127,6 MB completos. No significa que cada visita descargue esa cantidad: se sirven rangos y la reproducción condiciona la transferencia. Los HEAD públicos responden 200 y admiten rangos; los metadatos se verificaron con ffprobe sobre los archivos correspondientes del repositorio ([resultado](../artifacts/seo-performance-final-2026-11-02/video-metadata.json)).

La implementación ya usa `preload="none"`, poster, controles nativos y pausa fuera de pantalla. No hubo bytes de vídeo en las 48 cargas Lighthouse ni peticiones multimedia en la carga inicial observada. La reproducción automática al entrar en vista se desactiva con movimiento reducido. Por tanto, estos archivos no explican el LCP inicial.

Sí merece la pena crear versiones web más ligeras conservando los originales, empezando por los 18 segundos a 60 fps. Comparar 30 fps y bitrate/resolución adecuados a la legibilidad de las interfaces; comprobar texto pequeño antes de sustituir nada. El beneficio esperado es menor transferencia durante la exploración, no una mejora Lighthouse ya demostrada.

#### P2 — LCP móvil moderado: medir antes de intervenir

LCP mediano entre 2,44 y 3,11 s en móvil, frente a 0,54–0,66 s en escritorio. Siete de ocho medianas móviles superan 2,5 s, umbral orientativo de buen LCP. Esa comparación de laboratorio no determina el estado de Core Web Vitals en usuarios reales.

La home tiene una imagen de escultura como elemento LCP y ya utiliza prioridad/preload. En LumaFlow y Distrito el elemento LCP observado es texto introductorio; los vídeos no participan en su carga inicial. Los desgloses de muestras muestran retraso de renderizado relevante, pero no demuestran que una animación o fuente concreta sea la causa.

Consultar primero Speed Insights/CrUX por móvil y ruta. Si confirma el problema con muestras suficientes, investigar descubrimiento/prioridad de imagen de home y renderizado de los textos de casos mediante trazas. No eliminar animaciones ni cambiar fuentes a partir de una única sugerencia automática.

#### P3 — Imágenes, JavaScript y caché: sin urgencia demostrada

Transferencia inicial móvil, medianas en KiB (1 KiB = 1024 bytes):

| Ruta móvil | Total (KiB) | JavaScript | Fuentes | Imágenes | Vídeo inicial |
| --- | ---: | ---: | ---: | ---: | ---: |
| / | 435 | 243 | 80 | 66 | 0 |
| /en | 435 | 243 | 80 | 66 | 0 |
| /proyectos/raw-vives | 402 | 255 | 80 | 19 | 0 |
| /en/projects/raw-vives | 402 | 255 | 80 | 19 | 0 |
| /proyectos/lumaflow-studio | 406 | 252 | 80 | 22 | 0 |
| /en/projects/lumaflow-studio | 406 | 252 | 80 | 21 | 0 |
| /proyectos/distrito-gourmet | 468 | 259 | 80 | 76 | 0 |
| /en/projects/distrito-gourmet | 468 | 258 | 80 | 76 | 0 |

Lighthouse estima 57 KiB de JavaScript sin usar inicialmente en home y 80–81 KiB en casos. Puede incluir funcionalidad utilizada tras desplazamiento o interacción; no acredita código muerto. Con este TBT, no justifica una reescritura ni nuevas dependencias.

Las oportunidades de imagen de home rondan 15–23 KiB. Se sirven variantes optimizadas y no aparecen recursos visuales rotos en las rutas comprobadas. La advertencia de caché de unos 7 KiB corresponde a scripts de Vercel con aproximadamente 31 días de caché: prioridad baja y configuración gestionada por el proveedor.

### Verificación funcional en producción

Se ejecutaron las suites existentes, sin servidor local y contra el dominio público:

```text
pnpm test:e2e --config artifacts/seo-performance-final-2026-11-02/production.config.ts tests/e2e/seo.spec.ts tests/e2e/frontend-redesign.spec.ts tests/e2e/release-candidate.spec.ts
```

Resultado real: **60 PASS, 2 SKIP, 0 FAIL, 0 flaky**, en 69,38 s. Los dos SKIP son la misma prueba de simulación de Host, una por perfil, expresamente limitada a localhost. No son fallos ocultados. Configuración temporal: Chromium, 1440 × 900 y 390 × 844, un worker, sin retries. [Resultado completo](../artifacts/seo-performance-final-2026-11-02/functional-results.json).

| Comprobación | Evidencia y límite |
| --- | --- |
| Ocho documentos ES/EN | HTTP 200, canonical, hreflang, metadatos, JSON-LD e imágenes; contratos existentes superados |
| Sitemap/robots/legal/404 | Pruebas de coherencia y directivas superadas; 404 reales y legales no indexables |
| Rutas retiradas | Las contempladas en la suite llegan a documento/sección real en un salto |
| Navegación y menús | Enlaces internos, cambio ES/EN, Escape y devolución del foco comprobados en escritorio/móvil |
| CV | Descarga real en ambos perfiles: PDF de 54.819 bytes, nombre CV_Alex_Vicente_Lopez.pdf y cabecera PDF válida |
| Formulario | Éxito y error simulados, conservación de borrador y doble envío cubiertos; API real rechaza GET con 405 y payload vacío con 400 |
| Enlaces externos | Nueve destinos responden 200 tras redirecciones; incluye GitHub y demos. LinkedIn bloquea automatización (HEAD 405 / GET 999): revisión humana pendiente |
| Vídeo | Primer vídeo de Distrito reproduce y pausa con Espacio tras enfocar, en ambos perfiles; currentTime supera 2 s, readyState 4. No valida todos los controles nativos ni todos los clips |
| Errores de navegador | Ningún pageerror en las sesiones funcionales adicionales registradas |

No se envió un mensaje real a Web3Forms ni se comprobó su llegada a la bandeja: el éxito del formulario usa respuesta simulada. La comprobación de API inválida no alcanza el proveedor. No confundir validación del frontend con entrega de correo.

El primer intento exploratorio de Espacio ocurrió durante el desplazamiento y no confirmó reproducción. El ensayo separado, con vídeo visible y foco comprobado, sí reproduce/pausa en ambos perfiles ([video-controls.json](../artifacts/seo-performance-final-2026-11-02/video-controls.json)); no se modificó la aplicación. El clic por coordenadas de ese ensayo no activó reproducción, por lo que no se presenta como validación de todos los controles con puntero.

### Evidencias y conservación

- [Resumen JSON de las 48 muestras](../artifacts/seo-performance-final-2026-11-02/summary.json), [CSV](../artifacts/seo-performance-final-2026-11-02/summary.csv) y [ejecuciones individuales](../artifacts/seo-performance-final-2026-11-02/runs.json).
- [Runner Lighthouse](../artifacts/seo-performance-final-2026-11-02/run-lighthouse.ps1) y [agregador con comprobaciones de integridad](../artifacts/seo-performance-final-2026-11-02/summarize.cjs).
- [Diagnósticos de carga inicial](../artifacts/seo-performance-final-2026-11-02/initial-load-diagnostics.json).
- [Pruebas Playwright](../artifacts/seo-performance-final-2026-11-02/functional-results.json), [configuración temporal](../artifacts/seo-performance-final-2026-11-02/production.config.ts).
- [Navegación, CV, red y API](../artifacts/seo-performance-final-2026-11-02/browser-observations.json), [destinos externos](../artifacts/seo-performance-final-2026-11-02/outbound-links.json), [vídeo](../artifacts/seo-performance-final-2026-11-02/video-controls.json).
- Capturas [home escritorio](../artifacts/seo-performance-final-2026-11-02/home-desktop.png) y [home móvil](../artifacts/seo-performance-final-2026-11-02/home-mobile.png).

Los HTML/JSON, scripts de ejecución y capturas permanecen en `artifacts/seo-performance-final-2026-11-02/`, directorio ignorado por Git. Los enlaces de este documento funcionan en este checkout; para compartir las evidencias hay que adjuntar esa carpeta. No se añaden informes voluminosos ni scripts temporales al código versionado.

### Orden recomendado y límites

1. Corregir contraste localizado y repetir accesibilidad en las seis páginas afectadas.
2. Verificar recepción de analítica desde un navegador humano y añadir solo las conversiones principales.
3. Preparar vídeos web más ligeros, revisar legibilidad y comparar transferencia durante reproducción.
4. Revisar p75 móvil y volumen de datos; optimizar LCP solo si la evidencia de campo lo merece.

Pendiente de comprobación humana: LinkedIn, entrega real de contacto, panel de eventos y Web Vitals, Safari/iOS y Android físicos. No se ha realizado una auditoría completa con lector de pantalla ni se certifica conformidad WCAG a partir de Lighthouse. SEO 100 tampoco acredita indexación efectiva ni posiciones en Google.

No se modificó código de aplicación, dependencias ni configuración externa. Se añade únicamente este informe; no se hizo commit, push ni deploy. No se repitieron lint, typecheck, tests unitarios ni build para un cambio documental; las validaciones ejecutadas son Lighthouse, las suites Playwright indicadas y las comprobaciones HTTP/navegador descritas.

Referencias metodológicas: [puntuación y variabilidad de Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring), [LCP y evaluación de campo](https://web.dev/articles/lcp), [TBT](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time), [eventos personalizados de Vercel](https://vercel.com/docs/analytics/custom-events).
