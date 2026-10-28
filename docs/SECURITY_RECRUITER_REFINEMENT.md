# Seguridad y presentación profesional — 2026-10-28

## Implementado localmente

- Next.js 16.3.8 → 16.4.1, con lockfile actualizado y sin dependencias nuevas.
- Contacto: solo JSON, comprobación de Origin/Fetch Metadata cuando existen,
  límite de 32 KiB sobre los bytes leídos y rechazo seguro de cuerpos inválidos.
  El limitador se ejecuta antes de interpretar el JSON.
- El contador conserva cinco intentos por diez minutos, elimina clientes
  caducados periódicamente y admite como máximo 1000 claves por instancia.
  Al alcanzar capacidad, rechaza clientes nuevos hasta liberar espacio.
- Se conservan validación de campos, honeypot, time trap, clave privada en
  servidor, timeout y reintento del proveedor, email alternativo y borrador.
- CSP: sin base HTML, iframes ni manejadores inline de eventos. El navegador
  deja de tener permiso para conectar con Web3Forms; solo lo hace el servidor.
- CI incorpora `pnpm audit --prod --audit-level=high`. Dependabot queda
  configurado para revisar semanalmente paquetes y GitHub Actions cuando se
  publique la configuración en GitHub.
- Perfil junior explícito en portada ES/EN, metadatos e imagen Open Graph.
  Las contribuciones de Distrito Gourmet y LumaFlow muestran decisiones ya
  documentadas; los tres proyectos enlazan directamente a `#decisions`.
- Se conservan casos, vídeos, capturas, CV, rutas y composición visual.
  No se han añadido experiencia, cifras ni proyectos sin evidencia.

## Límites y siguiente acción en producción

### Firewall: pendiente de configuración y validación

La consulta de configuración activa de Vercel para `portfolio`
(`prj_r85361jICEW8GJ3rDUtz3830HCLr`) devolvió el 404
`Seawall Config not found`. Esto no confirma ausencia de protección DDoS de la
plataforma, ni permite afirmar que exista una regla personalizada de contacto.
No se ha modificado configuración remota.

Regla propuesta, para revisar antes de activarla:

| Campo | Valor |
| --- | --- |
| Proyecto | portfolio |
| Entorno | production |
| Método | POST |
| Ruta exacta | /api/contact |
| Clave | IP obtenida por el firewall |
| Ventana | 600 segundos |
| Observación inicial | 25 peticiones, acción log |
| Objetivo tras observar tráfico legítimo | 5 peticiones, respuesta 429 |

Publicar inicialmente en observación, comprobar solicitudes legítimas y
después aplicar el límite. Las cuentas/regiones y límites disponibles deben
confirmarse en Vercel. El firewall debe complementar al contador local, que
no comparte estado entre instancias ni sobrevive a reinicios. Origin y
Fetch Metadata protegen el flujo del navegador; no autentican bots que
construyen sus propias solicitudes.

### CSP estricta: cambio de arquitectura no aplicado

Se mantiene `script-src 'unsafe-inline'` para los scripts de Next.js.
Según la documentación local de Next.js, un nonce por respuesta requiere
renderizado dinámico. Las páginas actuales conservan generación estática;
no se fuerza un cambio de caché/renderizado para este ajuste.
No se ha demostrado una inyección XSS; la CSP estricta sigue pendiente.

### Fuera de esta intervención

La validación de este informe es local y anterior a la subida a GitHub
autorizada por el usuario. No se ha verificado un despliegue. No se envían mensajes reales al proveedor
de contacto durante las pruebas. No se ha realizado una prueba de intrusión,
revisión del historial de secretos, auditoría de cuentas o medición de Core
Web Vitals en producción. No se generan nuevas grabaciones de proyectos.

## Validación

Se utiliza Node.js 22.22.2 sin cambiar la versión global del equipo.

| Comprobación | Resultado |
| --- | --- |
| `pnpm audit --prod --audit-level=high` | PASS: sin vulnerabilidades conocidas |
| `pnpm lint` | PASS |
| `pnpm typecheck` | PASS |
| Node `node --test --test-reporter=spec` | PASS: 55 tests |
| `pnpm build` | PASS: Next.js 16.4.1, páginas estáticas conservadas |
| Playwright: seguridad, hero, portfolio, contacto, rediseño e i18n | PASS: suite seleccionada de 86 casos, 3 omisiones específicas de viewport |
| Playwright: seguridad y enlaces con clic real, tras ajustar el test | PASS: 8 tests |
| `git diff --check` | PASS |

Las pruebas de navegador utilizan Chromium, escritorio 1440 × 900 y móvil
390 × 844. Incluyen ES/EN, rutas y enlaces, canonical/hreflang, teclado,
movimiento reducido, contenido sin JavaScript, ausencia de desbordamiento,
carga de imágenes y estados del formulario con proveedor simulado.
La revisión visual de portada se realizó también en el navegador de la app.
No se afirma cobertura de Firefox, Safari, lector de pantalla ni dispositivos
físicos.
