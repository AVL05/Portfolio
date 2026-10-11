# ALEVICLOP 2.0 — Staging HTTPS

2026-10-11. **Preview READY; producto CONDITIONAL GO.** Solo staging autorizado.

## Deployment

- URL: https://portfolio-4xmqytr10-aleviclop.vercel.app
- ID: `dpl_4RN2Zb8BWWENRyNSREXDHdgXjimx`.
- Proyecto: `aleviclop/portfolio`, `prj_r85361jICEW8GJ3rDUtz3830HCLr`.
- `vercel inspect`: target **preview**, READY. La API representa Preview con target null; sus claims indican environment preview. No es un deployment Production.
- Metadata fingerprint: `1903359f626f39e9bd40c8b299d0a711f05c614bcb4bf8da3188acf661dca1b9`; gitDirty=1. El SHA HEAD es contexto Git, no contiene por sí solo la candidata local.

## Preflight y procedimiento corregido

Sesión y proyecto inspeccionados antes de actuar: equipo aleviclop, Next.js, Node 22.x, pnpm build e instalación frozen-lockfile. Mapping existente reutilizado. Manifest: 190 entradas, cero diferencias. No cambios de aplicación.

Producción READY existente. La configuración Git declara productionBranch master; rama local main. Se registra esta discrepancia sin modificar configuración. Dominios sin rama Preview ni custom environment; autenticación all_except_custom_domains. Preview CLI anterior de main sin aliases.

El procedimiento anterior --target preview --skip-domain fue rechazado: skip-domain solo admite producción. La nueva autorización elimina ese flag. Comando ejecutado:

```powershell
vercel deploy --target=preview --project prj_r85361jICEW8GJ3rDUtz3830HCLr --scope aleviclop --non-interactive --no-wait --format json --meta rcSourceFingerprint=1903359f626f39e9bd40c8b299d0a711f05c614bcb4bf8da3188acf661dca1b9
```

## Producción y aliases

Producción antes/después: `dpl_2MK1y9zhdqNy8NUXTRWT4DjdwyQH`, sin cambio. Los cinco aliases permanecen asociados al mismo deployment:

| Alias | Estado |
| --- | --- |
| www.aleviclop.dev | Sin cambio |
| aleviclop.dev | Sin cambio; redirige a www |
| aleviclop.vercel.app | Sin cambio |
| portfolio-aleviclop.vercel.app | Sin cambio |
| portfolio-git-main-aleviclop.vercel.app | Sin cambio |

Preview activa antes: `dpl_5Z6GB4XRK2HteUuwKeaRey3TBU2C`; después: `dpl_4RN2Zb8BWWENRyNSREXDHdgXjimx`. Nueva Preview: aliases vacíos, ninguno creado ni reasignado. La URL única es su hostname. Sin cambios de DNS ni dominios.

## Validación ejecutada

- HTTPS certificado validado: ssl_verify_result=0. Acceso anónimo 302 a Vercel SSO; acceso autorizado mediante vercel curl 200. Autenticación conservada.
- ES/EN: X-Robots-Tag noindex confirmado en respuestas autorizadas, no en pantalla SSO.
- 16 rutas indexables ES/EN HTTP 200; h1, idioma y alternates comprobados en las 15 rutas secundarias; ambas homes y los cuatro proyectos presentes.
- Hero editorial, nombre Alex Vicente y especialidad Junior Full-Stack presentes. Fingerprint remoto coincide con candidata.
- CV HTTP 200; SHA256 remoto/local idéntico: 995318eaf7fd78c3b1ff5e50c9df7ac1a053b3b582e9212d1723547a157e0199.
- Robots, sitemap y Open Graph ES/EN HTTP 200; sitemap 16 URLs. Noindex y protección impiden indexación de Preview sin cambiar archivos SEO públicos.
- WEB3FORMS_ACCESS_KEY sensible presente en Preview/main. Consulta sin descifrar valores; no prueba validez de proveedor ni recepción.
- git diff --check PASS; HEAD sin cambio 04e13c4a30270454bd423ceb66ea6462f0e776e1.

## Incidencias y pendientes

- Canonical, hreflang y sitemap usan https://aleviclop.dev por NEXT_PUBLIC_SITE_URL existente; se esperaba https://www.aleviclop.dev. Apex redirige a www. La comprobación de canonical esperado falla; no se cambian variables. Corregir con autorización y reconstruir antes de aprobar parity SEO final.
- LCP móvil previo sigue abierto. Lighthouse remoto NOT RUN; no se atribuye mejora al hosting.
- Interacciones visuales en navegador de Preview, teclado, dispositivos físicos y correo real NOT RUN en este despliegue. Las pruebas locales previas están en RELEASE_CANDIDATE.md y no constituyen QA remota.
- Abrir Preview requiere sesión Vercel con acceso al equipo. No se desactiva protección ni se distribuyen secretos de bypass.

## Evidencias

artifacts/staging/2026-10-11/: revised-preflight.json, post-deployment.json, deployment-verified.json, route-checks.json, content-checks.json, preview-home.headers/html, preview-en.headers, respuestas de rutas y preview-cv.pdf. Headers guardados sin Set-Cookie.

Referencias: [CLI deploy](https://vercel.com/docs/cli/deploy), [URLs de deployments](https://vercel.com/docs/deployments/generated-urls).

**CONDITIONAL GO** para validación de staging. No producción, correos reales, commit, push, alias, promote, rollback ni modificaciones de DNS.

## Cambio local posterior al despliegue

Por petición del usuario, AI Creative Assistant se elimina del contenido público ES/EN y quedan tres proyectos destacados. La Preview anterior conserva la candidata de cuatro proyectos. Su fingerprint y el manifest RC histórico no validan este nuevo cambio; hace falta validar una nueva candidata antes de otro despliegue. No se actualiza hosting automáticamente.

