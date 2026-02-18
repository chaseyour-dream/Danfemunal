import { useState, useEffect, useContext } from 'react'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { getTeamMembers, getLeadershipMessages } from '../api/axios'
import { LanguageContext } from '../context/LanguageContext'

const Team = () => {
  const [teamData, setTeamData] = useState({ shareholders: [], board_members: [] })
  const [leadershipMessages, setLeadershipMessages] = useState([])
  const [activeTab, setActiveTab] = useState('shareholders')
  const [loading, setLoading] = useState(true)
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const [teamResponse, leadershipResponse] = await Promise.all([
          getTeamMembers(),
          getLeadershipMessages()
        ])
        setTeamData(teamResponse.data)
        setLeadershipMessages(leadershipResponse.data)
      } catch (error) {
        console.error('Error fetching team:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeam()
  }, [])

  const TeamMemberCard = ({ member }) => (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {member.email && (
              <div className="flex items-center space-x-2 text-xs mb-2 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <FaEnvelope className="flex-shrink-0" />
                <span className="truncate">{member.email}</span>
              </div>
            )}
            {member.phone && (
              <div className="flex items-center space-x-2 text-xs bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <FaPhone className="flex-shrink-0" />
                <span>{member.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-5 bg-gradient-to-b from-white to-gray-50">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
          {member.name}
        </h3>
        <p className="text-sm text-green-600 font-semibold mb-2">{member.position}</p>
        <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
          {member.role_display}
        </span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Leadership Messages */}
        {!loading && leadershipMessages.length > 0 && (
          <div className="mb-16 mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              {leadershipMessages.map((leader) => (
                <div 
                  key={leader.id} 
                  className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-t-4 border-blue-500 flex flex-col h-full"
                >
                  {/* Image Section with Decorative Background */}
                  <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-8">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-100 rounded-full -ml-12 -mb-12 opacity-50"></div>
                    <div className="relative flex flex-col items-center">
                      <div className="relative">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-48 h-48 rounded-full object-cover shadow-xl ring-4 ring-white"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          {leader.role_display}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mt-6">{leader.name}</h3>
                    </div>
                  </div>

                  {/* Message Section */}
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-8 bg-blue-500 mr-3"></div>
                      <h4 className="text-lg font-bold text-blue-500 italic">
                        Message from the {leader.role_display}
                      </h4>
                    </div>
                    <div className="relative flex-grow">
                      <div className="absolute -left-2 top-0 text-6xl text-blue-200 font-serif">"</div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify italic pl-6 pt-4 min-h-[200px]">
                        {language === 'nepali' ? leader.message_nepali : leader.message_english}
                      </p>
                      <div className="absolute -right-2 bottom-0 text-6xl text-blue-200 font-serif">"</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 mt-8">Our Team</h1>
          <p className="text-xl text-white/90">Meet the people behind Danphe Munal</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('shareholders')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'shareholders'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-red-500'
              }`}
            >
              Shareholders
            </button>
            <button
              onClick={() => setActiveTab('board_members')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'board_members'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-red-500'
              }`}
            >
              Board Members
            </button>
          </div>
        </div>

        {/* Team Members Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {activeTab === 'shareholders' && teamData.shareholders.length > 0 ? (
              teamData.shareholders.map(member => (
                <TeamMemberCard key={member.id} member={member} />
              ))
            ) : activeTab === 'board_members' && teamData.board_members.length > 0 ? (
              teamData.board_members.map(member => (
                <TeamMemberCard key={member.id} member={member} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl text-gray-500">No team members found in this category</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Team
