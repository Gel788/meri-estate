// Утилита для анимаций при скролле
export const observeElements = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Находим все элементы с классом для анимации
  const elements = document.querySelectorAll('.animate-on-scroll')
  elements.forEach(el => observer.observe(el))
}

export const initScrollAnimations = () => {
  if (typeof window !== 'undefined') {
    observeElements()
    
    // Переинициализация при изменении контента
    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })
  }
}

