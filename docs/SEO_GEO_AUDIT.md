# Auditoría SEO técnico, GEO e indexación

Fecha: 2026-11-02. Alcance: repositorio Portfolio y host público `www.aleviclop.dev`.
Las correcciones de este informe están aplicadas localmente; no se ha desplegado,
modificado DNS, Search Console ni configuración remota de Vercel.

## Diagnóstico previo y evidencia

La rama auditada es `main`, inicialmente limpia, en
`ecf5c4a7912b1aabc766d99866b4081387a306d0`, coincidente con GitHub.
La comprobación HTTP pública quedó registrada a las 13:07:59 UTC en
`artifacts/seo-production-2026-11-02.json` (evidencia local ignorada por Git).

| Estado | Hallazgo previo | Causa / evidencia |
| --- | --- | --- |
| Confirmado | Las ocho páginas indexables responden 200, con canonical propio, hreflang recíproco, un H1 y títulos/descripciones únicos | Lectura HTTP del HTML publicado; mapa `lib/i18n-paths.ts`, `lib/seo.ts` |
| Confirmado | Sitemap 200 con ocho URL, cuatro ES y cuatro EN, bajo `https://www.aleviclop.dev` | `app/sitemap.ts` y respuesta pública `/sitemap.xml` |
| Confirmado | Legal ES/EN responde 200 con `noindex, nofollow` y no pertenece al sitemap | Metadata de las rutas legales y HTML público |
| Confirmado | `/contacto`, `/en/contact` y antiguos índices responden 404 pese a tener secciones equivalentes | HTTP e historial anterior a `86372a9`; rutas eliminadas y secciones actuales en la home |
| Confirmado | `ProfilePage` aparece también en casos de estudio y páginas legales | Se inyectaba desde ambos layouts raíz, no desde la home |
| Confirmado | El título Open Graph de `/en` está en español | `buildPageMetadata` utilizaba `SITE_TITLE` como fallback para ambos idiomas |
| Confirmado | `aleviclop.vercel.app` responde 200 con contenido duplicado y canonical a www | HTTP público y dominios asociados al proyecto Vercel |
| Confirmado | El dominio apex redirige a www mediante 307 | HTTP `https://aleviclop.dev/contacto`; configuración remota de dominio sin código permanente explícito |
| Confirmado | El despliegue asociado a www está por detrás de GitHub | Alias Vercel → `dpl_HHLzYQBpUu1rZvYaGbQSrZ1WtzA5`; metadata Git → `937c39a2878144f2e077c3e9e77b25b8b6b22ddf` |
| Confirmado | El repositorio desactiva los despliegues Git de `main`; Actions valida pero no publica | `vercel.json`: `git.deploymentEnabled.main=false`; `.github/workflows/ci.yml` sin paso de deploy |
| Pendiente | Mecanismo efectivo que publicó o promovió el deployment activo | Vercel informa `source=git`, `target=production`, `READY`. Esto identifica el origen del código, no demuestra que se publicase automáticamente: también puede proceder de una republicación o promoción manual |
| Pendiente | Valor literal de `NEXT_PUBLIC_SITE_URL` en Production | La API confirma la variable, pero su tipo `sensitive` oculta el valor. El HTML público sí confirma el origen efectivo correcto |
| Probable, no demostrado | Las URL retiradas sin sustitución y el host duplicado pueden contribuir a avisos de Search Console | No hay exportación de GSC, inspección de URL ni logs de Googlebot que permitan atribuir los motivos exactos |
| Pendiente | URL concretas rastreadas sin indexar o canonical elegida por Google | Requiere inspección de GSC; HTTP 200 y canonical declarado no garantizan indexación |

La propiedad de dominio de Search Console puede incluir otros subdominios.
Este informe no atribuye sus incidencias al Portfolio. Un estado «Página con
redirección» es normal en una URL migrada; un 404 real sin sustituto también lo es.

## Correcciones locales

### Rutas retiradas

Redirecciones 308 exactas, basadas en el historial y en contenido actual equivalente:

| ES | EN | Sustituto ES / EN | Equivalencia |
| --- | --- | --- | --- |
| `/contacto` | `/en/contact` | `/#contact` / `/en#contact` | Contacto profesional, formulario y email |
| `/proyectos` | `/en/projects` | `/#projects` / `/en#projects` | Selección de proyectos y acceso a los casos |
| `/sobre-mi` | `/en/about` | `/#experience` / `/en#experience` | Perfil profesional, experiencia, formación y CV |
| `/fotografia` | `/en/photography` | `/#photography` / `/en#photography` | Práctica fotográfica, archivo y acceso a raw.vives |

El fragmento ayuda a situar al visitante: no crea una nueva página indexable.
El destino indexable sigue siendo la home de cada idioma. No se redirigen rutas
desconocidas ni se aplica un comodín hacia la home. Se conservan las redirecciones
existentes de `/es`, sus rutas reales y `/proyectos/raw-manager`.

La regla de host se limita exactamente a `aleviclop.vercel.app`. Conserva el path
y resuelve las rutas históricas directamente hacia su destino final en www para
evitar un salto adicional. No captura otros hosts `*.vercel.app`, localhost ni
otros subdominios del usuario. El apex se deja sin cambios remotos.

### Dominio y metadatos

- `lib/seo.ts` fuerza www cuando `VERCEL_ENV=production`. En preview/desarrollo
  sigue admitiendo `NEXT_PUBLIC_SITE_URL`. El valor se normaliza como origen URL,
  evitando barras dobles o paths accidentales en sitemap, metadata y JSON-LD.
- CI fija explícitamente el origen canónico público durante el build.
- El fallback del título social utiliza el idioma de la página.
- `robots.txt` sigue permitiendo rastrear el sitio y las páginas legales; bloquea
  `/api/contact`, pero permite `/api/og`, necesario para rastrear la imagen social
  generada. No se usa robots para esconder páginas con `noindex`.
- No se inventan `lastmod`, páginas de aterrizaje ni contenido para buscadores.

### Datos estructurados y GEO

- `Person` y `WebSite` conservan sus entidades compartidas. El rol se localiza
  también al inglés. Se retira de `Person.image` la tarjeta tipográfica Open Graph,
  que no es un retrato de Alex.
- `ProfilePage` se renderiza únicamente en las dos homes, enlazado a la entidad
  `Person`; no se hereda en legal ni en casos.
- Los autores de los seis casos enlazan al mismo `@id` de Alex.
- `BreadcrumbList` conserva dos niveles reales: home y caso, sin inventar un
  índice de proyectos que vuelva a responder 200.
- `WebApplication` se mantiene para Distrito Gourmet y LumaFlow: el contenido
  actual describe una aplicación React/Laravel y, en LumaFlow, una PWA. No hay
  base para reclasificarlo como aplicación de escritorio. raw.vives conserva
  `CreativeWork`, con URL del proyecto y repositorio verificables.
- Se preservan nombres, experiencia, formación, tecnologías y resultados
  publicados. No se añaden reseñas, valoraciones ni métricas.

GEO se aborda con contenido accesible en HTML, entidades coherentes y enlaces
verificables. No se añaden `llms.txt` ni marcado especial sin necesidad demostrada,
ni se promete presencia en asistentes o funciones de IA.

## Automatización y validación

`tests/seo-i18n.test.mjs` cubre el origen en producción/preview/desarrollo, títulos
sociales localizados, alcance de ProfilePage y configuración de redirecciones.
Los cuatro tests nuevos fallaron antes de las correcciones y pasaron después.

`tests/e2e/seo.spec.ts` comprueba las ocho páginas sin ejecutar JavaScript:
HTTP, canonical única, hreflang, robots, H1, descripción, títulos sociales,
imágenes disponibles, JSON-LD parseable, entidades, breadcrumbs, sitemap XML,
redirecciones y destinos/anclas, 404 reales y ausencia de hosts preview en el SEO.
La simulación de Host solo se realiza contra el servidor local.

`pnpm test:seo` permite ejecutar estas comprobaciones de forma aislada.
`pnpm test:e2e` las incluye automáticamente en GitHub Actions, junto con todas
las pruebas existentes. El test anterior que exigía 404 para rutas retiradas se
actualiza para seguir comprobando rutas realmente inexistentes.

Resultados locales medidos con Node 22.22.2 y pnpm 10.34.1:

| Comprobación | Resultado |
| --- | --- |
| `pnpm lint` | PASS |
| `pnpm typecheck` | PASS |
| `pnpm test` | PASS, 59 tests |
| `pnpm build` | PASS |
| `CI=1 pnpm test:seo --retries=0 --reporter=line` | PASS, 24 tests en desktop y móvil |
| `CI=1 pnpm test:e2e --retries=0 --reporter=line` | PASS, 142 tests; 18 omitidos por condiciones de auditorías opcionales; cero fallos |
| HTTP público antes de corregir | Ocho URL indexables 200, canonical/hreflang coherentes; incidencias descritas arriba |
| Rich Results Test / Schema Markup Validator | NOT RUN; revisión externa pendiente |
| Search Console / recepción de correo / dispositivos físicos | NOT RUN |
| Publicación de la candidata / workflow remoto del nuevo cambio | NOT RUN |

Los 18 omitidos son matrices/capturas que requieren variables de evidencia
explícitas, auditoría externa con axe, navegador instalado o un perfil concreto.
No se cuentan como superados. Las 24 comprobaciones SEO nuevas sí se ejecutaron
en ambos perfiles, 1440 × 900 y 390 × 844. No se añaden dependencias y se conserva
el lockfile.

## Checklist de revisión y despliegue posterior

1. Revisar el diff local, el mapa de equivalencias y las pruebas; aprobar un SHA
   concreto para publicación. Esta auditoría no autoriza commit, push ni deploy.
2. Confirmar el flujo deseado de releases. Mantener `git.deploymentEnabled.main=false`
   si se quieren publicaciones explícitas. Revisar en Vercel el origen y la
   promoción del deployment activo; no activar automatismos por accidente.
3. Confirmar `NEXT_PUBLIC_SITE_URL=https://www.aleviclop.dev` en Production desde
   Vercel sin divulgar claves. Revisar aparte protección/noindex de previews.
4. Revisar con autorización si el apex debe utilizar una redirección permanente
   301/308 a www. Evitar encadenar cambios de protocolo/host/path. No modificar DNS
   ni otros subdominios como parte de este ajuste.
5. Publicar únicamente tras aprobación. Confirmar que el alias www apunta al
   deployment aprobado y que su metadata Git coincide con el SHA previsto.
6. Comprobar públicamente las ocho URL, robots, sitemap, imágenes Open Graph,
   redirecciones históricas, alias `aleviclop.vercel.app`, legales y 404 reales.
   Confirmar que no aparece un `X-Robots-Tag: noindex` accidental en producción.
7. Validar home y casos representativos con Rich Results Test / Schema Markup
   Validator. JSON válido no equivale a elegibilidad para resultados enriquecidos.
8. En GSC filtrar exactamente por `https://www.aleviclop.dev/`, separando apex y
   otros subdominios. Comparar ejemplos y fechas de rastreo con el deployment.
9. Inspeccionar `/`, `/en` y un caso por idioma: HTTP, canonical declarada/elegida
   por Google, recursos y captura renderizada. Solicitar indexación solo de los
   destinos canónicos; remitir `https://www.aleviclop.dev/sitemap.xml` si procede.
10. Inspeccionar `/contacto` y `/en/contact`: esperar redirección a las homes con
    contacto. No solicitar indexación de esas redirecciones ni de fragmentos.
    Mantener excluidas las legales y aceptar los 404 sin equivalente.
11. Tras nuevos rastreos, revisar si cambian duplicados, redirecciones y páginas
    rastreadas sin indexar. No hay plazo ni garantía de indexación; no marcar un
    problema como resuelto únicamente porque el test local pasa.

## Fuentes

- [Next.js: redirects](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects), contrastado con `node_modules/next/dist/docs/` de la versión instalada.
- [Vercel: git.deploymentEnabled](https://vercel.com/docs/project-configuration/git-configuration).
- [Google: migraciones de URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).
- [Google: canonicalización](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- [Google: ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page).
- [Google: funciones de IA y sitios web](https://developers.google.com/search/docs/appearance/ai-features).
