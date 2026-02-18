import { useCart } from '../context/CartContext'
import { FaShoppingCart } from 'react-icons/fa'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100"
      style={{ borderColor: '#e5e7eb' }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgb(3, 105, 161)'}
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
  )
}

export default ProductCard
