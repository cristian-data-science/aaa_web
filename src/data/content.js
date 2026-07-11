import { Cloud, BarChart3, Sparkles, Code2, Workflow, Users, Wrench, Clock, Rocket, Factory, Award, Target, Eye, Heart, Lightbulb, Gift, Zap, Code } from 'lucide-react'
import {
  SiPython, SiJavascript, SiReact, SiNextdotjs, SiN8N, SiMake,
  SiClaude, SiPostgresql, SiSnowflake, SiGooglecloud, SiVercel,
  SiDocker, SiSupabase
} from 'react-icons/si'

/* ============================================================
   Contenido único del sitio — fuente de verdad compartida por
   las 3 experiencias visuales (kernel / folio / orbit).
   Cada experiencia lo CUENTA distinto, pero la información es una.
   ============================================================ */

export const BRAND = {
  name: 'DataCEF',
  badge: 'Automatización · Software · IA',
  heroTitle: 'Transformamos tu negocio',
  heroConnector: 'con',
  heroWords: [
    'Agentes',
    'Automatizaciones',
    'Inteligencia Artificial',
    'Análisis de Datos',
    'Vendedores Autónomos',
    'Infraestructura Tecnológica',
  ],
  heroSubtitle:
    'Somos una empresa AI-first que combina ingeniería de software con lo último en inteligencia artificial para resolver problemas reales de negocio.',
  ctaPrimary: 'Conversemos',
  ctaSecondary: 'Nuestros Servicios',
  footerBlurb:
    'Empresa AI-first de automatización e ingeniería de software. Resolvemos problemas reales de negocio con tecnología de punta, desde Santiago para toda Latinoamérica.',
}

// AWS, Power BI y OpenAI no tienen logo en simple-icons (restricciones
// de marca) — usan un ícono genérico en su lugar.
export const TECH_STACK = [
  { name: 'Python', Icon: SiPython },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'React', Icon: SiReact },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'N8N', Icon: SiN8N },
  { name: 'Make', Icon: SiMake },
  { name: 'OpenAI', Icon: Sparkles },
  { name: 'Anthropic Claude', Icon: SiClaude },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'Snowflake', Icon: SiSnowflake },
  { name: 'Power BI', Icon: BarChart3 },
  { name: 'AWS', Icon: Cloud },
  { name: 'Google Cloud', Icon: SiGooglecloud },
  { name: 'Vercel', Icon: SiVercel },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Supabase', Icon: SiSupabase },
]

export const STATS = [
  {
    value: 10000,
    prefix: '+',
    title: 'Horas Ahorradas',
    description: 'Automatizando procesos en múltiples industrias',
    icon: Clock,
  },
  {
    value: 20,
    prefix: '+',
    title: 'Proyectos Completados',
    description: 'Automatización, software e IA',
    icon: Rocket,
  },
  {
    value: 9,
    title: 'Industrias Atendidas',
    description: 'Retail, transporte, RRHH, logística y más',
    icon: Factory,
  },
  {
    value: 10,
    prefix: '+',
    title: 'Años de Trayectoria',
    description: 'Experiencia combinada del equipo',
    icon: Award,
  },
]

export const SERVICES = [
  {
    icon: Code2,
    title: 'Desarrollo de Software a Medida',
    description:
      'Entendemos tus procesos de negocio, identificamos los dolores reales y construimos software que automatiza lo repetitivo y abre la puerta a innovar con IA. Cada línea de código tiene un propósito.',
    features: ['Aplicaciones web y móvil', 'APIs e integraciones', 'Arquitectura diseñada para tu negocio'],
  },
  {
    icon: Workflow,
    title: 'Automatización Inteligente',
    description:
      'Eliminamos el trabajo manual repetitivo con herramientas como N8N y Make, conectadas con IA. Tu equipo deja de copiar y pegar para enfocarse en lo que importa.',
    features: ['Automatización de facturación', 'Procesamiento de documentos', 'Flujos de trabajo inteligentes'],
  },
  {
    icon: BarChart3,
    title: 'Datos & Inteligencia Artificial',
    description:
      'Convertimos datos en decisiones concretas. Construimos agentes de IA, modelos de análisis y sistemas conversacionales que entienden tu negocio.',
    features: ['Agentes de IA personalizados', 'Análisis de datos avanzado', 'IA Conversacional (RAG)'],
  },
  {
    icon: Users,
    title: 'Consultoría & Adopción Tecnológica',
    description:
      'Te acompañamos desde el diagnóstico hasta la implementación. No solo entregamos tecnología — nos aseguramos de que tu equipo la adopte y le saque provecho.',
    features: ['Diagnóstico de procesos', 'Estrategia de automatización', 'Capacitación de equipos'],
  },
  {
    icon: Wrench,
    title: 'Soluciones Open Source',
    description:
      'Implementamos y adaptamos herramientas open source para que tengas soluciones potentes sin depender de licencias costosas. Libertad tecnológica real.',
    features: ['Herramientas propias', 'Integración open source', 'Desarrollo personalizado'],
  },
]

export const ABOUT = {
  mission: {
    title: 'Nuestra Misión',
    text: 'Habilitamos la transformación tecnológica de empresas en Chile y Latinoamérica. Combinamos ingeniería de software sólida con lo último en inteligencia artificial para resolver problemas reales de negocio — no para vender humo.',
  },
  vision: {
    title: 'Nuestra Visión',
    text: 'Ser el partner tecnológico de referencia para empresas que quieren innovar de verdad — sin burocracia, con resultados concretos y tecnología de punta. Desde Santiago para todo Chile y Latinoamérica.',
  },
  commitment: {
    title: 'Nuestro Compromiso',
    text: 'Nos comprometemos con cada proyecto como si fuera nuestro. Entendemos tu negocio primero, proponemos después, y entregamos soluciones que funcionan. Así de simple.',
  },
  values: [
    {
      icon: Lightbulb,
      title: 'AI-First',
      description: 'No le tenemos miedo a lo nuevo. Adoptamos las últimas tecnologías apenas demuestran valor real.',
    },
    {
      icon: Award,
      title: 'Excelencia Técnica',
      description: 'Background sólido de ingeniería con estándares altos en cada línea de código y cada entrega.',
    },
    {
      icon: Heart,
      title: 'Transparencia',
      description: 'Te decimos las cosas como son. Si algo no se puede, lo decimos. Si hay una forma mejor, la proponemos.',
    },
    {
      icon: Target,
      title: 'Resultados Concretos',
      description: 'Cada proyecto tiene métricas claras. Horas ahorradas, procesos automatizados, problemas resueltos.',
    },
    {
      icon: Users,
      title: 'Partners, No Proveedores',
      description: 'Trabajamos codo a codo contigo. Entendemos tu negocio antes de escribir la primera línea de código.',
    },
    {
      icon: Eye,
      title: 'Adaptabilidad',
      description: 'La tecnología cambia rápido. Nosotros también. Nos desacoplamos de lo rígido para innovar ágilmente.',
    },
  ],
}

export const CASES = [
  {
    industry: 'Transformación Digital',
    title: 'Aplicaciones para digitalizar negocios',
    description:
      'Diseñamos y desarrollamos aplicaciones a medida que llevan procesos análogos al mundo digital. Desde sistemas internos hasta plataformas cliente, construimos software que transforma la forma en que las empresas operan día a día.',
    metric: { value: 100, suffix: '%' },
    metricLabel: 'procesos digitalizados',
  },
  {
    industry: 'Comercio Exterior',
    title: '800 horas manuales ahorradas',
    description:
      'Automatizamos el proceso completo de ingreso de facturas para una empresa de comercio exterior. Lo que antes requería horas de digitación manual, ahora se procesa de forma automática con validación inteligente.',
    metric: { value: 800, prefix: '+', suffix: ' hrs' },
    metricLabel: 'ahorradas al año',
  },
  {
    industry: 'Multi-industria',
    title: 'Facturación 100% automática',
    description:
      'Construimos automatizaciones que generan facturas de forma autónoma, liberando a los analistas contables del proceso de facturación manual en múltiples áreas de negocio.',
    metric: null,
    metricStatic: '0',
    metricLabel: 'intervención manual',
  },
  {
    industry: 'Retail · Transporte · Logística',
    title: 'Recolección y análisis de datos automatizado',
    description:
      'Automatizamos la recolección de datos de distintas fuentes e industrias, transformando información dispersa en análisis accionables para la toma de decisiones.',
    metric: { value: 4 },
    metricLabel: 'industrias beneficiadas',
  },
]

export const CASES_NOTE = '+20 proyectos completados en retail, transporte, RRHH y logística.'

export const CONTACT = {
  title: 'Hablemos de tu Proyecto',
  subtitle:
    '¿Tienes un proceso manual que te quita horas? ¿Una idea que quieres llevar a la realidad con tecnología? Escríbenos — la primera conversación es sin costo.',
  whyTitle: '¿Por qué trabajar con DataCEF?',
  benefits: [
    {
      icon: Gift,
      title: 'Consulta Sin Costo',
      description: 'Conversemos sobre tu caso. Analizamos tus procesos y te decimos honestamente cómo podemos ayudarte.',
    },
    {
      icon: Code,
      title: 'Equipo Técnico Real',
      description: 'Data scientists, ingenieros de software y expertos en IA trabajando en tu proyecto.',
    },
    {
      icon: Clock,
      title: 'Resultados Rápidos',
      description: 'Implementación ágil con resultados visibles en semanas, no en meses.',
    },
    {
      icon: Zap,
      title: 'Tecnología de Punta',
      description: 'Python, JavaScript, modelos de IA de última generación, N8N y las mejores herramientas del mercado.',
    },
  ],
  email: 'contacto@datacef.com',
  location: 'Santiago, Chile · Remoto en toda Latinoamérica',
  locationShort: 'Santiago, Chile · Remoto LATAM',
  industries: ['Retail', 'Transporte', 'Recursos Humanos', 'Operaciones y Logística'],
}

export const NAV_ITEMS = [
  { name: 'Inicio', id: 'hero' },
  { name: 'Servicios', id: 'services' },
  { name: 'Nosotros', id: 'about' },
  { name: 'Casos', id: 'case-studies' },
  { name: 'Contacto', id: 'contact' },
]
