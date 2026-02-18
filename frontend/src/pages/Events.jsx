import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa'
import { getEvents } from '../api/axios'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents()
        setEvents(response.data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 mt-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4" style={{ color: 'rgb(3, 105, 161)' }}>Our Events</h1>
            <p className="text-xl text-gray-600">Stay updated with our latest events and activities</p>
            <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: 'rgb(3, 105, 161)' }}></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4" style={{ borderTopColor: 'rgb(3, 105, 161)' }}></div>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 transform hover:-translate-y-2"
                  style={{ borderColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgb(3, 105, 161)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors" 
                        style={{ color: '#1f2937' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(3, 105, 161)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#1f2937'}>
                      {event.title}
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <FaCalendar className="mr-2" style={{ color: 'rgb(3, 105, 161)' }} />
                      <span>{formatDate(event.event_date)}</span>
                    </div>

                    {event.location && (
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <FaMapMarkerAlt className="mr-2 text-red-500" />
                        <span>{event.location}</span>
                      </div>
                    )}

                    <p className="text-gray-700 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No events available at the moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Events
