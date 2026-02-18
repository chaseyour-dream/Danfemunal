import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getProducts = () => api.get('/products/')
export const getProductsByCategory = (category) => api.get(`/products/by_category/?category=${category}`)
export const getCategories = () => api.get('/products/categories/')
export const getServices = () => api.get('/services/')
export const getTeamMembers = () => api.get('/team/by_role/')
export const getPaymentQR = () => api.get('/orders/payment-qr/active/')
export const getAboutUs = () => api.get('/about/active/')
export const getHeroImage = () => api.get('/hero/active/')
export const getLogo = () => api.get('/logo/active/')
export const getLeadershipMessages = () => api.get('/leadership/')
export const getStatistics = () => api.get('/statistics/active/')
export const submitContactForm = (data) => api.post('/contact/', data)
export const getEvents = () => api.get('/events/')
export const getEventById = (id) => api.get(`/events/${id}/`)
export const getTickerMessages = () => api.get('/ticker/')
export const createOrder = (orderData) => {
  // If there's a file, use FormData
  if (orderData.payment_screenshot) {
    const formData = new FormData()
    
    formData.append('customer_name', orderData.customer_name)
    formData.append('customer_email', orderData.customer_email)
    formData.append('customer_phone', orderData.customer_phone)
    formData.append('customer_address', orderData.customer_address)
    formData.append('payment_method', orderData.payment_method)
    formData.append('total_amount', orderData.total_amount)
    formData.append('items', JSON.stringify(orderData.items))
    formData.append('payment_screenshot', orderData.payment_screenshot)
    
    return api.post('/orders/orders/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } else {
    // Otherwise send as JSON
    return api.post('/orders/orders/', {
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      customer_phone: orderData.customer_phone,
      customer_address: orderData.customer_address,
      payment_method: orderData.payment_method,
      total_amount: orderData.total_amount,
      items: orderData.items
    })
  }
}

export default api
