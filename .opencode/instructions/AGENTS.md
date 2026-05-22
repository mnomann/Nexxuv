# Nexxuv — Sitio Corporativo GovTech

## Stack

| Capa | Tecnologia |
|---|---|
| Framework | React 19+, TypeScript 6.0+ |
| Estilos | Tailwind CSS v4 (sin CSS plano ni CSS Modules) |
| Bundler | Vite 8+ |
| Animacion | Framer Motion |
| Iconos | Lucide React |
| Routing | React Router DOM v7 (uso minimo, ver abajo) |
| Contacto | EmailJS (variables `VITE_EMAILJS_*`) |
| Despliegue | Cloudflare Pages (config en `cloudflare.toml`) |
| Linter | ESLint flat config (`eslint.config.js`) |
| Tipo | SPA estatica, sin backend |

## Arquitectura (una sola pagina)

No hay multiples rutas. `App.tsx` usa `BrowserRouter` pero renderiza unicamente `<Home />`. No existen `<Routes>` ni `<Route>`. La navegacion interna del menu funciona mediante smooth-scroll a anclas HTML (`#hero`, `#govtech`, `#casos`, `#capacidades`, `#contacto`).

- `src/pages/Home.tsx` -> unica pagina, contiene las 4 secciones + el formulario de contacto esta en `Footer.tsx`
- `src/components/Header.tsx` -> navegacion fija con menu mobile hamburguesa
- `src/components/Footer.tsx` -> pie + formulario de contacto
- `src/types/index.ts` -> interfaces `NavLink`, `GovTechModule`, `SuccessCase`, `Capability`, `ContactFormData`
- Las secciones usan iconos de Lucide mapeados via `Record<string, typeof Component>` en `Home.tsx`

## Convenciones del proyecto

- Componentes: funcion flecha (`export default function Componente` esta bien, pero predomina funcion flecha con `export default`)
- Nombres: componentes en PascalCase, archivos en kebab-case
- Props tipadas con `interface` o `type` de TypeScript
- No comentarios en codigo de produccion
- Diseno responsive mobile-first
- Accesibilidad: elementos semanticos, `aria-label`, `aria-expanded`
- Solo Tailwind CSS v4 (nada de CSS plano, CSS Modules, styled-components)

## Peculiaridades tecnicas no obvias

### TypeScript 6.0
- `erasableSyntaxOnly` activo: NO usar `enum`, `namespace`, o `constructor parameter properties`. Usar `const` objects o union types.
- `verbatimModuleSyntax` activo: los imports de SOLO tipos requieren `import type { ... }`. Usar `import type` en vez de `import` cuando solo se importen tipos.
- `noUnusedLocals` y `noUnusedParameters` activos: variables sin usar causan error de compilacion.
- `noEmit: true`: TypeScript solo type-checkea, no genera JS (lo hace Vite).

### Tailwind CSS v4
- Los tokens de diseno se definen con la directiva `@theme` en bloque en `src/index.css`. NO modificar archivos `tailwind.config.*` porque no existen.
- Paleta: Cyan (`#00e5ff`) como color accent. Emerald (`#10b981`) como secundario. Fondo oscuro (`#030712`).

### Build
`npm run build` ejecuta DOS pasos: `tsc -b` (type-check de todo el proyecto) y luego `vite build`. Si hay errores de tipo, el build falla.

Orden recomendado para verificacion: `npm run lint` -> `npm run build` (type-check incluido).

## Comandos exactos

| Comando | Que hace |
|---|---|
| `npm run dev` | Servidor de desarrollo Vite con HMR |
| `npm run build` | Type-check (`tsc -b`) + build Vite |
| `npm run preview` | Previsualiza el build de produccion |
| `npm run lint` | ESLint sobre `**/*.{ts,tsx}` |

## OpenCode

- El agente `Orquestador` tiene `edit: deny` y `bash: deny` en `opencode.json`. No puede escribir archivos ni ejecutar comandos directamente. Solo puede delegar via `task` a subagentes.
- Los subagentes se definen en `.opencode/agents/` con `mode: subagent`.

## Despliegue

- Cloudflare Pages, configurado via `cloudflare.toml` en la raiz.
- Build command: `npm run build`, publish dir: `dist`, Node 20.
- Redirect SPA: `/*` -> `/index.html` status 200.
- Dominio: `nexxuv.com` (gestionado en Cloudflare).
- El workflow legacy de GitHub Pages (`deploy.yml`) fue eliminado.

## Estado del README.md

El README.md actual esta desactualizado. Menciona "nombre-generico" y una estructura de portafolio personal que ya no corresponde. La fuente de verdad es este archivo y el codigo fuente.
