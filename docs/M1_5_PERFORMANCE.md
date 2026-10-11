# ALEVICLOP 2.0 — M1.5: rendimiento y refinamiento

Fecha: 2026-10-10. Build de producción local, rama existente `main`.

Estado: optimizaciones implementadas y regresión validada. **Los objetivos móviles
de Performance ≥90 y LCP ≤2,5 s siguen sin cumplirse. M1 no está preparado para
aprobación definitiva con esos criterios de aceptación.** La composición aprobada,
la tipografía monumental y la secuencia GSAP del hero se mantienen.

## Evidencias y método

Directorio: `artifacts/performance/m1-5/2026-10-10/`.

- `before/`: tres ejecuciones móviles y tres de escritorio del M1 anterior.
- `after/`: tres ejecuciones por perfil del build final, sin seleccionar la mejor.
- Cada ejecución conserva HTML, JSON, log, DevTools log y traza completa `.trace.json.gz`.
- `diagnostic-summary.json`: elemento LCP, subpartes observadas, recursos, tareas
  largas, CSS bloqueante, cobertura JavaScript y trabajo del hilo principal.
- `screenshots/`: capturas completas, recortes del hero, menús y mediciones DOM ES/EN.
- `visual-summary.json`: overflow, recortes, cambios de layout y muestras RAF.
- Logs de build, lint, typecheck, Node, E2E y comprobación de whitespace en la raíz.

Se utiliza `scripts/measure-m15.ps1`, Lighthouse **12.8.2**, Chromium headless
**151.0.0.0**, Node **22.22.2**, `pnpm build` y `pnpm start`, puerto 3100.
Servidor precalentado, Chrome independiente por ejecución y reseteo de almacenamiento
de Lighthouse habilitado. Ejecuciones secuenciales; la serie final no comparte CPU
con build, tests ni procesamiento de imágenes.

Móvil: simulación predeterminada, 412×823, DPR 1,75, RTT 150 ms,
throughput 1638,4 Kbps y factor CPU 4. Escritorio: `--preset=desktop`.
Los parámetros efectivos completos se guardan en cada `runs.json` y reporte.
Las capturas responsive utilizan 1440×900, 768×1024 y 390×844; no se confunden
estos tamaños con la emulación móvil de Lighthouse.

La calibración del host varía: benchmarkIndex móvil antes 2069,5–3185, después
3557,5–3617,5; escritorio antes 2236–2514, después 3631,5–3675,5. Es una limitación
de comparabilidad: misma máquina, herramientas y configuración, pero distinta
calibración CPU. No se atribuye toda la diferencia numérica exclusivamente al código.
Los experimentos intermedios son muestras exploratorias de una ejecución por perfil.

Las puntuaciones iniciales comunicadas (61 móvil / 96 escritorio) corresponden a
la auditoría anterior. Para la comparativa reproducible de esta fase se usan las
nuevas series de tres, sin sustituir ni borrar las evidencias anteriores.

## Resultados individuales y medianas

| Serie | Perfil / ejecución | Performance | LCP, ms | TBT, ms | CLS |
| --- | --- | ---: | ---: | ---: | ---: |
| Antes | Móvil 1 | 68 | 4651,89 | 598,02 | 0 |
| Antes | Móvil 2 | 77 | 4362,38 | 345,32 | 0 |
| Antes | Móvil 3 | 66 | 4417,15 | 771,46 | 0 |
| Después | Móvil 1 | 88 | 3842,67 | 19,50 | 0 |
| Después | Móvil 2 | 91 | 3464,32 | 19,50 | 0 |
| Después | Móvil 3 | 88 | 3840,73 | 21,50 | 0 |
| Antes | Desktop 1 | 99 | 861,30 | 60,92 | 0 |
| Antes | Desktop 2 | 99 | 883,61 | 69,28 | 0 |
| Antes | Desktop 3 | 99 | 883,76 | 51,25 | 0 |
| Después | Desktop 1 | 100 | 794,84 | 0 | 0 |
| Después | Desktop 2 | 100 | 802,92 | 0 | 0 |
| Después | Desktop 3 | 100 | 798,34 | 0 | 0 |
| **Mediana antes** | **Móvil** | **68** | **4417,15** | **598,02** | **0** |
| **Mediana después** | **Móvil** | **88** | **3840,73** | **19,50** | **0** |
| **Mediana antes** | **Desktop** | **99** | **883,61** | **60,92** | **0** |
| **Mediana después** | **Desktop** | **100** | **798,34** | **0** | **0** |

Las doce ejecuciones mantienen Accessibility 100, Best Practices 100 y SEO 92.
SEO 92 es preexistente: hay un enlace no rastreable en la presentación de un
proyecto sin URL principal. No se inventa una URL ni se rediseña Selected Work.
Los contratos de canonical, hreflang, alternancia de idiomas e indexabilidad pasan.

## Diagnóstico causal y límites de la evidencia

**Elemento LCP exacto:** `section#hero > div[class*="summary"] >
div[class*="pitch"] > p[data-hero-copy]`, el párrafo de presentación de Alex.
No es una imagen. El mismo elemento aparece en las trazas antes y después.

En `before/mobile-1`, la traza registra FCP y LCP observados juntos a **551,91 ms**.
El primer layout completo afecta a **773 elementos** y dura aproximadamente
**228 ms**, antes de evaluar el JavaScript de la aplicación. Hay una actualización
de estilos de unos 83 ms y un segundo layout de unos 41 ms al cargar fuentes.
Esto justifica investigar fuentes y renderizado inicial, además de hidratación.

El insight de subpartes de la serie actual expresa **tiempos observados**, mientras
que las métricas principales utilizan el modelo de throttling simulado de Lighthouse:

| Subparte / métrica, ejecución móvil 1 | Antes | Después |
| --- | ---: | ---: |
| TTFB observado | 11,19 ms | 7,65 ms |
| Retraso de carga del recurso LCP | 0; LCP de texto | 0; LCP de texto |
| Duración de carga del recurso LCP | 0; LCP de texto | 0; LCP de texto |
| Retraso de renderizado observado | 540,72 ms | 273,01 ms |
| LCP observado en traza | 551,91 ms | 280,66 ms |
| LCP principal, simulado | 4651,89 ms | 3842,67 ms |

**Los 281 ms observados no acreditan el objetivo móvil de 2,5 s.** El resultado
de aceptación es el LCP simulado de la serie final. El TTFB simulado ronda 0,46 s;
el TTFB real local no identifica un cuello de botella de backend. No se deduce
de localhost el TTFB de Vercel para usuarios reales.

El párrafo ya permanece visible y estacionario durante la entrada de M1. Las
trazas muestran su pintado junto al FCP: no hay evidencia para achacar el retraso
restante únicamente a la animación del hero. Su timeline de aproximadamente
1,3 s, máscaras, curvas y movimiento desktop se conservan.

Dos hojas CSS siguen bloqueando el renderizado: transferencia conjunta de unos
18,9 KB después, frente a 18,6 KB antes. Lighthouse estima aproximadamente 304 ms
por recurso en la ejecución móvil final 1. Las fuentes críticas del hero se
precargan; Geist de las secciones existentes se descubre desde CSS más tarde.
`font-display: swap` se mantiene y las fuentes se sirven localmente.

En el reporte final móvil 1 siguen figurando tareas largas de aproximadamente
228 ms y 216 ms previas al pintado principal, y una tarea atribuida al chunk de
React de 89 ms. La cobertura señala JavaScript no utilizado en React y GSAP,
pero esa cobertura de la primera vista no demuestra que pueda eliminarse: el
scroll, los estados interactivos y el contacto requieren parte de ese código.
Las trazas no contienen un perfil CPU completo con stacks por función; no se
inventan atribuciones más precisas.

Las importaciones `next/dynamic` existentes separan chunks, pero sus componentes
se renderizan inmediatamente y cargan JavaScript al inicio. No equivalen a
hidratación diferida por viewport. La transferencia de scripts sigue en unos
264 KB: **esta fase reduce trabajo inicial, no acredita una reducción del bundle**.
El HTML SSR de todas las secciones permanece disponible, incluso sin JavaScript.

Las imágenes secundarias conservan la estrategia existente; el primer proyecto
transfiere una cubierta SVG de 1,7 KB en esta captura de carga. No es el recurso
LCP. No se modifican fotografías ni se sustituyen proyectos por contenido ligero.
El favicon sí era un recurso independiente de 248 KB, desproporcionado para su uso.

Todas las puntuaciones comparables proceden de producción local. No se mide ni
se presenta el servidor de desarrollo con HMR como equivalente a producción.

## Cambios implementados

1. **Fuentes:** Geist y Geist Mono pasan de los archivos completos del paquete
   a los subconjuntos latinos de `next/font/google`, manteniendo las familias y
   variables existentes. No compiten por precarga con Space Grotesk, Inter e IBM
   Plex Mono. Transferencia de fuentes: **226 781 → 138 155 bytes** en móvil 1.
   Los archivos críticos del hero y sus pesos variables se conservan. ES/EN y
   texto acentuado se revisan en el build. La versión binaria de Geist puede
   diferir entre proveedores; no se afirma identidad pixel a pixel de esas fuentes.
2. **Motion inferior:** `deferToViewport` en la infraestructura GSAP existente
   inicializa Projects, Skills, Contact y RevealHeader al aproximarse al viewport.
   IntersectionObserver se desconecta y `contextSafe` conserva la limpieza de
   GSAP y matchMedia. Se mantienen contenido SSR, duración de reveals, geometría,
   preferencias de movimiento reducido y entrada del hero.
3. **Favicon:** la misma marca AV se dimensiona a 192×192; **248 080 → 4 823 bytes**.
   Se mantiene `/favicon.png` y se actualizan las dimensiones en metadatos ES/EN
   y manifest. No cambia la ilustración de marca.
4. **Regresión y evidencias:** comprobaciones de las tres precargas críticas,
   familias del hero, tamaño/peso del favicon y contenido fuera de pantalla visible
   antes de activar sus reveals. Harness de medición con validación de reportes,
   matriz completa y compresión de trazas verificada mediante descompresión idéntica.
5. **Accesibilidad:** las tres etiquetas del formulario usan el azul de marca
   sin transparencia: se corrige el contraste 3,96:1 detectado por Lighthouse.
   Los enlaces del archivo incluyen “Ver código” / “View code” en su nombre
   accesible junto al proyecto. Las pruebas ES/EN comprueban contraste ≥4,5:1
   y correspondencia entre texto visible y nombre accesible. No cambian los
   enlaces, las funcionalidades ni la presentación de los proyectos.

Transferencia total registrada en móvil 1: **787 829 → 457 218 bytes**. Incluye
recursos de todas las categorías del reporte, no solo el contenido visible.
No se añaden dependencias de ejecución, ni se cambia el framework o las rutas.

## Experimentos conservados

Una muestra móvil / desktop por experimento; no representan medianas de aceptación.

| Carpeta | Móvil P / LCP / TBT | Desktop P / LCP / TBT | Decisión |
| --- | --- | --- | --- |
| `font-preload-experiment` | 78 / 4458 ms / 251 ms | 99 / 864 ms / 6 ms | Precarga selectiva con archivos completos no resuelve LCP; sustituida por subconjuntos |
| `font-subset-experiment` | 87 / 3857 ms / 73 ms | 100 / 793 ms / 0 ms | Subconjuntos mantenidos |
| `deferred-motion-experiment` | 88 / 3846 ms / 42 ms | 100 / 801 ms / 0 ms | Inicialización diferida mantenida |
| `favicon-optimized-experiment` | 88 / 3829 ms / 28 ms | 100 / 772 ms / 0 ms | Menor transferencia; sin mejora relevante de LCP atribuible al favicon |
| `compact-preload-experiment` | 83 / 4025 ms / 234 ms | 100 / 792 ms / 0 ms | Precarga de las cinco fuentes revertida |
| `inter-static-experiment` | 88 / 3851 ms / 23 ms | 100 / 796 ms / 0 ms | Pesos estáticos de Inter revertidos; sin mejora de LCP |

`favicon-experiment` conserva una ejecución móvil 78 / 5268 ms / 118 ms.
**Inválida para comparación:** coincidió con un proceso de compresión PNG que
ocupaba CPU; se interrumpió la serie y se documenta en su README. No se borra
la medición ni se usa para calcular las medianas. Después se realizó la medición
aislada en `favicon-optimized-experiment`.

`after-before-contrast-review/` conserva otra serie completa: móvil 88 / 3820,10 ms
y escritorio 100 / 803,18 ms de mediana, pero **Accessibility 97 en los seis runs**.
Al diferir la inicialización GSAP, el formulario permanecía visible para la
auditoría y quedaron expuestos los defectos de contraste antes ocultos por su
reveal. Esta serie no se borra; sus defectos se corrigen y se vuelve a medir todo
el build final. La puntuación 100 final se obtiene con esos elementos visibles.

## Revisión visual

Las seis capturas finales preservan tipografía, tres líneas del titular, acento
azul, composición asimétrica desktop y apilado móvil. No se detectan líneas
recortadas, overflow horizontal, cambios de layout iniciales ni errores JS en
la matriz. Nombre, especialidad, experiencia y ambos CTAs siguen visibles y legibles.
Los CTAs tienen 56 px de altura y el menú conserva foco, Escape y retorno al botón.

En tablet los CTAs se apilan dentro de la columna de texto; en móvil se conserva
el flujo natural y la diferente longitud del rol ES/EN. Los detalles inferiores
pueden necesitar un pequeño scroll en español a 390×844, sin esconder los CTAs.
No se hacen ajustes estéticos arbitrarios sobre la composición ya aprobada.
Los labels técnicos de 11 px podrían aumentarse como preferencia estética futura;
no constituyen un nuevo defecto ni se cambian en esta fase.

La muestra RAF de los primeros tres segundos tiene mediana de 16,7 ms en las seis
combinaciones y máximos iniciales de 99,9–116,7 ms. Incluye carga y primer layout;
no es un perfil exclusivo del timeline ni acredita 60 FPS en móviles físicos.
Las pruebas verifican estados finales, magnetismo acotado y reversión de transforms
al solicitar movimiento reducido. No hay saltos de layout registrados.

| Captura completa | Tamaño |
| --- | --- |
| `screenshots/desktop-es-full.png` | 1440 px de ancho |
| `screenshots/desktop-en-full.png` | 1440 px de ancho |
| `screenshots/tablet-es-full.png` | 768 px de ancho |
| `screenshots/tablet-en-full.png` | 768 px de ancho |
| `screenshots/mobile-es-full.png` | 390 px de ancho |
| `screenshots/mobile-en-full.png` | 390 px de ancho |

## Validación final

| Comprobación | Resultado |
| --- | --- |
| `pnpm lint` | PASS |
| `pnpm typecheck` | PASS |
| `pnpm build` con Node 22 | PASS, 26 páginas generadas |
| `pnpm test` | PASS, 44 tests |
| `pnpm test:e2e --workers=1` contra `pnpm start` | PASS, 45 tests; 9 omisiones intencionadas |
| ES/EN a 1440, 768 y 390 px | PASS, capturas y checks DOM |
| Fuentes/JS retrasados, sin JS, reduced motion, teclado, magnetismo | PASS en los tests correspondientes |
| Rutas, SEO, idioma, CV, media y contacto simulado | PASS |
| Lighthouse A / Best Practices / CLS, doce ejecuciones | 100 / 100 / 0 |
| Performance desktop ≥90 | PASS, 100 de mediana |
| Performance móvil ≥90 | FAIL, 88 de mediana |
| LCP móvil ≤2,5 s | FAIL, 3,84 s de mediana |
| `git diff --check` | PASS; avisos LF/CRLF sin errores de whitespace |

Las nueve omisiones son: menú móvil en escritorio, magnetismo de ratón en touch,
barrido de tamaños redundante en el segundo proyecto y las seis capturas de la
matriz que se ejecutan una vez. No se han eliminado ni debilitado pruebas para
alterar las puntuaciones. El contacto usa respuestas simuladas, sin envío real.

## Trabajo pendiente y aprobación

El cuello de botella restante es la ruta de renderizado/carga inicial bajo la
simulación móvil: CSS bloqueante, fuentes, layout del documento completo y entrega
del JavaScript inicial. La reducción de TBT por sí sola no permite alcanzar el LCP
objetivo. Hace falta perfilar stacks bajo throttling aplicado y contrastar un
experimento adicional de renderizado o carga diferida de las secciones inferiores,
manteniendo HTML SSR y comprobando navegación por anclas, foco y CLS. No se ha
aplicado contención con alturas estimadas que pudieran alterar esos contratos.

No hay medición de CWV de campo ni LCP p75; Lighthouse es laboratorio. Tampoco
se prueban móviles físicos, Safari/Firefox, lector de pantalla real o el proveedor
de contacto. Las series Lighthouse son de la home española; EN tiene validación
visual y funcional, no una serie de rendimiento propia. Accessibility 100 no
equivale a una certificación WCAG completa.

M1 conserva la validación visual y funcional, pero **la aprobación definitiva
queda pendiente del rendimiento móvil**. No se inicia M2, no se hace commit, push,
PR ni despliegue.

Para repetir la serie con el build de producción ya iniciado:

```powershell
./scripts/measure-m15.ps1 -OutputDirectory artifacts/performance/m1-5/nueva-serie -Runs 3
```

Las trazas se comprimen sin eliminar eventos. Para obtener JSON importable en
DevTools desde una copia concreta:

```powershell
node -e "const fs=require('fs'),z=require('zlib');const p=process.argv[1];fs.writeFileSync(p.slice(0,-3),z.gunzipSync(fs.readFileSync(p)))" artifacts/performance/m1-5/2026-10-10/after/mobile-1-0.trace.json.gz
```
