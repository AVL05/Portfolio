# Integración de raw.vives en el portfolio

## Arquitectura

`raw.vives` se mantiene como producto independiente en `gallery.aleviclop.dev`. El portfolio no carga su aplicación ni la incrusta: presenta datos verificados, capturas optimizadas y enlaces externos. La tarjeta principal enlaza a `/proyectos/raw-vives`, a producción y al repositorio público.

## Datos utilizados

- 30 fotografías y 3 series editoriales.
- 73 rutas estáticas y 67 tests en el build validado.
- Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP, Three.js, Lenis, Cloudflare Workers y GitHub Actions.
- ES/EN, SEO localizado, reduced motion, archivo, filtros, fichas, fullscreen y navegación contextual.

No se incluyen cifras de tráfico, conversión, usuarios ni feedback porque no existe una medición aportada que las respalde.

## Capturas

Los archivos de `public/projects/raw-vives/` proceden de producción el 21-07-2026. Solo el hero usa prioridad; el resto se carga de forma diferida. Todas las capturas están convertidas a WebP y cada uso tiene texto alternativo localizado.

## SEO y enlaces

El caso tiene canonical propio, Open Graph, Twitter Card y `CreativeWork` JSON-LD. `/proyectos/raw-vives` se añade al sitemap del portfolio. Los canonicals usan `www.aleviclop.dev`, destino final del redirect del dominio desnudo; raw.vives conserva sus URLs canónicas en su dominio.

## Actualización

1. Verificar métricas en tests y salida del build de raw.vives.
2. Actualizar ambos JSON de `lib/locales/` y el copy del caso.
3. Sustituir una captura manteniendo nombre, relación 16:9 y formato WebP; revisar alt y peso.
4. Ejecutar `pnpm typecheck`, `pnpm lint`, `pnpm test` y `pnpm build`.

## Despliegue y rollback

El portfolio se publica desde `main` mediante Vercel después de CI. Para revertir, promover el deployment estable anterior en Vercel o ejecutar `git revert <commit>` y hacer push. raw.vives solo requiere nuevo despliegue cuando cambia su aplicación; esta integración no copia código entre productos.
