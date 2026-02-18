import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaLeaf, FaShoppingBag, FaUsers, FaArrowRight, FaEnvelope, FaPhone, FaChevronLeft, FaChevronRight, FaShoppingCart, FaBriefcase, FaBox, FaTh, FaSmile, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import ServicesCarousel from '../components/ServicesCarousel'
import MessageTicker from '../components/MessageTicker'
import { getServices, getProducts, getTeamMembers, getAboutUs, getCategories, getHeroImage, getStatistics } from '../api/axios'
import { useCart } from '../context/CartContext'

const Home = () => {
  const [services, setServices] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentProductSlide, setCurrentProductSlide] = useState(0)
  const [teamMembers, setTeamMembers] = useState({ shareholders: [], board_members: [] })
  const [aboutData, setAboutData] = useState(null)
  const [heroImage, setHeroImage] = useState(null)
  const [statistics, setStatistics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTeamTab, setActiveTeamTab] = useState('shareholders')
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0)
  const { addToCart } = useCart()

  // Handle social sidebar scroll limit
  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.querySelector('.social-sidebar')
      const footer = document.querySelector('footer')
      
      if (sidebar && footer) {
        const footerTop = footer.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        const sidebarHeight = sidebar.offsetHeight
        
        // Calculate when sidebar should stop (before footer)
        const stopPoint = windowHeight - sidebarHeight - 50 // 50px margin from footer
        
        if (footerTop < stopPoint) {
          sidebar.style.position = 'absolute'
          sidebar.style.top = 'auto'
          sidebar.style.bottom = `${footer.offsetHeight + 50}px`
          sidebar.style.transform = 'none'
        } else {
          sidebar.style.position = 'fixed'
          sidebar.style.top = '50%'
          sidebar.style.bottom = 'auto'
          sidebar.style.transform = 'translateY(-50%)'
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, productsRes, teamRes, aboutRes, categoriesRes, heroRes, statsRes] = await Promise.all([
          getServices(),
          getProducts(),
          getTeamMembers(),
          getAboutUs().catch(() => null),
          getCategories(),
          getHeroImage().catch(() => null),
          getStatistics().catch(() => null)
        ])
        setServices(servicesRes.data)
        setAllProducts(productsRes.data)
        setFeaturedProducts(productsRes.data.slice(0, 6))
        setCategories(categoriesRes.data)
        setTeamMembers(teamRes.data)
        if (aboutRes) {
          setAboutData(aboutRes.data)
        }
        if (heroRes) {
          setHeroImage(heroRes.data)
        }
        if (statsRes) {
          setStatistics(statsRes.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Get current team members based on active tab
  const currentTeamMembers = activeTeamTab === 'shareholders' 
    ? teamMembers.shareholders 
    : teamMembers.board_members

  // Calculate total slides (6 members per slide)
  const membersPerSlide = 6
  const totalSlides = Math.ceil(currentTeamMembers.length / membersPerSlide)

  // Get members for current slide
  const getCurrentSlideMembers = () => {
    const startIndex = currentTeamSlide * membersPerSlide
    return currentTeamMembers.slice(startIndex, startIndex + membersPerSlide)
  }

  // Handle slide navigation
  const nextSlide = () => {
    setCurrentTeamSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentTeamSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  // Reset slide when changing tabs
  const handleTabChange = (tab) => {
    setActiveTeamTab(tab)
    setCurrentTeamSlide(0)
  }

  // Product filtering and carousel
  const filteredProducts = selectedCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === parseInt(selectedCategory))

  const productsPerSlide = 6
  const totalProductSlides = Math.ceil(filteredProducts.length / productsPerSlide)

  const getCurrentProducts = () => {
    const startIndex = currentProductSlide * productsPerSlide
    return filteredProducts.slice(startIndex, startIndex + productsPerSlide)
  }

  const nextProductSlide = () => {
    setCurrentProductSlide((prev) => (prev + 1) % totalProductSlides)
  }

  const prevProductSlide = () => {
    setCurrentProductSlide((prev) => (prev - 1 + totalProductSlides) % totalProductSlides)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentProductSlide(0)
  }

  // Auto-slide for products
  useEffect(() => {
    if (filteredProducts.length <= productsPerSlide) return

    const interval = setInterval(() => {
      nextProductSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [filteredProducts.length, currentProductSlide])

  return (
    <div>
      <style dangerouslySetInnerHTML={{__html: `
        /* ================= STICKY SOCIAL SIDEBAR ================= */
        .social-sidebar {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 15px;
          background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
          padding: 20px 12px;
          border-radius: 50px 0 0 50px;
          box-shadow: -4px 0 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .social-sidebar-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          color: white;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          font-size: 20px;
        }

        .social-sidebar-link:hover {
          transform: scale(1.1);
        }

        .social-sidebar-link.facebook {
          background: #1877F2;
        }

        .social-sidebar-link.facebook:hover {
          background: #0d65d9;
          box-shadow: 0 0 15px rgba(24, 119, 242, 0.6);
        }

        .social-sidebar-link.instagram {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }

        .social-sidebar-link.instagram:hover {
          background: linear-gradient(45deg, #d87e2a 0%, #d4572e 25%, #c91f38 50%, #b81e59 75%, #a8157a 100%);
          box-shadow: 0 0 15px rgba(220, 39, 67, 0.6);
        }

        .social-sidebar-link.whatsapp {
          background: #25D366;
        }

        .social-sidebar-link.whatsapp:hover {
          background: #1fb855;
          box-shadow: 0 0 15px rgba(37, 211, 102, 0.6);
        }

        .social-sidebar-link.youtube {
          background: #FF0000;
        }

        .social-sidebar-link.youtube:hover {
          background: #cc0000;
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
        }

        @media (max-width: 768px) {
          .social-sidebar {
            padding: 12px 8px;
            gap: 10px;
            border-radius: 30px 0 0 30px;
          }
          
          .social-sidebar-link {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .social-sidebar {
            padding: 10px 6px;
            gap: 8px;
            border-radius: 25px 0 0 25px;
          }
          
          .social-sidebar-link {
            width: 32px;
            height: 32px;
            font-size: 13px;
          }
        }
      `}} />

      {/* Sticky Social Media Sidebar */}
      <div className="social-sidebar">
        <a href="https://www.facebook.com/profile.php?id=61587213345463" target="_blank" rel="noopener noreferrer" className="social-sidebar-link facebook" title="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/danfemunalorganic/" target="_blank" rel="noopener noreferrer" className="social-sidebar-link instagram" title="Instagram">
          <FaInstagram />
        </a>
        <a href="https://wa.me/980-2302556" target="_blank" rel="noopener noreferrer" className="social-sidebar-link whatsapp" title="WhatsApp">
          <FaWhatsapp />
        </a>
        <a href="https://www.youtube.com/@danphemunal" target="_blank" rel="noopener noreferrer" className="social-sidebar-link youtube" title="YouTube">
          <FaYoutube />
        </a>
      </div>

      {/* Hero Section with Background Image */}
      <section className="relative h-[650px] overflow-hidden">
        {/* Background Image with Overlay */}
        {heroImage ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroImage.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950"></div>
        )}
        
        {/* Decorative Circles with Morph Animation */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-glow animate-morph"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-scale-pulse animate-morph"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-float-slow"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 h-full flex items-center">
          <div className="w-full">
            {/* Center Content - All floating together */}
            <div className="text-white text-center animate-fade-in-scale animate-float-slow">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight px-4">
                DANFE MUNAL
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-10 text-white/90 leading-relaxed max-w-5xl mx-auto px-4">
                Explore our services and start growing your farm with confidence
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                <Link 
                  to="/about"
                  className="inline-block px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg bg-white hover:bg-gray-100 text-red-600 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Explore More About Us
                </Link>
                <Link 
                  to="/products"
                  className="inline-block px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg bg-red-800 hover:bg-red-900 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Our Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message Ticker - Outside of hero image */}
      <div className="relative z-20">
        <MessageTicker />
      </div>

      {/* About Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border-4 border-green-500 rounded-full animate-rotate-slow"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-green-400 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-green-200 rounded-full blur-3xl animate-float-medium"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-sky-700 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-scale" style={{ backgroundColor: '#0369a1' }}>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {aboutData?.title || 'About Danphe Munal'}
              </h2>
              <p className="text-xl text-white/90 mb-3">Learn about our mission and values</p>
              <div className="w-24 h-1 bg-white"></div>
            </div>
            
            {/* Single Card with Text and Image */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Text Content */}
                <div className="flex flex-col w-full">
                  <h3 className="text-2xl font-bold text-red-500 mb-3">
                    Welcome to Danphe Munal
                  </h3>
                  <div className="w-24 h-1 bg-red-500 mb-6"></div>
                  <div className="mb-6 w-full break-words">
                    {aboutData ? (
                      <p className="text-lg text-gray-700 leading-relaxed text-justify whitespace-normal break-words overflow-wrap-anywhere">
                        {aboutData.description}
                      </p>
                    ) : (
                      <>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed text-justify break-words">
                          Danphe Munal is a leading agricultural trading company dedicated to bringing fresh, organic products from our farms to your table. We work directly with local farmers to ensure the highest quality and sustainability.
                        </p>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed text-justify break-words">
                          Our mission is to empower farmers with eco-friendly methods, modern tools, and support to grow their businesses while nourishing the planet naturally and responsibly.
                        </p>
                      </>
                    )}
                  </div>
                  <Link 
                    to="/about"
                    className="inline-flex items-center space-x-2 font-semibold text-lg group"
                    style={{ color: 'rgb(3, 105, 161)' }}
                  >
                    <span>Learn more about us</span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
                
                {/* Image */}
                <div className="overflow-hidden rounded-2xl h-auto w-full">
                  <img
                    src={aboutData?.image || "https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=1000&auto=format&fit=crop"}
                    alt="About Us"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-sky-700 relative overflow-hidden pattern-hexagon" style={{ backgroundColor: '#0369a1' }}>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-30 animate-pulse-glow animate-morph"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl opacity-20 animate-scale-pulse animate-morph"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-down">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Why Choose Us</h2>
            <p className="text-xl text-white/90 mb-3">Quality products from farm to your table</p>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: FaLeaf, 
                title: '100% Organic', 
                desc: 'All our products are naturally grown without harmful chemicals',
                color: 'from-green-500 to-emerald-600'
              },
              { 
                icon: FaShoppingBag, 
                title: 'Fresh Products', 
                desc: 'Direct from farm to ensure maximum freshness',
                color: 'from-blue-500 to-cyan-600'
              },
              { 
                icon: FaUsers, 
                title: 'Trusted Team', 
                desc: 'Experienced professionals dedicated to quality',
                color: 'from-purple-500 to-pink-600'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 pattern-grid opacity-30"></div>
        <div className="absolute top-20 right-1/3 w-80 h-80 bg-red-100/30 rounded-full blur-3xl animate-pulse-glow animate-morph"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-green-100/30 rounded-full blur-3xl animate-scale-pulse animate-morph"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
            </div>
          ) : (
            <>
              <div className="relative bg-sky-700 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-scale" style={{ backgroundColor: '#0369a1' }}>
                <div className="text-center mb-8">
                  <h2 className="text-5xl font-bold text-white mb-3">Featured Products</h2>
                  <p className="text-xl text-white/90 mb-3">Check out our most popular items</p>
                  <div className="w-24 h-1 bg-white mx-auto"></div>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex bg-white rounded-lg shadow-lg p-1 flex-wrap gap-1">
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        selectedCategory === 'all'
                          ? 'bg-red-500 text-white shadow-md'
                          : 'text-gray-700 hover:text-red-500'
                      }`}
                    >
                      All
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id.toString())}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          selectedCategory === cat.id.toString()
                            ? 'bg-red-500 text-white shadow-md'
                            : 'text-gray-700 hover:text-red-500'
                        }`}
                      >
                        {cat.name.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Carousel Container */}
                <div className="relative">
                  {/* Navigation Arrows */}
                  {totalProductSlides > 1 && (
                    <>
                      <button
                        onClick={prevProductSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-100 text-green-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <FaChevronLeft className="text-xl" />
                      </button>
                      <button
                        onClick={nextProductSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-100 text-green-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <FaChevronRight className="text-xl" />
                      </button>
                    </>
                  )}

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getCurrentProducts().map((product, index) => (
                      <div 
                        key={product.id} 
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100"
                        style={{ 
                          animationDelay: `${index * 100}ms`,
                          borderColor: '#e5e7eb'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'white'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      >
                        {/* Separate Card for Image */}
                        <div className="p-3 m-3 rounded-xl" style={{ background: 'linear-gradient(to bottom right, rgba(3, 105, 161, 0.1), rgba(3, 105, 161, 0.05))' }}>
                          <div className="relative overflow-hidden h-48 rounded-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                        
                        <div className="p-5 pt-0">
                          <h3 
                            className="text-xl font-semibold text-gray-900 mb-2 transition-colors leading-tight" 
                            style={{ fontFamily: 'Poppins, sans-serif', color: '#111827' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(3, 105, 161)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}
                          >
                            {product.name}
                          </h3>
                          
                          <div className="mb-3">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold inline-block shadow-sm">
                              {product.category_name}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              product.stock === 0 
                                ? 'bg-gray-200 text-gray-600' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {product.stock === 0 ? 'Out of Stock' : `Stock: ${product.stock}`}
                            </span>
                          </div>

                          <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 tracking-tight drop-shadow-md" style={{ fontFamily: 'Playfair Display, serif' }}>
                              NPR {product.price}
                            </span>
                            <button
                              onClick={() => addToCart(product)}
                              disabled={product.stock === 0}
                              className={`p-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg ${
                                product.stock === 0
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'text-white'
                              }`}
                              style={{ backgroundColor: product.stock === 0 ? '' : 'rgb(3, 105, 161)' }}
                              onMouseEnter={(e) => {
                                if (product.stock !== 0) {
                                  e.currentTarget.style.backgroundColor = 'rgb(2, 84, 129)'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (product.stock !== 0) {
                                  e.currentTarget.style.backgroundColor = 'rgb(3, 105, 161)'
                                }
                              }}
                            >
                              <FaShoppingCart className="text-lg" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Slide Indicators */}
                  {totalProductSlides > 1 && (
                    <div className="flex justify-center mt-8 space-x-2">
                      {[...Array(totalProductSlides)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentProductSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentProductSlide === index
                              ? 'bg-white w-8'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center mt-12">
                <Link to="/products" className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span className="text-lg">View All Products</span>
                  <FaArrowRight className="text-xl" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-20 bg-sky-700 relative overflow-hidden pattern-hexagon" style={{ backgroundColor: '#0369a1' }}>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-30 animate-pulse-glow animate-morph"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl opacity-20 animate-scale-pulse animate-morph"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-fade-in-down">
            <h2 className="text-5xl font-bold text-white mb-3">Our Services</h2>
            <p className="text-xl text-white/90 mb-3">Discover what we offer to serve you better</p>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-[500px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
            </div>
          ) : (
            <ServicesCarousel services={services} />
          )}
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-float-medium animate-morph"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-float-slow animate-morph"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
            </div>
          ) : (
            <>
              <div className="relative bg-sky-700 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-scale" style={{ backgroundColor: '#0369a1' }}>
                <div className="text-center mb-8">
                  <h2 className="text-5xl font-bold text-white mb-3">Our Team</h2>
                  <p className="text-xl text-white/90 mb-3">Meet the dedicated people behind our success</p>
                  <div className="w-24 h-1 bg-white mx-auto"></div>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex bg-white rounded-lg shadow-lg p-1">
                    <button
                      onClick={() => handleTabChange('shareholders')}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        activeTeamTab === 'shareholders'
                          ? 'bg-red-500 text-white shadow-md'
                          : 'text-gray-700 hover:text-red-500'
                      }`}
                    >
                      Shareholders
                    </button>
                    <button
                      onClick={() => handleTabChange('board_members')}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        activeTeamTab === 'board_members'
                          ? 'bg-red-500 text-white shadow-md'
                          : 'text-gray-700 hover:text-red-500'
                      }`}
                    >
                      Board Members
                    </button>
                  </div>
                </div>
                
                {/* Carousel Container */}
                <div className="relative">
                  {/* Navigation Arrows */}
                  {totalSlides > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                        style={{ color: 'rgb(3, 105, 161)' }}
                      >
                        <FaChevronLeft className="text-xl" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                        style={{ color: 'rgb(3, 105, 161)' }}
                      >
                        <FaChevronRight className="text-xl" />
                      </button>
                    </>
                  )}

                  {/* Team Members Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getCurrentSlideMembers().map((member, index) => (
                      <div 
                        key={member.id} 
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              {member.email && (
                                <div className="flex items-center space-x-2 text-xs mb-2 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                                  <FaEnvelope className="flex-shrink-0" />
                                  <span className="truncate">{member.email}</span>
                                </div>
                              )}
                              {member.phone && (
                                <div className="flex items-center space-x-2 text-xs bg-white/20 backdrop-blur-sm rounded-lg p-2">
                                  <FaPhone className="flex-shrink-0" />
                                  <span>{member.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-5 bg-gradient-to-b from-white to-gray-50">
                          <h3 
                            className="text-lg font-bold text-gray-900 mb-1 transition-colors"
                            style={{ color: '#111827' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(3, 105, 161)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}
                          >
                            {member.name}
                          </h3>
                          <p className="text-sm font-semibold mb-2" style={{ color: 'rgb(3, 105, 161)' }}>{member.position}</p>
                          <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                            {member.role_display}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Slide Indicators */}
                  {totalSlides > 1 && (
                    <div className="flex justify-center mt-8 space-x-2">
                      {[...Array(totalSlides)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTeamSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentTeamSlide === index
                              ? 'bg-white w-8'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center mt-12">
                <Link to="/team" className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span className="text-lg">View All Team Members</span>
                  <FaArrowRight className="text-xl" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Our Impact Section */}
      {statistics && (
        <section className="py-20 bg-sky-700 relative overflow-hidden pattern-hexagon" style={{ backgroundColor: '#0369a1' }}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-30 animate-pulse-glow animate-morph"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl opacity-20 animate-scale-pulse animate-morph"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-fade-in-down">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Our Impact</h2>
              <p className="text-xl text-white/90 mb-3">Numbers that speak for our success</p>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: FaBriefcase, 
                  value: statistics.total_business,
                  label: 'Years in Business',
                  suffix: '+',
                  color: 'from-green-500 to-emerald-600'
                },
                { 
                  icon: FaBox, 
                  value: statistics.total_products,
                  label: 'Products',
                  suffix: '+',
                  color: 'from-blue-500 to-cyan-600'
                },
                { 
                  icon: FaTh, 
                  value: statistics.total_categories,
                  label: 'Categories',
                  suffix: '+',
                  color: 'from-purple-500 to-pink-600'
                },
                { 
                  icon: FaSmile, 
                  value: statistics.total_customers,
                  label: 'Happy Customers',
                  suffix: '+',
                  color: 'from-orange-500 to-red-600'
                }
              ].map((stat, index) => (
                <CounterCard key={index} {...stat} delay={index * 100} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

// Counter Card Component with Animation
const CounterCard = ({ icon: Icon, value, label, suffix, color, delay }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById(`counter-${label}`)
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [value, label, hasAnimated])

  return (
    <div 
      id={`counter-${label}`}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto`}>
        <Icon className="text-3xl" />
      </div>
      <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
        {count}{suffix}
      </h3>
      <p className="text-gray-600 leading-relaxed font-semibold">{label}</p>
    </div>
  )
}

export default Home
