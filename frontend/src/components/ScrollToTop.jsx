import { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group transition-all duration-300 transform hover:scale-110 hover:-translate-y-3"
          aria-label="Scroll to top"
        >
          {/* Transparent Circle with Grey Border */}
          <div className="relative bg-white/80 backdrop-blur-sm border-2 border-gray-300 p-3 rounded-full shadow-lg hover:shadow-2xl hover:border-red-400 transition-all duration-300">
            {/* Rocket Image - Pointing Upward */}
            <img 
              src="https://static.vecteezy.com/system/resources/previews/022/996/345/original/3d-space-rocket-render-with-transparent-background-free-png.png" 
              alt="Rocket"
              className="w-10 h-10 object-contain group-hover:brightness-110 transition-all duration-300"
            />
            
            {/* Flame Trail Effect on Hover */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-orange-400 via-red-400 to-transparent rounded-full blur-md opacity-0 group-hover:opacity-80 transition-all duration-300"></div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-b from-yellow-300 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-60 transition-all duration-300"></div>
          </div>
          
          {/* Sparkle Effects on Hover */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      )}
    </>
  )
}

export default ScrollToTop
