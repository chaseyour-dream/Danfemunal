import { Link } from 'react-router-dom'
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full shadow-lg" style={{ backgroundColor: 'rgba(3, 105, 161, 0.1)' }}>
              <FaExclamationTriangle className="text-6xl" style={{ color: 'rgb(3, 105, 161)' }} />
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-8xl md:text-9xl font-bold mb-4" style={{ color: 'rgb(3, 105, 161)' }}>
            404
          </h1>
          
          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Decorative Line */}
          <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: 'rgb(3, 105, 161)' }}></div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg font-semibold text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: 'rgb(3, 105, 161)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(2, 84, 129)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(3, 105, 161)'}
            >
              <FaHome />
              <span>Go to Homepage</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg font-semibold rounded-full border-2 transition-all duration-300 transform hover:scale-105"
              style={{ 
                borderColor: 'rgb(3, 105, 161)',
                color: 'rgb(3, 105, 161)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(3, 105, 161)'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'rgb(3, 105, 161)'
              }}
            >
              <span>Go Back</span>
            </button>
          </div>

          {/* Additional Help Text */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Looking for something specific? Try these popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/products" className="text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" style={{ color: 'rgb(3, 105, 161)' }}>
                Products
              </Link>
              <Link to="/about" className="text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" style={{ color: 'rgb(3, 105, 161)' }}>
                About Us
              </Link>
              <Link to="/contact" className="text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" style={{ color: 'rgb(3, 105, 161)' }}>
                Contact
              </Link>
              <Link to="/events" className="text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" style={{ color: 'rgb(3, 105, 161)' }}>
                Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
