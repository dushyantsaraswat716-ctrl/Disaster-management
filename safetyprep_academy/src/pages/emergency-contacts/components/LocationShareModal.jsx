import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationShareModal = ({ 
  isOpen, 
  onClose, 
  contact, 
  onLocationShare,
  className = '' 
}) => {
  const [isSharing, setIsSharing] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      getCurrentLocation();
    }
  }, [isOpen]);

  const getCurrentLocation = () => {
    setIsSharing(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setIsSharing(false);
      return;
    }

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position?.coords;
        setLocationData({
          latitude,
          longitude,
          accuracy,
          timestamp: new Date()?.toISOString()
        });
        setIsSharing(false);
      },
      (error) => {
        setError(getLocationError(error?.code));
        setIsSharing(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const getLocationError = (code) => {
    switch (code) {
      case 1: return "Location access denied. Please enable location services.";
      case 2: return "Location unavailable. Please try again.";
      case 3: return "Location request timeout. Please try again.";
      default: return "Unknown location error occurred.";
    }
  };

  const handleLocationShare = (method) => {
    if (!locationData) return;

    const locationUrl = `https://maps.google.com/?q=${locationData?.latitude},${locationData?.longitude}`;
    const timestamp = new Date()?.toLocaleString();
    const accuracy = Math.round(locationData?.accuracy);
    
    const message = `🚨 EMERGENCY LOCATION SHARE\n\n` +
      `Time: ${timestamp}\n` +
      `Location: ${locationUrl}\n` +
      `Accuracy: ±${accuracy}m\n` +
      `Contact: ${contact?.name || 'Emergency Contact'}\n\n` +
      `This is an automated emergency location share from SafetyPrep Academy.`;

    switch (method) {
      case 'sms':
        window.location.href = `sms:${contact?.primaryPhone}?body=${encodeURIComponent(message)}`;
        break;
      case 'whatsapp':
        if (contact?.whatsapp) {
          const whatsappNumber = contact?.whatsapp?.replace(/\D/g, '');
          window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
        }
        break;
      case 'email':
        if (contact?.email) {
          const subject = "Emergency Location Share - Immediate Assistance Required";
          window.location.href = `mailto:${contact?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        }
        break;
      case 'copy':
        navigator.clipboard?.writeText(message);
        break;
    }

    onLocationShare(contact, locationData, method);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300] p-4">
      <div className={`card max-w-md w-full max-h-[90vh] overflow-y-auto ${className}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="MapPin" size={20} className="text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Share Location</h3>
                <p className="text-sm text-muted-foreground">
                  Sending to: {contact?.name}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={16}
            />
          </div>

          {/* Location Status */}
          <div className="mb-6">
            {isSharing && (
              <div className="flex items-center space-x-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="animate-spin">
                  <Icon name="Loader2" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-accent">Getting your location...</p>
                  <p className="text-xs text-muted-foreground">This may take a few seconds</p>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start space-x-3 p-3 bg-error/10 border border-error/20 rounded-lg">
                <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-error">Location Error</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={getCurrentLocation}
                    iconName="RefreshCw"
                    iconSize={14}
                    className="mt-2"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {locationData && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <div>
                    <p className="font-medium text-success">Location Found</p>
                    <p className="text-xs text-muted-foreground">
                      Accuracy: ±{Math.round(locationData?.accuracy)}m
                    </p>
                  </div>
                </div>

                {/* Map Preview */}
                <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title="Current Location"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${locationData?.latitude},${locationData?.longitude}&z=16&output=embed`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Share Options */}
          {locationData && (
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Choose sharing method:</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="destructive"
                  onClick={() => handleLocationShare('sms')}
                  iconName="MessageSquare"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  SMS
                </Button>

                {contact?.whatsapp && (
                  <Button
                    variant="success"
                    onClick={() => handleLocationShare('whatsapp')}
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    WhatsApp
                  </Button>
                )}

                {contact?.email && (
                  <Button
                    variant="outline"
                    onClick={() => handleLocationShare('email')}
                    iconName="Mail"
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    Email
                  </Button>
                )}

                <Button
                  variant="ghost"
                  onClick={() => handleLocationShare('copy')}
                  iconName="Copy"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Copy Link
                </Button>
              </div>

              {/* Emergency Note */}
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-warning mb-1">Emergency Location Share</p>
                    <p className="text-muted-foreground text-xs">
                      Your location will be shared with emergency context. 
                      This action will be logged for safety purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationShareModal;