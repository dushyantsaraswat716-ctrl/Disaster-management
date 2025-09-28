import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickDialPad = ({ priorityContacts, onCall, onMessage, className = '' }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleQuickCall = (contact) => {
    onCall(contact, contact?.primaryPhone);
  };

  const handleQuickMessage = (contact) => {
    onMessage(contact, contact?.primaryPhone);
  };

  if (!priorityContacts || priorityContacts?.length === 0) return null;

  return (
    <div className={`card bg-error/5 border-error/20 ${className}`}>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Zap" size={20} className="text-error" />
          <h3 className="text-lg font-semibold text-foreground">Quick Emergency Dial</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {priorityContacts?.slice(0, 8)?.map((contact) => (
            <div key={contact?.id} className="space-y-2">
              <button
                onClick={() => handleQuickCall(contact)}
                className="w-full aspect-square bg-error text-error-foreground rounded-lg flex flex-col items-center justify-center space-y-1 hover:bg-error/90 transition-colors touch-target group"
              >
                <Icon name={contact?.icon} size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-center leading-tight">
                  {contact?.shortName || contact?.name?.split(' ')?.[0]}
                </span>
              </button>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleQuickCall(contact)}
                  iconName="Phone"
                  iconSize={12}
                  className="flex-1 text-xs"
                >
                  Call
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleQuickMessage(contact)}
                  iconName="MessageSquare"
                  iconSize={12}
                  className="flex-1 text-xs"
                >
                  SMS
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Instructions */}
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground">
              <p className="font-medium mb-1">Emergency Calling Tips:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Stay calm and speak clearly</li>
                <li>• Provide your exact location</li>
                <li>• Describe the emergency situation</li>
                <li>• Follow dispatcher instructions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickDialPad;