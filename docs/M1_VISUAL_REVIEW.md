# M1 — revisión visual y de calidad

Fecha: 2026-10-10. Alcance: hero, navegación y fundamentos de M1. M2 no iniciado.
Revisión de `/` y `/en` sobre `next build` + `next start`, Node 22.22.2,
Chromium de Playwright. Sin commit, push ni despliegue.

## Dictamen creativo

La primera impresión comunica desarrollo full-stack junior, Alex Vicente López y
dos acciones inequívocas: proyectos y CV. El ojo sigue el titular marfil, la línea
azul y los CTAs. La composición resulta editorial y sobria; todavía tiene menos
identidad visual propia y variedad de ritmo que la referencia. No considero que
una tipografía grande, por sí sola, alcance el nivel final de portfolio premium.

Space Grotesk sostiene la jerarquía con Inter en el texto e IBM Plex Mono en las
etiquetas. La asimetría de la segunda línea funciona en escritorio y tablet; se
retira en móvil para preservar anchura y lectura. La descripción de 16–18 px es
legible; las etiquetas de 11 px son pequeñas pero no presentan un fallo de
contraste en la auditoría automática. El header ocupa 88 px y sus controles
tienen objetivos de 44 px. Los botones del hero tienen 56 px de altura.

Contrastes del sistema sobre `#0B0D12`: marfil 17,53:1, texto secundario 8,38:1
y azul 6,13:1. El CTA azul usa texto oscuro con ese mismo contraste. Los tests
contrastan valores calculados del DOM, además de estas relaciones de tokens.

Desktop 1440×900: buena escala, alineación entre identidad y descripción,
espacio negativo deliberado y CTAs dentro de la primera pantalla. Tablet
768×1024: los CTAs se apilan en la columna derecha; el gran vacío inferior
mantiene el footer en el borde del hero. Móvil 390×844: jerarquía lineal, segunda
línea sin sangría, botones contiguos y enlaces sociales en otra fila. El cargo
español ocupa dos líneas. No se detectaron recortes del titular ni overflow
horizontal en las seis combinaciones.

## Errores objetivos de M1 corregidos

| Hallazgo | Evidencia / causa | Corrección |
| --- | --- | --- |
| La descripción profesional se oculta durante la hidratación y su entrada posterga LCP | Lighthouse móvil inicial: LCP 5,72 s; el elemento LCP es `p[data-hero-copy]`. El timeline aplicaba `opacity: 0` y desplazamiento a ese párrafo. | La descripción permanece visible y estática. Identidad y CTAs mantienen una entrada por desplazamiento; máscaras del titular, indicador y footer conservan su secuencia. |
| Una hidratación tardía puede volver a ocultar un titular que el servidor ya mostró | El hero es visible en HTML, pero GSAP `.from()` puede iniciarse después de que el visitante empiece a leer. | Si la hidratación supera el presupuesto de entrada de 1,3 s desde navegación, se conserva el estado visible sin reproducir la entrada. Test con JavaScript retrasado 1,8 s. |
| Una fuente de sustitución puede partir el titular y desplazar el bloque inferior | Medición intermedia móvil: CLS 0,152 en `hero summary`, con cambio de fuente y anchura del titular. Los tests anteriores esperaban `document.fonts.ready`, ocultando ese caso. | `white-space: nowrap` en cada línea enmascarada. Regresión con fuentes retrasadas 2,5 s a 412 px. |

La corrección prioriza contenido profesional y rendimiento frente a animar el
párrafo LCP. No cambia textos, enlaces, rutas, SEO, contacto ni dependencias del
proyecto. Los cambios de implementación de esta revisión están en
`components/hero.tsx` y `components/hero.module.css`; las regresiones se cubren
en `tests/e2e/hero.spec.ts`.

## Movimiento y accesibilidad

El timeline conserva duración máxima de 1,3 s, con `expo.out` en las líneas y
`power3.out` en elementos auxiliares. La descripción no vuelve a desaparecer.
El scroll del título se limita a 20 px en escritorio; no hay pinning ni
scrolljacking en M1. GSAP usa contextos, matchMedia y limpieza de listeners.
El magnetismo mueve la etiqueta, no la zona clicable, con límites de 4×3 px;
se desactiva en touch y movimiento reducido. Los tests verifican límites y
reversión al cambiar `prefers-reduced-motion` durante la sesión.

El menú modal funciona en ES/EN en tablet y móvil, cierra con Escape y devuelve
foco al disparador. El test específico comprueba aislamiento de foco y acceso a
experiencia. Las pruebas existentes cubren navegación sin JavaScript, contraste
del texto/azul/CTA principal, CV y ausencia de errores de página.

Los JSON por viewport registran tipografía calculada, errores, recortes,
overflow, suma de cambios de layout y muestras de `requestAnimationFrame`
durante los primeros 3 s. Son muestras de laboratorio que incluyen carga e
hidratación: hubo intervalos superiores a 16,7 ms; no prueban 60 FPS constantes
ni representan un móvil físico. La suma de desplazamientos iniciales fue 0 en
las seis capturas previas. Esta suma no sustituye el cálculo de ventanas CLS de
Lighthouse. No se detectaron saltos geométricos del hero en las capturas o tests.
No se hizo una validación con lector de pantalla ni una certificación WCAG.

## Comparación conceptual con la referencia

[Dennis Snellenberg](https://dennissnellenberg.com/) se inspeccionó en navegador:
retrato protagonista, escala tipográfica que cruza los bordes, marquee continuo,
navegación mínima y transición al contenido claro con amplio espacio negativo.
Su identidad se reconoce por la unión entre imagen, tipografía y movimiento.
ALEVICLOP tiene una estructura profesional más explícita y una entrada finita;
la tipografía y los CTAs están bien jerarquizados, pero aún falta una firma visual
igual de reconocible. No se copian retrato, textos, marquee ni composición.
No se pretende comparar cuantitativamente FPS ni afirmar que se han reproducido
todas las interacciones de la referencia.

## Mejoras estéticas opcionales — no errores

1. Reducir ligeramente el tracking de `-.065em` en el titular móvil, comparando
   alternativas con ES/EN: hoy las líneas están ajustadas pero no recortadas.
2. Subir las etiquetas profesionales a 12 px y revisar el salto del cargo en ES.
3. En tablet, estudiar una columna de descripción algo más amplia para dejar
   ambos CTAs en una fila; el apilado actual es funcional.
4. Añadir una firma visual basada en material real de Alex y un cambio de ritmo
   más claro hacia Selected Work. Es una decisión creativa para los hitos
   siguientes, no una corrección urgente ni una imagen de stock.
5. Unificar posteriormente la tipografía y alineación de secciones heredadas con
   el hero. Las capturas completas permiten ver esta discontinuidad.

## Hallazgos heredados fuera de M1

Lighthouse identifica un `<a>` sin `href` en la imagen de AI Creative Assistant,
porque el proyecto no tiene `link` ni caso publicado. Hay enlace GitHub en el
contenido, pero esa imagen no debe parecer un enlace operativo. Esto baja SEO
a 92 en la medición inicial. No se inventó una URL ni se intervino Selected Work.

Dos enlaces del archivo muestran «Ver código» y usan un `aria-label` que solo
incluye proyecto y «GitHub». Lighthouse lo registra como
`label-content-name-mismatch` aunque su puntuación de accesibilidad sea 100.
Debe corregirse en el mantenimiento de proyectos; 100 automático no significa
ausencia de todo defecto de accesibilidad.

El coste de JavaScript/hidratación de toda la home sigue apareciendo en
Lighthouse. No se ha refactorizado la arquitectura ni se han añadido bibliotecas
para perseguir una puntuación. Los resultados finales y el estado de los
objetivos están en la tabla de mediciones debajo.

## Evidencia y reproducción

Directorio: `artifacts/visual-review/m1/2026-10-10/`.

`before/` conserva seis páginas completas, seis crops del hero, cuatro menús y
seis JSON antes de corregir. `after/` contiene el mismo conjunto final. Las
páginas se desplazan por sus secciones para cargar medios y completar reveals
antes de capturar; las capturas finales conservan movimiento normal.

| Viewport | Español final | Inglés final |
| --- | --- | --- |
| Desktop 1440×900 | [desktop-es-full.png](../artifacts/visual-review/m1/2026-10-10/after/desktop-es-full.png) | [desktop-en-full.png](../artifacts/visual-review/m1/2026-10-10/after/desktop-en-full.png) |
| Tablet 768×1024 | [tablet-es-full.png](../artifacts/visual-review/m1/2026-10-10/after/tablet-es-full.png) | [tablet-en-full.png](../artifacts/visual-review/m1/2026-10-10/after/tablet-en-full.png) |
| Móvil 390×844 | [mobile-es-full.png](../artifacts/visual-review/m1/2026-10-10/after/mobile-es-full.png) | [mobile-en-full.png](../artifacts/visual-review/m1/2026-10-10/after/mobile-en-full.png) |

La matriz reutiliza Playwright del repositorio y no añade dependencias:

```powershell
$env:M1_AUDIT_OUTPUT = 'artifacts/visual-review/m1/2026-10-10/after'
pnpm test:e2e tests/e2e/m1-visual-audit.spec.ts --project=desktop-chromium --workers=1
```

Lighthouse 12.8.2 se ejecuta temporalmente con `pnpm dlx`, sin modificar
package.json ni lockfile. Usa Chromium instalado por Playwright y build local
de producción, simulación móvil predeterminada y preset desktop. Guardados HTML
y JSON por dispositivo, antes y después; los archivos `intermediate` conservan
mediciones de correcciones intermedias para no ocultar resultados.

```powershell
$env:CHROME_PATH = (node -e "console.log(require('@playwright/test').chromium.executablePath())")
pnpm dlx lighthouse@12.8.2 http://127.0.0.1:3100/ --output=json --output=html --output-path=artifacts/visual-review/m1/2026-10-10/lighthouse-mobile-after --chrome-flags="--headless --no-sandbox" --quiet
# Desktop: añadir --preset=desktop y usar otro output-path.
```

Las puntuaciones son locales, con variación de hardware y carga. No son datos
de campo ni verifican LCP p75, INP real o producción. Lighthouse se ejecuta sobre
ES; la paridad visual/funcional ES/EN se comprueba en Playwright.

## Mediciones y validación final

| Dispositivo / estado | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Móvil antes | 57 | 100 | 100 | 92 | 5,72 s | 998 ms | 0 |
| Móvil final | 61 | 100 | 100 | 92 | 4,42 s | 1.160 ms | 0 |
| Desktop antes | 89 | 100 | 100 | 92 | 1,11 s | 252 ms | 0 |
| Desktop final | 96 | 100 | 100 | 92 | 0,90 s | 143 ms | 0 |

Informes finales: [móvil HTML](../artifacts/visual-review/m1/2026-10-10/lighthouse-mobile-after.report.html),
[desktop HTML](../artifacts/visual-review/m1/2026-10-10/lighthouse-desktop-after.report.html).
JSON equivalentes junto a cada HTML. Los ensayos intermedios también se
conservan: el móvil osciló entre 52 y 63 y un ensayo detectó CLS 0,152 antes de
corregir el salto de línea de la fuente de sustitución. No se eligió la mejor
medición como resultado final ni se eliminaron resultados adversos.

**Performance móvil ≥90 y LCP ≤2,5 s: NO ALCANZADOS en laboratorio.**
Queda trabajo de perfilado de carga/hidratación y ejecución de JavaScript;
Lighthouse sigue señalando trabajo de React/GSAP y render delay del párrafo
LCP aun cuando este ya no se anima. La relación causal entre el cambio y toda
la variación de puntuación no puede demostrarse con estas muestras únicas.
No se ha alterado la arquitectura ni iniciado M2/M3/M4. La auditoría está
completa, pero esto no constituye aprobación del objetivo de rendimiento móvil.

| Comprobación final | Resultado |
| --- | --- |
| `pnpm lint` | PASS |
| `pnpm typecheck` | PASS |
| `pnpm build` con Node 22 | PASS, 26 rutas generadas |
| `pnpm test` | PASS, 44 tests |
| `pnpm test:e2e --workers=1` | PASS, 41 tests; 9 omisiones intencionadas |
| Matriz ES/EN desktop/tablet/móvil | PASS, 6 capturas completas finales |
| Overflow / recortes / errores JS de la matriz | Ninguno en las 6 combinaciones |
| Suma inicial de cambios de layout de la matriz | 0 en las 6 combinaciones |
| Fuentes retrasadas / JavaScript retrasado | PASS en proyectos desktop y móvil |
| Movimiento reducido / sin JavaScript / magnetismo / foco modal | PASS en los tests correspondientes |
| `git diff --check` | PASS; avisos de conversión LF/CRLF, sin errores de whitespace |
| Lector de pantalla / móviles físicos / CWV de campo p75 | NOT RUN |
| Producción / commit / push / despliegue | No ejecutados |

Las 9 omisiones son pruebas que no aplican al viewport configurado: menú móvil
en desktop, magnetismo en touch, barrido adicional de tamaños en contexto móvil,
y las 6 capturas de la matriz se ejecutan una vez en lugar de duplicarse en el
segundo proyecto. Los tests incluyen rutas/SEO y contacto, sin enviar mensajes
reales (el endpoint está interceptado en la prueba de formulario).

Registro Node: `node-tests.txt`. Estado Playwright: `playwright-last-run.json`
(`passed`, sin tests fallidos). Resumen legible de mediciones:
`audit-summary.json`, todos bajo el directorio de evidencia indicado.
