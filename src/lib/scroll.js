// Scroll suave compartido para todos los CTAs de la página
export const scrollToSection = (targetId) => {
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
