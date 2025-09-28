import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContactsQuick = ({ contacts = [], onViewAll }) => {
  const defaultContacts = [
    { id: 1, name: 'Emergency Services', number: '112', type: 'emergency', icon: 'Phone' },
    { id: 2, name: 'Fire Department', number: '101', type: 'fire', icon: 'Flame' },
    { id: 3, name: 'Police', number: '100', type: 'police', icon: 'Shield' },
    { id: 4, name: 'Medical Emergency', number: '108', type: 'medical', icon: 'Heart' }
  ];

  const displayContacts = contacts?.length > 0 ? contacts?.slice(0, 4) : defaultContacts;

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const getContactColor = (type) => {
    const colors = {
      emergency: 'bg-error hover:bg-error/90',
      fire: 'bg-warning hover:bg-warning/90',
      police: 'bg-primary hover:bg-primary/90',
      medical: 'bg-success hover:bg-success/90',
      school: 'bg-secondary hover:bg-secondary/90'
    };
    return colors?.[type] || colors?.emergency;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Emergency Contacts</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {displayContacts?.map((contact) => (
          <button
            key={contact?.id}
            onClick={() => handleCall(contact?.number)}
            className={`${getContactColor(contact?.type)} text-white p-4 rounded-lg transition-all duration-200 hover:scale-105 touch-target`}
          >
            <div className="flex flex-col items-center space-y-2">
              <Icon name={contact?.icon} size={24} color="white" />
              <div className="text-center">
                <p className="font-medium text-sm">{contact?.name}</p>
                <p className="text-xs opacity-90">{contact?.number}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Tap any contact to call immediately during emergencies</span>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactsQuick;