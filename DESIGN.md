# Jarbram — Design System

_Actualizado: 2026-11-10_ · Fuente de verdad: `src/styles/GlobalStyles.js` (tokens CSS) y `src/styles/motion.js` (movimiento).

## Idea

Un portafolio oscuro que habla en **conversaciones**: cada proyecto es un chat entre cliente y Abraham. El fondo casi negro deja todo el color a la marca y a las secciones. **Cada sección es dueña de un color**, y ese color la identifica en el header, las etiquetas y los CTA.

## Color

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#131313` | Fondo de página |
| `--surface-1` | `#161616` | Tarjetas |
| `--surface-2` | `#1b1b1b` | Bloques dentro de tarjetas, sliders |
| `--surface-3` | `#232323` | Bordes de tarjeta, controles |
| `--line` / `--line-strong` | `#2a2a2a` / `#383838` | Divisores, hover de borde, scrollbar |
| `--ink` | `#fdfbfb` | Texto principal |
| `--ink-muted` / `--ink-faint` | `#9a9a9a` / `#858585` | Texto secundario / metadatos (≥ 4.5:1 sobre las superficies) |
| `--accent` | `#FE4A23` | Marca: respuestas de Abraham, foco, selección, CTA principal |
| `--product` | `#50C878` | Sección Product |
| `--code` | `#9B59B6` | Sección Code |
| `--about` | `#F1C40F` | Sección About |
| `--on-color` | `#131313` | Texto sobre cualquier color de marca/sección |

Reglas:
- Solo cuatro escalones de superficie. Si necesitas un quinto, el diseño está mal.
- Los colores de sección nunca se mezclan dentro de una sección ajena.
- Las etiquetas de proyecto (`Tag` en `Projects.jsx`) usan pasteles con texto `--on-color`. Son datos, no decoración.
- Nada de texto con gradiente ni bordes laterales de color.

## Tipografía

Tres familias OFL, alojadas en `/public/fonts` (woff2 variables, sin CDN):

| Rol | Familia | Token |
|---|---|---|
| Display (h1–h4) | Bricolage Grotesque 700–800 | `--font-display` |
| Texto | Instrument Sans 400–700 | `--font-text` |
| Código / datos | JetBrains Mono | `--font-mono` |

- Títulos en mayúsculas con `letter-spacing: -0.02em` y `text-wrap: balance`.
- La mono solo va en código, terminal y números. Nunca como disfraz de "técnico".

## Forma

`--radius-sm` 8px (controles) · `--radius-md` 14px (burbujas, bloques) · `--radius-lg` 20px (tarjetas) · `--radius-pill` (tags, botones).
Las sombras siempre llevan desplazamiento y blur suave (`0 18px 40px -24px`). Nada de halos de color.

## Movimiento

Una curva para todo: `--ease-out` = `cubic-bezier(0.23, 1, 0.32, 1)` (en JS: `ease` de `motion.js`).

| Momento | Qué hace | Token |
|---|---|---|
| **Conversación que se reproduce** (el momento principal) | Al entrar en pantalla, cada mensaje llega en secuencia (stagger 120ms, spring); la burbuja nace desde su cola: cliente abajo-izquierda, Abraham abajo-derecha | `thread` + `message` |
| Captura que se abre | Ligada al scroll: `clip-path` de `inset(10% 7%)` → `inset(0)` mientras la tarjeta sube | `useScreenReveal` |
| Hero que se aleja | Ligado al scroll: escala 1→0.9, opacidad 1→0, `blur` 0→10px en el primer 70% de pantalla | `Intro.jsx` |
| Barra de progreso | 2px arriba, con el color de la sección actual, suavizada con spring | `App.jsx` |
| Cambio de página | Fade + subida 16px + enfoque desde `blur(8px)`, 560ms | `page` |
| Aparición de tarjetas | Fade + subida 24px + `blur(6px)` → nítido, 500ms | `reveal` |
| Hover de tarjeta | Sube 4px, borde `--line-strong`, aparece la sombra | `hoverLift` |
| Slider | Crossfade con zoom 1.02→1 | inline |
| Press de botón | `scale(0.96)`, 160ms | CSS global |

- Todo el scroll vive en `#root` (body es fixed): cualquier `useScroll` usa `container: scrollRoot`.
- Se usa Framer Motion y no `animation-timeline` CSS porque Firefox aún no lo soporta por defecto (nov 2026).
- `MotionConfig reducedMotion="user"` y la media query global respetan `prefers-reduced-motion`.
- Cada animación con `filter` termina en `filter: none` (`transitionEnd`), porque un filtro activo rompe los `position: fixed`.

## Superficies del navegador

Selección = `--accent` sobre `--on-color` · foco = anillo de 2px `--accent` con offset de 3px · caret = `--accent` · scrollbar delgada en `--line-strong`.
