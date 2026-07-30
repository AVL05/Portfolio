---
name: Alex Vicente Portfolio
description: A precise and creative frontend portfolio built around real product work
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

# Design System: Alex Vicente Portfolio v4

## Overview

**Creative North Star: "Visual Systems / Quiet Cinema"**

El portfolio se comporta como una secuencia editorial: oscuro, preciso y material. Fotografía real, tipografía de gran escala y movimiento ligado al scroll construyen profundidad sin convertir la página en una demostración de efectos.

La identidad rechaza los portfolios tecnológicos genéricos construidos como una plantilla SaaS y la estética de IA basada en glassmorphism, brillos, contadores y tarjetas repetidas sin contenido real.

**Key Characteristics:**

- Frontend-first y orientado a casos reales.
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

Barra persistente compacta, con sección activa reconocible, acceso inmediato al CV e idioma. En móvil se convierte en un diálogo de navegación con cierre por teclado.

### Project Scenes

Cuatro proyectos principales se muestran como escenas amplias con imagen, rol, stack y enlaces. En escritorio, máscara, escala y movimiento tipográfico responden al scroll; en móvil se convierten en bloques naturales sin parallax. El resto vive en un archivo editorial compacto.

## Do's and Don'ts

### Do:

- **Do** presentar primero el trabajo frontend y usar full-stack como contexto.
- **Do** mostrar imágenes reales, decisiones y resultados verificables.
- **Do** probar cada cambio a 390px y 1440px con movimiento reducido.

### Don't:

- **Don't** convertir el portfolio en una plantilla SaaS genérica.
- **Don't** usar glassmorphism, brillos, contadores y tarjetas repetidas sin contenido real como identidad.
- **Don't** añadir efectos que compitan con los proyectos o perjudiquen rendimiento y accesibilidad.
- **Don't** volver ambiguo si el perfil es frontend, diseñador o backend.
