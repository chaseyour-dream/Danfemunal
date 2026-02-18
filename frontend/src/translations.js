export const translations = {
  english: {
    // Navbar
    home: 'Home',
    aboutUs: 'About Us',
    product: 'Product',
    team: 'Team',
    cart: 'Cart',
    language: 'Language',
    
    // Hero Section
    heroTitle: 'DANPHE MUNAL',
    heroSubtitle: 'Explore our services and start growing your farm with confidence',
    exploreAbout: 'Explore More About Us',
    ourProducts: 'Our Products',
    
    // About Section
    aboutTitle: 'About Danphe Munal',
    aboutSubtitle: 'Learn about our mission and values',
    learnMore: 'Learn more about us',
    
    // Features
    whyChooseUs: 'Why Choose Us',
    whyChooseSubtitle: 'Quality products from farm to your table',
    organic: '100% Organic',
    organicDesc: 'All our products are naturally grown without harmful chemicals',
    freshProducts: 'Fresh Products',
    freshDesc: 'Direct from farm to ensure maximum freshness',
    trustedTeam: 'Trusted Team',
    trustedDesc: 'Experienced professionals dedicated to quality',
    
    // Services
    ourServices: 'Our Services',
    servicesSubtitle: 'Discover what we offer to serve you better',
    
    // Products
    featuredProducts: 'Featured Products',
    productsSubtitle: 'Check out our most popular items',
    all: 'All',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    stock: 'Stock',
    viewAllProducts: 'View All Products',
    
    // Team
    ourTeam: 'Our Team',
    teamSubtitle: 'Meet the dedicated people behind our success',
    shareholders: 'Shareholders',
    boardMembers: 'Board Members',
    viewAllTeam: 'View All Team Members',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    emptyCart: 'Your cart is empty',
    continueShopping: 'Continue Shopping',
    quantity: 'Quantity',
    price: 'Price',
    total: 'Total',
    remove: 'Remove',
    proceedCheckout: 'Proceed to Checkout',
    
    // Footer
    contactUs: 'Contact Us',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved',
  },
  
  nepali: {
    // Navbar
    home: 'गृहपृष्ठ',
    aboutUs: 'हाम्रो बारेमा',
    product: 'उत्पादन',
    team: 'टोली',
    cart: 'कार्ट',
    language: 'भाषा',
    
    // Hero Section
    heroTitle: 'दाँफे मुनाल',
    heroSubtitle: 'हाम्रा सेवाहरू अन्वेषण गर्नुहोस् र आत्मविश्वासका साथ आफ्नो खेती बढाउनुहोस्',
    exploreAbout: 'हाम्रो बारेमा थप जान्नुहोस्',
    ourProducts: 'हाम्रा उत्पादनहरू',
    
    // About Section
    aboutTitle: 'दाँफे मुनाल बारे',
    aboutSubtitle: 'हाम्रो मिशन र मूल्यहरू बारे जान्नुहोस्',
    learnMore: 'हाम्रो बारेमा थप जान्नुहोस्',
    
    // Features
    whyChooseUs: 'हामीलाई किन रोज्ने',
    whyChooseSubtitle: 'खेतबाट तपाईंको टेबलसम्म गुणस्तरीय उत्पादनहरू',
    organic: '१००% जैविक',
    organicDesc: 'हाम्रा सबै उत्पादनहरू हानिकारक रसायन बिना प्राकृतिक रूपमा उब्जाइएका छन्',
    freshProducts: 'ताजा उत्पादनहरू',
    freshDesc: 'अधिकतम ताजापन सुनिश्चित गर्न खेतबाट सिधै',
    trustedTeam: 'विश्वसनीय टोली',
    trustedDesc: 'गुणस्तरमा समर्पित अनुभवी पेशेवरहरू',
    
    // Services
    ourServices: 'हाम्रा सेवाहरू',
    servicesSubtitle: 'हामीले तपाईंलाई राम्रो सेवा दिन के प्रस्ताव गर्छौं पत्ता लगाउनुहोस्',
    
    // Products
    featuredProducts: 'विशेष उत्पादनहरू',
    productsSubtitle: 'हाम्रा सबैभन्दा लोकप्रिय वस्तुहरू हेर्नुहोस्',
    all: 'सबै',
    addToCart: 'कार्टमा थप्नुहोस्',
    outOfStock: 'स्टकमा छैन',
    stock: 'स्टक',
    viewAllProducts: 'सबै उत्पादनहरू हेर्नुहोस्',
    
    // Team
    ourTeam: 'हाम्रो टोली',
    teamSubtitle: 'हाम्रो सफलताको पछाडि समर्पित मानिसहरूलाई भेट्नुहोस्',
    shareholders: 'शेयरधारकहरू',
    boardMembers: 'बोर्ड सदस्यहरू',
    viewAllTeam: 'सबै टोली सदस्यहरू हेर्नुहोस्',
    
    // Cart
    shoppingCart: 'किनमेल कार्ट',
    emptyCart: 'तपाईंको कार्ट खाली छ',
    continueShopping: 'किनमेल जारी राख्नुहोस्',
    quantity: 'परिमाण',
    price: 'मूल्य',
    total: 'जम्मा',
    remove: 'हटाउनुहोस्',
    proceedCheckout: 'चेकआउटमा जानुहोस्',
    
    // Footer
    contactUs: 'सम्पर्क गर्नुहोस्',
    followUs: 'हामीलाई फलो गर्नुहोस्',
    allRightsReserved: 'सर्वाधिकार सुरक्षित',
  }
}

export const getTranslation = (language, key) => {
  return translations[language]?.[key] || translations.english[key] || key
}
