import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickEmergencyAccess = ({ 
  position = 'bottom-right',
  userRole = 'student',
  isEmergencyActive = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocationSharing, setIsLocationSharing] = useState(false);

  const emergencyContacts = [
    { name: 'Emergency Services', number: '112', icon: 'Phone' },
    { name: 'Fire Department', number: '101', icon: 'Flame' },
    { name: 'Police', number: '100', icon: 'Shield' },
    { name: 'Medical Emergency', number: '108', icon: 'Heart' }
  ];

  const getPositionClasses = () => {
    const positions = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'top-right': 'top-20 right-6',
      'top-left': 'top-20 left-6'
    };
    return positions?.[position] || positions?.['bottom-right'];
  };

  const handleEmergencyCall = (number) => {
    window.location.href = `tel:${number}`;
    setIsExpanded(false);
  };

  const handleLocationShare = async () => {
    setIsLocationSharing(true);
    
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
          const timestamp = new Date()?.toLocaleString();
          
          const message = `EMERGENCY LOCATION SHARE\nTime: ${timestamp}\nLocation: ${locationUrl}\nUser: ${userRole}\nStatus: Requesting immediate assistance`;
          
          // Share via SMS to emergency services
          window.location.href = `sms:112?body=${encodeURIComponent(message)}`;
          setIsLocationSharing(false);
          setIsExpanded(false);
        },
        (error) => {
          console.error('Location access denied:', error);
          // Fallback message
          const message = `EMERGENCY ASSISTANCE NEEDED\nTime: ${new Date()?.toLocaleString()}\nUser: ${userRole}\nNote: Location access unavailable`;
          window.location.href = `sms:112?body=${encodeURIComponent(message)}`;
          setIsLocationSharing(false);
          setIsExpanded(false);
        }
      );
    } else {
      // Fallback for browsers without geolocation
      const message = `EMERGENCY ASSISTANCE NEEDED\nTime: ${new Date()?.toLocaleString()}\nUser: ${userRole}`;
      window.location.href = `sms:112?body=${encodeURIComponent(message)}`;
      setIsLocationSharing(false);
      setIsExpanded(false);
    }
  };

  const handleSafetyStatus = () => {
    const message = `SAFETY STATUS UPDATE\nTime: ${new Date()?.toLocaleString()}\nUser: ${userRole}\nStatus: Safe and accounted for`;
    window.location.href = `sms:112?body=${encodeURIComponent(message)}`;
    setIsExpanded(false);
  };

  return (
    <>
      {/* Main Emergency Button */}
      <div className={`fixed ${getPositionClasses()} z-[200] flex flex-col items-end space-y-3`}>
        {/* Expanded Menu */}
        {isExpanded && (
          <div className="bg-card border border-border rounded-lg shadow-emergency p-4 w-64 animate-slide-up">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center">
                <Icon name="AlertTriangle" size={16} className="mr-2 text-error" />
                Emergency Actions
              </h3>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button
                  variant="destructive"
                  size="sm"
                  fullWidth
                  onClick={() => handleEmergencyCall('112')}
                  iconName="Phone"
                  iconPosition="left"
                  iconSize={16}
                >
                  Call Emergency (112)
                </Button>

                <Button
                  variant="warning"
                  size="sm"
                  fullWidth
                  onClick={handleLocationShare}
                  loading={isLocationSharing}
                  iconName="MapPin"
                  iconPosition="left"
                  iconSize={16}
                >
                  Share My Location
                </Button>

                <Button
                  variant="success"
                  size="sm"
                  fullWidth
                  onClick={handleSafetyStatus}
                  iconName="CheckCircle"
                  iconPosition="left"
                  iconSize={16}
                >
                  Report Safe
                </Button>
              </div>

              {/* Emergency Contacts */}
              <div className="border-t border-border pt-3">
                <h4 className="text-xs font-medium text-muted-foreground mb-2">
                  Quick Contacts
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {emergencyContacts?.map((contact) => (
                    <button
                      key={contact?.number}
                      onClick={() => handleEmergencyCall(contact?.number)}
                      className="flex flex-col items-center p-2 rounded-md hover:bg-muted transition-colors touch-target"
                    >
                      <Icon name={contact?.icon} size={16} className="text-error mb-1" />
                      <span className="text-xs text-center">{contact?.number}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`quick-access-btn touch-target ${
            isEmergencyActive ? 'animate-emergency-pulse' : ''
          }`}
          aria-label="Emergency Quick Access"
        >
          <Icon 
            name={isExpanded ? "X" : "AlertTriangle"} 
            size={24} 
            className="transition-transform duration-150"
          />
        </button>
      </div>
      {/* Overlay for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-[150] md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default QuickEmergencyAccess;