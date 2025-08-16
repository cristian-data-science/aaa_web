# Contexto del proyecto

- Misión: sitio web de DataCEF para presentar servicios de automatización, analítica e IA con una UI moderna y animaciones.
- Dominio: consultoría tecnológica y data/IA; landing y secciones informativas (Hero, Services, ROI, Contacto).
- Stack principal: React 19 + Vite 6 (ESM) + Tailwind CSS 4 + Radix UI + Framer Motion. Despliegue en Vercel. Gestor de paquetes: pnpm.

# Convenciones de código

- Lenguaje: JavaScript/JSX con componentes funcionales y hooks.
- Estilo y linting: ESLint (flat config) con @eslint/js + react-hooks + react-refresh.
  - Ejecutar manual: `npx eslint "src/**/*.{js,jsx}"` (o configurar script `pnpm lint`).
  - Reglas relevantes: no-unused-vars (ignora constantes MAYÚS), reglas recomendadas y de hooks.
- Formato: 2 espacios de indentación, comillas simples o dobles consistentes, semicolons opcionales; mantener imports ordenados por grupos.
- Comentarios: español claro y breve; preferir comentarios en módulos, funciones y props no obvias.
- Imports/alias: usar `@/` para rutas desde `src` (configurado en Vite y jsconfig).
- Componentes:
  - Nombres PascalCase (`Hero.jsx`, `Services.jsx`), un componente por archivo.
  - Props tipadas por JSDoc cuando aclare intención; evitar props implícitas.
  - Evitar `default export` en componentes complejos; preferir named exports.
- CSS/estilos: utilidades de Tailwind; extraer clases largas con helpers (`clsx`, `tailwind-merge`). Evitar CSS global salvo tokens.

# Arquitectura y patrones

- Estructura principal:
  - `src/components` componentes de página y secciones (Hero, Services, Contact, etc.).
  - `src/components/ui` componentes reutilizables (inspirados en Radix/shadcn).
  - `src/hooks` custom hooks (p. ej., `use-mobile`).
  - `src/lib` utilidades compartidas (`utils.js`).
  - `src/assets` imágenes y logos.
- Patrones recomendados:
  - Composición de componentes, elevación mínima de estado, hooks para lógica reutilizable.
  - Presentational vs. container cuando aplique (UI sin lógica acoplada).
  - Animaciones con Framer Motion encapsuladas (props claras, sin side-effects globales).
- Convenciones de diseño:
  - Tokens de diseño vía CSS variables (`--radius`, `--colors`) y theme classes.
  - Responsivo mobile-first con grid/flex de Tailwind.
- No hay routing ni estado global; mantener la app como SPA estática.

# Dependencias clave

- React ^19.1.0, react-dom ^19.1.0
- Vite ^6.3.5, @vitejs/plugin-react ^4.4.1
- Tailwind CSS ^4.1.7, @tailwindcss/vite ^4.1.7
- Radix UI: `@radix-ui/react-accordion`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`
- Animaciones: framer-motion ^12.15.0
- Utilidades: clsx ^2.1.1, class-variance-authority ^0.7.1, tailwind-merge ^3.3.0
- Linting: eslint ^9.25.0, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals

# Flujos de build & test

- Requisitos: Node 18+, pnpm. Instalar: `pnpm install`.
- Desarrollo: `pnpm dev` (Vite dev server en http://localhost:3000, abre automáticamente).
- Build producción: `pnpm build` (salida en `dist/`).
- Preview local: `pnpm preview`.
- Lint (manual): `npx eslint "src/**/*.{js,jsx}"`.
- Testing: no configurado actualmente (no hay vitest/jest). Si se agrega, preferir Vitest + Testing Library.
- CI/CD: Vercel con auto-deploys por push; configuración en `vercel.json` (SPA rewrites, headers de seguridad, cache de assets, `dist` como output).

# Seguridad y compliance

- Frontend-only: no almacenar secretos en el cliente. Variables de entorno deben tener prefijo `VITE_` y definirse en Vercel (Dashboard > Settings > Environment Variables).
- Cabeceras de seguridad: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy` gestionadas por `vercel.json`.
- Licencias: MIT (archivo `LICENSE`). Verificar derechos de uso de imágenes en `src/assets`.
- Datos personales: formularios deben validar entradas y no enviar datos sensibles sin HTTPS (Vercel usa HTTPS por defecto).
- Dependencias: mantener actualizadas versiones minor/patch; evitar paquetes sin mantenimiento.
- CSP: no definida; si se integran terceros, considerar una CSP explícita.

# Anti-patrones

- Exponer secretos/keys en el código cliente o commits.
- Manipular DOM directamente (usar refs/React). Evitar `document.querySelector` salvo casos controlados.
- Añadir librerías pesadas para utilidades triviales (p. ej., lodash completo). Priorizar utilidades nativas.
- Estilos inline extensos; preferir clases Tailwind y componentes UI.
- Lógica compleja dentro del JSX; extraer a funciones o hooks.
- Fetch a orígenes no confiables o sin control de errores; manejar timeouts/reintentos según necesidad.
- Crear componentes monolíticos (>300 líneas) sin separación de responsabilidades.
- Romper el alias `@/` con rutas relativas profundas (../../..); usar el alias consistentemente.

---

Notas rápidas
- Alias configurado: `@/* -> src/*` (Vite + jsconfig).
- Build: target `esnext`, minificación con esbuild y code-splitting manual (vendors) en `vite.config.js`.
- Cache: assets con `Cache-Control: immutable` en Vercel.
