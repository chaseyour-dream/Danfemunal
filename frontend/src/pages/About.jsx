import { useState, useEffect } from 'react'
import { getAboutUs } from '../api/axios'

const About = () => {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await getAboutUs()
        setAboutData(response.data)
      } catch (error) {
        console.error('Error fetching about us:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'rgb(3, 105, 161)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 mt-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-3" style={{ color: 'rgb(3, 105, 161)' }}>
              {aboutData?.title || 'About Us'}
            </h1>
            <p className="text-xl text-gray-600 mb-3">Learn about our mission and values</p>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'rgb(3, 105, 161)' }}></div>
          </div>

          {aboutData ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {aboutData.image && (
                <div className="relative w-full">
                  <img
                    src={aboutData.image}
                    alt={aboutData.title}
                    className="rounded-3xl shadow-2xl w-full h-auto object-cover"
                  />
                </div>
              )}
              
              <div className={aboutData.image ? 'w-full' : 'lg:col-span-2'}>
                <h3 className="text-2xl font-bold text-red-500 mb-3">
                  Welcome to Danphe Munal
                </h3>
                <div className="w-24 h-1 bg-red-500 mb-6"></div>
                <p className="text-lg text-gray-700 leading-relaxed text-justify whitespace-normal break-words overflow-wrap-anywhere w-full">
                  {aboutData.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify break-words">
                Danphe Munal is a leading agricultural trading company dedicated to bringing fresh, organic products from our farms to your table. We work directly with local farmers to ensure the highest quality and sustainability.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed text-justify break-words">
                Our mission is to empower farmers with eco-friendly methods, modern tools, and support to grow their businesses while nourishing the planet naturally and responsibly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default About
