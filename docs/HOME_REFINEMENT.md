# Refinamiento de la home — 10 de septiembre de 2026

Implementado exclusivamente en el repositorio. Sin commits, deploy, Blender ni aplicaciones externas. Se conserva Next.js, React, TypeScript estricto, Tailwind, GSAP y React Three Fiber, sin dependencias nuevas ni cambios en assets.

## Secciones y archivos

- `components/hero.tsx`, `components/hero.module.css`: una composición amplia en lugar de tres capítulos sticky. Nombre HTML, rol Desarrollador Full-Stack Junior / Junior Full-Stack Developer, descripción de producto completo de principio a fin, CTA a proyectos y contacto. GitHub, LinkedIn y CV quedan en una línea secundaria. Los cuatro enlaces bajo el visor reutilizan los destinos de los hotspots.
- `components/hero-3d/CreativeRoomHero.tsx`, `creative-room.module.css`, `roomSceneConfig.ts`: navegación a proyectos, fotografía, capacidades y perfil personal. Movimiento de scroll máximo de 5% vertical, escala 96% y opacidad 90%, solo en escritorio sin reducción de movimiento. Se revierte al expandir para conservar el posicionamiento y foco del diálogo. Alex Creative Space se mantiene como escenario visual del hero, no como proyecto profesional principal.
- `components/projects.tsx`: destacados AI Creative Assistant, Distrito Gourmet, LumaFlow Studio y raw.vives (proyecto web y fotográfico). Resumen breve, stack, evidencias y CTA. El archivo mantiene El Fogón, API Hotel, E-commerce y Llibret Falla el Molí en tarjetas compactas con imágenes visibles y destinos originales. Enlace discreto al GitHub real.
- `components/skills.tsx`: cuatro áreas, Frontend / Backend y datos / Herramientas y entrega / IA y experimentación. Contenido centralizado en los locales. Se retiran la duplicación de fotografía y los párrafos repetidos de posicionamiento.
- `components/experience.tsx`: timeline compartida para empleo y formación, fechas separadas y jerarquía institución/rol. Burguet como Desarrollador de Aplicaciones Web en prácticas (feb. 2026 — may. 2026) y Ajuntament de Carlet como Técnico informático en prácticas, alineados con el CV. CTA de CV compacto.
- `components/photography.tsx`: las cinco imágenes existentes en una composición editorial con una protagonista; CTA directo a raw.vives. Conserva la frase sobre código y fotografía. Se elimina el recorrido horizontal fijado y el gesto de deslizar para navegar.
- `components/currently.tsx`, `components/home-client.tsx`: Actualmente antes de contacto. Construyendo AI Creative Assistant / Aprendiendo IA aplicada al desarrollo · agentes / Valencia, editable en los locales.
- `components/contact.tsx`: copy más directo, formulario y enlaces conservados, landmark etiquetado, menos repetición de tecnologías y ubicación; sin resplandor decorativo.
- `components/navigation.tsx`: el enlace a capacidades describe ahora su contenido.
- `lib/locales/es.json`, `lib/locales/en.json`, `lib/language-context.tsx`: resúmenes y evidencias separados del contenido largo; capacidades y Actualmente centralizados; estructura ES/EN validada; tolerancia a almacenamiento bloqueado y fallos de red al guardar idioma.
- `lib/locale-preference.ts`, `lib/request-language.ts`: detección del idioma respetando prioridad y pesos de Accept-Language. Cookie manual antes de detección, ES cuando la preferencia principal es español y EN para el resto. El render inicial mantiene la lengua del servidor.
- `app/layout.tsx`, `lib/seo.ts`, `app/api/og/route.tsx`, `app/sobre-mi/page.tsx`: rol Desarrollador Full-Stack Junior coherente en metadata, JSON-LD, Open Graph y perfil. Ajuste del tamaño del subtítulo OG. La perspectiva personal retirada de la hero vive en Sobre mí, destino de la ventana.
- `app/globals.css`: se retiran estilos obsoletos de los antiguos recorridos y preview flotante.
- `README.md`, `PRODUCT.md`, `DESIGN.md`, `docs/HERO_3D.md`: dirección y comportamiento actualizados.

## Componentes y contenido

Nuevo componente exportado: `Currently`. Nuevo componente interno reutilizable: `Timeline`.

Retirados los componentes internos `ArchivePreviewContent` y `ArchiveLink`, sus estados, gestos, seguimiento del cursor y animaciones. Ningún archivo de componente eliminado.

Texto explicativo visible de los cuatro proyectos: ES 201 → 51 palabras; EN 194 → 49. Comparación de descripción, responsabilidad y resultado anteriores con resumen y evidencias actuales; no incluye títulos, stacks o CTA. Los textos completos permanecen en el catálogo para las vistas de detalle.

Las cifras 56 tests backend / 33 frontend y más de 100 páginas proceden del contenido previo. No se presenta esta fase como una nueva auditoría de esos proyectos externos. Las demás evidencias son capacidades existentes, sin resultados numéricos inventados.

## 3D, accesibilidad y rendimiento

Se conserva el plano de monitor, su captura real de `/proyectos` a 1024×576 y emisión 0,12. La textura sigue siendo sustituible mediante `monitorScreenConfig.texture`, sin tocar el GLB. La captura está en español, igual que antes.

Se mantienen un Canvas, render bajo demanda, carga diferida, DPR 1 en móvil y máximo 1,5 en escritorio, modelos compactos en móvil, sombras desactivadas en móvil, fallback, navegación con teclado y cierre/restauración de foco. No se añade postprocesado ni animación continua.

Se retira la prioridad de carga de la primera imagen de proyectos para reservar esa prioridad a la portada. Se eliminan el observer de capítulos, previews duplicados del archivo, parallax continuo de proyectos y pinning de fotografía y animación de líneas de experiencia. Las nuevas animaciones responden a cambios de prefers-reduced-motion y limpian sus contextos.

La hero pasa a una columna por debajo de 1024px; primero copy y CTA. Archivo de una a tres columnas, capacidades apiladas en pantallas pequeñas y fotografía de dos a cuatro columnas con protagonista a ancho completo en tablet/móvil. No hay cambios de fuentes.

## Validación

- PASS: `pnpm lint`, sin errores ni avisos.
- PASS: `pnpm typecheck`.
- PASS: `pnpm test`, 27 tests.
- PASS: `pnpm build`, 16 páginas generadas.
- PASS: `git diff --check`.
- PASS: datos de experiencia y formación idénticos al estado inicial en ambos idiomas.
- PASS: ningún cambio en `public/`, `package.json` ni `pnpm-lock.yaml`.

Actualizados `tests/hero-3d.test.mjs`, `tests/localization.test.mjs`, `tests/ui-quality.test.mjs` y los dos archivos E2E. Añadido `tests/home-refinement.test.mjs` con selección real de locale, datos y jerarquía de la home.

E2E y revisión visual: NO EJECUTADOS para respetar la restricción de no abrir aplicaciones. La validación de código no acredita Core Web Vitals, contraste renderizado ni ausencia de errores de consola en navegador.

## Revisión visual pendiente

Comprobar ES/EN en 1920×1080, 1440px, 1366px, 1536px, tablet y móvil. Revisar encuadre de la escena, encaje de la pantalla, etiquetas de hotspots, ausencia de solapamientos, composición/crop fotográfico, contraste y Open Graph. Recorrer teclado y modo expandido, cambiar reduced-motion y comprobar fallback WebGL. Medir CWV/GPU en dispositivos reales antes de publicar; los GLB conservan su presupuesto previo cercano a 9,85 MB.
