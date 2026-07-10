import { useTheme } from '@/theme/ThemeContext'
import AuroraBackground from './backgrounds/AuroraBackground'
import NebulaBackground from './backgrounds/NebulaBackground'
import ChromaBackground from './backgrounds/ChromaBackground'

const BACKGROUNDS = {
  aurora: AuroraBackground,
  nebula: NebulaBackground,
  chroma: ChromaBackground,
}

// Dispatcher: renderiza el fondo del tema activo (todos son CSS puro
// y se pausan con prefers-reduced-motion).
const BrandBackground = () => {
  const { theme } = useTheme()
  const Background = BACKGROUNDS[theme] ?? AuroraBackground
  return <Background />
}

export default BrandBackground
