---
name: Alex Vicente Portfolio
description: A precise frontend portfolio built around real interface and product work
colors:
  background: "oklch(0.105 0.012 58)"
  foreground: "oklch(0.94 0.013 86)"
  surface: "oklch(0.145 0.014 58)"
  primary: "oklch(0.72 0.115 42)"
  accent: "oklch(0.72 0.115 42)"
  muted: "oklch(0.68 0.012 82)"
  border: "oklch(0.30 0.014 58)"
typography:
  display:
    fontFamily: "Geist Sans, sans-serif"
    fontSize: "clamp(3.2rem, 8vw, 7.4rem)"
    fontWeight: 900
    lineHeight: 0.9
  body:
    fontFamily: "Geist Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.16em"
rounded:
  control: "8px"
  surface: "12px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.surface}"
    padding: "16px 28px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.surface}"
    padding: "24px"
---

# Design System: Alex Vicente Portfolio

## ALEVICLOP 2.1 — Code / Composition (2026-10-11)

El usuario autoriza convertir la exploración aprobada en la home principal local.
Esta dirección sustituye el hero M1: Código / Criterio en ES, Code / Craft en EN,
monograma AV vectorial y capturas reales de LumaFlow y Distrito Gourmet.
Fondo `#10151E`, secciones de proyectos y experiencia en gris mineral `#292D32`,
marfil `#F5F3EE` y acento `#ADC1FF`. La clase `code-home` limita los nuevos tokens
a la home; estudios de caso, rutas, formulario y SEO conservan sus contratos.
Movimiento de entrada sobre elementos gráficos, desplazamiento exterior de 18 px
solo en escritorio y contenido profesional siempre visible. La entrada se omite
si la hidratación llega tarde. Los CTAs circulares mantienen foco y área fija.
El lanzamiento continúa detenido: esta integración no autoriza publicar.
Ver `docs/ALEVICLOP_2_1.md` para validación y límites.

## ALEVICLOP 2.0 — M1 override (2026-10-10)

La especificación explícita del usuario sustituye la dirección anterior en la home:
Dark Editorial / Equilibrio Premium. Fondo `#0B0D12`, superficie `#171A22`,
marfil `#F5F3EE`, secundario `#A6AAB7`, azul `#7686FF` y naranja puntual `#FF6542`.
Space Grotesk para display, Inter para cuerpo e IBM Plex Mono para etiquetas.
Los tokens viven en `.premium-home` en `app/globals.css`; hero y navegación usan
CSS Modules, una retícula de 12 columnas y un contenedor máximo de 1440px.

El hero es tipográfico, con tres líneas, cierre azul, nombre visible, perfil junior,
acceso a proyectos, CV y experiencia. Entrada GSAP de 1,3s; desplazamiento del
titular limitado a 20px en escritorio. Botones magnéticos: solo el contenido se
mueve (4px / 3px), con zona clicable fija. Movimiento opcional y contenido SSR visible.
Navegación móvil con diálogo nativo, cierre con Escape y retorno de foco; enlaces
alternativos sin JavaScript. No se publica una nueva disponibilidad sin confirmación.

M1 no rediseña proyectos ni estudios de caso. La dirección anterior, documentada
debajo, sigue rigiendo esas superficies hasta M2. Componentes y assets 3D conservados,
pero fuera del hero. Ver `docs/ALEVICLOP_2_0.md` para alcance y siguientes hitos.

## Overview

**Creative North Star: "Visual Systems / Quiet Cinema"**

El portfolio se comporta como una secuencia editorial: oscuro, preciso y material. Fotografía real, tipografía de gran escala y movimiento ligado al scroll construyen profundidad sin convertir la página en una demostración de efectos.

La identidad rechaza los portfolios tecnológicos genéricos construidos como una plantilla SaaS y la estética de IA basada en glassmorphism, brillos, contadores y tarjetas repetidas sin contenido real.

**Key Characteristics:**

