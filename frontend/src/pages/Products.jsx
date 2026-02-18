import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import { getProducts, getCategories } from '../api/axios'

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(),
          getCategories()
        ])
        setProducts(productsRes.data)
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === parseInt(selectedCategory)
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categoryButtons = [
    { id: 'all', name: 'All Products' },
    ...categories.map(cat => ({ id: cat.id.toString(), name: cat.name.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }))
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* White Container for Products Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 mt-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: 'rgb(3, 105, 161)' }}>Our Products</h1>
            <p className="text-xl text-gray-700">Browse our wide selection of fresh, organic products</p>
            <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: 'rgb(3, 105, 161)' }}></div>
          </div>

          {/* Search and Category Filter */}
          <div className="mb-12 space-y-6">
            {/* Search Box */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-2xl">
                <input
                  type="text"
                  placeholder="Search products by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-xl shadow-lg border-2 border-white focus:outline-none focus:ring-2 text-gray-800 text-lg"
                  style={{ 
                    borderColor: 'transparent',
                    focusBorderColor: 'rgb(3, 105, 161)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgb(3, 105, 161)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(3, 105, 161, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'transparent'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center">
              <div className="inline-flex bg-white rounded-lg shadow-lg p-1 flex-wrap gap-1">
                {categoryButtons.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? 'bg-red-500 text-white shadow-md'
                        : 'text-gray-700 hover:text-red-500'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4" style={{ borderTopColor: 'rgb(3, 105, 161)' }}></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-700">No products found in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
