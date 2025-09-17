# Copilot Instruction - DataCEF Web

## Contexto estrategico
- DataCEF posiciona sus servicios de automatizacion, analitica e IA como aceleradores del crecimiento empresarial.
- La web funciona como landing de conversion: debe inspirar confianza tecnica, transmitir impacto medible y entregar llamadas a la accion claras.
- Audiencia principal: directores de operaciones, tecnologia, marketing y duenos de negocio de empresas medianas-grandes que buscan modernizar procesos.

## Objetivos de producto
- Generar leads calificados que soliciten una consulta gratuita.
- Mostrar casos de uso y beneficios tangibles (ROI, reduccion de errores, velocidad de despliegue) con metricas faciles de entender.
- Proyectar una marca futurista y fiable apoyada en animaciones 3D y motion design sin sacrificar rendimiento ni accesibilidad.
- Mantener la experiencia totalmente responsive y optimizada para Vercel.

## Arquitectura y stack
- React 19.1 + Vite 6 (ESM) con lazy loading de secciones (Suspense y preloads condicionales en src/App.jsx).
- Tailwind CSS 4, Radix UI y componentes reutilizables en la carpeta ui (Button, etc.).
- Animaciones con Framer Motion y efectos Three.js (ThreeBackground.jsx, EnhancedVisuals.jsx) controlados por utilidades centralizadas en src/lib/animation-utils.js.
- Alias @/ resuelve a src/ desde vite.config.js.
- Gestor de paquetes: pnpm. Scripts: pnpm dev, pnpm build, pnpm preview.

## Secciones clave del sitio
- Hero.jsx: mensaje principal "Transformamos tu negocio con IA" con typewriter y fondo 3D. CTA de scroll suave a secciones inferiores.
- StatsSection.jsx: cifras de ROI, reduccion de tiempos y uptime para reforzar confianza.
- Services.jsx: seis tarjetas de servicios (automatizacion, datos, marketing, consultoria, verticales, open source) con iconos y glows diferenciados.
- About.jsx: valores de la empresa (innovacion responsable, excelencia tecnica, transparencia, impacto medible, colaboracion, adaptabilidad) con animaciones de flujos de datos.
- ROICalculator.jsx: calculadora interactiva que estima ahorros, ROI, payback y reduccion de errores a partir de datos del usuario.
- Contact.jsx: fomenta conversion (consulta gratuita, ROI garantizado, soporte 24/7). Incluye formulario y newsletter simulado.
- WhatsAppWidget.jsx: canal rapido de contacto (lazy load para no bloquear).
- EnhancedVisuals.jsx: efectos globales de orbes, parallax y lineas de energia (modo simplificado en mobile).

## Lineamientos de UX/UI
- Paleta neon/tecnologica repetida: verde #22c55e, naranja #f97316, morado #a855f7, azules cyan. Mantener contraste alto sobre fondos bg-slate-950.
- **Gradient Borders**: Todos los elementos visuales principales (botones, tarjetas, formularios) utilizan gradient-border-wrapper con animación dinámica multicolor (verde-rojo-morado). Los botones usan ajuste exacto al contenido, mientras que tarjetas y formularios usan full-width para ocupar el ancho completo disponible.
- Tipografia: se apoya en configuracion Tailwind por defecto (Inter/Sans). Usar pesos font-bold y font-black en titulares, text-gray-200 y text-gray-400 en texto de apoyo.
- Gradientes diagonales para elementos clave (CTA, headings) y brillos sutiles para transmitir high-tech.
- Layout responsive mobile-first; los componentes detectan useIsMobile para ajustar densidad de contenido y animaciones.
- CTA principal: "Consulta Gratuita" visible en header y repetida en secciones de contacto. Mantener copy claro y accionable.

## Motion, 3D y rendimiento
- Animaciones deben respetar prefers-reduced-motion; animation-utils provee getDeviceCapabilities y AnimationTimer para timing consistente.
- **Gradient Border System**: Implementado sistema de contornos dinámicos con CSS mask properties para animación fluida. Clases: gradient-border-wrapper (ajuste exacto), gradient-border-wrapper.full-width (ancho completo), reglas específicas para elementos en grid.
- Evitar Math.random en cada render: precalcular con useMemo (patron usado en Hero y Services).
- ThreeBackground solo se monta en desktop cuando no se prefiere reducir movimiento. En mobile usar gradientes 2D.
- EnhancedVisuals aplica throttle a eventos mousemove y parallax escalado segun dispositivo.
- Mantener lazy loading de secciones pesadas. Preload escalonado (idle callback en desktop, timers en mobile) ya implementado en App.jsx.
- **Optimizaciones de parpadeo**: Eliminadas animaciones problemáticas de textShadow y backgroundImage que causaban warnings de Framer Motion con colores oklab. Simplificadas transiciones hover para mejor rendimiento.

## Contenido y tono de marca
- Voz: consultiva, segura, visionaria; orientar mensajes a resultados tangibles (ROI, precision, velocidad) y a partnership cercano.
- Evitar tecnicismos innecesarios en copy publico; explicar beneficios con lenguaje sencillo pero profesional.
- Resaltar garantias (ROI, soporte 24/7) y diferenciadores (IA autonoma, analitica en tiempo real, industria vertical).
- Incluir pruebas sociales o testimonios en futuras iteraciones; reservar espacio en StatsSection o crear seccion dedicada.

## Accesibilidad y mejores practicas
- Contraste alto: verificar que gradientes no reduzcan AA. Ajustar opacidades en overlays si el texto pierde legibilidad.
- Formularios: validar campos requeridos, mostrar estados de exito/error.
- Navegacion: Header.jsx fijo con scroll suave y offset de 80 px. En mobile, cerrar menu tras seleccionar item.
- Animaciones: reducir densidad de particulas (multiplicadores de capabilities) y evitar loops intensivos fuera de requestAnimationFrame.

## Integraciones y datos
- Formularios actualmente mockeados. Para conectar a backend, exponer servicios via API o herramientas de automatizacion (Zapier, Make) desde handleSubmit y handleNewsletterSubmit en Contact.jsx.
- Calculadora ROI: valores por defecto (employees = 10, hourlyRate = 15 USD) y supuestos de ahorro (70 por ciento tiempo, 95 por ciento errores). Ajustar formulas segun verticales o planes.
- Variables de entorno deben iniciar con VITE_; ejemplo VITE_CONTACT_EMAIL en Vercel si se integra un mailer o endpoint.

## Build, QA y despliegue
- Requisitos: Node 18+, pnpm 8+. Instalacion: pnpm install.
- Desarrollo: pnpm dev (http://localhost:3000, host true para testing cross device).
- Produccion: pnpm build genera dist/. pnpm preview para revisar build.
- Lint: npx eslint "src/**/*.{js,jsx}". Actualmente no hay tests; preferir agregar Vitest + Testing Library para componentes interactivos.
- Despliegue en Vercel con vercel.json (rewrites SPA, cache immutable, headers de seguridad). Deploy automatizado al hacer push en main.

## Roadmap sugerido
- Dashboard de analytics interactivo para clientes.
- Integraciones con APIs de IA generativa (LLM, RAG) y agentes autonomos.
- Autenticacion y panel admin para clientes.
- Tema claro/oscuro y soporte multi-idioma.
- Casos de exito/testimonios y blog tecnico.
- Tracking de eventos (analitica privacy-first) y pruebas A/B de CTA.

## Referencias rapidas de archivos
- index.html: punto de entrada Vite, meta tags basicos.
- src/App.jsx: orquestacion de secciones, lazy loading y EnhancedVisuals.
- **src/App.css**: estilos globales incluyendo sistema de gradient-border-wrapper con animaciones CSS mask y reglas responsive específicas.
- src/components/ThreeBackground.jsx: renderizador WebGL procedural.
- src/lib/animation-utils.js: temporizador y deteccion de capacidades.
- vite.config.js: aliases, division de chunks, flags esbuild para animaciones.
- vercel.json: cabeceras de seguridad y cache para assets.
- ANIMATION_FIX.md: historial de debugging sobre diferencias dev/prod.

## Anti-patrones a evitar
- Inyectar scripts externos sin revisar impacto de rendimiento o CSP.
- Duplicar logica de deteccion de dispositivo en componentes; reutilizar useIsMobile y getDeviceCapabilities.
- Anadir animaciones sin controles de rendimiento o sin fallback para mobile.
- Desplegar secretos en frontend o commits (usar entorno Vercel con prefijo VITE_).

## Ideas de mejora a corto plazo
- Implementar persistencia real del formulario (API de correo o CRM).
- Anadir metricas reales a StatsSection y logos de clientes para reforzar credibilidad.
- Modularizar configuraciones de copy y servicios en archivos JSON para permitir edicion sin tocar componentes.
- Automatizar chequeos de calidad (script lint en package.json, pipeline en Vercel o GitHub Actions).

