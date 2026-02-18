import { useState, useEffect } from 'react'
import { getTickerMessages } from '../api/axios'

const MessageTicker = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getTickerMessages()
        if (response.data && response.data.length > 0) {
          setMessages(response.data)
        } else {
          // Default message if no messages from backend
          setMessages([{ id: 1, message: 'सन्देश — डाँफेमुनाल अगानिक — स्वास्थ्य, सौन्दर्य र सन्तुलनको भरोसा।' }])
        }
      } catch (error) {
        console.error('Error fetching ticker messages:', error)
        setMessages([{ id: 1, message: 'सन्देश — डाँफेमुनाल अगानिक — स्वास्थ्य, सौन्दर्य र सन्तुलनको भरोसा।' }])
      }
    }
    fetchMessages()
  }, [])

  if (messages.length === 0) return null

  // Create a string of all messages separated by bullets
  const allMessages = messages.map(msg => msg.message).join(' • ')

  return (
    <div className="relative overflow-hidden bg-sky-700 shadow-lg">
      <div className="flex items-center h-16 relative z-10">
        {/* Breaking News Label - Arrow/Chevron Shape pointing right (more edge hidden) */}
        <div className="relative flex-shrink-0 z-20 -ml-12">
          <div className="relative bg-red-600 pl-16 pr-6 py-4 shadow-xl"
               style={{
                 clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)'
               }}>
            <span className="text-white font-black text-2xl tracking-wider drop-shadow-lg relative z-10">
              सन्देश
            </span>
          </div>
        </div>
        
        {/* Scrolling Message Container - Fully Transparent */}
        <div className="flex-1 overflow-hidden relative h-full ml-2">
          <div className="absolute whitespace-nowrap flex items-center h-full animate-ticker-continuous">
            <span className="text-white text-xl font-bold px-16 tracking-wide drop-shadow-lg">
              {allMessages}
            </span>
            <span className="text-white text-xl font-bold px-16 tracking-wide drop-shadow-lg">
              {allMessages}
            </span>
            <span className="text-white text-xl font-bold px-16 tracking-wide drop-shadow-lg">
              {allMessages}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageTicker
