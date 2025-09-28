import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const OfflineIndicator = ({ isOffline, lastSyncTime, className = '' }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setShowDetails(true);
      const timer = setTimeout(() => setShowDetails(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOffline]);

  if (!isOffline && !showDetails) return null;

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-[150] ${className}`}>
      <div className={`card ${isOffline ? 'bg-warning/10 border-warning' : 'bg-success/10 border-success'} animate-slide-down`}>
        <div className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <Icon 
              name={isOffline ? "WifiOff" : "Wifi"} 
              size={20} 
              className={isOffline ? "text-warning" : "text-success"} 
            />
            <div>
              <p className={`font-medium text-sm ${isOffline ? "text-warning" : "text-success"}`}>
                {isOffline ? "Offline Mode Active" : "Back Online"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isOffline 
                  ? "Emergency contacts cached and available" 
                  : `Last sync: ${new Date(lastSyncTime)?.toLocaleTimeString()}`
                }
              </p>
            </div>
            
            {isOffline && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span className="text-xs text-warning font-medium">OFFLINE</span>
              </div>
            )}
          </div>
          
          {isOffline && (
            <div className="mt-2 text-xs text-muted-foreground">
              <p>• All emergency numbers remain accessible</p>
              <p>• Location sharing may be limited</p>
              <p>• SMS and calls work normally</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineIndicator;