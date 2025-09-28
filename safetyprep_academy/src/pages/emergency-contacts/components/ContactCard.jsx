import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactCard = ({ 
  contact, 
  isPriority = false, 
  onCall, 
  onMessage, 
  onLocationShare,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'busy': return 'text-warning';
      case 'unavailable': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'busy': return 'Clock';
      case 'unavailable': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  const handleCall = (number) => {
    onCall(contact, number);
  };

  const handleMessage = (number) => {
    onMessage(contact, number);
  };

  const handleLocationShare = () => {
    onLocationShare(contact);
  };

  return (
    <div className={`card ${isPriority ? 'border-error border-2' : ''} ${className}`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              isPriority ? 'bg-error text-error-foreground' : 'bg-primary text-primary-foreground'
            }`}>
              <Icon name={contact?.icon} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold ${isPriority ? 'text-lg' : 'text-base'} text-foreground truncate`}>
                {contact?.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">{contact?.role}</p>
              {contact?.department && (
                <p className="text-xs text-muted-foreground truncate">{contact?.department}</p>
              )}
            </div>
          </div>
          
          {/* Status */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            <Icon 
              name={getStatusIcon(contact?.status)} 
              size={16} 
              className={getStatusColor(contact?.status)} 
            />
            <span className={`text-xs font-medium ${getStatusColor(contact?.status)}`}>
              {contact?.status}
            </span>
          </div>
        </div>

        {/* Primary Contact */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className={`font-mono ${isPriority ? 'text-lg font-semibold' : 'text-base'}`}>
                {contact?.primaryPhone}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="destructive"
                size={isPriority ? "default" : "sm"}
                onClick={() => handleCall(contact?.primaryPhone)}
                iconName="Phone"
                iconSize={16}
                className="touch-target"
              >
                Call
              </Button>
              <Button
                variant="outline"
                size={isPriority ? "default" : "sm"}
                onClick={() => handleMessage(contact?.primaryPhone)}
                iconName="MessageSquare"
                iconSize={16}
                className="touch-target"
              >
                SMS
              </Button>
            </div>
          </div>

          {/* Additional Numbers */}
          {contact?.alternateNumbers && contact?.alternateNumbers?.length > 0 && (
            <div className="space-y-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
                <span>{contact?.alternateNumbers?.length} more number{contact?.alternateNumbers?.length > 1 ? 's' : ''}</span>
              </button>
              
              {isExpanded && (
                <div className="space-y-2 pl-4 border-l-2 border-border animate-slide-down">
                  {contact?.alternateNumbers?.map((alt, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{alt?.label}:</span>
                        <span className="font-mono text-sm">{alt?.number}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleCall(alt?.number)}
                          iconName="Phone"
                          iconSize={14}
                        >
                          Call
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleMessage(alt?.number)}
                          iconName="MessageSquare"
                          iconSize={14}
                        >
                          SMS
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center space-x-2">
              {contact?.email && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = `mailto:${contact?.email}`}
                  iconName="Mail"
                  iconSize={16}
                >
                  Email
                </Button>
              )}
              {contact?.whatsapp && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://wa.me/${contact?.whatsapp?.replace(/\D/g, '')}`)}
                  iconName="MessageCircle"
                  iconSize={16}
                >
                  WhatsApp
                </Button>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLocationShare}
              iconName="MapPin"
              iconSize={16}
              className="text-accent hover:text-accent/80"
            >
              Share Location
            </Button>
          </div>
        </div>

        {/* Priority Badge */}
        {isPriority && (
          <div className="mt-3 flex items-center justify-center">
            <div className="inline-flex items-center px-2 py-1 rounded-full bg-error/10 text-error text-xs font-medium">
              <Icon name="AlertTriangle" size={12} className="mr-1" />
              Priority Contact
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactCard;