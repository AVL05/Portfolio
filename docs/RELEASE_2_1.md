# ALEVICLOP 2.1 — limpieza y publicación

Fecha: 2026-10-11. Publicación a producción autorizada expresamente por el usuario.

## Alcance

- Retirada del hero 3D antiguo, cursor personalizado y estilos asociados: no estaban montados en la aplicación.
- Retirada de `/avatar-preview`, una página de prueba sin el modelo local requerido; no formaba parte del sitemap ni de la navegación profesional.
- Eliminación de los assets optimizados y texturas de la escena anterior (aproximadamente 12 MB), cuatro dependencias directas de Three/R3F y 54 paquetes instalados.
- Retirada de las cuatro pruebas exclusivas del módulo eliminado y adaptación de los contratos de UI a los componentes actuales. No se eliminan pruebas de funcionalidades vigentes.
- Eliminación de las excepciones CSP para el antiguo loader GLTF en la home y la ruta de prueba.
- README actualizado y conservación de las auditorías históricas. Prototipos y archivos retirados guardados localmente en `artifacts/obsolete/`, fuera de Git y Vercel; los originales 3D locales no se borran ni se publican.

## Publicación

Destino verificado: equipo `aleviclop`, proyecto `portfolio` (`prj_r85361jICEW8GJ3rDUtz3830HCLr`), Next.js, Node 22, raíz `.`.

La publicación se realiza explícitamente con Vercel CLI sobre el commit validado. Se mantiene `git.deploymentEnabled.main: false` para evitar un segundo despliegue por el push. El despliegue inicial usa entorno Production sin asignar dominios; después de comprobarlo se promociona a los dominios existentes. No se modifica DNS.

Rollback anterior registrado: `dpl_2MK1y9zhdqNy8NUXTRWT4DjdwyQH`. Ante un defecto grave, comprobar su disponibilidad y restaurarlo con el mecanismo de rollback de Vercel; no resetear ni forzar Git.

Web3Forms: variable presente en Production; valor no leído ni publicado. Pruebas del formulario con proveedor simulado, sin envío de correos reales.

## Limitaciones

La incidencia de LCP móvil sigue abierta. No se atribuyen las mediciones de M4 a esta versión ni se afirma que la limpieza elimine ese retraso de renderizado. La recepción real del correo y las pruebas en dispositivos físicos requieren comprobación manual.

## Validación previa

- Lint: PASS.
- Build de producción: PASS, 25 páginas generadas.
- Typecheck: PASS tras regenerar los tipos de rutas con la build.
- Node: 47/47 PASS (antes, 51; cuatro pruebas exclusivamente del 3D retiradas).
- E2E en producción local: 74 PASS, 18 SKIP, 0 FAIL; perfiles desktop y móvil Chromium. Las omisiones corresponden a perfiles incompatibles o matrices explícitas no activadas.
- Diff sin errores de whitespace, sin imports Three/R3F restantes y sin hallazgos en el escaneo de patrones comunes de secretos. No es un pentest.

No se han repetido Lighthouse, Firefox, WebKit ni pruebas en dispositivos físicos en esta limpieza.

## Resultado de publicación

- Código publicado: commit `821a26ab4a88408556eec939815144c97f657884`, subido a `origin/main`.
- Deployment: `dpl_AjQkp3d9HHmWo1dKUzT8uGcnKnh7`, estado `READY`, target real `production`; proyecto y SHA verificados mediante la API antes de promocionarlo.
- URL propia del deployment: https://portfolio-gp2rzivg8-aleviclop.vercel.app.
- URL pública: https://www.aleviclop.dev. `aleviclop.dev` redirige correctamente a www.
- Aliases `aleviclop.dev`, `www.aleviclop.dev`, `aleviclop.vercel.app` y `portfolio-aleviclop.vercel.app` apuntan al deployment nuevo. El alias Git histórico `portfolio-git-main-aleviclop.vercel.app` permanece en el deployment anterior; no es la URL pública de esta release.
- Comprobaciones HTTPS: 23 PASS. Las 16 rutas indexables devuelven 200, idioma ES/EN correcto, canonical coherente y sin noindex. Los seis casos contienen `data-project-showcase`; las homes contienen la nueva composición y no incluyen AI Creative Assistant.
- CV: 200 y contenido PDF. Sitemap: 16 URLs. Robots, favicon, imagen del proyecto y Open Graph: 200.
- GitHub Actions: CI del commit de código completado con `success`.
- No se modifica DNS, configuración de dominios ni protección SSO. La promoción actualiza la asignación del deployment a los dominios existentes.
- Evidencia local: `artifacts/release/preflight.json`, `deployment-es.html`, `deployment-en.html`, `public-checks.json`; excluida de Git y Vercel.

**CONDITIONAL GO:** versión publicada con pruebas técnicas aprobadas; continúan pendientes la incidencia de LCP móvil, recepción real del correo y validación en dispositivos físicos. Los commits posteriores de documentación no alteran el código ejecutable de este deployment.
