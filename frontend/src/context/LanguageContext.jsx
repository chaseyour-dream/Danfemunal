import React, { createContext, useContext, useState } from 'react'

export const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('english') // 'english' or 'nepali'

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'nepali' : 'english')
  }

  const t = (key) => {
    const translations = {
      english: {
        // Navbar
        home: 'Home',
        aboutUs: 'About Us',
        product: 'Product',
        team: 'Team',
        events: 'Events',
        contactUs: 'Contact Us',
        cart: 'Cart',
        
        // Hero
        heroTitle: 'DANPHE MUNAL',
        heroSubtitle: 'Explore our services and start growing your farm with confidence',
        exploreAbout: 'Explore More About Us',
        ourProducts: 'Our Products',
        
        // Sections
        aboutTitle: 'About Danphe Munal',
        whyChooseUs: 'Why Choose Us',
        ourServices: 'Our Services',
        featuredProducts: 'Featured Products',
        ourTeam: 'Our Team',
        
        // Common
        all: 'All',
        addToCart: 'Add to Cart',
        outOfStock: 'Out of Stock',
        viewAll: 'View All',
      },
      nepali: {
        // Navbar
        home: 'गृहपृष्ठ',
        aboutUs: 'हाम्रो बारेमा',
        product: 'उत्पादन',
        team: 'टोली',
        events: 'कार्यक्रमहरू',
        contactUs: 'सम्पर्क गर्नुहोस्',
        cart: 'कार्ट',
        
        // Hero
        heroTitle: 'दाँफे मुनाल',
        heroSubtitle: 'हाम्रा सेवाहरू अन्वेषण गर्नुहोस् र आत्मविश्वासका साथ आफ्नो खेती बढाउनुहोस्',
        exploreAbout: 'हाम्रो बारेमा थप जान्नुहोस्',
        ourProducts: 'हाम्रा उत्पादनहरू',
        
        // Sections
        aboutTitle: 'दाँफे मुनाल बारे',
        whyChooseUs: 'हामीलाई किन रोज्ने',
        ourServices: 'हाम्रा सेवाहरू',
        featuredProducts: 'विशेष उत्पादनहरू',
        ourTeam: 'हाम्रो टोली',
        
        // Common
        all: 'सबै',
        addToCart: 'कार्टमा थप्नुहोस्',
        outOfStock: 'स्टकमा छैन',
        viewAll: 'सबै हेर्नुहोस्',
      }
    }
    
    return translations[language]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
