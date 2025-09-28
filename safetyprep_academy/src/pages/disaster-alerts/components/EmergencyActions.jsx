import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyActions = ({ currentAlert, userLocation, onActionTaken }) => {
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  const [isSendingSOS, setIsSendingSOS] = useState(false);

  const emergencyContacts = [
    { name: 'Emergency Services', number: '112', icon: 'Phone', color: 'error' },
    { name: 'Fire Department', number: '101', icon: 'Flame', color: 'warning' },
    { name: 'Police', number: '100', icon: 'Shield', color: 'primary' },
    { name: 'Medical Emergency', number: '108', icon: 'Heart', color: 'error' }
  ];

  const handleEmergencyCall = (number) => {
    window.location.href = `tel:${number}`;
    onActionTaken('emergency_call', { number, timestamp: new Date()?.toISOString() });
  };

  const handleLocationShare = async () => {
    setIsLocationSharing(true);
    
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const location = {
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude,
            timestamp: new Date()?.toISOString()
          };
          
          const locationUrl = `https://maps.google.com/?q=${location?.lat},${location?.lng}`;
          const message = `EMERGENCY LOCATION SHARE\nTime: ${new Date()?.toLocaleString()}\nLocation: ${locationUrl}\nAlert: ${currentAlert?.title || 'General Emergency'}`;
          
          window.location.href = `sms:112?body=${encodeURIComponent(message)}`;
          onActionTaken('location_share', location);
          setIsLocationSharing(false);
        },
        (error) => {
          console.error('Location access denied:', error);
          const message = `EMERGENCY ASSISTANCE NEEDED\nTime: ${new Date()?.toLocaleString()}\nAlert: ${currentAlert?.title || 'General Emergency'}\nNote: Location access unavailable`;
          window.location.href = `sms:112?body=${encodeURIComponent(message)}`;
          setIsLocationSharing(false);
        }
      );
    }
  };

  const handleSendSOS = async () => {
    setIsSendingSOS(true);
    
    const sosMessage = `🚨 SOS EMERGENCY ALERT 🚨\nTime: ${new Date()?.toLocaleString()}\nAlert Type: ${currentAlert?.title || 'Emergency Situation'}\nSeverity: ${currentAlert?.severity || 'Unknown'}\nUrgent assistance required immediately!`;
    
    // Send to multiple emergency contacts
    const emergencyNumbers = ['112', '101', '100', '108'];
    
    // For demonstration, we'll use the primary emergency number
    window.location.href = `sms:112?body=${encodeURIComponent(sosMessage)}`;
    
    onActionTaken('sos_sent', {
      message: sosMessage,
      timestamp: new Date()?.toISOString(),
      alert: currentAlert
    });
    
    setTimeout(() => setIsSendingSOS(false), 2000);
  };

  const handleReportSafe = () => {
    const safetyMessage = `SAFETY STATUS UPDATE\nTime: ${new Date()?.toLocaleString()}\nAlert: ${currentAlert?.title || 'Emergency Situation'}\nStatus: SAFE AND ACCOUNTED FOR\nNo assistance required at this time.`;
    
    window.location.href = `sms:112?body=${encodeURIComponent(safetyMessage)}`;
    onActionTaken('report_safe', {
      timestamp: new Date()?.toISOString(),
      alert: currentAlert
    });
  };

  const quickActions = [
    {
      id: 'call-emergency',
      label: 'Call Emergency',
      icon: 'Phone',
      color: 'error',
      action: () => handleEmergencyCall('112')
    },
    {
      id: 'share-location',
      label: 'Share Location',
      icon: 'MapPin',
      color: 'warning',
      action: handleLocationShare
    },
    {
      id: 'send-sos',
      label: 'Send SOS',
      icon: 'AlertTriangle',
      color: 'error',
      action: handleSendSOS
    },
    {
      id: 'report-safe',
      label: 'Report Safe',
      icon: 'CheckCircle',
      color: 'success',
      action: handleReportSafe
    }
  ];

  const getButtonVariant = (color) => {
    const variants = {
      error: 'destructive',
      warning: 'warning',
      success: 'success',
      primary: 'default'
    };
    return variants?.[color] || 'default';
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground text-lg flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-error" />
          Emergency Actions
        </h3>
        
        {currentAlert && (
          <div className="text-sm text-muted-foreground">
            Active: {currentAlert?.title}
          </div>
        )}
      </div>
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant={getButtonVariant(action?.color)}
            size="lg"
            fullWidth
            onClick={action?.action}
            loading={
              (action?.id === 'share-location' && isLocationSharing) ||
              (action?.id === 'send-sos' && isSendingSOS)
            }
            iconName={action?.icon}
            iconPosition="top"
            iconSize={24}
            className="h-20 flex-col space-y-2"
          >
            <span className="text-sm font-medium">{action?.label}</span>
          </Button>
        ))}
      </div>
      {/* Emergency Contacts */}
      <div className="mb-6">
        <h4 className="font-medium text-sm mb-3 flex items-center">
          <Icon name="Phone" size={16} className="mr-2" />
          Emergency Contacts
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {emergencyContacts?.map((contact) => (
            <button
              key={contact?.number}
              onClick={() => handleEmergencyCall(contact?.number)}
              className="flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors touch-target"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-${contact?.color}/10`}>
                  <Icon 
                    name={contact?.icon} 
                    size={16} 
                    className={`text-${contact?.color}`}
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{contact?.name}</div>
                  <div className="text-xs text-muted-foreground">{contact?.number}</div>
                </div>
              </div>
              <Icon name="Phone" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
      {/* Safety Instructions */}
      {currentAlert && currentAlert?.safetyInstructions && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-medium text-sm mb-3 flex items-center text-primary">
            <Icon name="Shield" size={16} className="mr-2" />
            Immediate Safety Instructions
          </h4>
          <ul className="space-y-2">
            {currentAlert?.safetyInstructions?.slice(0, 3)?.map((instruction, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <span className="text-primary font-bold mt-0.5">{index + 1}.</span>
                <span>{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Emergency Disclaimer */}
      <div className="mt-6 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Emergency Disclaimer:</p>
            <p>
              These actions will contact emergency services and share your information. 
              Only use during actual emergencies. For practice scenarios, use the drill simulation mode.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyActions;