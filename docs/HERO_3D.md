# Alex Creative Space

## Probar

`pnpm dev`, abrir `/`. Arrastrar para inspeccionar; «Expandir escena» activa el zoom con rueda/pellizco. «Restablecer vista» restaura encuadre; «Minimizar» o Escape cierran el modo focus. El foco vuelve al botón de expansión. Título, descripción y CTA siguen siendo HTML en la hero.

La escena incluye cuatro hotspots HTML accesibles y una pantalla virtual independiente. No utiliza postprocesado.

## Ajustar composición

`components/hero-3d/roomSceneConfig.ts` centraliza cada GLB:

- `position`: centro de la base, en unidades de escena. Y es altura; Z negativo apunta al fondo.
- `rotation`: radianes XYZ; se aplica antes de medir la caja para mantener el apoyo en el suelo o escritorio.
- `size`: dimensión máxima normalizada. Conserva las proporciones originales.
- `scale`: multiplicador uniforme adicional.

El escritorio mide aproximadamente 1,13 unidades de alto. Si cambia su tamaño, ajustar Y de monitor, PC, cámara y objetivo, además de teclado y ratón en `roomPropConfig`.

El ángulo inicial, target, margen y límites están en `roomCameraConfig`. `roomCamera.ts` encuadra las ocho esquinas del volumen de la habitación según la proporción del visor; reset y expansión reutilizan ese cálculo. La ventana ocupa Y 0,85–2,65 y Z -1,35–1,35, con paisaje en X 2,72 y cristal en X 2,47. La imagen usa sRGB, recorte centrado proporcional y material sin tone mapping. No se estira. La iluminación usa ACES y exposure 1,12. Three r186 ya utiliza luces físicas; no existe necesidad de `physicallyCorrectLights`.

`roomHotspots` define posiciones, enlaces y etiquetas ES/EN de monitor, cámara, PC y montaña.

## Assets y rendimiento

Los nombres reales son `Camera.glb`, `Camera Lens.glb`, `Desk.glb`, `Monitor.glb`, `Office Chair.glb`, `PC Tower.glb`, `Potted Plant.glb` y `Shelf.glb`. La textura real es `Meshy_AI_mountain-window-view.png`.

Los once originales de Meshy suman 877.926.412 bytes y contienen aproximadamente 22,3 millones de triángulos. Se conservan localmente en `public/hero-3d/models/`, excluidos de Git y de despliegues Vercel por CLI. No publicar esa carpeta manualmente. Las copias usadas están en `public/hero-3d/optimized/`: 9.847.860 bytes, 765.976 triángulos, texturas WebP de hasta 1024px y Meshopt. La topología con muchas costuras limita la simplificación de estantería, PC, cámara y silla. Sigue siendo un presupuesto apreciable para una hero; requiere evaluación visual y de GPU real antes de publicación.

Regenerar con `pwsh -File scripts/optimize-hero-3d.ps1`. Usa glTF Transform CLI 4.5.0 temporalmente con `pnpm dlx`, sin dependencias adicionales del proyecto y sin Blender.

Drei carga el decoder Meshopt incluido en su dependencia `three-stdlib`; no se consulta un CDN. La CSP de `/` permite `blob:` únicamente en conexiones para texturas embebidas y `wasm-unsafe-eval` para ese decoder. La excepción previa de `/avatar-preview` permanece.

Canvas se carga sin SSR al acercarse al viewport. Render bajo demanda; DPR máximo 1,5; una única luz con sombras de 1024px. En móvil: DPR 1, sin sombras/parallax y sin objetivo ni estantería (nueve GLB, unos 6,49 MB); la cámara se conserva para su hotspot. OrbitControls no captura zoom en modo normal para permitir desplazar la página; focus activa zoom limitado. La expansión conserva un único Canvas y las instancias se apoyan en la caché de useGLTF. No se modifican materiales ni geometrías originales.

## Pantalla y límites

Monitor: una única malla y un único material sin nombres semánticos; no existe una pantalla separada identificable con seguridad. Se mantiene intacto. `MonitorScreen.tsx` superpone un plano independiente ante su cara frontal; falta confirmar visualmente su ajuste. No aplicar un material de pantalla a toda la malla.

Las orientaciones iniciales se basan en los ejes de los archivos; falta revisión visual en navegador para confirmar el frente de monitor, PC, cámara y silla. No se abrió ninguna aplicación externa durante esta implementación. Los tests comprueban estructura y decodificación de assets, no apariencia ni FPS.

Los estados de error/WebGL no disponible tienen una alternativa textual accesible. No hay vídeo final. Se puede sustituir el contenido de fallback en `CreativeRoomHero.tsx` y `CreativeRoomScene.tsx` cuando exista un recurso aprobado.

## Polish con lámpara, alfombra y panel topográfico

Se reutiliza la arquitectura y se conserva íntegro el sistema de ventana/parallax.

| GLB original | Bytes originales | Bytes optimizados | Triángulos optimizados |
| --- | ---: | ---: | ---: |
| Desk Lamp.glb | 72.060.132 | 272.992 | 29.214 |
| Office Rug.glb | 85.368.792 | 494.380 | 29.292 |
| Topographic Wall Panel.glb | 71.384.504 | 322.704 | 30.161 |

Los nuevos assets usan el mismo pipeline Meshopt + WebP de 1024px, ratio objetivo 0,015 y tolerancia 0,003. Los originales permanecen intactos. Para regenerar solo estos tres desde PowerShell:

```powershell
./scripts/optimize-hero-3d.ps1 -Only 'desk-lamp','office-rug','topographic-wall-panel'
```

- Lámpara: detrás de la cámara, a la izquierda; giro Y de PI para orientar el cabezal hacia el setup. Usa una pequeña superficie emisiva y un spot cálido sin sombras adicionales. Ambos siguen posición, rotación, tamaño y escala de la lámpara. La malla original no tiene bombilla/material separado: la posición del emisor se estima a partir de la geometría y debe confirmarse visualmente. Se ajusta en `lampLightConfig` en coordenadas locales normalizadas.
- Alfombra: horizontal de origen, tamaño 1,95, base Y 0,024. Su espesor normalizado es aproximadamente 0,0436. La silla se eleva a Y 0,068 para apoyar sobre ella; la alfombra queda delante de las patas del escritorio y recibe sombras sin proyectarlas.
- Panel: vertical de origen, tamaño 0,92, a la izquierda de la estantería y sobre la planta. Espesor aproximado 0,055; se sitúa junto a la cara interior de la pared trasera. Mantiene el relieve del GLB.
- Cámara y objetivo: pequeño desplazamiento hacia el frente para dejar libre la base de la lámpara. No se añadieron otros props.
- Teclado y ratón: mismas geometrías, posiciones y materiales; se separan de la arquitectura en `DeskAccessories.tsx` para editar sus transformaciones en `roomPropConfig`.
- Luz: `roomLightingConfig` centraliza atardecer, relleno, hemisferio y exposición. Menos ambiente uniforme, key más cálida con trayectoria a través de la ventana, relleno frontal ligeramente frío. Un único mapa de sombras PCFSoft de 1024px; móvil continúa sin sombras.

Comprobaciones: decodificación de los once GLB, presupuesto conjunto inferior a 10 MB/800.000 triángulos y encuadre matemático en seis proporciones de visor (0,74–2,7), además del apoyo silla/alfombra. Estas comprobaciones no sustituyen la revisión visual de orientación, iluminación y contacto del emisor con el cabezal. No se abrió navegador ni otra aplicación externa.

## Pantalla, hotspots y microinteracciones

### Configurar la pantalla

La pantalla usa una captura real de la ruta local `/proyectos` de aleviclop.dev, de 1024×576 en WebP. La emisión permanece en 0,12, sin luz adicional. La captura es estática y está en español; el resto de la interfaz mantiene ES/EN.

1. Guardar una captura, preferiblemente 16:9 y de hasta 1024px de ancho, en `public/hero-3d/textures/monitor-portfolio.webp`.
2. En `roomSceneConfig.ts`, `monitorScreenConfig.texture` apunta a `"/hero-3d/textures/monitor-portfolio.webp"`. Usar `null` para recuperar el material oscuro.
3. Afinar `position`, `rotation`, `scale`, `width`, `aspect` y `offset`. Son coordenadas locales del monitor normalizado a tamaño 1; siguen su posición, orientación y tamaño. El offset positivo se aplica sobre la normal local del plano.

La imagen usa sRGB y recorte proporcional centrado. Una imagen que falla vuelve al material oscuro sin retirar los otros modelos. El plano inicial está en Z local 0,079 con offset 0,004; la cara frontal estimada a partir de los vértices está alrededor de 0,077. Comprobar en navegador los cuatro bordes, el bisel y el ángulo real antes de dar el encaje por definitivo.

### Hotspots

`roomHotspots` concentra posiciones, `href` y etiquetas ES/EN:

- monitor: `/#projects`;
- cámara: `/#photography`, selección editorial y enlace a raw.vives;
- PC: `/#about`, sección existente de capacidades;
- ventana: `/sobre-mi`.

Son enlaces HTML reales con área de 44px, punto visual de 7px y etiquetas al hover/foco. Aceptan teclado y clic modificado para abrir en otra pestaña. En full focus aumentan discretamente su visibilidad. Una navegación normal cierra primero la expansión, libera el bloqueo de scroll y después usa el router. El recorrido de Tab incluye enlaces y controles; Escape cierra y devuelve el foco.

### Movimiento y rendimiento

`roomInteractionConfig` centraliza damping, duración de cámara, apertura/cierre, velocidades y amplitudes. `windowDepthConfig` conserva el parallax de montaña.

- Reset: interpolación de 0,85 s; arrastrar permite interrumpirla.
- Full focus: transición de 380 ms mediante Web Animations, apertura y cierre sobre un único Canvas. Los límites de cámara siguen en `roomCameraConfig` y `roomInteractionConfig`.
- Lámpara: variación máxima de intensidad de ±0,4%, exclusivamente en frames que ya se renderizan por interacción/carga. No agenda frames propios y permanece quieta en reposo.
- Planta: estática; no se balancea la maceta ni se deforma el GLB.
- Reduced-motion: sin parallax, sin variación de lámpara, sin damping de OrbitControls ni interpolación/animación de apertura o reset. Los enlaces, zoom y foco siguen funcionando.

Pendiente de revisión en navegador: ajuste de pantalla, posibles solapamientos de etiquetas, fluidez visual de apertura/cierre y recorrido real de teclado. Se mantienen lazy loading, DPR 1–1,5, ausencia de sombras en móvil y render bajo demanda. No se incorporan dependencias.

### Integración con el scroll de la portada

La hero usa una única composición: copy HTML y dos CTA a la izquierda, Alex Creative Space a la derecha. Por debajo de 1024px el texto precede al visor en flujo normal. Ya no hay capítulos sticky que retrasen los proyectos.

Los cuatro enlaces bajo la escena reutilizan los destinos de roomHotspots y siguen disponibles si WebGL falla. Hover y foco destacan el hotspot correspondiente. El monitor conserva la captura real existente, sustituible desde monitorScreenConfig.texture.

Desde 1024px y sin reducción de movimiento, ScrollTrigger desplaza la capa visual hasta un 5%, reduce su escala al 96% y su opacidad al 90%. No hay pinning ni scroll-jacking. El modo expandido revierte ese movimiento: ningún ancestro del diálogo tiene transformaciones. Los valores están centralizados en roomInteractionConfig y el contexto se limpia al cambiar de modo o desmontar.

### Imagen previa y verificación visual

`roomPreviewConfig.src` define el WebP del diorama visible antes de cargar el 3D. El visor se revela después de resolver los modelos y la montaña y renderizar dos frames. Las consultas de preparación reutilizan la caché de useGLTF; no crean instancias extra. La transición dura 420 ms, o es inmediata con reduced-motion. Si falla WebGL o un modelo, permanece la imagen, aparece un estado localizado y reset queda desactivado. Los hotspots permanecen fuera del foco mientras la escena no está lista.

Regenerar ambas imágenes con el servidor local activo: `node scripts/capture-hero-3d.mjs`. Opcionalmente definir `HERO_CAPTURE_URL` para otro puerto. El script usa Playwright headless y el Sharp incluido por Next, sin dependencias nuevas. Captura primero proyectos y después el Canvas, ocultando controles y etiquetas para no duplicarlos en la imagen previa.

La revisión headless cubre escritorio 1440×900 y móvil 390×844: un Canvas, ausencia de desbordamiento horizontal, sticky en escritorio, expansión/Escape y devolución de foco, además del fallo de un GLB con imagen previa. El layout usa `overflow-x-clip` para preservar sticky. Las capturas permiten revisar encuadre y pantalla; el rendimiento en un teléfono físico sigue pendiente.
