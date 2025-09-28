import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const EmergencyAlertBanner = ({
  isActive = false,
  alertType = 'general',
  message = '',
  onDismiss = null,
  autoHide = false,
  duration = 10000
}) => {
  const [isVisible, setIsVisible] = useState(isActive);
  const [timeRemaining, setTimeRemaining] = useState(duration / 1000);

  useEffect(() => {
    setIsVisible(isActive);
    if (isActive && autoHide) {
      setTimeRemaining(duration / 1000);
    }
  }, [isActive, autoHide, duration]);

  useEffect(() => {
    let timer;
    if (isVisible && autoHide && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsVisible(false);
            if (onDismiss) onDismiss();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isVisible, autoHide, timeRemaining, onDismiss]);

  const getAlertConfig = (type) => {
    const configs = {
      earthquake: {
        icon: 'Zap',
        bgColor: 'bg-error',
        textColor: 'text-error-foreground',
        defaultMessage: 'Earthquake Alert - Drop, Cover, and Hold On immediately'
      },
      fire: {
        icon: 'Flame',
        bgColor: 'bg-error',
        textColor: 'text-error-foreground',
        defaultMessage: 'Fire Emergency - Evacuate building immediately via nearest exit'
      },
      flood: {
        icon: 'CloudRain',
        bgColor: 'bg-warning',
        textColor: 'text-warning-foreground',
        defaultMessage: 'Flood Warning - Move to higher ground immediately'
      },
      general: {
        icon: 'AlertTriangle',
        bgColor: 'bg-error',
        textColor: 'text-error-foreground',
        defaultMessage: 'Emergency Alert - Follow safety protocols immediately'
      },
      drill: {
        icon: 'Play',
        bgColor: 'bg-accent',
        textColor: 'text-accent-foreground',
        defaultMessage: 'Emergency Drill in Progress - Participate as directed'
      }
    };
    return configs?.[type] || configs?.general;
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:112';
  };

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

          // Share location via SMS to emergency contacts
          const message = `Emergency location: ${locationUrl}`;
          window.location.href = `sms:112?body=${encodeURIComponent(message)}`;
        },
        (error) => {
          console.error('Location access denied:', error);
          // Fallback to manual location sharing
          window.location.href = 'sms:112?body=Emergency assistance needed';
        }
      );
    }
  };

  const config = getAlertConfig(alertType);
  const displayMessage = message || config?.defaultMessage;

  if (!isVisible) return null;

  return (
    <div className={`emergency-alert ${config?.bgColor} ${config?.textColor} animate-slide-down`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <Icon
            name={config?.icon}
            size={20}
            className="animate-emergency-pulse flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm sm:text-base truncate">
              {displayMessage}
            </p>
            {autoHide && timeRemaining > 0 && (
              <p className="text-xs opacity-90 mt-1">
                Auto-dismiss in {timeRemaining}s
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Emergency Actions */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEmergencyCall}
            className={`${config?.textColor} hover:bg-white/10 touch-target`}
            iconName="Phone"
            iconSize={16}
          >
            <span className="hidden sm:inline">Call 112</span>
            <span className="sm:hidden">Call</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLocationShare}
            className={`${config?.textColor} hover:bg-white/10 touch-target`}
            iconName="MapPin"
            iconSize={16}
          >
            <span className="hidden sm:inline">Share Location</span>
            <span className="sm:hidden">Location</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsVisible(false);
              onDismiss();
            }} sName={`${config?.textColor} hover:bg-white/10 touch-target`}
            iconName="X"
            iconSize={16}
          >
          </Button>

          {/* Dismiss Button */}
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false);
                onDismiss();
              }}
              className={`${config?.textColor} hover:bg-white/10 touch-target`}
              iconName="X"
              iconSize={16}
            >
              <span className="sr-only">Dismiss alert</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlertBanner;