import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const ServicesCarousel = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  useEffect(() => {
    if (services.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, services.length - itemsPerPage)
        return prevIndex >= maxIndex ? 0 : prevIndex + 1
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [services.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, services.length - itemsPerPage)
      return prevIndex === 0 ? maxIndex : prevIndex - 1
    })
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, services.length - itemsPerPage)
      return prevIndex >= maxIndex ? 0 : prevIndex + 1
    })
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No services available</p>
      </div>
    )
  }

  const visibleServices = services.slice(currentIndex, currentIndex + itemsPerPage)
  const totalPages = Math.ceil(services.length / itemsPerPage)

  return (
    <div className="relative group">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleServices.map((service, index) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group/card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Image Card */}
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 p-4">
              <div className="relative h-full rounded-xl overflow-hidden shadow-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Content Card */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-red-500 mb-3 group-hover/card:text-red-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-900 leading-relaxed line-clamp-3">
                {service.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {services.length > itemsPerPage && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
            style={{ color: 'rgb(3, 105, 161)' }}
          >
            <FaChevronLeft className="text-xl" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
            style={{ color: 'rgb(3, 105, 161)' }}
          >
            <FaChevronRight className="text-xl" />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / itemsPerPage) === index
                    ? 'w-8'
                    : 'bg-gray-300 hover:bg-gray-400 w-3'
                }`}
                style={{ 
                  backgroundColor: Math.floor(currentIndex / itemsPerPage) === index 
                    ? 'rgb(3, 105, 161)' 
                    : undefined 
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ServicesCarousel
