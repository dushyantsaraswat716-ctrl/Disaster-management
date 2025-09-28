import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' }
  ];

  const currentLanguage = languages?.find(lang => lang?.code === selectedLanguage) || languages?.[0];

  const handleLanguageSelect = (languageCode) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
    localStorage.setItem('currentLanguage', languageCode);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium text-foreground">{currentLanguage?.nativeName}</span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-card-elevated z-50 animate-slide-down">
          <div className="py-2">
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageSelect(language?.code)}
                className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors flex items-center space-x-3 ${
                  selectedLanguage === language?.code ? 'bg-muted' : ''
                }`}
              >
                <span className="text-lg">{language?.flag}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{language?.nativeName}</div>
                  <div className="text-xs text-muted-foreground">{language?.name}</div>
                </div>
                {selectedLanguage === language?.code && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;