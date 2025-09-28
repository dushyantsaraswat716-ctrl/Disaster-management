import React from 'react';
import Icon from '../../../components/AppIcon';


const InstitutionalBranding = ({ selectedLanguage }) => {
  const translations = {
    en: {
      appName: 'SafetyPrep Academy',
      tagline: 'NDMA Certified Disaster Preparedness Platform',
      subtitle: 'Empowering Educational Institutions with Comprehensive Safety Training',
      features: [
        'Interactive Learning Modules',
        'Virtual Drill Simulations',
        'Real-time Emergency Alerts',
        'Multi-language Support'
      ],
      trustedBy: 'Trusted by 500+ Educational Institutions across India'
    },
    hi: {
      appName: 'SafetyPrep Academy',
      tagline: 'NDMA प्रमाणित आपदा तैयारी प्लेटफॉर्म',
      subtitle: 'व्यापक सुरक्षा प्रशिक्षण के साथ शैक्षणिक संस्थानों को सशक्त बनाना',
      features: [
        'इंटरैक्टिव लर्निंग मॉड्यूल',
        'वर्चुअल ड्रिल सिमुलेशन',
        'रियल-टाइम आपातकालीन अलर्ट',
        'बहुभाषी समर्थन'
      ],
      trustedBy: 'भारत भर के 500+ शैक्षणिक संस्थानों द्वारा भरोसेमंद'
    }
  };

  const t = translations?.[selectedLanguage] || translations?.en;

  const certifications = [
    { name: 'NDMA', logo: 'Shield', color: 'text-primary' },
    { name: 'Ministry of Education', logo: 'GraduationCap', color: 'text-secondary' },
    { name: 'ISO 27001', logo: 'Award', color: 'text-accent' }
  ];

  return (
    <div className="text-center space-y-6">
      {/* Main Logo and Branding */}
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Icon name="Shield" size={28} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">{t?.appName}</h1>
            <p className="text-xs text-primary font-medium">{t?.tagline}</p>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
          {t?.subtitle}
        </p>
      </div>
      {/* Key Features */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-semibold text-foreground mb-3">Key Features</h3>
        <div className="grid grid-cols-2 gap-2">
          {t?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <Icon name="CheckCircle" size={14} className="text-success flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="space-y-3">
        <h4 className="text-xs font-medium text-muted-foreground">Certified & Approved By</h4>
        <div className="flex items-center justify-center space-x-6">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex flex-col items-center space-y-1">
              <div className={`p-2 rounded-lg bg-muted ${cert?.color}`}>
                <Icon name={cert?.logo} size={16} />
              </div>
              <span className="text-xs text-muted-foreground">{cert?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Signal */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-3">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Users" size={16} className="text-success" />
          <p className="text-xs text-success font-medium">{t?.trustedBy}</p>
        </div>
      </div>
      {/* Emergency Contact Info */}
      <div className="bg-error/10 border border-error/20 rounded-lg p-3">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Phone" size={16} className="text-error" />
          <p className="text-xs text-error font-medium">
            Emergency Helpline: 112 | Available 24/7
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalBranding;