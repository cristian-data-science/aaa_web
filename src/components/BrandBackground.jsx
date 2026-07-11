import { useTheme } from '@/theme/ThemeContext'
import AuroraBackground from './backgrounds/AuroraBackground'
import NebulaBackground from './backgrounds/NebulaBackground'

const BACKGROUNDS = {
  aurora: AuroraBackground,
  nebula: NebulaBackground,
}

// Dispatcher: renderiza el fondo del tema activo (todos son CSS puro
// y se pausan con prefers-reduced-motion).
const BrandBackground = () => {
  const { theme } = useTheme()
  const Background = BACKGROUNDS[theme] ?? AuroraBackground
  return <Background />
}

export default BrandBackground
