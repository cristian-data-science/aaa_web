# CLAUDE.md

Este archivo proporciona guía a Claude Code (claude.ai/code) cuando trabaja con código en este repositorio.

## Comandos de Desarrollo

```bash
# Desarrollo
pnpm dev          # Iniciar servidor de desarrollo (http://localhost:3000)
pnpm build        # Construir para producción
pnpm preview      # Vista previa de la construcción de producción

# Calidad de Código
npx eslint "src/**/*.{js,jsx}"  # Ejecutar linting (no hay script npm configurado)
```

## Arquitectura del Proyecto

**Stack**: React 19 + Vite 6 (ESM) + Tailwind CSS 4 + Radix UI + Framer Motion

**Estructura de Componentes**:
- `src/components/` - Secciones principales de la página (Hero, Services, Contact, etc.)
- `src/components/ui/` - Componentes UI reutilizables (basados en Radix UI)
- `src/hooks/` - Custom hooks (ej., `use-mobile`)
- `src/lib/utils.js` - Utilidades compartidas (función `cn` para fusión de clases)
- `src/assets/` - Imágenes y logos

**Patrones de Diseño Clave**:
- Componentes funcionales con hooks
- Carga lazy para secciones pesadas (StatsSection, Services, About, ROICalculator, Contact)
- Optimizaciones de rendimiento vía useMemo para animaciones precomputadas
- Diseño responsive mobile-first con renderizado condicional para móvil/desktop

## Convenciones de Código

**JavaScript/JSX**:
- Componentes funcionales, indentación de 2 espacios
- Usar alias `@/` para importaciones desde src (configurado en vite.config.js)
- Nombres de componentes en PascalCase, un componente por archivo
- Comentarios en español para lógica específica del dominio

**Estilos**:
- Utilidades de Tailwind CSS con configuración de tema personalizada
- Framer Motion para animaciones respetando preferencias de movimiento reducido
- Gradientes de fondo y efectos de partículas optimizados para rendimiento
- Sistema de temas con variables CSS y atributos de datos

**Consideraciones de Rendimiento**:
- Fondos Three.js solo en desktop y cuando el movimiento no está reducido
- Animaciones de partículas precomputadas para evitar Math.random en render
- Carga lazy con Suspense para secciones no críticas
- División manual de chunks en vite.config.js para tamaños de bundle óptimos

## Despliegue

Construido para Vercel con despliegue automático. El proyecto usa:
- Target ESNext con minificación esbuild
- División manual de chunks para React, Framer Motion, Three.js y vendors UI
- Optimización de assets estáticos con caché inmutable