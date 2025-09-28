import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ContactCard from './ContactCard';

const ContactCategory = ({ 
  category, 
  contacts, 
  onCall, 
  onMessage, 
  onLocationShare,
  isCollapsible = true,
  defaultExpanded = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Emergency Services': 'Phone',
      'School Administration': 'School',
      'Disaster Management': 'Shield',
      'Personal Contacts': 'Users',
      'Medical Emergency': 'Heart',
      'Fire Department': 'Flame',
      'Police': 'ShieldCheck',
      'Regional Authorities': 'MapPin'
    };
    return icons?.[categoryName] || 'Phone';
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
      'Emergency Services': 'text-error',
      'School Administration': 'text-primary',
      'Disaster Management': 'text-warning',
      'Personal Contacts': 'text-success',
      'Medical Emergency': 'text-error',
      'Fire Department': 'text-error',
      'Police': 'text-primary',
      'Regional Authorities': 'text-accent'
    };
    return colors?.[categoryName] || 'text-foreground';
  };

  if (!contacts || contacts?.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
            <Icon 
              name={getCategoryIcon(category)} 
              size={20} 
              className={getCategoryColor(category)} 
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{category}</h2>
            <p className="text-sm text-muted-foreground">
              {contacts?.length} contact{contacts?.length > 1 ? 's' : ''} available
            </p>
          </div>
        </div>
        
        {isCollapsible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="nav-item touch-target flex items-center space-x-2"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </button>
        )}
      </div>
      {/* Contacts Grid */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-down">
          {contacts?.map((contact) => (
            <ContactCard
              key={contact?.id}
              contact={contact}
              isPriority={contact?.isPriority}
              onCall={onCall}
              onMessage={onMessage}
              onLocationShare={onLocationShare}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactCategory;