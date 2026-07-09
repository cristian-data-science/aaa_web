import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Estado inicial correcto desde el primer render para evitar el flash
  // desktop->movil (layout shift) que producia arrancar en undefined
  const [isMobile, setIsMobile] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
  )

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isMobile
}
