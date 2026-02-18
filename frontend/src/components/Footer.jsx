import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { getLogo } from '../api/axios'

const Footer = () => {
  const [logo, setLogo] = useState(null)

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

  return (
    <footer className="bg-sky-700 text-white relative z-10" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
      {/* Top Border Line */}
      <div className="w-full h-1 bg-white"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              {logo ? (
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white p-1">
                  <img 
                    src={logo.image} 
                    alt="Danphe Munal Logo" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-white/20">
                  DM
                </div>
              )}
              <span className="text-2xl font-bold">Danphe Munal</span>
            </div>
            <p className="text-white/90 mb-4">
              Your trusted agricultural trading company providing fresh, organic products from farm to table.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/90 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/90 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-white/90 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/team" className="text-white/90 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/cart" className="text-white/90 hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-white/90">
              <li>Vegetables</li>
              <li>Bee Keeping</li>
              <li>Ayurvedic Medicine</li>
              <li>Beauty Products</li>
              <li>Ganja T-shirt</li>
              <li>Fish</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-white mt-1 flex-shrink-0" />
                <span className="text-white/90">Chitwan, Bharatpur, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-white flex-shrink-0" />
                <span className="text-white/90">+977 980-2302556</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-white flex-shrink-0" />
                <span className="text-white/90">danfemunalorganicltd@gmail.com</span>
              </li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/90">
          <p>&copy; {new Date().getFullYear()} Danphe Munal Trading Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
