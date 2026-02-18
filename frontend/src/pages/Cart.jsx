import React, { useState, useEffect } from 'react'
import { FaTrash, FaMinus, FaPlus, FaTimes, FaMoneyBillWave, FaQrcode } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { getPaymentQR, createOrder } from '../api/axios'
import { toast } from 'react-toastify'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [qrCode, setQrCode] = useState(null)
  const [screenshot, setScreenshot] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const response = await getPaymentQR()
        setQrCode(response.data)
      } catch (error) {
        console.log('No QR code available - QR payment will be disabled')
        // Don't show error, just disable QR payment option
      }
    }
    fetchQR()
  }, [])

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setScreenshot(file)
      toast.success('Screenshot uploaded')
    }
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    if (paymentMethod === 'qr' && !screenshot) {
      toast.error('Please upload payment screenshot')
      return
    }

    try {
      const orderData = {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        payment_method: paymentMethod,
        total_amount: getCartTotal().toFixed(2),
        items: cart.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price).toFixed(2)
        }))
      }

      if (screenshot) {
        orderData.payment_screenshot = screenshot
      }

      const response = await createOrder(orderData)
      console.log('Order created:', response.data)
      toast.success('Order placed successfully!')
      clearCart()
      setShowCheckout(false)
      setCustomerInfo({ name: '', email: '', phone: '', address: '' })
      setScreenshot(null)
      setPaymentMethod('cash')
    } catch (error) {
      console.error('Error placing order:', error)
      console.error('Error response:', error.response?.data)
      toast.error(error.response?.data?.detail || 'Failed to place order. Please try again.')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-3xl font-bold text-white mb-4 mt-8">Your cart is empty</h2>
            <p className="text-white/90 mb-8">Add some products to get started!</p>
            <a href="/products" className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-block">
              Browse Products
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-white text-center mb-12 mt-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="card p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <FaTimes className="text-xl" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors"
                        >
                          <FaMinus />
                        </button>
                        <span className="text-xl font-semibold w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <div className="text-2xl font-bold" style={{ color: 'rgb(3, 105, 161)' }}>
                        NPR {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>NPR {getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span style={{ color: 'rgb(3, 105, 161)' }}>NPR {getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(!showCheckout)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl w-full mb-4"
              >
                {showCheckout ? 'Hide Checkout' : 'Proceed to Checkout'}
              </button>

              {showCheckout && (
                <form onSubmit={handleSubmitOrder} className="space-y-4 mt-6 border-t pt-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <textarea
                      required
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cash')}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                          paymentMethod === 'cash'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 hover:border-primary-300'
                        }`}
                      >
                        <FaMoneyBillWave className={`text-2xl ${paymentMethod === 'cash' ? 'text-primary-500' : 'text-gray-400'}`} />
                        <span className="font-semibold">Cash on Delivery</span>
                      </button>

                      {qrCode && (
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('qr')}
                          className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                            paymentMethod === 'qr'
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-300 hover:border-primary-300'
                          }`}
                        >
                          <FaQrcode className={`text-2xl ${paymentMethod === 'qr' ? 'text-primary-500' : 'text-gray-400'}`} />
                          <span className="font-semibold">QR Payment</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {paymentMethod === 'qr' && qrCode && (
                    <div className="border-2 border-primary-200 rounded-lg p-4 bg-primary-50">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Scan QR Code to Pay</p>
                      <img
                        src={qrCode.qr_image}
                        alt="Payment QR"
                        className="w-48 h-48 mx-auto mb-4 rounded-lg"
                      />
                      <label className="block">
                        <span className="text-sm font-semibold text-gray-700 mb-2 block">Upload Payment Screenshot</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotChange}
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-600 cursor-pointer"
                        />
                      </label>
                      {screenshot && (
                        <p className="text-sm mt-2" style={{ color: 'rgb(3, 105, 161)' }}>✓ Screenshot uploaded</p>
                      )}
                    </div>
                  )}

                  <button type="submit" className="btn-primary w-full">
                    Place Order
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
