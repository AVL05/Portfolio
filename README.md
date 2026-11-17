# Portfolio de Alex Vicente López

Desarrollador Web Full-Stack Junior en Valencia. En este portfolio reúno mi experiencia, mi CV y tres proyectos con código público. La web está en español e inglés. [Portfolio](https://www.aleviclop.dev) · [LinkedIn](https://www.linkedin.com/in/aleviclop/) · [Contacto](mailto:alexviclop@gmail.com)

- **Distrito Gourmet** reúne la carta, los pedidos, las reservas y la gestión de restaurante. [Código](https://github.com/AVL05/distrito-gourmet)
- **LumaFlow Studio** organiza el trabajo de un estudio de fotografía y vídeo, desde los presupuestos hasta las galerías privadas. [Código](https://github.com/AVL05/lumaflow-studio)
- **raw.vives** presenta mi archivo fotográfico bilingüe, con series, filtros y fichas individuales. [Código](https://github.com/AVL05/alexgallery)

## Desarrollo local

Requiere Node.js 22 y pnpm 10.34.1. La web usa Next.js, React y Tailwind CSS.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 3100
```

Abre [la versión local](http://127.0.0.1:3100/). La versión en inglés está en `/en`. Para servir una compilación de producción, ejecuta `pnpm build` y `pnpm start`.

El formulario usa `WEB3FORMS_ACCESS_KEY` desde el servidor. Configúrala en `.env.local` únicamente para probar el envío real. `NEXT_PUBLIC_SITE_URL` permite cambiar el origen canónico y en producción debe ser `https://www.aleviclop.dev`.

## Mantenimiento

- `app/` contiene las rutas, los metadatos y la API de contacto. `components/` contiene las secciones.
- `lib/locales/` contiene los textos. Actualiza el español y el inglés juntos. Las equivalencias de rutas se mantienen en `lib/i18n-paths.ts` y el SEO en `lib/seo.ts`.
- `public/` contiene el CV y las imágenes de portada. Mantén las miniaturas optimizadas y sus textos alternativos en ambos idiomas.
- Los criterios de contenido, diseño y trabajo se documentan en [PRODUCT.md](PRODUCT.md), [DESIGN.md](DESIGN.md) y [AGENTS.md](AGENTS.md).

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

Las pruebas cubren el contacto con envío simulado, el sitemap y el recorrido por los proyectos, el cambio de idioma y la descarga del CV.

## Publicación

GitHub Actions comprueba el código y ejecuta las pruebas. La publicación en Vercel se gestiona de forma explícita. Después de publicar, comprueba el dominio canónico, las páginas públicas de ambos idiomas, el sitemap, una redirección antigua y el formulario. Si una publicación rompe un recorrido principal, se puede volver al despliegue estable anterior en Vercel.

El código, el diseño y los contenidos están sujetos a todos los derechos reservados. [Licencia](LICENSE.md)