- Desarrollo full-stack de principio a fin con casos reales, de la interfaz a la API y los datos.
- Carbón y marfil con un único acento cobre controlado.
- Tipografía de gran escala compensada con texto cómodo y directo.
- Movimiento expresivo, siempre opcional mediante reducción de movimiento.

**The Motion Budget Rule.** Una entrada orquestada en el hero, una entrada breve por lista y microinteracciones de estado. No se animan secciones completas por costumbre ni se acumulan efectos simultáneos.

## Colors

La paleta usa un negro cálido como espacio de trabajo, tinta clara y cobre para dirigir la atención; el verde queda reservado a disponibilidad y estados positivos.

**The Evidence Rule.** El color primario señala acciones y decisiones importantes; nunca compensa contenido débil.

## Typography

**Display Font:** Geist Sans (sans-serif)
**Body Font:** Geist Sans (sans-serif)
**Label/Mono Font:** Geist Mono (monospace)

**Character:** Directa y contemporánea. La escala display da presencia creativa; la familia mono aporta precisión únicamente en metadatos breves.

### Hierarchy

- **Display** (900, `clamp(3.2rem, 8vw, 7.4rem)`, 0.9): nombre y titulares dominantes.
- **Headline** (900, `clamp(2.5rem, 6vw, 4.5rem)`, 0.96): títulos de sección.
- **Body** (500, `1rem–1.25rem`, 1.65): argumentos y contexto, con un máximo aproximado de 70 caracteres.
- **Label** (700, `0.6875rem`, `0.16em`, mayúsculas): categorías y metadatos puntuales.

**The Mono Ratio Rule.** Geist Mono nunca se usa como cuerpo de texto ni como sustituto automático de personalidad técnica.

## Elevation

La profundidad se construye principalmente con contraste tonal y bordes. Las sombras son ambientales y contenidas; aparecen en superficies protagonistas o durante una interacción, no en cada contenedor.

**The Surface Rule.** Una superficie en reposo usa borde o sombra, nunca ambos como decoración dominante.

## Components

### Buttons

- **Shape:** esquinas firmes suavizadas (8–12px).
- **Primary:** cobre, texto oscuro y padding generoso.
- **Hover / Focus:** desplazamiento máximo de 2px y foco visible de alto contraste.
- **Secondary:** borde discreto y fondo tonal; nunca cristal decorativo.

### Chips

- **Style:** etiquetas breves con Geist Mono, sin competir con el título.
- **State:** la selección usa fondo primario; el resto mantiene contraste AA.

### Cards / Containers

- **Corner Style:** 12px como máximo habitual.
- **Background:** superficies oscuras tonales.
- **Shadow Strategy:** elevación solo en protagonistas o interacción.
- **Border:** una línea semitransparente.
- **Internal Padding:** 24–32px en escritorio y 16–24px en móvil.

### Inputs / Fields

- **Style:** fondo tonal, borde visible y radio de 8px.
- **Focus:** borde primario y anillo perceptible.
- **Error / Disabled:** mensaje textual además del color.

### Navigation

Barra persistente compacta, con sección activa reconocible, acceso secundario al CV e idioma. En móvil se convierte en un diálogo de navegación con cierre por teclado.

### Project Scenes

Cuatro proyectos principales se muestran como escenas amplias con imagen, rol, stack y enlaces. Una entrada discreta acompaña cada proyecto, sin parallax continuo. El resto vive en un archivo editorial compacto.

## Do's and Don'ts

### Do:

- **Do** presentar primero el trabajo full-stack de principio a fin y respaldar cada capa con evidencia real.
- **Do** mostrar imágenes reales, decisiones y resultados verificables.
- **Do** probar cada cambio a 390px y 1440px con movimiento reducido.

### Don't:

- **Don't** convertir el portfolio en una plantilla SaaS genérica.
- **Don't** usar glassmorphism, brillos, contadores y tarjetas repetidas sin contenido real como identidad.
- **Don't** añadir efectos que compitan con los proyectos o perjudiquen rendimiento y accesibilidad.
- **Don't** reducir el perfil a una sola capa del desarrollo web.

## ALEVICLOP 2.0 — extensión aprobada M2 (2026-10-10)

M2 extiende Dark Editorial / Equilibrio Premium desde M1 a Selected Work y los tres estudios de caso existentes, en home e índice de proyectos. Conserva tokens globales legacy fuera de esas superficies y no regenera frontmatter ni sidecar. Evidencia y validaciones: [M2_SELECTED_WORK.md](docs/M2_SELECTED_WORK.md).

- Space Grotesk 500 para títulos; Inter para cuerpo; IBM Plex Mono 400 para metadatos bajo el título. Sección `clamp(3.5rem, 8vw, 7rem)`; proyecto `clamp(2.75rem, 5.3vw, 5rem)`; raw.vives `clamp(3.75rem, 11vw, 9rem)`; cuerpos con 42ch y línea 1.65–1.7.
- Retícula de 12 columnas y ancho máximo 90rem; desde 1023px hacia abajo, lectura vertical título → imagen → detalles. Escenas amplias de borde fino, sin tarjetas anidadas. AI panorámico, Distrito imagen izquierda sobre marfil, Luma interfaz derecha y raw.vives composición editorial asimétrica.
- Paleta M1 de fondo, texto y azul; Distrito usa localmente marfil `#F5F3EE`, texto `#0B0D12`, secundario `#4A514C` y verde `#344E43`. Estas excepciones de proyecto no sustituyen el acento global.
- Media real optimizada, pies que distinguen desarrollo/datos de ejemplo, lazy loading y proporción reservada. Preview alternativo solo condicional tras mouse/foco en desktop compatible; acciones completas sin hover.
- Revelado GSAP diferido y scoped, entradas 18/12px y máscara 0.75s; parallax exclusivamente de imagen ±10px en desktop ≥1024px con puntero fino. Esta excepción aprobada sustituye «sin parallax continuo» solo para M2. Movimiento reducido y SSR/sin JS conservan acceso al contenido.
- Casos con hero amplio, anclas internas con enlaces de 44px de alto mínimo, esquinas rectas y contraste editorial marfil en el bloque de contexto. Código privado se expresa como estado textual y contacto, sin enlace público roto.

No se canonizan etiquetas encima de titulares, avisos consultivos de paleta legacy ni métricas de laboratorio como resultados de producto. No se reparan las superficies fuera del alcance M2 para disimular esa deriva.

## ALEVICLOP 2.0 — refinamiento M3 (2026-10-11)

M3 mantiene la composición de M1/M2 y coordina el movimiento mediante `motion` en `lib/gsap.ts`: estados 140/240 ms, entrada 450 ms, títulos 600 ms, máscaras 650 ms y líneas del hero 800 ms; `power3.out` / `expo.out`, stagger 40/80 ms y desplazamientos 8/12/18 px. CSS comparte las duraciones de estado y la curva de salida. [Evidencia, límites y validación M3](docs/M3_MOTION_POLISH.md).

- Entradas de sección al 88% del viewport, con contenido visible y finalización al saltar la sección. Hero conserva su presupuesto; descripción LCP sin entrada ni transformación.
- Cursor nativo. Foco inmediato, botones estables y menú accesible. Movimiento reducido también al cambiar la preferencia durante la sesión.
- Preview alternativo tras interacción compatible y carga completa; crossfade reversible de 240 ms, sin reemplazar la imagen principal durante la carga. Touch no depende de hover.
- Inter, Space Grotesk 500 e IBM Plex Mono 400 dan continuidad a las superficies premium. Se mantiene el parallax acotado de M2 exclusivamente en desktop compatible.
- Contacto permanece legible durante la entrada, con estado de envío accesible y borrador conservado. Transiciones entre páginas breves, sin desplazamiento raíz ni demora previa a navegar.

Estos criterios no añaden efectos continuos ni habilitan M4. La incidencia de LCP móvil permanece abierta.
