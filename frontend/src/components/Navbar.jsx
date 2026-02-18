import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaShoppingCart, FaBars, FaTimes, FaLanguage } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { getLogo } from '../api/axios'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [logo, setLogo] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showNavLinks, setShowNavLinks] = useState(true)
  const { getCartCount } = useCart()
  const { language, toggleLanguage, t } = useLanguage()
  const location = useLocation()

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await getLogo()
        setLogo(response.data)
      } catch (error) {
        console.error('Error fetching logo:', error)
      }
    }
    fetchLogo()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        // At the top of the page - show everything
        setIsVisible(true)
        setShowNavLinks(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide everything
        setIsVisible(false)
        setShowNavLinks(false)
      } else {
        // Scrolling up - hide everything until reaching top
        setIsVisible(false)
        setShowNavLinks(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const navLinks = [
    { key: 'home', path: '/' },
    { key: 'aboutUs', path: '/about' },
    { key: 'product', path: '/products' },
    { key: 'team', path: '/team' },
    { key: 'events', path: '/events' },
    { key: 'contactUs', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path
  const isHomePage = location.pathname === '/'

  return (
    <nav className={`fixed left-0 right-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`} style={{ backgroundColor: isHomePage ? 'transparent' : 'rgb(3, 105, 161)', top: '1rem' }}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo and Brand in Rounded Rectangle */}
          {showNavLinks && (
            <Link to="/" className="flex items-center group">
              <div className="bg-white/20 rounded-full px-2 py-2 shadow-lg flex items-center space-x-2 sm:space-x-3 hover:shadow-xl transition-all duration-300 hover:bg-white/30">
                {logo ? (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center">
                    <img 
                      src={logo.image} 
                      alt="Danphe Munal Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base" style={{ background: 'linear-gradient(to bottom right, rgb(3, 105, 161), rgb(2, 84, 129))' }}>
                    DM
                  </div>
                )}
                <span className="text-base sm:text-xl font-bold text-white pr-2 sm:pr-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                  Danfe Munal
                </span>
              </div>
            </Link>
          )}

          {/* Desktop Navigation with Transparent Background */}
          {showNavLinks && (
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-white/20 rounded-full px-2 py-2 shadow-lg transition-opacity duration-300">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 xl:px-6 py-2 text-sm xl:text-base font-medium transition-all duration-300 ${
                    isActive(link.path)
                    ? 'bg-red-500 text-white rounded-full shadow-lg'
                    : 'text-white hover:text-white hover:bg-white/20 rounded-full'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            
            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              className="relative ml-2 bg-red-500 hover:bg-red-600 text-white p-2 xl:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <FaShoppingCart className="text-lg xl:text-xl" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-red-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="ml-2 bg-white/20 hover:bg-white/30 text-white px-3 xl:px-4 py-2 rounded-full transition-all duration-300 shadow-lg flex items-center space-x-1 xl:space-x-2"
              title="Toggle Language"
            >
              <FaLanguage className="text-base xl:text-lg" />
              <span className="text-xs xl:text-sm font-medium">{language === 'english' ? 'नेपाली' : 'English'}</span>
            </button>
          </div>
          )}

          {/* Mobile Menu Button */}
          {showNavLinks && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white hover:text-red-200 focus:outline-none p-2"
            >
              {isOpen ? <FaTimes className="text-xl sm:text-2xl" /> : <FaBars className="text-xl sm:text-2xl" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-sm shadow-lg mt-2 mx-2 rounded-2xl">
          <div className="px-3 sm:px-4 pt-2 pb-4 space-y-1 sm:space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  isActive(link.path)
                    ? 'bg-red-500 text-white'
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors text-sm sm:text-base"
            >
              <span>{t('cart')}</span>
              <div className="flex items-center space-x-2">
                <FaShoppingCart />
                {getCartCount() > 0 && (
                  <span className="bg-white text-red-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </div>
            </Link>
            
            {/* Language Toggle Button for Mobile */}
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              <span className="flex items-center space-x-2">
                <FaLanguage />
                <span>Language</span>
              </span>
              <span className="text-sm font-bold">{language === 'english' ? 'नेपाली' : 'English'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
