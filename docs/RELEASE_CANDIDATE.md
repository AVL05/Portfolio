> **2026-10-11 — Lanzamiento detenido por petición del usuario.** ALEVICLOP 2.1 está en exploración artística. Las validaciones técnicas y la Preview 2.0 son evidencia histórica, no una autorización de publicación. Ver [laboratorio 2.1](../explorations/aleviclop-2-1/README.md).

# ALEVICLOP 2.0 — Release Candidate & Pre-Launch Validation

Fecha: 2026-10-11. Candidata local sobre `main`, HEAD `04e13c4a30270454bd423ceb66ea6462f0e776e1`. Sin commit, push, despliegue, cambio de DNS ni envío real de correo. Este documento complementa [M4](M4_FINAL_AUDIT.md); no sustituye su histórico de mediciones.

## 1. Estado general

**CONDITIONAL GO para staging; publicación pendiente de gates.** La dirección artística, funcionalidades y animaciones de M1–M4 se conservan. Esta fase corrige el contacto y prepara una candidata verificable; no introduce un rediseño.

Cambios de esta fase:

- Cliente de contacto: timeout de 30 s, superior a los dos intentos de 12 s del proveedor en el servidor. Evita ofrecer un reintento mientras el servidor aún procesa el envío anterior.
- Bloqueo síncrono con ref durante el envío, además del botón deshabilitado: cubre dos eventos submit antes del commit de React.
- Reintentar pasa por el submit validado: editar un campo tras un fallo ya no evita la validación del cliente.
- Se retira `geist`, sin imports del paquete en la aplicación. Las fuentes Geist existentes siguen usando `next/font/google`; no se eliminan familias ni se altera la presentación.
- `.gitignore` excluye `artifacts/`; `.vercelignore` excluye evidencias, archivos de entorno y resultados de Playwright. No se borran las evidencias locales de M1–M4.
- Se añaden pruebas de API con proveedor simulado y regresión ES/EN del formulario.

Identificación reproducible: fingerprint de fuente `1903359f626f39e9bd40c8b299d0a711f05c614bcb4bf8da3188acf661dca1b9`, build local `EfJziYhp6h_HxUhZxzZpV`. `artifacts/release-candidate/2026-10-11/validation/candidate-manifest.json` registra 190 archivos y la retirada histórica del test 3D; hashes individuales incluyen documentación y assets. El fingerprint de fuente excluye Markdown/documentación para evitar una referencia circular. Cualquier cambio de código posterior obliga a regenerar y validar la candidata.

Consolidación:

- Rama e historial conservados; índice Git sin archivos staged. Se revisan diff y archivos nuevos de las fases aceptadas. La retirada histórica de `creative-room.spec.ts` corresponde al hero 3D sustituido en M1, no a eliminar tests para mejorar Lighthouse. Los componentes 3D del avatar y sus dependencias siguen disponibles.
- Los tres WebP nuevos de proyectos, módulos CSS, tests y documentación son material de las fases aceptadas. `scripts/measure-m15.ps1` es el harness reproducible existente.
- Las evidencias ocupaban aproximadamente 531 MB al inicio. Se conservan localmente, fuera del commit y de la subida CLI. Los documentos contienen sus rutas; para compartirlas fuera de este equipo habrá que preparar un archivo separado, con autorización.
- Scan por patrones de claves privadas/tokens y claves Web3Forms pobladas sobre candidatos a Git: sin hallazgos. No hay `.env` real local ni archivos de secretos staged. El scan no es un detector exhaustivo ni un pentest.
- `.env.example` solo contiene un placeholder; la documentación de variables queda en este informe. No se consultan ni imprimen valores de Vercel.

Propuesta convencional, **no ejecutada**: `feat(portfolio): deliver premium bilingual portfolio` para la entrega acumulada M1–M4. Si se separa en commits, revisar manualmente los hunks compartidos de estilos, contacto y package/lock: `fix(contact): align timeouts and prevent duplicate submissions` y `chore(release): prepare candidate validation and staging checklist`. No usar `git add .`; seleccionar archivos explícitos, revisar `git diff --cached --check` y el diff completo antes de autorizar commit/push.

## 2. Bloqueos funcionales

Los defectos locales de timeout, doble submit simultáneo y reintento sin revalidación están corregidos. Queda un gate operativo: comprobar la clave y entrega de Web3Forms en la preview y en producción. La presencia de una variable no acredita que su clave sea válida ni que llegue el correo.

Auditoría del flujo:

| Área | Estado |
| --- | --- |
| Access key | Solo servidor, `WEB3FORMS_ACCESS_KEY`, fallback legacy `CONTACT_WEB3FORMS_KEY`; sin `NEXT_PUBLIC_*`, sin logs de clave |
| Vercel | Nombre de variable confirmado en production, development y preview restringida a `main`; valor no solicitado |
| Validación | Nombre 2–120, email hasta 254, mensaje 20–4000; servidor vuelve a validar |
| Loading | Feedback inmediato, `aria-busy`, submit deshabilitado y ref de exclusión |
| Éxito | Mensaje localizado, limpieza de campos y borrador |
| Error/red | Mensaje localizado, foco en estado, fallback mailto, borrador conservado y restaurado tras recarga |
| Reintento | Validación del formulario completa; 4xx del proveedor sin retry, errores de red/5xx hasta dos intentos |
| Spam | Honeypot, time trap de 2,5 s y rate limit de 5 solicitudes/10 min por IP/instancia |
| Accesibilidad | Labels, errores asociados, estados live, foco y contraste conservados |
| Sin JS | Formulario JSON oculto mediante noscript; email directo localizado disponible |

No se realiza una petición válida al proveedor real. Las pruebas de éxito/error usan mocks; las peticiones reales a la API local se limitan a payload inválido. Los tests de servidor ejecutan la ruta real en sandbox con fetch simulado.

## 3. Resultados de rendimiento

Baseline M4: móvil 84 / LCP 3,428 s; desktop 100 / LCP 0,727 s; Accessibility 100 / CLS 0. La serie RC previa usa la build M4 existente; la serie final usa la build de la candidata. Harness sin cambios: Lighthouse 12.8.2, producción local 3100, tres ejecuciones móviles y tres desktop por serie, secuenciales y sin E2E concurrente. La CPU del equipo no está aislada: se publican todos los benchmarks y resultados, sin retirar runs.

| Serie | Perfil | Run | Performance | LCP ms | TBT ms | CPU benchmark |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| before | mobile | 1 | 92 | 3327.096 | 38.500 | 3675.5 |
| before | mobile | 2 | 91 | 3338.821 | 125.893 | 3629 |
| before | mobile | 3 | 92 | 3334.926 | 21.000 | 3436 |
| before | desktop | 1 | 100 | 705.808 | 0.000 | 3549.5 |
| before | desktop | 2 | 100 | 698.012 | 0.000 | 3517 |
| before | desktop | 3 | 100 | 697.528 | 0.000 | 3750 |
| after | mobile | 1 | 73 | 3381.172 | 754.138 | 1737.5 |
| after | mobile | 2 | 92 | 3369.119 | 43.609 | 3446.5 |
| after | mobile | 3 | 90 | 3389.500 | 125.375 | 3415.5 |
| after | desktop | 1 | 100 | 696.072 | 0.000 | 3300.5 |
| after | desktop | 2 | 100 | 705.469 | 0.000 | 3414 |
| after | desktop | 3 | 100 | 717.102 | 0.000 | 3259.5 |

| Mediana | RC antes | RC final |
| --- | ---: | ---: |
| mobile Performance | 92 | 90 |
| mobile LCP ms | 3334.926 | 3381.172 |
| mobile TBT ms | 38.500 | 125.375 |
| desktop Performance | 100 | 100 |
| desktop LCP ms | 698.012 | 705.469 |
| desktop TBT ms | 0.000 | 0.000 |

Accessibility 100, Best Practices 100, SEO 100 y CLS 0 en las doce ejecuciones. Performance final móvil 90 cumple el objetivo de laboratorio en esta serie, pero LCP 3,381 s no cumple 2,5 s. La primera ejecución final da 73 / TBT 754 ms y CPU benchmark 1737,5; se conserva. Las siguientes dan 92 y 90. La serie previa ya obtenía 92 de mediana sin los cambios RC: no se atribuye 84→90 a optimización ni se considera una mejora reproducible. LCP previo 3,335 s frente a 3,381 s final (+46 ms, ~1,4%) no acredita una mejora.


Diagnóstico y límite de la investigación:

- `p[data-hero-copy]` está en SSR, visible y sin transform/opacidad animados. La timeline excluye explícitamente ese párrafo; no espera a su secuencia. Las pruebas del hero y el funcionamiento sin JavaScript verifican este contrato.
- Space Grotesk, Inter e IBM Plex Mono son locales, latin y precargadas; `display: swap`. Las fuentes Geist legacy no se precargan. No hay una imagen LCP que optimizar ni descubrimiento tardío de una imagen del hero.
- La traza M4 tiene Layout de 121 ms sobre 831 objetos y estilo de 49 ms. No identifica el coste de ese layout como propiedad exclusiva del párrafo ni demuestra que GSAP lo cause.
- La serie RC vuelve a registrar subpartes de LCP, recursos bloqueantes, fuentes, main thread y eventos de layout en `performance/diagnosis.json`. Las subpartes observadas no equivalen al LCP simulado de Lighthouse.
- No se aplican cambios especulativos de tipografía, alturas, visibilidad, SSR o arquitectura. Las únicas modificaciones de producto de esta fase son correcciones del contacto y retirar un paquete sin uso; no se presentan como optimizaciones del LCP.
- Control de hidratación: tres pares con JavaScript activo/desactivado, CPU ×4 y sin throttling de red (diagnóstico, no Lighthouse). Medianas de Layout acumulado 151/148 ms y ScriptDuration 235/0 ms; el coste de scripts es verificable, pero esos totales no demuestran qué ocurre antes del LCP. El dominio CDP no devolvió eventos LCP en ese control; no se usan como medición LCP ni como evidencia para eliminar JS. Se conserva la copia visible en ambos modos.
- Se acota la investigación a las dos series comparables y al diagnóstico de hidratación documentado. No se afirma que 2,5 s sea imposible ni que la variación del score proceda del código. LCP móvil permanece como incidencia abierta; hacen falta mediciones en hosting y RUM para valorar p75 real.

## 4. Validaciones ejecutadas

| Validación RC | Resultado ejecutado |
| --- | --- |
| pnpm install --frozen-lockfile --offline | PASS, lockfile consistente |
| pnpm lint / typecheck / build | PASS |
| pnpm test | 51 PASS, 0 FAIL |
| E2E build final | 74 PASS / 18 SKIP previstos / 0 FAIL |
| Formulario cross-browser | 6 recorridos ES/EN mock + 6 sin JS, Chrome 154 / Firefox 153 / WebKit 26.5 |
| Dependencias | pnpm audit: 0 avisos conocidos |
| SEO local | 16 rutas 200, canonical/hreflang/heading/metadata/JSON-LD, sitemap 16, 2 OG PNG ES/EN |
| Validación HTTP API | Payload inválido 400 sin proveedor |
| Responsive / teclado / movimiento reducido | Tests E2E final, incluidas seis capturas completas 1440/768/390 ES/EN |
| Lighthouse | 12 runs completos, dos series de 3 por perfil |
| Integración real Web3Forms / preview RC | NOT RUN: requiere autorización |

Las 18 omisiones pertenecen a matrices explícitas de captura/axe/M3 y escenarios exclusivos de un perfil; no se retiran tests por fallos. El contrato previo de 15 s falló inicialmente al alinear el timeout: se actualizó al límite compartido y se añadió prueba funcional de presupuesto mayor que los intentos reales. El log inicial se conserva. El script HTTP inicial contaba también hreflang de navegación; se corrigió el selector para contar solo links alternate. El primer diagnóstico con callbacks de página no funcionó sin JS: se detuvo y se sustituyó por métricas CDP, sin afirmar un LCP del control.

URLs públicas comprobadas en la producción anterior: dominio www/apex (HTTPS válido), home ES/EN, CV PDF, sitemap, robots y OG, todos 200; Distrito y Aitana 200. raw.vives falló tres intentos CLI, pero Chrome abrió https://rawvives.aleviclop.dev/es con 200 y título raw.vives; se conserva URL y la evidencia de ambos transportes. GitHub AVL05 200; LinkedIn 999 automatizado y revisión manual pendiente. No se inventan demos para AI Creative Assistant ni LumaFlow si no existe demo pública verificada. Proyectos, CV, experiencia, GitHub/LinkedIn y contacto conservan sus enlaces directos en hero/navegación/escenas.

Capturas RC completas: `artifacts/release-candidate/2026-10-11/screenshots/{desktop,tablet,mobile}-{es,en}-full.png`. También se conservan hero, menús y JSON de los recorridos. No se generó una nueva grabación RC; las grabaciones M4 siguen disponibles.


Evidencias locales: `artifacts/release-candidate/2026-10-11/validation/` y `performance/{before,after}/`. Incluyen logs, reportes JSON/HTML, devtools logs, trazas gzip completas, auditoría de dependencias, inventario de repositorio sin valores secretos y consulta de hosting filtrada. Las 72 auditorías axe y capturas desktop/tablet/móvil ES/EN de M4 siguen en `artifacts/visual-review/m4/2026-10-11/`; no se presentan como nuevas ejecuciones RC.

## 5. Pruebas manuales pendientes

| Entorno | Checklist | Estado |
| --- | --- | --- |
| Chrome escritorio interactivo | Primera impresión, scroll, proyectos/casos, CV, contacto, ES/EN, Tab/Shift+Tab/Enter/Escape | Pendiente de usuario; Chrome instalado sí se prueba automatizado/headless |
| Firefox interactivo | Mismo recorrido, errores y foco | Pendiente; motor Firefox automatizado disponible |
| Safari real macOS/iOS | Lectura, menú, scroll, teclado con preferencia de enlaces, CV, contacto | NOT RUN; WebKit Playwright en Windows no equivale a Safari |
| Android físico | Chrome, menú táctil, rotación, CTAs, PDF, formulario y teclado virtual | NOT RUN; emulación no sustituye dispositivo |
| iPhone físico | Safari, safe areas, teclado, scroll, PDF y formulario | NOT RUN |
| Movimiento reducido del SO | Sin reveals que oculten contenido, lectura y navegación completas | Automatizado comprobado; comprobación del SO pendiente |
| Lector de pantalla | Landmarks, títulos, labels, errores y anuncio de éxito | NOT RUN |
| Entrega real ES/EN | Un envío autorizado por idioma, respuesta y recepción/inbox/spam | NOT RUN; requiere preview y autorización de correo |
| LinkedIn | Abrir el perfil con navegador interactivo | Pendiente: HTTP 999 del cliente automatizado |

No se dispone de dispositivos físicos ni de Safari real en este entorno. No se afirma cobertura física por pruebas de Playwright.

## 6. Riesgos conocidos

- LCP móvil fuera de presupuesto. La claridad, SEO, Accessibility y CLS están conservados; la aceptación explícita de este presupuesto pendiente es una condición de lanzamiento.
- Un timeout de red puede ser ambiguo: el proveedor podría haber aceptado el mensaje antes de perderse la respuesta. La ref evita duplicados concurrentes en una pestaña, pero el proveedor no aporta idempotencia verificable en esta integración. No se promete exactly-once entre pestañas o retries tras timeout.
- Rate limiter en memoria por instancia; no es un contador distribuido y no constituye protección fuerte contra bots. No se añade infraestructura para este portfolio.
- Borrador de nombre/email/mensaje en localStorage hasta éxito o vaciado; tenerlo en cuenta en dispositivos compartidos. No contiene claves.
- Hosting incorpora Analytics y Speed Insights cuando `VERCEL=1`; las mediciones locales no ejecutan esos componentes. Validar su coste y ausencia de errores en staging.
- Variables legacy `RESEND_API_KEY` y `CONTACT_TO_EMAIL` aparecen en Vercel production, pero la API actual no las utiliza. No se eliminan ni leen valores; revisar su necesidad separadamente.
- El rollback a la versión pública anterior también puede recuperar dependencias anteriores a los parches M4. Es una recuperación temporal, seguida de corrección hacia delante.
- La producción actual sigue siendo una versión anterior a esta candidata local. Sus respuestas HTTP no acreditan un despliegue RC.

## 7. Procedimiento de staging

**Preparado, no ejecutado. Requiere autorización expresa para subir código a Vercel.**

Hosting verificado mediante consulta read-only: proyecto `portfolio`, framework Next.js, Node 22.x; dominios `www.aleviclop.dev` y `aleviclop.dev`. La consulta registra una última deployment production READY `dpl_2MK1y9zhdqNy8NUXTRWT4DjdwyQH`. No se usa su URL como si fuese una preview RC. Preview tiene SSO `all_except_custom_domains`; conservarlo.

1. Confirmar autorización de **preview exclusivamente**. No cambiar DNS, ramas ni alias del dominio público.
2. Confirmar en Vercel que la raíz corresponde a este Portfolio y la asociación usa `portfolio`/equipo correcto. Build `pnpm build`, instalación `pnpm install --frozen-lockfile`, Node 22.x y pnpm 10.34.1 del packageManager. No export estático: contacto requiere runtime Node.
3. Confirmar `WEB3FORMS_ACCESS_KEY` y `NEXT_PUBLIC_SITE_URL` en Preview, rama `main`. Mantener canonical `https://www.aleviclop.dev`; no poner la URL temporal como origen canonical. No descargar ni introducir claves en flags CLI.
4. Desde este checkout validado, publicar con Vercel CLI usando `vercel deploy --target preview`. Confirmar el proyecto antes de subir. No usar `--prod`, `promote`, `alias`, un push a main ni modificar dominios. La CLI debe enviar el árbol local, incluidos nuevos CSS y WebP, y respetar `.vercelignore`.
5. Esperar READY, guardar deployment ID, URL HTTPS única, build log y manifest de la fuente validada. Esa versión tendrá procedencia dirty/local; no atribuirle el SHA HEAD como si contuviese los cambios sin commit.
6. Entrar como propietario o crear un sharable link de ese deployment para revisión autorizada; conservar protección global. No guardar tokens de bypass en Git ni en este informe. [Deploy CLI](https://vercel.com/docs/cli/deploy), [compartir preview](https://vercel.com/docs/deployments/sharing-deployments).
7. Verificar HTTPS, `X-Robots-Tag: noindex` de la preview, canonical, rutas, assets, API, CSP, logs y ES/EN. Vercel documenta noindex automático, pero se exige comprobar el header de esta URL antes de compartirla. [Headers de Vercel](https://vercel.com/docs/headers/response-headers).
8. Ejecutar pruebas de navegador contra esa URL protegida y Lighthouse cuando se tenga acceso. No confundir un login de Vercel con la página auditada. Registrar configuración real de función y timeout permitido ≥30 s.

Prueba real del formulario, **solo tras autorización de correo**:

1. Abrir la preview en navegador, ES; rellenar nombre identificable de QA, email propio y mensaje de más de 20 caracteres con un identificador único y hora. Esperar al menos 2,5 s desde carga.
2. Pulsar Enviar una vez. Verificar loading y bloqueo; esperar resultado. Confirmar POST `/api/contact` → 200 `{ok:true}` sin campos sensibles en URL, consola ni logs.
3. Confirmar recepción en el destinatario configurado, asunto ES, contenido y carpeta spam. Un 200 no basta para aprobar entrega.
4. Repetir en EN si está autorizado; confirmar asunto y mensajes equivalentes.
5. Si hay 503 revisar configuración; 502 revisar proveedor y logs sin secretos; 429 respetar Retry-After. Ante timeout ambiguo comprobar la bandeja antes de repetir para evitar correo duplicado. Verificar que queda el borrador y mailto disponible.
6. Registrar PASS/FAIL con deployment ID y hora; no guardar mensajes personales ni claves en el repositorio.

## 8. Procedimiento de despliegue

**Pendiente de autorización independiente.**

- [ ] Revisar y aceptar diff completo M1–M4 + RC, manifest y exclusiones. Autorizar commit y push por separado si procede.
- [ ] Staging READY, formulario real recibido y checklist manual mínima completada.
- [ ] Aceptar o resolver explícitamente LCP móvil y verificar mediciones de hosting.
- [ ] Confirmar prod `WEB3FORMS_ACCESS_KEY`, canonical y timeout de función; no reutilizar una configuración Preview sin comprobar targets.
- [ ] Guardar deployment activo y SHA de rollback antes de publicar. Confirmar automatización Git: un push a main podría disparar producción; no hacerlo como método de prueba.
- [ ] Ejecutar el mecanismo elegido y autorizado de producción sobre la fuente aprobada. Evitar promover a ciegas una build Preview con variables/analítica distintas; generar una build con el entorno production y validar antes de asignar dominios cuando el flujo lo permita.
- [ ] Verificar build/READY y asociación actual de `www.aleviclop.dev`; no modificar DNS ni cambiar canonical.
- [ ] Post-deploy: `/`, `/en`, índices/casos, about/contact, CV 200 application/pdf, 16 URLs en sitemap, robots, canonical/hreflang, OG ES/EN PNG, HTTPS y ausencia de noindex accidental en páginas indexables.
- [ ] Verificar menú, teclado, movimiento reducido, errores consola, ES/EN, demos y enlaces. Ejecutar formulario real solo con autorización.
- [ ] Ejecutar tres Lighthouse por perfil sobre producción sin tráfico de pruebas paralelo; seguir Speed Insights/RUM una vez existan datos suficientes. No convertir laboratorio en p75 real.
- [ ] Guardar fecha, SHA, deployment ID y evidencias del smoke; cerrar o mantener incidencias con datos.

## 9. Procedimiento de rollback

1. Antes de publicar, verificar cuál deployment sirve el dominio en ese momento y anotarla. La última production READY observada es `dpl_2MK1y9zhdqNy8NUXTRWT4DjdwyQH`; confirmarla nuevamente, no asumir que seguirá activa.
2. Ante defecto grave de contacto, rutas o lectura, usar Instant Rollback de Vercel o `vercel rollback <deployment-verificado>` con autorización del operador. No hacer reset/force-push ni tocar DNS. [Rollback CLI](https://vercel.com/docs/cli/rollback).
3. Comprobar dominios/HTTPS, home ES/EN, CV, rutas y contacto de la versión recuperada. El rollback no modifica automáticamente variables ni credenciales del proyecto: revisar compatibilidad del formulario antiguo.
4. Conservar candidata y logs, abrir incidencia y corregir hacia delante. No borrar historial ni revertir cambios locales ajenos. Resolver de nuevo los parches de seguridad que el rollback pueda haber recuperado.

## 10. Decisión recomendada

**CONDITIONAL GO.** La candidata local es apta para una preview autorizada; no se declara publicación aprobada. Gates: preview HTTPS verificable, recepción real autorizada de Web3Forms, comprobación manual de reclutador/dispositivo disponible y aceptación explícita del LCP móvil pendiente. Sin esos gates no se recomienda lanzar.

No se ha hecho commit, push, despliegue, envío real de correo ni cambio de DNS. No se presentan la producción anterior, WebKit emulado o tests mock como una validación real de la candidata en hosting.
