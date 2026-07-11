import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { ExperienceProvider, useExperience } from './experiences/ExperienceContext'
import ExperienceSwitcher from './experiences/ExperienceSwitcher'
import { useLenis } from './hooks/use-lenis'

// Cada experiencia es un árbol completo y se carga solo al activarse
const KernelExperience = lazy(() => import('./experiences/kernel/KernelExperience'))
const FolioExperience = lazy(() => import('./experiences/folio/FolioExperience'))
const OrbitalExperience = lazy(() => import('./experiences/orbit/OrbitalExperience'))

const EXPERIENCE_VIEWS = {
  kernel: KernelExperience,
  folio: FolioExperience,
  orbit: OrbitalExperience,
}

// Fallback mínimo mientras carga el chunk de la experiencia
const ExperienceLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center" aria-hidden="true">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent opacity-40" />
  </div>
)

const ExperienceView = () => {
  const { experience } = useExperience()
  const View = EXPERIENCE_VIEWS[experience] ?? OrbitalExperience
  return (
    <Suspense fallback={<ExperienceLoader />}>
      {/* key fuerza remount limpio al cambiar (los efectos se re-inician) */}
      <View key={experience} />
    </Suspense>
  )
}

function App() {
  // Smooth scroll premium (solo desktop, respeta reduced-motion)
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <ExperienceProvider>
        <ExperienceSwitcher />
        <ExperienceView />
      </ExperienceProvider>
    </MotionConfig>
  )
}

export default App
