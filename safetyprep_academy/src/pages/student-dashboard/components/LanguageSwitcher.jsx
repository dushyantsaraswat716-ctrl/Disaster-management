import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageSwitcher = ({ onLanguageChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Globe"
        iconPosition="left"
        iconSize={16}
        className="min-w-[120px] justify-between"
      >
        <span className="truncate">{getCurrentLanguage()?.nativeName}</span>
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={14} />
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-card-elevated z-50 animate-slide-down">
          <div className="py-1">
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageChange(language?.code)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-muted flex items-center justify-between ${
                  currentLanguage === language?.code ? 'bg-muted text-primary' : 'text-foreground'
                }`}
              >
                <div>
                  <div className="font-medium">{language?.nativeName}</div>
                  <div className="text-xs text-muted-foreground">{language?.name}</div>
                </div>
                {currentLanguage === language?.code && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;