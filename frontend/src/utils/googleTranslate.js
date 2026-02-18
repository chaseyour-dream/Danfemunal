// Google Translate Integration
export const initGoogleTranslate = () => {
  // Add Google Translate script
  const script = document.createElement('script')
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.body.appendChild(script)

  // Initialize Google Translate
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,ne', // English and Nepali
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      'google_translate_element'
    )
  }
}

export const changeLanguage = (language) => {
  const selectElement = document.querySelector('.goog-te-combo')
  if (selectElement) {
    selectElement.value = language === 'nepali' ? 'ne' : 'en'
    selectElement.dispatchEvent(new Event('change'))
  }
}

export const hideGoogleTranslateToolbar = () => {
  // Hide the Google Translate toolbar
  const style = document.createElement('style')
  style.innerHTML = `
    .goog-te-banner-frame,
    .goog-te-balloon-frame,
    .goog-tooltip {
      display: none !important;
    }
    body {
      top: 0 !important;
    }
    #google_translate_element {
      display: none;
    }
    .skiptranslate {
      display: none !important;
    }
  `
  document.head.appendChild(style)
}
