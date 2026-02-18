import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CartProvider } from './context/CartContext'
import { LanguageProvider } from './context/LanguageContext'
import { FaLeaf } from 'react-icons/fa'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import MessageTicker from './components/MessageTicker'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Team from './pages/Team'
import About from './pages/About'
import Contact from './pages/Contact'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
          {/* Floating Leaves Background - Global */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-leaf"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${8 + Math.random() * 4}s`
                }}
              >
                <FaLeaf 
                  className="transform rotate-45" 
                  style={{ 
                    fontSize: `${20 + Math.random() * 40}px`,
                    color: 'rgba(3, 105, 161, 0.4)'
                  }}
                />
              </div>
            ))}
          </div>

          <Navbar />
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<div className="pt-20"><About /></div>} />
              <Route path="/products" element={<div className="pt-20"><Products /></div>} />
              <Route path="/cart" element={<div className="pt-20"><Cart /></div>} />
              <Route path="/team" element={<div className="pt-20"><Team /></div>} />
              <Route path="/events" element={<div className="pt-20"><Events /></div>} />
              <Route path="/events/:id" element={<div className="pt-20"><EventDetail /></div>} />
              <Route path="/contact" element={<div className="pt-20"><Contact /></div>} />
              <Route path="*" element={<div className="pt-20"><NotFound /></div>} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
          <ToastContainer 
            position="bottom-right" 
            autoClose={3000}
            toastStyle={{
              backgroundColor: 'rgb(3, 105, 161)',
              color: 'white'
            }}
          />
        </div>
      </Router>
    </CartProvider>
    </LanguageProvider>
  )
}

export default App
