import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaCalendar, FaMapMarkerAlt, FaArrowLeft, FaClock } from 'react-icons/fa'
import { getEventById } from '../api/axios'
import { useLanguage } from '../context/LanguageContext'

const EventDetail = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id)
        setEvent(response.data)
      } catch (error) {
        console.error('Error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const formatDateTime = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  if (loading) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mt-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h2>
            <Link 
              to="/events" 
              className="inline-flex items-center space-x-2 text-lg font-semibold hover:underline"
              style={{ color: 'rgb(3, 105, 161)' }}
            >
              <FaArrowLeft />
              <span>Back to Events</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/events" 
          className="inline-flex items-center space-x-2 text-white hover:text-gray-200 mb-6 text-lg font-semibold transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Events</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-8 md:p-12">
          {/* Event Image with padding */}
          <div className="relative h-96 overflow-hidden rounded-3xl mb-8">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Event Details */}
          <div>
            {/* Event Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="rounded-2xl p-6 shadow-md" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
                <div className="flex items-start space-x-4">
                  <div className="bg-white rounded-full p-3 shadow-md">
                    <FaCalendar className="text-2xl" style={{ color: 'rgb(3, 105, 161)' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Event Date</h3>
                    <p className="text-lg font-bold text-white">{formatDate(event.event_date)}</p>
                  </div>
                </div>
              </div>

              {event.location && (
                <div className="rounded-2xl p-6 shadow-md" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
                  <div className="flex items-start space-x-4">
                    <div className="bg-white rounded-full p-3 shadow-md">
                      <FaMapMarkerAlt className="text-2xl text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">Location</h3>
                      <p className="text-lg font-bold text-white">{event.location}</p>
                    </div>
                  </div>
                </div>
              )}

              {event.created_at && (
                <div className="rounded-2xl p-6 shadow-md" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
                  <div className="flex items-start space-x-4">
                    <div className="bg-white rounded-full p-3 shadow-md">
                      <FaClock className="text-2xl text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">Posted On</h3>
                      <p className="text-lg font-bold text-white">{formatDateTime(event.created_at)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Event Description */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-inner">
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'rgb(3, 105, 161)' }}>
                {language === 'nepali' ? 'यस कार्यक्रमको बारेमा' : 'About This Event'}
              </h2>
              <div className="w-24 h-1 mb-6" style={{ backgroundColor: 'rgb(3, 105, 161)' }}></div>
              
              {/* Show Nepali description if language is Nepali and it exists, otherwise show English */}
              {language === 'nepali' && event.description_nepali ? (
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line text-justify italic">
                  {event.description_nepali}
                </p>
              ) : (
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line text-justify italic">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail
